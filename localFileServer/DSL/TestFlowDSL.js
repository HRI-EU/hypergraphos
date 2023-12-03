/*
   DSL for Graph Properties
    - Created 08-07-2021
    - By Frankonello
*/
function TestFlowDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}
function TestFlowDSL_getDSL( g ) {
    let diagram = (g.diagram? g.diagram: g.nodePalette);

   
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
      { category: 'TestFlow_ComponentKVU',     template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: true,  figure: "Rectangle",     fill: "lightskyblue"} },
      { category: 'TestFlow_ComponentKV',      template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: false, figure: "Rectangle",     fill: "lightskyblue"} },
      { category: 'TestFlow_ComponentV',       template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "Rectangle",     fill: "lightskyblue"} },
      { category: 'TestFlow_Component',        template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "Rectangle",     fill: "lightskyblue", hasProperties: false} },
      { category: 'TestFlow_DataKVU',          template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: true,  figure: "SquareUShape",  fill: "thistle", } },
      { category: 'TestFlow_DataKV',           template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: false, figure: "SquareUShape",  fill: "thistle", } },
      { category: 'TestFlow_DataV',            template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "SquareUShape",  fill: "thistle", } },
      { category: 'TestFlow_Data',             template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "SquareUShape",  fill: "thistle", hasProperties: false} },
      { category: 'TestFlow_ComponentBKVU',    template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: true,  figure: "Rectangle",     fill: "lightskyblue", hasFunctionButtons: true} },
      { category: 'TestFlow_ComponentBKV',     template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: false, figure: "Rectangle",     fill: "lightskyblue", hasFunctionButtons: true} },
      { category: 'TestFlow_ComponentBV',      template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "Rectangle",     fill: "lightskyblue", hasFunctionButtons: true} },
      { category: 'TestFlow_ComponentB',       template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "Rectangle",     fill: "lightskyblue", hasFunctionButtons: true, hasProperties: false} },
      { category: 'TestFlow_DataBKVU',         template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: true,  figure: "SquareUShape",  fill: "thistle",      hasFunctionButtons: true} },
      { category: 'TestFlow_DataBKV',          template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: false, figure: "SquareUShape",  fill: "thistle",      hasFunctionButtons: true} },
      { category: 'TestFlow_DataBV',           template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "SquareUShape",  fill: "thistle",      hasFunctionButtons: true} },
      { category: 'TestFlow_DataB',            template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "SquareUShape",  fill: "thistle",      hasFunctionButtons: true, hasProperties: false} },
   ],
    // Define node palette
    dataNodeList: [
      {
        label: 'ComponentKVU',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_ComponentKVU',
        size: "200 100",
        props_: [
          { name: "name1", value: "value1", unit: "unit1" },
          { name: "name2", value: "value2", unit: "unit1" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'ComponentKV',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_ComponentKV',
        size: "200 100",
        props_: [
          { name: "name1", value: "value1" },
          { name: "name2", value: "value2" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'ComponentV',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_ComponentV',
        size: "200 100",
        props_: [
          { name: "value0" },
          { name: "value1" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'Component',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_Component',
        size: "200 100",
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'DataKVU',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_DataKVU',
        size: "200 100",
        props_: [
          { name: "name1", value: "value1", unit: "unit1" },
          { name: "name2", value: "value2", unit: "unit1" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'DataKV',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_DataKV',
        size: "200 100",
        props_: [
          { name: "name1", value: "value1" },
          { name: "name2", value: "value2" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileContent': "",
     },
     {
        label: 'DataV',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_DataV',
        size: "200 100",
        isFile: true,
        props_: [
          { name: "value0" },
          { name: "value1" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'Data',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_Data',
        size: "200 100",
        isFile: true,
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'ComponentBKVU',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_ComponentBKVU',
        size: "200 100",
        buttons_: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        props_: [
          { name: "name1", value: "value1", unit: "unit1" },
          { name: "name2", value: "value2", unit: "unit1" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'ComponentBKV',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_ComponentBKV',
        size: "200 100",
        buttons_: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        props_: [
          { name: "name1", value: "value1" },
          { name: "name2", value: "value2" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'ComponentBV',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_ComponentBV',
        size: "200 100",
        buttons_: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        props_: [
          { name: "value0" },
          { name: "value1" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'ComponentB',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_ComponentB',
        size: "200 100",
        buttons_: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'DataBKVU',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_DataBKVU',
        size: "200 100",
        buttons_: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        props_: [
          { name: "name1", value: "value1", unit: "unit1" },
          { name: "name2", value: "value2", unit: "unit1" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'DataBKV',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_DataBKV',
        size: "200 100",
        buttons_: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        props_: [
          { name: "name1", value: "value1" },
          { name: "name2", value: "value2" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
     },
     {
        label: 'DataBV',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_DataBV',
        size: "200 100",
        isFile: true,
         buttons_: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
       props_: [
          { name: "value0" },
          { name: "value1" },
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'DataB',
        tag: 'tag',
        type: 'type',
        category: 'TestFlow_DataB',
        size: "200 100",
        isFile: true,
        buttons_: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        in_: [ 
          { portId:'in0', name:'in0' },
          { portId:'in1', name:'in1' },
        ],
        out_: [ 
          { portId:'out0', name:'out0' },
          { portId:'out1', name:'out1' },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
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