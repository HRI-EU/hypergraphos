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
