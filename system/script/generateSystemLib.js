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
const ModelExplorer = require( '../client/lib/ModelExplorer/2.0/ModelExplorer.js' );
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
  const modelFileURL = params.modelFileURL;
  const deployKey = params.deployKey;
  
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
    let isOverwrite = me.getProperty( modelId, deployData, 'isOverwrite', true );
    let isAllEnabled = me.getProperty( modelId, deployData, 'isAllEnabled', false );
    
    // Get output link from name port
    const outDataList = me.getNodeListFanOutByNodeKey( modelId, deployKey );
    
    const targetPath = config.server.deployRoot;
    // Loop over out components
    for( const outData of outDataList ) {
      generateDirectory( modelId, me, outData, targetPath, isOverwrite, isAllEnabled );
    }
  } catch( e ) {}
}
function generateDirectory( modelId, me, gData, path, isOverwrite, isAllEnabled ) {
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
        let isEnabled = ( isAllEnabled || isNodeEnabled( modelId, me, data ) );
        if( isEnabled ) {
          if( data.label.startsWith( '$$' ) ) {
            // Copy dependency
          } else {
            // If the node do not have a fileURL => we probably have fileContent
            const srcFilePath = recomputeURL( data.fileURL, 
                                              config.client.host.fileServerURL, 
                                              config.server.dataRoot );
            //const fileName = srcFilePath.substring( srcFilePath.lastIndexOf( '/' )+1 );
            const fileName = data.label;
            const destFilePath = currPath+'/'+fileName;
            
            // If we have not srcFilePath => no need to check file exists
            const isSrcFileExist = ( srcFilePath? fs.existsSync( srcFilePath ): true );
            const isDestFileExist = fs.existsSync( destFilePath );
            let isFileSaved = false;
            if( isSrcFileExist && 
                ( !isDestFileExist || ( isDestFileExist && isOverwrite ) ) ) {
              if( data.fileURL ) {
                console.log( `copy ${srcFilePath} ${currPath}` );
                //ls( currPath );
                //ls( realFilePath.substring( 0, realFilePath.lastIndexOf( '/' ) ) );
                fs.copyFileSync( srcFilePath, destFilePath );
                isFileSaved = true;
              } else if( !srcFilePath && data.fileContent ) {
                const source = data.fileContent;
                saveFileContent( destFilePath, source );
                isFileSaved = true;
              }
              // Set access flags in linux if file has been saved
              if( isFileSaved ) {
                ++numFiles;
                if( data.isExecutable && ( config.host.platformType == 'linux' ) ) {
                  // Set rwxrwxrwx
                  fs.chmodSync( destFilePath, 0o765 );
                }
              }
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
  // If no url => let know
  if( !url ) {
    return( null );
  }

  // Otherwise translate url
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