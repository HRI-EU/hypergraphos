/*
   DSL for list of buttons
*/
function ButtonDSL_includeList() {
  return(['/fileServer/DSLInclude.js']);
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
      { category: 'CheckBox_List1',   template: dsl_Component, param: { fill: 'LightBlue', hasInputs: false, hasOutputs: false, hasProperties: false, hasFunctionButtons: true, fromSpot: go.Spot.Center, toSpot:go.Spot.Center, hasCheckBoxes: true } },
      { category: 'CheckBox_List2',   template: dsl_Component, param: { fill: 'LightBlue', hasInputs: false, hasOutputs: false, hasProperties: false, hasFunctionButtons: true, fromSpot: go.Spot.Center, toSpot:go.Spot.Center, hasCheckBoxes: true } },
      { category: 'CheckBox_List3',   template: dsl_Component, param: { fill: 'LightBlue', hasInputs: false, hasOutputs: false, hasProperties: false, hasFunctionButtons: true, fromSpot: go.Spot.Center, toSpot:go.Spot.Center, hasCheckBoxes: true } },
    ],
    dataNodeList: [
      {
        label: 'Label',
        category: 'Button_List1',
        size: "150 40",
        buttons: [
          {name: "button1", checked: false},
        ],
        'isFile': true,
        'fileContent': "var buttonLabel;\nconsole.log( 'Button Label: '+buttonLabel )",
      },
      {
        label: 'Label',
        category: 'Button_List2',
        size: "150 70",
        buttons: [
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
        buttons: [
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
        buttons: [
          {name: "option1", checked: false},
        ],
        'isFile': true,
        'fileContent': "var buttonLabel;\nconsole.log( 'Button Label: '+buttonLabel )",
      },
      {
        label: 'Label',
        category: 'CheckBox_List2',
        size: "150 70",
        buttons: [
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
        buttons: [
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