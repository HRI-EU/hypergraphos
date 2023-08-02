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
};

function _init() {
  m.mddStatus = document.getElementById( 'mdd-status' );
  // Set reziable control buttons
  setDivAsResizable( `#palette`, 'px', ()=> {
    _resizeWindow();
    m.e.updateSessionStatus();
   });
  // Load the list of all available DSL and file/path counters
  loadFileServerInfo();
  // Load Current Status. Paramenter urlParams comes from index.html start
  loadCurrentStatus( urlParams );

  // System started
  console.log( 'System Started' );
}
function popFromHistory() {
  const history = getStatus( 'graphHistory' );
  const prevNodeData = history.pop();
  return( prevNodeData );
}
function setSystemReadOnly( status ) {
  status = ( status == undefined? true: status );
  m.status.isReadOnly = status;
  //document.body.style["background-color"] = ( status? 'red': 'gray' );
  //m.mddStatus.style.className = 'mdd-status saved';
  m.mddStatus.style['border-style'] = ( status? 'dashed': 'solid' );
}
function setSystemNeedSave() {
  if( !m.status.isReadOnly ) {
    //document.body.style["background-color"] = 'orange';
    m.mddStatus.className = 'warning';
  }
}
function setSystemSaved() {
  if( !m.status.isReadOnly ) {
    //document.body.style["background-color"] = 'gray';
    m.mddStatus.className = 'saved';
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
function getNodeDataOutPortContent( nodeData, outPort ) {
  let result = '';
  // Get output component from fan-out
  const nodeV = me.getNodeListFanOutByNodeKey( modelId, nodeData.key, outPort );
  if( nodeV ) {
    const portNodeData = nodeV[0];

    // File location
    const contentFileURL = portNodeData.fileURL;

    // Set output source
    const editorId = m.e._getDOMUniqueId( portNodeData );
    const eo = m.e.getEditor( editorId );
    result = eo.getEditorSource();
  }
  return( result );
}
function doGenerateCode( nodeData ) {
  if( nodeData ) {
    // Get main graph editor
    const g = m.e.getEditor( config.htmlDiv.graphDiv );
    // Get current graph model
    const model = g.getJSONModel();
    const modelId = 'main';
    
    // Instantiate Model Explorer
    const me = new ModelExplorer();
    me.setJSONModel( modelId, model );
    
    // Get template component from fan-in
    const templateNodeV = me.getNodeListFanInByNodeKey( modelId, nodeData.key, 'templateCode' );
    if( templateNodeV ) {
      const templateNodeData = templateNodeV[0];
      console.log( 'Template Node: '+templateNodeData.label );
      
      // Get data model component from fan-in
      const dataNodeV = me.getNodeListFanInByNodeKey( modelId, nodeData.key, 'templateData' );
      if( dataNodeV ) {
        const dataNodeData = dataNodeV[0];
        console.log( 'Data Node: '+dataNodeData.label );
        
        // File location
        const templateFile = templateNodeData.fileURL;
        const dataFile = dataNodeData.fileURL;
        
        // Get template source
        templateEditorId = m.e._getDOMUniqueId( templateNodeData );
        const et = m.e.getEditor( templateEditorId );
        let templateSource = et.getEditorSource();
        
        // Get data source
        dataEditorId = m.e._getDOMUniqueId( dataNodeData );
        const es = m.e.getEditor( dataEditorId );
        let dataSource = es.getEditorSource();
        
        // Load data source
        let module = {};
        eval( dataSource );
        
        // Get RootModel class
        const RootModel = module.exports;
        if( typeof( RootModel ) == 'function' ) {

          // Create the template generator
          const tg = new TemplateGenerator( templateSource );

          // GraphParser instance
          const gp = new GraphParser( g );
          
          // Generate template output
          const rootNodes = g.getRootNodes();
          tg.process( new RootModel( gp, rootNodes ) );
        
          // Get output
          const outputSrc = tg.getOutputStr();

          // Get output component from fan-out
          const outputNodeV = me.getNodeListFanOutByNodeKey( modelId, nodeData.key, 'outputCode' );
          if( outputNodeV ) {
            const outputNodeData = outputNodeV[0];

            // File location
            const outputCodeFile = outputNodeData.fileURL;

            // Set output source
            outputEditorId = m.e._getDOMUniqueId( outputNodeData );
            const eo = m.e.getEditor( outputEditorId );
            eo.setEditorSource( outputSrc );
          }
        } else {
          alert( 'Could not find the data model in model editor' );
        }
      }
    }
  }
}
function doGenerateDataModel( nodeData ) {
  if( nodeData ) {
    // Get main graph editor
    const g = m.e.getEditor( config.htmlDiv.graphDiv );
    // Get current graph model
    const model = g.getJSONModel();
    const modelId = 'main';

    // Instantiate Model Explorer
    const me = new ModelExplorer();
    me.setJSONModel( modelId, model );

    // Get template component from fan-in
    const templateNodeV = me.getNodeListFanInByNodeKey( modelId, nodeData.key, 'templateCode' );
    if( templateNodeV ) {
      const templateNodeData = templateNodeV[0];
      console.log( 'Template Node: '+templateNodeData.label );
      
      // Get data model component from fan-in
      const dataNodeV = me.getNodeListFanInByNodeKey( modelId, nodeData.key, 'templateData' );
      if( dataNodeV ) {
        const dataNodeData = dataNodeV[0];
        console.log( 'Data Node: '+dataNodeData.label );
        
        // File location
        const templateFile = templateNodeData.fileURL;
        const dataFile = dataNodeData.fileURL;
        
        // Get template source
        templateEditorId = m.e._getDOMUniqueId( templateNodeData );
        const et = m.e.getEditor( templateEditorId );
        let templateSource = et.getEditorSource();
        
        // Get data source
        dataEditorId = m.e._getDOMUniqueId( dataNodeData );
        const es = m.e.getEditor( dataEditorId );
        let dataSource = es.getEditorSource();
        
        // Load data source
        let module = {};
        eval( dataSource );
        
        // Get RootModel class
        const RootModel = module.exports;
        if( typeof( RootModel ) == 'function' ) {

          // Create the template generator
          const tg = new TemplateGenerator( templateSource );
          // Get template structure
          const templateStruct = tg.getTemplateStructure();

          // GraphParser instance
          const gp = new GraphParser( g );
          
          // Generate data model output
          const rootNodes = g.getRootNodes();
          const model = new RootModel( gp, rootNodes )
          const outputInfo = tg.testModel( templateStruct, model );
          const outputSrc = JSON.stringify( outputInfo, null, 2 );

          // Get data output component from fan-out
          const outputNodeV = me.getNodeListFanOutByNodeKey( modelId, nodeData.key, 'outputData' );
          if( outputNodeV ) {
            const outputNodeData = outputNodeV[0];

            // File location
            const outputDataCodeFile = outputNodeData.fileURL;

            // Set output source
            outputEditorId = m.e._getDOMUniqueId( outputNodeData );
            const eo = m.e.getEditor( outputEditorId );
            eo.setEditorSource( outputSrc );
          }
        }
      }
    }
  }
}
function doGenerateTemplateStructure( nodeData ) {
  if( nodeData ) {
    // Get main graph editor
    const g = m.e.getEditor( config.htmlDiv.graphDiv );
    // Get current graph model
    const model = g.getJSONModel();
    const modelId = 'main';
    
    // Instantiate Model Explorer
    const me = new ModelExplorer();
    me.setJSONModel( modelId, model );

    // Get template component from fan-in
    const templateNodeV = me.getNodeListFanInByNodeKey( modelId, nodeData.key, 'templateCode' );
    if( templateNodeV ) {
      const templateNodeData = templateNodeV[0];
      console.log( 'Template Node: '+templateNodeData.label );

      // Get template source
      templateEditorId = m.e._getDOMUniqueId( templateNodeData );
      const et = m.e.getEditor( templateEditorId );
      let templateSource = et.getEditorSource();

      // Create the template generator
      const tg = new TemplateGenerator( templateSource );
      // Get template structure
      const templateStruct = tg.getTemplateStructure();
      const outputSrc = JSON.stringify( templateStruct, null, 2 );

      // Get data output component from fan-out
      const outputNodeV = me.getNodeListFanOutByNodeKey( modelId, nodeData.key, 'outputTemplateStructure' );
      if( outputNodeV ) {
        const outputNodeData = outputNodeV[0];

        // File location
        const outputDataCodeFile = outputNodeData.fileURL;

        // Set output source
        outputEditorId = m.e._getDOMUniqueId( outputNodeData );
        const eo = m.e.getEditor( outputEditorId );
        eo.setEditorSource( outputSrc );
      }
    }
  }
}
function saveStatus( onSaved ) {
  const url = config.host.statusURL;
  m.e.updateSessionStatus();
  _saveFile( url, JSON.stringify( m.status, null, 2 ), ()=> {
    m.e.editorSaved( m.e.id );
    if( onSaved ) {
      onSaved();
    }
  });
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
    m.dslNameList = JSON.parse( source );
  });
  url = `${config.host.fileServerSystemURL}/fileIndex.json`;
  _openFile( url, (source)=> {
    m.fileInfo = JSON.parse( source );
  });
}
function loadCurrentStatus( params ) {
  // Load from server DataRoot user configuration file
  const url = config.host.statusURL;
  // Load user config
  _openFile( url, (source)=> {
    m.status = JSON.parse( source );
    // TODO: to clean the fileServer info in the status
    // We could do that
    if( m.status.fileServer ) {
      delete m.status.fileServer;
    }

    // Create a new Editor Manager
    m.e = new EditorManager( m.status );

    // Open last opened graph
    const id = config.htmlDiv.graphDiv;
    // Set current graph as starting graph (from user status file)
    let nodeData = m.status.currentGraphNode;
    if( params.url &&
        params.url.startsWith( config.host.fileServerURL ) &&
        params.url.endsWith( '.json' ) ) {  // If we get a url from params => we load it
      nodeData = {
        "key": "URLParams Graph",
        "isDir": true,
        "fileURL": params.url,
        "fileType": "text/json",
      }
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
  });
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
    })
  } else {
    console.log( `DSL not found ${dslName}}` );
    if( onLoad ) {
      onLoad();
    }
  }
}
function loadTestModel() {
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

