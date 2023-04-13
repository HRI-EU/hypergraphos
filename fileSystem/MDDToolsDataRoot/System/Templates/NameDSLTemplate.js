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
  //
  // Example:
  //   return(['/fileServer/System/Includes/DSLInclude.js']);
  //
  return([]);
}

//--------------------------------------------------
// Define setup of DSL
//--------------------------------------------------
function KanbanDSL_setupDSL( g ) {
}

//--------------------------------------------------
// Define DSL Meta-Model and DSL Model
//--------------------------------------------------
function NameDSL_getDSL( g ) {

  //----------------------------------
  // Define DSL Meta-Models functions
  //----------------------------------
  const Name_Node1 = ()=> {
    return( $(go.Node, "Auto",              // the Shape automatically fits around the TextBlock
      $(go.Shape, "RoundedRectangle",       // use this kind of figure for the Shape
        new go.Binding("fill", "color")),   // bind Shape.fill to Node.data.color
      $(go.TextBlock,
        { margin: 3 },                      // some room around the text
        new go.Binding("text", "label"))    // bind TextBlock.text to Node.data.label
    ));
  };

  //----------------------------------
  // Define DSL data
  //----------------------------------
  const dsl = {
    
    //-----------------------------------
    // Define DSL Meta-Models categories
    //-----------------------------------
    templateNodeList: [
      { category: 'Name_Node1', template: Name_Node1 },
    ],

    //-----------------------------------
    // Define DSL Models Node Elements
    //-----------------------------------
    dataNodeList:[
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
    ],

    //-----------------------------------
    // Define DSL Models Link Elements
    //-----------------------------------
    templateLinkList:[],
    dataLinkList:[],
  };

  // Return DSL data
  return( dsl );
}