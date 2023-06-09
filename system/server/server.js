/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Server Process
Date: 10.07.2020
=============================================================================
*/

const fs = require( 'fs' );

function ls( dir ) {
  console.log( 'Current directory content' );
  console.log( '-------------------------' );
  fs.readdirSync( dir ).forEach(file => {
    console.log(file);
  });
  console.log( '-------------------------' );
}

if( true ) {
  ls( '.' );
}

const config = require( '../serverConfig.js' );
const { exec } = require( 'child_process' );

// Set Server IP
config.server.ip = getServerIp();
config.client.server = { ip: config.server.ip };

// Log Configuration
const configurationStr = JSON.stringify( config, null, 2 );
console.log( 'Runnin on configuration:' );
console.log( configurationStr );
console.log( '------------------------\n' );

class GETStatus {
  serve( request, response ) {
    response.writeHead( 200, {'Content-Type': 'text/html' } );
    response.end( `<html><body>
      <h1>MDDFileServer Running!</h1><br>
      <h2> Configuration</h2>
      <pre>${configurationStr}</pre>
      </body></html>` );
  }
}
class GETFileStatus {
  constructor( realPath ) {
    this.virtualPath = '/fileServer/';
    this.realPath = realPath;
  }
  serve( request, response ) {
    let filePath = recomputeURL( request.url, this.virtualPath, this.realPath );
    // Remove '?...' parameters (e.g. no-cache id)
    const idx = filePath.indexOf( '?' );
    if( idx != -1 ) {
      filePath = filePath.substring( 0, idx );
    }
    filePath = this.realPath+filePath;
    console.log( 'Request of fileInfo for:', filePath );
    fs.stat( filePath, ( err, status )=> {
      response.writeHead( 200, {'Content-Type': 'text/json' } );
      // Return an empty object if file do not exist, stat info otherwise
      const statInfo = {};
      if( !err ) {
        statInfo['mtime'] = status['mtime'];
        statInfo['atime'] = status['atime'];
        statInfo['ctime'] = status['ctime'];
        statInfo['birthtime'] = status['birthtime'];
      }
      const strStatInfo = JSON.stringify( statInfo );
      //console.log( statInfo );
      response.end( strStatInfo );
    });
    /*
     Example:
       url: http://localhost:7575/fileStatus/00/77.json
     Result:
      status {
        dev: 16777234,
        mode: 33188,
        nlink: 1,
        uid: 501,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 15428310,
        size: 46,
        blocks: 8,
        atimeMs: 1647331446275.954,
        mtimeMs: 1636134156213.5515,
        ctimeMs: 1636134156213.5515,
        birthtimeMs: 1636134156213.3267,
        atime: 2022-03-15T08:04:06.276Z,
        mtime: 2021-11-05T17:42:36.214Z,
        ctime: 2021-11-05T17:42:36.214Z,
        birthtime: 2021-11-05T17:42:36.213Z
      }
    */
  }
}
class POSTServer {
  constructor( realPath ) {
    this.virtualPath = '/fileServer/';
    this.virtualPathRel = 'fileServer/';
    this.realPath = realPath;
  }
  serve( request, response, body ) {
    try {
      const fileInfo = JSON.parse( body );
      if( fileInfo && fileInfo.url ) {
        // If relative url => make it absolute
        if( fileInfo.url.startsWith( this.virtualPathRel ) ) {
          fileInfo.url = '/'+fileInfo.url;
        }
        if( fileInfo.url.startsWith( this.virtualPath ) ) {
          // Get updated url
          const filePathName = recomputeURL( fileInfo.url, this.virtualPath, this.realPath );
          const pathInfo = getPathInfo( filePathName );
          // In case the path do not exist -> create it
          if( !fs.existsSync( pathInfo.pathName ) ) {
            fs.mkdirSync( pathInfo.pathName, { recursive: true } );
            //console.log( `mkdirSync( ${pathInfo.pathName} )` );
          }
          // Get source
          let source = ( fileInfo.source? fileInfo.source: '' );
          // Save file
          console.log( "Saving file: "+filePathName );
          if( config.server.debugOnFileContentOn && pathInfo.extension == 'json' ) {
            try {
              const obj = JSON.parse( source );
              source = JSON.stringify( obj, null, 2 );
            } catch( e ) {
              console.warn( 'Error parsing json file content: ' );
              console.log( source );
            }
          }
          if( fileInfo.sourceEncoding == 'base64' ) {
            var sourceBuffer = Buffer.from( source, 'base64' );
            fs.writeFileSync( filePathName, sourceBuffer );
          } else {
            fs.writeFileSync( filePathName, source, 'utf8' );
          }
        }
      } else {
        console.log( 'Error in saving request '+request.url );
      }
    } catch( e ) {
      console.warn( 'Error in receiving/managing POST request body' );
      console.log( body );
    }
    response.end( 'post received' );
  }
}
class ExecuteScript {
  constructor( realPath ) {
    this.virtualPath = '/executeScript/';
    this.virtualPathRel = 'executeScript/';
    this.realPath = realPath;
  }
  serve( request, response ) {
    const execScript = (scriptFilePathName)=> {
      exec( scriptFilePathName, (error, stdout, stderr)=> {
        if( stdout ) {
          response.writeHead( 200, {'Content-Type': 'text/text' } );
          response.end( stdout );	
            } else if( error ) {
              response.writeHead( 400, {'Content-Type': 'text/text' } );
              response.end( 'Error: '+error.message );
            }
      });
    };
    let path = recomputeURL( request.url, this.virtualPath, this.realPath );
    path = this.realPath+path;
    console.log( 'Received path-------------:'+path );
    console.log( '**********config path:'+ config.server.scriptPath );
    var params = '';
    const paramIdx = path.indexOf( '?' );
    if( paramIdx != -1 ) {
      params = path.substring( paramIdx+1 );
      path = path.substring( 0, paramIdx );
    }
    const pathInfo = getPathInfo( path );
    console.log( JSON.stringify( pathInfo ));
	  console.log( '---- path:'+path );
    const scriptExt = ( process.platform == 'win32'? '.bat': '.sh' );
    // In case the path do not exist -> create it
    if( fs.existsSync( path+scriptExt ) ) {
      const scriptFilePathName = path+scriptExt;
      console.log( 'Execute script '+scriptFilePathName );
      execScript( scriptFilePathName );
    } else {
      const output = 'Script not exist '+path+'.sh';
      console.log( output );
      response.writeHead( 200, {'Content-Type': 'text/text' } );
      response.end( output );
    }
  }
}

// Create Client Configuration
const userName = config.client.host.name;
const ccPathFileName = config.server.clientPath+`/configs/${userName}_config.js`;
const source = '/* \n'+
               '  NOTE: this config is auto generated by server process\n'+
               '  DO NOT MODIFY THIS FILE\n'+
               '*/\n'+
               'const config = '+JSON.stringify( config.client, null, 2 )+';';
fs.writeFileSync( ccPathFileName, source, 'utf8' );

// require the http module of node.js
const http = require('http');
const espresso = require( './Espresso' );
//var httpolyglot = require( 'httpolyglot' );

//const ssl = config.server.ssl;
//const sslOptions = {
//    key: fs.readFileSync( ssl.key ),
//    cert: fs.readFileSync( ssl.cert ),
//};

// Create a server
//const webServer = httpolyglot.createServer( sslOptions, app );
var webServer = http.createServer( espresso.getRequestHandler() );

const onGet = function( request, response ) {
  console.log( 'Loading file: '+request.url );
}
// Serve libraries files
espresso.addGET(  '/library',    espresso.static( config.server.libPath ), onGet );
// Load files from dataRoot
espresso.addGET(  '/fileServer', espresso.static( config.server.dataRoot ), onGet );
// Execute server script
espresso.addGET(  '/executeScript', new ExecuteScript( config.server.scriptPath ), onGet );
// Serve client files
espresso.addGET(  '/',           espresso.static( config.server.clientPath ), onGet );
// Status logger
espresso.addGET( '/status', new GETStatus() );
// Status of files (date, size, ...)
espresso.addGET( '/fileStatus', new GETFileStatus( config.server.dataRoot ) );
// Save files to dataRoot
espresso.addPOST( '/fileServer', new POSTServer( config.server.dataRoot ) );
// Serve libraries files
espresso.addGET(  '/test',    espresso.static( config.server.testPath ), onGet );

// Start the server !
webServer.listen(config.server.webServerPort, function(){
  const url = `${config.server.webServerProtocol}:\\${config.server.webServerName}:${config.server.webServerPort}`;
  console.log( `WebServer running at ${url}!` );
  console.log( ` Access with user: ${url}?name:'Antonello'` );
});

function getPathInfo( path ) {
  const pathName = path.substring( 0, path.lastIndexOf( '/' ) );
  const fileNameExt = path.substring( path.lastIndexOf( '/' )+1 );
  let dotIdx = fileNameExt.lastIndexOf( '.' );
  dotIdx = ( dotIdx == -1? fileNameExt.length: dotIdx );
  const fileName = fileNameExt.substring( 0, dotIdx );
  const extension = fileNameExt.substring( dotIdx+1 );
  return( { pathName, fileName, extension } );
}
function getServerIp() {
  var os = require( 'os' );
  var ifaceList = os.networkInterfaces();
  var valueList = Object.keys( ifaceList ).map( function(name) {
    return ifaceList[name];
  });
  valueList = [].concat.apply( [], valueList ).filter( function(v) {
    return( ( v.family == 'IPv4' ) && ( v.internal == false ) );
  });

  return( valueList.length? valueList[0].address : '0.0.0.0' );
}
function recomputeURL( url, virtualPath, realPath ) {
  if( !virtualPath.endsWith( '/' ) ) {
    virtualPath = virtualPath+'/';
  }
  if( !url.startsWith( '/' ) ) {
    url = '/'+url;
  }
  if( url.startsWith( virtualPath ) ) {
    const startIdx = virtualPath.length;
    // Remove '/fileServer/' virtual path
    const urlFilePath = url.substring( startIdx );
    // Create file path name
    const filePathName = realPath+'/'+urlFilePath;
    return( filePathName );
  } else {
    return( url );
  }
}