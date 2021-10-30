/*
=============================================================================
Licensed Materials - Property of LorinWare Prod.
(C) Copyright Christophe LORIN 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Christophe LORIN.
=============================================================================
Module: MDDTools Editors and Viewers
Date: 10.07.2020
=============================================================================
*/

class EditorBase extends EditorChangeManager {
  constructor() {
    super( 10 ); // Saving timeout: 10 seconds
    this.nodeData = null;
    this.title = '';
    this.parentGraph = null;
  }
  setTitle( title ) {
    title = ( title != undefined? title: this.title );
    const element = document.querySelector( `#${this.id} .title` );
    if( element ) {
      element.innerHTML = title;
    }

  }
  setParentGraph( nodeData ) {
    this.parentGraph = nodeData;
  }
  getParentGraph() {
    return( this.parentGraph );
  }
  storeWindowPosition() {
    if( this.id != config.htmlDiv.graphDiv ) {
      const ei = m.e.getEditorInfo( this.id ) ;
      if( ei ) {
        m.e.saveWindowPosition( this.id, this.nodeData, this.isPin() );
      }
    }
  }
  setPinOn() {
    m.e.pinEditor( this.id );
  }
  isPin() {
    const pw = getStatus( 'pinnedWindow' );
    const nodeData = pw[this.nodeData.fileURL];
    return( ( nodeData != undefined ) && ( nodeData.key == this.nodeData.key ) );
  }
  showSaveButton( status ) {
    status = ( status == undefined? true: status );
    const element = document.querySelector( `#${this.id} .editorDivBSave` );
    element.style.visibility = ( status? 'visible': 'hidden' );
  }
}
class GraphEditor extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.isContentJustLoaded = true;
    this.id = id;
    this.listenerList = {
      'onLoad': [],
    };

    // New graph editor
    this.editor = new Graph( { 
      graphId: id,  
      fullPaletteId: config.htmlDiv.paletteDiv,
      nodePaletteId: config.htmlDiv.nodePaletteDiv,
      linkPaletteId: config.htmlDiv.linePaletteDiv,
    });

    // Enable/disable delete key in graph editing
    if( config.graph.allowDeleteKey != undefined) {
      this.editor.setAllowDeleteKey( config.graph.allowDeleteKey );
    }
    if( config.graph.isDoubleClickCreateNodeEnabled != undefined ) {
      this.editor.setAllowDoubleCliceCreateNode( config.graph.isDoubleClickCreateNodeEnabled );
    }
    // Pause tracking editor changes
    this.setPauseChange( true );
    // Saving events
    this.editor.onGraphChanged( ()=> {
      if( !this.isContentJustLoaded ) {
        this.editorHasChanged();
      }
    });
    this.onDoSave( ()=> {
      console.log( 'Saving main graph...' );
      this.saveEditorContent();
    });
    this.onNeedSave( ()=> setSystemNeedSave() );

    const history = getStatus( 'graphHistory' );
    this.editor.setIsHistoryEmpty( history.length <= 0 );
    this.editor.setIsRootGraph( nodeData.fileURL == config.graph.rootGraphURL );
    // Setup events
    this.editor.onLoadGraph( ( nodeData )=> {
      // Get a copy of the node data
      const newNodeData = this.editor.getNodeData( nodeData.key, true );
      // Give a new url in case fileURL is empty
      this._verifyFileURL( newNodeData );
      // Navigate to node
      this.navigateToGraph( newNodeData );
    });
    this.editor.onLoadFile( ( nodeData, x, y )=> {
      // Get a copy of the node data
      const newNodeData = this.editor.getNodeData( nodeData.key, true );
      // Give a new url in case fileURL is empty
      this._verifyFileURL( newNodeData );
      // Open node window
      m.e.openWindowFromNodeData( newNodeData, x, y );
    });
    this.editor.onShowRootGraph( ()=> {
      const newNodeData = config.graph.rootGraphNodeData;
      this.navigateToGraph( newNodeData );
    });
    this.editor.onSetReadOnly( ( status )=> {
      setSystemReadOnly( status );
    });

    const showPreviousGraph = ()=> {
      const newNodeData = popFromHistory();
      const history = getStatus( 'graphHistory' );
      this.editor.setIsHistoryEmpty( history.length <= 0 );
      // Load previous graph
      this.navigateToGraph( newNodeData, true );
    };

    this.editor.onShowParentGraph( ()=> {
      //TODO: temporary fix because I don't know how to handle parent
      showPreviousGraph();
      //const newNodeData = this.getParentGraph();
      //this.navigateToGraph( newNodeData );
    });
    this.editor.onShowPreviousGraph( ()=> {
      //TODO: temporary fix because I don't know how to handle parent
      showPreviousGraph();
    });
    this.editor.onSelection( ()=> {
      const e = m.e.getEditor( config.htmlDiv.graphDiv );
      const jsonSelection = e.getJSONSelection();
    });
    this.editor.onShowFindDialog( (x, y)=> {
      const nodeData = {
        key: 'Find in Graph',
        isFile: true,
        fileType: 'input/fields',
      };
      const id = m.e._getDOMUniqueId( nodeData );
      m.e.openWindow( id, 'FindViewer', nodeData, [x, y, 470, 200 ] );
    });
    this.editor.onShowAnimatorEditor( (x, y)=> {
      const nodeData = {
        key: 'Animate Graph',
        isFile: true,
        fileType: 'input/fields',
        fileURL: '',
      };
      const id = m.e._getDOMUniqueId( nodeData );
      m.e.openWindow( id, 'AnimatorEditor', nodeData, [x, y, 470, 200 ] );
    });
    this.editor.onShowDSLListDialog( (x, y)=> {
      const nodeData = {
        key: 'Show DSL List',
        isFile: true,
        fileType: 'input/fields',
      };
      const id = m.e._getDOMUniqueId( nodeData );
      m.e.openWindow( id, 'DSLViewer', nodeData, [x, y, 160, 350 ] );
    });
    this.editor.onShowGraphTemplateDialog( (x, y)=> {
      const nodeData = {
        key: 'Graph Templates',
        isFile: true,
        fileType: 'input/fields',
      };
      const id = m.e._getDOMUniqueId( nodeData );
      m.e.openWindow( id, 'GraphTemplateViewer', nodeData, [x, y, 260, 160 ] );
    });
    this.editor.onShowSysMonitorDialog( (x, y)=> {
      const nodeData = {
        key: 'System Monitor',
        isFile: true,
        fileType: 'system/status',
        fileURL: '#systemMonitor#',
      };
      const id = m.e._getDOMUniqueId( nodeData );
      m.e.openWindow( id, 'SystemMonitorViewer', nodeData, [x, y, 540, 170 ] );
    });

    this.setPauseChange( false );
    this.loadEditorContent( nodeData );
  }
  addListerner( event, callaback ) {
    if( this.listenerList[event] ) {
      this.listenerList[event].push( callaback );
    }
  }
  navigateToGraph( newNodeData, isBackFromHistory ) {
    isBackFromHistory = ( isBackFromHistory == undefined? false: isBackFromHistory );
    // If nodeData is defined ==> we are not at the root graph
    if( newNodeData ) {
      // Save first the graph editor and then navigate
      this.suggestSaveEditorContent( ()=> {
        if( !isBackFromHistory ) {
          // Update navigation history
          m.e.updateGraphHistory();
        }
        // Load new graph
        this.loadEditorContent( newNodeData );
      });
    }
  }
  loadEditorContent( nodeData, onLoaded ) {
    if( !nodeData && !nodeData.isDir || ( nodeData.fileType != 'text/json' ) ) {
      return;
    }

    // Pause tracking editor changes
    this.setPauseChange( true );
    this.isContentJustLoaded = true;

    const onDone = ()=> {
      // Reopen windows in case we have some for this url
      setStatus( (s)=> s.currentGraphNode = nodeData );
      m.e.reopenGraphSession( nodeData.fileURL );
      // Update history
      const history = getStatus( 'graphHistory' );
      this.editor.setIsHistoryEmpty( history.length <= 0 );
      // Set if root graph
      this.editor.setIsRootGraph( nodeData.fileURL == config.graph.rootGraphURL );
      this.setPauseChange( false );
      // Set title
      const isNumber = (n)=> !isNaN( n );
      this.title = this.id;
      if( nodeData.label ) {
        this.title = nodeData.label;
      } else if( nodeData.text ) {
        this.title = nodeData.text;
      } else if( nodeData.key && ( !isNumber( nodeData.key )) ) {
        this.title = nodeData.key;
      }
      // We just finished the first loading, now we can tell 
      // that we are not anymore just started ==> any change will be saved
      // NOTE: we set this with timeout because the GoJS graph keep
      // generating change event after loading
      setTimeout( ()=> this.isContentJustLoaded = false, 50 );
      // call event listeners
      const listenerCallList = this.listenerList['onLoad'];
      if( listenerCallList.length > 0 ) {
        for( const callback of listenerCallList ) {
          if( callback ) {
            callback();
          }
        }
      } 
      if( onLoaded ) {
        onLoaded();
      }
    };
    const onNewGraphLoaded = (source)=> {
      const history = getStatus( 'graphHistory' );
      if( !source && ( history.length <= 0 ) ) {
        nodeData = config.graph.rootGraphNodeData;
        this.loadEditorContent( nodeData, onDone );
        // NOTE: return to abort current loading
        return;
      }
      this.editor.setEditorSource( source, onDone );
      this.editor.setGraphPath( nodeData.fileURL );
    };
    const onSaveCloseDone = ()=> {
      // NOTE:!!!!!
      // Next lines must be in this order
      // - set parent
      // - update current nodeData
      // Don't change this order!!!!!
      // Set parent graph as the current this.nodeData.fileURL
      if( this.nodeData ) {
        if( nodeData.fileURL == config.graph.rootGraphURL ) {
          this.setParentGraph( null );
        } else {
          this.setParentGraph( this.nodeData );
        }
      }
      // Update current nodeData
      this.nodeData = nodeData;
      // Load graph
      loadNodeContent( nodeData, onNewGraphLoaded );
    };
    // Save session for previous loaded graph (this.nodeData) if we are not just created
    if( this.nodeData ) {
      // Close all un-pinned window then call anonymous function when done
      m.e.closeAllEditor( onSaveCloseDone );
    } else {
      onSaveCloseDone();
    }
  }
  suggestSaveEditorContent( onSaved ) {
    console.log( 'Graph call suggestToSave. Editor isNeedSave() '+this.isNeedSave() );
    if( this.isNeedSave() ) {
      console.log( 'Graph call saveEditorContent' );
      this.saveEditorContent( onSaved );
    } else {
      console.log( 'Graph NOT calling saveEditorContent()' );
      if( onSaved ) {
        onSaved();
      }
    }
  }
  saveEditorContent( onSaved ) {
    const onEditorSaved = ()=> {
      this.editorSaved();
      if( onSaved ) {
        onSaved();
      }
    };
    if( this.nodeData ) {
      const nodeDataTemp = this.editor._getNodeDataCopy( this.nodeData );
      const source = this.editor.getEditorSource();
      nodeDataTemp.fileContent = source;
      console.log( 'Graph call saveNodeContent()')
      saveNodeContent( nodeDataTemp, onEditorSaved );
    } else {
      console.log( 'Graph NOT call saveNodeContent(), nodeData is NULL' );
      onEditorSaved();
    }
  }
  _verifyFileURL( nodeData ) {
    if( nodeData.isDir || nodeData.isFile ) {
      if( ( nodeData.fileURL != undefined ) && ( nodeData.fileURL == '' ) ) {
        const ext = getExtByFileType( nodeData.fileType );
        const url = getNewFileServerURL( ext );
        nodeData.fileURL = url;
        // NOTE: the setNodeDataField trigger the editorChange event
        this.editor.setNodeDataField( nodeData.key, 'fileURL', url );
      }
    }
  }
}
class TextEditor extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.isJustStarted = true;
    this.id = id;
    this.fileType = '';
    
    this.fileType = ( nodeData.fileType? nodeData.fileType: 'text/text' );
    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                          config.htmlDiv.mainDiv,
                                          this.storeWindowPosition.bind(this),
                                          position );
    this.editor = new ACESourceCodeEditor( this.editorDivId );
    const language = this.fileType.substring( 5 ); // get value after 'text/'
    this.editor.setEditorMode( 'ace/mode/'+language );

    // Pause tracking editor changes
    this.setPauseChange( true );
    // Saving events
    this.editor.onSourceChanged( ()=> {
      if( !this.isJustStarted ) {
        this.editorHasChanged();
      }
      this.isJustStarted = false;
    });
    //this.onNeedSave( ... ) // Show star in title...
    this.onDoSave( ()=> {
      console.log( 'Saving text editor: '+this.nodeData.key );
      this.saveEditorContent();
    });

    this.setPauseChange( false );
    this.loadEditorContent( nodeData );
  }
  loadEditorContent( nodeData ) {
    // Pause tracking editor changes
    this.setPauseChange( true );

    this.fileType = ( nodeData.fileType? nodeData.fileType: 'text/text' );
    // Update current nodeData
    this.nodeData = nodeData;
    // Set window title
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${this.fileType}]`;
    this.setTitle( this.title );
    // Update pin
    if( nodeData.fileURL ) {
      m.e.showWindowPin( this.id );
    }
    // Set editor content
    loadNodeContent( nodeData, (source)=> {
      this.editor.setEditorSource( source );
      this.setPauseChange( false );
    });
    // Register on changes of the node if available
    if( nodeData.onNodeChanged ) {
      nodeData.onNodeChanged( this.loadEditorContent.bind(this) );
    }
  }
  saveEditorContent( onSaved ) {
    const onEditorSaved = ()=> {
      this.editorSaved();
      if( onSaved ) {
        onSaved();
      }
    };
    if( this.nodeData ) {
      const source = this.editor.getEditorSource();
      const e = m.e.getEditor( config.htmlDiv.graphDiv );
      const nodeDataTemp = e._getNodeDataCopy( this.nodeData );
      nodeDataTemp.fileContent = source;
      saveNodeContent( nodeDataTemp, onEditorSaved );
    } else {
      onEditorSaved();
    }
  }
}
class HTMLBlockEditor extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.isJustStarted = true;
    this.id = id;
    this.fileType = '';
    this.editorDiv = null;
    
    this.fileType = ( nodeData.fileType? nodeData.fileType: 'application/editorjs' );
    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                          config.htmlDiv.mainDiv,
                                          this.storeWindowPosition.bind(this),
                                          position );
    this.editor = new BlockCodeEditor( this.editorDivId );

    // Pause tracking editor changes
    this.setPauseChange( true );

    // Saving events
    this.editor.onSourceChanged( ()=> {
      if( !this.isJustStarted ) {
        this.editorHasChanged();
      }
      this.isJustStarted = false;
    });

    //this.onNeedSave( ... ) // Show star in title...
    this.onDoSave( ()=> {
      console.log( 'Saving text editor: '+this.nodeData.key );
      this.saveEditorContent();
    });

    this.setPauseChange( false );
    this.loadEditorContent( nodeData );
  }
  loadEditorContent( nodeData ) {
    // Pause tracking editor changes
    this.setPauseChange( true );

    this.fileType = ( nodeData.fileType? nodeData.fileType: 'application/editorjs' );
    // Update current nodeData
    this.nodeData = nodeData;
    // Set window title
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${this.fileType}]`;
    this.setTitle( this.title );
    // Update pin
    if( nodeData.fileURL ) {
      m.e.showWindowPin( this.id );
    }
    // Set editor content
    loadNodeContent( nodeData, (source)=> {
      this.editor.setEditorSource( source );
      this.setPauseChange( false );
    });
    // Register on changes of the node if available
    if( nodeData.onNodeChanged ) {
      nodeData.onNodeChanged( this.loadEditorContent.bind(this) );
    }
  }
  saveEditorContent( onSaved ) {
    const onEditorSaved = ()=> {
      this.editorSaved();
      if( onSaved ) {
        onSaved();
      }
    };
    if( this.nodeData ) {
      // EditorJS has an asyncronous getEditorSource
      this.editor.getEditorSource( ( objSource ) => {
        const source = JSON.stringify( objSource );
        const e = m.e.getEditor( config.htmlDiv.graphDiv );
        const nodeDataTemp = e._getNodeDataCopy( this.nodeData );
        nodeDataTemp.fileContent = source;
        saveNodeContent( nodeDataTemp, onEditorSaved );
      });
    } else {
      onEditorSaved();
    }
  }
}
class HTMLSmartBlockEditor extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.isJustStarted = true;
    this.id = id;
    this.fileType = '';
    this.editorDiv = null;
    
    this.fileType = ( nodeData.fileType? nodeData.fileType: 'application/smartblock' );
    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                          config.htmlDiv.mainDiv,
                                          this.storeWindowPosition.bind(this),
                                          position );
    this.editor = new SmartBlockEditor( this.editorDivId );

    // Pause tracking editor changes
    this.setPauseChange( true );

    // Saving events
    this.editor.onSourceChanged( ()=> {
      if( !this.isJustStarted ) {
        this.editorHasChanged();
      }
      this.isJustStarted = false;
    });

    //this.onNeedSave( ... ) // Show star in title...
    this.onDoSave( ()=> {
      console.log( 'Saving text editor: '+this.nodeData.key );
      this.saveEditorContent();
    });

    this.setPauseChange( false );
    this.loadEditorContent( nodeData );
  }
  loadEditorContent( nodeData ) {
    // Pause tracking editor changes
    this.setPauseChange( true );

    this.fileType = ( nodeData.fileType? nodeData.fileType: 'application/smartblock' );
    // Update current nodeData
    this.nodeData = nodeData;
    // Set window title
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${this.fileType}]`;
    this.setTitle( this.title );
    // Update pin
    if( nodeData.fileURL ) {
      m.e.showWindowPin( this.id );
    }
    // Set editor content
    loadNodeContent( nodeData, (source)=> {
      this.editor.setEditorSource( source );
      this.setPauseChange( false );
    });
    // Register on changes of the node if available
    if( nodeData.onNodeChanged ) {
      nodeData.onNodeChanged( this.loadEditorContent.bind(this) );
    }
  }
  saveEditorContent( onSaved ) {
    const onEditorSaved = ()=> {
      this.editorSaved();
      if( onSaved ) {
        onSaved();
      }
    };
    if( this.nodeData ) {
      // EditorJS has an asyncronous getEditorSource
      const source = this.editor.getEditorSource();
      const e = m.e.getEditor( config.htmlDiv.graphDiv );
      const nodeDataTemp = e._getNodeDataCopy( this.nodeData );
      nodeDataTemp.fileContent = source;
      saveNodeContent( nodeDataTemp, onEditorSaved );
    } else {
      onEditorSaved();
    }
  }
}
class ImageEditor extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.id = id;
    this.editor = null;

    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                         config.htmlDiv.mainDiv,
                                         this.storeWindowPosition.bind(this),
                                         position );  
    this.loadEditorContent( nodeData );
  }
  loadEditorContent( nodeData ) {
    // Update current nodeData
    this.nodeData = nodeData;
    // Update window title with:
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${nodeData.fileType}]`;
    this.setTitle( this.title );
    // Update pin
    if( nodeData.fileURL ) {
      m.e.showWindowPin( this.id );
    }
    // Set editor content
    if( nodeData.fileURL ) {
      const element = document.getElementById( this.editorDivId );
      const fileURL = ( nodeData.fileURL? nodeData.fileURL: '' );
      element.style.backgroundImage = `url("${fileURL}")`;
      element.style.backgroundSize = 'cover';
    }
  }
  saveEditorContent( onSaved ) {
    if( onSaved ) {
      onSaved();
    }
  }
}
class WebViewer extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.id = id;
    this.editor = null;

    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                         config.htmlDiv.mainDiv,
                                         this.storeWindowPosition.bind(this),
                                         position );
    this.loadEditorContent( nodeData );
  }
  loadEditorContent( nodeData ) {
    // Update current nodeData
    this.nodeData = nodeData;
    // Update window title with:
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${nodeData.fileType}]`;
    this.setTitle( this.title );
    // Update pin
    if( nodeData.fileURL ) {
      m.e.showWindowPin( this.id );
    }
    // Set editor content
    if( nodeData.fileURL ) {
      const element = document.getElementById( this.editorDivId );
      const fileURL = ( nodeData.fileURL? nodeData.fileURL: '' );
      element.innerHTML = `<iframe class='webViewer' src="${fileURL}"></iframe>`;
    } else if( nodeData.fileContent != undefined ) {
      const element = document.getElementById( this.editorDivId );
      element.innerHTML = `<iframe class='webViewer'">${nodeData.fileContent}</iframe>`;
    }
  }
  saveEditorContent( onSaved ) {
    if( onSaved ) {
      onSaved();
    }
  }
}
class FindViewer extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.id = id;
    this.editor = null;
    this.foundInfo = {
      lastItemSelected: -1,
      foundList: [],
      elementList: [],
    };

    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                         config.htmlDiv.mainDiv,
                                         this.storeWindowPosition.bind(this),
                                         position );
    this.loadEditorContent( nodeData );
  }
  loadEditorContent( nodeData ) {
    // Load graph editor
    const graphEditor = m.e.getEditor( config.htmlDiv.graphDiv );
    const fieldNameList = '    '+graphEditor.getDSLFieldNameList().join( '&#013;    ' );
    const hint = 'Examples:&#013;     d.field == "1"&#013;     == "1"&#013;     "1"&#013;Field names are:&#013;'+fieldNameList;
    // Update current nodeData
    this.nodeData = nodeData;
    // Update window title with:
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${nodeData.fileType}]`;
    this.setTitle( this.title );
    // Set editor content
    const element = document.getElementById( this.editorDivId );
    element.innerHTML = `<div class="search" style="width:100%;position:absolute;background-color:inherit">
                          Search :&nbsp<input id='searchField' list='searchEntries' style='width:85%' title='${hint}'>
                          <datalist id='searchEntries'>
                            <option value="d.key == '3'">
                            <option value="d.key >= '3'">
                          </datalist>
                        </div>
                        <div id='searchResult' style="margin-top: 25px;" ></div>`;
    const inputField = document.querySelector( '#searchField' );
    const searchResult = document.querySelector( '#searchResult' );
    const doFindNavigate = (fkey, fi)=> {
      if( fkey == 'PageDown' ) {
        // This stop at end of list
        if( fi.lastItemSelected < fi.foundList.length-1 )
          ++fi.lastItemSelected;
        else
          return;
        // This roll over all search resutls
        //fi.lastItemSelected = ( fi.lastItemSelected < fi.foundList.length-1?
        //                        ++fi.lastItemSelected: 0 );
      } else if( fkey == 'PageUp' ) {
        // This stop at beginning of list
        if( fi.lastItemSelected > 0 )
          --fi.lastItemSelected;
        else
          return;
        // This roll over all search resutls
        //fi.lastItemSelected = ( fi.lastItemSelected > 0?
        //                        --fi.lastItemSelected: fi.foundList.length-1 );
      }
      if( fi.elementList[fi.lastItemSelected] ) {
        fi.elementList[fi.lastItemSelected].onclick();
      }
    };
    const doSelectItem = ( key, index )=> {
      m.e.selectAndCenterNodeInGraph( key );
      this.lastItemSelected = index;
    }
    const doSearch = (e)=> {
      if( ( e.key == 'PageUp') || ( e.key == 'PageDown' ) ) {
        doFindNavigate( e.key, this.foundInfo );
      }
      if( e.key == 'Enter' || e.keyCode === 13 ) {
        // Add current search string in the popup
        const inputElement = e.currentTarget;
        const searchString = inputElement.value;
        const list = document.getElementById( 'searchEntries' );
        // Check if the executed search is not in the combobox list
        let optionFound = false;
        for( const opt of list.children ) {
          if( opt.value == searchString ) {
            optionFound = true;
            break;
          }
        }
        if( !optionFound ) {
          const option = document.createElement( 'option' );
          option.value = searchString;
          list.appendChild( option );
        }

        // Search nodes
        this.foundInfo.foundList = graphEditor.findAllNodeDataIf( inputField.value );
        // Reset seleciton index for a new serach
        this.foundInfo.lastItemSelected = -1;

        // TODO: transform value to int/boolean if int/boolean or....
        let source = '';
        let index = 0;
        for( const founNodeData of this.foundInfo.foundList ) {
          const key = founNodeData.key;
          // Try to get a label
          let label = '';
          if( founNodeData.label ) label = founNodeData.label;
          if( !label && founNodeData.text ) label = founNodeData.text;
          if( !label && founNodeData.category ) label = founNodeData.category;
          // Generate html
          const item = `[${key}]&nbsp;${label}`;
          const jsCode = `m.e.selectAndCenterNodeInGraph("${key}")`;
		      source = source+`<div class="findResult" onclick='${jsCode}'>${item}</div>`;
          ++index;
        }
        searchResult.innerHTML=`${source}`;
        // Set onclick event
        this.foundInfo.elementList = document.querySelectorAll( '.findResult' );
        for( let i = 0; i < this.foundInfo.elementList.length; ++i ) {
          const element = this.foundInfo.elementList[i];
          const key = this.foundInfo.foundList[i].key;
          element.onclick = ()=> doSelectItem( key, i );
        }
        // If we found only one entry => we put it in the center automatically
        if( this.foundInfo.foundList.length == 1 ) {
          doFindNavigate( 'PageDown', this.foundInfo );
        }
      }
    }
    inputField.onkeyup = doSearch;
  }
  saveEditorContent( onSaved ) {
    if( onSaved ) {
      onSaved();
    }
  }
}
class DSLViewer extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.id = id;
    this.editor = null;

    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                         config.htmlDiv.mainDiv,
                                         this.storeWindowPosition.bind(this),
                                         position );
    this.loadEditorContent( nodeData );
  }
  loadEditorContent( nodeData ) {
    // Update current nodeData
    this.nodeData = nodeData;
    // Update window title with:
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${nodeData.fileType}]`;
    this.setTitle( this.title );
    // Get DSL list
    const ei = m.e.getEditorInfo( config.htmlDiv.graphDiv );
    const graphEditor = ei.editor;
    const graphDSLNameList = graphEditor.getDSLNameList();
    const allDSLNameList = Object.keys( m.dslNameList );
    // Generate HTML
    const element = document.getElementById( this.editorDivId );
    let source = '';
    for( const dslName of allDSLNameList ) {
      if( graphDSLNameList.indexOf( dslName ) != -1 ) {
        source = source +`<input class="dslItem" type="checkbox" id="${dslName}" name="${dslName}" checked>
                          <label class="findResult" for="${dslName}">${dslName}</label><br>`;
        //source = source+`<div class="findResult" onclick=''>&nbsp;[-]&nbsp;${dslName}</div>`;
      } else {
        //source = source+`<div class="findResult" onclick=''>&nbsp;[+]&nbsp;${dslName}</div>`;
        source = source +`<input class="dslItem" type="checkbox" id="${dslName}" name="${dslName}" onclick="">
                          <label class="findResult" for="${dslName}">${dslName}</label><br>`;
      }
    }
    element.innerHTML = `<button class="setDSLButton" type="button" style="width=100%">Set DSL for current graph</button>
                         <div class="searchResult">
                         ${source}
                         </div>`;
    const setButton = document.querySelector( '.setDSLButton' );
    setButton.onclick = ()=> {
      const dslItemElementList = document.querySelectorAll( 'input[class="dslItem"]' );
      const newDSLList = [];
      for( const dslItemElement of dslItemElementList ) {
        if( dslItemElement.checked ) {
          newDSLList.push( dslItemElement.name );
        }
      }
      //graphEditor.setDSLNameList( newDSLList );
      graphEditor.loadDSLList( newDSLList );
    };
  }
  saveEditorContent( onSaved ) {
    if( onSaved ) {
      onSaved();
    }
  }
}
class GraphTemplateViewer extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.id = id;
    this.editor = null;

    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                         config.htmlDiv.mainDiv,
                                         this.storeWindowPosition.bind(this),
                                         position );
    this.loadEditorContent( nodeData );
  }
  loadEditorContent( nodeData ) {
    // Load graph editor
    const graphEditor = m.e.getEditor( config.htmlDiv.graphDiv );
    // Update current nodeData
    this.nodeData = nodeData;
    // Update window title with:
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${nodeData.fileType}]`;
    this.setTitle( this.title );
    // Template List (loaded later from a file)
    let templateList = {};
    // Set editor content
    const element = document.getElementById( this.editorDivId );
    element.innerHTML = `<div id='searchResult' ></div>`;
    const showTemplates = (sourceTemplateList)=> {
      templateList = JSON.parse( sourceTemplateList );
      let source = '';
      const templateNameList = Object.keys( templateList );
      for( const templateName of templateNameList ) {
        const templateUrl = templateList[templateName];
        // Generate html
        source = source+`<div class="findResult graphTemplateItem">${templateName}</div>`;
      }
      searchResult.innerHTML = source;
      const applyTemplate = ( name )=> {
        console.log( 'Appying template: '+name );
        if( templateList[name] ) {
          const url = templateList[name];
          _openFile( url, (sourceTemplate)=> {
            const e = m.e.getEditor( config.htmlDiv.graphDiv );
            e.setJSONModel( sourceTemplate );
          });
        }
      }
      const itemElementList = document.querySelectorAll( '.graphTemplateItem' );
      for( const item of itemElementList ) {
        item.onclick = ()=> applyTemplate( item.textContent );
      }
    }
    // Load Templates
    let url = `${config.host.fileServerURL}/graphTemplateList.json`;
    _openFile( url, (source)=> {
      showTemplates( source );
    });
  }
  saveEditorContent( onSaved ) {
    if( onSaved ) {
      onSaved();
    }
  }
}
class SystemMonitorViewer extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.id = id;
    this.editor = null;

    const ei = m.e.getEditorInfo( config.htmlDiv.graphDiv );
    ei.addListerner( 'onLoad', ()=> this.loadEditorContent( nodeData ) );
    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                         config.htmlDiv.mainDiv,
                                         this.storeWindowPosition.bind(this),
                                         position );  
    this.loadEditorContent( nodeData );
    // Refresh System Monitor every 30 seconds
    setInterval( ()=> this.loadEditorContent( this.nodeData ), 30*1000 );
  }
  loadEditorContent( nodeData ) {
    // Update current nodeData
    this.nodeData = nodeData;
    // Update window title with:
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${nodeData.fileType}]`;
    this.setTitle( this.title );
    // Update pin
    if( nodeData.fileURL ) {
      m.e.showWindowPin( this.id );
    }
    // Set editor content
    const element = document.getElementById( this.editorDivId );
    element.innerHTML = `<div style="width=100%;height = 100%">
                            <button type='button' style="width=100%" onclick='saveAllEditorContent()'>Save All</button>
                            <button id='sysMonitorRefresh' type='button' style="width=100%">Refresh</button>
                            <button type='button' style="width=100%" onclick='m.e.openSelectionWindow()'>Show Selection Editor</button>
                            <button type='button' style="width=100%" onclick='m.e.openModelWindow()'>Show Model Editor</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( -1 )'>Slide Window to Left</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( +1 )'>Slide Window to Right</button>
                          </div>
                          <div id='windowList'></div>`;
    const refreshButton = document.querySelector( '#sysMonitorRefresh' );
    refreshButton.onclick = ()=> this.loadEditorContent( nodeData );
    const wList = document.querySelector( '#windowList' );
    const oeList = m.e.getEditorIdList();
    let source = '<table style="color: aquamarine;font-size: smaller;">';
    for( const id of oeList ) {
      // Get fileURL
      const ei = m.e.getEditorInfo( id );
      const url = ( ei.nodeData.fileURL? ei.nodeData.fileURL: '' );

      // Get position
      const elem = document.getElementById( id );
      const leftPos = parseInt( elem.style.left );
      const browserWidth = window.innerWidth;
      let screen = 'Center'
      if( leftPos < 0 ) {
        const s = Math.ceil( Math.abs( leftPos/browserWidth ) );
        screen = `Left[${s}]`;
      } else if( leftPos > browserWidth ) {
        const s = Math.floor( Math.abs( leftPos/browserWidth ) );
        screen = `Right[${s}]`;
      }

      // Add item
      const item = `<tr><td>[${id}]<td>${ei.title}<td>URL: ${url}<td>${screen}</tr>`;
      source = source+item;
    }
    wList.innerHTML = source;
    this.editorSaved( this.id );
  }
  saveEditorContent( onSaved ) {
    this.editorSaved();
    if( onSaved ) {
      onSaved();
    }
  }
}
class AnimatorEditor extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.id = id;
    this.editor = null;

    this.title = 'Animator Editor';
    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                         config.htmlDiv.mainDiv,
                                         this.storeWindowPosition.bind(this),
                                         position );

    this.editor = new SourceCodeEditor( this.editorDivId );
    const language = 'text';
    this.editor.setEditorMode( 'ace/mode/'+language );
    this.editor.setEditorSource( '// Put here animation info, like: {"key":10}' );
    this.editor.onEvent( 'changeSelection', this._onEditorSelectionChanged.bind( this ) );
    this.graphEditor = m.e.getEditor( config.htmlDiv.graphDiv );

    this.loadEditorContent( nodeData );
  }
  animateNode( lineIndex ) {
    let lineText = '';
    if( lineIndex == undefined ) {
      lineText = this.editor.getCurrentLineText()
    } else {
      lineText = this.editor.getLineTextAt( lineIndex );
    }
    // We look for lines like: { "key": "value, .... } with or without an ending like '},' (comma)
    let nodeData = this._getJSONLineInfo( lineText );

    if( nodeData ) {
      // If object has no field with name "key" ==> we search for a node from a different field
      if( nodeData.key == undefined ) {
        // If "key" is not a filed, we search for any other field we could use
        const lineInfoFieldList = Object.keys( lineInfo );
        for( const fieldName of lineInfoFieldList ) {
          if( this.graphEditor.isDataValidField( fieldName ) ) {
            // Find here only perfect match (last true param of the next line)
            nodeData = this.graphEditor.findNodeData( fieldName, lineInfo[fieldName], true );
            if( nodeData ) {
              break;
            }
          }
        }
      }
    }
    // If we found a node and it has a "key" field
    if( nodeData && nodeData.key ) {
      m.e.selectAndCenterNodeInGraph( nodeData.key );
    }
  }
  loadEditorContent( nodeData ) {
    this.nodeData = nodeData;
    // Nothing to do
  }
  saveEditorContent( onSaved ) {
    if( onSaved ) {
      onSaved();
    }
  }
  _onEditorSelectionChanged() {
    let selLines = this.editor.getCurrentSelectionLines();
    if( selLines.start == selLines.end ) {
      this.animateNode();
    } else {
      selLines.currLine = selLines.start;
      setTimeout( ()=> this._playAnimation( selLines ), 1*1000 ); // 1 second delay
    }
  }
  _playAnimation( animationInfo ) {
    this.animateNode( animationInfo.currLine++ );
    if( animationInfo.currLine <= animationInfo.end ) {
      setTimeout( ()=> this._playAnimation( animationInfo ), 1*1000 ); // 1 second delay
    }
  }
  _getJSONLineInfo( lineText ) {
    let result = null;
    if( lineText.startsWith( '{' ) ) {
      if( lineText.endsWith( '},' ) ) {
        lineText = lineText.substring( 0, lineText.length-1 )
      }
      if( lineText.endsWith( '}' ) ) {
        try {
          // Parse object at current line
          result = JSON.parse( lineText );
        } catch( error ) {
          // Skip wrong json text
        }
      }
    }
    return( result );
  }
}