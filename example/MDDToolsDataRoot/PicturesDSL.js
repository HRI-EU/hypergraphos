/*
   DSL for Basic Test
    - This DSL is used to test visual models
*/

function PicturesDSL_getDSL( g ) {
  const dsl_Pictures_NodeType0 = ()=> {
    const computePath = ( text )=> {
      if( text == 'PicturePath' ) {
        return( '' ); 
      } else {
        /*
        // This code makes the path relative to the position of the graph where
        // the image is included
        let currGraphPath = g.getGraphPath();
        currGraphPath = currGraphPath.substring( 0, currGraphPath.lastIndexOf('/') );
        return( currGraphPath+'/'+text );
        */
       return( config.host.fileServerURL+'/'+text );
      }
    };
    const computeBackground = ( text )=> {
      return( text == 'PicturePath'? 'white': 'transparent' ); 
    }
    const manageText = ( text )=> {
      return( text == ''? 'PicturePath': text ); 
    }
    return $(go.Node, "Auto",
      {
        resizable: true,
      },
      $(go.Shape, "RoundedRectangle",
        {
          portId: "", 
          cursor: "pointer",  // the Shape is the port, not the whole Node
          // allow all kinds of links from this port
          fromLinkable: true, 
          fromLinkableDuplicates: true,
          // allow all kinds of links to this port
          toLinkable: true, 
          toLinkableDuplicates: true,
          fill: 'transparent',
          strokeWidth: 0,
        },
        new go.Binding("background", "text", computeBackground)
      ),
      // example Node binding sets Node.location to the value of Node.data.loc
      new go.Binding("location", "location",go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
      $(go.Picture,
        {
          name: "Picture",
          margin: 1.5,
          //background: 'white',
          imageStretch: go.GraphObject.Fill,
        },
        new go.Binding("source", "text", computePath),
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
      ),
      $(go.TextBlock,
        {
          stretch: go.GraphObject.Horizontal, 
          editable: true,
          alignment: new go.Spot( 0.5, 0, 0, -2 ),
          alignmentFocus: go.Spot.Bottom,
          isMultiline: false,  // don't allow newlines in text
        },
        new go.Binding("text", "text", manageText).makeTwoWay()
      )
    )
  };

  const dsl = {
    templateNodeList: [
      { category: 'Pictures_NodeType0', template: dsl_Pictures_NodeType0, },
    ],
    dataNodeList: [
      {
        text: 'PicturePath',
        category: 'Pictures_NodeType0',
        size: '100 100',
      },
    ],
    templateLinkList: [],
    dataLinkList: [],
  };

  return( dsl );
}