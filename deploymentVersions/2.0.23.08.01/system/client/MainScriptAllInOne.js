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

/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools EditorJS Interface
Date: 10.10.2020
=============================================================================
*/

/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: Event Manager
Date: 10.07.2020
=============================================================================
*/

class EventManager {
	constructor() {
		this.eventList = {};
		this.call = {};
	}
	add( name, help, params ) {
		if( name && !this.eventList[name] ) {  // Add a new event if not already there
			const callbackList = [];
			params = ( params? params: {} );
			help = ( help? help: '' )
			this.eventList[name] = { help, params, callbackList };
			this.call[name] = (...paramList)=> this.fire( name, ...paramList );
		}
	}
	addList( eventList ) {
		if( eventList ) {
			for( const name in eventList ) {
				const info = eventList[name];
				this.add( name, info.help, info.params );
			}
		}
	}
	register( name, callback ) {
		if( name && this.eventList[name] ) {
			if( callback ) { // Register the callback if defined
				this.eventList[name].callbackList.push( callback );
			}
		}
	}
	registerList( callbackList ) {
		if( callbackList ) {
			for( const name in callbackList ) {
				const callback = callbackList[name];
				this.register( name, callback );
			}
		}
	}
	unregister( name, callback ) {
		if( name && this.eventList[name] ) {
			if( callback == undefined ) { // Unregister all callback
				const callbackList = [];
				this.eventList[name] = { paramInfo, callbackList };
			} else {  // Unregister a single callback
				const index = this.eventList[name].callbackList.indexOf( callback );
				if( index > -1 ) {
					this.eventList[name].callbackList.splice( index, 1 );
				}
			}
		}
	}
	fire( name, ...paramList ) { // after name, all other parameters will be passed to the callback
		if( name && this.eventList[name] &&
			  this.eventList[name].callbackList.length ) { // Fire event if not empty
			for( const callback of this.eventList[name].callbackList ) {
				callback( ...paramList );
			}
		}
	}
}

/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Manager of Change Status and Saving Process for Editors
Date: 10.07.2020
=============================================================================
*/

class EditorChangeManager {
  constructor( saveTimeOut ) {
    this.isPauseChage = false;
    this.changeCount = 0;
    this.saveTimer = null;
    this.saveTimeOut = saveTimeOut*1000;
    this.onDoSaveCallback = null;
    this.onNeedSaveCallback = null;
  }
  setPauseChange( status ) {
    this.isPauseChage = status;
  }
  editorHasChanged() {
    if( !this.isPauseChage ) {
      if( EditorChangeManager.unsavedEditor[this.id] == undefined ) {
        EditorChangeManager.unsavedEditor[this.id] = 0;
      }
      ++EditorChangeManager.unsavedEditor[this.id];
      if( EditorChangeManager.onGlobalNeedSaveCallback ){
        EditorChangeManager.onGlobalNeedSaveCallback();
      }
      ++this.changeCount;
      this.isEditorSaved = true;
      // Skip the first change that correspond to the
      // loading of the editor with a new content
      //if( this.changeCount > 1 ) {
        this._startSaveTimer();
      //}
      const keys =  Object.keys( EditorChangeManager.unsavedEditor );
    }
  }
  isNeedSave() {
    return( EditorChangeManager.unsavedEditor[this.id] == undefined? false: true );
  }
  onDoSave( callback ) {
    this.onDoSaveCallback = callback;
  }
  onNeedSave( callback ) {
    this.onNeedSaveCallback = callback;
  }
  editorSaved() {
    this.clearStatus();
    // TODO: count all saved/unsaved file. We can show the orange frame if all 
    // editor are saved. All!
    delete EditorChangeManager.unsavedEditor[this.id];
    const idList = Object.keys( EditorChangeManager.unsavedEditor );
    if( idList.length == 0 ) {
      if( EditorChangeManager.onGlobalIsSavedCallback ){
        EditorChangeManager.onGlobalIsSavedCallback();
      }
    }
  }
  suggestToSave() {
    if( this.saveTimer ) {
      this._clearSaveTimer();
      this._signalToSave();
    }
  }
  clearStatus() {
    if( this.saveTimer ) {
      this._clearSaveTimer();
      this.isChanged = false;
      this.changeCount = 0;
    }
  }
  _startSaveTimer() {
    this._clearSaveTimer();
    if( this.saveTimeOut > 0 ) {
      this.saveTimer = setTimeout( this._signalToSave.bind(this), this.saveTimeOut );
      if( this.onNeedSaveCallback ) {
        this.onNeedSaveCallback();
      }
    }
  }
  _clearSaveTimer() {
    if( this.saveTimer ) {
      clearTimeout( this.saveTimer );
      this.saveTimer = null;
    }
  }
  _signalToSave() {
    if( this.onDoSaveCallback ) {
      this.onDoSaveCallback();
    }
  }
}
EditorChangeManager.unsavedEditor = {};
EditorChangeManager.onGlobalNeedSaveCallback = null;
EditorChangeManager.onGlobalIsSavedCallback = null;
EditorChangeManager.onGlobalNeedSave = function( callback ) {
  EditorChangeManager.onGlobalNeedSaveCallback = callback;
};
EditorChangeManager.onGlobalIsSaved = function( callback ) {
  EditorChangeManager.onGlobalIsSavedCallback = callback;
};


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

// Used to create unique div Id names
// This variable must be global to ensure a unique index for all 
// opened SmartBlock instances
let SmartBlockEditor_divIndex = 0;

class SmartBlockEditor {
  constructor( editorDivId ) {
    this.originalEditorDivId = editorDivId;
    this.editorDivId = editorDivId;

    // We should not instantiate an editor at start.
    // Editor should be initialized in the setEditorSource
    this.editorDiv = document.getElementById( this.editorDivId );
    this.editorDiv.style.backgroundColor = '#f2f2f4';

    // Default document source for blank documents
    this.defaultSource = '<h2>Title Here</h2>'+
                         '<p>Type document content here...</p>';

    // Add Custom Block to SmartBlock extensions
    const cbInfo = {
      tagName: 'div',
      className: 'acms-alert',
      customName: 'alert',
      icon: '!',
    };
    const cb = new SmartBlock.CustomBlock( cbInfo );
    SmartBlock.Extensions.push( cb );
  
    // Change handler
    this.onSourceChangedCallback = null;
    this.currentSource = this.defaultSource;
  }
  isReadOnly() {
    return( false );
  }
  setReadOnly( status ) {
    // Check how to set read only
  }
  setEditorSource( source ) {
    if( !source ) {
      // Default document content
      source = this.defaultSource;
    }
    try {
      // Clean div content
      //this.editorDiv.remove();
      // Create a new div for connecting the SmartBlock editor
      //this.editorDivId = this.originalEditorDivId+(SmartBlockEditor_divIndex++);
      //const newDiv = document.createElement( 'div' );
      //newDiv.id = this.editorDivId;
      //newDiv.className = 'editorDiv';
      //const parentDiv = this.editorDiv.parentElement;
      //parentDiv.appendChild = newDiv;

      // Create the SmartBlock editor
      const sbInfo = {
        html: source,
        extensions: SmartBlock.Extensions,
        onChange: this._onChangeCallback.bind(this),
      };
      SmartBlock.Editor( `#${this.editorDivId}`, sbInfo );

      this.currentSource = source;
    } catch ( error ) {
      // Nothing to do, no source loaded in this case
      console.log( 'Error: could not load EditorJS source' );
    }
  }
  getEditorSource( callback ) {
    return( this.currentSource );
  }
  getEditorSourceNumLines() {
    return( 10 ); //this.htmlEditor.session.getLength() );
  }
  getCurrentLine() {
    const currline = ''; //this.htmlEditor.getSelectionRange().start.row
    return( currline );
  }
  getCurrentSelectionLines() {
    //const currSelStartLine = this.htmlEditor.getSelectionRange().start.row;
    //const currSelEndLine = this.htmlEditor.getSelectionRange().end.row;
    //return( { start: currSelStartLine, end: currSelEndLine } );
    return( { start: 0, end: 0 } );
  }
  getCurrentLineText() {
    //const currline = this.htmlEditor.getSelectionRange().start.row;
    let lineText = ''; //this.htmlEditor.session.getLine( currline );
    return( lineText );
  }
  getLineTextAt( lineIndex ) {
    let lineText = ''; //this.htmlEditor.session.getLine( lineIndex );
    return( lineText );
  }
  onSourceChanged( onSourceChangedCallback ) {
    this.onSourceChangedCallback = onSourceChangedCallback;
  }
  onEvent( eventName, callback ) {
    //this.htmlEditor.on( eventName, callback );
  }
  _onChangeCallback( result ) {
    // Update current source
    //console.log(result.json, result.html);
    this.currentSource = result.html;

    // Trigger change event
    if( this.onSourceChangedCallback ) {
      this.onSourceChangedCallback();
    }
  }
}


/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Server Manager
Date: 10.07.2020
=============================================================================
*/

// The appData stores data for the full browser session (reload cleans it)
const appData = {};
// The graphData stores data for the loaded graph (loading a different grap cleans it)
let graphData = {}; // Set in Graph.js on setEditorSource()

const codeFileType = {
  "JavaScript":     {color: "orange",         fileType: "text/javascript",                ext: "js"},
  "Text":           {color: "yellow",         fileType: "text/text",                      ext: "txt"},
  "JSON":           {color: "orange",         fileType: "text/json",                      ext: "json"},
  "XML":            {color: "orange",         fileType: "text/xml",                       ext: "xml"},
  "HTML":           {color: "lightsalmon",    fileType: "text/html",                      ext: "html"},
  "Web Page":       {color: "lightsalmon",    fileType: "application/html",               ext: "html"},
  "CSS":            {color: "peachpuff",      fileType: "text/css",                       ext: "css"},
  "Python":         {color: "firebrick",      fileType: "text/python",                    ext: "py"},
  "C":              {color: "palegreen",      fileType: "text/c_cpp",                     ext: "c"},
  "H":              {color: "palegreen",      fileType: "text/c_cpp",                     ext: "h"},
  "C++":            {color: "mediumseagreen", fileType: "text/c_cpp",                     ext: "cpp"},
  "H++":            {color: "mediumseagreen", fileType: "text/c_cpp",                     ext: "hpp"},
  "C#":             {color: "seagreen",       fileType: "text/c_cpp",                     ext: "cs"},
  "Binary":         {color: "white",          fileType: "application/octet-stream",       ext: "bin"},
  "Shell":          {color: "gray",           fileType: "application/x-shellscript",      ext: "sh"},
  "Rich Text":      {color: "aquamarine",     fileType: "application/explore",            ext: "html"},
  "JPEG":           {color: "lavender",       fileType: "image/jpeg",                     ext: "jpeg"},
  "PNG":            {color: "lavender",       fileType: "image/png",                      ext: "png"},
  "GIF":            {color: "lavender",       fileType: "image/gif",                      ext: "gif"},
  "SVG":            {color: "lavender",       fileType: "image/svg",                      ext: "svg"},
};

/* TODO: Use this way to get url params */
//const urlParams = new URLSearchParams( window.location.search );
let urlParams = { name: 'DefaultUser' };

function loadSystem() {
  /*
    
    // Get params value
    const url = new URL(
      'http://example.com/path/index.html?message=hello&who=world'
    );

    // Get host name
    console.log(url.hostname); // => 'example.com'
    // Get path name
    console.log(url.pathname); // => '/path/index.html'
    // Get search string
    console.log(url.search); // => '?message=hello&who=world'
    // Get params
    console.log(url.searchParams.get('message')); // => 'hello'
    console.log(url.searchParams.get('missing')); // => null

    // Get hash
    const url = new URL('http://example.com/path/index.html#top');

    console.log(url.hash); // => '#top'
  */
  // Decode url parameter (remove firs char '?')
  const urlStrParams = decodeURI( document.location.search.substring( 1 ) );
  // Get url params values
  urlParams = {};
  eval( `urlParams = {${urlStrParams}}` );
  console.log( urlParams );
  
  if( !urlParams.name ) {
    cookie = JSON.parse(document.cookie);
    urlParams.name = cookie.name;
  } else {
    document.cookie = JSON.stringify({name: urlParams.name});
  }

  // Define list of system scripts to be loaded
  scriptList = [
    `./configs/${urlParams.name}_config.js`,
    //'./EditorChangeManager.js',
    //'./EventManager.js',
    //'./Graph.js',
    //'./Editors.js',
    './ModelExplorer.js',
    //'./MainScript.js',
    //'./EditorManager.js',
    //'./BlockCodeEditor.js',
    //'./SmartBlockEditor.js',
    //'./ACESourceCodeEditor.js',
    //'./GraphParser.js',
  ];
  loadScriptList( scriptList, ()=> {
    console.log( 'Depentency loaded' );
  }, false ); // The 'false' is for alowing caching files (don't load twice)
}
function getFileTypeInfoByName( name ) {
  if( codeFileType[name] ) {
    return( codeFileType[name] );
  } else {
    return( codeFileType['Binary'] );
  }
}
function getExtByFileType( fileType ) {
  let result = 'bin';
  const fileTypeNameList = Object.keys( codeFileType );
  for( const fileTypeName of fileTypeNameList ) {
    const fileTypeInfo = codeFileType[fileTypeName];
    if( fileTypeInfo.fileType == fileType ) {
      result = fileTypeInfo.ext;
    }
  }
  return( result );
}
function getNewFileServerURL( extension ) {
  extension = ( extension? extension: 'bin' );
  // Path creation function
  const getPath = function( pathV ) {
    let result = '';
    for( let i = 0; i < pathV.length; i=i+2 ) {
      // TODO: check, why am I taking i, i+2???? should not be i, i+1
      result = result+'/'+pathV.substring( i, i+2 );
    }
    return( result );
  }
  // Get current fileServer info
  let fsInfo = m.fileInfo.fileServer;

  // Set FileName
  let isNextPathNeeded = false;
  if( fsInfo.currFile >= fsInfo.maxFileIndex ) {
    isNextPathNeeded = true;
    fsInfo.currFile = 0;
  } else {
    ++fsInfo.currFile;
  }
  const fileName = ( fsInfo.currFile < 10? '0'+fsInfo.currFile: fsInfo.currFile );
  let newFile = fileName+'.'+extension;

  // Set PathName
  if( isNextPathNeeded ) {
    fsInfo.currPath++;
  }
  let pathV = fsInfo.currPath.toString();
  let pathVlen = pathV.length;
  if( pathVlen % 2 == 1 ) {
    pathV = pathV.substring( 0, pathVlen-1 )+'0'+pathV.substring( pathVlen-1 );
  }
  const newPath = getPath( pathV );
  setFileIndexStatus( (s)=> s.fileServer = fsInfo );
  
  // Generate next file/path
  const host = ''; document.location.origin;
  const newFilePath = `${host}${config.host.fileServerURL}${newPath}/${newFile}`;
  // Update fileIndex file
  const url = `${config.host.fileServerSystemURL}/fileIndex.json`;
  const source = JSON.stringify( m.fileInfo );
  _saveFile( url, source );
  return( newFilePath );
}
function loadScriptList( urlList, onLoad, isAvoidCache ) {
  if( !Array.isArray( urlList ) ) {
    if( onLoad ) {
      onLoad();
    }
  } else {
    const urlListCopy = [...urlList];
    const url = urlListCopy.shift();

    if ( url ) {
      loadScript( url, ()=> {
        loadScriptList( urlListCopy, onLoad, isAvoidCache );
      }, isAvoidCache );
    } else {
      if( onLoad ) {
        onLoad();
      }
    }
  }
}
function loadScript( url, onLoad, isAvoidCache ) {
  isAvoidCache = ( isAvoidCache == undefined? true: isAvoidCache );
  const prevScript = document.getElementById( url );
  if( prevScript ) {
    document.head.removeChild( prevScript );
  }
  const script = document.createElement( 'script' );
  script.id = url;
  script.type = 'text/javascript';
  script.onload = ()=> {
    console.log( `Script ${url} loaded` );
    if( onLoad ) {
      onLoad();
    }
  };
  script.onerror = ()=> {
    console.log( `Error loading script ${url}` );
  };
  let uniqueURL = '';
  if( isAvoidCache ) {
    // Avoid server cache with timestamp
    const timestamp = new Date().getTime();
    uniqueURL = '?_='+timestamp;
  }
  script.src = url+uniqueURL;
  document.head.append( script )
}
function loadNodeContent( nodeData, onLoaded ) {
  if( nodeData.isModel ) {  // Check on isModel must be first
    // Load content from main graph model
    const source = nodeData.fileContent;
    if( onLoaded ) {
      onLoaded( source );
    }
  } else if( nodeData.fileURL != undefined ) { // Check on fileURL must be second
    // Load content from file system
    _openFile( nodeData.fileURL, onLoaded );
  } else if( nodeData.fileContent != undefined ) { // Check on fileContent must be third
    // Load content from node
    const source = nodeData.fileContent;
    if( onLoaded ) {
      onLoaded( source );
    }
  } else {
    console.log( 'Warning: no content could be loaded' );
    if( onLoaded ) {
      onLoaded( '' );
    }
  }
}
function saveNodeContent( nodeData, onSaved ) {
  // TODO: check, I guess 'isModel' is not used at all -> check all json graphs
  if( nodeData.isModel ) {  // Check on isModel must be first
    const e = m.e.getEditor( config.htmlDiv.graphDiv );
    e.setJSONModel( nodeData.fileContent );
    if( onSaved ) {
      onSaved();
    }
  } else if( nodeData.fileURL != undefined ) { // Check on fileURL must be second
    const sourceEncoding = ( nodeData.fileEncoding? nodeData.fileEncoding: 'utf8' );
    const source = nodeData.fileContent;
    _saveFile( nodeData.fileURL, source, onSaved, sourceEncoding );
  } else if( nodeData.fileContent != undefined ) { // Check on fileContent must be third
    //const e = m.e.getEditor( config.htmlDiv.graphDiv );
    //if( e ) {
      const source = nodeData.fileContent;
      //e.setNodeDataField( nodeData.key, 'fileContent', source );
      setNodeDataField( nodeData.key, 'fileContent', source );
    //}
    if( onSaved ) {
      onSaved();
    }
  } else {
    console.log( 'Warning: no content could be saved' );
    if( onSaved ) {
      onSaved();
    }
  }
}
function getNodeInfoFromServer( nodeData, onInfo ) {
  const onLoaded = ( source ) => {
    //console.log( `File status for "${nodeData.fileURL}": ${source}` );
    const fileInfo = JSON.parse( source );
    if( onInfo ) {
      onInfo( fileInfo );
    }
  };
  // Get only info from nodes with fileURL
  if( nodeData.fileURL != undefined ) {
    let url = nodeData.fileURL;
    if( url.startsWith( config.host.fileServerURL ) ) {
      url = url.replace( config.host.fileServerURL, config.host.fileStatusURL );
      // Load content from file system
      _openFile( url, onLoaded, true ); // noTimeStamp = true
    } else {
      // Empty info
      if( onInfo ) {
        onInfo( {} );
      }  
    }
  } else {
    // Empty info
    if( onInfo ) {
      onInfo( {} );
    }
  }
}
function executeScript( scriptName, onExecuted ) {
  _openFile( '/executeScript/'+scriptName, onExecuted, true );
}
//------------------------
// Private Functions
//------------------------
function _openFile( url, onLoad, noTimeStamp ) {
  // Decide if attach a timestamp or not (timestamp used to avoid chache)
  noTimeStamp = ( noTimeStamp != undefined? noTimeStamp: false );

  let source = '';
  // read text from URL location
  const request = new XMLHttpRequest();
  // Avoid server cache with timestamp
  if( !noTimeStamp ) {
    const timestamp = new Date().getTime();
    url = url+'?_='+timestamp;
  }
  request.open( 'GET', url, true );
  //request.setRequestHeader('Cache-Control', 'no-cache');
  request.onerror = (e)=> {
    winAlert( 'Server not responding' );
    setTimeout( setSystemError, 2500 );
    if( onLoad ) {
      onLoad( '' );
    }
  };

  try {
    request.send( '' );
  } catch( e ) {
    console.log( e );
    if( onLoad ) {
      onLoad( '' );
    }
  }

  request.onreadystatechange = function () {
    if( request.readyState === 4 ) {
      const status = request.status;
      if( ( status === 0 ) || ( ( status >= 200 ) && ( status < 400 ) ) ) {
        const type = request.getResponseHeader('Content-Type');
        if( type.indexOf( "text" ) !== 1 ) {
          source = request.responseText;
          console.log( 'Loading: '+url );
        } else {
          console.log( 'Unsupported Content-Type: '+type );
        }
      }
      if( onLoad ) {
        onLoad( source );
      }
    } else {
      // NOTE: you should not call the onLoad here!!!!!
      // Only readyState 4 is the end of the HTTP request
    }
  }
}
function _saveFile( url, source, onSaveDone, sourceEncoding ) {
  if( !m.status.isReadOnly ) {
    const request = new XMLHttpRequest();
    request.open( 'POST', '/fileServer' );
    request.setRequestHeader( 'Content-Type', 'text/plain;charset=UTF-8' );
    //request.setRequestHeader('Cache-Control', 'no-cache');
    request.onerror = (e)=> {
      winAlert( 'Server not responding' );
      setTimeout( setSystemError, 2500 );
      if( onSaveDone ) {
        onSaveDone();
      }
    };
    request.addEventListener( 'loadend', ()=> {
      if( onSaveDone ) {
        onSaveDone();
      }
    });
    console.log( 'Saving: '+url );
    const fileInfo = { url, source, sourceEncoding, };
    try {
      request.send( JSON.stringify( fileInfo ) );
    } catch( e ) {
      console.log( e );
      // TODO: I am not sure in this case is good to call the callback!!!
      debugger;
      if( onSaveDone ) {
        onSaveDone();
      }
    }
  } else {
    console.log( 'Read-only mode. No save request serverd' );
    if( onSaveDone ) {
      onSaveDone();
    }
  }
}
function saveRemoteFile( remoteServerURL, url, source, onSaveDone ) {
  if( !m.status.isReadOnly ) {
    const request = new XMLHttpRequest();
    request.open( 'POST', '/remoteFileServer' );
    request.setRequestHeader( 'Content-Type', 'text/plain;charset=UTF-8' );
    //request.setRequestHeader('Cache-Control', 'no-cache');
    request.onerror = (e)=> {
      winAlert( 'Server not responding' );
      setTimeout( setSystemError, 2500 );
      if( onSaveDone ) {
        onSaveDone();
      }
    };
    request.addEventListener( 'loadend', ()=> {
      if( onSaveDone ) {
        onSaveDone();
      }
    });
    console.log( `Saving to remote [${remoteServerURL}]: `+url );
    const remoteHost = remoteServerURL.substring( 0, remoteServerURL.lastIndexOf( ':' ) );
    const remotePort = remoteServerURL.substring( remoteServerURL.lastIndexOf( ':' )+1 );
    const fileInfo = { 
      remoteHost,
      remotePort,
      url, 
      source, };
    try {
      request.send( JSON.stringify( fileInfo ) );
    } catch( e ) {
      console.log( e );
      if( onSaveDone ) {
        onSaveDone();
      }
    }
  } else {
    console.log( 'Read-only mode. No save request serverd' );
    if( onSaveDone ) {
      onSaveDone();
    }
  }
}

/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Main Graph Editor
Date: 10.07.2020
=============================================================================
*/

var $ = go.GraphObject.make;  // for conciseness in defining templates

class Graph {
	constructor( param ) {
		// fullPaletteId, nodePaletteId, linkPaletteId, graphId
		param = ( param? param: {} );

		// Graphical Canvas
		this.diagram = null;
		this.fullPaletteId = null;
		this.nodePalette = null;
		this.groupPalette = null;
		this.linkPalette = null;
		this.lastNodeKey = null;
		this.dslNameList = [];
		this.isReadOnly = false;
		// Path of the loaded graph
		this.graphPath = '';

		// Store fullPaletteId for hide/show palette
		if( param.fullPaletteId ) {
			this.fullPaletteId = param.fullPaletteId;
		}

		// create the Palette
		if( param.nodePaletteId ) {
			this.nodePalette = this.newNodePalette( param.nodePaletteId );
		}
		if( param.groupPaletteId ) {
			this.groupPalette = this.newGroupPalette( param.groupPaletteId );
		}
		if( param.linkPaletteId ) {
			this.linkPalette = this.newLinkPalette( param.linkPaletteId );
		}
		if( param.graphId ) {
			this.diagram = this.newDiagram( param.graphId );
		} else {
			// Case of no DIV diagram (no visual part)
			this.diagram = this.newDiagram(); // TODO: test this case if works well
		}

		// Graph Evetns
		this.em = new EventManager();
		this.em.addList({
			onSelection:								{ help: 	'Inofrm that the selection has changed in the graph',
																		params: { dataList: 'List of selected node-data' } },
			onGraphChanged:							{ help: 	'Inofrm that graph has changed' },
			onFirstLayoutCompleted:			{ help: 	'Inofrm that graph has completed the first layout after load' },
			onLoadGraph: 								{ help:   'Load a new graph in canvas', 
			  	           								params: { nodeData: 'node-data of the the graph to load' } },
		  onLoadFile:       					{ help:   'Open dialog with a file in a new editor',
																		params: { nodeData: 'node-data of the the file to load', 
																							x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
			onClone:                    { help:   'Clone the duplicated node',
		                                params: { nodeData: 'data of the target clone' } },
			onShowRootGraph: 						{ help: 	'Load system root graph' },
			onSetReadOnly:   						{ help: 	'Set read-only navigation (never save changes to server)',
																		params: { status: 'true/false' } },
			onShowParentGraph:					{ help: 	'Load parent graph in canvas' },
			onShowPreviousGraph:  			{ help: 	'Load previous graph in canvas' },
			onShowFindDialog:						{ help: 	'Open dialog for searching in the current graph',
																		params: { x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
			onShowAnimatorEditor:				{ help: 	'Open dialog for animating nodes in current graph',
																		params: { x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
			onShowDSLListDialog:				{ help: 	'Open dialog for adding/removing DSL',
																		params: { x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
			onShowGraphTemplateDialog:	{ help: 	'Open dialog for selecting a graph template',
																		params: { x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
			onShowSysMonitorDialog:			{ help: 	'Open dialog for monitoring system information',
																		params: { x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
		});

		// Create context menu object
		this.contextMenu = new HTMLMenu( 'contextMenuContainer' );
		// GoJS Parameter for each item
		this.contextMenu.addParams( 'gojs', {
			diagram: this.diagram,
			tool:    this.diagram.currentTool,
			cmd:     this.diagram.commandHandler,
			cmt:     this.diagram.toolManager.contextMenuTool,
		});
		this.contextMenu.add({
      'diagramContextMenu': 
				{	layout: 'vertical', itemList: [
					{ label: 'Properties',					do: ( o )=> winAlert( this.getDiagramInfo( this.diagram.model ), false )},
					{ label: 'View',       layout: 'vertical',	subMenu: [
						{ label: 'Zoom to Fit',			  do: this.doZoomToFit.bind(this) },
						{ separator: '-' },
						{ label: 'Show View 1',				do: (o)=> { if( o.event.shiftKey ) {
																												this.setCurrentViewToBookmark( 1 );
																											} else {
																												this.setToBookmarkView( 1 );
																											} }},
						{ label: 'Show View 2',				do: (o)=> { if( o.event.shiftKey ) {
																												this.setCurrentViewToBookmark( 2 );
																											} else {
																												this.setToBookmarkView( 2 );
																											} }},
						{ label: 'Show View 3',				do: (o)=> { if( o.event.shiftKey ) {
																												this.setCurrentViewToBookmark( 3 );
																											} else {
																												this.setToBookmarkView( 3 );
																											} }},
						{ label: 'Show View 4',				do: (o)=> { if( o.event.shiftKey ) {
																												this.this.setCurrentViewToBookmark( 4 );
																											} else {
																												this.setToBookmarkView( 4 );
																											} }},
						{ label: 'Show Prev View',		do: this.setCurrentViewToPreviousView.bind(this) },
					]},
					{ separator: '-',               if: (o)=> { // NOTE: if we define a location, paste do not showup in the popup menu
																											//const location = o.d.cmt.mouseDownPoint;
																											return( o.d.cmd.canPasteSelection( location ) ); }},
					{ label: 'Paste',      					if: (o)=> { // NOTE: if we define a location, paste do not showup in the popup menu
																											//const location = o.d.cmt.mouseDownPoint;
																											return( o.d.cmd.canPasteSelection( location ) ); },
																					do: (o)=> { const location = o.d.cmt.mouseDownPoint;
																												o.d.cmd.pasteSelection( location ); }},
					{ separator: '-' },
					{ label: 'Find',      					do: (o)=> { const mousePos = this.diagram.lastInput.viewPoint;
																											this.em.call.onShowFindDialog( mousePos.x, mousePos.y );
																										} },
					{ separator: '-' },
					{ label: 'Tools',       layout: 'vertical', subMenu: [
						{ label: 'Toggle Visible Palette', 	if: (o)=> ( this.fullPaletteId? true: false ),
																								do: (o)=> { const htmlObj = document.querySelector( `#${this.fullPaletteId}` );
																														const v = htmlObj.style.visibility;
																														htmlObj.style.visibility = ( v == 'visible'? 'hidden': 'visible' ); 
																													  // Position palette in browser view
																														const browserWidth = window.innerWidth;
																														const browserHeight = window.innerHeight;
																														htmlObj.style.left = Math.min( browserWidth-100, Math.max( 0, htmlObj.offsetLeft ) );
																														htmlObj.style.top = Math.min( browserHeight-100, Math.max( 0, htmlObj.offsetTop ) );
																													}},
						{ label: 'Toggle Visible Grid', do: (o)=> this.diagram.grid.visible = !this.diagram.grid.visible },
						{ separator: '-' },
						{ label: 'Show DSL List',			do: (o)=> { const mousePos = this.diagram.lastInput.viewPoint;
																											this.em.call.onShowDSLListDialog( mousePos.x, mousePos.y ); } },
						{ label: 'Show Graph Template',	do: (o)=> { const mousePos = this.diagram.lastInput.viewPoint;
																												this.em.call.onShowGraphTemplateDialog( mousePos.x, mousePos.y ); } },
						{ label: 'Show System Monitor',		do: (o)=> { const mousePos = this.diagram.lastInput.viewPoint;
																													this.em.call.onShowSysMonitorDialog( mousePos.x, mousePos.y ); } },
						{ label: 'Show Animator',			do: (o)=> { const mousePos = this.diagram.lastInput.viewPoint;
																											this.em.call.onShowAnimatorEditor( mousePos.x, mousePos.y ); } },
					]},
					{ label: 'Navigate',		layout: 'vertical', subMenu: [
						{ label: 'Go To Parent Graph',	if: (o)=> !this.isRootGraph,
																						do: (o)=> { if( !this.isRootGraph) this.em.call.onShowParentGraph(); } },
						{ label: 'Back To Previous Graph',	if: (o)=> !this.isHistoryEmpty,
																						do: (o)=> { if( !this.isHistoryEmpty ) this.em.call.onShowPreviousGraph(); } },
						{ label: 'Go To Root Graph',		if: (o)=> !this.isRootGraph,
																						do: (o)=> this.em.call.onShowRootGraph() },
					]},
					{ separator: '-' },
					{ label: 'Set Read-only Mode',    if: (o)=> !this.isReadOnly,
																						do: (o)=> { this.isReadOnly = true;
																												this.em.call.onSetReadOnly( true ); } },
					{ label: 'Unset Read-only Mode',  if: (o)=> this.isReadOnly,
																						do: (o)=> { this.isReadOnly = false;
																												this.em.call.onSetReadOnly( false ); } },
					{ separator: '-',         if: (o)=> o.d.cmd.canUndo() || o.d.cmd.canRedo() },
					/*{ label: 'Undo',      					if: (o)=> o.d.cmd.canUndo(),
																					do: (o)=> o.d.cmd.undo() },
					{ label: 'Redo',      					if: (o)=> o.d.cmd.canRedo(),
																					do: (o)=> o.d.cmd.redo() },*/
					{ layout: 'horizontal', itemList: [
						{ fontIcon: 'action-undo', hint: 'Undo (CTRL-Z)',     if: (o)=> o.d.cmd.canUndo(),
																																	do: (o)=> o.d.cmd.undo() },
						{ fontIcon: 'action-redo', hint: 'Undo (CTRL-Z)',     if: (o)=> o.d.cmd.canRedo(),
																																	do: (o)=> o.d.cmd.redo() },
					]},
				]},
			'nodeContextMenu':
				{ layout: 'vertical', itemList: [
					{ label: 'Zoom it',     do: this.doZoomToFitSlectedNode.bind(this,5) },
					{ separator: '-' },
					{ label: 'Duplicate',   if: (o)=> {	const location = o.d.cmt.mouseDownPoint;
																							return( o.d.cmd.canCopySelection() ); },
																	do: (o)=> { const location = o.d.cmt.mouseDownPoint;
																							o.d.cmd.copySelection();
																							o.d.cmd.pasteSelection( location ); } },
					{ label: 'Clone',       if: (o)=> this.canEditClone(),
																	do: (o)=> this.doEditClone() },
					{ label: 'Cut',         if: (o)=> o.d.cmd.canCutSelection(),
																	do: (o)=> o.d.cmd.cutSelection() },
					{ label: 'Copy',        if: (o)=> o.d.cmd.canCopySelection(),
																	do: (o)=> o.d.cmd.copySelection() },
					{ label: 'Paste',       if: (o)=> { // TODO: check, I do not define location
																							// but, it seems that with location, paste become unavailable
																							o.d.cmd.canPasteSelection( location ); },
																	do: (o)=> { const location = o.d.cmt.mouseDownPoint;
																							o.d.cmd.pasteSelection( location ); } },
					{ label: 'Delete',      if: (o)=> o.d.cmd.canDeleteSelection(),
																	do: (o)=> o.d.cmd.deleteSelection() },
					{ separator: '-' },
					{ label: 'Set From Palette',	do: (o)=> this._reSetSelectionFromPalette() },
					{ separator: '-' },
					{ label: 'Group',       if: (o)=> o.d.cmd.canGroupSelection(),
																	do: (o)=> o.d.cmd.groupSelection() },
					{ label: 'Ungroup',     if: (o)=> o.d.cmd.canUngroupSelection(),
																	do: (o)=> o.d.cmd.ungroupSelection() },
					{ label: 'Ungroup Nodes',if: (o)=> !o.d.cmd.canUngroupSelection() && this.canUngroupSelectedNodes(),
																	do: (o)=> this.doUngroupSelectedNodes() },
					{ separator: '-',         if: (o)=> this._canOpenFile() || this._canOpenSubGraph() },
					{ label: 'Open File',   if: (o)=> this._canOpenFile(),
																	do: (o)=> { const data = this.getFirstSelectedNodeData();
																							if( data ) {
																								const mousePos = this.diagram.lastInput.viewPoint;
																								this.em.call.onLoadFile( data, mousePos.x, mousePos.y );
																							} }},
					{ label: 'Open Sub-Graph',	if: (o)=> this._canOpenSubGraph(),
																			do: (o)=> { const data = this.getFirstSelectedNodeData();
																									if( data ) {
																										this.em.call.onLoadGraph( data );
																									} }},
					{ separator: '-',         if: (o)=> o.d.cmd.canUndo() || o.d.cmd.canRedo() },
					{ label: 'Undo',        if: (o)=> o.d.cmd.canUndo(),
																	do: (o)=> o.d.cmd.undo() },
					{ label: 'Redo',        if: (o)=> o.d.cmd.canRedo(),
																	do: (o)=> o.d.cmd.redo() },
				]},
		});
		this.shortcutList = [
			// Zoom to Node (NOTE: with control its not yet working)
			{ key: '2', control:true, do: this.doZoomToFitSlectedNode.bind(this,2) },
			{ key: '3', control:true, do: this.doZoomToFitSlectedNode.bind(this,3) },
			{ key: '4', control:true, do: this.doZoomToFitSlectedNode.bind(this,4) },
			{ key: '5', control:true, do: this.doZoomToFitSlectedNode.bind(this,5) },
			// Zoom to Fit
			{ key: '1', do: this.doZoomToFit.bind(this) },
			// Zoom to Factor
			{ key: '2', do: this.doZoomToFactor.bind(this,2) },
			{ key: '3', do: this.doZoomToFactor.bind(this,3) },
			{ key: '4', do: this.doZoomToFactor.bind(this,4) },
			{ key: '5', do: this.doZoomToFactor.bind(this,4) },
			// Center Graph
			{ key: 'C', do: this.setViewCenteredOnSelectedNode.bind(this) },
		];

		this.diagram.contextMenu = this.contextMenu.getMenu( 'diagramContextMenu' );
		this.nodeContextMenu = this.contextMenu.getMenu( 'nodeContextMenu' );

		// Initialize instance variables
		this.clearInstance();

		this.isDeleteEnabled = false;
		this.isDoubleClickCreateNodeEnabled = true;
		this.isRootGraph = true;
		this.isHistoryEmpty = true;
		this.viewBookmark = new Array( 2 );
		this.systemNodeDataFieldList = [
			'text',
			'location',
			'size',
			'key',
			'group',
		];
		this.systemLinkDataFieldList = [
			'from',
			'to',
			'points',
		];
		this.dslNodeFieldNameList = new Set( ['key'] );
	}
	registerEvent( name, callback ) {
		this.em.register( name, callback );
	}
	registerEventList( callbackList ) {
		this.em.registerList( callbackList );
	}
	setDSL( dsl ) {
		this._setNodeDSL( dsl );
		this._setLinkDSL( dsl );
		this._setGroupDSL( dsl );
	}
	addDSL( dslDest, dslSrc ) {
		if( dslSrc.templateNodeList && dslSrc.dataNodeList ) {
			if( !dslDest.templateNodeList ) {
				dslDest.templateNodeList = [];
			}
			if( !dslDest.dataNodeList ) {
				dslDest.dataNodeList = [];
			}
			dslDest.templateNodeList = dslDest.templateNodeList.concat( dslSrc.templateNodeList );
			dslDest.dataNodeList = dslDest.dataNodeList.concat( dslSrc.dataNodeList );
		}
		if( dslSrc.templateLinkList && dslSrc.dataLinkList ) {
			if( !dslDest.templateLinkList ) {
				dslDest.templateLinkList = [];
			}
			if( !dslDest.dataLinkList ) {
				dslDest.dataLinkList = [];
			}
			dslDest.templateLinkList = dslDest.templateLinkList.concat( dslSrc.templateLinkList );
			dslDest.dataLinkList = dslDest.dataLinkList.concat( dslSrc.dataLinkList );
		}
		if( dslSrc.templateGroupList && dslSrc.dataGroupList ) {
			if( !dslDest.templateGroupList ) {
				dslDest.templateGroupList = [];
			}
			if( !dslDest.dataGroupList ) {
				dslDest.dataGroupList = [];
			}
			dslDest.templateGroupList = dslDest.templateGroupList.concat( dslSrc.templateGroupList );
			dslDest.dataGroupList = dslDest.dataGroupList.concat( dslSrc.dataGroupList );
		}
	}
	setDSLNameList( dslNameList ) {
		this.dslNameList = dslNameList;
	}
	getDSLNameList() {
		return( this.dslNameList );
	}
	getDSLFieldNameList() {
		return( Array.from( this.dslNodeFieldNameList ) );
	}
	isDataValidField( fieldName ) {
		return( this.dslNodeFieldNameList.has( fieldName ) );
	}
	loadDSLList( dslNameList, onLoaded ) {
		let allDSL = null;
		this.dslNodeFieldNameList = new Set();
		const onAllDSLLoaded = ()=> {
			let dsl = null;
			for( const dslName of dslNameList ) {
				if( window[dslName+'_getDSL'] ) {
					// Call the DSLName_getDSL() function to get the dsl data
					dsl = window[dslName+'_getDSL']( this );
					this._storeDSLNodeFieldNameList( dsl );
					if( allDSL ) { // If we already loaded one dsl, then we add
						this.addDSL( allDSL, dsl );
					} else { // If we are loading the first dsl, we set it
						allDSL = dsl;
					}
				}
			}
			if( allDSL ) {
				this.setDSL( allDSL );
				for( const dslName of dslNameList ) {
					if( window[dslName+'_setupDSL'] ) {
						// Call the DSLName_setupDSL() function to configure nodes/links/groups
						window[dslName+'_setupDSL']( this );
					}
				}
			}
			if( onLoaded ) {
				onLoaded();
			}
		};
		loadDSLScriptList( dslNameList, onAllDSLLoaded );
		this.setDSLNameList( dslNameList );
	}
	getPaletteInfo() {
		let result = null;
		const htmlObj = document.querySelector( `#${this.fullPaletteId}` );
		let isVisible = ( htmlObj.style.visibility == 'visible' );
		const position = [ parseInt( htmlObj.style.left ),
												parseInt( htmlObj.style.top ),
												parseInt( htmlObj.style.width ),
												parseInt( htmlObj.style.height ) ];
		result = {
			key: 'DSL Palette',
			isFile: true,
			fileType: 'input/fields',
			fileURL: '#systemPalette#',
			editorPosition: position,
			isVisible: isVisible,
		};
		return( result );
	}
	restorePalette( nodeData ) {
		const htmlObj = document.querySelector( `#${this.fullPaletteId}` );
		if( nodeData.editorPosition ) {
			const position = nodeData.editorPosition;
			// Position palette
			const browserWidth = window.innerWidth;
			const browserHeight = window.innerHeight;
			if( position && position[0] ) { 
				htmlObj.style.left = Math.min( browserWidth-100, Math.max( 0, position[0] ) )+'px';
			}
			if( position && position[1] ) {
				htmlObj.style.top = Math.min( browserHeight-100, Math.max( 0, position[1] ) )+'px';
			}
			if( position && position[2] ) { htmlObj.style.width = position[2]+'px'; }
			if( position && position[3] ) { htmlObj.style.height = position[3]+'px'; }
		}
		if( nodeData.isVisible ) {
			htmlObj.style.visibility = ( nodeData.isVisible? 'visible': 'hidden' );
		}
	}
	clearNodePalette() {
		if( this.nodePalette ) {
			this.nodePalette.model = this.newEmptyModel();
		}
	}
	clearLinkPalette() {
		if( this.linkPalette ) {
			this.linkPalette.model = this.newEmptyModel();
		}
	}
	setGraphPath( path ) {
		this.graphPath = path;
	}
	getGraphPath() {
		return( this.graphPath );
	}
	setAllowDeleteKey( isDeleteEnabled ) {
		this.isDeleteEnabled = isDeleteEnabled;
		// NOTE: this is a quick fix because the evet handler 'doKeyDown'
		//       for keys have a 'this' which is not the this of Graph. 
		// newDiagram( divId ) {
		//   ...
		//   diagram.commandHandler.doKeyDown = function() {}
		// }
		//
		this.diagram.isDeleteEnabled = isDeleteEnabled;
		// End FIX
	}
	setAllowDoubleCliceCreateNode( status ) {
		status = ( status == undefined? true: status );
		this.isDoubleClickCreateNodeEnabled = status;

		// update diagram event
		if( !this.isDoubleClickCreateNodeEnabled ) {
			this.diagram.toolManager.clickCreatingTool = null
		}
	}
	getGraphImage() {
		let image = null;
		if( this.diagram ) {
			image = this.diagram.makeImageData({ 
				returnType: 'string',
				size: new go.Size( 800, 532 ),
				padding: new go.Margin( 50, 10, 10, 10 ),
			});
		}
		return( image );
	}
	getRootNodes() {
		return( this.diagram.nodes );
	}
	setModel( model ) {
		if( this.diagram ) {
			this.clearInstance();
			this.diagram.model = model;
			this.diagram.model.copiesKey = false;
			this.diagram.model.makeUniqueKeyFunction = this.newUniqueKey.bind(this);
			this.diagram.model.undoManager.isEnabled = true;
			this.diagram.model.addChangedListener( this._onGraphChangedFilter.bind(this) );
			// These two lines make sure that nodes are copied in copy/paste as deep copy
			this.diagram.model.copiesArrays = true;
			this.diagram.model.copiesArrayObjects = true;
			this.diagram.model.linkKeyProperty = 'key';
			// necessary to remember portIds 
			this.diagram.model.linkFromPortIdProperty = 'fromPort';
			this.diagram.model.linkToPortIdProperty = 'toPort';
			// Reset last key used by function newUniqueKey()
			this.lastNodeKey = null;

			// Make graph fully visible
			this.diagram.zoomToFit();
		}
	}
	setJSONModel( jsonModel ) {
		const scale = this.diagram.scale;
		const x = this.diagram.position.x;
		const y = this.diagram.position.y;
		if( this.diagram ) {
			let model = null;
			if( jsonModel ) {
				model = go.Model.fromJson( jsonModel );
			} else {
				model = this.newEmptyModel();
			}
			this.setModel( model );
			this.diagram.scale = scale;
			this.diagram.initialPosition = new go.Point( x, y );
			//this.diagram.position = new go.Point( x, y );
		}
	}
	getJSONModel() {
		let jsonModel = '';
		if( ( this.diagram ) &&  ( this.diagram.model.nodeDataArray.length > 0 ) ) {
			jsonModel = this.diagram.model.toJson();
		}
		return( jsonModel );
	}
	getEditorSource() {
		const diagramPosition = this.diagram.position;
		const jsonModel = this.getJSONModel();
		if( this.dslNameList.length == 0 ) {
			this.dslNameList = config.graph.defaultDSL;	
		}
		const sourceInfo = {
			// TODO: load all DSL used in this graph
			dslNameList: this.dslNameList,
			view: {
				scale: this.diagram.scale,
				position: [diagramPosition.x, diagramPosition.y],
				isGridOn: this.diagram.grid.visible,
			},
			model: jsonModel,
		};
		const source = JSON.stringify( sourceInfo );
		return( source );
	}
	setEditorSource( source, onDone ) {
		// Get an object from the extended model
		let objModel = null;
		if( source ) {
			objModel = JSON.parse( source );
		} else {
			objModel = {
				view: null,
				dslNameList: null,
				model: null,
			};
		}
		// This is the finalization of the graph loading
		const finalizeLoading = ()=> {
			// Set Model (null is also ok)
			this.setJSONModel( objModel.model );
			// Set last viewing settings
			if( objModel.view ) {
				if( objModel.view.scale != undefined ) {
					this.diagram.scale = objModel.view.scale;
				}
				if( objModel.view.position != undefined ) {
					const p = objModel.view.position;
					const x = ( p[0] != undefined? p[0]: 0 );
					const y = ( p[1] != undefined? p[1]: 0 );
					this.diagram.initialPosition = new go.Point( x, y );
				}
				if( objModel.view.isGridOn != undefined ) {
					this.diagram.grid.visible = objModel.view.isGridOn;
				}
			}
			// Set graphData (defined in ServerManager.js)
			graphData = {};

			if( onDone ) {
				onDone();
			}
		};
		// Here, if there are DSL to load
		// - then we load all DSL and only after we load the model/window (by finalizeLoading)
		// - otherwise we just load model/window (by finalizeLoading)
		// Set DSL
		if( objModel.dslNameList ) {
			this.loadDSLList( objModel.dslNameList, finalizeLoading );
		} else {
			finalizeLoading();
		}
	}
	setIsRootGraph( isRootGraph ) {
		this.isRootGraph = isRootGraph;
	}
	setIsHistoryEmpty( isHistoryEmpty ) {
		this.isHistoryEmpty = isHistoryEmpty;
	}
	getSelection() {
		let result = null;
		if( this.diagram ) {
			result = this.diagram.selection;
		}
		return( result );
	}
	getSelectionCount() {
		let result = 0;
		const sel = this.getSelection();
		if( sel ) {
			result = sel.count;
		}
		return( result );
	}
	getJSONSelection() {
		const list = this._getFilteredSelection( 4 );
		const jsonSelection = JSON.stringify( list, null, 2 );
		return( jsonSelection );
	}
	setJSONSelection( jsonSelection ) {
		const objSelection = JSON.parse( jsonSelection );
		const originalKeyList = objSelection.originalKey;
		if( originalKeyList ) {
			for( let i = 0; i < originalKeyList.length; ++i ) {
				const oKey = originalKeyList[i];
				const dataNode = objSelection[i];
				const fieldList = Object.keys( dataNode );
				for( const field of fieldList ) {
					if( field != 'key' ) { // Key can not be changed in a selection
						const value = dataNode[field];
						setNodeDataField( oKey, field, value );
					}
				}
			}
		}
	}
	selectNodeByKey( key ) {
		this.diagram.select( this.diagram.findPartForKey( key ) );
	}
	selectAllNodeByKey( keyList ) {
		let nodeList = [];
		for( const key of keyList ) {
			nodeList.push( this.diagram.findPartForKey( key ) );
		}
		this.diagram.selectCollection( nodeList );
	}
	getCurrentView() {
		// Get current position
		const position = this.diagram.position;
		// Get current zoom scale
		const scale = this.diagram.scale;
		// Get grid visibility
		const isGridOn = this.diagram.grid.visible;
		// Define view info
		const viewInfo = {
			position: {
				x: position.x,
				y: position.y,
			},
			scale,
			isGridOn,
		};
		return( viewInfo );
	}
	setCurrentView( viewInfo ) {
		if( viewInfo.scale ) {
			// Restore first scale (must be first)
			this.diagram.scale = viewInfo.scale;
		}
		if( viewInfo.position ) {
			// Restore position
			this.diagram.position = new go.Point( viewInfo.position.x, viewInfo.position.y );
		}
		if( typeof( viewInfo.isGridOn ) == 'boolean' ) {
			// Restore grid
			this.diagram.grid.visible = viewInfo.isGridOn;
		}
	}
	setCurrentViewToBookmark( index ) {
		this.viewBookmark[index] = this.getCurrentView();
	}
	setCurrentViewToPreviousView() {
		if( this.viewBookmark[0] != undefined ) {
			this.setCurrentView( this.viewBookmark[0] );
		}
	}
	setToBookmarkView( index ) {
		if( this.viewBookmark[index] != undefined ) {
			// Store last view in ViewLast
			this.viewBookmark[0] = this.getCurrentView();
			// Go to new view
			this.setCurrentView( this.viewBookmark[index] );
		}
	}
	setViewFromNode( node, deltaX, deltaY ) {
		let result = false;
		if( node ) {
			const x = node.position.x+deltaX;
			const y = node.position.y+deltaY;
			// Define view info to jump to
			const viewInfo = {
				position: { x, y }
			};
			// Jump to slide
			this.setCurrentView( viewInfo );
			result = true;
		}
		return( result );
	}
	setViewCenteredOnSelectedNode() {
		const selection = this.getSelection();
		const node = selection.first();
		const result = ( node != null );
		if( result ) {
			// Get the center coordinates of the node
			const nodeCenterX = node.actualBounds.x;
			const nodeCenterY = node.actualBounds.y;
	
			// Get the size of the diagram's viewport
			const viewportWidth = this.diagram.viewportBounds.width;
			const viewportHeight = this.diagram.viewportBounds.height;
	
			// Calculate the desired viewport position to center the node
			const desiredViewportX = nodeCenterX - viewportWidth / 2;
			const desiredViewportY = nodeCenterY - viewportHeight / 2;
	
			// Set the diagram's viewport to the desired position
			this.diagram.position = new go.Point( desiredViewportX, desiredViewportY );
		}
		return( result );
	}
	doZoomToFitSlectedNode( factor ) {
		this.doZoomToFit();
		const isViewSet = this.setViewCenteredOnSelectedNode();
		if( isViewSet ) {
			this.doZoomToFactor( factor );
		}
	}
	doZoomToFit() {
		// Store last view in ViewLast
		this.viewBookmark[4] = this.getCurrentView();
		// Go to new view 
		this.diagram.zoomToFit();
	}
	doZoomToFactor( factor ) {
		this.diagram.scale = this.diagram.scale*factor;
	}
	doEditCut() {
		const cmd = this.diagram.commandHandler;
		if( cmd.canCutSelection() ) {
			cmd.cutSelection();
		}
	}
	doEditCopy() {
		const cmd = this.diagram.commandHandler;
		if( cmd.canCopySelection() ) {
			cmd.copySelection();
		}
	}
	doEditPaste( location ) {
		const cmd = this.diagram.commandHandler;
		if( cmd.canPasteSelection() ) {
			cmd.pasteSelection( location );
		}
	}
	doEditDuplicate( location ) {
		const cmd = this.diagram.commandHandler;
		if( cmd.canCopySelection() ) {
			cmd.copySelection();
			cmd.pasteSelection( location );
		}
	}
	canEditClone() {
		const selCount = this.getSelectionCount();
		const data = this.getFirstSelectedNodeData();
		return( data && 
						(( data.isFile || data.isDir ) && data.fileURL ) &&
						( selCount == 1 ) );
	}
	doEditClone() {
		const cmd = this.diagram.commandHandler;
		if( cmd.canCopySelection() ) {
			cmd.copySelection();
			cmd.pasteSelection();

			// If a single node is selected => clone it
			const data = this.getFirstSelectedNodeData();
			if( data ) {
				this.em.call.onClone( data );
			}
		}
	}
	doEditDelete() {
		const cmd = this.diagram.commandHandler;
		if( cmd.canDeleteSelection() ) {
			cmd.deleteSelection();
		}
	}
	canUngroupSelectedNodes() {
		let result = false;
		const selection = this.getSelection();
		const selIter = selection.iterator;
		while( selIter.next() ) {
			const node = selIter.value;
			const data = node.data;
			if( data.group !== undefined ) {
				result = true;
				break;
			}
		}
		return( result );
	}
	doUngroupSelectedNodes() {
		const selection = this.getSelection();
		selection.each( (node) => { 
			const data = node.data;
			if( data.group !== undefined ) {
				setNodeDataField( data, 'group', null );
			}
		});
	}
	centerGraphToNodeKey( key ) {
		const node = this.diagram.findNodeForKey( key );
		this.diagram.centerRect( node.actualBounds );
	}
	findAllNodeDataIf( conditionBodyFunc ) {
		// The parameter can be:
		// - a string with boolean expression like:
		//     d.key > 10
		// - a string with an exact match (tested in all fields):
		//     == 'Dialog'
		// - a string used to check if it is included in all fields:
		//     'Dialog'
		// - a pointer to a function that takes a parameter d (nodeData):
		//     ()=> {...}
		let result = [];

		// Define here a node with all possible fields available in the loaded DSL
		const fieldNameList = Array.from( this.dslNodeFieldNameList );
		let templateNode = {};
		const templateNodeStr = 'templateNode = {'+fieldNameList.join( ':"",' )+':""}';
		eval( templateNodeStr );

		// Define here the search condition
		let conditionFn = null;
		let isInternalFunction = false;
		// If conditionBody is:
		//   == "say_sentence" ==> search a perfect match
		//   "say_sentence"    ==> search a partial match
		if( typeof( conditionBodyFunc ) == 'string' ) {
			const conditionBodyTrim = conditionBodyFunc.trim();
			if( ( conditionBodyTrim.startsWith( '==' ) || 
						conditionBodyTrim.startsWith( '\'' ) || 
						conditionBodyTrim.startsWith( '"' ) ) &&
					( conditionBodyTrim.endsWith( '\'' ) ||
					conditionBodyTrim.endsWith( '"' ) ) ) {
				isInternalFunction = true;
				// Get if string is using single or double quote
				const stringLen = conditionBodyTrim.length;
				const stringQuote = conditionBodyTrim[stringLen-1];
				const stringBegin = conditionBodyTrim.indexOf( stringQuote )+1;
				// Get value of the search string, eg: say_sentence
				const searchValue = conditionBodyTrim.substring( stringBegin, stringLen-1 );
				if( conditionBodyTrim.startsWith( '==' ) ) {
					// Search perfect match
					conditionFn = (d)=> {
						const fieldList = Object.keys( d );
						for( const fieldName of fieldList ) {
							const value = d[fieldName];
							if( value && value == searchValue ) {
								return( true );
							}
						}
						return( false );
					};
				} else {
					// Search partial match
					conditionFn = (d)=> {
						const fieldList = Object.keys( d );
						for( const fieldName of fieldList ) {
							const value = d[fieldName]+'';
							if( value && value.includes( searchValue ) ) {
								return( true );
							}
						}
						return( false );
					};
				}
			} else {
				isInternalFunction = false;
				if( conditionBodyFunc.trim() ) {
					// If condition body is not just a string, we assume is in the form:
					// d.key == 1 && d.label == ""
					conditionFn = new Function( 'd', `return( ${conditionBodyFunc} )` );
				}
			}
		} else if( typeof( conditionBodyFunc ) == 'function' ) {
			isInternalFunction = false;
			// In case the parameter is a function => we use it
			conditionFn = conditionBodyFunc;
		}

		// Start loop on the node iterator
		const nodeIterator = this.diagram.nodes;
		nodeIterator.reset();
		if( conditionFn ) { // We execute the search if we have a condition function
			while ( nodeIterator.next() ) {
				//const n = nodeIterator.value;  // We don't use the GoJS node
				const d = nodeIterator.value.data;
				// We need a copy of the data (avoid to change GoHS data)
				let dataClean = {};
				if( isInternalFunction ) {
					// If it is an internal function we don't need to start from templateName
					dataClean = this._getDataCopy( d );
				} else {
					// If external function we should define all possible field so user condition 
					// will work all the time
					dataClean = this._getDataCopy( d, templateNode );
				}
				try {
					if( conditionFn( dataClean )) {
						result.push( dataClean );
					}
				} catch( error ) {
					// error in user function => skip it
				}
			}
		}
		return( result );
	}
	findAllNodeData( field, searchValue, isFirstOnly, isPerfectMatch ) {
		isFirstOnly = ( isFirstOnly == undefined? false: isFirstOnly );
		isPerfectMatch = ( isPerfectMatch == undefined? false: isPerfectMatch );
		let result = [];
		const it = this.diagram.nodes;
		it.reset();
		while ( it.next() ) {
			const n = it.value;
			const d = it.value.data;
			const value = d[field];
			if( value != undefined ) {
				let found = false;
				if( isPerfectMatch ) {
					found = ( value == searchValue );
				} else {
					const valueStr = value+'';
					found = ( valueStr.includes( searchValue ) );
				}
				if( found ) {
					const dataClean = this._getDataCopy( d );
					result.push( dataClean );
					if( isFirstOnly ) {
						break;
					}
				}
			}
		}
		return( result );
	}
	findNodeData( field, searchValue, isPerfectMatch ) {
		let result = null;
		let resultList = this.findAllNodeData( field, searchValue, true, isPerfectMatch );
		if( resultList && resultList[0] ) {
			result = resultList[0];
		} 
		return( result );
	}
	getFirstSelectedNodeData() {
		let result = null;
		if( this.diagram && this.diagram.selection.count ) {
			const node = this.diagram.selection.first();
			if( node ) {
				result = node.data;
			}
		}
		return( result );
	}
	getNodeData( key, isCopy ) {
		let result = null;
		// Get node data for the given key
		const data = this.diagram.model.findNodeDataForKey( key );
		if( data ) {
			if( data.isSystem ) {
				// If is system node => we give a copy of it
				const nodeData = this._getDataCopy( data );
				result = this.updateSystemNode( nodeData );
			} else {
				// If isCopy => return a shallow copy of the data
				if( isCopy ) {
					result = this._getDataCopy( data );
				} else {
					// If not system node => we give a pointer to it
					result = data;
				}
			}
		}
		return( result );
	}
	setNodeDataField( keyOrData, field, value ) {
		let data = keyOrData;
		if( typeof( keyOrData ) != 'object' ) {
			// Get node data for the given key
			data = this.diagram.model.findNodeDataForKey( keyOrData );
		}
		if( data ) {
			if( data.isSystem && ( field == 'fileContent' ) ) {
				switch( data.isSystem ) {
					case '$GraphModel$':
						this.setJSONModel( value );
						this._callOnNodeModelChanged();
						this._callOnNodeGraphSelectionChanged();
						break;
					case '$GraphSelection$':
						this.setJSONSelection( value );
						this._callOnNodeModelChanged();
						this._callOnNodeGraphSelectionChanged();
						break;
				}
			} else {
				if( data.isSystem && data.fileContent ) {
					delete data.fileContent;
				}
				this.diagram.startTransaction( 'Set Data Propery' );
				this.diagram.model.setDataProperty( data, field, value );
				this.diagram.commitTransaction( 'Set Data Propery' );
			}
			this.em.call.onGraphChanged();
		}
	}
	getLinkData( key, isCopy ) {
		let result = null;
		// Get link data for the given key
		const data = this.diagram.model.findLinkDataForKey( key );
		if( data ) {
			// If isCopy => return a shallow copy of the data
			if( isCopy ) {
				result = this._getDataCopy( data );
			} else {
				// If not system node => we give a pointer to it
				result = data;
			}
		}
		return( result );
	}
	setLinkDataField( key, field, value ) {
		// Get link data for the given key
		const data = this.diagram.model.findLinkDataForKey( key );
		if( data ) {
			this.diagram.startTransaction( 'Set Data Propery' );
			this.diagram.model.setDataProperty( data, field, value );
			this.diagram.commitTransaction( 'Set Data Propery' );
			this.em.call.onGraphChanged();
		}
	}
	moveSelectionRel( dx, dy ) {
		// TODO: this function do not work the second time it is called
		if( this.diagram.selection ) {
			this.diagram.startTransaction( 'Move Selection Relative' );
			for( const node of this.diagram.selection.toArray() ) {
				const p = node.position;
				node.moveTo( p.x+dx, p.y+dy );
			}
			this.diagram.commitTransaction( 'Move Selection Relative' );
		}
	}
	updateSystemNode( data ) {
		// NOTE: system node can not have a fileURL field
		if( data.isSystem ) {
			if( data.fileURL ) {
				delete data.fileURL;
			}
		}
		switch( data.isSystem ) {
			case '$GraphModel$':
				const strModel = this.getJSONModel();
				const objModel = JSON.parse( strModel );
				data.fileContent = JSON.stringify( objModel, null, 2 );
				data.onNodeChanged = (f)=> { 
					this.onNodeGraphModelChanged = { nodeData: data, callback: f };
				};
				break;
			case '$GraphSelection$':
				data.fileContent = this.getJSONSelection();
				data.onNodeChanged = (f)=> { 
					this.onNodeGraphSelectionChanged = { nodeData: data, callback: f };
				};
				break;
		}
		return( data );
	}
	filterObjectData( d, level ) {
		level = ( level != undefined? level: 2 );
		let result = {};

		const getObjectClassName = ( obj )=> {
			return( obj? obj.constructor.name: '' );
		}

		// We consider only objects with class name with more 
		// than 2 character name. GoJS define all classes with 
		// 1 or 2 char due to encryption
		if( getObjectClassName( d ).length > 2 ) {
			for( const field in d ) {
				if( !field.startsWith( '_' ) ) {
					const value = d[field];
					if( Array.isArray( value ) ) {
						result[field] = this.filterArrayData( value, level-1 );
					} else if( typeof( value ) == 'object' ) {
						result[field] = this.filterObjectData( value, level-1 );
					} else {
						result[field] = value;
					}
				}
			}
		}
		return( result );
	}
	filterArrayData( a, level ) {
		level = ( level != undefined? level: 2 );
		let result = [];
		if( level > 0 ) {
			for( const d of a ) {
				if( Array.isArray( d ) ) {
					result.push( this.filterArrayData( d, level-1 ) );
				} else if( typeof( d ) == 'object' ) {
					result.push( this.filterObjectData( d, level-1 ) );
				} else {
					result.push( d );
				}
			}
		}
		return( result );
	}
	doSetReadOnly( status ) {
		this.isReadOnly = status;
		this.em.call.onSetReadOnly( false );
	}
	//------------------------------------------
	// Private Functions
	//------------------------------------------
	_setNodeDSL( dsl ) {
		if( dsl.templateNodeList && dsl.dataNodeList ) {
			// Node TemplateMap
			let dNodeMap = new go.Map();
			let pNodeMap = new go.Map();
			for( const item of dsl.templateNodeList ) {
				const category = item.category;
				const param = ( item.param? item.param: undefined );
	
				const nInstance = item.template( param );
				nInstance.contextMenu = this.nodeContextMenu;
				nInstance.toolTip = this.newNodeToolTip();
				nInstance.locationSpot = go.Spot.Left;
				dNodeMap.add( category, nInstance );
				const pInstance = item.template( param );
				pInstance.locationSpot = go.Spot.Center;
				pNodeMap.add( category, pInstance );
			}
			if( this.diagram ) {
				this.diagram.nodeTemplateMap = dNodeMap;
			}
			if( this.nodePalette ) {
				this.nodePalette.nodeTemplateMap = pNodeMap;
				this._setPaletteDataNodeList( dsl.dataNodeList );
				this.nodePalette.scale = 0.7;
			}
		}
	}
	_setLinkDSL( dsl ) {
		if( dsl.templateLinkList && dsl.dataLinkList ) {
			// Link TemplateMap
			let dLinkMap = new go.Map();
			let pLinkMap = new go.Map();
			for( const item of dsl.templateLinkList ) {
				const category = item.category;
				const param = ( item.param? item.param: undefined );
	
				const lInstance = item.template( param );
				lInstance.contextMenu = this.nodeContextMenu;
				lInstance.toolTip = this.newLinkToolTip();
				lInstance.adjusting = go.Link.End;
				dLinkMap.add( category, lInstance );
				const plInstance = item.template( param );
				plInstance.selectable = false;
				pLinkMap.add( category, plInstance );
			}
			if( this.diagram ) {
				this.diagram.linkTemplateMap = dLinkMap;
			}
			if( this.linkPalette ) {
				this.linkPalette.linkTemplateMap = pLinkMap;
				this._setPaletteDataLinkList( dsl.dataLinkList );
				this.linkPalette.scale = 0.7;
			}
		}
	}
	_setGroupDSL( dsl ) {
		if( dsl.templateGroupList && dsl.dataGroupList ) {
			// Group TemplateMap
			let dGroupMap = new go.Map();
			let pGroupMap = new go.Map();
			for( const item of dsl.templateGroupList ) {
				const category = item.category;
				const param = ( item.param? item.param: undefined );
	
				const gInstance = item.template( param );
				gInstance.contextMenu = this.nodeContextMenu;
				gInstance.toolTip = this.newGroupToolTip();
				gInstance.locationSpot = go.Spot.Left;
				dGroupMap.add( category, gInstance );
				const pInstance = item.template( param );
				pInstance.locationSpot = go.Spot.Center;
				pGroupMap.add( category, pInstance );
			}
			if( this.diagram ) {
				this.diagram.groupTemplateMap = dGroupMap;
			}
			if( this.groupPalette ) {
				this.groupPalette.groupTemplateMap = pGroupMap;
				this._setPaletteDataGroupList( dsl.dataGroupList ); // TODO
				this.groupPalette.scale = 0.7;
			}
		}
	}
	_setPaletteDataNodeList( dataNodeList ) {
		if( this.nodePalette ) {
			for( let i = 0; i < dataNodeList.length; ++i ) {
				dataNodeList[i].key = i+1;
			}
			this.nodePalette.model.nodeDataArray = dataNodeList;
			this.nodePalette.toolManager.dragSelectingTool.isEnabled = false;
			this.nodePalette.maxSelectionCount = 1;
			this.nodePalette.lastSelectedNode = null;

			// Once the graph and palette are shown, we need to scroll a bit
			// the node/link palette to show the first entry well
			this.nodePalette.addDiagramListener( 'LayoutCompleted', (diagramEvent)=> {
				// Scroll a bit up to show first node well
				this.nodePalette.scroll( 'pixel', 'up', 50 );
			});

			if( this.diagram ) {
				const setArchetypeOnSelection = ()=> {
					const node = this.nodePalette.selection.first();
					if( node && this.diagram.toolManager.clickCreatingTool ) {
						this.nodePalette.lastSelectedNode = node;
						const dataNode = node.data;
						this.diagram.toolManager.clickCreatingTool.archetypeNodeData = dataNode;
					} else {
						this.nodePalette.select( this.nodePalette.lastSelectedNode );
					}
				};
				this.nodePalette.addDiagramListener( 'ChangedSelection', setArchetypeOnSelection );
			}

			// Select by default the first node
			const defaultNode = this.nodePalette.findNodeForKey(1);
			if( defaultNode ) {
				this.nodePalette.select( defaultNode );
			}
		}
	}
	_setPaletteDataLinkList( dataLinkList ) {
		if( this.linkPalette ) {
			const nodeDataArray = [];
			let i = 1;
			for( const dataLink of dataLinkList ) {
				nodeDataArray.push( { key: i, category: 'LinkSource' } );
				// In palette we show either the 'text' property if specified
				// in link.data or category otherwise 
				const linkText = ( dataLink.text? dataLink.text: dataLink.category );
				nodeDataArray.push({ key: i+1, text: linkText, category: 'LinkDestination' });
				dataLink.from = i;
				dataLink.to   = i+1;
				i += 2;
			}
			let pNodeMap = new go.Map();
			pNodeMap.add( 'LinkSource', $(go.Node) );
			pNodeMap.add( 'LinkDestination', $(go.Node, 'Auto',
				{ locationSpot: go.Spot.Left },
				$(go.TextBlock, 
					{ margin: 4 },  // the tooltip shows the result of calling linkInfo(data)
					new go.Binding("text", "text")
				)
			));
			this.linkPalette.model.nodeDataArray = nodeDataArray;
			this.linkPalette.nodeTemplateMap = pNodeMap;
			this.linkPalette.model.linkDataArray = dataLinkList;
			this.linkPalette.toolManager.dragSelectingTool.isEnabled = false;
			this.linkPalette.maxSelectionCount = 1;
			this.linkPalette.lastSelectedLink = null;

			// Once the graph and palette are shown, we need to scroll a bit
			// the node/link palette to show the first entry well
			this.linkPalette.addDiagramListener( 'LayoutCompleted', (diagramEvent)=> {
				// Scroll a bit up to show first link well
				this.linkPalette.scroll( 'pixel', 'up', 50 );
			});

			if( this.diagram ) {
				const setArchetypeOnSelection = ()=> {
					const node = this.linkPalette.selection.first();
					if( node ) {
						this.linkPalette.lastSelectedNode = node;
						const link = node.findLinksInto().first();
						const dataLink = link.data;
						this.diagram.toolManager.linkingTool.archetypeLinkData = dataLink;
					} else {
						this.linkPalette.select( this.linkPalette.lastSelectedNode );
					}
				};
				this.linkPalette.addDiagramListener( 'ChangedSelection', setArchetypeOnSelection );
			}

			// Select by default the second node (linked to)
			const defaultNode = this.linkPalette.findNodeForKey(2);
			if( defaultNode ) {
				this.linkPalette.select( defaultNode );
			}
		}
	}
	_setPaletteDataGroupList( dataGroupList ) {
		if( this.groupPalette ) {
			for( let i = 0; i < dataGroupList.length; ++i ) {
				dataGroupList[i].key = i+1;
			}
			this.groupPalette.model.nodeDataArray = dataGroupList;
			this.groupPalette.toolManager.dragSelectingTool.isEnabled = false;
			this.groupPalette.maxSelectionCount = 1;
			this.groupPalette.lastSelectedNode = null;

			// Once the graph and palette are shown, we need to scroll a bit
			// the node/link palette to show the first entry well
			this.groupPalette.addDiagramListener( 'LayoutCompleted', (diagramEvent)=> {
				// Scroll a bit up to show first node well
				this.groupPalette.scroll( 'pixel', 'up', 50 );
			});

			if( this.diagram ) {
				const setArchetypeOnSelection = ()=> {
					const node = this.groupPalette.selection.first();
					if( node && this.diagram.commandHandler ) {
						this.groupPalette.lastSelectedNode = node;
						const dataNode = node.data;
						this.diagram.commandHandler.archetypeGroupData = dataNode;
					} else {
						this.groupPalette.select( this.groupPalette.lastSelectedNode );
					}
				};
				this.groupPalette.addDiagramListener( 'ChangedSelection', setArchetypeOnSelection );
			}

			// Select by default the first node
			const defaultNode = this.groupPalette.findNodeForKey(1);
			if( defaultNode ) {
				this.groupPalette.select( defaultNode );
			}
		}
	}
	_onGraphChangedFilter( e ) {
		// Ignore unimportant Transaction events
		if ( e.isTransactionFinished ) {
			var txn = e.object;  // a Transaction
			// Call callback only if there is a model change
			if( txn !== null  ) {
				//this.em.call.onGraphChanged();
			}
			//console.log( 'GoJS say graph is changed' );
			this._callOnNodeModelChanged();
			this._callOnNodeGraphSelectionChanged();
			this.em.call.onGraphChanged();
		}
	}
	newEmptyModel() {
		return new go.GraphLinksModel( [], [] );
	}
	newUniqueKey( model, data ) {
		// Generate a new positive key bigger than all keys in the model
		let key = ( this.lastNodeKey? this.lastNodeKey+1: model.nodeDataArray.length );
		while( model.findNodeDataForKey( key ) != null ) {
			++key;
		}
		this.lastNodeKey = key;
		return( key );
	}
	newNodePalette( divId ) {
		const palette = $(go.Palette, divId,
			{ // customize the GridLayout to align the centers of the locationObjects
				layout: $(go.GridLayout, { 
					alignment: go.GridLayout.Location,
					wrappingColumn: 1,
				})
			}
		);
		return( palette );
	}
	newGroupPalette( divId ) {
		const palette = $(go.Palette, divId,
			{ // customize the GridLayout to align the centers of the locationObjects
				layout: $(go.GridLayout, { 
					alignment: go.GridLayout.Location,
					wrappingColumn: 1,
				})
			}
		);
		return( palette );
	}
	newLinkPalette( divId ) {
		const palette = $(go.Palette, divId,
			{ // customize the GridLayout to align the centers of the locationObjects
				layout: $(go.GridLayout, { 
					alignment: go.GridLayout.Location,
					spacing: go.Size.parse( "40 10" ),
					wrappingColumn: 2,
				})
			}
		);
		return( palette );
	}
	newDiagram( divId ) {
		// To be used in "function(){}" definitions
		const graphThis = this;

		let diagram = null;
		if( divId ) {
			diagram = $( go.Diagram, divId ); // Create visual diagram
		} else {
			diagram = $( go.Diagram ); // Create batch diagram
		}

		diagram.clickCreatingTool = new InGroupClickCreatingTool();
		// Avoid that the diagram comes slowly from the bottom in an animation
		diagram.animationManager.isInitial = false;
		// what to do when a drag-drop occurs in the Diagram's background
		diagram.mouseDrop = (e)=> this._onFinishDrop( e, null );
		// Use mouse wheel for zoom
		diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom;
		// Disable port gravity (snap to port)
		diagram.toolManager.linkingTool.portGravity = 0;
		// enable undo & redo
		diagram.undoManager.isEnabled = true;

		// Define grid
		const mainColor = {
			dark: {
				backgroundColor: 'rgb(60, 60, 60)',
				lineColor1: 'rgb(70, 70, 70)',
				lineColor2: 'rgb(80, 80, 80)',
			},
			light: {
				backgroundColor: 'AliceBlue',
				lineColor1: 'rgb(220, 220, 220)',
				lineColor2: 'rgb(200, 200, 200)',
			},
		};
		const schema = config.graph.colorSchema;
		diagram.grid = $(go.Panel, "Grid",
			{
			  name: "GRID",
			  visible: false,
			  gridCellSize: new go.Size(10, 10),
			  gridOrigin: new go.Point(0, 0)
			},
			$(go.Shape, "LineH", { stroke: mainColor[schema].lineColor1, strokeWidth: 0.5, interval: 1 }),
			$(go.Shape, "LineH", { stroke: mainColor[schema].lineColor2, strokeWidth: 0.5, interval: 5 }),
			$(go.Shape, "LineH", { stroke: mainColor[schema].lineColor2, strokeWidth: 1.0, interval: 10 }),
			$(go.Shape, "LineV", { stroke: mainColor[schema].lineColor1, strokeWidth: 0.5, interval: 1 }),
			$(go.Shape, "LineV", { stroke: mainColor[schema].lineColor2, strokeWidth: 0.5, interval: 5 }),
			$(go.Shape, "LineV", { stroke: mainColor[schema].lineColor2, strokeWidth: 1.0, interval: 10 })
		);

		// By default grid is not visible
		diagram.grid.visible = false;
		diagram.div.style.background = mainColor[schema].backgroundColor;

		// Force positioning of nodes according to grid
		diagram.toolManager.draggingTool.gridSnapCellSize = new go.Size( 10, 10 );
		diagram.toolManager.draggingTool.isGridSnapEnabled = true;
		diagram.toolManager.resizingTool.isGridSnapEnabled = true;

		// Set zoom speed
		diagram.commandHandler.zoomFactor = ( config.graph.zoomFactor?  
																					config.graph.zoomFactor: 1.25 );
		// Allow infinite canvas
		diagram.scrollMode = go.Diagram.InfiniteScroll;

		// Pan with right mouse button drag
		diagram.toolManager.panningTool.canStart = function() {
			if (!this.isEnabled) return false;
			if (diagram === null) return false;
			if (!diagram.allowHorizontalScroll && !diagram.allowVerticalScroll) return false;
			// require left button & that it has moved far enough away from the mouse down point, so it isn't a click
			if (!diagram.lastInput.right) return false;
			// don't include the following check when this tool is running modally
			if (diagram.currentTool !== this) {
				// mouse needs to have moved from the mouse-down point
				if (!this.isBeyondDragSize()) return false;
			}
			return true;
		};

		// install custom linking tool, defined in PolylineLinkingTool.js
		let tool = new PolylineLinkingTool();
		//tool.temporaryLink.routing = go.Link.Orthogonal;  // optional, but need to keep link template in sync, below
		diagram.toolManager.linkingTool = tool;
		let reshapeTool = new SnapLinkReshapingTool();
		diagram.toolManager.linkReshapingTool = reshapeTool;

		//////////////////////////////////
		// BEGIN PATCH
		// This code avoids showing a link at 0,0
		// when connecting two nodes with a straight link
		// It would be nice to find a solution instead this patch :-)
		diagram.addDiagramListener( "LinkDrawn", (e)=> {
			let link = e.subject;
			//let linkData = link.data;
			let fromNode = e.subject.fromNode;
			let x = fromNode.position.x;
			let y = fromNode.position.y;
			setTimeout( ()=> { 
				fromNode.moveTo( x, y+0.1 );
				fromNode.moveTo( x, y-0.1 );
			}, 1 );
		});
		// END PATCH
		//////////////////////////////////

		diagram.commandHandler.doKeyDown = function() {
			// Get last input
			const e = diagram.lastInput;
			const key = e.key;
			
			// Avoid to delete nodes/selection by del/backspace key
			if( !diagram.isDeleteEnabled ) {
				// Key code
				const deleteKey = 'Del';
				const backspaceKey = 'Backspace';
				if( ( key === deleteKey ) || ( key === backspaceKey ) ) return;
			}

			// call base method with no arguments (default functionality)
			go.CommandHandler.prototype.doKeyDown.call(this);
		};
		diagram.commandHandler.doKeyUp = function() {
			// Get last input
			const e = diagram.lastInput;
			// The meta (Command) key substitutes for "control" for Mac commands
		  const control = e.control || e.meta;
			const alt = e.alt;
			const shift = e.shift;
			const key = e.key;

			// Evalue keyboard shortcut
			for( const shortcut of graphThis.shortcutList ) {
				if( shortcut.key == key ) { 
					if( ( ( shortcut.control == undefined ) && control ) ||
					    ( ( shortcut.control != undefined ) && !control ) ) {
						continue;
					}
					if( ( ( shortcut.alt == undefined ) && alt ) ||
					    ( ( shortcut.alt != undefined ) && !alt ) ) {
						continue;
					}
					if( ( ( shortcut.shift == undefined ) && shift ) ||
					    ( ( shortcut.shift != undefined ) && !shift ) ) {
						continue;
					}
					shortcut.do();
					break;
				}
			}

			// call base method with no arguments (default functionality)
			go.CommandHandler.prototype.doKeyUp.call(this);
		}

		// Move the pasted selection a bit on the side from copied seleciton
		diagram.addDiagramListener( 'ClipboardPasted', (e)=> {
			e.subject.each( (o)=> { 
				const location = o.location;
				location.x += 10;
				location.y += 10;
				o.location = location;
			});
		});
		
		// Allow to navigate out from a graph and go to parent graph (Alt+click)
		diagram.addDiagramListener( 'BackgroundSingleClicked', ()=> {
			if( diagram.lastInput.alt ) {
				this.em.call.onShowParentGraph();
			}
		});
		// Allow to navigate into a sub graph of a node (Alt+click)
		diagram.addDiagramListener( 'ObjectSingleClicked', ()=> {
			if( diagram.lastInput.alt ) {
				const data = this.getFirstSelectedNodeData();
				if( data && ( data.isDir == true ) ) {
					this.em.call.onLoadGraph( data );
				} else {
					const mousePos = this.diagram.lastInput.viewPoint;
					this.em.call.onLoadFile( data, mousePos.x, mousePos.y );
				}
			}
		});

		diagram.addDiagramListener( 'InitialLayoutCompleted', (diagramEvent)=> {
			this.em.call.onFirstLayoutCompleted();
			if( this.nodePalette ) {
				// Scroll a bit up to show first node well
				this.nodePalette.scroll( 'pixel', 'up', 20 );
			}
			if( this.linkPalette ) {
				// Scroll a bit up to show first link well
				this.linkPalette.scroll( 'pixel', 'up', 20 );
			}
		});

		diagram.addDiagramListener( 'ChangedSelection', ()=> {
			if( this.diagram ) {
				const dataList = this._getFilteredSelection();
				this.em.call.onSelection( dataList );
				this._callOnNodeGraphSelectionChanged();
			}
		});

		return( diagram );
	}
	newNodeToolTip() {
		// this tooltip Adornment is shared by all nodes
		return $("ToolTip",
			$(go.TextBlock, { margin: 4 },  // the tooltip shows the result of calling nodeInfo(data)
				new go.Binding("text", "", ( d )=> {
					// Tooltip info for a node data object
					const label = ( d.label? d.label: (d.text? d.text: '' ) );
					let info = "Node [" + d.key + "]: " + label + "\n";
					if( d.category ) {
						info = info+" Category: " + d.category + "\n";
					}
					if ( d.group )
						info = info+"member of " + d.group;
					else
						info = info+"top-level node";
					if( d.hint ) {
						info = info+"\n"+d.hint;
					}
					return( info );
				})
			)
			);
	}
	newLinkToolTip() {
		// this tooltip Adornment is shared by all links
		return $("ToolTip",
			$(go.TextBlock, { margin: 4 },  // the tooltip shows the result of calling linkInfo(data)
				new go.Binding("text", "", ( d )=> {
					// Tooltip info for a link data object
					const info = "Link:\nfrom " + d.from + " to " + d.to;
					return( info );
				})
			)
		);
	}
	newGroupToolTip() {
		// this tooltip Adornment is shared by all groups
		return $("ToolTip",
			$(go.TextBlock, { margin: 4 },
				// bind to tooltip, not to Group.data, to allow access to Group properties
				new go.Binding("text", "", this.getGroupInfo.bind(this)).ofObject()
			)
		);
	}
	getGroupInfo( adornment ) {
		// takes the tooltip or context menu, not a group node data object
		var g = adornment.adornedPart;  // get the Group that the tooltip adorns
		var mems = g.memberParts.count;
		
		var links = 0;
		g.memberParts.each( (part) => { if ( part instanceof go.Link ) links++; });

		const info = "Group " + g.data.key + ": " + g.data.text + "\n" + mems + " members including " + links + " links";
		return( info );
	}
	getDiagramInfo( model ) {
		// Tooltip info for the diagram's model
		const info = " Model: "+model.nodeDataArray.length + " nodes, "+ 
		                         model.linkDataArray.length + " links \n"+
								 " Graph URL: "+this.graphPath+" ";
		return( info );
	}
	_canOpenFile() {
		let result = false;
		const data = this.getFirstSelectedNodeData();
		if( data ) {
			result = ( data.isFile == true );
		}
		return( result );
	}
	_canOpenSubGraph() {
		let result = false;
		const data = this.getFirstSelectedNodeData();
		if( data ) {
			result = ( data.isDir == true );
		}
		return( result );
	}
	_onFinishDrop( e, grp ) {
		// Upon a drop onto a Group, we try to add the selection as members of the Group.
		// Upon a drop onto the background, or onto a top-level Node, make selection top-level.
		// If this is OK, we're done; otherwise we cancel the operation to rollback everything.
		let ok = false;
		if( !grp ) {
			const location = e.documentPoint;
			const partList = e.diagram.findPartsAt( location );
			if( partList.count > 0 ) {
				partList.each( (part)=> {
					const dataPart = part.data;
					if( dataPart.isGroup ) {
						ok = part.addMembers( e.diagram.selection, true );
					}
				});
			}
		}
	}
	_reSetSelectionFromPalette() {
		const selection = this.getSelection();
		selection.each( (node) => {
			let templateData = null;
			let systemFieldList = null;
			if( node instanceof go.Node ) {
				if( this.nodePalette ) {
					const it = this.nodePalette.selection;
					const node = it.first();
					if( node ) {
						templateData = node.data;
					}
				}
				systemFieldList = this.systemNodeDataFieldList;
			} else if( node instanceof go.Link ) {
				if( this.linkPalette ) {
					const it = this.linkPalette.selection;
					const link = it.first();
					if( link ) {
						templateData = link.data;
					}
				}
				systemFieldList = this.systemLinkDataFieldList;
			}
			if( templateData ) {
				const dataNode = node.data;
				const dataNodeFieldList = Object.keys( dataNode );
				for( const field of dataNodeFieldList ) {
					// If the field does not start with '_' and is not a system field
					if( !field.startsWith('_') &&
					    ( systemFieldList.indexOf( field ) == -1 ) &&
						( field != 'label' ) ) {
						if( templateData[field] ) {
							const value = templateData[field];
							this.diagram.model.setDataProperty( dataNode, field, value );
						}
					}
				}
				this.diagram.requestUpdate();
			}
		});
	}
	_getDataCopy( data, templateData ) {
		// If we get a template node, we set result to a clone of it (avoid reference to template)
		let result = ( templateData? Object.assign( {}, templateData ): {} );
		const fieldList = Object.keys( data );
		for( const field of fieldList ) {
			if( !field.startsWith( '_' ) ) {
				result[field] = data[field];
			}
		}
		return( result );
	}
	_getFilteredSelection() {
		let dataList = {};
		let keyIndex = -1;
		let keyList = [];
		const s = this.diagram.selection;
		if( s.count > 0 ) {
			const it = s.iterator;
			while( it.next() ) {
				// Strip out any GoJS internal data field
				const dataNode = it.value.data;
				const filterDataNode = this.filterObjectData( dataNode );
				const stripData = this._getDataCopy( filterDataNode );
				// Push stripped data object
				dataList[++keyIndex] = stripData;
				keyList.push( dataNode.key );
			}
		}
		if( keyIndex != -1 ) {
			dataList['originalKey'] = keyList;
		}
		return( dataList );
	}
	clearInstance() {
		// Node Events
		this.onNodeGraphModelChanged = null;
		this.onNodeGraphSelectionChanged = null;
	}
	_callOnNodeGraphSelectionChanged() {
		if( this.onNodeGraphSelectionChanged ) {
			const nodeData = this.onNodeGraphSelectionChanged.nodeData;
			this.updateSystemNode( nodeData );
			this.onNodeGraphSelectionChanged.callback( nodeData );
		}
	}
	_callOnNodeModelChanged() {
		if( this.onNodeGraphModelChanged ) {
			const nodeData = this.onNodeGraphModelChanged.nodeData;
			this.updateSystemNode( nodeData );
			this.onNodeGraphModelChanged.callback( nodeData );
		}
	}
	_storeDSLNodeFieldNameList( dsl ) {
		if( dsl.dataNodeList ) {
			for( const dataNode of dsl.dataNodeList ) {
				const fieldNameList = Object.keys( dataNode );
				for( const fieldName of fieldNameList ) {
					this.dslNodeFieldNameList.add( fieldName );
				}
			}
			for( const dataNode of dsl.dataLinkList ) {
				const fieldNameList = Object.keys( dataNode );
				for( const fieldName of fieldNameList ) {
					this.dslNodeFieldNameList.add( fieldName );
				}
			}
		}
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
            // Clear fileURL
            newNodeData.fileURL = '';
            // Set a new fileURL
            this._verifyFileURL( newNodeData );


            // Clone opened windows
            const newURL = newNodeData.fileURL;
            m.e.cloneGraphWindow( oldURL, newURL );

            // Temporarly save the content
            newNodeData.fileContent = source;
            // Save node content to the server
            saveNodeContent( newNodeData );
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
        m.e.openWindow( id, 'DSLViewer', nodeData, [x, y, 160, 350 ] );
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
  _verifyFileURL( nodeData ) {
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
  processNodeWithIncludeScripts( action ) {
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
      const nodeScriptList = document.querySelectorAll( '.NodeData_IncludeScript' );
      for( const nodeScript of nodeScriptList ) {
        nodeScript.remove();
      }
    } else {
      const it = this.editor.diagram.nodes;
      it.reset();
      // Loop over all nodes
      while ( it.next() ) {
        // Get node data
        const nodeData = it.value.data;
        // If we find a isIncludeScript node
        if( ( nodeData.fileType == 'text/javascript' ) &&
            nodeData.isFile && nodeData.isIncludeScript ) {
          switch( action ) {
            case 'load': {
              const script = document.createElement( 'script' );
              script.type = 'text/javascript';
              script.className = 'NodeData_IncludeScript';
              script.addClass
              if( nodeData.fileURL ) {
                script.src = nodeData.fileURL;
              } else if( nodeData.fileContent ) {
                script.innerHTML = nodeData.fileContent;
              }
              document.head.append( script );
            }
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
    const language = this.fileType.substring( 5 ); // get value after 'text/'
    this.editor.setEditorMode( 'ace/mode/'+language );
    const tww = { name: 'toogleWrapMode', 
                  bindKey: { win: 'Alt-Z', mac: 'Option-Z' }, 
                  exec: function(ed) {
                          const wrapMode = ed.getOption( 'wrap' );
                          ed.setOption( 'wrap', ( wrapMode == 'off'? true: false ) );
                        }
                };
    this.editor.aceEditor.commands.addCommand( tww ); 
    if( nodeData.editorTheme ) {
      this.editor.setEditorTheme( nodeData.editorTheme );
    } else {
      const editorDiv = document.getElementById( this.editorDivId );
      editorDiv.style.background = '#1d1f21';
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
    if( nodeData.fileURL ) {
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

    // Make editor with document scrollable and set color
    const editorDiv = document.getElementById( this.editorDivId );
    // Instantiate the editor
    this.editor = ExploreEditor.create( editorDiv, {
      width: 'auto',
      height: 'auto',
      mode: 'inline',
      //lang: ExploreEditor_LANG['en'],
      //plugins: plugins,
      katex: katex,
      toolbarItem: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 
         'superscript', 'fontColor', 'hiliteColor'],
        ['outdent', 'indent', 'align', 'list', 'horizontalRule'],
        ['link', 'table', 'image', 'audio', 'video'],
        //'/', // Line break
        ['lineHeight', 'paragraphStyle', 'textStyle'],
        ['showBlocks', 'codeView'],
        ['math'],
        ['preview', 'print', 'fullScreen'],
        ['save', 'template'],
        ['removeFormat']
      ],
      templates: [
        {
        name: 'Template-1',
        html: '<p>HTML source1</p>'
        },
        {
        name: 'Template-2',
        html: '<p>HTML source2</p>'
        },
      ],
      charCounter: true,
    });

    // To set the document to first line
    //document.querySelector(".meta-explore-editor-editable").scrollTo(0,0)

    // Pause tracking editor changes
    this.setPauseChange( true );

    // Saving events
    this.editor.onChange = ()=> {
      if( !this.isJustStarted ) {
        this.editorHasChanged();
      }
      this.isJustStarted = false;
    };

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
    if( nodeData.fileURL ) {
      m.e.showWindowPin( this.id );
    }
    // Set editor content
    loadNodeContent( nodeData, (source)=> {
      this.editor.setContents( source );
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
        const source = this.editor.getContents();
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
      let html = '<h2 style="color:white">Default Div Content</h2>';
      eval( nodeData.fileContent );
      element.innerHTML = `<div id='${divID}' class='webViewer'>${html}</div>`;
    } else if( nodeData.fileURL ) {
      const element = document.getElementById( this.editorDivId );
      const fileURL = ( nodeData.fileURL? nodeData.fileURL: '' );
      // NOTE:  name="${Date.now()}" is a workaround to avoid caching
      element.innerHTML = `<iframe id='${this.id}_frame' class='webViewer' src="${fileURL}?_=${Date.now()}"></iframe>`;
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
                            <button id='sysMonitorRefresh' type='button' style="width=100%">Update</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button id='browserReload' type='button' style="width=100%">Browser Reload</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button type='button' style="width=100%" onclick='m.e.openSelectionWindow()'>Show Selection Editor</button>
                            <button type='button' style="width=100%" onclick='m.e.openModelWindow()'>Show Model Editor</button>&nbsp;&nbsp;&nbsp;
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( +1 )'>&lt;-Window</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( +0.5 )'>&lt;-|</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( +0.05 )'>&lt;</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( -0.05 )'>&gt;</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( -0.5 )'>!-&gt;</button>
                            <button type='button' style="width=100%" onclick='m.e.moveAllWindowTo( -1 )'>Window-&gt;</button>
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

    this.title = 'Animator Editor';
    this.editorDivId = m.e.newDOMWindow( id, this.title, 
                                         config.htmlDiv.mainDiv,
                                         this.storeWindowPosition.bind(this),
                                         position );

    this.editor = new ACESourceCodeEditor( this.editorDivId );
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
  getEditorInfo( idOrData ) {
    let id = idOrData;
    if( typeof( idOrData ) == 'object' ) {
      id = m.e._getDOMUniqueId( idOrData );
    }
    let result = this.editorList[id];
    if( id == this.id ) {
      result = this;
    }
    return( result );
  }
  getEditorBasicInfo( idOrData ) {
    let id = idOrData;
    if( typeof( idOrData ) == 'object' ) {
      id = m.e._getDOMUniqueId( idOrData );
    }

    // Get title
    const ei = m.e.getEditorInfo( id );
    const title = ei.title;
    // Get fileURL
    const url = ( ei.nodeData.fileURL? ei.nodeData.fileURL: '' );
    // Get position
    const elem = document.getElementById( id );
    const leftPos = parseInt( elem.style.left );
    const browserWidth = window.innerWidth;
    let screenDirection = 'Center';
    let screenIndex = 0;
    let screenFactor = 1;
    if( leftPos < 0 ) {
      screenIndex = Math.ceil( Math.abs( leftPos/browserWidth ) );
      screenDirection = `Left`;
      screenFactor = screenIndex;
    } else if( leftPos > browserWidth ) {
      screenIndex = Math.floor( Math.abs( leftPos/browserWidth ) );
      screenDirection = `Right`;
      screenFactor = -screenIndex;

    }

    // Create result
    const result = {
      id,
      title,
      url,
      screenDirection,
      screenIndex,
      screenFactor,
    };
    return( result );
  }
  getWindowDiv( idOrData ) {
    let id = idOrData;
    if( typeof( idOrData ) == 'object' ) {
      id = m.e._getDOMUniqueId( idOrData );
    }
    return( document.getElementById( id ) );
  }
  getAllWindowDiv() {
    return( document.getElementById( 'mainDiv' ).children );
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

      // Set selection class
      const winDiv = this.getWindowDiv( nodeData );
      if( winDiv ) {
        winDiv.classList.add( nodeData.isSystem.slice( 1, -1 ) );
      }
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

      // Set model class
      const winDiv = this.getWindowDiv( nodeData );
      if( winDiv ) {
        winDiv.classList.add( nodeData.isSystem.slice( 1, -1 ) );
      }
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
      // Check if window is in a virtual screeen
      const bi =this.getEditorBasicInfo( id );
      if( bi.screenIndex != 0 ) {
        // Scroll to the virtual screen
        this.moveAllWindowTo( bi.screenFactor );
      }
      // Put the window on top of all the others
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
      // Put window on top
      this.putWindowOnTop( id );
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
                            <div class='title' ondblclick="selectNodeOfWindow('${id}')">${name}</div>
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

    // WORKAROUND: re-set main diagram z-order to make sure windows are all on top
    document.getElementById( ei.id ).style.zIndex = minZ-1;

    // Re-assign a z order in a fix range
    //console.log( 'winInfoList.len', winInfoList.length );
    for( let i = 0; i < winInfoList.length; ++i ) {
      const winInfo = winInfoList[i];
      winInfo.we.style.zIndex = minZ+i;
      //console.log( i, winInfo.wId, 'z-order', minZ+i, 'class', winInfo.we.className );
      const header = winInfo.we.getElementsByClassName( 'resizerHeader' )[0];
      if( header ) {
        header.style.background = 'DimGray';
      }
    }
    // Set highest z value to id window
    eWindow.style.zIndex = minZ+winInfoList.length+1;
    const header = eWindow.getElementsByClassName( 'resizerHeader' )[0];
    if( header ) {
      header.style.background = 'Indigo';
    }
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
        const winDiv = this.getWindowDiv( nodeData );
        if( winDiv ) {
          winDiv.classList.add( 'pinned' );
        }
      }
      setStatus( (s)=> s.pinnedWindow = pw );
    } else {
      // Unpin if already pinned window
      delete pw[nodeData.fileURL];
      if( !this.isStatusOnUpdate ) {
        setStatus( (s)=> s.pinnedWindow = pw );
      }
      const winDiv = this.getWindowDiv( nodeData );
      if( winDiv ) {
        winDiv.classList.remove( 'pinned' );
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
                // Set class for selection/model
                const winDiv = this.getWindowDiv( nodeData );
                if( winDiv ) {
                  winDiv.classList.add( nodeData.isSystem.slice( 1, -1 ) );
                }
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
  cloneGraphWindow( oldURL, newURL ) {
    this.isStatusOnUpdate = true;
    const owl = getStatus( 'openWindowList' );
    if( owl && owl[oldURL] ) {
      owl[newURL] = {};
      const keyList = Object.keys( owl[oldURL] );
      // Load opened window for this graph
      for( const key of keyList ) {
        // Clone the window key with the list of coordinates
        owl[newURL][key] = [...owl[oldURL][key]];
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
    const windowDivList = this.getAllWindowDiv();
    let scrollStepTime = 5;
    let scrollPosition = 0;
    const scrollInc = horizontalShift/100;
    const currWinPosition = {};
    const doScroll = ()=> {
      // Execute animation
      if( Math.abs( scrollPosition ) < Math.abs( horizontalShift ) ) {
        for( const div of windowDivList ) {
          if( div.classList.contains( 'pinned' ) ||
              div.classList.contains( 'GraphSelection' ) || // Selection
              div.classList.contains( 'GraphModel' ) ||     // Model Editor
              ( div.id == '_systemMonitor__System_Monitor' ) ) {
            continue;
          }
          
          if( scrollPosition == 0 ) {
            currWinPosition[div.id] = parseInt( div.style.left );
          }
          div.style.left = ( parseInt( div.style.left )+scrollInc )+'px';
        }
        scrollPosition += scrollInc;
        setTimeout( doScroll, scrollStepTime );
      } else {
        // At the end, in order to avoid decimal drift we set a final position again
        // In this way we have no cumulative error due to scrollInc decimals cut
        for( const div of windowDivList ) {
          if( div.classList.contains( 'pinned' ) ||
              div.classList.contains( 'GraphSelection' ) || // Selection
              div.classList.contains( 'GraphModel' ) ||     // Model Editor
              ( div.id == '_systemMonitor__System_Monitor' ) ) {
            continue;
          }

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

/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools EditorJS Interface
Date: 10.10.2020
=============================================================================
*/

class BlockCodeEditor {
  constructor( editorDivId ) {
    this.editorDivId = editorDivId;
    // We should not instantiate an editor at start.
    // Editor should be initialized in the setEditorSource
    this.editorDiv = document.getElementById( this.editorDivId );
    this.editorDiv.style.backgroundColor = '#f6f0e4';

    // Change handler
    this.onSourceChangedCallback = null;
  }
  isReadOnly() {
    return( false );
  }
  setReadOnly( status ) {
    // Check how to set read only
  }
  setEditorSource( source ) {
    if( !source ) {
      // Default document content
      source = `{"blocks": [{"type": "paragraph","data": {"text": "Type document content here..."}}]}`;
    }
    try {
      const objSource = JSON.parse( source );
      this.editorDiv.innerHTML = '';
      const editorParam = this._getEditorParams();
      editorParam.data = objSource;
      this.htmlEditor = new EditorJS( editorParam );
    } catch ( error ) {
      // Nothing to do, no source loaded in this case
      console.log( 'Error: could not load EditorJS source' );
    }
  }
  getEditorSource( callback ) {
    if( callback ) {
      //this.htmlEditor.save().then(( objSource )=> console.log( source ) );
      this.htmlEditor.save().then( callback );
    }
    return( null );
  }
  getEditorSourceNumLines() {
    return( 10 ); //this.htmlEditor.session.getLength() );
  }
  getCurrentLine() {
    const currline = ''; //this.htmlEditor.getSelectionRange().start.row
    return( currline );
  }
  getCurrentSelectionLines() {
    //const currSelStartLine = this.htmlEditor.getSelectionRange().start.row;
    //const currSelEndLine = this.htmlEditor.getSelectionRange().end.row;
    //return( { start: currSelStartLine, end: currSelEndLine } );
    return( { start: 0, end: 0 } );
  }
  getCurrentLineText() {
    //const currline = this.htmlEditor.getSelectionRange().start.row;
    let lineText = ''; //this.htmlEditor.session.getLine( currline );
    return( lineText );
  }
  getLineTextAt( lineIndex ) {
    let lineText = ''; //this.htmlEditor.session.getLine( lineIndex );
    return( lineText );
  }
  onSourceChanged( onSourceChangedCallback ) {
    this.onSourceChangedCallback = onSourceChangedCallback;
  }
  onEvent( eventName, callback ) {
    //this.htmlEditor.on( eventName, callback );
  }
  _getEditorParams() {
    return({
      /**
       * Enable/Disable the read only mode
       */
        readOnly: false,
      /**
       * Id of Element that should contain Editor instance
       */
      holder: this.editorDivId,
      /**
       * Tools list
       */
        tools: {
        /**
         * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
         */
        header: {
          class: Header,
          inlineToolbar: ['link'],
          config: {
            placeholder: 'Header'
          },
          shortcut: 'CMD+SHIFT+H'
        },

        /**
         * Or pass class directly without any configuration
         */
        image: {
          class: SimpleImage,
          inlineToolbar: ['link'],
        },

        list: {
          class: List,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L'
        },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },

        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
          shortcut: 'CMD+SHIFT+O'
        },

        warning: Warning,

        marker: {
          class:  Marker,
          shortcut: 'CMD+SHIFT+M'
        },

        code: {
          class:  CodeTool,
          shortcut: 'CMD+SHIFT+C'
        },

        delimiter: Delimiter,

        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C'
        },

        linkTool: LinkTool,

        embed: Embed,

        table: {
          class: Table,
          inlineToolbar: true,
          shortcut: 'CMD+ALT+T'
        },

      },
      data: {  // Source of an empty document
        blocks: [],
      }, 
      onChange: ( api, event )=> {
        if( this.onSourceChangedCallback ) {
          this.onSourceChangedCallback();
        }
        //console.log( 'something changed', event );
      },
    });
  }
}


/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Ace Editor Interface
Date: 10.07.2020
=============================================================================
*/

class ACESourceCodeEditor {
  constructor( editorDivId ) {
    // Create editor instance
    this.aceEditor = ace.edit( editorDivId );
    this.setEditorTheme( 'tomorrow_night' );

    // Set default mode to text
    this.aceEditor.getSession().setMode( 'ace/mode/javascript' );

    // Set soft tab to 2 spaces
    this.aceEditor.getSession().setUseSoftTabs(true);
    this.aceEditor.getSession().setTabSize(2);
  }
  isReadOnly() {
    // 
  }
  setReadOnly( status ) {
    // Check how to set read only
  }
  setEditorTheme( name ) {
    // Set editor theme
    this.aceEditor.setTheme( 'ace/theme/'+name );
  }
  setEditorSource( source ) {
    this.aceEditor.setValue( source, -1 );
  }
  getEditorSource() {
    return( this.aceEditor.getValue() );
  }
  getEditorSourceNumLines() {
    return( this.aceEditor.session.getLength() );
  }
  getCurrentLine() {
    const currline = this.aceEditor.getSelectionRange().start.row
    return( currline );
  }
  getCurrentSelectionLines() {
    const currSelStartLine = this.aceEditor.getSelectionRange().start.row;
    const currSelEndLine = this.aceEditor.getSelectionRange().end.row;
    return( { start: currSelStartLine, end: currSelEndLine } );
  }
  getCurrentLineText() {
    const currline = this.aceEditor.getSelectionRange().start.row;
    let lineText = this.aceEditor.session.getLine( currline );
    return( lineText );
  }
  getLineTextAt( lineIndex ) {
    let lineText = this.aceEditor.session.getLine( lineIndex );
    return( lineText );
  }
  onSourceChanged( onSourceChangedCallback ) {
    this.aceEditor.getSession().on( 'change', onSourceChangedCallback );
  }
  onEvent( eventName, callback ) {
    this.aceEditor.on( eventName, callback );
  }
  setEditorMode( mode ) {
    this.aceEditor.getSession().setMode( mode );
  }
  getEditorMode( codeType )
  {
    const t = ( codeType != undefined? codeType.toLowerCase(): codeType );
    switch( t ) {
      case '':
      case undefined:
      case 'text':
      case 'txt':
        return 'ace/mode/text';
        //  break;
      case 'html':
        return 'ace/mode/html';
      //  break;
      case 'css':
        return 'ace/mode/css';
      //  break;
      case 'scss':
        return 'ace/mode/scss';
      //  break;
      case 'js':
      case 'javascript':
      case 'jscript':
        return 'ace/mode/javascript';
      //  break;
      case 'php':
        return 'ace/mode/php';
      //  break;
      case 'py':
      case 'python':
        return 'ace/mode/python';
      //  break;
      case 'c':
        return 'ace/mode/c_cpp';
      //  break;
      case 'h':
        return 'ace/mode/c_cpp';
      //  break;
      case 'hpp':
      case 'h++':
        return 'ace/mode/c_cpp';
      //  break;
      case 'cpp':
      case 'c++':
        return 'ace/mode/c_cpp';
      //  break;
      case 'java':
        return 'ace/mode/java';
      //  break;
      default:
        return 'ace/mode/'+t ;
    }
  }
}


const m = {
  isJustStarted: true,
  e: null,          // Editor Manager
  fileInfo: {},
  dslNameList: {},  // List of registered dsl name/url
  status: {},       // Current status of the system
};

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
  m.mddStatus.style['border-style'] = ( status? 'dashed': 'solid' );
}
function setSystemError( status ) {
  m.mddStatus.className = 'error';
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
function getMainGraphURL() {
  const g = getMainGraph();
  return( g.graphPath );
}
function getNodeData( key, isCopy ) {
  const g = getMainGraph();
  let result = g.getNodeData( key, isCopy );
  if( result && ( result.linkToKey != undefined ) ) {
    const linkedData = g.getNodeData( result.linkToKey );
    if( linkedData.fileURL != undefined ) {
      // Update both the copy and the node
      result.fileURL = linkedData.fileURL;
      //DONT TO THAT!!!: g.setNodeDataField( key, 'fileURL', result.fileURL );
    }
    if( linkedData.fileContent != undefined ) {
      // Update both the copy and the node
      result.fileContent = linkedData.fileContent;
      //DONT TO THAT!!!: g.setNodeDataField( key, 'fileContent', result.fileContent );
    }
  } else {
    result = g.getNodeData( key, isCopy );
  }
  return( result );
}
function setNodeDataField( key, field, value ) {
  const g = getMainGraph();
  const data = g.getNodeData( key, true );
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
}
function getLinkData( key, isCopy ) {
  const g = getMainGraph();
  const result = g.getLinkData( key, isCopy );
  return( result );
}
function setLinkDataField( key, field, value ) {
  const g = getMainGraph();
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

