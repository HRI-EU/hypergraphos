/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
   DSL for Graph Properties
    - Created 08-07-2021
    - By Frankonello
*/
function PropertyDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}
function PropertyDSL_getDSL( g ) {
  let diagram = (g.diagram? g.diagram: g.nodePalette);


  //-----------------------
  // Define link templates
  //-----------------------
  
  //-----------------------
  // Define event handler
  //-----------------------
  
  turnOnVisibitityOfButtonsProxy = function(evt) {
    turnOnVisibitityOfButtons(evt,diagram);
  }
  turnOffVisibitityOfButtonsProxy = function(evt) {
    turnOffVisibitityOfButtons(evt,diagram);
  }

  if( diagram ) {
    diagram.addDiagramListener( "ChangingSelection", turnOffVisibitityOfButtonsProxy );
    diagram.addDiagramListener( "ChangedSelection", turnOnVisibitityOfButtonsProxy );
  }
  
  //-----------------------
  // Define palette
  //-----------------------
  
  const dsl = {
    // Give a category name to node templates
    templateNodeList: [
      { category: 'Property_ListKVU',   template: dsl_Component, param: {hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasTag: true,  hasType: true,  hasValue: true,  hasUnit: true,   figure: "BendedLeftRight",  fill: "lightcoral"} },
      { category: 'Property_ListKV',    template: dsl_Component, param: {hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasTag: true,  hasType: true,  hasValue: true,  hasUnit: false,  figure: "BendedLeftRight",  fill: "sandybrown"} },
      { category: 'Property_ListV',     template: dsl_Component, param: {hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasTag: true,  hasType: true,  hasValue: false, hasUnit: false,  figure: "BendedLeft",       fill: "moccasin"} },
      { category: 'Property_ListBKVU',  template: dsl_Component, param: {hasInputs: false, hasOutputs: false, hasFunctionButtons: true,  hasTag: true,  hasType: true,  hasValue: true,  hasUnit: true,   figure: "BendedLeftRight",  fill: "lightcoral"} },
      { category: 'Property_ListBKV',   template: dsl_Component, param: {hasInputs: false, hasOutputs: false, hasFunctionButtons: true,  hasTag: true,  hasType: true,  hasValue: true,  hasUnit: false,  figure: "BendedLeftRight",  fill: "sandybrown"} },
      { category: 'Property_ListBV',    template: dsl_Component, param: {hasInputs: false, hasOutputs: false, hasFunctionButtons: true,  hasTag: true,  hasType: true,  hasValue: false, hasUnit: false,  figure: "BendedLeft",       fill: "moccasin"} },
     ],
    // Define node palette
    dataNodeList: [
      {
        label: 'Name/Value/Unit',
        tag: 'tag',
        type: 'type',
        category: 'Property_ListKVU',
        size: "250 40",
        props_: [
          { name: "name1", value: "value1", unit: "unit1" },
          { name: "name2", value: "value2", unit: "unit2" },
        ],
      },
      {
        label: 'Name/Value List',
        tag: 'tag',
        type: 'type',
        category: 'Property_ListKV',
        size: "250 40",
        props_: [
          { name: "name1", value: "value1" },
          { name: "name2", value: "value2" },
        ],
      },
      {
        label: 'Value List',
        tag: 'tag',
        type: 'type',
        category: 'Property_ListV',
        size: "250 40",
        props_: [
          { name: "value1" },
          { name: "value2" },
        ],
      },
      {
        label: 'Name/Value/Unit',
        tag: 'tag',
        type: 'type',
        category: 'Property_ListBKVU',
        size: "250 100",
        buttons_: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        props_: [
          { name: "name1", value: "value1", unit: "unit1" },
          { name: "name2", value: "value2", unit: "unit2" },
        ],
        'isFile': true,
        'fileContent': "var buttonLabel;\nconsole.log( 'Button Label: '+buttonLabel )",
      },
      {
        label: 'Name/Value List',
        tag: 'tag',
        type: 'type',
        category: 'Property_ListBKV',
        size: "250 100",
        buttons_: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        props_: [
          { name: "name1", value: "value1" },
          { name: "name2", value: "value2" },
        ],
        'isFile': true,
        'fileContent': "var buttonLabel;\nconsole.log( 'Button Label: '+buttonLabel )",
      },
      {
        label: 'Value List',
        tag: 'tag',
        type: 'type',
        category: 'Property_ListBV',
        size: "250 100",
        buttons_: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        props_: [
          { name: "value1" },
          { name: "value2" },
        ],
        'isFile': true,
        'fileContent': "var buttonLabel;\nconsole.log( 'Button Label: '+buttonLabel )",
      },
    ],
    // Give a category name to link templates with the convention <dslName>_<categoryName
    templateLinkList: [
    ],
    // Define link palette
    dataLinkList: [
    ],
  };
  
  return( dsl );
}