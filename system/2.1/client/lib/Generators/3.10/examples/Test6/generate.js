/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

// Load Template Libraries
const tdir = '../../lib';
const LineBlockGenerator = require( `${tdir}/LineBlockGenerator` );

const bg = new LineBlockGenerator();
let data;

// Example
data = {
  'Function': '   test( a: integer,\n'+
              '         b: string \* this is */\n'+
              '                   \* a string */\n'+
              '         c: float )\n'+
              '   {\n'+
              '     console.log( "test" );\n'+
              '   }',
  'while': '  while( true )\n'+
           '  {\n'+
           '    console.log( "ciao" );\n'+
           '  }',
};
bg.setTemplate( 'class Example {\n'+
                '  //[# Insert Function #]\n'+
                '  log() {\n'+
                '    //[# Begin Out #]\n'+
                '    // This function is a test\n'+
                '    if( 1> 3 ) {\n'+
                '      //[# Begin while #]\n'+
                '      while( 1 > 3 ) {\n'+
                '        i = 2;\n'+
                '      }\n'+
                '      //[# End while #]\n'+
                '    }\n'+
                '    //[# End Out #]\n'+
                '  }\n'+
                '}' );
bg.process( data );
console.log( '---Result---' );
console.log( bg.getOutputStr() );
const out = bg.extractLineBlock( 'Out', true );
console.log( '---Out------' );
console.log( out.join( '\n' ) );
