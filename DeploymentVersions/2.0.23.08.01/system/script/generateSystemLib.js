const fs = require( 'fs' );

const ls = function( dir ) {
  if( dir ) {
    console.log( 'Current directory content' );
    console.log( '-------------------------' );
    fs.readdirSync( dir ).forEach(file => {
      console.log(file);
    });
    console.log( '-------------------------' );
  }
}
ls();

console.log( 'System Generation started' );

const config = require( '../serverConfig.js' );
const ModelExplorer = require( '../client/ModelExplorer.js' );
const isServer = true;

// Statistic info
let numFiles = 0;
let numDirs = 0;
let tNumFiles = 0;
let tNumDirs = 0;

function startScript( args ) {
  // Reset stats
  numFiles = 0;
  numDirs = 0;
  tNumFiles = 0;
  tNumDirs = 0;

  params = null;
  try {
    params = JSON.parse( args );
  } catch( e ) {
    console.log( 'Error in parameters' );
    return;
  }
  modelFileURL = params.modelFileURL;
  deployKey = params.deployKey;
  
  console.log( `
    modelFileURL ${modelFileURL}
    deployKey ${deployKey}
    generateSystem( fileURL, deployKey )` );

  let output = 'done';
  try {
    generateSystem( modelFileURL, deployKey );
    output = `${output}\nFilesCount: ${numFiles} of ${tNumFiles}\nDirCount: ${numDirs} of ${tNumDirs}`;
  } catch (error) {
    output = 'error';
  }

  return( output );
}

module.exports = startScript;

function generateSystem( fileURL, deployKey ) {
  // Get graph source
  const graph = getModel( fileURL );
  try {
    // Get model
    const graphObj = JSON.parse( graph );
    const model = graphObj.model;

    // Model ID for the current graph
    const modelId = 'main';
    // Create a new Model Explorer
    const me = new ModelExplorer();
    // Load current graph model in Model Explorer
    me.setJSONModel( modelId, model );
    
    // Get deployment node
    const deployData = me.getNode( modelId, deployKey );
    let isOverwrite = me.getProperty( modelId, deployData, 'isOverwrite', null, true );
    //isOverwrite = ( isOverwrite == 'true' );
    
    // Get output link from name port
    const outDataList = me.getNodeListFanOutByNodeKey( modelId, deployKey );
    
    const targetPath = config.server.deployRoot;
    // Loop over out components
    for( const outData of outDataList ) {
      generateDirectory( modelId, me, outData, targetPath, isOverwrite );
    }
  } catch( e ) {}
}
function generateDirectory( modelId, me, gData, path, isOverwrite ) {
  if( gData.isGroup ) {
    const dirName = gData.label;
    const currPath = path+'/'+dirName;
    console.log( `mkdir -p ${currPath}` );
    ++tNumDirs;
    const isDirExist = fs.existsSync( currPath );
    if( ( !isDirExist || ( isDirExist && isOverwrite ) ) ) {
      fs.mkdirSync( currPath, { recursive: true } );
      ++numDirs;
    }
    const gDataKey = gData.key;
    const dataList = me.getNodeListIf( modelId, (d)=> d.group == gDataKey );
    
    for( const data of dataList ) {
      if( data.isGroup ) {
        generateDirectory( modelId, me, data, currPath, isOverwrite );
      } else {
        ++tNumFiles;
        // Check if node is enabled
        let isEnabled = isNodeEnabled( modelId, me, data );
        if( isEnabled ) {
          if( data.label.startsWith( '$$' ) ) {
            // Copy dependency
          } else {
            const srcFilePath = recomputeURL( data.fileURL, 
                                           config.client.host.fileServerURL, 
                                           config.server.dataRoot );
            //const fileName = srcFilePath.substring( srcFilePath.lastIndexOf( '/' )+1 );
            const fileName = data.label;
            const destFilePath = currPath+'/'+fileName;
            
            const isSrcFileExist = fs.existsSync( srcFilePath );
            const isDestFileExist = fs.existsSync( destFilePath );
            if( isSrcFileExist && 
                ( !isDestFileExist || ( isDestFileExist && isOverwrite ) ) ) {
              generateFileContent( modelId, me, data );  
              console.log( `copy ${srcFilePath} ${currPath}` );
              //ls( currPath );
              //ls( realFilePath.substring( 0, realFilePath.lastIndexOf( '/' ) ) );
              fs.copyFileSync( srcFilePath, destFilePath );

              // Set access flags in linux
              if( data.isExecutable && ( config.host.platformType == 'linux' ) ) {
                // Set rwxrwxrwx
                fs.chmodSync( destFilePath, 0o765 );
              }
              ++numFiles;
            }
          }
        }
      }
    }
  }
}
function isNodeEnabled( modelId, me, data ) {
  let result = true;
  const inNodeList = me.getNodeListFanInByNodeKey( modelId, data.key );
  if( inNodeList && inNodeList.length ) {
    result = false;
    for( const inData of inNodeList ) {
      if( inData && ( inData.group != undefined ) ) {
        const gData = me.getNode( modelId, inData.group );
        result = ( gData && ( gData.color == 'green' ) );
        if( result ) {
          break;
        }
      }
    }
  }
  return( result );
}
function generateFileContent( modelId, me, data ) {
  // Set true if the file has links from output of some nodes
  const isGenerationNeeded = false;

  if( isGenerationNeeded ) {
    // Compute source from generation process
    const source = '';

    if( isServer ) {
      if( data.isFile ) {
        if( data.fileURL ) {
          const realPath = recomputeURL( data.fileURL, 
                                         config.client.host.fileServerURL, 
                                         config.server.dataRoot );
          try {
            saveFileContent( realPath, source );
          } catch( e ) {}
        } else if( data.fileContent ) {
          data.fileContent = source;
        }
      }
    } else {
    }
  }
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
function getModel( fileURL ) {
  let model = '{}';

  if( isServer ) {
    const realPath = recomputeURL( fileURL, 
                                   config.client.host.fileServerURL, 
                                   config.server.dataRoot );
    try {
      model = fs.readFileSync( realPath, 'utf8' );
    } catch( e ) {}
  } else {
    // Get current graph model
    const g = getMainGraph();
    model = g.getJSONModel();
  }
  return( model );
}
function recomputeURL( url, virtualPath, realPath ) {
  if( !virtualPath.endsWith( '/' ) ) {
    virtualPath = virtualPath+'/';
  }
  if( !url.startsWith( '/' ) ) {
    url = '/'+url;
  }
  if( url.startsWith( virtualPath ) ) {
    const startIdx = virtualPath.length;
    // Remove '/fileServer/' virtual path
    const urlFilePath = url.substring( startIdx );
    // Create file path name
    const filePathName = realPath+'/'+urlFilePath;
    return( filePathName );
  } else {
    return( url );
  }
}