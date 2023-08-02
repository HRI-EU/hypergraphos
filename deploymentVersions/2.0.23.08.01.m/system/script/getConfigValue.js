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

const config = require( '../serverConfig.js' );

if( process.argv ) { // Case of execution from the shell
  args = process.argv[2];
  const keyList = args.split( '.' );
  let el = null;
  for( const key of keyList ) {
    if( key == 'config' ) {
      el = config;
    } else {
      if( el ) {
        el = el[key];
      }
    }
  }
  if( el ) {
    console.log( el );
  }
}