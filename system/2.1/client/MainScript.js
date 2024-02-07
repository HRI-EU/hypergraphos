/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Main Script
Date: 10.07.2020
=============================================================================
*/

// Frankonello graphURL "fileURL": "/fileServer/00/01.json"

const m = {
  isJustStarted: true,
  e: null,          // Editor Manager
  fileInfo: {},
  dslNameList: {},  // List of registered dsl name/url
  status: {},       // Current status of the system
  mddStatus: null,  // Status border el

  // System Object for field value references
	// See: parseRefValue()
  system: {
    userName: function(){ return getUserName() },
    dateTime: function(){ return( new Date().toLocaleString() ) },
    date: function(){ return( new Date().toLocaleDateString() ) },
    time: function(){ return( new Date().toLocaleTimeString()	) },
    graphPath: function(){ g = getMainGraph(); return( g.graphPath ) },
  },

  // Registered editors
  registeredEditorList: [
    // NOTE: order matter here, since the first matching editor get selected
    { name: 'GraphEditor', fileType: (ft)=> ft == 'text/json', classRef: GraphEditor },
  ],

  // Special nodes
  specialNodeData: {
    diagram: {
      key: 'Main Diagram',
      isDir: true,
      fileURL: '',
      fileType: "text/json",
    },
    bookmarViewer: {
      key: 'Bookmarks Viewer',
      isFile: true,
      fileURL: 'bookmark', // Neccesary to allow pin
      fileType: 'application/bookmark',
    },
    findDialog: {
      key: 'Find in Graph',
      isFile: true,
      fileType: 'input/fields',
    },
    animatorViewer: {
      key: 'Animate Graph',
      isFile: true,
      fileType: 'input/fields',
      fileURL: '',
    },
    dslListViewer: {
      key: 'Show DSL List',
      isFile: true,
      fileType: 'input/fields',
    },
    graphTemplateViewer: {
      key: 'Graph Templates',
      isFile: true,
      fileType: 'input/fields',
    },
    systemMonitorViewer: {
      key: 'System Monitor',
      isFile: true,
      fileType: 'system/status',
      fileURL: '#systemMonitor#',
    },
  },
};

// WinBox alert dialog
function winAlert( msg, isCenter ) 
{
  isCenter = ( isCenter == undefined? true: isCenter );
  new WinBox( 'Alert', {
    modal: true,
    autosize: true,
    background: 'Crimson',
    html: `<div style="margine: 0px;">`+
            `<pre style="${isCenter? 'text-align: center;':''}">`+
              msg+
            `</pre>`+
          `</div>`,
  });
}
// Override standard alert function
alert = winAlert;
// WinBox yes/no dialog
function winConfirm( msg, yesCallback, noCallback, isCenter ) 
{
  isCenter = ( isCenter == undefined? true: isCenter );
  const win = new WinBox( 'Alert', {
    modal: true,
    autosize: true,
    background: 'Crimson',
    onclose: noCallback,
    html: `<div style="margine: 0px;">`+
            `<pre style="${isCenter? 'text-align: center;':''}">`+
            `  ${msg}<br><br>`+
            `<button id="winConfirm_no" type="button">Cancel</button>&nbsp`+
            `<button id="winConfirm_yes" type="button">Ok</button>`+
            `</pre>`+
          `</div>`,
  });

  // Register buttons callback
  const yesEl = document.getElementById( 'winConfirm_yes' );
  const noEl = document.getElementById( 'winConfirm_no' );
  if( yesEl ) {
    yesEl.onclick = ()=> { if( yesCallback ) yesCallback(); win.close(); };
  }
  if( noEl ) {
    noEl.onclick = ()=> { if( noCallback ) noCallback(); win.close(); };
  }
}

function _init() {
  m.mddStatus = document.getElementById( 'mdd-status' );
  // Set reziable control buttons
  setDivAsResizable( `#palette`, 'px', ()=> {
    _resizeWindow();
    m.e.updateSessionStatus();
   });

  // If the system is loaded with file:///...(no server)
  if( config.isLocalMode ) {
    loadSystemInLocalMode();
  } else { // Load here the system with server
    // Load the list of all available DSL and file/path counters
    loadFileServerInfo();
    // Load Current Status. Paramenter urlParams comes from index.html start
    loadCurrentStatus( urlParams );
  }

  // Set user name
  let cookie = document.cookie;
  const idx = cookie.indexOf( '{' );
  if( idx >= 0 ) {
    // NOTE: I have to do this to fix a problem where the
    // cookie by Takeushi was containing some other stuff
    cookie = cookie.substring( idx );
  }

  try {
    const userInfo = JSON.parse(  cookie );
    m.userInfo = userInfo;
  } catch( e ) {
    m.userInfo = { name: 'UserLocal' }
  }

  // System started
  console.log( 'System Started' );
}
function addEditorIncludes( includeList ) {
  includeList.forEach( (i)=> editorList.push( i ) );
}
function registerEditor( editorInfo ) {
  m.registeredEditorList.unshift( editorInfo );
}
function getUserName() {
  return( m.userInfo.name );
}
function popFromHistory() {
  const history = getStatus( 'graphHistory' );
  const prevNodeData = history.pop();
  return( prevNodeData );
}
function setSystemReady() {
  m.mddStatus.className = 'default';
  //console.log( '---> System READY' );
}
function setSystemReadOnly( status ) {
  status = ( status == undefined? true: status );
  m.status.isReadOnly = status;
  m.mddStatus.style['border-style'] = ( status? 'dashed': 'solid' );
  //console.log( '---> System READONLY', status );
}
function getSystemReadOnly() {
  return( m.status.isReadOnly );
}
function setSystemError() {
  m.mddStatus.className = 'error';
  //console.log( '---> System ERROR' );
}
function setSystemLoading() {
  m.mddStatus.className = 'loading';
  //console.log( '---> System LOADING' );
}
function setSystemNeedSave() {
  if( !m.status.isReadOnly ) {
    m.mddStatus.className = 'warning';
    //console.log( '---> System WARNING' );
  }
}
function setSystemSaved() {
  if( !m.status.isReadOnly ) {
    m.mddStatus.className = 'saved';
    //console.log( '---> System SAVED' );
  }
}
function setFileIndexStatus( setFunction ) {
  if( setFunction ) {
    setFunction( m );
    if( !m.isJustStarted ) {
      m.e.editorHasChanged( m.e.id );
    }
  }
}
function setStatus( setFunction ) {
  if( setFunction ) {
    setFunction( m.status );
    if( !m.isJustStarted ) {
      m.e.editorHasChanged( m.e.id );
    }
  }
}
function getStatus( property ) {
  return( m.status[property] );
}
function getMainGraph() {
  return( m.e.getEditor( config.htmlDiv.graphDiv ) );
}
function getMainGraphURL() {
  const g = getMainGraph();
  return( g.graphPath );
}
function addBookmark( bookmarkInfo ) {
  if( !m.status.bookmarkList ) {
    m.status.bookmarkList = [];
  }
  // Add new bookmark at top of the list
  setStatus( (s)=> s.bookmarkList.unshift( bookmarkInfo ) );

  // If bookmark viewer is open => update list
  const e = m.e.getEditorInfo( m.specialNodeData.bookmarViewer );
  if( e ) {
    e.updateBookmarks();
  }
}
function removeBookmark( index ) {
  if( m.status.bookmarkList && 
      m.status.bookmarkList[index] ) {
    setStatus( (s)=> s.bookmarkList.splice( index, 1 ) );
  }
}
function updateBookmarkTitle( index, title ) {
  if( m.status.bookmarkList && 
      m.status.bookmarkList[index] ) {
    setStatus( (s)=> s.bookmarkList[index].title = title );
  }
}
// TODO: parseRefValue should be implemented in ModelExplorer
function parseRefValue( nodeData, value ) {
  // Check if value is like:
  // - 'label@32' => reference to field label of node with key 32
  // - 'out@32' => reference to output named 'out' of node with key 32
  // - 'in@32' => reference to input named 'in' of node with key 32
  // - 'prop@32' => reference to property named 'prop' of node with key 32
  // - 'prop@self' => reference to property named 'prop' of the node itself
  // - 'label@group' => reference to label field of the group containing the node
  // - 'dateTime@system' => reference to system call timeDate()
  // - 'getCounter@function' => reference to a function 'getCounter()'
  
  let result = { isRef: false, value };

  if( typeof( value ) == 'string' ) {
    const nameMatch = value.match( /(\w+)@([\d\w]+)/ );
    if( nameMatch ) {
      result.isRef = true;
      result.name = nameMatch[1];
      result.source = nameMatch[2];
      if( result.source == 'self' ) {
        result.source = nodeData.key;
        result.nodeData = nodeData;
      } else if( result.source == 'group' ) {
        const gKey = nodeData.group;
        if( gKey != undefined ) {
          const gNodeData = getNodeData( gKey );
          result.nodeData = gNodeData;
          result.source = nodeData.key;
        }
      } else if( parseInt( result.source ) == result.source ) {  // If it is a number (key)
        result.nodeData = getNodeData( result.source );
      }
    }
  }
  return( result );
}
function getRefValue( nodeData, value ) {
  // TODO: copy this function in ModelExplorer too
  // so that it can be used server side
  let result = parseRefValue( nodeData, value );
  // Check if is a reference
  if( result.isRef ) {
    if( result.source == 'system' ) {
      const sysValue = m.system[result.name];
      if( sysValue ) {
        result.value = sysValue();
        result.isRef = false;
      }
    } else if( result.source == 'function' ) {
      const func = window[result.name];
      if( func ) {
        result.value = func();
        result.isRef = false;
      }
    } else if( parseInt( result.source ) == result.source ) {  // If it is a number (key)
      if( !['in_','out_','props_'].includes( result.name ) ) {
        const v = result.nodeData[result.name];
        if( v != undefined ) {
          result.isRef = false;
          result.value = v;
        }
      }
    }
  }
  return( result );
}
function getNodeData( key, isCopy ) {
  const g = getMainGraph();
  let result = g.getNodeData( key, isCopy );

  if( result && ( result.linkToKey != undefined ) ) {
    const linkedData = g.getNodeData( result.linkToKey );
    if( linkedData.fileURL != undefined ) {
      // Update both the copy and the node
      result.fileURL = linkedData.fileURL;
      //DONT DO THAT!!!: g.setNodeDataField( key, 'fileURL', result.fileURL );
    }
    if( linkedData.fileContent != undefined ) {
      // Update both the copy and the node
      result.fileContent = linkedData.fileContent;
      //DONT DO THAT!!!: g.setNodeDataField( key, 'fileContent', result.fileContent );
    }
  } else {
    result = g.getNodeData( key, isCopy );
  }
  return( result );
}
function setNodeDataField( key, field, value ) {
  const g = getMainGraph();
  let data = key; // default we assume key is nodeData
  if( typeof( key ) != 'object' ) { // if not, is a key
    data = g.getNodeData( key, true );
  }
  
  if( data && ( data.linkToKey != undefined ) ) {
    // Set field to link node
    g.setNodeDataField( key, field, value );
    // Set also to target-link node for these fields
    if( ( field == 'fileURL' ) ||
        ( field == 'fileContent' ) ) {
      g.setNodeDataField( data.linkToKey, field, value );
    }
  } else {
    g.setNodeDataField( key, field, value );
  }

  // Check if editor open => update editor source
  if( field == 'fileContent' ) {
    mainScript_updateEditorSource( data, value );
  } else if( field == 'label' ) {
    mainScript_updateEditorTitle( data, value );
  }
}
function getNodeDataField( key, field, defaultValue ) {
  let result = defaultValue;
  let data = key; // default we assume key is nodeData
  if( typeof( key ) != 'object' ) { // if not, is a key
    const g = getMainGraph();
    data = g.getNodeData( key );
  }
  
  if( data.category && window[data.category+'_get'] ) {
    result = window[data.category+'_get']( data, 'field', field );
  } else if( data[field] !== undefined ) {
    result = data[field];
  }
  return( result );
}
function getNodeDataFileContent( keyOrData, onFileContent ) {
  let data = null;
  if( typeof( keyOrData ) == 'object' ) {
    data = keyOrData;
  } else {
    data = getNodeData( keyOrData );
  }

  if( data ) {
    loadNodeContent( data, onFileContent );
  } else {
    if( onFileContent ) {
      onFileContent( '' );
    }
  }
}
function getLinkData( key, isCopy ) {
  const g = getMainGraph();
  const result = g.getLinkData( key, isCopy );
  return( result );
}
function setLinkDataField( key, field, value ) {
  if( typeof( key ) == 'object' ) { // in this case key is a data
    key = key.key;
  }
  g.setLinkDataField( key, field, value );
}
function setViewFromLabel( nodeLabel, deltaX, deltaY ) {
  // Get main Graph
  const mg = getMainGraph();
  // Find node
  //const nodeList = mg.findAllNodeData( 'label', nodeLabel );
  const nodeList = mg.diagram.findNodesByExample( { label: nodeLabel } );
  const isNodeFound = ( nodeList && nodeList.count > 0 );
  if( isNodeFound ) {
    mg.setViewFromNode( nodeList.first(), deltaX, deltaY );
  }
  return( isNodeFound );
}
function setViewFromKey( nodeKey, deltaX, deltaY ) {
  // Get main Graph
  const mg = getMainGraph();
  // Find node
  const node = mg.diagram.findNodeForKey( nodeKey );
  const isNodeFound = ( node != null );
  if( isNodeFound ) {
    mg.setViewFromNode( node, deltaX, deltaY );
  }
  return( isNodeFound );
}
function selectNodesByKey( keyList ) {
  // Get main Graph
  const mg = getMainGraph();
  mg.selectAllNodeByKey( keyList );
}
function centerNodeByKey( key ) {
  selectNodesByKey( [key] );
  // Get main Graph
  const mg = getMainGraph();
  mg.setViewCenteredOnSelectedNode();
}
function centerNodeOfWindow( id ) {
  const key = m.e._getWindowKey( id );
  centerNodeByKey( key );
}
function selectNodeOfWindow( id ) {
  const key = m.e._getWindowKey( id );
  selectNodesByKey( [key] );
}
function getNodeDataOutPortContent( nodeData, outPort ) {
  let result = '';
  // Get output component from fan-out
  const portNodeData = me.getNodeListFanOutByNodeKey( modelId, nodeData.key, outPort );
  if( portNodeData && portNodeData.length ) {
    // File location
    const contentFileURL = portNodeData[0].fileURL;

    // Set output source
    const editorId = m.e._getDOMUniqueId( portNodeData[0] );
    const eo = m.e.getEditor( editorId );
    result = eo.getEditorSource();
  }
  return( result );
}
function saveStatus( onSaved ) {
  const url = config.host.statusURL;
  m.e.updateSessionStatus();
  let strStatus = null;
  try {
    strStatus = JSON.stringify( m.status, null, 2 )
  } catch( error ) {}

  if( strStatus ) {
    _saveFile( url, strStatus, ()=> {
      m.e.editorSaved( m.e.id );
      if( onSaved ) {
        onSaved();
      }
    });
  }
}
function saveAllEditorContent() {
  const idList = Object.keys( EditorChangeManager.unsavedEditor );
  for( const id of idList ) {
    console.log( 'Saving '+id );
    const e = m.e.getEditorInfo( id );
    e.saveEditorContent();
  }
}
function loadFileServerInfo() {
  let url = `${config.host.fileServerSystemURL}/dslList.json`;
  _openFile( url, (source)=> {
    try {
      m.dslNameList = JSON.parse( source );
    } catch( error ) {
      alert( 'Error loading DSL list file' );
    }
  });
  url = `${config.host.fileServerSystemURL}/fileIndex.json`;
  _openFile( url, (source)=> {
    try {
      m.fileInfo = JSON.parse( source );
    } catch( error ) {
      alert( 'Error loading fileIndex' );
    }
  });
}
function loadCurrentStatus( params ) {
  // Load from server DataRoot user configuration file
  const url = config.host.statusURL;
  // Load user config
  _openFile( url, (source)=> {
    try {
      m.status = JSON.parse( source );
      // TODO: to clean the fileServer info in the status
      // We could do that
      if( m.status.fileServer ) {
        delete m.status.fileServer;
      }
  
      // Create a new Editor Manager
      m.e = new EditorManager( m );
  
      // Open last opened graph
      const id = config.htmlDiv.graphDiv;
      // Set current graph as starting graph (from user status file)
      let nodeData = m.status.currentGraphNode;
      if( params.url &&
          params.url.startsWith( config.host.fileServerURL ) &&
          params.url.endsWith( '.json' ) ) {  // If we get a url from params => we load it
        nodeData = m.specialNodeData.diagram;
        nodeData.fileURL = params.url;
      }
      // If nodeData do not have a fileURL => got to root graph
      if( !nodeData.fileURL ) { //
        nodeData = config.graph.rootGraphNodeData;
      }
      m.e.openWindow( id, 'GraphEditor', nodeData );
      // Load start session
      m.e.reopenStartSession();
      // We just finish loading the system
      // We just finished the first loading, now we can tell 
      // that we are not anymore just started ==> any change will be saved
      // NOTE: we set this with timeout because the GoJS graph keep
      // generating change event after loading
      setTimeout( ()=> m.isJustStarted = false, 500 );
  
      // Set global save callback
      EditorChangeManager.onGlobalNeedSave( setSystemNeedSave );
      EditorChangeManager.onGlobalIsSaved( setSystemSaved );
    } catch( error ) {
      alert( 'Error loading user status' );
    }
  });
}
function loadSystemInLocalMode() {
  // Create a new Editor Manager
  m.e = new EditorManager( m.status );
  // Get static root graph
  const nodeData = config.graph.rootGraphNodeData;
  m.status.currentGraphNode = nodeData;
  // Update Status and DSL
  setLocalStatus();
  setLocalDSL();
  // Open last opened graph
  const id = config.htmlDiv.graphDiv;
  m.e.openWindow( id, 'GraphEditor', nodeData );
}
function loadDSLScriptList( dslNameList, onLoad ) {
  if( !Array.isArray( dslNameList ) ) {
    if( onLoad ) {
      onLoad();
    }
  } else {
    const dslNameListCopy = [...dslNameList];
    const dslName = dslNameListCopy.shift();

    if( dslName ) {
      loadDSLScript( dslName, ()=> {
        loadDSLScriptList( dslNameListCopy, onLoad );
      });
    } else {
      if( onLoad ) {
        onLoad();
      }
    }
  }
}
function loadDSLScript( dslName, onLoad ) {
  if( m.dslNameList[dslName] ) {
    loadScript( m.dslNameList[dslName], ()=> {
      if( window[dslName+'_includeList'] ) {
        const includeList = window[dslName+'_includeList']();
        loadScriptList( includeList, onLoad );
      } else {
        if( onLoad ) {
          onLoad();
        }
      }
    });
  } else {
    console.log( `DSL not found ${dslName}}` );
    if( onLoad ) {
      onLoad();
    }
  }
}
function loadTestModel() {
  const g = getMainGraph();
  g.diagram.model = new go.GraphLinksModel(
    [ // a JavaScript Array of JavaScript objects, one per node;
      // the "color" property is added specifically for this app
      { key: "Alpha Test", 'category': 'Default', color: "lightblue" },
      { key: "Beta Test", 'category': 'Default', color: "orange" },
      { key: "Gamma Test", 'category': 'Default', color: "lightgreen" },
      { key: "Delta Test", 'category': 'Default', color: "pink" }
    ],
    [ // a JavaScript Array of JavaScript objects, one per link
      { from: "Alpha Test", to: "Beta Test" },
      { from: "Alpha Test", to: "Gamma Test" },
      { from: "Beta Test", to: "Beta Test" },
      { from: "Gamma Test", to: "Delta Test" },
      { from: "Delta Test", to: "Alpha Test" }
    ]
  );
}
function mainScript_updateEditorSource( nodeData, source ) {
  // Get the editor from the node data
  const e = m.e.getEditor( nodeData );
  if( e ) {
    // Set editor content
    e.setEditorSource( source );
  }
}
function mainScript_updateEditorTitle( nodeData, title ) {
  // Get the editor from the node data
  const eId = m.e._getDOMUniqueId( nodeData );
  const e = m.e.getEditorInfo( eId );
  if( e ) {
    // Set editor content
    e.setTitle( `${title} [${data.fileType}]` );
  }
}