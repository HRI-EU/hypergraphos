/*
   DSL for Graph Properties
    - Created 08-07-2021
    - By Frankonello
*/
function DataFlowDSL_includeList() {
  return(['/fileServer/DSLInclude.js']);
}
function DataFlowDSL_getDSL( g ) {
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
      { category: 'DataFlow_ComponentKVU',     template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: true,  figure: "Rectangle",     fill: "lightskyblue"} },
      { category: 'DataFlow_ComponentKV',      template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: false, figure: "Rectangle",     fill: "lightskyblue"} },
      { category: 'DataFlow_ComponentV',       template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "Rectangle",     fill: "lightskyblue"} },
      { category: 'DataFlow_Component',        template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "Rectangle",     fill: "lightskyblue", hasProperties: false} },
      { category: 'DataFlow_DataKVU',          template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: true,  figure: "SquareUShape",  fill: "thistle", } },
      { category: 'DataFlow_DataKV',           template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: false, figure: "SquareUShape",  fill: "thistle", } },
      { category: 'DataFlow_DataV',            template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "SquareUShape",  fill: "thistle", } },
      { category: 'DataFlow_Data',             template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "SquareUShape",  fill: "thistle", hasProperties: false} },
      { category: 'DataFlow_ComponentBKVU',    template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: true,  figure: "Rectangle",     fill: "lightskyblue", hasFunctionButtons: true} },
      { category: 'DataFlow_ComponentBKV',     template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: false, figure: "Rectangle",     fill: "lightskyblue", hasFunctionButtons: true} },
      { category: 'DataFlow_ComponentBV',      template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "Rectangle",     fill: "lightskyblue", hasFunctionButtons: true} },
      { category: 'DataFlow_ComponentB',       template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "Rectangle",     fill: "lightskyblue", hasFunctionButtons: true, hasProperties: false} },
      { category: 'DataFlow_DataBKVU',         template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: true,  figure: "SquareUShape",  fill: "thistle",      hasFunctionButtons: true} },
      { category: 'DataFlow_DataBKV',          template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: true,  hasUnit: false, figure: "SquareUShape",  fill: "thistle",      hasFunctionButtons: true} },
      { category: 'DataFlow_DataBV',           template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "SquareUShape",  fill: "thistle",      hasFunctionButtons: true} },
      { category: 'DataFlow_DataB',            template: dsl_Component, param: {hasTag: true,  hasType: true, hasValue: false, hasUnit: false, figure: "SquareUShape",  fill: "thistle",      hasFunctionButtons: true, hasProperties: false} },
   ],
    // Define node palette
    dataNodeList: [
      {
        label: 'ComponentKVU',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_ComponentKVU',
        size: "200 100",
        rows: [
          { name: "name1", value: "value1", unit: "unit1" },
          { name: "name2", value: "value2", unit: "unit1" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'ComponentKV',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_ComponentKV',
        size: "200 100",
        rows: [
          { name: "name1", value: "value1" },
          { name: "name2", value: "value2" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'ComponentV',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_ComponentV',
        size: "200 100",
        rows: [
          { name: "value0" },
          { name: "value1" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'Component',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_Component',
        size: "200 100",
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'DataKVU',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_DataKVU',
        size: "200 100",
        rows: [
          { name: "name1", value: "value1", unit: "unit1" },
          { name: "name2", value: "value2", unit: "unit1" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'DataKV',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_DataKV',
        size: "200 100",
        rows: [
          { name: "name1", value: "value1" },
          { name: "name2", value: "value2" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileContent': "",
     },
     {
        label: 'DataV',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_DataV',
        size: "200 100",
        isFile: true,
        rows: [
          { name: "value0" },
          { name: "value1" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'Data',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_Data',
        size: "200 100",
        isFile: true,
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileContent': "",
      },
      {
        label: 'ComponentBKVU',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_ComponentBKVU',
        size: "200 100",
        buttons: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        rows: [
          { name: "name1", value: "value1", unit: "unit1" },
          { name: "name2", value: "value2", unit: "unit1" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'ComponentBKV',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_ComponentBKV',
        size: "200 100",
        buttons: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        rows: [
          { name: "name1", value: "value1" },
          { name: "name2", value: "value2" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'ComponentBV',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_ComponentBV',
        size: "200 100",
        buttons: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        rows: [
          { name: "value0" },
          { name: "value1" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'ComponentB',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_ComponentB',
        size: "200 100",
        buttons: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'DataBKVU',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_DataBKVU',
        size: "200 100",
        buttons: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        rows: [
          { name: "name1", value: "value1", unit: "unit1" },
          { name: "name2", value: "value2", unit: "unit1" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'DataBKV',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_DataBKV',
        size: "200 100",
        buttons: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        rows: [
          { name: "name1", value: "value1" },
          { name: "name2", value: "value2" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
     },
     {
        label: 'DataBV',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_DataBV',
        size: "200 100",
        isFile: true,
         buttons: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
       rows: [
          { name: "value0" },
          { name: "value1" },
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isFile': true,
        'fileType': 'text/javascript',
        'fileContent': nodeButtonFileContent,
      },
      {
        label: 'DataB',
        tag: 'tag',
        type: 'type',
        category: 'DataFlow_DataB',
        size: "200 100",
        isFile: true,
        buttons: [
          {name: "button1"},
          {name: "button2"},
          {name: "button3"},
        ],
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
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