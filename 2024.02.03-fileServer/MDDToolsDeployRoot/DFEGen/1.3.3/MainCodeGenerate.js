/**
 * MainCodeGenerator.js
 * 
 * Usage for javascript generation (default language):
 * 
 *  node MainCodeGenerate.js "{\"modelFileURL\":\"./41.json\",\"groupKey\":36}"
 * 
 * For other lanugage (e.g. Python)
 *  node MainCodeGenerate.js "{\"modelFileURL\":\"./41.json\",\"groupKey\":36,\"language":"python"}"
 * 
 */

const fs = require( 'fs' );

console.log( 'Code Generation started' );

const ModelExplorer = require( './ModelExplorer.js' );
const dfeCGConfig = require( './DFEConfig.js' );
const generationRoot = require( './DFECodeGenerator.js' );
const isServer = true;

let args = '';
console.log( 'Arguments:' );
console.log( JSON.stringify( process.argv, null, 2 ) );
console.log();

if( process.argv ) { // Case of execution from the shell
  args = process.argv[2];
  const output = initGeneration( args );
  console.log( output );
} else {
  console.log( 'Error, no parameters found' );
}

function initGeneration( args ) {
  params = null;
  try {
    params = JSON.parse( args );
  } catch( e ) {
    console.log( e )
    console.log( 'Error in parameters' );
    return;
  }
  const modelFileURL = params.modelFileURL;
  const groupKey = params.groupKey;
  const language = ( params.language? params.language: 'javascript' );

  startGeneration( modelFileURL, groupKey, language );
}

function startGeneration( fileURL, groupKey, language ) {
  // Generation Instance Data
  const gen = {
    name: 'GenDFE 1.3',      // Code generator name and version
    groupKey,                // Group node key containing the Model to be generated
    me: null,                // ModelExplorer
    modelId: 'main',         // Model Id
    language: language,      // Target output language
    lang: dfeCGConfig.lang[language], // Language specific generators
  };

  // Get graph source
  const graph = getModel( fileURL );
  try {
    // Get model
    const graphObj = JSON.parse( graph );
    const model = graphObj.model;

    // Model ID for the current graph
    gen.modelId = 'main';
    // Create a new Model Explorer
    gen.me = new ModelExplorer();
    // Load current graph model in Model Explorer
    gen.me.setJSONModel( gen.modelId, model );
  } catch( e ) {}

  const onGenerated = function( source, msg ) {
    if( msg.startsWith( 'Success:' ) ) {
      // Save target component source
      let filePathName;
      switch (language) {
        case 'javascript':
          filePathName = './OutCode.js';
          break;
        case 'python':
          filePathName = './OutCode.py';
          break;
        default:
          console.log( 'Warning: target language not specified!' )
          filePathName = './OutCode.txt';
      }
      
      saveFileContent( filePathName, source );
    }
  }

  generationRoot( gen, onGenerated );
}
function getModel( fileURL ) {
  let model = '{}';

  if( isServer ) {
    try {
      model = fs.readFileSync( fileURL, 'utf8' );
    } catch( e ) {}
  } else {
    // Get current graph model
    const g = getMainGraph();
    model = g.getJSONModel();
  }
  return( model );
}
function saveFileContent( filePathName, source ) {
  // Compute encoding...
  const fileInfo = { sourceEncoding: '' };

  if( fileInfo.sourceEncoding == 'base64' ) {
    var sourceBuffer = Buffer.from( source, 'base64' );
    fs.writeFileSync( filePathName, sourceBuffer );
  } else {
    fs.writeFileSync( filePathName, source, 'utf8' );
  }
}