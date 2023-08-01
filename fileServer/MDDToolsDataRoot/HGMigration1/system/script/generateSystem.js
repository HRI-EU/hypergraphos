const fs = require( 'fs' );

console.log( 'System Generation started' );

const config = require( '../serverConfig.js' );
const ModelExplorer = require( '../client/ModelExplorer.js' );
const isServer = true;

const startScript = require( './generateSystemLib.js' );

let args = '';

if( process.argv ) { // Case of execution from the shell
  args = process.argv[2];
  const output = startScript( args );
  console.log( output );
} else {
  console.log( 'Error, no parameters found' );
}