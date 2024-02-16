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

// This code detects the first definition of 'nodeData'
// window.__defineSetter__('nodeData', function() {
//   debugger;
// });

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

// Define list of system scripts to be loaded
const systemIncludeList = [
  'EditorChangeManager.js',
  'EventManager.js',
  'EditorManager.js',
  'EditorBase.js',
  'GraphWrapper.js',
  'GraphEditor.js',
  'lib/ModelExplorer/2.0/ModelExplorer.js',
  'MainScript.js',
  'editors/Editors.js',
];

// List of editors and viewers registered
const editorList = [];

/* TODO: Use this way to get url params */
//const urlParams = new URLSearchParams( window.location.search );
let urlParams = { name: 'DefaultUser' };

// Unique timeId for the session
const sessionTimeId = new Date().getTime();

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
    yesEl.onclick = ()=> { win.close(); if( yesCallback ) yesCallback(); };
  }
  if( noEl ) {
    noEl.onclick = ()=> { win.close(); if( noCallback ) noCallback(); };
  }
}
function winPrompt( msg, value, onClose ) {
  let result = null;
  value = ( value == undefined? '': value );
  const closeCallback = ()=> {
    if( onClose ) {
      onClose( result );
    }
  }

  const win = new WinBox( 'Alert', {
    modal: true,
    autosize: true,
    background: 'Crimson',
    onclose: closeCallback,
    html: `<div style="margine: 0px;">`+
            `<pre>`+
              `&nbsp;${msg}&nbsp;<input type="text" id="winPrompt_input" name="winPrompt_input" value="${value}" size="50">&nbsp;<br><br>`+
            `</pre>`+
            `<pre style="text-align: center;">`+
              `<button id="winConfirm_cancel" type="button">Cancel</button>&nbsp`+
              `<button id="winConfirm_ok" type="button">Ok</button>`+
            `</pre>`+
          `</div>`,
  });

  // Register buttons callback
  const okEl = document.getElementById( 'winConfirm_ok' );
  const cancelEl = document.getElementById( 'winConfirm_cancel' );
  if( okEl ) {
    okEl.onclick = ()=> { 
      const inEl = document.getElementById( 'winPrompt_input' );
      result = ( inEl? inEl.value: '' );
      win.close();
    };
  }
  if( cancelEl ) {
    cancelEl.onclick = ()=> win.close();
  }
}
function MainScript_JSONParse( str, msg ) {
  try {
    return( JSON.parse( str ) );
  } catch( e ) {
    if( config.isDebugOn ) {
      throw( e );
    }
    if( msg ) {
      alert( msg );
    }
    console.log( e );
    return( null );
  }
}
function MainScript_JSONStringify( str, replacer, space, msg ) {
  try {
    return( JSON.stringify( str, replacer, space ) );
  } catch( e ) {
    if( config.isDebugOn ) {
      throw( e );
    }
    if( msg ) {
      alert( msg );
    }
    console.log( e );
    return( null );
  }
}
function MainScript_Eval( str, msg ) {
  try {
    eval( str );
  } catch( e ) {
    if( config.isDebugOn ) {
      throw( e );
    }
    if( msg ) {
      alert( msg );
    }
    console.log( e );
    return( null );
  }
  return( true );
}


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
  MainScript_Eval( `urlParams = {${urlStrParams}}`, 'Error in URL parameters' );
  console.log( urlParams );
  
  if( !urlParams.name ) {
    let cookie = { name: 'UserLocal' };
    docCookie = MainScript_JSONParse( document.cookie );
    if( docCookie ) {
      cookie = docCookie;
    }
    urlParams.name = cookie.name;
  } else {
    try {
      document.cookie = JSON.stringify( { name: urlParams.name } );
    } catch( error ) {}
  }

  // Add user config file
  systemIncludeList.unshift( `configs/${urlParams.name}_config.js` );
  // Load includes
  loadScriptList( systemIncludeList, ()=> {
    loadScriptList( editorList, ()=> {
      console.log( 'Depentency loaded' );
    }, false);
  }, false);
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
function getNewGraphFileServerURL( extension ) {
  const g = getMainGraph();
  const url = g.getNextGraphFileServerURL( extension );
  return( url );
}
function getNewFileServerURL( extension, onDone ) {
  const fileIndexURL = `${config.host.fileServerSystemURL}/fileIndex.json`;
  
  const computeFileIndex = ( source )=> {
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
    let fsInfo = m.fileInfo.fileServer; // Default value
    const obj = MainScript_JSONParse( source );
    if( obj ) {
      fsInfo = obj.fileServer;
    }

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
    const host = ''; // document.location.origin;
    const newFilePath = `${host}${config.host.fileServerURL}${newPath}/${newFile}`;

    // Update fileIndex file
    const outSource = MainScript_JSONStringify( m.fileInfo, null, 0, 'Error in stringify of fileIndex' );
    if( outSource ) {
      _saveFile( fileIndexURL, outSource );
    }

    // Return new file path
    if( onDone ) {
      onDone( newFilePath );
    }
  };

  // Load latest version of fileIndex
  _openFile( fileIndexURL, computeFileIndex );
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
function unloadLocalGraphScript() {
  const scriptList = document.querySelectorAll( '.LocalGraph_IncludeScript' );
  for( const script of scriptList ) {
    script.remove();
  }
}
function loadScriptSource( source, onLoad, isLocalToGraph ) {
  const script = document.createElement( 'script' );
  script.type = 'text/javascript';
  script.onload = ()=> {
    console.log( `Script source loaded` );
    if( onLoad ) {
      onLoad();
    }
  };

  if( isLocalToGraph ) {
    script.className = 'LocalGraph_IncludeScript';
  }
  script.innerHTML = source;
  document.head.append( script );
}
function loadScript( url, onLoad, isAvoidCache ) {
  // NOTE: by default all scripts/css must be loaded
  // with isAvoidCache = false. In this way we make
  // sure we don't load twice the same JavaScript sibmles
  isAvoidCache = ( isAvoidCache == undefined? false: isAvoidCache );

  const baseURL = window.location.href;
  const urlObj = new URL( url, baseURL );
  if( urlObj.pathname.endsWith( '.css' ) ) {
    loadCSSScript( url, onLoad, isAvoidCache );
  } else {
    loadJSScript( url, onLoad, isAvoidCache );
  }
}
function loadJSScript( url, onLoad, isAvoidCache ) {
  isAvoidCache = ( isAvoidCache == undefined? true: isAvoidCache );
  const prevScript = document.getElementById( url );
  
  if( prevScript && !isAvoidCache ) {
    //console.log( '***** ALREADY LOADED', url );
    if( onLoad ) {
      onLoad();
    }
    return; // Avoid loading twice
  }

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
  } else {
    // I need this so that between reload of a page
    // files are loaded and not chached.
    // This is useful in case I have changed a script,
    // and by reloading the browser I want the new version
    // to be loaded
    uniqueURL = '?_='+sessionTimeId;
  }

  // Handle localMode (file:///...)
  url = _updataURLIfLocalMode( url );

  // Set src url
  script.src = url+uniqueURL;

  document.head.append( script );
}
function loadCSSScript( url, onLoad, isAvoidCache ) {
  isAvoidCache = ( isAvoidCache == undefined? true: isAvoidCache );
  const prevScript = document.getElementById( url );
  if( prevScript && !isAvoidCache ) {
    //console.log( '***** ALREADY LOADED', url );
    if( onLoad ) {
      onLoad();
    }
    return; // Avoid loading twice
  }

  if( prevScript ) {
    document.head.removeChild( prevScript );
  }
  const script = document.createElement( 'link' );
  script.id = url;
  script.type = 'text/css';
  script.rel = 'stylesheet';
  script.onload = ()=> {
    console.log( `Script ${url} loaded` );
    if( onLoad ) {
      onLoad();
    }
  };
  script.onerror = ()=> {
    console.log( `Error loading stylesheet ${url}` );
  };
  let uniqueURL = '';
  if( isAvoidCache ) {
    // Avoid server cache with timestamp
    const timestamp = new Date().getTime();
    uniqueURL = '?_='+timestamp;
  } else {
    // I need this so that between reload of a page
    // files are loaded and not chached.
    // This is useful in case I have changed a script,
    // and by reloading the browser I want the new version
    // to be loaded
    uniqueURL = '?_='+sessionTimeId;
  }

  // Handle localMode (file:///...)
  url = _updataURLIfLocalMode( url );

  script.href = url+uniqueURL;
  document.head.append( script )
}
function loadNodeContent( nodeData, onLoaded ) {
  // This is used in local mode (file:///...)
  if( nodeData.fileURL == 'noURL' ) {
    const source = getCurrentLocalGraph();
    onLoaded( source );
    return;
  }

  if( nodeData.isModel ) {  // Check on isModel must be first
    // Load content from main graph model
    const source = nodeData.fileContent;
    if( onLoaded ) {
      onLoaded( source );
    }
  } else if( nodeData.fileURL != undefined ) { // Check on fileURL must be second
    if( nodeData.fileURL.startsWith( 'graph://' ) ) {
      const g = getMainGraph();
      const source = g.openFile( nodeData.fileURL );
      if( onLoaded ) {
        onLoaded( source );
      }
    } else {
      // Load content from file system
      _openFile( nodeData.fileURL, onLoaded );
    }
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
    if( nodeData.fileURL.startsWith( 'graph://' ) ) {
      const g = getMainGraph();
      const sourceEncoding = ( nodeData.fileEncoding? nodeData.fileEncoding: 'utf8' );
      const source = nodeData.fileContent;
      g.saveFile( nodeData.fileURL, source, sourceEncoding );

      // Check if editor open => update editor source
      mainScript_updateEditorSource( nodeData.key, source );

      if( onSaved ) {
        onSaved();
      }
    } else {
      const sourceEncoding = ( nodeData.fileEncoding? nodeData.fileEncoding: 'utf8' );
      const source = nodeData.fileContent;
      _saveFile( nodeData.fileURL, source, onSaved, sourceEncoding );

      if( !nodeData.isDir ) { // Do not consider when saving a workspace 
        // Check if editor open => update editor source
        mainScript_updateEditorSource( nodeData.key, source );
      }
    }
  } else if( nodeData.fileContent != undefined ) { // Check on fileContent must be third
      // TODO: this set may be done twice
      // Eg: a code generator may set this value to the node with setNode...
      // and if an editor is open, it may set itself to unsaved,
      // then the auto save will execute this a second time
      const source = nodeData.fileContent;
      setNodeDataField( nodeData.key, 'fileContent', source );
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
    let fileInfo = {};
    const objFileInfo = JSON.parse( source );
    if( objFileInfo ) {
      fileInfo = objFileInfo;
    } else {
      const label = ( nodeData.label? nodeData.label: nodeData.category )+`[${nodeData.key}]`;
      alert( 'Error loading file info for node: '+label+'\n'+error );
    }
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
function _updataURLIfLocalMode( url ) {
  let result = url;
  if( url.startsWith( '/fileServer/' ) ) {
    if( config.isLocalMode ) {
      // Translate to local server (defined in local config)
      result = url.replace( '/fileServer', config.host.fileServerURL );
    }
  } else if( url.startsWith( '/library/' ) ) {
    if( config.isLocalMode ) {
      // Translate to local server (defined in local config)
      result = url.replace( '/library', config.host.libraryURL );
    }
  }
  return( result );
}
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
    const reply = MainScript_JSONStringify( fileInfo );
    if( reply ) {
      request.send( reply );
    } else {
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