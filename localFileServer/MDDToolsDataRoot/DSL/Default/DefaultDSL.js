/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

function DefaultDSL_includeList() {
  return([]);
}
function DefaultDSL_getDSL( g ) {
  const dsl = {
    // Define DSL templates
    templateNodeList: [
      { category: 'Default', template: ()=>{
        return( 
          $(go.Node, "Auto",  // the Shape automatically fits around the TextBlock
            new go.Binding("location", "location",go.Point.parse).makeTwoWay(go.Point.stringify),
            new go.Binding('zOrder'),
            $(go.Shape, "RoundedRectangle",  // use this kind of figure for the Shape
              // bind Shape.fill to Node.data.color
              new go.Binding("fill", "color")),
            $(go.TextBlock,
              { margin: 3 },  // some room around the text
              // bind TextBlock.text to Node.data.key
              new go.Binding("text", "key"))
          )
        );
      }},
    ],
    dataNodeList:[
      {
        'key': 'key0',
        'color': 'Red',
        'category': 'Default',
      },
      {
        'key': 'key1',
        'color': 'Green',
        'category': 'Default',
      },
    ],
    templateLinkList:[],
    dataLinkList:[],
  };
  return( dsl );
}