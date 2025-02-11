/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
============================================================================
Module: MDDTools Server Process
Date: 10.07.2020
=============================================================================
*/

/*
  Execution of server is done via the previous directory.
  Execute:
    .startServer.sh [userName]
  where:
    userName: optional parameter with your user name
              the same used in the url?userName:'<userName>'
              This value is used to select your sconfig file
*/

const fs = require( 'fs' );

const ls = function( dir ) {
  if( dir ) {
    console.log( 'Current directory content' );
    console.log( '-------------------------' );
    fs.readdirSync( dir ).forEach(file => {
      console.log(file);
    });
    console.log( '-------------------------' );
  }
}
ls();

// if( true ) {
//   ls( '.' );
// }

// Load Server Configuration
// 1) serverConfig.js is loaded
// 2) Then user configuration is loaded in 3 options:
// 3) user config is loaded:
//   3.1) via server/sconfig/<userName>_sconfig.js, otherwise
//   3.2) via server/sconfig/<os.hostName>_sconfig.js, otherwise
//   3.3) via server/sconfig/<os.userName>_sconfig.js, otherwise
//   3.4) a NoName user is loaded
const config = require( '../serverConfig.js' );
const os = require('os');

let userNameArg = '';
const argList = process.argv;
if( argList[2] ) {
  userNameArg = argList[2];
}
// TODO: reimplement this check with a map object instead than
//       in this easy way :-), and consider a default
// Load optional user configuration settings on hostname
let userConfig = `./sconfigs/${userNameArg}_sconfig.js`;
let isConfigFound = fs.existsSync( userConfig );
if( !isConfigFound ) {
  // If userName config is not found, try with hostName
  userNameArg = os.hostname();
  userConfig = `./sconfigs/${userNameArg}_sconfig.js`;

  isConfigFound = fs.existsSync( userConfig );
  if( !isConfigFound ) {
    // If previous config is not found, try with os.userName
    userNameArg = os.userInfo().username;
    // Load optional user configuration settings on username
    userConfig = `./sconfigs/${userNameArg}_sconfig.js`;
  }
}

try {
  console.log( 'INFO: trying to load: ', userConfig );
  const userConfigFunction = require( userConfig );
  if( userConfigFunction ) {
    userConfigFunction( config );
  }
} catch( e ) {
  console.log( 'INFO: no user configuration found' );
}


// Define Server Network Settings
const { exec } = require( 'child_process' );

// Set Server IP
config.server.ip = getServerIp();
config.client.server = { ip: config.server.ip };

// Log Configuratio
let configurationStr = '{}';
try {
  configurationStr = JSON.stringify( config, null, 2 );
} catch( error ) {}
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
      //const output = execSync( scriptFilePathName, { encoding: 'utf-8' } );
      //response.writeHead( 200, {'Content-Type': 'text/text' } );
      //response.end( output );
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
    //path = this.realPath+path;
    console.log( 'Received path-------------:'+path );
    console.log( '**********config path:'+ config.server.scriptPath );
    
    var paramsShell = '';
    var params = '';
    const paramIdx = path.indexOf( '?' );
    if( paramIdx != -1 ) {
      const paramStr = decodeURI( path.substring( paramIdx+1 ) );
      path = path.substring( 0, paramIdx );

      if( paramStr ) { // If we have params after ?
        // Translate parama in a JSON string
        const paramList = paramStr.split( '&' );
        const paramLen = paramList.length;
        paramsShell = '';
        params = '';
        let isKeyValue = true;
        // TODO: review this code so to make sure that all params are
        // either key,value or just key,key...
        for( let i = 0; i < paramLen; ++i ) {
          const param = paramList[i];
          const idx = param.indexOf( '=' );
          if( idx > 0 ) {
            const name = param.substring( 0, idx );
            const value = param.substring( idx+1 );
            paramsShell = `${paramsShell}\\"${name}\\":\\"${value}\\"${ i != paramLen-1? ',': '' }`;
            params = `${params}"${name}":"${value}"${ i != paramLen-1? ',': '' }`;
          } else {
            isKeyValue = false;
            params = `${params} ${param}`;
            paramsShell = params;
          }
        }
        if( isKeyValue ) {
          paramsShell = `{${paramsShell}}`;
          params = `{${params}}`;
        }
      }
    }

    const pathInfo = getPathInfo( path );
    console.log( JSON.stringify( pathInfo ));
	  //console.log( '---- path:'+path );

    // Execute script
    if( pathInfo.extension == 'js' ) {  // As javascript function in the server
      console.log( 'Loading script: ' + this.realPath+path );
      // const source = fs.readFileSync( this.realPath+path );
      // const script = source.toString();
      // eval( script );
      const startScript = require( this.realPath+path );
      let output = '';
      let outCode = 200;
      try {
        output = startScript( params );
      } catch (e) {
        let outCode = 400;
        output = 'Error, could not start ', this.realPath+path;
        console.log( output );
      }
      response.writeHead( outCode, {'Content-Type': 'text/text' } );
      response.end( output );
    } else {                            // As shell command
      const scriptExt = ( config.server.scriptPlatform == 'win32'? '.bat': '.sh' );
      // Adapt path separators
      if( config.server.scriptPlatform == 'win32' ) {
        path = path.replaceAll( '/', '\\' );
      }
      const scriptCmd = path+scriptExt;
  
      // In case the path do not exist -> create it
      const fullScriptFilePath = this.realPath+scriptCmd;
      if( fs.existsSync( fullScriptFilePath ) ) {
        console.log( 'Execute script '+fullScriptFilePath+paramsShell );
        const command = `cd ${this.realPath} && .${scriptCmd} ${paramsShell}`
        console.log( 'Command to run:\n'+command );
        execScript( command );
      } else {
        const output = 'Script not exist '+fullScriptFilePath;
        console.log( output );
        response.writeHead( 200, {'Content-Type': 'text/text' } );
        response.end( output );
      }
    }
  }
}

// Create Client Configuration
const userName = config.client.host.name;
const ccPathFileName = config.server.clientPath+`/configs/${userName}_config.js`;
let source = '/* \n'+
             '  NOTE: this config is auto generated by server process\n'+
             '  DO NOT MODIFY THIS FILE\n'+
             '*/\n'+
             'const config = '+JSON.stringify( config.client, null, 2 )+';';
fs.writeFileSync( ccPathFileName, source, 'utf8' );
// Create Server Configuration
const scPathFileName = `./Running_config.js`;
source = '/* \n'+
         '  NOTE: this config is auto generated by server process\n'+
         '  DO NOT MODIFY THIS FILE\n'+
         '*/\n'+
         'const config = '+JSON.stringify( config, null, 2 )+';\n\n'+
         'module.exports = config;';
fs.writeFileSync( scPathFileName, source, 'utf8' );


// require the http module of node.js
const http = require('http');
const espresso = require( '../client/lib/Espresso/1.0/Espresso.js' );
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
  console.log( ` Access with user: ${url}?name:'${config.client.host.name}'` );
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