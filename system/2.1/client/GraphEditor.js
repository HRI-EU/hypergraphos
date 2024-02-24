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

class GraphEditor extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.isContentJustLoaded = true;
    this.id = id;
    this.fileType = 'text/json';
    this.listenerList = {
      'onLoad': [],
    };
    this.nodeData = nodeData;

    // New graph editor
    this.editor = new GraphWrapper({ 
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
      this.navigateToGraph( newNodeData, null, true );
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
      onAddBookmark: ( bookmarkInfo )=> {
        bookmarkInfo.title = this.getTitle( this.nodeData );
        bookmarkInfo.nodeData = this.editor._getDataCopy( this.nodeData );
        addBookmark( bookmarkInfo );
      },
      onLogOut: ()=> {
        logOut();
      },
      onLoadGraph: ( nodeData )=> {
        this.doLoadGraph( nodeData );
      },
      onLoadFile: ( nodeData, x, y )=> {
        // Get a copy of the node data
        //const newNodeData = this.editor.getNodeData( nodeData.key, true );
        const newNodeData = getNodeData( nodeData.key, true );
        // Give a new url in case fileURL is empty
        this._verifyFileURL( newNodeData, ()=> {
          // Open node window
          m.e.openWindowFromNodeData( newNodeData, x, y );
        });
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
              setNodeDataField( newNodeData, 'fileURL', newURL );
            } else {
              // Set a new fileURL
              this._verifyFileURL( newNodeData, ()=> {
                // Clone opened windows
                const newURL = newNodeData.fileURL;
                m.e.cloneGraphWindow( oldURL, newURL );
    
                // Temporarly save the content
                newNodeData.fileContent = source;
                // Save node content to the server
                saveNodeContent( newNodeData );
              });
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
      onShowPreviousGraph: ()=> {
        showPreviousGraph();
      },
      onShowMessages: ()=> {
        checkMessages( true );
      },
      onShowBookmarks: ( x, y )=> {
        const nodeData = m.specialNodeData.bookmarViewer;
        m.e.openWindow( null, 'BookmarkViewer', nodeData, [x, y, 470, 200 ] );
      },
      onShowFindDialog: ( x, y )=> {
        const nodeData = m.specialNodeData.findDialog;
        m.e.openWindow( null, 'FindViewer', nodeData, [x, y, 470, 200 ] );
      },
      onShowAnimatorEditor: ( x, y )=> {
        const nodeData = m.specialNodeData.animatorViewer;
        m.e.openWindow( null, 'AnimatorEditor', nodeData, [x, y, 470, 200 ] );
      },
      onShowDSLListDialog: ( x, y )=> {
        const nodeData = m.specialNodeData.dslListViewer;
        m.e.openWindow( null, 'DSLViewer', nodeData, [x, y, 160, 450 ] );
      },
      onShowGraphTemplateDialog: ( x, y )=> {
        const nodeData = m.specialNodeData.graphTemplateViewer;
        m.e.openWindow( null, 'GraphTemplateViewer', nodeData, [x, y, 260, 160 ] );
      },
      onShowSysMonitorDialog: ( x, y )=> {
        const nodeData = m.specialNodeData.systemMonitorViewer;
        m.e.openWindow( null, 'SystemMonitorViewer', nodeData, [x, y, 540, 170 ] );
      },
    });
    
    this.setPauseChange( false );
    this.loadEditorContent( nodeData );
  }
  getTitle( nodeData ) {
    let result = this.id;
    const isNumber = (n)=> !isNaN( n );
    
    if( nodeData.label ) {
      result = nodeData.label;
    } else if( nodeData.text ) {
      result = nodeData.text;
    } else if( nodeData.key && ( !isNumber( nodeData.key )) ) {
      result = nodeData.key;
    }
    return( result );
  }
  addListerner( event, callaback ) {
    if( this.listenerList[event] ) {
      this.listenerList[event].push( callaback );
    }
  }
  doLoadGraph( nodeData, onLoaded ) {
    // Get a copy of the node data
    //const newNodeData = this.editor.getNodeData( nodeData.key, true );
    const newNodeData = this.editor._getDataCopy( nodeData );
    // Give a new url in case fileURL is empty
    this._verifyFileURL( newNodeData, ()=> {
      // Navigate to node
      this.navigateToGraph( newNodeData, onLoaded );
    });
  }
  navigateToGraph( newNodeData, onLoaded, isBackFromHistory ) {
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
        this.loadEditorContent( newNodeData, onLoaded );
      });
    } else {
      if( onLoaded ) {
        onLoaded();
      }
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

      // Update current nodeData
      this.nodeData = nodeData;

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
      this.title = this.getTitle( nodeData );
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
  _verifyFileURL( nodeData, onDone ) {
    let isFileServer = false;
    if( nodeData && !nodeData.isLink && ( nodeData.isDir || nodeData.isFile ) ) {
      if( nodeData.fileURL != undefined ) {
        if( ( nodeData.fileURL == '' ) || ( nodeData.fileURL == '/fileServer/' ) ) {
          // NOTE: file server case!!!
          isFileServer = true;
          // Initialize fileServer URL if is not complete
          const ext = getExtByFileType( nodeData.fileType );
          getNewFileServerURL( ext, ( newURL )=> {
            nodeData.fileURL = newURL;
            // NOTE: the setNodeDataField trigger the editorChange event
            //this.editor.setNodeDataField( nodeData.key, 'fileURL', url );
            setNodeDataField( nodeData.key, 'fileURL', newURL );

            if( onDone ) {
              onDone();
            }
          });
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

    if( !isFileServer && onDone ) {
      onDone();
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
        // Get Type field
        const typeInfo = nodeData.props_.find( (e)=> e.name == 'Type' );
        if( typeInfo ) {
          // Skip graph info interpretation if template
          if( ( typeInfo.value == 'TemplateWorkSpace' ) ||
              ( typeInfo.value == '<TemplateWorkSpace>' ) ) {
            // Load Templates
            let templateURL = `${config.host.fileServerSystemURL}/graphTemplateList.json`;
            _openFile( templateURL, (source)=> {
              // Get Template Name List
              const errMsg = 'Error loading/saving template list';
              const templateList = MainScript_JSONParse( source, errMsg );
              if( templateList != null ) {
                // Check if template not present or needs to be renamed
                if( ( !templateList[this.nodeData.fileURL] ) ||
                    ( templateList[this.nodeData.fileURL] != this.title ) ) {
                  // Insert new or update name
                  templateList[this.nodeData.fileURL] = this.title;
                  // Save updated template list
                  const templateSource = MainScript_JSONStringify( templateList, null, 2, errMsg );
                  if( templateSource != null ) {
                    _saveFile( templateURL, templateSource );
                  }
                }
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

    // Get Type field
    const typeInfo = nodeData.props_.find( (e)=> e.name == 'Type' );
    if( typeInfo ) {
      // Skip graph info interpretation if template
      if( ( typeInfo.value == 'TemplateWorkSpace' ) || 
          ( typeInfo.value == '<TemplateWorkSpace>' ) ) {
        isTemplate = true;
      }
    }

    if( !isTemplate ) {
      // Set Name field with 'graph name'
      const nameInfo = nodeData.props_.find( (e)=> e.name == 'Name' );
      if( nameInfo ) {
        // Get graph name
        const graphName = ( this.nodeData.label? this.nodeData.label: this.nodeData.key );
        const pValue = getRefValue( nodeData, nameInfo.value );
        if( !pValue.isRef && ( typeof( pValue.nodeData ) == 'object' ) ) {
          setNodeDataField( pValue.nodeData.key, pValue.name, graphName );
          setNodeDataField( pValue.nodeData.key, 'isLabelEditable', false );
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