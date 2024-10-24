/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

// Load Template Libraries
const tdir = '../../lib';
const BlockGenerator = require( `${tdir}/BlockGenerator` );

const bg = new BlockGenerator();
let data;

// Example
data = {
  'params': 'a: integer,\n'+
            'b: string \* this is */\n'+
            '          \* a string */\n'+
            'c: float',
  'while': '  while( true )\n'+
           '  {\n'+
           '    console.log( "ciao" );\n'+
           '  }',
};
bg.setTemplate( 'class Example {\n'+
                '  test( [#params#] ) {\n'+
                '    // This function is a test\n'+
                '    if( 1> 3 ) {\n'+
                '      [#while#]\n'+
                '    }\n'+
                '  }\n'+
                '}' );
bg.process( data );
console.log( bg.getOutputStr() );
