/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

const fs = require( 'fs' );

console.log( 'System Generation started' );

const config = require( '../server/Running_config.js' );
const ModelExplorer = require( '../client/lib/ModelExplorer/2.0/ModelExplorer.js' );
const isServer = true;

const startScript = require( './generateSystemLib.js' );

let args = '';

/*
   Execute this with:
     NOTE: deployKey is the key of the deploying green node!!!!!

     node generateSystem.js "{\"modelFileURL\":\"/fileServer/02/41.json\",\"deployKey\":80}"
*/

if( process.argv ) { // Case of execution from the shell
  args = process.argv[2];
  const output = startScript( args );
  console.log( output );
} else {
  console.log( 'Error, no parameters found' );
}