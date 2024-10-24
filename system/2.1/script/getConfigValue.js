
/*
=============================================================================
Module: HyperGraphOS Server Process
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