/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
   DSL for list of buttons
*/
function ButtonDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}
function ButtonDSL_getDSL( g ) {

  //-----------------------
  // Define specific shapes
  //-----------------------
  
  //-----------------------
  // Define specific menus
  //-----------------------   

  //-----------------------
  // Define node templates
  //-----------------------

  //-----------------------
  // Define link templates
  //-----------------------
  

  //-----------------------
  // Define event handler
  //-----------------------

  
  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    templateNodeList: [
      { category: 'Button_List1',     template: dsl_Component, param: { fill: 'LightBlue', hasInputs: false, hasOutputs: false, hasProperties: false, hasFunctionButtons: true, fromSpot: go.Spot.Center, toSpot:go.Spot.Center } },
      { category: 'Button_List2',     template: dsl_Component, param: { fill: 'LightBlue', hasInputs: false, hasOutputs: false, hasProperties: false, hasFunctionButtons: true, fromSpot: go.Spot.Center, toSpot:go.Spot.Center } },
      { category: 'Button_List3',     template: dsl_Component, param: { fill: 'LightBlue', hasInputs: false, hasOutputs: false, hasProperties: false, hasFunctionButtons: true, fromSpot: go.Spot.Center, toSpot:go.Spot.Center } },
      { category: 'CheckBox_List1',   template: dsl_Component, param: { fill: 'LightBlue', hasInputs: false, hasOutputs: false, hasProperties: false, hasFunctionButtons: true, fromSpot: go.Spot.Center, toSpot:go.Spot.Center, isCheckBoxes: true } },
      { category: 'CheckBox_List2',   template: dsl_Component, param: { fill: 'LightBlue', hasInputs: false, hasOutputs: false, hasProperties: false, hasFunctionButtons: true, fromSpot: go.Spot.Center, toSpot:go.Spot.Center, isCheckBoxes: true } },
      { category: 'CheckBox_List3',   template: dsl_Component, param: { fill: 'LightBlue', hasInputs: false, hasOutputs: false, hasProperties: false, hasFunctionButtons: true, fromSpot: go.Spot.Center, toSpot:go.Spot.Center, isCheckBoxes: true } },
    ],
    dataNodeList: [
      {
        label: 'Label',
        category: 'Button_List1',
        size: "150 40",
        buttons_: [
          {name: "button1", checked: false},
        ],
        'isFile': true,
        'fileContent': "var buttonLabel;\nconsole.log( 'Button Label: '+buttonLabel )",
      },
      {
        label: 'Label',
        category: 'Button_List2',
        size: "150 70",
        buttons_: [
          {name: "button1", checked: false},
          {name: "button2", checked: false},
        ],
        'isFile': true,
        'fileContent': "var buttonLabel;\nconsole.log( 'Button Label: '+buttonLabel )",
      },
      {
        label: 'Label',
        category: 'Button_List3',
        size: "150 100",
        buttons_: [
          {name: "button1", checked: false},
          {name: "button2", checked: false},
          {name: "button3", checked: false},
        ],
        'isFile': true,
        'fileContent': "var buttonLabel;\nconsole.log( 'Button Label: '+buttonLabel )",
      },
      {
        label: 'Label',
        category: 'CheckBox_List1',
        size: "150 40",
        buttons_: [
          {name: "option1", checked: false},
        ],
        'isFile': true,
        'fileContent': "var buttonLabel;\nconsole.log( 'Button Label: '+buttonLabel )",
      },
      {
        label: 'Label',
        category: 'CheckBox_List2',
        size: "150 70",
        buttons_: [
          {name: "option1", checked: false},
          {name: "option2", checked: false},
        ],
        'isFile': true,
        'fileContent': "var buttonLabel;\nconsole.log( 'Button Label: '+buttonLabel )",
      },
      {
        label: 'Label',
        category: 'CheckBox_List3',
        size: "150 100",
        buttons_: [
          {name: "option1", checked: false},
          {name: "option2", checked: false},
          {name: "option3", checked: false},
        ],
        'isFile': true,
        'fileContent': "var buttonLabel;\nconsole.log( 'Button Label: '+buttonLabel )",
      },
    ],
    templateLinkList: [],
    dataLinkList: [],
  };

  return( dsl );
}