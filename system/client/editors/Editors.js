/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Editors and Viewers
Date: 10.07.2020
=============================================================================
*/

class EditorBase extends EditorChangeManager {
  constructor() {
    super( 10 ); // TODO: set to 10 // Saving timeout: 10 seconds
    this.nodeData = null;
    this.title = '';
    this.parentGraph = null;
    // Last modification time of the currently loaded graph 
		// from the server (file modification time)
		this.mtime = null;
  }
  setTitle( title ) {
    title = ( title != undefined? title: this.title );
    if( this.editor instanceof WinBox ) {
      this.editor.setTitle( title );
    } else if( this.editor && ( this.editor.opener == window ) ) {
      // Not possible
    } else {
      const element = document.querySelector( `#${this.id} .title` );
      if( element ) {
        element.innerHTML = title;
      }
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
    m.e.pinEditor( this.id, true );
  }
  isPin() {
    const pw = getStatus( 'pinnedWindow' );
    const nodeData = pw[this.nodeData.fileURL];
    return( ( nodeData != undefined ) && ( nodeData.key == this.nodeData.key ) );
  }
  onClosing() {
    //console.log( 'Closing the Editor' );
  }
  showSaveButton( status ) {
    status = ( status == undefined? true: status );
    const element = document.querySelector( `#${this.id} .editorDivBSave` );
    element.style.visibility = ( status? 'visible': 'hidden' );
  }
  getSourceLastModificationTime() {
		return( this.mtime );
	}
	setSourceLastModificationTime( mtime ) {
		this.mtime = mtime;
	}
  doLoadLastUpdateTime( nodeData, onTimeUpdated ) {
    const onFileInfo = ( fileInfo )=> {
      // Store fileInfo last modification date if available
      if( fileInfo.mtime ) {
        this.setSourceLastModificationTime( fileInfo.mtime );
      }
      if( onTimeUpdated ) {
        onTimeUpdated( nodeData );
      }
    };
    // Get last modification time of loaded node (file) from server
    getNodeInfoFromServer( nodeData, onFileInfo );
  }
  doCheckLastUpdateTime( nodeData, onTimeChecked ) {
    const onFileInfo = ( fileInfo )=> {
      // Parameter of callback
      let doAbortSave = false;
      // Get current graph last modificatio time at loading of the graph
      const editorMTime = this.getSourceLastModificationTime();
      // If we get info
      if( fileInfo.mtime && editorMTime ) {
        const editorTime = new Date( editorMTime ).getTime();
        // Last modification time of last version of file from server
        const fInfoTime = new Date( fileInfo.mtime ).getTime();
        // If time from server is newer than current time ==> inform we may override
        if( fInfoTime > editorTime ) {
          const label = nodeData.label;
          const isDoOverwrite = confirm( `${label} in the server is newer than current graph. Do you want to overwrite?` );
          doAbortSave = !isDoOverwrite;
        }
      }
      if( onTimeChecked ) {
        onTimeChecked( doAbortSave );
      }
    };
    // Get last modification time of loaded node (file) from server
    getNodeInfoFromServer( nodeData, onFileInfo );
  }
}
class GraphEditor extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.isContentJustLoaded = true;
    this.id = id;
    this.fileType = 'text/json';
    this.listenerList = {
      'onLoad': [],
    };

    // New graph editor
    this.editor = new Graph( { 
      graphId: id,  
      fullPaletteId: config.htmlDiv.paletteDiv,
      nodePaletteId: config.htmlDiv.nodePaletteDiv,
      groupPaletteId: config.htmlDiv.groupPaletteDiv,
      linkPaletteId: config.htmlDiv.linkPaletteDiv,
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
    this.onDoSave( ()=> {
      console.log( 'Saving main graph...' );
      this.saveEditorContent();
    });
    this.onNeedSave( ()=> setSystemNeedSave() );

    const history = getStatus( 'graphHistory' );
    this.editor.setIsHistoryEmpty( history.length <= 0 );
    this.editor.setIsRootGraph( nodeData.fileURL == config.graph.rootGraphURL );

    // Helper function to show previous graph
    const showPreviousGraph = ()=> {
      const newNodeData = popFromHistory();
      const history = getStatus( 'graphHistory' );
      this.editor.setIsHistoryEmpty( history.length <= 0 );
      // Load previous graph
      this.navigateToGraph( newNodeData, true );
    };

    // Setup events
    this.editor.registerEventList({
      onGraphChanged: ()=> {
        if( !this.isContentJustLoaded ) {
          this.editorHasChanged();
        }
      },
      onSelection: ( dataList )=> {
        const e = m.e.getEditor( config.htmlDiv.graphDiv );
        const jsonSelection = e.getJSONSelection();
      },
      onLoadGraph: ( nodeData )=> {
        // Get a copy of the node data
        //const newNodeData = this.editor.getNodeData( nodeData.key, true );
        const newNodeData = getNodeData( nodeData.key, true );
        // Give a new url in case fileURL is empty
        this._verifyFileURL( newNodeData );
        // Navigate to node
        this.navigateToGraph( newNodeData );
      },
      onLoadFile: ( nodeData, x, y )=> {
        // Get a copy of the node data
        //const newNodeData = this.editor.getNodeData( nodeData.key, true );
        const newNodeData = getNodeData( nodeData.key, true );
        // Give a new url in case fileURL is empty
        this._verifyFileURL( newNodeData );
        // Open node window
        m.e.openWindowFromNodeData( newNodeData, x, y );
      },
      onClone: ( nodeData )=> {
        if( nodeData.fileURL ) {
          // Get a copy of the node data
          const newNodeData = getNodeData( nodeData.key, true );

          // Once node loaded, update URL and save
          const onNodeLoaded = ( source )=> {
            // Save old URL
            const oldURL = newNodeData.fileURL;

            // Update the url
            // Reset fileURL ==> a new URL will be created
            newNodeData.fileURL = this.editor.resetFileURL( oldURL );

            if( newNodeData.fileURL.startsWith( 'graph://' ) ) {
              const newURL = this.editor.cloneGraphFile( oldURL );
              newNodeData.fileURL = newURL;
            } else {
              // Set a new fileURL
              this._verifyFileURL( newNodeData );

              // Clone opened windows
              const newURL = newNodeData.fileURL;
              m.e.cloneGraphWindow( oldURL, newURL );
  
              // Temporarly save the content
              newNodeData.fileContent = source;
              // Save node content to the server
              saveNodeContent( newNodeData );
            }
          };

          // Load node data content
          loadNodeContent( newNodeData, onNodeLoaded );
        }
      },
      onShowRootGraph: ()=> {
        const newNodeData = config.graph.rootGraphNodeData;
        this.navigateToGraph( newNodeData );
      },
      onSetReadOnly: ( status )=> {
        setSystemReadOnly( status );
      },
      onShowParentGraph: ()=> {
        //TODO: temporary fix because I don't know how to handle parent
        showPreviousGraph();
        //const newNodeData = this.getParentGraph();
        //this.navigateToGraph( newNodeData );
      },
      onShowPreviousGraph: ()=> {
        showPreviousGraph();
      },
      onShowFindDialog: ( x, y )=> {
        const nodeData = {
          key: 'Find in Graph',
          isFile: true,
          fileType: 'input/fields',
        };
        const id = m.e._getDOMUniqueId( nodeData );
        m.e.openWindow( id, 'FindViewer', nodeData, [x, y, 470, 200 ] );
      },
      onShowAnimatorEditor: ( x, y )=> {
        const nodeData = {
          key: 'Animate Graph',
          isFile: true,
          fileType: 'input/fields',
          fileURL: '',
        };
        const id = m.e._getDOMUniqueId( nodeData );
        m.e.openWindow( id, 'AnimatorEditor', nodeData, [x, y, 470, 200 ] );
      },
      onShowDSLListDialog: ( x, y )=> {
        const nodeData = {
          key: 'Show DSL List',
          isFile: true,
          fileType: 'input/fields',
        };
        const id = m.e._getDOMUniqueId( nodeData );
        m.e.openWindow( id, 'DSLViewer', nodeData, [x, y, 160, 450 ] );
      },
      onShowGraphTemplateDialog: ( x, y )=> {
        const nodeData = {
          key: 'Graph Templates',
          isFile: true,
          fileType: 'input/fields',
        };
        const id = m.e._getDOMUniqueId( nodeData );
        m.e.openWindow( id, 'GraphTemplateViewer', nodeData, [x, y, 260, 160 ] );
      },
      onShowSysMonitorDialog: ( x, y )=> {
        const nodeData = {
          key: 'System Monitor',
          isFile: true,
          fileType: 'system/status',
          fileURL: '#systemMonitor#',
        };
        const id = m.e._getDOMUniqueId( nodeData );
        m.e.openWindow( id, 'SystemMonitorViewer', nodeData, [x, y, 540, 170 ] );
      },
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
    if( !nodeData && !nodeData.isDir || ( nodeData.fileType != this.fileType ) ) {
      return;
    }

    setSystemLoading();
    // Pause tracking editor changes
    this.setPauseChange( true );
    this.isContentJustLoaded = true;

    const onDone = ()=> {
      // Include script nodes: JavaScript code created by the user
      // and executable once we are in the graph containing the script nodes
      this.processNodeWithIncludeScripts( 'unload' ); // Remove previous scripts
      this.processNodeWithIncludeScripts( 'load' ); // Load new one

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
      // Update readonly status
      this.editor.doSetReadOnly( getSystemReadOnly() );

      // call event listeners
      const listenerCallList = this.listenerList['onLoad'];
      if( listenerCallList.length > 0 ) {
        for( const callback of listenerCallList ) {
          if( callback ) {
            callback();
          }
        }
      } 
      setSystemReady();
      if( onLoaded ) {
        onLoaded();
      }
    };
    const onNewGraphLoaded = (source)=> {
      const history = getStatus( 'graphHistory' );
      if( !source && ( history.length <= 0 ) ) {
        nodeData = config.graph.rootGraphNodeData;
        // Once the source is set, we call the function
        // that load from the server the last update time 
        // of the loaded file. After that the onDone is called
        this.loadEditorContent( nodeData, ()=> { 
          this.doLoadLastUpdateTime( nodeData, onDone );
        });
        // NOTE: return to abort current loading
        return;
      }
      // Once the source is set, we call the function
      // that load from the server the last update time 
      // of the loaded file. After that the onDone is called
      this.editor.setEditorSource( source, ()=> { 
        this.doLoadLastUpdateTime( nodeData, onDone );
      });
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
    let nodeDataTemp = null; // Node used to save the graph
    const graphImageData = { // Node used to save the image of the graph
      fileURL: '',
      fileContent: '',
      fileEncoding: 'base64',
    }
    const onImageSaved = ()=> {
      // Third, notify save done
      this.editorSaved();
      if( onSaved ) {
        onSaved();
      }
    };
    const onEditorSaved = ( fileInfo )=> {
      // Second, get the image of the graph
      const image = this.editor.getGraphImage();
      if( image && nodeDataTemp ) {
        const idx = nodeDataTemp.fileURL.lastIndexOf( '.' );
        const ext = nodeDataTemp.fileURL.substring( idx );
        if( idx && ( ext == '.json' ) ) {
          const imageData = image.replace( /^data:image\/\w+;base64,/, '' );
          graphImageData.fileURL = nodeDataTemp.fileURL.substring( 0, idx )+'.png';
          graphImageData.fileContent = imageData;
          saveNodeContent( graphImageData, onImageSaved );
        }
      }
    };
    const onGraphSaved = ()=> {
      // In case it is a template ==> update template list
      this.updateGraphTemplate();
      // Load last file update time from the server
      this.doLoadLastUpdateTime( this.nodeData, onEditorSaved )
    };
    const onTimeChecked = ( doAbortSave )=> {
      // If saving may overwrite a newer version of the file
      // we may have to abort save (if user choosed to abort
      // from prompt dialog)
      if( doAbortSave ) {
        // We clear save status
        this.clearStatus();
        // We call the callback anyway, but...
        if( onSaved ) {
          onSaved();
        }
      } else {
        // First, save the json graph
        nodeDataTemp = this.editor._getDataCopy( this.nodeData );
        const source = this.editor.getEditorSource();
        nodeDataTemp.fileContent = source;
        console.log( 'Graph call saveNodeContent()')
        saveNodeContent( nodeDataTemp, onGraphSaved );
      }
    };
    if( this.nodeData ) {
      // First check destination file info from the server
      // to avoid to overwrite a newer version of the graph
      this.doCheckLastUpdateTime( this.nodeData, onTimeChecked );
    } else {
      console.log( 'Graph NOT call saveNodeContent(), nodeData is NULL' );
      onGraphSaved();
    }
  }
  _verifyFileURL_old( nodeData ) {
    if( !nodeData.isLink && ( nodeData.isDir || nodeData.isFile ) ) {
      if( ( nodeData.fileURL != undefined ) && ( nodeData.fileURL == '' ) ) {
        const ext = getExtByFileType( nodeData.fileType );
        const url = getNewFileServerURL( ext );
        nodeData.fileURL = url;
        // NOTE: the setNodeDataField trigger the editorChange event
        //this.editor.setNodeDataField( nodeData.key, 'fileURL', url );
        setNodeDataField( nodeData.key, 'fileURL', url );
      }
    }
  }
  _verifyFileURL( nodeData ) {
    if( !nodeData.isLink && ( nodeData.isDir || nodeData.isFile ) ) {
      if( nodeData.fileURL != undefined ) {
        if( ( nodeData.fileURL == '' ) || ( nodeData.fileURL == '/fileServer/' ) ) {
          // Initialize fileServer URL if is not complete
          const ext = getExtByFileType( nodeData.fileType );
          const url = getNewFileServerURL( ext );
          nodeData.fileURL = url;
          // NOTE: the setNodeDataField trigger the editorChange event
          //this.editor.setNodeDataField( nodeData.key, 'fileURL', url );
          setNodeDataField( nodeData.key, 'fileURL', url );
        } else if( nodeData.fileURL == 'graph://fileServer/' ) {
          // Initialize graphServer URL if is not complete
          const ext = getExtByFileType( nodeData.fileType );
          const url = getNewGraphFileServerURL( ext );
          nodeData.fileURL = url;
          // NOTE: the setNodeDataField trigger the editorChange event
          //this.editor.setNodeDataField( nodeData.key, 'fileURL', url );
          setNodeDataField( nodeData.key, 'fileURL', url );
        }
        // Otherwise the URL should be already set and valid
      }
    }
  }
  updateGraphTemplate() {
    // Get model nodes
    const it = this.editor.diagram.nodes;
    it.reset();
    // Loop over all nodes
    while ( it.next() ) {
      // Get node data
      const nodeData = it.value.data;
      // Update GrapInfo node
      if( nodeData.category == 'Hierarchy_GraphInfo' ) {
        // Get Name field
        const nameInfo = nodeData.props_.find( (e)=> e.name == 'Name' );
        if( nameInfo ) {
          // Skip graph info interpretation if template
          if( nameInfo.value.toLowerCase().startsWith( '<template>' ) ) {
            // Load Templates
            let templateURL = `${config.host.fileServerSystemURL}/graphTemplateList.json`;
            _openFile( templateURL, (source)=> {
              // Get Template Name List
              const templateList = JSON.parse( source );
              // Check if template not present ==> if not add it
              if( !templateList[this.title] ) {
                templateList[this.title] = this.nodeData.fileURL;
                // Save updated template list
                const templateSource = JSON.stringify( templateList, null, 2 );
                _saveFile( templateURL, templateSource );
              }
            });
          }
        }

        // Stop model navigation
        break;
      }
    }
  }
  processNodeWithIncludeScripts( action ) {//
    // Load nodes with data like:
    //
    // nodeData = {
    //   ...
    //   "isFile": true,
    //   "fileType": "text/javascript",
    //   "fileContent": "console.log( 'included' )",
    //   "isIncludeScript": true,
    //   ...
    // }
    // nodeData = {
    //   ...
    //   "isFile": true,
    //   "fileType": "text/javascript",
    //   "fileURL": "/fileServer/00/05.js",
    //   "isIncludeScript": true,
    //   ...
    // }
    //
    // TODO: get navigation in nodes from graph through an API function
    if( action == 'unload' ) {
      // const nodeScriptList = document.querySelectorAll( '.NodeData_IncludeScript' );
      // for( const nodeScript of nodeScriptList ) {
      //   nodeScript.remove();
      // }
      unloadLocalGraphScript();
    } else {
      // Get all model nodes
      const it = this.editor.diagram.nodes;
      it.reset();
      // Default ReadOnly state: false if model empty, true otherwise
      let isGraphReadOnly = ( it.count > 0? true: false );
      let isGraphInfoFound = false;
      // Loop over all nodes
      while ( it.next() ) {
        // Get node data
        const nodeData = it.value.data;
        // Update GrapInfo node (only the first found)
        if( !isGraphInfoFound && ( nodeData.category == 'Hierarchy_GraphInfo' ) ) {
          isGraphInfoFound = true;
          isGraphReadOnly = this._processGraphInfo( nodeData );
        }
        // Source all include files
        this._processIncludeFiles( nodeData, action );
      }

      // Set readonly state
      setSystemReadOnly( isGraphReadOnly );
    }
	}
  _processGraphInfo( nodeData ) {
    let isGraphReadOnly = true;
    let isTemplate = false;

    // Set Name field with 'graph name'
    const nameInfo = nodeData.props_.find( (e)=> e.name == 'Name' );
    if( nameInfo ) {
      // Skip graph info interpretation if template
      if( nameInfo.value.toLowerCase().startsWith( '<template>' ) ) {
        isTemplate = true;
      }
    }

    if( !isTemplate ) {
      if( nameInfo ) {
        // Get graph name
        const graphName = ( this.nodeData.label? this.nodeData.label: this.nodeData.key );
        const pValue = getRefValue( nodeData, nameInfo.value );
        if( !pValue.isRef && ( typeof( pValue.nodeData ) == 'object' ) ) {
          setNodeDataField( pValue.nodeData.key, pValue.name, graphName );
        } else {
          // Set only the graph name in 'Name' property in props_
          setNodeDataField( nameInfo, 'value', graphName );
        }
      }

      if( nodeData.props_ ) {
        // Set Date field with date if value is 'date@system'
        const dateInfo = nodeData.props_.find( (e)=> e.name == 'Date' );
        if( dateInfo ) {
          const pValue = getRefValue( nodeData, dateInfo.value );
          if( !pValue.isRef ) {
            setNodeDataField( dateInfo, 'value', pValue.value );
          }
        }

        // Set Path field with date if value is 'date@system'
        const pathInfo = nodeData.props_.find( (e)=> e.name == 'Path' );
        if( pathInfo ) {
          const pValue = getRefValue( nodeData, pathInfo.value );
          if( !pValue.isRef ) {
            setNodeDataField( pathInfo, 'value', pValue.value );
          }
        }

        // Check Author for default read access
        const authorInfo = nodeData.props_.find( (e)=> e.name == 'Authors' );
        const aValue = getRefValue( nodeData, authorInfo.value );
        if( !aValue.isRef ) {
          setNodeDataField( authorInfo, 'value', aValue.value );
          authorInfo.value = aValue.value;
        }

        const authorList = jsyaml.load( authorInfo.value );
        if( typeof( authorList ) == 'string' ) {
          isGraphReadOnly = ( authorList != getUserName() );
        } else {
          isGraphReadOnly = !authorList.includes( getUserName() );
        }
      }
    }
    return( isGraphReadOnly );
  }
  _processIncludeFiles( nodeData, action ) {
    // If we find a isIncludeScript node
    if( ( ( nodeData.fileType == 'text/javascript' ) ||
          ( nodeData.fileType == 'text/css' ) ) &&
        nodeData.isFile && nodeData.isIncludeScript ) {
      switch( action ) {
        case 'load': {
          if( nodeData.fileURL ) {
            loadScript( nodeData.fileURL );
          } else if( nodeData.fileContent ) {
            loadScriptSource( nodeData.fileContent, null );
          }
        }
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
    const [ format, language ] = this.fileType.split( '/' ); // get text/<language>
    this.editor.setEditorMode( 'ace/mode/'+language );

    if( nodeData.editorTheme ) {
      this.editor.setEditorTheme( nodeData.editorTheme );
    } else {
      const editorDiv = document.getElementById( this.editorDivId );
      editorDiv.style.background = '#1d1f21';
    }

    // Check readonly
    if( nodeData.isReadOnly ) {
      this.editor.setReadOnly( true );
    }

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

    this.fileType = ( nodeData.fileType? nodeData.fileType: this.fileType );
    // Update current nodeData
    this.nodeData = nodeData;
    // Set window title
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${this.fileType}]`;
    this.setTitle( this.title );
    // Update pin
    if( nodeData.fileURL && !nodeData.fileURL.startsWith( 'graph://' ) ) {
      m.e.showWindowPin( this.id, 'visible' );
    }
    // Set editor content
    loadNodeContent( nodeData, (source)=> {
      this.editor.setEditorSource( source );
      this.doLoadLastUpdateTime( nodeData, ()=> {
        // After loading update time, clear pause change
        this.setPauseChange( false );
      });
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
    const onTimeChecked = ( doAbortSave )=> {
      if( doAbortSave ) {
        // We clear save status
        this.clearStatus();
        // We call the callback anyway, but...
        if( onSaved ) {
          onSaved();
        }
      } else {
        const source = this.editor.getEditorSource();
        const e = m.e.getEditor( config.htmlDiv.graphDiv );
        const nodeDataTemp = e._getDataCopy( this.nodeData );
        nodeDataTemp.fileContent = source;
        saveNodeContent( nodeDataTemp, onEditorSaved );
      }
    };
    if( this.nodeData ) {
      // First check destination file info from the server
      // to avoid to overwrite a newer version of the graph
      this.doCheckLastUpdateTime( this.nodeData, onTimeChecked );
    } else {
      onEditorSaved();
    }
  }
}
class HChatEditor extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.isJustStarted = true;
    this.id = id;
    this.fileType = '';
    
    this.fileType = nodeData.fileType;
    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                          config.htmlDiv.mainDiv,
                                          this.storeWindowPosition.bind(this),
                                          position );
    this.editor = new HChatManagerEditor( this.editorDivId );
    
    // Check readonly
    if( nodeData.isReadOnly ) {
      this.editor.setReadOnly( true );
    }

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

    this.fileType = ( nodeData.fileType? nodeData.fileType: this.fileType );
    // Update current nodeData
    this.nodeData = nodeData;
    // Set window title
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${this.fileType}]`;
    this.setTitle( this.title );
    
    // Set editor content
    loadNodeContent( nodeData, (source)=> {
      this.editor.setEditorSource( source );
      this.doLoadLastUpdateTime( nodeData, ()=> {
        // After loading update time, clear pause change
        this.setPauseChange( false );
      });
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
    const onTimeChecked = ( doAbortSave )=> {
      if( doAbortSave ) {
        // We clear save status
        this.clearStatus();
        // We call the callback anyway, but...
        if( onSaved ) {
          onSaved();
        }
      } else {
        const source = this.editor.getEditorSource();
        const g = getMainGraph();
        const nodeDataTemp = g._getDataCopy( this.nodeData );
        nodeDataTemp.fileContent = source;
        saveNodeContent( nodeDataTemp, onEditorSaved );
      }
    };
    if( this.nodeData ) {
      // First check destination file info from the server
      // to avoid to overwrite a newer version of the graph
      this.doCheckLastUpdateTime( this.nodeData, onTimeChecked );
    } else {
      onEditorSaved();
    }
  }
}
class HTMLExploreEditor extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.isJustStarted = true;
    this.id = id;
    this.fileType = '';
    this.editorDiv = null;
    
    this.fileType = ( nodeData.fileType? nodeData.fileType: 'application/explore' );
    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                          config.htmlDiv.mainDiv,
                                          this.storeWindowPosition.bind(this),
                                          position );

    // Instantiate the editor
    this.editor = new ExploreEditorEditor( this.editorDivId );

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

    this.fileType = ( nodeData.fileType? nodeData.fileType: this.fileType );
    // Update current nodeData
    this.nodeData = nodeData;
    // Set window title
    this.title = ( nodeData.label? nodeData.label: nodeData.key )+` [${this.fileType}]`;
    this.setTitle( this.title );
    // Update pin
    if( nodeData.fileURL && !nodeData.fileURL.startsWith( 'graph://' ) ) {
      m.e.showWindowPin( this.id );
    }
    // Set editor content
    loadNodeContent( nodeData, (source)=> {
      this.editor.setEditorSource( source );
      this.doLoadLastUpdateTime( nodeData, ()=> {
        // After loading update time, clear pause change
        this.setPauseChange( false );
      });
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
    const onTimeChecked = ( doAbortSave )=> {
      if( doAbortSave ) {
        // We clear save status
        this.clearStatus();
        // We call the callback anyway, but...
        if( onSaved ) {
          onSaved();
        }
      } else {
        const source = this.editor.getEditorSource();
        const e = m.e.getEditor( config.htmlDiv.graphDiv );
        const nodeDataTemp = e._getDataCopy( this.nodeData );
        nodeDataTemp.fileContent = source;
        saveNodeContent( nodeDataTemp, onEditorSaved );
      }
    };
    if( this.nodeData ) {
      // First check destination file info from the server
      // to avoid to overwrite a newer version of the graph
      this.doCheckLastUpdateTime( this.nodeData, onTimeChecked );
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
    // Set background
    const editorDiv = document.getElementById( this.editorDivId );
    editorDiv.style.background = '#1d1f21';
    // Load content
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

    // Create window
    if( nodeData.isPopup && nodeData.fileURL ) {
      // Define editor id
      this.editorDivId = id+'Editor'; // <--- NOT YET USED!!!!!! in this case
      this._position = position;
      this.isPopup = true;
      // We will open a new tab for this window in the loadEditorContent()
    } else {
      const winInfo = m.e.newWinBox( id, this.title, 
                                    config.htmlDiv.mainDiv,
                                    this.storeWindowPosition.bind(this),
                                    position );

      this.editorDivId = winInfo.editorDivId;
      this.editor = winInfo.win;
    }

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
    // Set editor content container
    if( nodeData.isPopup && nodeData.fileURL ) {
      const browserX = window.screenX;
      const browserY = window.screenY;
      this._options = `top=${browserY+this._position[1]},
                       left=${browserX+this._position[0]},
                       width=${this._position[2]},
                       height=${this._position[3]},
                       location=0,menubar=0`;

      this.openPopupWindow();
    } else if( nodeData.isLocalDiv && ( nodeData.fileContent != undefined ) ) {
      const element = document.getElementById( this.editorDivId );
      const divID = `${this.id}_frame`;
      const html = getNodeDataField( nodeData.key, 'fileContent', '<h2 style="color:white">Default Div Content</h2>' );
      element.innerHTML = `<div id='${divID}' class='webViewer'>${html}</div>`;

      // Insert all scripts in the document.head so to run all of them
      const dp = new DOMParser();
      const doc = dp.parseFromString( html, 'text/html' );
      const scriptList = doc.getElementsByTagName( 'script' );
      for( const script of scriptList ) {
        const source = script.innerHTML;
        // const newScript = document.createElement( 'script' );
        // newScript.innerHTML = source;
        // newScript.type = 'text/javascript';
        // newScript.className = 'NodeData_IncludeScript'; // So to be removed when loading another grap
        // document.head.append( newScript );
        loadScriptSource( source, null, true );
      }
    } else if( nodeData.fileURL ) {
      const element = document.getElementById( this.editorDivId );
      const fileURL = ( nodeData.fileURL? nodeData.fileURL: '' );
      // NOTE:  name="${Date.now()}" is a workaround to avoid caching
      element.innerHTML = `<iframe id='${this.id}_frame' class='webViewer' src="${fileURL}?_=${Date.now()}"></iframe>`;
      // const url = new URL( nodeData.fileURL, window.location ).toString();
      // this.win.setUrl( url );
    } else if( nodeData.fileContent != undefined ) {
      const element = document.getElementById( this.editorDivId );
      const frameId = `${this.id}_frame`;
      // NOTE:  name="${Date.now()}" is a workaround to avoid caching
      element.innerHTML = `<iframe id='${frameId}' name="${Date.now()}" class='webViewer' src='about:blank'></frame>`;
      const frameElement = document.getElementById( frameId );
      frameElement.contentDocument.open();
      frameElement.contentDocument.write( nodeData.fileContent );
      frameElement.contentDocument.close();
    }
  }
  saveEditorContent( onSaved ) {
    if( onSaved ) {
      onSaved();
    }
  }
  openPopupWindow() {
    this.editor = open( this.nodeData.fileURL, this.title, this._options );
      if( this.editor ) {
        this.editor.focus();
      }
  }
}
class WebViewer2 extends EditorBase {
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
    // Set editor content container
    if( nodeData.isLocalDiv && ( nodeData.fileContent != undefined ) ) {
      const element = document.getElementById( this.editorDivId );
      const divID = `${this.id}_frame`;
      const html = getNodeDataField( nodeData.key, 'fileContent', '<h2 style="color:white">Default Div Content</h2>' );
      element.innerHTML = `<div id='${divID}' class='webViewer'>${html}</div>`;

      // Insert all scripts in the document.head so to run all of them
      const dp = new DOMParser();
      const doc = dp.parseFromString( html, 'text/html' );
      const scriptList = doc.getElementsByTagName( 'script' );
      for( const script of scriptList ) {
        const source = script.innerHTML;
        // const newScript = document.createElement( 'script' );
        // newScript.innerHTML = source;
        // newScript.type = 'text/javascript';
        // newScript.className = 'NodeData_IncludeScript'; // So to be removed when loading another grap
        // document.head.append( newScript );
        loadScriptSource( source, null, true );
      }
    } else if( nodeData.fileURL ) {
      const element = document.getElementById( this.editorDivId );
      const fileURL = ( nodeData.fileURL? nodeData.fileURL: '' );
      // NOTE:  name="${Date.now()}" is a workaround to avoid caching
      element.innerHTML = `<iframe is="x-frame-bypass" id='${this.id}_frame' class='webViewer' src="${fileURL}?_=${Date.now()}"></iframe>`;
    } else if( nodeData.fileContent != undefined ) {
      const element = document.getElementById( this.editorDivId );
      const frameId = `${this.id}_frame`;
      // NOTE:  name="${Date.now()}" is a workaround to avoid caching
      element.innerHTML = `<iframe is="x-frame-bypass" id='${frameId}' name="${Date.now()}" class='webViewer' src='about:blank'></frame>`;
      const frameElement = document.getElementById( frameId );
      frameElement.contentDocument.open();
      frameElement.contentDocument.write( nodeData.fileContent );
      frameElement.contentDocument.close();
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
    
    // Set background
    const editorDiv = document.getElementById( this.editorDivId );
    editorDiv.style.background = '#1d1f21';
    // Load content
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
    
    // Set background
    const editorDiv = document.getElementById( this.editorDivId );
    editorDiv.style.background = '#1d1f21';
    // Load content
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
    
    // Set background
    const editorDiv = document.getElementById( this.editorDivId );
    editorDiv.style.background = '#1d1f21';
    // Load content
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
      // Generate Template Name List
      templateList = JSON.parse( sourceTemplateList );
      let source = '';
      const templateNameList = Object.keys( templateList );
      for( const templateName of templateNameList ) {
        const templateUrl = templateList[templateName];
        // Generate html
        if( templateUrl.endsWith( '.json' ) ) {
          source = source+`<div class="findResult graphTemplateItem">
                            ${templateName}
                          </div>`;
        }
      }
      searchResult.innerHTML = source;

      // Apply Template function
      const applyTemplate = ( name )=> {
        console.log( 'Appying template: '+name );
        if( templateList[name] ) {
          const url = templateList[name];
          _openFile( url, (sourceTemplate)=> {
            const e = m.e.getEditor( config.htmlDiv.graphDiv );
            // Remove Template flag
            sourceTemplate = sourceTemplate.replace( /\<Template\>/i, '' );
            e.setEditorSource( sourceTemplate );
          });
        }
      }
      const itemElementList = document.querySelectorAll( '.graphTemplateItem' );
      for( const item of itemElementList ) {
        item.onclick = ()=> applyTemplate( item.innerText );
      }
    }
    // Load Templates
    let url = `${config.host.fileServerSystemURL}/graphTemplateList.json`;
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
    
    // Set background
    const editorDiv = document.getElementById( this.editorDivId );
    editorDiv.style.background = '#1d1f21';
    // Load content
    this.loadEditorContent( nodeData );

    // Refresh System Monitor every 30 seconds
    this.refreshMonitorTimer = null;
    const refreshFunction = ()=> { 
      if( document.getElementById( this.editorDivId ) ) {
        // If window is opern
        this.loadEditorContent( this.nodeData );
      } else {
        // In this case the window has been closed => cancel timer
        if( this.refreshMonitorTimer ) {
          clearInterval( this.refreshMonitorTimer );
        }
      }
    };
    this.refreshMonitorTimer = setInterval( refreshFunction, 30*1000 );

    // Capture CTRL+S and call save all!
    window.addEventListener( 'keydown', function(event) {
      if( event.ctrlKey || event.metaKey ) {
        const key = String.fromCharCode(event.which).toLowerCase();
        switch ( key ) {
          case 's':
            event.preventDefault();
            saveAllEditorContent();
            break;
          }
        }
    });
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
                            <button id='sysMonitorRefresh' type='button' style="width=100%">Update</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button id='browserReload' type='button' style="width=100%">Browser Reload</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button type='button' style="width=100%" onclick='m.e.openSelectionWindow()'>Show Selection Editor</button>
                            <button type='button' style="width=100%" onclick='m.e.openModelWindow()'>Show Model Editor</button>&nbsp;&nbsp;&nbsp;
                            <button type='button' style="width=100%" onclick='m.e.toogleShowWindows()'>Toogle Show Windows</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( +1 )'>&lt;-Screen</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( +0.5 )'>&lt;-|</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( +0.05 )'>&lt;</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( -0.05 )'>&gt;</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( -0.5 )'>!-&gt;</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( -1 )'>Screen-&gt;</button>
                          </div>
                          <div id='windowList'></div>`;
    const refreshButton = document.querySelector( '#sysMonitorRefresh' );
    refreshButton.onclick = ()=> this.loadEditorContent( nodeData );
    const browserReloadButton = document.querySelector( '#browserReload' );
    browserReloadButton.onclick = ()=> window.location.reload( true );
    const wList = document.querySelector( '#windowList' );
    const oeList = m.e.getEditorIdList();
    let source = '<table style="color: aquamarine;font-size: smaller;">';
    for( const id of oeList ) {
      const bi = m.e.getEditorBasicInfo( id );
      let screen = bi.screenDirection;
      if( bi.screenIndex != 0 ) {
        screen = screen+`[${Math.abs(bi.screenIndex)}]`;
      }
      // Add item
      const item = `<tr><td>[${bi.id}]<td>${bi.title}<td>URL: ${bi.url}<td>${screen}</tr>`;
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

    position[3] = 600; // Make height higher
    this.title = 'Animator Editor';
    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                         config.htmlDiv.mainDiv,
                                         this.storeWindowPosition.bind(this),
                                         position );

    this.editor = new ACESourceCodeEditor( this.editorDivId );
    const language = 'javascript';
    this.editor.setEditorMode( 'ace/mode/'+language );
    const source = '/* \n'+
                   '  Animator can animate nodes by their unique "key" value.\n'+
                   '   Type/Paste in this editor animation info.\n'+
                   '   E.g. you can paste a json file like:\n'+
                   '     [\n'+
                   '       { "key": 10 },\n'+
                   '       { "key": 11 },\n'+
                   '     ]\n'+
                   '   To step animate move cursor in a line with { "key"...},\n'+
                   '   To continue press Up/Down arrow keys (animate back/forward)\n'+
                   '  \n'+
                   '   To auto animate (default timeout = 1sec), make a selection,\n'+
                   '   on a set of lines or a full selection with CRTL+A\n'+
                   '   NOTE: you can change the timeout (eg. from 1sec to 500ms) by\n'+
                   '   adding a line like:\n'+
                   '     { "animTimeout": 0.5 },\n'+
                   '  You can pause an animation by adding the line:\n'+
                   '     { "puase": true },\n'+
                   '*/\n'+
                   '\n';
    this.editor.setEditorSource( source );
    this.editor.onEvent( 'changeSelection', this._onEditorSelectionChanged.bind( this ) );
    this.graphEditor = m.e.getEditor( config.htmlDiv.graphDiv );
    this.animTimeout = 1; // default 1sec
    this.animTimer = null;

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

    // Check for timeout update
    if( nodeData && nodeData.animTimeout ) {
      const value = Math.abs( parseFloat( nodeData.animTimeout ) );
      if( value ) {
        this.animTimeout = value;
      }
    }

    // If we found a node and it has a "key" field
    if( nodeData && nodeData.key ) {
      m.e.selectAndCenterNodeInGraph( nodeData.key );
    }
    return( nodeData );
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
      if( this.animTimer ) {
        clearTimeout( this.animTimer );
        this.animTimer = null;
      }
      this.animTimer = setTimeout( ()=>
        {
          selLines.currLine = selLines.start;
          // Start animation
          this._playAnimation( selLines );
        }, 1*1000
      );
    }
  }
  _playAnimation( animationInfo ) {
    // Find the first key
    let nodeData = null;
    while( !nodeData && ( animationInfo.currLine <= animationInfo.end ) ) {
      nodeData = this.animateNode( ++animationInfo.currLine );
    }
    // Execute pause if found
    if( nodeData && nodeData.pause ) {
      return;
    }
    // Next animation step
    if( animationInfo.currLine <= animationInfo.end ) {
      this.animTimer = setTimeout( ()=> this._playAnimation( animationInfo ), this.animTimeout*1000 );
    }
  }
  _getJSONLineInfo( lineText ) {
    let result = null;

    lineText = lineText.trim();
    if( lineText.startsWith( '{' ) ) {
      // Get end of JSON element
      const idx = lineText.lastIndexOf( '}' );
      if( idx != -1 ) {
        lineText = lineText.substring( 0, idx+1 )
        // Parse JSON
        try {
          // Parse object at current line
          result = JSON.parse( lineText );
        } catch( e ) {
          // Skip line
        }
      }
    }
    return( result );
  }
}