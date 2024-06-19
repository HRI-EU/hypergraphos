/*
   DSL for list of buttons
*/
function ThebestDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js' ]);
}
function ThebestDSL_setupDSL() {
}
function ThebestDSL_getDSL( g ) {
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
      { category: 'Thebest_Communicator1Dir',  template: dsl_Component, param: { g, figure: "RightPointLeftPoint", fill: "YellowGreen",   hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(150,40),                                                                                hasProperties: true,  canAddProperties: false, isPropertiesDynamic: true, hasValue: true, hasUnit: false,  isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Thebest_Communicator2Dir',  template: dsl_Component, param: { g, figure: "RightPointLeftPoint", fill: "Orange",        hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(150,40),                                                                                hasProperties: true,  canAddProperties: false, isPropertiesDynamic: true, hasValue: true, hasUnit: false,  isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Thebest_ParameterList',     template: dsl_Component, param: { g, figure: "BendedLeftRight",     fill: "moccasin",      hasTag: true,  hasType: true,  hasIcon: false,                                hasInputs: false,                     hasOutputs: false,                                                                                                hasValue: true, hasUnit: true,                                              hasFunctionButtons: false} },
      { category: 'Thebest_Subsystem',         template: dsl_Component, param: { g, figure: 'Rectangle',           fill: 'LightBlue',     hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(240, 80), hasInputs: true,  canAddInput: true,  hasOutputs: true,  canAddOutput: true,  hasProperties: true,  canAddProperties: true,  isPropertiesDynamic: true, hasValue: true, hasUnit: false,  isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true, isInputLinkableDuplicates:true, isOutputLinkableDuplicates:true, isTypeEditable: false, portStroke: "YellowGreen"} },
      { category: 'Thebest_PortIn1Dir',        template: dsl_Component, param: { g, figure: 'LeftPointSquare',     fill: "YellowGreen",   hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),  hasInputs: true,  canAddInput: false, hasOutputs: false, canAddOutput: false, hasProperties: false, canAddProperties: false,                                                             isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true, isInputLinkableDuplicates:true, isOutputLinkableDuplicates:true} },
      { category: 'Thebest_PortOut1Dir',       template: dsl_Component, param: { g, figure: 'RightPointSquare',    fill: "YellowGreen",   hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),  hasInputs: false, canAddInput: false, hasOutputs: true,  canAddOutput: false, hasProperties: false, canAddProperties: false,                                                             isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true, isInputLinkableDuplicates:true, isOutputLinkableDuplicates:true} },
      { category: 'Thebest_PortIn2Dir',        template: dsl_Component, param: { g, figure: 'LeftPointSquare',     fill: "Orange",        hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),  hasInputs: true,  canAddInput: false, hasOutputs: false, canAddOutput: false, hasProperties: false, canAddProperties: false,                                                             isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true, isInputLinkableDuplicates:true, isOutputLinkableDuplicates:true} },
      { category: 'Thebest_PortOut2Dir',       template: dsl_Component, param: { g, figure: 'RightPointSquare',    fill: "Orange",        hasTag: false, hasType: false, hasIcon: false, minSize: new go.Size(80, 40),  hasInputs: false, canAddInput: false, hasOutputs: true,  canAddOutput: false, hasProperties: false, canAddProperties: false,                                                             isFromLinkable: false, isToLinkable: false, isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true, isInputLinkableDuplicates:true, isOutputLinkableDuplicates:true} },
   ],
    dataNodeList: [
     {
        label: 'Communicator',
        category: 'Thebest_Communicator1Dir',
        size: '240 40',
        fileContent: '',
		props_: [ { name: "ROS msg type", value: "std_msgs/String" }, { name: "ROS topic", value: "/" }, ], 
      },
      {
        label: 'Communicator',
        category: 'Thebest_Communicator2Dir',
        size: '240 40',
        fileContent: '',
 		props_: [ { name: "ROS srv/act type" }, { name: "ROS name", value: "/" }, ], 
      },
      {
        label: 'Param/Default/Current',
        category: 'Thebest_ParameterList',
        size: "250 40",
        props_: [
		  // Note: these currently have to have the names "name", "value", "unit" until a more flexible version is made
          { name: "param1", value: "default1", unit: "value1" },
          { name: "param2", value: "default2", unit: "value2" },
        ],
      },
      {
        label: 'Subsystem',
        category: 'Thebest_Subsystem',
        size: '240 80',
        in_: [],
        out_: [], 
        props_: [], 
        isDir: true,
        fileURL: '',
        fileType: 'text/json',
      },
      {
        label: "Name",
        category: "Thebest_PortIn1Dir",
        size: "160 40",
        color: 'YellowGreen',
        in_: [
          {
            portId: '1in', name:'in',
            tooltip: "Any data entering the tunnel"
          }
        ],
      },
      {
        label: "Name",
        category: "Thebest_PortIn2Dir",
        size: "160 40",
        color: 'Orange',
        in_: [
          {
            portId: '1in', name:'in',
            tooltip: "Any data entering the tunnel"
          }
        ],
      },
      {
        label: "Name",
        category: "Thebest_PortOut1Dir",
        size: "160 40",
        color: "YellowGreen",
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "Any data leaving the tunnel"
          }
        ],
      },
      {
        label: "Name",
        category: "Thebest_PortOut2Dir",
        size: "160 40",
        color: 'Orange',
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "Any data leaving the tunnel"
          }
        ],
      },
    ],
    templateLinkList: [
      { category: 'Thebest_1Dir', template: dsl_BasicLink, param: { stroke:'black', toArrow: 'Feather', toScale: 2, strokeWidth: 4, toShortLength:5 } },
      { category: 'Thebest_2Dir', template: dsl_BasicLink, param: { stroke:'black', toArrow: 'DoubleFeathers', toScale: 2,  fromArrow: 'BackwardDoubleFeathers', fromScale: 2, strokeWidth: 4, toShortLength:10, fromShortLength: 8 } },
    ],
    dataLinkList: [
      {
        category: 'Thebest_1Dir',
        fromPort: '',
        toPort: '',
      },
      {
        category: 'Thebest_2Dir',
        fromPort: '',
        toPort: '',
      },
    ],
  };

  return( dsl );
}