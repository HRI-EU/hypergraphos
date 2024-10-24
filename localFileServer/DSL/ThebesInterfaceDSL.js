/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
   DSL for list of buttons
*/
function ThebesInterfaceDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js' ]);
}
function ThebesInterfaceDSL_setupDSL() {
}
function ThebesInterfaceDSL_getDSL( g ) {
  let diagram = (g.diagram? g.diagram: g.nodePalette);

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

  turnOnVisibitityOfButtonsProxy = function(evt) {
    turnOnVisibitityOfButtons(evt,diagram);
  }
  turnOffVisibitityOfButtonsProxy = function(evt) {
    turnOffVisibitityOfButtons(evt,diagram);
  }
  // Connectivity rules
  if( diagram ) {
    diagram.addDiagramListener( 'ChangingSelection', turnOffVisibitityOfButtonsProxy );
    diagram.addDiagramListener( 'ChangedSelection', turnOnVisibitityOfButtonsProxy );
  }
  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    templateNodeList: [
      { category: 'ThebesInterface_PortIn1Dir',      template: dsl_BasicNode, param: { g, figure: 'LeftPointSquare',     fill: "YellowGreen", hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),   hasInputs: true,  canAddInput: false, hasOutputs: false, canAddOutput: false, hasProperties: false, canAddProperties: false,                                                               isFromLinkable: true,  isToLinkable: true,  isInputLinkableSelfNode: true,  isOutputLinkableSelfNode: true,  isInputLinkableDuplicates:true,  isOutputLinkableDuplicates:true} },
      { category: 'ThebesInterface_PortOut1Dir',     template: dsl_BasicNode, param: { g, figure: 'RightPointSquare',    fill: "YellowGreen", hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),   hasInputs: false, canAddInput: false, hasOutputs: true,  canAddOutput: false, hasProperties: false, canAddProperties: false,                                                               isFromLinkable: true,  isToLinkable: true,  isInputLinkableSelfNode: true,  isOutputLinkableSelfNode: true,  isInputLinkableDuplicates:true,  isOutputLinkableDuplicates:true} },
      { category: 'ThebesInterface_PortIn2Dir',      template: dsl_BasicNode, param: { g, figure: 'LeftPointSquare',     fill: "Orange",      hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),   hasInputs: true,  canAddInput: false, hasOutputs: false, canAddOutput: false, hasProperties: false, canAddProperties: false,                                                               isFromLinkable: true,  isToLinkable: true,  isInputLinkableSelfNode: true,  isOutputLinkableSelfNode: true,  isInputLinkableDuplicates:true,  isOutputLinkableDuplicates:true} },
      { category: 'ThebesInterface_PortOut2Dir',     template: dsl_BasicNode, param: { g, figure: 'RightPointSquare',    fill: "Orange",      hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),   hasInputs: false, canAddInput: false, hasOutputs: true,  canAddOutput: false, hasProperties: false, canAddProperties: false,                                                               isFromLinkable: true,  isToLinkable: true,  isInputLinkableSelfNode: true,  isOutputLinkableSelfNode: true,  isInputLinkableDuplicates:true,  isOutputLinkableDuplicates:true} },
      { category: 'ThebesInterface_BodyEmpty',       template: dsl_Component, param: { g, figure: 'Rectangle',           fill: 'Moccasin',    hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(100, 100), hasInputs: false, canAddInput: false, hasOutputs: false, canAddOutput: false, hasProperties: false, canAddProperties: false, isPropertiesDynamic: false, hasValue: false, hasUnit: false,  isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false, isInputLinkableDuplicates:false, isOutputLinkableDuplicates:false, isTypeEditable: false} },
      { category: 'ThebesInterface_BodyRecursive',   template: dsl_Component, param: { g, figure: 'Folder',              fill: 'Moccasin',    hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(40, 40),   hasInputs: false, canAddInput: false, hasOutputs: false, canAddOutput: false, hasProperties: true,  canAddProperties: true,  isPropertiesDynamic: false, hasValue: true,  hasUnit: false,  isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false, isInputLinkableDuplicates:false, isOutputLinkableDuplicates:false, isTypeEditable: false, hasImage: "content", labelVerticalAlignment: "below", labelHorizontalAlignment: "right"} },
      { category: 'ThebesInterface_ParameterList',   template: dsl_Component, param: { g, figure: "BendedLeftRight",     fill: "Salmon",      hasTag: true,  hasType: true,  hasIcon: false,                                 hasInputs: false,                     hasOutputs: false,                                                                                                 hasValue: true,  hasUnit: true,                                               hasFunctionButtons: false} },
      { category: 'ThebesInterface_ROSAnnotationIO', template: dsl_Component, param: { g, figure: "BendedLeftRight",     fill: "Aquamarine",  hasTag: true,  hasType: true,  hasIcon: false,                                 hasInputs: false,                     hasOutputs: false,                                            canAddProperties: false,                             hasValue: true,  hasUnit: false,                                              hasFunctionButtons: false} },
    ],
    dataNodeList: [
       {
        label: "Name",
        category: "ThebesInterface_PortIn1Dir",
        size: "160 40",
        color: 'YellowGreen',
      },
      {
        label: "Name",
        category: "ThebesInterface_PortIn2Dir",
        size: "160 40",
        color: 'Orange',
      },
      {
        label: "Name",
        category: "ThebesInterface_PortOut1Dir",
        size: "160 40",
        color: "YellowGreen",
      },
      {
        label: "Name",
        category: "ThebesInterface_PortOut2Dir",
        size: "160 40",
        color: 'Orange',
      },
      {
        label: 'Empty',
        category: 'ThebesInterface_BodyEmpty',
        size: '150 150',
        in_: [],
        out_: [], 
        props_: [], 
        isDir: false,
      },
      {
		label: 'Recursive Body',
        category: 'ThebesInterface_BodyRecursive',
        size: '200 150',
        in_: [],
        out_: [], 
        props_: [], 
        isDir: true,
        fileURL: '',
        fileType: 'text/json',
      },
      {
        label: 'Param/Default/Current',
        category: 'ThebesInterface_ParameterList',
        size: "250 40",
        props_: [
		  // Note: these currently have to have the names "name", "value", "unit" until a more flexible version is made
          { name: "param1", value: "default1", unit: "value1" },
        ],
      },
      {
        label: 'ROS Parameters',
        category: 'ThebesInterface_ROSAnnotationIO',
        size: "400 40",
 		props_: [ { name: "msg definition", value: "std_msgs/String" }, { name: "topic", value: "/" }, ], 
      },
    ],
    templateLinkList: [
      { category: 'ThebesInterface_Annotate', template: dsl_BasicLink, param: { stroke:'black', strokeWidth: 4, strokeDashArray: [ 10, 10 ] } },
    ],
    dataLinkList: [
      {
        category: 'ThebesInterface_Annotate',
        fromPort: '',
        toPort: '',
      },
    ],
  };

  return( dsl );
}