/*
=============================================================================
Licensed Materials - Property of LorinWare Prod.
(C) Copyright Christophe LORIN 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Christophe LORIN.
=============================================================================
Module: MDDTools Simple File Server
Date: 10.07.2020
=============================================================================
*/

const fs = require( 'fs' );
const config = require( './simpleFileServerConfig' );

// Set Server IP
config.server.ip = getServerIp();

// Log Configuration
const configurationStr = JSON.stringify( config, null, 2 );
console.log( 'Runnin on configuration:' );
console.log( configurationStr );
console.log( '------------------------\n' );

class GETStatus {
  serve( request, response ) {
    response.writeHead( 200, {'Content-Type': 'text/html' } );
    response.end( `<html><body>
      <h1>SimpleFileServer Running!</h1><br>
      <h2> Configuration</h2>
      <pre>${configurationStr}</pre>
      </body></html>` );
  }
}
class POSTServer {
  constructor( realPath ) {
    this.virtualPath = '/';
    this.realPath = realPath;
  }
  serve( request, response, body ) {
    const fileInfo = JSON.parse( body );
    if( fileInfo && fileInfo.url ) {
      if( fileInfo.url.startsWith( this.virtualPath ) ) {
        // Get updated url
        const filePathName = this.realPath+'/'+fileInfo.url;
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
          const obj = JSON.parse( source );
          source = JSON.stringify( obj, null, 2 );
        }
        fs.writeFileSync( filePathName, source, 'utf8' );
        //console.log( `writeFileSync( ${filePathName}, source[${source.length}] )` );
      }
    } else {
      console.log( 'Error in saving request '+request.url );
    }
    response.end( 'post received' );
  }
}

// require the http module of node.js
const http = require('http');
const espresso = require( './Espresso' );

// Create a server
var webServer = http.createServer( espresso.getRequestHandler() );

const onGet = function( request, response ) {
  console.log( 'Loading file: '+request.url );
}
// Serve local files
espresso.addGET(  '/',  espresso.static( config.server.dataRoot ), onGet );
espresso.addGET( '/status', new GETStatus() );
// Save files to local
espresso.addPOST( '/', new POSTServer( config.server.dataRoot ) );

// Start the server !
webServer.listen(config.server.webServerPort, function(){
  const url = `${config.server.webServerProtocol}:\\${config.server.webServerName}:${config.server.webServerPort}`;
  console.log( `WebServer running at ${url}!` );
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