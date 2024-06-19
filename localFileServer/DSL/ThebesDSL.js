/*
   DSL for list of buttons
*/
function ThebesDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js' ]);
}
function ThebesDSL_setupDSL() {
}
function ThebesDSL_getDSL( g ) {
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
      { category: 'Thebes_Subsystem',       template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'PaleTurquoise', hasTag: false, hasType: true,  isTypeEditable: true,  hasIcon: false,                                                                                minSize: new go.Size(240, 80), hasInputs: true,  canAddInput: true, hasOutputs: true,  canAddOutput: true,  hasProperties: true,  canAddProperties: true,  isPropertiesDynamic: true, hasValue: true,  hasUnit: false, isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: true,  isOutputLinkableSelfNode: true,  isInputLinkableDuplicates:false, isOutputLinkableDuplicates:true, portStroke: "YellowGreen"} },
      { category: 'Thebes_Human',           template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'PaleTurquoise', hasTag: false, hasType: false, isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/pictures/stickfigure.png', iconWidth: 70, iconHeight: 70, minSize: new go.Size(80, 80),  hasInputs: true,  canAddInput: true, hasOutputs: true,  canAddOutput: true,  hasProperties: false, canAddProperties: false,                            hasValue: false, hasUnit: false, isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: true,  isOutputLinkableSelfNode: true,  isInputLinkableDuplicates:false, isOutputLinkableDuplicates:true, portStroke: "YellowGreen"} },
      { category: 'Thebes_Multiplexer',     template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'PaleTurquoise', hasTag: false, hasType: false, isTypeEditable: false, hasIcon: false,                                                                                minSize: new go.Size(60, 60),  hasInputs: true,  canAddInput: true, hasOutputs: true,  canAddOutput: false, hasProperties: false, canAddProperties: false,                            hasValue: false, hasUnit: false, isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: true,  isOutputLinkableSelfNode: true,  isInputLinkableDuplicates:false, isOutputLinkableDuplicates:true, portStroke: "YellowGreen"} },
      { category: 'Thebes_PortIn1Dir',      template: dsl_BasicNode, param: { g, figure: 'RightPointSquare', fill: "YellowGreen",   hasTag: false, hasType: false,                        hasIcon: false,                                                                                minSize: new go.Size(80, 40),  hasInputs: false,                    hasOutputs: false,                      hasProperties: false, canAddProperties: false,                                                             isFromLinkable: true,  isToLinkable: true,  isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false, isInputLinkableDuplicates:false, isOutputLinkableDuplicates:true} },
      { category: 'Thebes_PortOut1Dir',     template: dsl_BasicNode, param: { g, figure: 'LeftPointSquare',  fill: "YellowGreen",   hasTag: false, hasType: false,                        hasIcon: false,                                                                                minSize: new go.Size(80, 40),  hasInputs: false,                    hasOutputs: false,                      hasProperties: false, canAddProperties: false,                                                             isFromLinkable: true,  isToLinkable: true,  isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false, isInputLinkableDuplicates:false, isOutputLinkableDuplicates:false} },
      { category: 'Thebes_PortIn2Dir',      template: dsl_BasicNode, param: { g, figure: 'RightPointSquare', fill: "Orange",        hasTag: false, hasType: false,                        hasIcon: false,                                                                                minSize: new go.Size(80, 40),  hasInputs: false,                    hasOutputs: false,                      hasProperties: false, canAddProperties: false,                                                             isFromLinkable: true,  isToLinkable: true,  isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false, isInputLinkableDuplicates:false, isOutputLinkableDuplicates:false} },
      { category: 'Thebes_PortOut2Dir',     template: dsl_BasicNode, param: { g, figure: 'LeftPointSquare',  fill: "Orange",        hasTag: false, hasType: false,                        hasIcon: false,                                                                                minSize: new go.Size(80, 40),  hasInputs: false,                    hasOutputs: false,                      hasProperties: false, canAddProperties: false,                                                             isFromLinkable: true,  isToLinkable: true,  isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false, isInputLinkableDuplicates:false, isOutputLinkableDuplicates:true} },
      { category: 'Thebes_ParameterList',   template: dsl_Component, param: { g, figure: "BendedLeftRight",  fill: "Salmon",        hasTag: true,  hasType: true,                         hasIcon: false,                                                                                                               hasInputs: false,                    hasOutputs: false,                      hasProperties: true,  canAddProperties: true,                             hasValue: true, hasUnit: false,  isFromLinkable: false, isToLinkable: false,                                           hasFunctionButtons: false} },
      { category: 'Thebes_ROSAnnotationIO', template: dsl_Component, param: { g, figure: "BendedLeftRight",  fill: "Aquamarine",    hasTag: true,  hasType: true,                         hasIcon: false,	                                                                                                            hasInputs: false,                    hasOutputs: false,                      hasProperties: true,  canAddProperties: false,                            hasValue: true, hasUnit: false,	isFromLinkable: true,  isToLinkable: true,                                            hasFunctionButtons: false} },
      { category: 'Thebes_Button',          template: dsl_Component, param: { g, figure: 'Rectangle',        fill: "YellowGreen",   hasTag: false, hasType: false, isTypeEditable: false, hasIcon: false,	                                                                                                            hasInputs: false,                    hasOutputs: false,                      hasProperties: false, canAddProperties: false,                            hasValue: true, hasUnit: false,	isFromLinkable: false, isToLinkable: false,                                           hasFunctionButtons: true } },
   ],
    dataNodeList: [
      {
        label: 'Subsystem',
        category: 'Thebes_Subsystem',
        type: 'className',
        size: '240 80',
        in_: [],
        out_: [], 
        props_: [], 
      },
      {
        label: 'Human',
        category: 'Thebes_Human',
        size: '180 80',
        in_: [],
        out_: [], 
        props_: [], 
      },
      {
        label: 'MUX',
        category: 'Thebes_Multiplexer',
        size: '60 60',
        in_: [
		  { portId: '1in', name:'in1' },
          { portId: '2in', name:'in2' }
        ],
        out_: [
          { portId: '1out', name:'out' }
		], 
        props_: [], 
      },
      {
        label: "Name",
        category: "Thebes_PortIn1Dir",
        size: "160 40",
        color: 'YellowGreen',
       },
      {
        label: "Name",
        category: "Thebes_PortIn2Dir",
        size: "160 40",
        color: 'Orange',
      },
      {
        label: "Name",
        category: "Thebes_PortOut1Dir",
        size: "160 40",
        color: "YellowGreen",
      },
      {
        label: "Name",
        category: "Thebes_PortOut2Dir",
        size: "160 40",
        color: 'Orange',
      },
      {
        label: 'Param/Default',
        category: 'Thebes_ParameterList',
        size: "250 40",
        props_: [
		  // Note: these currently have to have the names "name" and "value" until a more flexible version is made
          { name: "param1", value: "default1" },
        ],
      },
      {
        label: 'ROS Parameters',
        category: 'Thebes_ROSAnnotationIO',
        size: "400 40",
 		props_: [ { name: "msg definition", value: "std_msgs/String" }, { name: "topic", value: "/" }, ], 
      },
      {
        label: "Label",
        category: "Thebes_Button",
		buttons_: [
          {name: 'Generate', checked: false},
        ],
        'isFile': true,
        'fileContent': nodeButtonFileContent,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
  ],
    templateLinkList: [
      { category: 'Thebes_1Dir',     template: dsl_BasicLink, param: { stroke:'black', toArrow: 'OpenTriangle', toScale: 2, strokeWidth: 4, toShortLength:5 } },
      { category: 'Thebes_2Dir',     template: dsl_BasicLink, param: { stroke:'black', toArrow: 'DoubleFeathers', toScale: 2,  fromArrow: 'BackwardDoubleFeathers', fromScale: 2, strokeWidth: 4, toShortLength:10, fromShortLength: 8 } },
      { category: 'Thebes_Annotate', template: dsl_BasicLink, param: { stroke:'black', strokeWidth: 4, strokeDashArray: [ 10, 10 ] } },
    ],
    dataLinkList: [
      {
        category: 'Thebes_1Dir',
        fromPort: '',
        toPort: '',
      },
      {
        category: 'Thebes_2Dir',
        fromPort: '',
        toPort: '',
      },
      {
        category: 'Thebes_Annotate',
        fromPort: '',
        toPort: '',
      },
   ],
  };

  return( dsl );
}