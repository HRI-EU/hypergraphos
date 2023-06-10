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

const config = require( '../serverConfig.js' );
const ModelExplorer = require( '../client/ModelExplorer.js' );
const isServer = true;

const modelFileURL = '/fileServer/01/07.json'; //''
const deployKey = 106; //nodeData.key;

// const config = {
//   client: {
//     host: {
//       fileServerURL: '/fileServer',
//     }
//   },
//   server: {
//     dataRoot: '../../../../../DevAll//MDDToolsDataRoot',
//     deployRoot: '../../../../../DevAll//MDDToolsDeployRoot',
//   }
// };

/*
 * I will receive:
 *   - model fileURL
 *   - deployment component key
 */

generateSystem( modelFileURL, deployKey );

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
    const isOverwrite = me.getProperty( modelId, deployData, 'isOverwrite', true );
    
    // Get output link from name port
    const outDataKeyList = me.getNodeListFanOutByNodeKey( modelId, deployKey );
    
    const targetPath = config.server.deployRoot;
    // Loop over out components
    for( const outDataKey of outDataKeyList ) {
      const outData = me.getNode( modelId, outDataKey );
      generateDirectory( modelId, me, outData, targetPath, isOverwrite );
    }
  } catch( e ) {}
}
function generateDirectory( modelId, me, gData, path, isOverwrite ) {
  if( gData.isGroup ) {
    const dirName = gData.label;
    const currPath = path+'/'+dirName;
    console.log( `mkdir -p ${currPath}` );
    fs.mkdirSync( currPath, { recursive: true } );
    const gDataKey = gData.key;
    const dataList = me.getNodeListIf( modelId, (d)=> d.group == gDataKey );
    
    for( const data of dataList ) {
      if( data.isGroup ) {
        generateDirectory( modelId, me, data, currPath );
      } else {
        const realFilePath = recomputeURL( data.fileURL, 
                                       config.client.host.fileServerURL, 
                                       config.server.dataRoot );
        const isFileExist = false; // TODO: compute it
        if( !isFileExist || ( isFileExist && isOverwrite ) ) {
          generateFileContent( modelId, me, data );
          const fileName = realFilePath.substring( realFilePath.lastIndexOf( '/' )+1 );
          console.log( `copy ${realFilePath} ${currPath}` );
          ls( currPath );
          ls( realFilePath.substring( 0, realFilePath.lastIndexOf( '/' ) ) );
          fs.copyFileSync( realFilePath, currPath+'/'+fileName );
        }
      }
    }
  }
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