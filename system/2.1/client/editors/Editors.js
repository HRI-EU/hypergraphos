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

// NOTE: order matter here, since the first matching editor get selected

addEditorIncludes([
  'editors/ACEWrapper.js',
  'editors/ExploreEditorWrapper.js',
  'lib/hChat/1.0/hChat.css',
  'lib/hChat/1.0/hChat.js',
  'editors/HChatWrapper.js',
]);

class BookmarkViewer extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.id = id;
    this.editor = null;

    position[2] = 400; // Set with
    position[3] = 400; // Set with
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
    this.setTitle( this.nodeData );
    // Update pin
    m.e.showWindowPin( this.id );
    // Update list of bookmarks from status
    this.updateBookmarks();
  }
  saveEditorContent( onSaved ) {
    if( onSaved ) {
      onSaved();
    }
  }
  updateBookmarks() {
    // Set editor content
    const element = document.getElementById( this.editorDivId );
    element.innerHTML = `<div id='bookmarkList' ></div>`;
    const bookmarkEl = document.querySelector( '#bookmarkList' );
    // List Bookmarks
    let source = '';
    const bookmarkList = m.status.bookmarkList;
    if( bookmarkList ) {
      for( let i = 0; i < bookmarkList.length; ++i ) {
        const bookmark = bookmarkList[i];
        const title = bookmark.title;
        // Generate html
        source = source+`<div style="display: flex;"`+
                        `     class="bookmarkResult graphBookmark" bookmarkIndex="${i}">`+
                          `<button type="button" class="graphBookmarkButton" bookmarkIndex="${i}" `+
                                  `style="margin-right: 10px;font-size: large;">📥</button>`+
                          `<div contenteditable="true" class="graphBookmarkTitle" bookmarkIndex="${i}">`+
                            `${title}`+
                          `</div>`+
                        `</div>`;
      }
      // Create a closing div to avoid selection/editing problem
      const closingDiv = '<div contenteditable="false" style="width: 100%;height: 20px;"></div>';
      // Set list
      bookmarkEl.innerHTML = source+closingDiv;

      // Apply Template function
      const jumpToBookmark = ( title, index )=> {
        console.log( 'Jumping to bookmark: ', title, '[', index, ']' );
        const bookmark = bookmarkList[index];
        if( bookmark ) {
          // Close the viewer
          m.e.closeEditor( this.id );

          // Jump to view
          const ge = m.e.getEditorInfo( 'diagram' );
          const graphPath = ge.editor.getGraphPath();
          if( graphPath == bookmark.graphPath ) {
            ge.editor.setCurrentView( bookmark.view );
          } else {
            ge.doLoadGraph( bookmark.nodeData, ()=>{
              ge.editor.setCurrentView( bookmark.view );
            });
          }
        }
      }
      // Set button event
      let itemElementList = document.querySelectorAll( '.graphBookmark' );
      for( const item of itemElementList ) {
        item.childNodes[0].addEventListener( 'click', ()=> {
          jumpToBookmark( item.innerText, item.getAttribute( 'bookmarkIndex' ) )
        });
      }
      // Set bookmark title events
      itemElementList = document.querySelectorAll( '.graphBookmarkTitle' );
      for( const item of itemElementList ) {
        // On title changed => update bookmark title
        item.addEventListener( 'blur', function( e ) {
          const index = item.getAttribute( 'bookmarkIndex' );
          const newTitle = item.innerText.replaceAll( '\n', '' ).trim();
          if( newTitle ) {
            updateBookmarkTitle( index, newTitle );
          } else {
            removeBookmark( index );
            item.parentNode.remove();
          }
        }, false);
      }
    }
  }
}
registerEditor({ name: 'BookmarkViewer', fileType: (ft)=> ft == 'application/bookmark', classRef: BookmarkViewer });

class AnimatorEditor extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.id = id;
    this.editor = null;

    position[3] = 600; // Make height higher
    this.title = 'Animator';
    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                         config.htmlDiv.mainDiv,
                                         this.storeWindowPosition.bind(this),
                                         position );

    this.editor = new ACEWrapper( this.editorDivId );
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
registerEditor({ name: 'AnimatorEditor', fileType: (ft)=> ft == 'input/fields', classRef: AnimatorEditor });

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
  }
  loadEditorContent( nodeData ) {
    // Update current nodeData
    this.nodeData = nodeData;
    // Update window title with:
    this.setTitle( this.nodeData );
    // Update pin
    if( nodeData.fileURL ) {
      m.e.showWindowPin( this.id );
    }
    // Set editor content
    const element = document.getElementById( this.editorDivId );
    if( element ) {
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
  }
  saveEditorContent( onSaved ) {
    this.editorSaved();
    if( onSaved ) {
      onSaved();
    }
  }
}
registerEditor({ name: 'SystemMonitorViewer', fileType: (ft)=> ft == 'system/status', classRef: SystemMonitorViewer });

class GraphTemplateViewer extends EditorBase {
  constructor( id, nodeData, position ) {
    super();
    this.id = id;
    this.editor = null;

    position[2] = 400; // Set with
    position[3] = 400; // Set with
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
    this.setTitle( this.nodeData );
    // Template List (loaded later from a file)
    let templateList = {};
    // Set editor content
    const element = document.getElementById( this.editorDivId );
    element.innerHTML = `<div id='templateList' ></div>`;
    const templateEl = document.querySelector( '#templateList' );
    const showTemplates = (sourceTemplateList)=> {
      // Generate Template Name List
      try {
        templateList = JSON.parse( sourceTemplateList );
        let source = '';
        const templateURLList = Object.keys( templateList );
        for( const templateURL of templateURLList ) {
          const templateName = templateList[templateURL];
          // Generate html
          if( templateURL.endsWith( '.json' ) ) {
            source = source+`<div class="findResult graphTemplateItem" templateURL="${templateURL}">
                              ${templateName}
                            </div>`;
          }
        }
        templateEl.innerHTML = source;
  
        // Apply Template function
        const applyTemplate = ( templateName, templateURL )=> {
          console.log( 'Appying template: ',templateName, templateURL );
          if( templateList[templateURL] ) {
            _openFile( templateURL, (sourceTemplate)=> {
              const e = m.e.getEditor( config.htmlDiv.graphDiv );
              // Remove Template flag
              if( sourceTemplate.indexOf( '<TemplateWorkSpace>' ) != -1 ) {
                sourceTemplate = sourceTemplate.replace( /<TemplateWorkSpace>/, 'TemplateWorkSpace' );  
              } else {
                sourceTemplate = sourceTemplate.replace( /TemplateWorkSpace/, 'WorkSpace' );
              }

              const updateSource = ()=> e.setEditorSource( sourceTemplate );
              const g = getMainGraph();
              if( !g.isModelEmpty() ) {
                winConfirm( 'Are you shure to replace current WorkSpace content?', 
                            updateSource, null, true );
              } else {
                updateSource();
              }
            });
          }
        }
        const itemElementList = document.querySelectorAll( '.graphTemplateItem' );
        for( const item of itemElementList ) {
          item.onclick = ()=> applyTemplate( item.innerText, item.getAttribute( 'templateURL' ) );
        }
      } catch (error) {
        alert( 'Error showing templates. Chacek templateList file' );
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
registerEditor({ name: 'GraphTemplateViewer', fileType: (ft)=> ft == 'input/fields', classRef: GraphTemplateViewer });

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
    this.setTitle( this.nodeData );
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
registerEditor({ name: 'DSLViewer', fileType: (ft)=> ft == 'input/fields', classRef: DSLViewer });

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
    const hint = 'Examples:&#013;     '+
                 'd.field == "1"&#013;     '+
                 '== "1"&#013;     '+
                 '"1"&#013;Field names are:&#013;'+fieldNameList;

    // Update current nodeData
    this.nodeData = nodeData;
    // Update window title with:
    this.setTitle( this.nodeData );
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
registerEditor({ name: 'FindViewer', fileType: (ft)=> ft == 'input/fields', classRef: FindViewer });

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
    this.setTitle( this.nodeData );
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
registerEditor({ name: 'ImageEditor', fileType: (ft)=> ft.startsWith( 'image/' ), classRef: ImageEditor });

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
    this.editor = new HChatWrapper( this.editorDivId );
    
    // Check readonly
    if( nodeData.isContentReadOnly ) {
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
    this.setTitle( this.nodeData );
    
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
registerEditor({ name: 'HChatEditor', fileType: (ft)=> ft == 'application/hchat', classRef: HChatEditor });

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
    this.editor = new ACEWrapper( this.editorDivId );
    const [ format, language ] = this.fileType.split( '/' ); // get text/<language>
    this.editor.setEditorMode( 'ace/mode/'+language );

    if( nodeData.editorTheme ) {
      this.editor.setEditorTheme( nodeData.editorTheme );
    } else {
      const editorDiv = document.getElementById( this.editorDivId );
      editorDiv.style.background = '#1d1f21';
    }

    // Check readonly
    if( nodeData.isContentReadOnly ) {
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
    this.setTitle( this.nodeData );
    // Update pin
    if( nodeData.fileURL && !nodeData.fileURL.startsWith( 'graph://' ) ) {
      m.e.showWindowPin( this.id, 'visible' );
    }
    // Set editor content
    if( this.nodeData.isFile ) {
      loadNodeContent( nodeData, (source)=> {
        this.editor.setEditorSource( source );
        this.doLoadLastUpdateTime( nodeData, ()=> {
          // After loading update time, clear pause change
          this.setPauseChange( false );
        });
      });
    } else if( this.nodeData.label != undefined ) {
      const source = this.nodeData.label;
      this.editor.setEditorSource( source );
      // Clear pause change
      this.setPauseChange( false );
    }
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
      if( this.nodeData.isFile ) {
        // First check destination file info from the server
        // to avoid to overwrite a newer version of the graph
        this.doCheckLastUpdateTime( this.nodeData, onTimeChecked );
      } else if( this.nodeData.label != undefined ) {
        const source = this.editor.getEditorSource();
        setNodeDataField( this.nodeData, 'label', source );
        onEditorSaved();
      }
    } else {
      onEditorSaved();
    }
  }
}
registerEditor({ name: 'TextEditor', fileType: (ft)=> ft.startsWith( 'text/' ), classRef: TextEditor });
registerEditor({ name: 'TextEditor', fileType: (ft)=> ft == 'application/x-shellscript', classRef: TextEditor });

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
    this.editor = new ExploreEditorWrapper( this.editorDivId );

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
    this.setTitle( this.nodeData );
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
registerEditor({ name: 'HTMLExploreEditor', fileType: (ft)=> ft == 'application/explore', classRef: HTMLExploreEditor });

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
    this.setTitle( this.nodeData );
    // Update pin
    if( nodeData.fileURL && !nodeData.fileURL.startsWith( 'graph://' ) ) {
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
        loadScriptSource( source, null, true );
      }
    } else if( nodeData.fileURL && !nodeData.fileURL.startsWith( 'graph://' ) ) {
      const element = document.getElementById( this.editorDivId );
      const fileURL = ( nodeData.fileURL? nodeData.fileURL: '' );
      // NOTE:  name="${Date.now()}" is a workaround to avoid caching
      element.innerHTML = `<iframe id='${this.id}_frame' class='webViewer' src="${fileURL}?_=${Date.now()}"></iframe>`;
      // const url = new URL( nodeData.fileURL, window.location ).toString();
      // this.win.setUrl( url );
    } else {//if( nodeData.fileContent != undefined ) {
      // Case of nodeData.fileContent or fileURL = 'graph://...'
      loadNodeContent( nodeData, (source)=> {
        const element = document.getElementById( this.editorDivId );
        const frameId = `${this.id}_frame`;
        // NOTE:  name="${Date.now()}" is a workaround to avoid caching
        element.innerHTML = `<iframe id='${frameId}' name="${Date.now()}" class='webViewer' src='about:blank'></frame>`;
        const frameElement = document.getElementById( frameId );
        frameElement.contentDocument.open();
        frameElement.contentDocument.write( source );
        frameElement.contentDocument.close();
      });
      // const element = document.getElementById( this.editorDivId );
      // const frameId = `${this.id}_frame`;
      // // NOTE:  name="${Date.now()}" is a workaround to avoid caching
      // element.innerHTML = `<iframe id='${frameId}' name="${Date.now()}" class='webViewer' src='about:blank'></frame>`;
      // const frameElement = document.getElementById( frameId );
      // frameElement.contentDocument.open();
      // frameElement.contentDocument.write( nodeData.fileContent );
      // frameElement.contentDocument.close();
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
registerEditor({ name: 'WebViewer', fileType: (ft)=> ft == 'application/html', classRef: WebViewer });

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
    this.setTitle( this.nodeData );
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