/*
   DSL for list of buttons
*/
function ThebesConnectDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js' ]);
}
function ThebesConnectDSL_setupDSL() {
}
function ThebesConnectDSL_getDSL( g ) {
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
      { category: 'ThebesConnect_Subsystem',     template: dsl_Component, param: { g, figure: 'Rectangle',           fill: 'PaleTurquoise', hasTag: false, hasType: true, isTypeEditable: true, hasIcon: false, minSize: new go.Size(240, 80), hasInputs: true,  canAddInput: true,  hasOutputs: true,  canAddOutput: true,  hasProperties: true,  canAddProperties: true,  isPropertiesDynamic: true, hasValue: true,  hasUnit: false, isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: true,  isOutputLinkableSelfNode: true,  isInputLinkableDuplicates:false, isOutputLinkableDuplicates:true, portStroke: "YellowGreen"} },
      { category: 'ThebesConnect_Human',         template: dsl_Component, param: { g, figure: 'Rectangle',           fill: 'PaleTurquoise', hasTag: false, hasType: false, hasIcon: true, iconURL: '/fileServer/pictures/stickfigure.png', iconWidth: 70, iconHeight: 70, minSize: new go.Size(80, 80),  hasInputs: true,  canAddInput: true,  hasOutputs: true,  canAddOutput: true,  hasProperties: false, canAddProperties: false,                            hasValue: false, hasUnit: false, isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: true,  isOutputLinkableSelfNode: true,  isInputLinkableDuplicates:false, isOutputLinkableDuplicates:true, isTypeEditable: false, portStroke: "YellowGreen"} },
      { category: 'ThebesConnect_Multiplexer',   template: dsl_Component, param: { g, figure: 'Rectangle',           fill: 'PaleTurquoise', hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(60, 60),  hasInputs: true,  canAddInput: true,  hasOutputs: true,  canAddOutput: false, hasProperties: false, canAddProperties: false,                            hasValue: false, hasUnit: false, isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: true,  isOutputLinkableSelfNode: true,  isInputLinkableDuplicates:false, isOutputLinkableDuplicates:true, isTypeEditable: false, portStroke: "YellowGreen"} },
      { category: 'ThebesConnect_PortIn1Dir',    template: dsl_Component, param: { g, figure: 'LeftPointSquare',     fill: "YellowGreen",   hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),  hasInputs: true,  canAddInput: false, hasOutputs: false, canAddOutput: false, hasProperties: false, canAddProperties: false,                                                             isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false, isInputLinkableDuplicates:false, isOutputLinkableDuplicates:true} },
      { category: 'ThebesConnect_PortOut1Dir',   template: dsl_Component, param: { g, figure: 'RightPointSquare',    fill: "YellowGreen",   hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),  hasInputs: false, canAddInput: false, hasOutputs: true,  canAddOutput: false, hasProperties: false, canAddProperties: false,                                                             isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false, isInputLinkableDuplicates:false, isOutputLinkableDuplicates:false} },
      { category: 'ThebesConnect_PortIn2Dir',    template: dsl_Component, param: { g, figure: 'LeftPointSquare',     fill: "Orange",        hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),  hasInputs: true,  canAddInput: false, hasOutputs: false, canAddOutput: false, hasProperties: false, canAddProperties: false,                                                             isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false, isInputLinkableDuplicates:false, isOutputLinkableDuplicates:false} },
      { category: 'ThebesConnect_PortOut2Dir',   template: dsl_Component, param: { g, figure: 'RightPointSquare',    fill: "Orange",        hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),  hasInputs: false, canAddInput: false, hasOutputs: true,  canAddOutput: false, hasProperties: false, canAddProperties: false,                                                             isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false, isInputLinkableDuplicates:false, isOutputLinkableDuplicates:true} },
      { category: 'ThebesConnect_ParameterList', template: dsl_Component, param: { g, figure: "BendedLeftRight",     fill: "Salmon",        hasTag: true,  hasType: true,  hasIcon: false,                                hasInputs: false,                     hasOutputs: false,                                                                                                hasValue: false, hasUnit: false,                                               hasFunctionButtons: false} },
      { category: 'ThebesInterface_ParameterList',   template: dsl_Component, param: { g, figure: "BendedLeftRight",     fill: "Salmon",      hasTag: true,  hasType: true,  hasIcon: false,                                 hasInputs: false,                     hasOutputs: false,                                                                                                 hasValue: true,  hasUnit: true,                                               hasFunctionButtons: false} },
      { category: 'ThebesInterface_ROSAnnotationIO', template: dsl_Component, param: { g, figure: "BendedLeftRight",     fill: "Aquamarine",  hasTag: true,  hasType: true,  hasIcon: false,                                 hasInputs: false,                     hasOutputs: false,                                            canAddProperties: false,                             hasValue: true,  hasUnit: false,                                              hasFunctionButtons: false} },
    ],
    dataNodeList: [
      {
        label: 'Subsystem',
        category: 'ThebesConnect_Subsystem',
        type: 'className',
        size: '240 80',
        in_: [],
        out_: [], 
        props_: [], 
        fileURL: '',
        fileType: 'text/json',
      },
      {
        label: 'Human',
        category: 'ThebesConnect_Human',
        size: '180 80',
        in_: [],
        out_: [], 
        props_: [], 
        isDir: true,
        fileURL: '',
        fileType: 'text/json',
      },
      {
        label: 'MUX',
        category: 'ThebesConnect_Multiplexer',
        size: '60 60',
        in_: [
		  { portId: '1in', name:'in1' },
          { portId: '2in', name:'in2' }
        ],
        out_: [
          { portId: '1out', name:'out' }
		], 
        props_: [], 
        isDir: false,
      },
      {
        label: "Name",
        category: "ThebesConnect_PortIn1Dir",
        size: "160 40",
        color: 'YellowGreen',
        in_: [
          { portId: '1in', name:'in' }
        ],
      },
      {
        label: "Name",
        category: "ThebesConnect_PortIn2Dir",
        size: "160 40",
        color: 'Orange',
        in_: [
           { portId: '1in', name:'in' }
        ],
      },
      {
        label: "Name",
        category: "ThebesConnect_PortOut1Dir",
        size: "160 40",
        color: "YellowGreen",
        out_: [
          { portId: '1out', name:'out' }
        ],
      },
      {
        label: "Name",
        category: "ThebesConnect_PortOut2Dir",
        size: "160 40",
        color: 'Orange',
        out_: [
          { portId: '1out', name:'out' }
        ],
      },
      {
        label: 'Parameters',
        category: 'ThebesConnect_ParameterList',
        size: "250 40",
        props_: [
          { name: "param1" },
        ],
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
      { category: 'ThebesConnect_1Dir', template: dsl_BasicLink, param: { stroke:'black', toArrow: 'OpenTriangle', toScale: 2, strokeWidth: 4, toShortLength:5 } },
      { category: 'ThebesConnect_2Dir', template: dsl_BasicLink, param: { stroke:'black', toArrow: 'DoubleFeathers', toScale: 2,  fromArrow: 'BackwardDoubleFeathers', fromScale: 2, strokeWidth: 4, toShortLength:10, fromShortLength: 8 } },
      { category: 'ThebesInterface_Annotate', template: dsl_BasicLink, param: { stroke:'black', strokeWidth: 4, strokeDashArray: [ 10, 10 ] } },
    ],
    dataLinkList: [
      {
        category: 'ThebesConnect_1Dir',
        fromPort: '',
        toPort: '',
      },
      {
        category: 'ThebesConnect_2Dir',
        fromPort: '',
        toPort: '',
      },
      {
        category: 'ThebesInterface_Annotate',
        fromPort: '',
        toPort: '',
      },
   ],
  };

  return( dsl );
}