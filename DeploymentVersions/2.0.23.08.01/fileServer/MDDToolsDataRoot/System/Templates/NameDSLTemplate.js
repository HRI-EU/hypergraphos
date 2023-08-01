//[# Begin out #]
/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: DSL File
Date: 10.07.2020
=============================================================================
*/

//--------------------------------------------------
// Define list of include files (Optional Function)
//--------------------------------------------------
function NameDSL_includeList() {
  return([
      //[# Begin includeList #]
      '/fileServer/System/Includes/DSLInclude.js',
      //[# End includeList #]
    ]);
}

//--------------------------------------------------
// Define setup of DSL
//--------------------------------------------------
function NameDSL_setupDSL( g ) {
  //[# Insert setupCode #]
}

//--------------------------------------------------
// Define DSL Meta-Model and DSL Model
//--------------------------------------------------
function NameDSL_getDSL( g ) {
  let diagram = (g.diagram? g.diagram: g.nodePalette);

  //----------------------------------
  // Define DSL functions
  //----------------------------------
  //[# Insert dslCode #]

  //----------------------------------
  // Define DSL Meta-Models functions
  //----------------------------------
  //[# Begin Skip #]
  const Name_Node1 = ()=> {
    return( $(go.Node, "Auto",              // the Shape automatically fits around the TextBlock
      $(go.Shape, "RoundedRectangle",       // use this kind of figure for the Shape
        new go.Binding("fill", "color")),   // bind Shape.fill to Node.data.color
      $(go.TextBlock,
        { margin: 3 },                      // some room around the text
        new go.Binding("text", "label"))    // bind TextBlock.text to Node.data.label
    ));
  };
  //[# End Skip #]
  
  //----------------------------------
  // Define DSL data
  //----------------------------------
  const dsl = {
    
    //-----------------------------------
    // Define DSL Meta-Models categories
    //-----------------------------------
    templateNodeList: [
      //[# Insert templateNodeList #]
      //[# Begin templateNodeList #]
      { category: 'Name_Node1', template: Name_Node1 },
      //[# End templateNodeList #]
    ],

    //-----------------------------------
    // Define DSL Models Node Elements
    //-----------------------------------
    dataNodeList:[
      //[# Insert dataNodeList #]

      //[# Begin dataNodeList #]
      {
        'label': 'Red Node',
        'color': 'Red',
        'category': 'Name_Node1',
      },
      {
        'label': 'Green Node',
        'color': 'Green',
        'category': 'Name_Node1',
      },
      //[# End dataNodeList #]
    ],

    //-----------------------------------
    // Define DSL Models Group Elements
    //-----------------------------------
    templateGroupList:[
      //[# Insert templateGroupList #]
    ],
    dataGroupList:[
      //[# Insert dataGroupList #]
    ],
    
    //-----------------------------------
    // Define DSL Models Link Elements
    //-----------------------------------
    templateLinkList:[
      //[# Insert templateLinkList #]
    ],
    dataLinkList:[
      //[# Insert dataLinkList #]
    ],
  };

  // Return DSL data
  return( dsl );
}
//[# End out #]
