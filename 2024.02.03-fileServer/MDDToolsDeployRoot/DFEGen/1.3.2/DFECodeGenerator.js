/**
 * This is an example of Code Generator based on the conventions
 * of the component model and the DataFlow Engine execution model
 *
 * The main function to start code generation is:
 *    generationRoot( gen, callback )
 * Where:
 *   gen: is a data structure with the following information
 *        {
 *          name: 'GenDFE 1.0',      // Code generator name and version
 *          groupKey: null,          // Group node key containing the Model to be generated
 *          me: null,                // ModelExplorer loaded with the model
 *          modelId: 'main',         // Model Id
 *          language: 'javascript',  // Target output language
 *          lang: dfeCGConfig.lan['javascript'] // Language specific generators
 *        };
 *
 *   callback: a function( source, msg ) executed at the end of
 *             the generation process. Source is the generated source
 *             code, while msg is a message starting with Success:/Error:
 */

function generationRoot( gen, onGenerated ) {
  console.log( 'Starting Generation...' );
  
  // If nodes are found ==> start generation
  if( gen.groupKey != null ) {
    // Extend generation info
    gen.lines = [];                      // Number of lines of code generate
    gen.date = new Date().toGMTString(); // Generation date info
    gen.startNodeList = [],              // Start nodes
    gen.computeCount = {};                // Store usage of compute functions
    
    // Start generation
    generateGroup( gen, onGenerated );
  } else {
    if( onGenerated ) {
      onGenerated( '', 'Error: group key not found in gen parameter' );
    }
  }
}
function generateGroup( gen, onGenerated ) {
  // Add File Header with basic functions
  gen.lang.generateHeader( gen );
  
  // Generate Basic Node Functions
  gen.lang.generateLine( gen );
  gen.lang.generateSessionComment( gen, 'Node Functions' );
  gen.lang.generateNodeFunctions( gen );
        
  // Get all nodes in the group
  const dataList = gen.me.getNodeListBy( 'main', 'group', gen.groupKey );
  
  gen.lang.generateLine( gen );
  gen.lang.generateSessionComment( gen, 'Node Functions/Model States' );
  // Generate instance data for all nodes
  for( const data of dataList ) {
    const ni = getNodeInfo( gen, data );
    if( ni ) {
      if( ( data.category == 'DataFlow_Component' ) || 
          ( data.category == 'DataFlow_Message' ) ) {
        const computeId = getComputeId( gen, ni );
        gen.lang.generateNodeState( gen, ni, computeId );
      }
    }
  }
  
  // Add function header
  gen.lang.generateSessionComment( gen, 'Compute Functions' );
  
  // Generate compute function for all nodes
  for( const data of dataList ) {
    if( data.category == 'DataFlow_Start' ) {
      gen.startNodeList.push( data );
    } else if( ( data.category == 'DataFlow_Component' ) || 
               ( data.category == 'DataFlow_Message' ) ) {
      // Get nodeInfo
      const ni = getNodeInfo( gen, data );
      if( ni ) {
        generateNodeCompute( gen, ni );
      }
    } else if( ( data.category == 'Hierarchy_CodeInGraph' ) &&
               ( data.isIncludeScript ) ) {
      // Get nodeInfo
      const ni = getNodeInfo( gen, data );
      if( ni ) {
        generateNodeInclude( gen, ni );
      }
    }
  }
  
  // Generate Start Calls
  if( gen.startNodeList.length ) {
    // Add start header lines
    gen.lang.generateSessionComment( gen, 'System Start' );
    // Generate Start Nodes
    for( const data of gen.startNodeList ) {
      generateStartNode( gen, data );
    }
    gen.lines.push( '' );
  }
  
  if( onGenerated ) {
    // Save source in target component
    const content = gen.lines.join( '\n' );
    // Generate closing event
    onGenerated( content, `Success: ${gen.lines.length} lines` );
  }
}
function generateStartNode( gen, data ) {
  // Get output links
  const linkList = gen.me.getLinkListFanOutByNodeKey( gen.modelId, data.key, 'out' );
  for( const link of linkList ) {
    gen.lang.generateLinkCall( gen, null, '', link );
  }
}
function generateNodeCompute( gen, ni ) {
  // Get compute identifier
  let computeId = getComputeId( gen, ni );
  
  // Generate compute only if necessary
  if( !isComputeIfGenerated( gen, computeId ) ) {
    gen.lang.generateComputeFunction( gen, ni, computeId );
  }
  
  // Add one more usage of compute function
  addComputeId( gen, computeId );
}
function generateNodeInclude( gen, ni ) {
  if( ni.data.fileContent ) {
    gen.lang.generateLineComment( gen, `Node Includes[${ni.data.key}]: ${ni.descr}` );
    const lineList = ni.data.fileContent.split( '\n' );
    // Add lines
    gen.lines = gen.lines.concat( lineList );
  }
}
function getComputeId( gen, ni ) {
  let result = null;
  
  if( ni.data.doCompute ) {
    result = ni.data.doCompute;
  } else if( ni.data.fileTypeName ) {
    result = ni.data.fileTypeName;
    if( ni.data.fileTypeName == 'Component' ) {
      result = `${result}_${ni.key}`;
    }
  } else {
    result = ni.key;
  }
  result = `compute_${result}`;
  
  return( result );
}
function isComputeIfGenerated( gen, computeId ) {
  return( gen.computeCount[computeId] >= 1 );
}
function addComputeId( gen, computeId ) {
  if( !gen.computeCount[computeId] ) {
    gen.computeCount[computeId] = 1;
  } else {
    ++gen.computeCount[computeId];
  }
}
function getNodeInfo( gen, data ) {
  const label = ( data.label? data.label.replaceAll( '\n', '\\n' ): data.key ); 
  const nodeInfo = {
    data,
    src: null,
    key: data.key,
    label: data.label,
    descr: `[${data.category}] ${label}`,
  };
  
  if( data.fileContent ) {
    nodeInfo.src = data.fileContent.split( '\n' );
  } else if( data.category == 'DataFlow_Message' ) {
    //nodeInfo.src = globalThis[data.doCompute].toString().split( '\n' );
    nodeInfo.src = gen.lang.computeList['DataFlow_Message'];
  }
  
  return( nodeInfo.src? nodeInfo: null );  
}

var module;
if( module ) {
  module.exports = generationRoot;
}