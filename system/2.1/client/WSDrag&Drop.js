/*
  NOTE:
   Currently drag & drop functions are registered in the main html (indexHG.html) in the line:

   <div id="diagram" class='diagramDiv' ondrop="dropHandler(event)" ondragover="dragOverHandler(event)">

*/

function prepareDropFileNode( e, file ) {
  const fileNode = {
    fileType: file.type,
    label: file.name,
    category: '',
    contentMethod: '',
  };

  if( fileNode.fileType == 'application/json' ) {
    fileNode.fileType = 'text/json';
  }

  if( fileNode.fileType.match( '^image/' ) ) {
    fileNode.category = 'Pictures_Basic';
    fileNode.contentMethod = ( e.shiftKey? 'SaveBase64Content': 'SetEncodeContent' );
  } else if( fileNode.fileType.match( '^text/') ) {
    fileNode.category = ( e.shiftKey? 'Hierarchy_CodeInFile': 'Hierarchy_CodeInGraph' );
    fileNode.contentMethod = ( e.shiftKey? 'SaveUnencodeContent': 'SetUnencodeContent' );
  } else {
    fileNode.category = ( e.shiftKey? 'Hierarchy_DataInFile': 'Hierarchy_DataInGraph' );
    fileNode.contentMethod = ( e.shiftKey? 'SaveBase64Content': 'SetTextContent' );
  }
  dropFileNodeIntoNode( e, file, fileNode );
}
function dropFileNodeIntoNode( e, file, fileNode ) {
  const reader = new FileReader();

  reader.onload = (el)=> {
    const fileDataContent = el.target.result;
    // Get main graph
    const g = getMainGraph();
    const nodeData = g.getDSLData( fileNode.category );
    if( nodeData ) {
      nodeData.label = fileNode.label;
      if( fileNode.fileType ) {
        nodeData.fileType = fileNode.fileType;
      }
      const location = g.getDocXYFromView( e.x, e.y );

      // Add a new node
      g.addNode( nodeData, location.x, location.y );

      // Set or save node content
      switch( fileNode.contentMethod ) {
        case 'SaveBase64Content': {
          // const graphURL = g.getGraphPath();
          // const idx = graphURL.lastIndexOf( '.' );
          // const fileURL = `${graphURL.substring( 0, idx )}_Data/${nodeData.key}_${file.name}`;
          const fileURL = getNewWorkSpaceFileServerURL( nodeData, file.name );

          const encodeContent = fileDataContent.replace( /^data:[^;]+;base64,/, '' );
          saveBase64Data( fileURL, encodeContent, ()=>{
            setNodeDataField( nodeData.key, 'fileURL', fileURL );
          });
        } break;
        case 'SetEncodeContent': {
          setNodeDataField( nodeData, 'fileContent', fileDataContent );
        } break;
        case 'SaveUnencodeContent': {
          // const graphURL = g.getGraphPath();
          // const idx = graphURL.lastIndexOf( '.' );
          // nodeData.fileURL = `${graphURL.substring( 0, idx )}_Data/${nodeData.key}_${file.name}`;
          const fileURL = getNewWorkSpaceFileServerURL( nodeData, file.name );
          setNodeDataField( nodeData.key, 'fileURL', fileURL );

          const dataContent = fileDataContent.replace( /^data:[^;]+;base64,/, '' );
          const unencodeFileContent = atob( dataContent );
          const nodeDataCopy = g.getNodeData( nodeData.key, true );
          // Set fileContent in nodeDataCopy to be saved by the server
          nodeDataCopy.fileContent = unencodeFileContent;
          saveNodeContent( nodeDataCopy );
        } break;
        case 'SetUnencodeContent': {
          const dataContent = fileDataContent.replace( /^data:[^;]+;base64,/, '' );
          const unencodeFileContent = atob( dataContent );
          setNodeDataField( nodeData.key, 'fileContent', unencodeFileContent );
        }
      }
    } else {
      alert( `Warning: drop ignored because I could not find DSL for ${fileNode.category}` );
    }
  };

  reader.readAsDataURL( file );
}
function dropStringIntoNode( e, item ) {
  item.getAsString( (text)=> {
    console.log( 'text:', text, 'at', 'x:', e.x, 'y:', e.y );
    
    // if( text.trim().match( '^#([a-fA-F0-9]+)$' ) ) {
    //   // If the string is a color => try to set color
    //   const data = g.getFirstSelectedNodeData();
    //   if( data ) {
    //     if( ( data.color != undefined ) || ( data.category.startsWith( 'TextLabels_' ) ) ) {
    //       setNodeDataField( data, 'color', text.trim() );
    //     }
    //   }  
    // }
    // Get main graph
    const g = getMainGraph();
    const nodeData = g.getDSLData( 'TextLabels_Size2' );
    if( nodeData ) {
      const location = g.getDocXYFromView( e.x, e.y );

      // Add a new node
      g.addNode( nodeData, location.x, location.y );
      setNodeDataField( nodeData, 'label', text );
    }
  });
}
function dragOverHandler( e ) {
  // Prevent default behavior (Prevent file from being opened)
  e.preventDefault();
}
function dropHandler( e ) {
  console.log("File(s) dropped");

  // Prevent default behavior (Prevent file from being opened)
  e.preventDefault();

  if (e.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for( const item of e.dataTransfer.items ) {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        // console.log( '-------------------------' );
        // console.log(`… file.name = ${file.name}`);
        // console.log(`… file.type = ${file.type}`);
        // console.log(`… file.kind = ${file.kind}`);
        // console.log( '-------------------------' );

        prepareDropFileNode( e, file );
      } else if( item.kind == 'string'  && item.type.match( "^text/plain" ) ) {
        dropStringIntoNode( e, item );
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    [...e.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
      console.log(`… file[${i}].type = ${file.type}`);
      console.log(`… file[${i}].kind = ${file.kind}`);
    });
  }
}