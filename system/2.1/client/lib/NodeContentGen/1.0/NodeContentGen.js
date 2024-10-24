/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
============================================================================
Module: Node Content Generator
Date: 10.07.2020
=============================================================================
*/

const NCG_supportedCategory = [ 
  'DataFlow_Data',
  'DataFlow_Message',
  'DataFlow_Component',
  'DataFlow_Template',
  'DataFlow_ComponentOpen',
  'Hierarchy_CodeInGraph',
  'Hierarchy_CodeInFile',
];

function NCG_canGenerateNodeContent( data ) {
  let result = false;
  if( data && !data.isDir ) {
    return( NCG_supportedCategory.includes( data.category ) );
  }
  return( result );
}
function NCG_doGenerateNodeContent( data ) {
  // Function name shortcut
  const gsn = NCG__getSafeName;

  if( data && data.isFile && 
      ( NCG_supportedCategory.includes( data.category ) ) ) {
    // Define content
    const content = [];
    switch( data.fileType ) {
      case 'text/javascript':
        // Get input list
        const inputNameList = NCG__pushPortNameList( data, 'in_' );
        const outputNameList = NCG__pushPortNameList( data, 'out_' );
        const propertyNameList = NCG__pushPortNameList( data, 'props_', ['computeBarrier'] );

        let nextLine = '';
        for( let i = 0; i < inputNameList.length; ++i ) {
          const name = inputNameList[i];
          content.push( `${nextLine}if( name == '${name}' ) {` );
          content.push( '' );
          if( i != inputNameList.length ) {
            nextLine = '} else ';
          }
        }
        content.push( `${nextLine}if( name == 'doCompute' ) {` );
        content.push( '' );
        content.push( '}' );
        content.push( '' );
        content.push( '/*' );
        if( outputNameList.length ) {
          content.push( ' --- Remember to fire' );
          outputNameList.forEach( o=> {
            const outValue = ( o.startsWith( 'on' )? '': ', outValue' );
            content.push( `  graphData.dfe.fireOutput( nodeData, '${o}'${outValue} );` ) 
          });
        }
        if( inputNameList.length ) {
          content.push( ' --- You may get inputs' );
          inputNameList.forEach( i=> content.push( `  const ${gsn(i)} = graphData.dfe.getInput( nodeData, '${i}', null );` ) );
        }
        if( propertyNameList.length ) {
          content.push( ' --- You may get properties' );
          propertyNameList.forEach( p=> content.push( `  const ${gsn(p)} = graphData.dfe.getProperty( nodeData, '${p}', null );` ) );
          content.push( ' --- You may set properties' );
          content.push( `  graphData.dfe.setProperty( nodeData, '<Name>', null );` )
        }
        content.push( ' --- You may set/get states' );
        content.push( `  graphData.dfe.set( nodeData, '<Name>', null );` )
        content.push( `  const <Name> = graphData.dfe.get( nodeData, '<Name>', null );` )
        content.push( '*/' );
        break;
    }

    if( content.length ) {
      loadNodeContent( data, ( source )=>{
        if( source ) {
          source = source+'\n'+content.join( '\n' );
        } else {
          source = content.join( '\n' );
        }

        // Set content for save function
        data.fileContent = source;
        saveNodeContent( data );
      });
    }
  }
}
function NCG_doAIGenerator( data, model ) {
  const fileType = data.fileType;
  let [ format, language ] = data.fileType.split( '/' );

  let regex = null;
  switch( data.fileType ) {
    case 'text/c_cpp':
      language = 'c++';
    case 'text/javascript':
    case 'text/c':
    case 'text/css':
      // Find generate prompt comment, in the form:
      //-------------------------------------
      //  /* Generate:
      //  a function that adds two numbers */
      //-------------------------------------
      //regex = /\/\*\s*Generate:\s*([\s\S]+?)\*\//gm; // multiple, 'g' in regexp
      regex = /\/\*\s*Generate:\s*([\s\S]+?)\*\//m;  // single, without 'g'
      break;
    case 'text/html':
    case 'text/xml':
      // Find generate prompt comment, in the form:
      //-------------------------------------
      //  <!-- Generate:
      //  a function that adds two numbers -->
      //-------------------------------------
      //regex = /<!--\s*Generate:\s*([\s\S]+?)-->/gm;  // multiple, 'g' in regexp
      regex = /<!--\s*Generate:\s*([\s\S]+?)-->/m;  // single, without 'g'
      break;
    case 'text/python':
      // Find generate prompt comment, in the form:
      //-------------------------------------
      //  ''' Generate:
      //  a function that adds two numbers '''
      //-------------------------------------
      //regex = /'''\s*Generate:\s([\s\S]+?)'''/gm;  // multiple, 'g' in regexp
      regex = /'''\s*Generate:\s*([\s\S]+?)'''/m;  // single, without 'g'
      break;
    case 'text/x-shellscript':
      // Find generate prompt comment, in the form:
      //-------------------------------------
      //  # Generate:
      //  # a function that adds two numbers
      //
      //
      //  # NOTE: previous 2 empty line are necessary
      //-------------------------------------
      //regex = /#\s*Generate:\s*([\s\S]+?)\n\n/gm;  // multiple, 'g' in regexp
      regex = /#\s*Generate:\s*([\s\S]+?)\n\n/m;  // single, without 'g'
      break;
    case 'text/text':
    case 'application/explore':
      // Find generate prompt comment, in the form:
      //-------------------------------------
      //  (% Generate:
      //   a function that adds two numbers %)
      //-------------------------------------
      //regex = /\(%\s*Generate:\s*([\s\S]+?)%\)/gm;  // multiple, 'g' in regexp
      regex = /\(%\s*Generate:\s*([\s\S]+?)%\)/m;  // single, without 'g'
      break;
  }

  loadNodeContent( data, ( source )=>{
    if( source ) {
      let outSource = null;
      // Regex result
      let m = null;
      //while( ( m = regex.exec( source ) ) !== null ) {  // multiple, 'g' in regexp
      if( ( m = regex.exec( source ) ) !== null ) {  // single, without 'g'
        // This is necessary to avoid infinite loops with zero-width matches
        if( m.index === regex.lastIndex ) {
          regex.lastIndex++;
        }
        
        const startIndex = m.index; // Start index of full comment
        const comment = m[0]; // Full comment
        let prompt = m[1];  // Prompt part of the comment
        if( prompt ) {
            if( ( fileType != 'text/text' ) && 
                ( fileType != 'application/explore' ) ) {
              prompt = `You are a great ${language} source code developer.\n`+
                      `Please generate the code related to the following specification`+
                      `'''\n`+
                      prompt+
                      `'''\n`+
                      `Generate only and only the ${language} code, without any other text`;
            }
          
          //const response = 'function f(a) { return( ++a ) }'; // Example of response
          // Ask chatGPT
          const chatGPT  = new ChatGPT();
          if( model ) {
            chatGPT.setParamList( { model } );
          }
          const history = [{ role: 'user', content: prompt }];
          chatGPT.getResponse( history, (response)=> {

            // Resolve characters for explorer editor
            if( fileType == 'application/explore' ) {
              const escapeHTML = function(text) {
                return text
                  .replace( /&/g, "&amp;" )
                  .replace( /</g, "&lt;" )
                  .replace( />/g, "&gt;" )
                  .replace( /"/g, "&quot;" )
                  .replace( /'/g, "&#39;" );
              };
              response = escapeHTML( response );
            }

            hasGenerated = true;
            const outComment = comment.replace( 'Generate:', 'Generated!' );

            const endIdx = startIndex+comment.length;
            outSource = source.substring( 0, startIndex )+
                        outComment+'\n'+response+
                        source.substring( endIdx );
            
            if( outSource ) {
              // Set content for save function
              data.fileContent = outSource;
              saveNodeContent( data );
            }
          });
        }
      }
    }
  });
}

function NCG__pushPortNameList( data, portName, excludeList ) {
  const result = [];
  if( data[portName] ) {
    data[portName].forEach( p=> {
      if( !excludeList || !excludeList.includes( p.name ) ) {
        result.push( p.name ) 
      }
    });
  }
  return( result );
}
function NCG__getSafeName( name ) {
  const protectNames = [ 'nodeData', 'name', 'value' ];
  return( protectNames.includes( name )? '_': '' )+name;
}