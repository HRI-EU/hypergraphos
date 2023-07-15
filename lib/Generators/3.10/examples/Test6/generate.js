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
                '    // This function is a test\n'+
                '    if( 1> 3 ) {\n'+
                '      //[# Begin while #]\n'+
                '      while( 1 > 3 ) {\n'+
                '        i = 2;\n'+
                '      }\n'+
                '      //[# End while #]\n'+
                '    }\n'+
                '  }\n'+
                '}' );
bg.process( data );
console.log( bg.getOutputStr() );
