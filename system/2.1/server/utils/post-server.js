/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: Post Server (Saving File Contents)
Date: 10.07.2020
=============================================================================
*/

const { recomputeURL, getPathInfo } = require( './utils' );

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
          fileInfo.url = '/' + fileInfo.url;
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
          if( config.server.debugOnFileContentOn && ( pathInfo.extension == 'json' ) ) {
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
module.exports = POSTServer;