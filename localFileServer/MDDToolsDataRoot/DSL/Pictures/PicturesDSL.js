/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

function HierarchyDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}

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
      new go.Binding('zOrder'),
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
      { category: 'Pictures_Basic', template: dsl_Pictures, },
      { category: 'Pictures_Link', template: dsl_Pictures, param:{ isLinkFromImage: true }},
    ],
    dataNodeList: [
      {
        text: 'PicturePath',
        category: 'Pictures_NodeType0',
        size: '100 100',
      },
      {
        label: 'Basic Image',
        category: 'Pictures_Basic',
        size: '100 100',
        'isFile': true,
        'fileTypeName': 'Image',
        'fileType': 'image/png',
        'fileURL': '',
      },
      {
        label: 'Link Image',
        category: 'Pictures_Link',
        size: '100 100',
        'isFile': true,
        'fileTypeName': 'Image',
        'fileType': 'image/jpg',
        'fileURL': '',
      },
    ],
    templateLinkList: [],
    dataLinkList: [],
  };

  return( dsl );
}