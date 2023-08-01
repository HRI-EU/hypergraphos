/*
   WebServer with proxy for remote server
 */

/* 
  This server can be executed in 2 modalities:
  - with: node server2
     In this case start the web server
  - with: node server2 remoteHost:192.168.1.11 remotePort:7575 url:/testFile.txt sourceFile:testScp.js
     In this case send a remote post request for a file and then terminate
 */
const fs = require( 'fs' );
const config = require( '../serverConfig' );
const { exec } = require( 'child_process' );

// Used by sendFileViaPost
const httpForRemote = require( 'http' );

// Helper classes
class POSTLocalServer {
  constructor( realPath ) {
    this.virtualPath = '/fileServer/';
    this.realPath = realPath;
  }
  serve( request, response, body ) {
    const fileInfo = JSON.parse( body );
    if( fileInfo && fileInfo.url ) {
      if( fileInfo.url.startsWith( this.virtualPath ) ) {
        // Get updated url
        const filePathName = this.recomputeURL( fileInfo.url ,this.virtualPath, this.realPath );
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
      console.log( 'Error in saving local request '+request.url );
    }
    response.end( 'post for local request received' );
  }
}
function sendFileViaPost( fileInfo, virtual, realPath ) {
  if( fileInfo && fileInfo.url && fileInfo.remoteHost && fileInfo.remotePort ) {

    const remoteHost = fileInfo.remoteHost;
    const remotePort = fileInfo.remotePort;
    // Get updated url
    const filePathName = recomputeURL( fileInfo.url ,virtual, realPath );
    // Get source
    let source = ( fileInfo.source? fileInfo.source: '' );
    // Save file
    console.log( `Saving remote file [${remoteHost}]: `+filePathName );
    if( config.server.debugOnFileContentOn && filePathName.endsWith( 'json' ) ) {
      const obj = JSON.parse( source );
      source = JSON.stringify( obj, null, 2 );
    }
    const remoteInfo = { url: filePathName, source };
    //console.log( `RemoteInfo [${remoteHost}]`+JSON.stringify( remoteInfo, null, 2 ) );

    // Encode information for POST to remote server
    const data = new TextEncoder().encode( JSON.stringify( remoteInfo ) );
    const options = {
      hostname: remoteHost,
      port: remotePort,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      }
    };
    const remReq = httpForRemote.request( options, (res)=> {
      console.log( 'statusCode '+res.statusCode );
      res.on( 'data', (d)=> {
        process.stdout.write( d );
      });
    });
    remReq.on( 'error', (error)=> {
      console.error( error );
    });
    remReq.write( data );
    remReq.end( 'post for remote request received' );
  } else {
    console.log( 'Error in sending remote request '+fileInfo.url );
  }
}
class POSTRemoteServer {
  constructor( realPath ) {
    this.virtualPath = '/remoteFileServer/';
    this.realPath = realPath;
  }
  serve( request, response, body ) {
    const fileInfo = JSON.parse( body );
    sendFileViaPost( fileInfo, this.virtualPath, this.realPath );
    response.end( 'post for remote request received' );
  }
}

// Set Server IP
config.server.ip = getServerIp();
config.client.server = { ip: config.server.ip };

// If argument to make a send ==> execute send and terminate server
if( process.argv.length > 2 ) {
  //console.log( JSON.stringify( process.argv ) );
  
  // Compose command line parameter like:
  //   remoteHost:"192.168.1.11 remotePort:7575",url:"/testFile.txt",sourceFile:"testScp.js",
  let params = '';
  for( let i = 2; i < process.argv.length; ++i ) {
    const p = process.argv[i].replace( ':', ':"' )+'",';
    params = params+p;
  }
  //console.log( params );
  
  // Evaluate parameter indo an object
  let fileInfo = {};
  eval( `fileInfo ={${params}}` );
  //console.log( JSON.stringify( fileInfo, null, 2 ) );

  // Get file soruce if specified
  fileInfo.source = '';
  if( fileInfo.sourceFile && fs.existsSync( fileInfo.sourceFile ) ) {
    const source = fs.readFileSync( fileInfo.sourceFile, 'utf8' );
    fileInfo.source = source;
  }

  console.log( `Sending to ${fileInfo.remoteHost}: ${fileInfo.sourceFile}` );
  sendFileViaPost( fileInfo );
  return;
}

// Log Configuration
console.log( 'Runnin on configuration:' );
console.log( JSON.stringify( config, null, 2 ) );
console.log( '------------------------\n' );

// Create Client Configuration
const userName = config.client.host.name;
const ccPathFileName = config.server.clientPath+`/${userName}_config.js`;
const source = '/* \n'+
               '  NOTE: this config is auto generated by server process\n'+
               '  DO NOT MODIFY THIS FILE\n'+
               '*/\n'+
               'const config = '+JSON.stringify( config.client, null, 2 )+';';
fs.writeFileSync( ccPathFileName, source, 'utf8' );

// require the http module of node.js
const http = require( 'http' );
const espresso = require( './Espresso' );
const { join } = require('path');
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
// Serve client files
espresso.addGET(  '/',           espresso.static( config.server.clientPath ), onGet );
// Execute server script
//espresso.addGET(  '/executeScript', espresso.static( config.server.clientPath ), onGet );
// Save files to dataRoot
espresso.addPOST( '/fileServer', new POSTLocalServer( config.server.dataRoot ) );
// Save files to a remote server
espresso.addPOST( '/remoteFileServer', new POSTRemoteServer( '/' ) );

// Start the server !
webServer.listen(config.server.webServerPort, function(){
  let url = `${config.server.webServerProtocol}:\\${config.server.webServerName}:${config.server.webServerPort}`;
  console.log( `WebServer running at ${url}!` );
  url = `${config.server.webServerProtocol}:\\${config.server.ip}:${config.server.webServerPort}`;
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
function recomputeURL( url, virtualPath, realPath ) {
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