/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Editor Manager
Date: 10.07.2020
=============================================================================
*/

class EditorManager extends EditorChangeManager {
  constructor() {
    super( 0.5 ); // Saving timeout: 0.5 (500 milli seconds)
    this.id = 'Session';
    this.registeredEditorList = [
      // NOTE: order matter here, since the first matching editor get selected
      { name: 'WebViewer',            fileType: (ft)=> ft == 'application/html',          classRef: WebViewer },
      { name: 'HTMLExploreEditor',    fileType: (ft)=> ft == 'application/explore',       classRef: HTMLExploreEditor },
      { name: 'TextEditor',           fileType: (ft)=> ft.startsWith( 'text/' ),          classRef: TextEditor },
      { name: 'TextEditor',           fileType: (ft)=> ft == 'application/x-shellscript', classRef: TextEditor },
      { name: 'ImageEditor',          fileType: (ft)=> ft.startsWith( 'image/' ),         classRef: ImageEditor },
      { name: 'GraphEditor',          fileType: (ft)=> ft == 'text/json',                 classRef: GraphEditor },
      { name: 'FindViewer',           fileType: (ft)=> ft == 'input/fields',              classRef: FindViewer },
      { name: 'DSLViewer',            fileType: (ft)=> ft == 'input/fields',              classRef: DSLViewer },
      { name: 'GraphTemplateViewer',  fileType: (ft)=> ft == 'input/fields',              classRef: GraphTemplateViewer },
      { name: 'SystemMonitorViewer',  fileType: (ft)=> ft == 'system/status',             classRef: SystemMonitorViewer },
      { name: 'AnimatorEditor',       fileType: (ft)=> ft == 'input/fields',              classRef: AnimatorEditor },
      //window.open('https://www.google.com','node13',"width=200,height=100")
    ];

    // Status variables
    this.editorList = {};
    this.domUniqueId = 0;
    this.isStatusOnUpdate = false;
    this.isMoveAllWindowRunning = false;

    // Saving events
    //this.onNeedSave( ... ) // Show star in title...
    this.onDoSave( ()=> {
      // Save current status of the system
      console.log( 'Saving status...' );
      saveStatus();
    });
  }
  getEditorIdList() {
    const editorIdList = Object.keys( this.editorList );
    return( editorIdList );
  }
  isEditorOpen( id, nodeData ) {
    const pw = getStatus( 'pinnedWindow' );
    const isIdExist = this.editorList[id] != undefined;
    const isPinnedWindow = ( nodeData.isFile && pw[nodeData.isFile] );
    return( isIdExist || isPinnedWindow );
  }
  getEditor( idOrData ) {
    let result = null;
    let id = idOrData;
    if( typeof( idOrData ) == 'object' ) {
      id = m.e._getDOMUniqueId( idOrData );
    }
    if( this.editorList[id] ) {
      result = this.editorList[id].editor;
     }
    return( result );
  }
  getEditorInfo( id ) {
    let result = this.editorList[id];
    if( id == this.id ) {
      result = this;
    }
    return( result );
  }
  openSelectionWindow() {
    const e = this.getEditor( config.htmlDiv.graphDiv );
    const nodeData = e.findNodeData( 'isSystem', '$GraphSelection$' );
    if( nodeData ) {
      e.updateSystemNode( nodeData );
      // Get a copy of the node data
      //const newNodeData = e.getNodeData( nodeData.key, true );
      const newNodeData = getNodeData( nodeData.key, true );
      // Open window
      this.openWindowFromNodeData( newNodeData );
    }
  }
  openModelWindow() {
    const e = this.getEditor( config.htmlDiv.graphDiv );
    const nodeData = e.findNodeData( 'isSystem', '$GraphModel$' );
    if( nodeData ) {
      e.updateSystemNode( nodeData );
      // Get a copy of the node data
      //const newNodeData = e.getNodeData( nodeData.key, true );
      const newNodeData = getNodeData( nodeData.key, true );
      // Open window
      this.openWindowFromNodeData( newNodeData );
    }
  }
  openWindowFromNodeData( nodeData, x, y ) {
    let position = ( x != undefined && y != undefined? [x, y, 400, 350]: undefined );
    const id = m.e._getDOMUniqueId( nodeData );
    m.e.openWindow( id, null, nodeData, position );
    // Show save button for system nodes
    if( nodeData.isSystem ) {
      const ei = m.e.getEditorInfo( id );
      ei.showSaveButton();
    }
  }
  openWindow( id, name, nodeData, position, isPinned ) {
    position = ( position == undefined? [100, 100, 400, 350]: position );
    isPinned = ( isPinned == undefined? false: isPinned );
    // If editor already open => put window on top
    if( this.isEditorOpen( id, nodeData ) ) {
      this.putWindowOnTop( id );
      return;
    }
    // If node is not file or dir => nothing to do
    if( !nodeData.isFile && !nodeData.isDir ) {
      return;
    }
    // Find an editor for name or type
    let editorInfo = null;
    if( name ) {
      // Search for name
      for( const editor of this.registeredEditorList ) {
        if( editor.name == name ) {
          editorInfo = editor;
          break;
        }
      }
    } else {
      // Serarch for type
      const fileType = ( nodeData.fileType? nodeData.fileType: 'text/text' );
      for( const editor of this.registeredEditorList ) {
        if( editor.fileType( fileType ) ) {
          editorInfo = editor;
          break;
        }
      }
    }
    // If editor found
    if( editorInfo ) {
      // Get parent graph URL from which the window/graph was open
      const currGraphNodeData = getStatus( 'currentGraphNode' );
      const graphURL = currGraphNodeData.fileURL;
      // Compute position
      const owl = getStatus( 'openWindowList' );
      if( owl[graphURL] && owl[graphURL][nodeData.key] ) {
        position = owl[graphURL][nodeData.key];
      }
      // Instantiate the new editor
      editorInfo = new editorInfo.classRef( id, nodeData, position );
      this.editorList[id] = editorInfo;
      editorInfo.setParentGraph( currGraphNodeData );
      // If should be pinned => pin it
      if( isPinned ) {
        editorInfo.setPinOn();
      }
      // Store current position
      editorInfo.storeWindowPosition();
      this.suggestToSave();
    } else {
      console.log( 'Could not open window. Type or Name not found for '+id );
    }
  }
  newDOMWindow( id, name, parentDivId, onPositionChanged, position ) {
    // Define editor id
    const editorDivId = id+'Editor';
    // Create main div editor
    const emDiv = document.createElement( 'div' );
    emDiv.id = id;
    emDiv.className = 'editorMainDiv';
    // Position editor
    const browserWidth = window.innerWidth;
    const browserHeight = window.innerHeight;
    if( position && position[0] ) { 
      // NOTE: I commented the next line to keep style.left as it is so that
      //       window are restored also in the horizontal virtual screen
      //emDiv.style.left = Math.min( browserWidth-100, Math.max( 0, position[0] ) )+'px';
      emDiv.style.left = position[0]+'px';
    }
    if( position && position[1] ) {
      emDiv.style.top = Math.min( browserHeight-100, Math.max( 0, position[1] ) )+'px';
    }
    if( position && position[2] ) { emDiv.style.width = position[2]+'px'; }
    if( position && position[3] ) { emDiv.style.height = position[3]+'px'; }
    // Create HTML elements
    emDiv.innerHTML = `<div class='editorMainDivChild' >
                        <div class='resizerObj'>
                          <div class='resizerHeader' onmousedown="m.e.putWindowOnTop('${id}')">
                            <button class='editorDivBClose' type="button" 
                                    onclick="m.e.closeEditor( true, '${id}')">&#x2715
                            </button>
                            <!--button class='editorDivBCollapse' type="button"
                                    onclick="m.e.toogleCollapseWindow('${id}')">-
                            </button-->
                            <button class='editorDivBPin' type="button"
                                    onclick="m.e.pinEditor('${id}')">📎
                            </button>
                            <button class='editorDivBSave' type="button"
                                    onclick="m.e.saveEditor('${id}')">Save
                            </button>
                            <div class='title'>${name}</div>
                          </div>
                          <div class='editorDiv' id='${editorDivId}'></div>
                          <div class='resizer top-left'></div>
                          <div class='resizer bottom-right'></div>
                        </div>
                      </div>`;
    // Add new editor in DOM
    document.getElementById( parentDivId ).appendChild( emDiv );
  
    const onWindowResize = ()=> {
      if( onPositionChanged ) {
        onPositionChanged()
      }
      _resizeWindow();
    };
    // Set reziable control buttons
    setDivAsResizable( `#${id}`, 'px', onWindowResize );
    return( editorDivId );
  }
  // TODO: the button for this is not well visulized
  toogleCollapseWindow( id ) {
    const editorDiv = document.querySelector( `#${id} .editorDiv` );
    const sizerTopDiv = document.querySelector( `#${id} .top-left` );
    const sizerBottomDiv = document.querySelector( `#${id} .bottom-right` );
    const status = ( editorDiv.style.visibility == 'hidden'? 'visible': 'hidden' );
    editorDiv.style.visibility = status;
    sizerTopDiv.style.visibility = status;
    sizerBottomDiv.style.visibility = status;
  }
  showWindowPin( id, status ) {
    status = ( status == undefined? 'visible': status );
    const element = document.querySelector( `#${id} .editorDivBPin` );
    if( element ) {
      switch( status ) {
        case 'pinned':
          element.innerText='📌';
          break;
        case 'unpinned':
          element.innerText='📎';
          break;
        default:
          element.style.visibility = status;
          break;
      }
    } else {
      console.log( 'Cant set pin for window: '+ id );
    }
  }
  putWindowOnTop( id ) {
    // Get main graph info
    const ei = this.getEditorInfo( config.htmlDiv.graphDiv );
    const graphURL = ei.nodeData.fileURL;
    const e = ei.editor;
    const minZ = 10;
    // Get z index of window to put on top
    const eWindow = document.getElementById( id );
    let zWindow = eWindow.style.zIndex;
    zWindow = parseInt( !zWindow? minZ: zWindow );
    // List of all open window
    let winInfoList = [];
    // Get list of id of all windows open on a graph
    const owl = getStatus( 'openWindowList' );
    let currZ = minZ;
    if( owl[graphURL] ) {
      // Get info from all open window
      const owlKyeList = Object.keys( owl[graphURL] );
      for( const key of owlKyeList ) {
        // Ger window related info
        //const nodeData = e.getNodeData( key );
        const nodeData = getNodeData( key );
        const wId = m.e._getDOMUniqueId( nodeData );
        const we = document.getElementById( wId );
        if( we ) {
          // Get current z order
          let wz = we.style.zIndex;
          wz = parseInt( !wz? currZ++: wz );
          // Store window info
          winInfoList.push( { wId, we, wz } );
        }
      }
    }
    // Get list of id of all windows pinned
    const pw = getStatus( 'pinnedWindow' );
    if( pw ) {
      // Get info from all open window
      const pwURLList = Object.keys( pw );
      for( const url of pwURLList ) {
        const nodeData = pw[url];
        // Ger window related info
        const wId = m.e._getDOMUniqueId( nodeData );
        const we = document.getElementById( wId );
        if( we ) {
          // Get current z order
          let wz = we.style.zIndex;
          wz = parseInt( !wz? currZ++: wz );
          // Store window info
          winInfoList.push( { wId, we, wz } );
        }
      }
    }
    // Sort all window according to z order
    winInfoList.sort( (a,b)=> { 
      if( a.wz < b.wz ) return -1;
      else if( a.wz > b.wz ) return +1;
      else return 0;
    });
    // Re-assign a z order in a fix range
    for( let i = 0; i < winInfoList.length; ++i ) {
      const winInfo = winInfoList[i];
      winInfo.we.style.zIndex = minZ+i;
    }
    // Set highest z value to id window
    eWindow.style.zIndex = minZ+winInfoList.length+1;
    //this._setEditorZIndex( winId, topZ );
  }
  saveEditor( id, onSaveDone ) {
    const ei = this.getEditorInfo( id );
    //if( ei.isNeedSave() ) {
      ei.clearStatus();
      ei.saveEditorContent( onSaveDone );
    /*} else {
      if( onSaveDone ) {
        onSaveDone();
      }
    }*/
  }
  // This function saves the current status (Editor content of EditorManager)
  saveEditorContent( onSaved ) {
    const onStatusSaved = ()=> {
      this.editorSaved();
      if( onSaved ) {
        onSaved();
      }
    }
    saveStatus( onStatusSaved );
  }
  saveWindowPosition( id, nodeData, isPin ) {
    if( id && nodeData && !this.isStatusOnUpdate ) {
      const ei = this.getEditorInfo( config.htmlDiv.graphDiv );
      const position = this.getEditorPosition( id );
      // Set position in nodeData too
      nodeData.editorPosition = position;
      // Check if window is pinned or not
      if( isPin ) {  // If window pinned
        const pw = getStatus( 'pinnedWindow' );
        pw[nodeData.fileURL] = nodeData;
        setStatus( (s)=> s.pinnedWindow = pw );
      } else {  // If unpinned window
        const ei2 = this.getEditorInfo( id );
        const parentGraph = ei2.getParentGraph();
        if( parentGraph ) {
          const url = parentGraph.fileURL;
          const owl = getStatus( 'openWindowList' );
          if( !owl[url] ) {
            owl[url] = {};
          }
          owl[url][nodeData.key] = position;
          setStatus( (s)=> s.openWindowList = owl );
        }
      }
      this.editorHasChanged();
    }
  }
  pinEditor( id, isForcePin ) {
    const ei = this.getEditorInfo( id );
    const nodeData = ei.nodeData;
    // If not yet pinned window
    this.tooglePinNodeData( nodeData, isForcePin )
    // If succesfully pinned
    if( this.isURLPinned( nodeData.fileURL) ) {
      // In case, remove window from openWindowList
      const owl = getStatus( 'openWindowList' );
      const parentGraph = ei.getParentGraph();
      if( parentGraph ) {
        const url = parentGraph.fileURL;
        if( owl[url] ) {
          if( owl[url][nodeData.key] ) {
            delete owl[url][nodeData.key];
          }
        }
        // Disable pin button
        this.showWindowPin( id, 'pinned' );
        this.editorHasChanged();
      }
    } else {
      const owl = getStatus( 'openWindowList' );
      const parentGraph = ei.getParentGraph();
      if( parentGraph ) {
        const url = parentGraph.fileURL;
        if( !owl[url] || !owl[url][nodeData.key] ) {
          if( !owl[url]  ) {
            owl[url] = {};
          }
          const position = this.getEditorPosition( id );
          owl[url][nodeData.key] = position;
          setStatus( (s)=> s.openWindowList = owl );
          this.showWindowPin( id, 'unpinned' );
        }
      }
    }
  }
  tooglePinNodeData( nodeData, isForcePin ) {
    isForcePin = ( isForcePin == undefined? false: isForcePin );
    const pw = getStatus( 'pinnedWindow' );
    if( !pw ) {
      pw = {};
    }
    // Pin the window if forced or requested to pin
    if( !pw[nodeData.fileURL] || isForcePin ) {
      if( nodeData && nodeData.fileURL ) {
        pw[nodeData.fileURL] = {
          key: nodeData.key,
          isFile: nodeData.isFile,
          fileURL: nodeData.fileURL,
          fileType: nodeData.fileType,
          editorPosition: nodeData.editorPosition,
        };
        if( nodeData.isVisible != undefined ) {
          pw[nodeData.fileURL]['isVisible'] = nodeData.isVisible;
        }
      }
      setStatus( (s)=> s.pinnedWindow = pw );
    } else {
      // Unpin if already pinned window
      delete pw[nodeData.fileURL];
      if( !this.isStatusOnUpdate ) {
        setStatus( (s)=> s.pinnedWindow = pw );
      }
    }
  }
  isURLPinned( url ) {
    const pw = getStatus( 'pinnedWindow' );
    return( pw[url]? true: false );
  }
  updateSessionStatus() {
    // Save DSL palette status 
    const e = this.getEditor( config.htmlDiv.graphDiv );
    const paletteNodeData = e.getPaletteInfo();
    if( paletteNodeData ) {
      this.tooglePinNodeData( paletteNodeData, true );
    }
  }
  reopenStartSession() {
    const pw = getStatus( 'pinnedWindow' );
    if( pw ) { // pinned window
      const urlList = Object.keys( pw );
      for( const url of urlList ) {
        const nodeData = pw[url];
        if( url != '#systemPalette#' ) {
          const id = this._getDOMUniqueId( nodeData );
          const isPinned = true;
          const position = nodeData.editorPosition;
          this.openWindow( id, null, nodeData, position, isPinned );
          this.showWindowPin( id, 'hidden' );
          // Show save button for system nodes
          if( nodeData.isSystem ) {
            const ei = m.e.getEditorInfo( id );
            ei.showSaveButton();
          }
        } else {
          const e = this.getEditor( config.htmlDiv.graphDiv );
          e.restorePalette( nodeData );
        }
      }
    }
  }
  reopenGraphSession( url ) {
    this.isStatusOnUpdate = true;
    const owl = getStatus( 'openWindowList' );
    const e = this.getEditor( config.htmlDiv.graphDiv );
    if( e && owl && url ) {
      if( owl[url] ) { // Graph's window
        const keyList = Object.keys( owl[url] );
        // Load opened window for this graph
        for( const key of keyList ) {
          //const nodeData = e.getNodeData( key );
          const nodeData = getNodeData( key );
          if( nodeData ) {
            const position = owl[url][key];
            if( nodeData ) {
              const id = this._getDOMUniqueId( nodeData );
              this.openWindow( id, null, nodeData, position );
              // Show save button for system nodes
              if( nodeData.isSystem ) {
                const ei = m.e.getEditorInfo( id );
                ei.showSaveButton();
              }
            }
          } else { // Node may be deleted
            delete owl[url][key];
            this.editorHasChanged();
          }
        }
      }
    }
    this.isStatusOnUpdate = false;
  }
  closeEditor( isOnClick, id, onCloseDone ) {
    if( id == undefined ) {
      this.closeAllEditor( onCloseDone );
    } else {
      if( id == config.htmlDiv.graphDiv ) {
        // This function do not close the Main Graph Edito
        if( onCloseDone ) {
          onCloseDone();
        }
        return;
      }
      const ei = this.getEditorInfo( id );
      // We close a window only if
      // - the user click the close editor button
      // - or the editor is not pinned
      if( isOnClick || !ei.isPin() ) {
        const onSaveDone = ()=> {
          // If is not diagram -> remove window editor
          if( isOnClick ) {
            // Remove from pinned window if it is there
            const pw = getStatus( 'pinnedWindow' );
            if( pw ) {
              const fileURL = ei.nodeData.fileURL;
              if( pw[fileURL] ) {
                delete pw[fileURL];
                if( !this.isStatusOnUpdate ) {
                  setStatus( (s)=> s.pinnedWindow = pw );
                }
              }
            }
            // Remove window from openWindowList if it is there
            const nodeData = ei.nodeData;
            if( nodeData ) {
              const parentGraph = ei.getParentGraph();
              if( parentGraph ) {
                const url = parentGraph.fileURL;
                const owl = getStatus( 'openWindowList' );
                if( owl[url][nodeData.key] ) {
                  delete owl[url][nodeData.key];
                }
                if( !this.isStatusOnUpdate ) {
                  setStatus( (s)=> s.openWindowList = owl );
                }
              }
            }
          }
          // Delete window
          delete this.editorList[id];
          const element = document.getElementById( id );
          element.parentNode.removeChild( element );
          if( onCloseDone ) {
            onCloseDone();
          }
          this.editorHasChanged();
        };
        // Inform the editor that is going to be closed
        ei.onClosing();
        // Inform the editor to save its content
        this.saveEditor( id, onSaveDone );
      } else {
        if( onCloseDone ) {
          onCloseDone();
        }
      }
    }
  }
  closeAllEditor( onCloseDone ) {
    this.isStatusOnUpdate = true;
    // Close all opened editors
    let idList = Object.keys( this.editorList );
    const onDone = ()=> {
      if( onCloseDone ) {
        this.isStatusOnUpdate = false;
        onCloseDone();
      }
    }
    this._closeIdListEditor( idList, onDone );
  }
  moveAllWindowTo( direction ) {
    if( this.isMoveAllWindowRunning ) {
      return;
    }
    // Lock this function
    this.isMoveAllWindowRunning = true;

    //Start the animation
    const browserWidth = window.innerWidth;
    const horizontalShift = browserWidth*direction;
    const windowDivList = document.getElementById('mainDiv').children;
    let scrollStepTime = 5;
    let scrollPosition = 0;
    const scrollInc = horizontalShift/100;
    const currWinPosition = {};
    const doScroll = ()=> {
      // Execute animation
      if( Math.abs( scrollPosition ) < Math.abs( horizontalShift ) ) {
        for( const div of windowDivList ) {
          if( div.id != '_systemMonitor__System_Monitor' ) {
            if( scrollPosition == 0 ) {
              currWinPosition[div.id] = parseInt( div.style.left );
            }
            div.style.left = ( parseInt( div.style.left )+scrollInc )+'px';
          }
        }
        scrollPosition += scrollInc;
        setTimeout( doScroll, scrollStepTime );
      } else {
        // At the end, in order to avoid decimal drift we set a final position again
        // In this way we have no cumulative error due to scrollInc decimals cut
        for( const div of windowDivList ) {
          if( div.id != '_systemMonitor__System_Monitor' ) {
            const positionX = (currWinPosition[div.id]+(direction*browserWidth));
            div.style.left = positionX+'px';

            // Update window position in window status
            const key = this._getWindowKey( div.id );
            if( key != -1 ) {
              const graphURL = getMainGraphURL();
              //const winInfo = m.status.openWindowList[graphURL];
              const owl = getStatus( 'openWindowList' );
              if( owl ) {
                const winInfo = owl[graphURL];
                if( winInfo ) {
                  const posInfo = winInfo[key];
                  if( posInfo ) {
                    posInfo[0] = positionX;
                  }
                }
              }
            }
          }
        }
        this.editorHasChanged();

        // Unlock this function
        this.isMoveAllWindowRunning = false;
      }
    };
    setTimeout( doScroll, scrollStepTime );
  }
  updateGraphHistory() {
    // Put previously visited graph in history
    const oldCG = getStatus( 'currentGraphNode' );
    if( oldCG ) {
      setStatus( (s)=> {
        s.graphHistory.push( oldCG );
        if( s.graphHistory.length > config.graph.maxHistoryLength ) {
          s.graphHistory.shift();
        }
      });
      this.editorHasChanged();
    }
  }
  getEditorPosition( id ) {
    let position = [0,0];
    const element = document.getElementById( id );
    if( element ) {
      position = [ parseInt( element.style.left ),
                   parseInt( element.style.top ),
                   parseInt( element.style.width ),
                   parseInt( element.style.height ) ];
    }
    return( position );
  }
  selectNodeInGraph( key ) {
    const e = this.getEditor( config.htmlDiv.graphDiv );
    e.selectNodeByKey( key );
  }
  centerGraphToNodeKey( key ) {
    const e = this.getEditor( config.htmlDiv.graphDiv );
    e.centerGraphToNodeKey( key );
  }
  selectAndCenterNodeInGraph( key ) {
    this.selectNodeInGraph( key );
    this.centerGraphToNodeKey( key );
  }
  findNodeInGraph( field, value ) {
    const e = this.getEditor( config.htmlDiv.graphDiv );
    return( e.findAllNodeData( field, value ) );
  }
  //------------------------
  // Private Functions
  //------------------------
  _getDOMUniqueId( nodeData ) {
    // Get a new id from a node (url_key) (couterpart of _getWindowKey)
    if( nodeData ) {
      const url = ( nodeData.fileURL? nodeData.fileURL: 'emptyURL' );
      const id = url+'_'+nodeData.key;
      return( id.replaceAll( /[^A-Za-z0-9]/g, "_" ) ); // make valid identifier
    } else {
      return( 'noId' );
    }
  }
  _getWindowKey( uniqueId ) {
    // Get the key of the node that opened this window id (couterpart of _getDOMUniqueId)
    let result = -1;
    const idx = uniqueId.lastIndexOf( '_' );
    if( idx != -1 ) {
      const key = uniqueId.substring( idx+1 );
      result = parseInt( key );
    }
    return( result );
  }
  _closeIdListEditor( idList, onCloseDone ) {
    if( !Array.isArray( idList ) ) {
      if( onCloseDone ) {
        onCloseDone();
      }
    } else {
      const idListCopy = [...idList];
      const id = idListCopy.pop();
  
      if( id ) {
        this.closeEditor( false, id, ()=> {
          this._closeIdListEditor( idListCopy, onCloseDone );
        });
      } else {
        if( onCloseDone ) {
          onCloseDone();
        }
      }
    }
  }
  _setEditorZIndex( id, z ) {
    const element = document.getElementById( id );
    if( element ) {
      element.style.zIndex = z;
    }
  }
}

/*
    * This function is a fix to the problem of resizing the left panel (DSL)
    * This function will trigger a refresh of the browser so that 
    * the content of the left panel if properly rendered.
    * The problem can be seen by just dragging the size of the left 
    * panel and see the DSL element not cut/rendered properly
    */
function _resizeWindow() {
  var evt = document.createEvent('UIEvents');
  evt.initUIEvent('resize', true, false, window, 0);
  window.dispatchEvent( evt );
}