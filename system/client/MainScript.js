/*
=============================================================================
Licensed Materials - Property of LorinWare Prod.
(C) Copyright Christophe LORIN 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Christophe LORIN.
=============================================================================
Module: MDDTools Main Script
Date: 10.07.2020
=============================================================================
*/

// Frankonello graphURL "fileURL": "/fileServer/00/01.json"
/*
  - Test Case: if we create a new Dir node, we enter it, the graph is loaded, then we exit 
    without touching the graph (no node added from palette), I should not save an empty
    file of the newly opened graph. But, it seems I do save. I should avoid to save the 
    just entered a graph into an empty file...I guess I am wrongly triggering a save graph
    as soon as I enter the new empty graph...I should avoid that and only save if you add 
    component in the graph
  v Add beside EditorJS the edito SmartBlock
     https://codepen.io/appleple/pen/povGeQq#html-box
  - TOP: Create a DSL with single groups that implements
    - A mind-map tool
    - A KanBan board tool
    - A Gant Chart Plan tool
    - A ToDo List tool
    - A color palet manager
  - Create an HTML version of the diagram popup menu (so we can fix z-order)
  - Save view1/2/3/4 from popup menu into the graph json data (persistent info)
  v Added RichText editor for documentation
  - BUG: After copying a selection with CTRL+drag, selection of the copied graph
    stay long and you have to click twice to deselect it
  - Right click on a node and tell "Find nodes with same category, mironName, ..."
  - Allow to find nodes that have no connection (fanIn and fanOut empty)
  - Allow to mark "read-only" some nodes in the graph
  - Forbid to delete a selection that is not visible (the graph has been scrolled away)
  - When I disable .... forgot
  - We should create some find popup menu entry for nodes/link: find same category, mironName, .... 
  - BUG: now we can not paste a selection and make it into a group
  - TODO: related to next task, make System Monitor cancel timer if the monitor is closed
    this will be done when the event "window close" is triggered
  - TODO: implement a close window notification to all Dialog/Editor so that they can
    unsubscribe of clean internal data
  v System monitor gets automatically updated every 30 seconds
  v Now every time you jumt to a view bookmark, I seave the current view in bookmark "Last"
  v Implement first version of view bookmark
    - Create bookmark: go to a place/zoom in graph, then open popup menu, press shift+'go view X'
    - Jump bookmarl: open popup menu, click 'go view X'
  v Avoid that search string in find dialog fill the combobox if entry already present
  v Fixed bug with palette always visible
  v Add parameter in LoadScripts for choosing to use or not the cache
  - Make PagUp/PagDwn of search result stop at first or last item (no roll over results)
  v Avoid that search with user string generate exceptions (use try/catch)
  v Add in config to enable/disable double-click creation of new nodes
  v Make zoom with scrool wheel faster
  v Implement a serach criteria where only the search string is specified
    'searcValue'    ==> uses .includes() function (partial match)
    =='searchValue' ==> uses == operator (full match)
  - Save in the config some history of search string of the FindDialog
  - In diagram popup menu we should have an entry: Create Bookmark at current position
    So that we can create bookmarsk and just in different place/zoom of the graph
    in a quick way. Instead of a popup menu, we could use a DSL element to define 
    bookmark. Maybe just placing a lable -> create a bookmark
  v Make that if in search you specify a condition just like: 'say_'
    it will search in every node and every field if it contains the string.
    Then in the result it can show also in which field the value was found for each node
  - Add a try/catch around every JSON.parse/stringify
  v We need a PageUp and PageDown for move to the next found item in the search dialog
  v Check operating system when executing a script so to select 'bat' or 'sh' file
  - We have to re-test executeScript from client to server both on Mac&Windows
  - CTRL+V shoudl use the current postion of the mouse!!!!! to paste the selection
  v Popup menu of group should have what diagram has as popup menu
  - Currently selection editor window do not work sometimes (..)
  v In a group we can not select with mouse drag (we should make that possible)
    Maybe groups will be only moved by a top title bar
  - When copying a selection of connected-noded and pasting in another graph, the links
    are not correnctly positioned and moving it live some bend point not moving
    (we may need to adjust position of all nodes-position/bend)
  - Add find/replace function on nodes of a graph  
  v The field of all current DSL language loaded are not correctly collected. Some are missing
  v The find dialog do not work (error on ',' char)
  - Include search of links in the find dialog (currently it only search for nodes)
  v Put combobox in find dialog text field so to be able to recall previous search string
  v BUG: after some times the find dialog is visible, we can not edit the text field

  v Avoid to delete selection with 'DEL/BACKSPACE' keys
  v Added debug() function in ServerManager for eval debugging
  v Reviewed window z-index for putWindowOnTop
  - Frank: review PicturesDSL
  ? Collapse Window --> but need to fix button
  v Shortcut button in monitor for opening selection/model
  - Frank: verify the problem with toogleCollapseWindow
  v Fixed anmd optimized selection of DSL in dialog
  v Now server logs both Get/Post request (loading file)
  v Now DataFlow componets with button get button-label and nodeData of the component
  v Generic code generator component implemented
  v Now data node with a field 'hint', can show it in the hint window when mouseover on a node
  v Fixed problem with ALT-CLICK in Selection/Model
  v Fixed saving of window and full reload of the system
  v Fixed size of palette and reload of it
  v Now System monitor list all window and url and ....
  v ModelExplorer also give access to links and allow selection of dataflow ports

  v Reviewd full graph/file loading chain
  v Now a url can be specified in the browser url 
      http://localhost:7575/?name:'Antonello',url:'/fileServer/graphThree.json'
  v Now loading parent graph should work

  v BUG: Fixed problem of selecting links
  v BUG: Fixed problem of window not closed when back to graph
  - BUG: Using a node "Hierarchy_CodeInFile" and setting the language in the context menu
    do not set the "fileType" field in the node data
  v BUG: if you select a link and press "CANC" do not delete
  v Store in user_status file the position/size of DSL palette
  - When a node is moved (location) in a grpah --> the "Graph Model" editor should be updated
  v Allow model change in JSON selection
  v Make server support http/https at the same time
  - FRANK: put a +/- font size button in all DSL nodes (ALL!!!)
  v Now session/window info are per user (in config)
  v Alow session in read-only mode (enable/disable)
  v FileSystem Index shoul be in a file associated to the filesystem (not user)
  v Move FileType constant from DSLInclude.js to ServerManager
  v Autosave with timeout
  v Create Model explorer for code generation (support multiple models)
  - Create in HierarchyDSL a node for specifying a DSL that will be then registered
    in the list of available DSL
  v Allow selection of DSL in a graph/palette
  v Allow graph reloading (graph only)
  v Allow config for dark/light graph mode
  v Make window allways visible in relation to browser size
  v Make window resiable from top-left
  v As soon as there is a change in the graph -> close Graph Model Editor
  v Import DSL that we use (make changes)
  v Finalize creation file/path
  v Create function to center graph to position of a node
  v Put grid status in config
  v Create a search function for selecting nodes
  v Store list of all fields for node in loaded DSL for a graph
  v Show model in source editor and allow update reflected in the graph
  v Show selection in source code edito
  v Create a navigation history
  v Navigate in history
  ? Click on backgroup with ALT brings back in history
    Navigation to parent is important (store in status)
  v Create template for sub-graph (with all DSL inside)
  - Once pasting a JSON model of a graph, we can search all DSL used in category
    For this we could have a GraphWindow from where cut/paste old graph
  - When you copy a node and give to another graph, the used DSL is added atuomatically
  - HTML context menu:
    https://github.com/NorthwoodsSoftware/GoJS/blob/master/samples/customContextMenu.html
 */

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
  let url = `${config.host.fileServerURL}/dslList.json`;
  _openFile( url, (source)=> {
    m.dslNameList = JSON.parse( source );
  });
  url = `${config.host.fileServerURL}/fileIndex.json`;
  _openFile( url, (source)=> {
    m.fileInfo = JSON.parse( source );
  });
}
function loadCurrentStatus( params ) {
  const url = config.host.statusURL;
  _openFile( url, (source)=> {
    m.status = JSON.parse( source );

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

