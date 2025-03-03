/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
   DSL for list of buttons
*/
function DataFlowDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js',
          'lib/hChat/1.0/hChat.css',
          'lib/hChat/1.0/hChat.js',
          'lib/DataFlowEngine/1.5/DataFlowEngine.js' ]);
}
function DataFlowDSL_setupDSL() {
  if( !graphData.chatGPT ) {
    graphData.chatGPT = new ChatGPT();
    console.log( 'Instanciate ChatGPT' );
  }
}
function DataFlowDSL_getDSL( g ) {
  let diagram = (g.diagram? g.diagram: g.nodePalette);

  const cm = g.contextMenu;
  cm.add( menuDSL, 'fileTypeMenu' );
  const fileTypeContextMenu = cm.getMenu( 'fileTypeMenu' );
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
  if( diagram ) {
    diagram.addDiagramListener( 'ChangingSelection', turnOffVisibitityOfButtonsProxy );
    diagram.addDiagramListener( 'ChangedSelection', turnOnVisibitityOfButtonsProxy );
  }
  
  function dataSend( event, obj ) {
    const nodeData = obj.part.data;
    DataFlow_Data( nodeData, 'in' );
  }
  function dataGate( event, obj ) {
    const nodeData = obj.part.data;
    // Toogle checkbox state
    const diagram = obj.part.diagram;
    diagram.model.setDataProperty( nodeData.buttons_[0], 'checked', !nodeData.buttons_[0].checked );
    // Force data send if now its checked
    if( nodeData.buttons_[0].checked ) {
      //const dataV = nodeData.fileContent;
      const defaultValue = ( nodeData.fileType == 'text/json'? []: '' );
      const value = graphData.dfe.getInput( nodeData, 'in', defaultValue );
      DataFlow_DataGate( nodeData, 'in', value );
    }
  }
  function doStart( event, obj ) {
    const nodePart = obj.part;
    const diagram = nodePart.diagram;
    const node = diagram.findNodeForKey(nodePart.key);
    const nodeData = node.data;
    console.log( `${obj.data.name} pressed.` );

    // // Get an engine
    // const dfe = DataFlowEngine.getInstance( /* Engine Node Data */);
    graphData.dfe.fireOutput( nodeData, 'out' );
  };
  
  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    templateNodeList: [
      { category: 'DataFlow_Param',            template: dsl_Component, param: { g, figure: 'BendedLeftRight',  fill: 'sandybrown', hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: true, hasTag: false,  hasType: false, isFromLinkable: false, isToLinkable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/API_Keys.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(460, 80)} },
      { category: 'DataFlow_SystemEvent',      template: dsl_Component, param: { g, figure: 'RightPointSquare',           fill: 'Magenta',     hasInputs: false, canAddInput: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: false, hasValue: false, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, hasTag: false, hasType: false, isFromLinkable: false, isToLinkable: false, hasFunctionButtons: false, minSize: new go.Size(80, 80), isResizable:false, isLabelEditable: false} },
      { category: 'DataFlow_Start',            template: dsl_Component, param: { g, figure: 'Circle',           fill: 'Green',     hasInputs: false, canAddInput: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: false, hasValue: false, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, hasTag: false, hasType: false, isFromLinkable: false, isToLinkable: false, hasFunctionButtons: true, minSize: new go.Size(80, 80), buttonMinSize: new go.Size(40, 20), buttonInternalCallback: doStart,isResizable:false} },
      { category: 'DataFlow_BreakPoint',       template: dsl_Component, param: { g, figure: 'Circle',           fill: 'Red',     hasInputs: true, canAddInput: false, hasOutputs: false, canAddOutput: false, isInputEditable: false, isOutputEditable: false, hasProperties: false, hasValue: false, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, hasTag: false, hasType: false, isFromLinkable: false, isToLinkable: false, hasFunctionButtons: false, minSize: new go.Size(80, 80), buttonMinSize: new go.Size(40, 20), isResizable:false, labelStroke: 'White'} },
      { category: 'DataFlow_BlinkLED',         template: dsl_Component, param: { g, figure: 'Circle',           hasInputs: true, canAddInput: false, hasOutputs: false, canAddOutput: false, isInputEditable: false, isOutputEditable: false, hasProperties: false, hasValue: false, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, hasTag: false, hasType: false, isFromLinkable: false, isToLinkable: false, hasFunctionButtons: false, minSize: new go.Size(80, 80), buttonMinSize: new go.Size(40, 20), isResizable:false, labelStroke: 'White'} },

      { category: 'DataFlow_Data',             template: dsl_Component, param: { g, figure: 'RoundedRectangle', fill: 'LightGreen', hasInputs: true,  canAddInput: false, isInputEditable: true, hasOutputs: true, canAddOutput: true, isOutputEditable: true, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, hasTag: false, hasType: true, isFromLinkable: false, isToLinkable: false, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconWidth: 50, iconHeight: 50,hasFunctionButtons: false, minSize: new go.Size(140, 80),isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true, typeMenu: fileTypeContextMenu} },
      { category: 'DataFlow_DataJSON',         template: dsl_Component, param: { g, figure: 'RoundedRectangle', fill: 'LightGreen', hasInputs: true,  canAddInput: false, isInputEditable: true, hasOutputs: true, canAddOutput: true, isOutputEditable: true, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, hasTag: false, hasType: true, isFromLinkable: false, isToLinkable: false, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconWidth: 50, iconHeight: 50,hasFunctionButtons: false, minSize: new go.Size(140, 80),isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_DataSend',         template: dsl_Component, param: { g, figure: 'RoundedRectangle', fill: 'LightGreen', hasInputs: true,  canAddInput: false, isInputEditable: true, hasOutputs: true, canAddOutput: true, isOutputEditable: true, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, hasTag: false, hasType: true, isFromLinkable: false, isToLinkable: false, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/Text_Data.png', iconWidth: 50, iconHeight: 50,hasFunctionButtons: true, minSize: new go.Size(150, 80), buttonMinSize: new go.Size(40, 20), buttonInternalCallback: dataSend,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_DataGate',         template: dsl_Component, param: { g, figure: 'RoundedRectangle', fill: 'LightGreen', hasInputs: true,  canAddInput: false, isInputEditable: true, hasOutputs: true, canAddOutput: true, isOutputEditable: true, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, hasTag: false, hasType: true, isFromLinkable: false, isToLinkable: false, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/Text_Data.png', iconWidth: 50, iconHeight: 50,hasFunctionButtons: true, minSize: new go.Size(150, 80), buttonMinSize: new go.Size(40, 20), buttonInternalCallback: dataGate,isCheckBoxes: true, isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },

      { category: 'DataFlow_LLM',              template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/LLM_ChatGPT.png', iconWidth: 50, iconHeight: 50,minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true, isResizable:true, isLabelEditable: true} },
      { category: 'DataFlow_JSON2Text',        template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/JSON_Text.png', iconWidth: 50, iconHeight: 50,minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true, isResizable:false, isLabelEditable: false} },
      { category: 'DataFlow_Text2JSON',        template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/Text_JSON.png', iconWidth: 50, iconHeight: 50,minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true, isResizable:false, isLabelEditable: false} },
      { category: 'DataFlow_ChatJSONSplitter', template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/ChatJSON_Splitter.png', iconWidth: 50, iconHeight: 50,minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true, isResizable:false, isLabelEditable: false} },
      { category: 'DataFlow_Template',         template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'Moccasin'         , hasInputs: true,  canAddInput: true, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: true, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/Prompt_Template.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true, inputMaxLinks:1, typeMenu: fileTypeContextMenu } },
      { category: 'DataFlow_ParseGPTObject',   template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'Moccasin'         , hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, isInputEditable: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/ParseObject.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true, inputMaxLinks:1, typeMenu: fileTypeContextMenu } },
      { category: 'DataFlow_Chat',             template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/Chat_History.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_Component',        template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'SandyBrown'       , hasInputs: true,  canAddInput: true, hasOutputs: true, canAddOutput: true, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: true, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: false, iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_ComponentOpen',    template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'SandyBrown'       , hasInputs: true,  canAddInput: true, hasOutputs: true, canAddOutput: true, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: true, isPropertiesDynamic: false, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: false, iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_CodeInProp',       template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'SandyBrown'       , hasInputs: true,  canAddInput: true, hasOutputs: true, canAddOutput: true, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: true, isPropertiesDynamic: false, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/CodeInProp.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      // { category: 'DataFlow_CodeInLabel',      template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'SandyBrown'       , hasInputs: true,  canAddInput: true, hasOutputs: true, canAddOutput: true, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: true, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/CodeInLabel.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_CondInLabel',      template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'SandyBrown'       , hasInputs: true,  canAddInput: true, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: false, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/CondInLabel.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_StateMachine',     template: dsl_Component, param: { g, figure: 'CircleRectangle',  hasInputs: true,  canAddInput: true, hasOutputs: true, canAddOutput: true, hasProperties: false, canAddProperties: false, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/StateMachine.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(80, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_BrowserTTS',       template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/TTS.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_ROSServer',        template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/ROSConnect.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_ROSTopic',         template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/ROSTopic.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_ROSService',       template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/ROSService.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_ROSAction',        template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/ROSAction.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_InputSelector',    template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: true, isInputEditable: true, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/InputSelector.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_OutputSelector',   template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: true, isOutputEditable: true, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/OutputSelector.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_ForEach',          template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'aqua '            , hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: false, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/ForEach.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_Loop',             template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'aqua '            , hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: false, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/Loop.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_BasicStats',       template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'PapayaWhip'       , hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: false, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/BasicStats.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_AsyncCall',        template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'Peru'             , hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/AsyncCall.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_StopWatch',        template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'Peru'             , hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: false, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/StopWatch.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_Watchdog',         template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'Peru'             , hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/Watchdog.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_FireValue',        template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: true, isInputEditable: true, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: false, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/FireValue.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_SetOut',           template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/SetOut.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_PassOnTrigger',    template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/PassOnTrigger.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_BlockOnTrigger',   template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: false, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/BlockOnTrigger.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_Gate',             template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/Gate.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_ConvertToEvent',   template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: false, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/DataToEvent.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_SetInArray',       template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/PutInArray.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_GetFromArray',     template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: '/fileServer/DSL/icons/GetFromArray.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: false, isOutputLinkableSelfNode: false,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      
      { category: 'DataFlow_TrigComponent',    template: dsl_Component, param: { g, figure: 'Rectangle',        fill: 'DarkSeaGreen', hasInputs: true,  canAddInput: true, hasOutputs: true, canAddOutput: true, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: true, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconWidth: 50, iconHeight: 50, hasFunctionButtons: true, minSize: new go.Size(240, 80), buttonMinSize: new go.Size(40, 20), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      
      { category: 'DataFlow_Merge',            template: dsl_Component, param: { g, portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,  isOutputEditable: false,                       hasValue: false, hasUnit: false,  figure: 'Rectangle',hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: true, canAddOutput: false, isResizable: false, isLabelEditable: false, maxSize: new go.Size(10, NaN),  } },
      { category: 'DataFlow_Dispatch',         template: dsl_Component, param: { g, portId: '', fill: 'LightBlue', label: '⬇️', isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: false, hasUnit: false,  figure: 'Rectangle', hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: false, canAddOutput: true, isResizable: false, isLabelEditable: false, minSize: new go.Size(40, 60),  } },
      { category: 'DataFlow_DispatchBack',     template: dsl_Component, param: { g, portId: '', fill: 'LightBlue', label: '⬆️', isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: false, hasUnit: false,  figure: 'Rectangle', hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: false, canAddOutput: true, isResizable: false, isLabelEditable: false, minSize: new go.Size(40, 60),  } },
      { category: 'DataFlow_DataWrap',         template: dsl_Component, param: { g, portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: false, hasUnit: false,  figure: 'RightPointSquare',hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: true, isInputEditable: true, canAddOutput: false, isOutputEditable: false, isResizable: false, isLabelEditable: false, minSize: new go.Size(NaN, 50), maxSize: new go.Size(70, NaN)  } },
      { category: 'DataFlow_DataUnwrap',       template: dsl_Component, param: { g, portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: false, hasUnit: false,  figure: 'LeftPointSquare', hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: false, isInputEditable: false, canAddOutput: true, isOutputEditable: true, isResizable: false, isLabelEditable: false, maxSize: new go.Size(20, NaN),  } },
      // { category: 'DataFlow_ObjectWrap',       template: dsl_Component, param: { g, portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: false, hasUnit: false,  figure: 'RightPointSquare',hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: true, isInputEditable: true, canAddOutput: false, isOutputEditable: true, isResizable: false, isLabelEditable: false, maxSize: new go.Size(20, NaN),  } },
      // { category: 'DataFlow_ObjectUnwrap',     template: dsl_Component, param: { g, portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: false, hasUnit: false,  figure: 'LeftPointSquare', hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: false, isInputEditable: false, canAddOutput: true, isOutputEditable: true, isResizable: false, isLabelEditable: false, maxSize: new go.Size(20, NaN),  } },
      { category: 'DataFlow_Message',          template: dsl_Component, param: { g, figure: 'RoundedRectangle', fill: 'LightYellow', hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasTag: false, hasType:false, hasProperties: false, minSize: new go.Size(30,30), labelTextAlign: "left", isFromLinkable: false, isToLinkable: false, stroke: "transparent", labelFont: "45px sans-serif", isLabelWrap: true, isLabelEditable: false } },
      { category: 'DataFlow_TunnelIn',         template: dsl_Component, param: { g, figure: 'HalfCircleLeft',   hasInputs: true,  canAddInput: false, hasOutputs: false, canAddOutput: false, hasProperties: false, canAddProperties: false, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: false, minSize: new go.Size(80, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'DataFlow_TunnelOut',        template: dsl_Component, param: { g, figure: 'HalfCircleRight',  hasInputs: false,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: false, canAddProperties: false, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: false, minSize: new go.Size(80, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
    ],
    dataNodeList: [
      {
        label: 'API Keys',
        category: 'DataFlow_Param',
        size: '460 80',
        props_: [
          { name: 'ChatGPT', value: '' },
        ],
      },
      {
        label: 'System Events',
        category: 'DataFlow_SystemEvent',
        size: '150 80',
        out_: [
          { portId: '1out', name:'onGraphLoaded' },
        ],
        isIncludeScript: true,
        doCompute: 'DataFlow_SystemEvent',
      },
      {
        label: '',
        category: 'DataFlow_Start',
        size: '80 80',
        buttons_: [
          { name: 'Start', checked: false },
        ],
        out_: [
          { portId: '1out', name:'out' },
        ],
      },
      {
        label: 'BP',
        category: 'DataFlow_BreakPoint',
        size: '80 80',
        in_: [
          { portId: '1in', name:'in' },
        ],
        isFile: true,
        fileType: "text/javascript",
        fileContent: "var event, obj, nodeData;\n\ngraphData.dfe.doPause();"
      },
      {
        label: '',
        category: 'DataFlow_BlinkLED',
        size: '80 80',
        color: 'gray',
        in_: [
          { portId: '1in', name:'doOn' },
          { portId: '2in', name:'doOff' },
          { portId: '3in', name:'doToggle' },
          { portId: '4in', name:'doBlink' },
        ],
        props_: [
          { name: 'onColor', value: 'red' },
          { name: 'offColor', value: 'grey' },
        ], 
        isFile: true,
        fileType: "text/javascript",
        doCompute: 'DataFlow_BlinkLED',    
      },
      {
        label: 'Trig Component',
        category: 'DataFlow_TrigComponent',
        size: '240 80',
        buttons_: [
          { name: 'Update', checked: false },
        ],
        in_: [
          { portId: '1in', name:'in' },
        ],
        out_: [
          { portId: '1out', name:'out' },
        ], 
        props_: [
        ], 
        isFile: true,
        fileContent: 'var nodeData;\n',
        fileTypeName: 'Component',
        fileType: 'text/javascript',
        iconURL: ''    
      },
      {
        label: 'Data',
        category: 'DataFlow_Data',
        size: '140 80',
        in_: [
          { portId: '1in', name:'in', tooltip: 'this input expects a string' },
        ],
        out_: [
          { portId: '1out', name:'out', tooltip: 'this output is a string' },
        ],
        props_: [
        ], 
        isFile: true,
        fileContent: '',
        fileTypeName: 'Text',
        fileType: 'text/text',
        iconURL: '/fileServer/DSL/icons/Text_Data.png',
        doCompute: 'DataFlow_Data',
      },
      {
        label: 'Data',
        category: 'DataFlow_DataJSON',
        size: '140 80',
        in_: [
          { portId: '1in', name:'in', tooltip: 'this input expects a JSON object or array' },
        ],
        out_: [
          { portId: '1out', name:'out', tooltip: 'this output is a JSON object or array' },
        ], 
        props_: [
        ], 
        isFile: true,
        fileContent: '',
        fileTypeName: 'JSON',
        fileType: 'text/json',     
        iconURL: '/fileServer/DSL/icons/JSON_Data.png',  
        doCompute: 'DataFlow_Data',  
      },
      {
        label: 'Data Send',
        category: 'DataFlow_DataSend',
        size: '240 80',
        buttons_: [
          { name: 'Send', checked: false },
        ],
        in_: [
          { portId: '1in', name:'in', tooltip: 'this input expects a string' },
        ],
        out_: [
          { portId: '1out', name:'out', tooltip: 'this output is a string' },
        ],
        props_: [
        ], 
        isFile: true,
        fileContent: '',
        fileTypeName: 'Text',
        fileType: 'text/text',
        iconURL: '/fileServer/DSL/icons/Text_Data.png',
        doCompute: 'DataFlow_DataSend',
      },
      {
        label: 'Data Send',
        category: 'DataFlow_DataSend',
        size: '240 80',
        buttons_: [
          { name: 'Send', checked: false },
        ],
        in_: [
          { portId: '1in', name:'in', tooltip: 'this input expects a JSON object or array' },
        ],
        out_: [
          { portId: '1out', name:'out', tooltip: 'this output is a JSON object or array' },
        ],  
        props_: [
        ], 
        isFile: true,
        fileContent: '',
        fileTypeName: 'JSON',
        fileType: 'text/json',
        iconURL: '/fileServer/DSL/icons/JSON_Data.png',
        doCompute: 'DataFlow_DataSend',    
      },
      {
        label: 'Data Gate',
        category: 'DataFlow_DataGate',
        size: '240 80',
        buttons_: [
          { name: 'Pass', checked: true },
        ],
        in_: [
          { portId: '1in', name:'in', tooltip: 'this input expects a string' },
          { portId: '2in', name:'reset', tooltip: 'this input expects a string\nthat will reset the data without\nfiring the out.' },
        ],
        out_: [
          { portId: '1out', name:'out', tooltip: 'this output is a string' },
        ], 
        props_: [
        ], 
        isFile: true,
        fileContent: '',
        fileTypeName: 'Text',
        fileType: 'text/text',
        doCompute: 'DataFlow_DataGate',
        iconURL: '/fileServer/DSL/icons/Text_Data.png',
      },
      {
        label: 'Data Gate',
        category: 'DataFlow_DataGate',
        size: '240 80',
        buttons_: [
          { name: 'Pass', checked: true },
        ],
        in_: [
          { portId: '1in', name:'in', tooltip: 'this input expects a JSON object or array' },
          { portId: '2in', name:'reset', tooltip: 'this input expects a JSON object or array\nthat will reset the data without\nfiring the out.' },
        ],
        out_: [
          { portId: '1out', name:'out', tooltip: 'this output is a JSON object or array' },
        ], 
        props_: [
        ], 
        isFile: true,
        fileContent: '',
        fileTypeName: 'JSON',
        fileType: 'text/json',
        doCompute: 'DataFlow_DataGate',
        iconURL: '/fileServer/DSL/icons/JSON_Data.png',    
      },
      {
        label: 'OpenAI GPT',
        category: 'DataFlow_LLM',
        size: '240 80',
        color: 'Gold',
        doCompute: 'DataFlow_LLM',
        in_: [
          { portId: '1in', name:'system', tooltip: 'this input expects a string \nthat defines the system prompt' },
          { portId: '2in', name:'user', tooltip: 'this input expects a string \nthat defines the user prompt' },
        ],
        out_: [
          { portId: '1out', name:'history', tooltip: 'this output is a JSON array \nthat contains the dialog history' },
          { portId: '2out', name:'assistant', tooltip: 'this output is a string that \ndefines the system answer' },
        ], 
        props_: [
          { name: 'url', value: '', tooltip: 'url of the server'},
          { name: 'model', value: 'gpt-3.5-turbo-0301',unit: '', 
            nameTooltip: 'this property defines the\nname ot the LLM model used', 
            valueTooltip: 'gpt-4: 8,192 tokens\ngpt-4-32k: 32,768 tokens\ngpt-3.5-turbo: 4,097 tokens\ngpt-3.5-turbo-16k: 16,385 tokens' },
          { name: 'hasHistory', value: 'false', tooltip: 'if true this property will create \nan history based on each system output \nand user input otherwise \nno history is used nor fired' },
          { name: 'stream', value: false, tooltip: 'true to get the response in streaming' },
          { name: 'maxRetry', value: '3',unit: '', tooltip: 'in case of error from the LLM server \nthe query will be retried this number of time' },
          { name: 'timeOut', value: '4',unit: 's', tooltip: 'this property defines the time before retry' },
          { name: 'computeBarrier', value: 'user', tooltip: 'this property defines the AND combination of \ninput names that will trigger a \n"doCompute" call in the component' },
        ], 
        fileTypeName: 'LLM',
      },
      {
        label: 'JSON to Text',
        category: 'DataFlow_JSON2Text',
        size: '240 80',
        color: 'LightSeaGreen',
        in_: [
          { portId: '1in', name:'in', tooltip: 'this input expects a JSON object or array' },
        ],
        out_: [
          { portId: '1out', name:'out', tooltip: 'this output is a stringified \nversion of the JSON input' },
        ], 
        props_: [
        ], 
       doCompute: 'DataFlow_JSON2Text',
        fileTypeName: 'Converter',
      },
      {
        label: 'Text to JSON',
        category: 'DataFlow_Text2JSON',
        size: '240 80',
        color: 'LightSeaGreen',
        in_: [
          { portId: '1in', name:'in', tooltip: 'this input expects a JSON string' },
        ],
        out_: [
          { portId: '1out', name:'out', tooltip: 'this output is a JSON object or array\nversion of the JSON input string' },
        ], 
        props_: [
        ], 
        doCompute: 'DataFlow_Text2JSON',
        fileTypeName: 'Converter',
      },
      {
        label: 'ChatJSON Splitter',
        category: 'DataFlow_ChatJSONSplitter',
        size: '240 80',
        color: 'LightSeaGreen',
        in_: [
          { portId: '1in', name:'in' },
        ],
        out_: [
          { portId: '1out', name:'history' },
          { portId: '2out', name:'user' },
        ], 
        props_: [
        ], 
       doCompute: 'DataFlow_ChatJSONSplitter',
        fileTypeName: 'Splitter',
      },
      {
        label: 'AI template',
        category: 'DataFlow_Template',
        size: '240 80',
        in_: [
          { portId: '1in', name:'in1' },
          { portId: '2in', name:'in2' },
        ],
        out_: [
          { portId: '1out', name:'out' },
        ], 
        props_: [
          { name: 'computeBarrier', value: '*' },
          { name: 'matcher', value: '{[^}]+}' },
          { name: 'matcherBraceLen', value: '1' },
          { name: 'skipComments', value: 'false' },
        ], 
        isFile: true,
        fileContent: 'This is a template example\nThe list of input values: [<in1>, <in2>]\nHere the value of in1 is: <in1>\nWhile the value of in2 is: <in2>\nThe template ends here\nThe full text will be generated in the output\nwhen all inputs are present',
        fileType: 'text/text',
        fileTypeName: 'Text',
        doCompute: 'DataFlow_Template',
      },
      {
        label: 'AI Parser',
        category: 'DataFlow_ParseGPTObject',
        size: '240 80',
        in_: [
          { portId: '1in', name:'in', 'tooltip':'This input get the text generated by a GPT' },
        ],
        out_: [
          { portId: '1out', name:'out', 'tooltip':'This output return a parsed object as defined in the properties' },
        ], 
        props_: [
          { name: 'dataFormat', value: 'json', 'tooltip':'Format of the object created by GPT: e.g. json, html, ...' },
          { name: 'outFormat', value: 'array', 'tooltip':'array or element' },
        ], 
        isFile: true,
        fileType: 'text/javascript',
        fileTypeName: 'Parse AI Object',
        doCompute: 'DataFlow_ParseGPTObject',
      },
      {
        label: 'AI Chat',
        category: 'DataFlow_Chat',
        size: '240 80',
        color: 'Salmon',
        in_: [
          { portId: '1in', name:'clear', tooltip: 'Event to empmty history.' },
          { portId: '2in', name:'init', tooltip: 'Array of message to set history.'  },
          { portId: '3in', name:'message', tooltip: 'Object defining a message:\n{\n  text: "msg",\n  sender: "name of sender",\n  receiver: "name of receiver",\n}'  },
          { portId: '4in', name:'selectSender', tooltip: 'Set name of sender in UI.'  },
          { portId: '5in', name:'userList', tooltip: 'Array of names/pictures for senders/receivers\n(has priority over the property)' },
        ],
        out_: [
          { portId: '1out', name:'history', tooltip: 'Array of message including last input message.'  },
          { portId: '2out', name:'dialog', tooltip: 'Array of message except last input message.'  },
          { portId: '3out', name:'allMessage', tooltip: 'Last input or typed message.' },
          { portId: '4out', name:'uiMessage', tooltip: 'Last typed message only.' },
        ], 
        props_: [
          { name: 'userList', value: '- { name: all, url: ~/allUsers.png }\n- { name: user1, url: ~/Male1.png }\n- { name: Female1, url: /fileServer/DSL/icons/Monalisa.png }', tooltip: 'List of names/pictures for senders/receivers' },
          { name: 'hasInputField', value: true, tooltip: 'true to have an input field' },
          { name: 'messageGap', value: '15px', tooltip: 'distance between messages, default = 15px' },
          { name: 'iconHeight', value: '40px', tooltip: 'message icon height, default = 40px' },
          { name: 'backgroundColor', value: '#C1D0F6', tooltip: 'chat background color, default = #C1D0F6' },
          { name: 'fontSize', value: '16px', tooltip: 'chat font size, default = 16px' },
        ], 
        isFile: true,
        isLocalDiv: true,
        fileContent: '',
        fileTypeName: 'AIChat',
        fileType: 'application/html',
        doCompute: 'DataFlow_Chat',
        history: [],
      },
      {
        label: 'FSM start',
        category: 'DataFlow_StateMachine',
        size: '240 80',
        color: 'Silver',
        in_: [
          { portId: '1in', name:'doReset' },
          { portId: '2in', name:'doTransition' },
        ],
        out_: [
          { portId: '1out', name:'out' },
          { portId: '2out', name:'onAction' },
        ], 
        fileTypeName: 'FSM Start',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_StateMachine',
      },
      {
        label: 'FSM state',
        category: 'DataFlow_StateMachine',
        size: '240 80',
        color: 'Silver',
        in_: [
          { portId: '1in', name:'in' },
          { portId: '2in', name:'doTransition' },
        ],
        out_: [
          { portId: '1out', name:'out' },
          { portId: '2out', name:'onAction' },
        ], 
        fileTypeName: 'FSM State',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_StateMachine',
      },
      {
        label: 'AI component',
        category: 'DataFlow_Component',
        size: '240 80',
        in_: [
          { portId: '1in', name:'in' },
        ],
        out_: [
          { portId: '1out', name:'out' },
        ], 
        props_: [
          { name: 'computeBarrier', value: '*' },
        ], 
        isFile: true,
        fileContent: 'var nodeData, name, value;\n',
        fileTypeName: 'Component',
        fileType: 'text/javascript',
      },
      {
        label: 'AI component',
        category: 'DataFlow_ComponentOpen',
        size: '240 80',
        in_: [
          { portId: '1in', name:'in' },
        ],
        out_: [
          { portId: '1out', name:'out' },
        ], 
        props_: [
          { name: 'computeBarrier', value: '*' },
        ], 
        fileContent: 'var nodeData, name, value;\n',
        fileTypeName: 'Component',
        fileType: 'text/javascript',
      },
      {
        label: 'Code In Prop',
        category: 'DataFlow_CodeInProp',
        size: '240 80',
        in_: [
          { portId: '1in', name:'in' },
        ],
        out_: [
          { portId: '1out', name:'out' },
        ], 
        props_: [
          { name: 'computeBarrier', value: '*' },
          { name: 'code', value: '' },
        ], 
        doCompute: 'DataFlow_CodeIn',
        fileTypeName: 'Code In Prop',
        fileType: 'text/javascript',
      },
      {
        label: 'Code Here',
        category: 'DataFlow_CodeInLabel',
        size: '240 80',
        in_: [
          { portId: '1in', name:'in' },
        ],
        out_: [
          { portId: '1out', name:'out' },
        ], 
        props_: [
          { name: 'computeBarrier', value: '*' },
        ], 
        doCompute: 'DataFlow_CodeIn',
        fileTypeName: 'Code In Label',
        fileType: 'text/javascript',
      },
      {
        label: 'Condition Here',
        category: 'DataFlow_CondInLabel',
        size: '240 80',
        in_: [
          { portId: '1in', name:'in' },
        ],
        out_: [
          { portId: '1out', name:'onTrue' },
          { portId: '2out', name:'onFalse' },
        ], 
        props_: [
          { name: 'computeBarrier', value: '*' },
        ], 
        doCompute: 'DataFlow_CondInLabel',
        fileTypeName: 'Condition In Label',
        fileType: 'text/javascript',
      },
      {
        label: 'TTS',
        category: 'DataFlow_BrowserTTS',
        size: '240 80',
        color: 'SkyBlue',
        in_: [
          { portId: '1in', name:'in', tooltip: 'this input expect a JSON object like\n{\n  "sender": "<voiceName>",\n  "text": "<text to speak"\n}' },
        ],
        out_: [
          { portId: '1out', name:'onStart', tooltip: 'this output generate an event\nwhen the TTS start to speak' },
          { portId: '2out', name:'onStop' , tooltip: 'this output generate an event\nwhen the TTS stop to speak'},
        ], 
        props_: [
          { name: 'voiceMap', value: '- {name: Alex, id: 0}', tooltip: 'this property defines the mapping\nbetween voice name and browser voice id.' },
        ], 
        doCompute: 'DataFlow_BrowserTTS',
        fileTypeName: 'Browser TTS',
        fileType: 'text/javascript',
      },
      {
        label: '',
        category: 'DataFlow_Merge',
        color: 'MediumVioletRed', 
        in_: [ 
          { portId:'1in', name:'in1' },
          { portId:'2in', name:'in2' },
        ],
        out_: [ 
          { portId:'1out', name:'out' },
        ],
        props_: [
          { name: 'computeBarrier', value: '*' },
        ],
        doCompute: 'DataFlow_Merge',
      },
      {
        category: 'DataFlow_Dispatch',
        props_: [        ],
        in_: [ 
          { portId:'1in', name:'in' },
        ],
        out_: [ 
          { portId:'1out', name:'out1' },
          { portId:'2out', name:'out2' },
        ],
        doCompute: 'DataFlow_Dispatch',
      },
      {
        category: 'DataFlow_DispatchBack',
        props_: [        ],
        in_: [ 
          { portId:'1in', name:'in' },
        ],
        out_: [ 
          { portId:'1out', name:'out1' },
          { portId:'2out', name:'out2' },
        ],
        doCompute: 'DataFlow_DispatchBack',
      },
      {
        label: 'Label',
        category: 'DataFlow_Message',
        alignment: "0 0.5 0 0",
        alignmentFocus: "0 0.5 0 0",
        isLabelEditable: true,
        size: "370 60",
        in_: [ 
          { portId:'1in', name:'in' },
        ],
        out_: [ 
          { portId:'1out', name:'out' },
        ],
        doCompute: 'DataFlow_Message',
      },
      {
        label: '&',
        category: 'DataFlow_DataWrap',
        color: 'seagreen', 
        in_: [ 
          { portId:'0in', name:'0' },
          { portId:'1in', name:'1' },
        ],
        out_: [ 
          { portId:'1out', name:'[]', tooltip: 'array' },
        ],
        doCompute: 'DataFlow_ArrayWrap',
        computeBarrier: '*',
      },
      {
        label: '&',
        category: 'DataFlow_DataWrap',
        color: 'seagreen', 
        in_: [ 
          { portId:'1in', name:'in1' },
          { portId:'2in', name:'in2' },
        ],
        out_: [ 
          { portId:'1out', name:'{}', tooltip: 'object' },
        ],
        doCompute: 'DataFlow_ObjectWrap',
        computeBarrier: '*',
      },
      {
        label: '⪢',
        category: 'DataFlow_DataWrap',
        color: 'seagreen', 
        in_: [ 
          { portId:'1in', name:'in1' },
          { portId:'2in', name:'in2' },
        ],
        out_: [ 
          { portId:'1out', name:'[]', tooltip: 'array' },
        ],
        doCompute: 'DataFlow_ArrayMerge',
        computeBarrier: '*',
      },
      {
        label: '⪢',
        category: 'DataFlow_DataWrap',
        color: 'seagreen', 
        in_: [ 
          { portId:'1in', name:'in1' },
          { portId:'2in', name:'in2' },
        ],
        out_: [ 
          { portId:'1out', name:'{}', tooltip: 'object' },
        ],
        doCompute: 'DataFlow_ObjectMerge',
        computeBarrier: '*',
      },
      {
        category: 'DataFlow_DataUnwrap',
        color: 'seagreen', 
        in_: [ 
          { portId:'1in', name:'[]' },
        ],
        out_: [ 
          { portId:'1out', name:'0' },
          { portId:'2out', name:'1' },
        ],
        doCompute: 'DataFlow_ArrayUnwrap',
      },
      {
        category: 'DataFlow_DataUnwrap',
        color: 'seagreen', 
        in_: [ 
          { portId:'1in', name:'{}' },
        ],
        out_: [ 
          { portId:'1out', name:'out1' },
          { portId:'2out', name:'out2' },
        ],
        doCompute: 'DataFlow_ObjectUnwrap',
      },
      {
        label: 'ROS Bridge',
        category: 'DataFlow_ROSServer',
        size: '240 80',
        color: 'LightCyan',
        in_: [
          { 
            portId: '1in', name:'doConnect',
            tooltip: "This input event triggers the ROS Server connection.",
          },
        ],
        out_: [
          { 
            portId: '1out', name:'status', 
            tooltip: "This output returns the ROS Server connection status as a string.",
          },
          { 
            portId: '2out', name:'rosServer',
            tooltip: "This output returns a ROS Server instance if connection is successful.",
          },
        ], 
        props_: [
          {
            name: "rosServerURL",
            value: "ws://172.26.1.108:9090",
            tooltip: "This defines the WebSocket URL of the ROS Server Bridge.",
          }
        ],
        fileTypeName: 'ROS Server',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_ROSServer',
      },
      {
        label: '/topicName',
        category: 'DataFlow_ROSTopic',
        size: '240 80',
        color: 'LightCyan',
        in_: [
          {
            portId: '1in', name:'rosServer',
            tooltip: "This input expects a ROS Server object\nfrom ROS Server component.",
          },
          {
            portId: '2in', name:'in',
            tooltip: "This input expects a data element of type defined in properties.\nThis datatype will be published as a ROS topic.",
          }
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "This output returns a data element of type defined in properties.\nThis datatype will be subscribed as a ROS topic.",
          }
        ],
        props_: [
          {
            name: "dataType",
            value: "std_msgs/Bool",
            tooltip: "ROS data type for in/out",
          }
        ],
        fileTypeName: 'ROS Topic',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_ROSTopic',
      },
      {
        label: '/ServiceName',
        category: 'DataFlow_ROSService',
        size: '240 80',
        color: 'LightCyan',
        in_: [
          {
            portId: '1in', name:'rosServer',
            tooltip: "This input expects a ROS Server object\nfrom ROS Server component.",
          },
          {
            portId: '2in', name:'arguments',
            tooltip: "This input expects a JSON object\nwith all parameters of the ROS service",
          }
        ],
        out_: [
          {
            portId: '1out', name:'response',
            tooltip: "This output returns a JSON object\nonce the ROS service is executed.",
          }
        ],
        props_: [
          {
            name: "serviceType",
            value: "hri_tts_msgs/Speak",
            tooltip: "ROS type used for this service",
          }
        ],
        fileTypeName: 'ROS Service',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_ROSService',
      },
      {
        label: '/ActionName',
        category: 'DataFlow_ROSAction',
        size: '240 80',
        color: 'LightCyan',
        in_: [
          {
            portId: '1in', name:'rosServer',
            tooltip: "This input expects a ROS Server object\nfrom ROS Server component.",
          },
          {
            portId: '2in', name:'goal',
            tooltip: "This input expects a JSON object defining\nthe goal of the ROS action.",
          }
        ],
        out_: [
          {
            portId: '1out', name:'feedback',
            tooltip: "This output returns a JSON object\nwhile ROS action is performed.",
          },
          {
            portId: '2out', name:'result',
            tooltip: "This output returns a JSON object\nafter completion of the ROS action.",
          }
        ],
        props_: [
          {
            name: "actionType",
            value: "your_package/YourActionType",
          }
        ],
        fileTypeName: 'ROS Action',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_ROSAction',
      },
      {
        label: 'Select Input',
        category: 'DataFlow_InputSelector',
        size: '240 80',
        color: 'Olive',
        in_: [
          {
            portId: '0in', name:'inputName',
            tooltip: "This input expects the name of the input to copy to out."
          },
          {
            portId: '1in', name:'in1',
            tooltip: 'This input expects any input type.\nName should fit the selected input name.',
          },
          {
            portId: '2in', name:'in2',
            tooltip: 'This input expects any input type.\nName should fit the selected input name.',
          }
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "This output returns the same content\nas the input whose input name is selected.",
          }
        ],
        props_: [
          {
            name: "isTriggerOnInputName",
            tooltip: "When true, this property defines that the input 'outputName'\ntriggers the component. Otherwise, it is triggered when all other inputs arrived.",
            value: "true",
          }
        ],
        fileTypeName: 'Input Selector',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_InputSelector',
      },
      {
        label: 'Select Output',
        category: 'DataFlow_OutputSelector',
        size: '240 80',
        color: 'Olive',
        in_: [
          {
            portId: '1in', name:'outputName',
            tooltip: "This input expects the name of the output to copy input to."
          },
          {
            portId: '2in', name:'in',
            tooltip: 'This input expects any input type.',
          }
        ],
        out_: [
          {
            portId: '1out', name:'out1',
            tooltip: "This output returns the same content\nas input if this outputname is selected."
          },
          {
            portId: '2out', name:'out2',
            tooltip: "This output returns the same content\nas input if this outputname is selected."
          }
        ],
        props_: [
          {
            name: "isTriggerOnOutputName",
            tooltip: "When true, this property defines that the input 'outputName'\ntriggers the component. Otherwise, the input 'in' triggers it.",
            value: "true",
          }
        ],
        fileTypeName: 'Output Selector',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_OutputSelector',
      },
      {
        label: 'Fire Value',
        category: 'DataFlow_FireValue',
        size: '240 80',
        color: 'Olive',
        in_: [
          {
            portId: '1in', name:'true',
            tooltip: 'If this input is an event, its name is propagated as value\n(the corresponding JavaScript data type).\nIf a data value is provided in the input,\nthat value is propagated',
          },
          {
            portId: '2in', name:'false',
            tooltip: 'If this input is an event, its name is propagated as value\n(the corresponding JavaScript data type).\nIf a data value is provided in the input,\nthat value is propagated',
          },
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: 'This output returns the input value from its name\nor a connected value data.',
          }
        ],
        fileTypeName: 'Fire Value',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_FireValue',
      },
      {
        label: 'ForEach',
        category: 'DataFlow_ForEach',
        size: '240 80',
        in_: [
          {
            portId: '1in', name:'object',
            tooltip: 'This input expects a JSON object/array.',
          },
          {
            portId: '2in', name:'doInit',
            tooltip: 'This input expects an event\nto restart the loop from the first item.',
          },
          {
            portId: '3in', name:'doNext',
            tooltip: 'This input expects an event to get the next element from the object.',
          }
        ],
        out_: [
          {
            portId: '1out', name:'key',
            tooltip: 'This output returns current key/index in the object/array',
          },
          {
            portId: '2out', name:'item',
            tooltip: 'This output returns the value of the current key/index',
          },
          {
            portId: '3out', name:'onEnd',
            tooltip: 'This output returns an event when doNext\nreaches the end of the object/array',
          }
        ],
        fileTypeName: 'ForEach',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_ForEach',
      },
      {
        label: 'Loop',
        category: 'DataFlow_Loop',
        size: '240 80',
        in_: [
          {
            portId: '1in', name:'fromIndex',
            tooltip: 'This input expects a number. Initial index.',
          },
          {
            portId: '2in', name:'toIndex',
            tooltip: 'This input expects a number. Final index (not included in loop).',
          },
          {
            portId: '3in', name:'doInit',
            tooltip: 'This input expects an event\nto restart the loop from the first index.',
          },
          {
            portId: '4in', name:'doNext',
            tooltip: 'This input expects an event to get the next index.',
          }
        ],
        out_: [
          {
            portId: '1out', name:'index',
            tooltip: 'This output returns current index.',
          },
          {
            portId: '2out', name:'onEnd',
            tooltip: 'This output returns an event when doNext\nreaches toIndex',
          }
        ],
        fileTypeName: 'Loop',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_Loop',
      },
      {
        label: 'Basic Stats',
        category: 'DataFlow_BasicStats',
        size: '240 80',
        in_: [
          {
            portId: '1in', name:'in',
            tooltip: 'This input expects a JSON array with numbers inside.',
          }
        ],
        out_: [
          {
            portId: '1out', name:'min',
            tooltip: 'This output returns the mininmum value in array',
          },
          {
            portId: '2out', name:'mean',
            tooltip: 'This output returns the mean value in array',
          },
          {
            portId: '3out', name:'std',
            tooltip: 'This output returns the standard deviation in array',
          },
          {
            portId: '4out', name:'max',
            tooltip: 'This output returns the maximum value in array',
          }
        ],
        fileTypeName: 'Basic Stats',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_BasicStats',
      },
      {
        label: 'Delayed Out',
        category: 'DataFlow_AsyncCall',
        size: '240 80',
        in_: [
          {
            portId: '1in', name:'in',
            tooltip: 'This input expects any input type.',
          }
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: 'This output returns the same content\as the input after delay',
          }
        ],
        props_: [
          {
            name: 'delay',
            value: '0.1',
            unit: 's',
            tooltip: 'Delay in [s] after which the input\nis trasfered to the output',
          }
        ],
        fileTypeName: 'Async Call',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_AsyncCall',
      },
      {
        label: 'StopWatch',
        category: 'DataFlow_StopWatch',
        size: '240 80',
        in_: [
          {
            portId: '1in', name:'start',
            tooltip: 'This input expects an event to start the watch.',
          },
          {
            portId: '2in', name:'stop',
            tooltip: 'This input expects an event to stop the watch.',
          }
        ],
        out_: [
          {
            portId: '1out', name:'time',
            tooltip: 'This output returns the measured time in [s]\nbetween start and stop events',
          },
          {
            portId: '2out', name:'timeString',
            tooltip: 'This output returns the time as a string in [s] and [ms]',
          }
        ],
        fileTypeName: 'StopWatch',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_StopWatch',
      },
      {
        label: 'Watchdog',
        category: 'DataFlow_Watchdog',
        size: '240 80',
        in_: [
          {
            portId: '1in', name:'in',
            tooltip: 'This input expects any input type.\nIt reset the timer and propagate the itself to the output.',
          },
          {
            portId: '2in', name:'start',
            tooltip: 'This input event start a timer\nwith a duration defined in properties.',
          },
          {
            portId: '3in', name:'timeOutIn',
            tooltip: 'This input expects any input type.\nIt value will be transferred to the output\nwhen the timer ends.',
          }
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "This output returns the same content\as the inputs 'in' before time out\nor as the input 'timeOutIn' after time out.",
          }
        ],
        props_: [
          {
            name: 'timeOut',
            value: '4',
            unit: 's',
            tooltip: "Time out in [s] after which the input 'timeOutIn'\nis transfered to the output unless\nan 'in' input is present before.",
          }
        ],
        fileTypeName: 'Watchdog',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_Watchdog',
      },
      {
        label: 'Set Output',
        category: 'DataFlow_SetOut',
        size: '240 80',
        color: 'LimeGreen',
        in_: [
          {
            portId: '1in', name:'doSet',
            tooltip: 'This input event triggers the setting of the output.',
          },
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "This output returns the data defined\nin the properties when doSet event occurs.",
          }
        ],
        props_: [
          {
            name: 'setValue',
            value: "''",
            tooltip: "Defines in yaml the value to return\nin the out when the event doClear arrives.",
          }
        ],
        fileTypeName: 'Set Out',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_SetOut',
      },
      {
        label: 'Pass through',
        category: 'DataFlow_PassOnTrigger',
        size: '240 80',
        color: 'LimeGreen',
        in_: [
          {
            portId: '1in', name:'in',
            tooltip: 'This input expects any input type.',
          },
          {
            portId: '2in', name:'doTrigger',
            tooltip: 'This input event triggers the transfer of the input to the output.',
          },
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "This output returns the data defined\nin the input when doTrigger event occurs.",
          }
        ],
        props_: [
          {
            name: 'isInputCleaned',
            value: false,
            tooltip: "if true, input is cleaned after each doTrigger.",
          }
        ],
        fileTypeName: 'Pass On Trigger',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_PassOnTrigger',
      },
      {
        label: 'Block On Trigger',
        category: 'DataFlow_BlockOnTrigger',
        size: '240 80',
        color: 'LimeGreen',
        in_: [
          {
            portId: '1in', name:'in',
            tooltip: 'This input expects any input type.',
          },
          {
            portId: '2in', name:'doTrigger',
            tooltip: 'This input event blocks only the next transfer of the input to the output.',
          },
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "This output returns the data defined\nin the input when doTrigger did not occured.",
          }
        ],
        fileTypeName: 'Block On Trigger',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_BlockOnTrigger',
      },
      {
        label: 'Gate',
        category: 'DataFlow_Gate',
        size: '240 80',
        color: 'LimeGreen',
        in_: [
          {
            portId: '1in', name:'gate',
            tooltip: 'This input state defined if the "in" is transfered to "out" or not.',
          },
          {
            portId: '2in', name:'in',
            tooltip: 'This input expects any input type.',
          },
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "This output returns the data defined\nin the input when gate == gateOn.",
          }
        ],
        props_: [
          { name: 'gateOn', value: 'true', tooltip: 'this property defines the active state of the gate (true or false)' },
        ],
        fileTypeName: 'Gate',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_Gate',
      },
      {
        label: 'Data to Event',
        category: 'DataFlow_ConvertToEvent',
        size: '240 80',
        color: 'Plum',
        in_: [
          {
            portId: '1in', name:'in',
            tooltip: 'This input expects any input type.',
          },
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "This output returns an event when the input occurs.",
          }
        ],
        fileTypeName: 'Convert To Event',
        fileType: 'text/javascript',
        doCompute: 'DataFlow_ConvertToEvent',
      },
      {
        label: "Set item in array",
        category: "DataFlow_SetInArray",
        size: "240 80",
        color: "MediumAquamarine",
        in_: [
          {
            portId: '1in', name:'array',
            tooltip: "Array to which item is added"
          },
          {
            portId: '2in', name:'item',
            tooltip: "Element to be added in array"
          },
          {
            portId: '3in', name:'index',
            tooltip: "Value of index when 'atIndex'\nand isIndexRandom=false"
          }
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "Updated array (inplace operation)"
          },
          {
            portId: '2out', name:'outIndex'
          }
        ],
        props_: [
          { name: 'computeBarrier', value: 'item', tooltip: 'this property defines the AND combination of \ninput names that will trigger a \n"doCompute" call in the component' },
          {
            name: "position",
            value: "atBottom",
            tooltip: "Set one of: atTop, atIndex, atBottom",
          },
          {
            name: "action",
            value: "set",
            tooltip: "Set one of: set, insert",
          },
          {
            name: "index",
            value: "0",
            tooltip: "Value of index when 'atIndex'\nis set and no index input connected"
          },
          {
            name: "isIndexRandom",
            value: "false",
            tooltip: "If true, then index is selected randomly (index input not used)",
          }
        ],
        fileTypeName: "Set In Array",
        fileType: "text/javascript",
        doCompute: 'DataFlow_SetInArray',
      },
      {
        label: "Get item from array",
        category: "DataFlow_GetFromArray",
        size: "240 80",
        color: "MediumAquamarine",
        in_: [
          {
            portId: '1in', name:'array',
            tooltip: "Array to which item is added"
          },
          {
            portId: '2in', name:'index',
            tooltip: "Value of index when 'atIndex'\nand isIndexRandom=false"
          }
        ],
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "Updated array (inplace operation)"
          },
          {
            portId: '2out', name:'outIndex'
          }
        ],
        props_: [
          { name: 'computeBarrier', value: 'array', tooltip: 'this property defines the AND combination of \ninput names that will trigger a \n"doCompute" call in the component' },
          {
            name: "position",
            value: "atBottom",
            tooltip: "Set one of: atTop, atIndex, atBottom",
          },
          {
            name: "action",
            value: "get",
            tooltip: "Set one of: get, extract",
          },
          {
            name: "index",
            value: "0",
            tooltip: "Value of index when 'atIndex'\nis set and no index input connected"
          },
          {
            name: "isIndexRandom",
            value: "false",
            tooltip: "If true, then index is selected randomly (index input not used)",
          }
        ],
        fileTypeName: "Get From Array",
        fileType: "text/javascript",
        doCompute: 'DataFlow_GetFromArray',
      },
      {
        label: "Name",
        category: "DataFlow_TunnelIn",
        size: "100 80",
        color: "Moccasin",
        in_: [
          {
            portId: '1in', name:'in',
            tooltip: "Any data entering the tunnel"
          }
        ],
        
        fileTypeName: "Tunnel In",
        fileType: "text/javascript",
        doCompute: 'DataFlow_TunnelIn',
      },
      {
        label: "Name",
        category: "DataFlow_TunnelOut",
        size: "100 80",
        color: "Moccasin",
        out_: [
          {
            portId: '1out', name:'out',
            tooltip: "Any data leaving the tunnel"
          }
        ],
        
        fileTypeName: "Tunnel Out",
        fileType: "text/javascript",
        doCompute: 'DataFlow_TunnelOut',
      },
    ],
    templateLinkList: [
      { category: 'DataFlow_Standard', template: dsl_BasicLink, param: { stroke:'black', toScale: 2, strokeWidth: 4, toShortLength:0 } },
      { category: 'DataFlow_Arrow',    template: dsl_BasicLink, param: { stroke:'SlateBlue', toArrow: 'standard', toScale: 2, strokeWidth: 4, toShortLength:10 }},
      { category: 'DataFlow_Log',      template: dsl_BasicLink, param: { stroke:'Gold', toScale: 2, strokeWidth: 4, toShortLength:0, hasLabelShape: true, labelShape: 'Ellipse', hasLabel: true } },
      { category: 'DataFlow_Pause',    template: dsl_BasicLink, param: { stroke:'DarkRed', toScale: 2, strokeWidth: 8, toShortLength:0, fromArrow:'DoubleLine' } },
      { category: 'DataFlow_Stop',     template: dsl_BasicLink, param: { stroke:'Red', toScale: 2, strokeWidth: 10, toShortLength:0, fromArrow:'DoubleLine' } },
    ],
    dataLinkList: [
      {
        category: 'DataFlow_Standard',
        fromPort: '',
        toPort: '',
      },
      {
        category: 'DataFlow_Arrow',
        fromPort: '',
        toPort: '',
      },
      {
        category: 'DataFlow_Log',
        fromPort: '',
        toPort: '',
        label: 'log',
      },
      {
        category: 'DataFlow_Pause',
        fromPort: '',
        toPort: '',
        label: 'log',
      },
      {
        category: 'DataFlow_Stop',
        fromPort: '',
        toPort: '',
        label: 'log',
      },
    ],
  };

  return( dsl );
}
//---------------------------
// Define DSL API helper functions
//---------------------------
// function DSL_stringifyTextJs( v ) {
//   let result = v;
//   let resultArray = [];
//   const lineList = v.split( '\n' );
//   for( let i = 0; i < lineList.length; ++i ) {
//     const tline = lineList[i].trim();
//     if( tline &&
//         !tline.startsWith( '//' ) &&
//         !tline.endsWith( '[' ) &&
//         !tline.endsWith( '{' ) &&
//         !tline.endsWith( ',' ) ) {
//       lineList[i] = `  ${lineList[i].trimEnd()},`;
//     } else {
//       lineList[i] = `  ${lineList[i]}`;
//     }
//   }
//   try {
//     resultArray = [ '{', ...lineList, '}' ];
//     //const value = `{\n${lineList.join( '\n' )}\n}`;
//     const value = resultArray.join( '\n' );
//     eval( `a = ${value}` );
//     result = value;
//   } catch (error) {
//     resultArray = [ '[', ...lineList, ']' ];
//     //const value = `[\n${lineList.join( '\n' )}\n]`;
//     const value = resultArray.join( '\n' );
//     eval( `a = ${value}` );
//     result = value;
//   }
//   return( resultArray ); 
// }
// function DSL_stringifyTextJSON( v ) {
//   let result = v;
//   const lineList = v.split( '\n' );
//   for( let i = 0; i < lineList.length; ++i ) {
//     const tline = lineList[i].trim();
//     if( tline &&
//         !tline.startsWith( '//' ) &&
//         !tline.endsWith( '[' ) &&
//         !tline.endsWith( '{' ) &&
//         !tline.endsWith( ',' ) ) {
//       lineList[i] = `  ${lineList[i].trimEnd()},`;
//     } else {
//       lineList[i] = `  ${lineList[i]}`;
//     }
//   }
//   try {
//     const value = `{\n${lineList.join( '\n' )}\n}`;
//     const v2 = eval( `a = ${value}` );
//     result = JSON.stringify( v2, null, 2 );
//   } catch (error) {
//     const value = `[\n${lineList.join( '\n' )}\n]`;
//     const v2 = eval( `a = ${value}` );
//     result = JSON.stringify( v2, null, 2 );
//   }
//   return( result.split( '\n') );
// }
// function DLS_Data_getJSON( data ) {
//   return( DSL_stringifyTextJSON( data.props_[0].name ) );
// }
// function DLS_Data_getJS( data ) {
//   return( DSL_stringifyTextJs( data.props_[0].name ) );
// }
// function DLS_Component_getTemplateNode( data ) {
//   let params = '';
//   for( const param of data.props_ ) {
//     if( param.valueChanged ) {
//       let name = param.name;
//       let value = '';
//       if( name.endsWith( 'Size' ) ) {
//         value = `go.Size.parse('${param.value}')`;
//       } else if( name.endsWith( 'Menu' ) && param.value == '' ) {
//         value = `null`;
//       } else if( name.endsWith( 'Spot' ) ) {
//         value = `go.Spot.${param.value}`; // TODO: Force Capital case of value
//       } else if( param.value.match(/true|false|^[+-]\d+(\.\d+)?/) ) {
//         value = param.value; // In case of true, false or float number
//       } else {
//         value = `'${param.value}'`;
//       }
//       params = params + `, ${name}: ${value}`;
//     }
//   }
 
//   // { category: 'DLS_Data', template: dsl_Component, param: { g, fill: 'SteelBlue', hasInputs: true, canAddInput: false } },
//   const result = `{ category: '${data.label}', template: ${data.category}, param: { g${params} } }`;
//   return( [result] );
// }

//---------------------------
// Define DSL API functions
//---------------------------
// function DLS_Data_get( data, ptype, pname ) {
  
//   const vPropertyList = {
//     fileContent:  DLS_Data_getJS,
//     JSON:  DLS_Data_getJSON,
//     JS: DLS_Data_getJS,
//   };
//   return( DSLInclude_get( vPropertyList, data, ptype, pname ) );
// }
// function DSL_Component_get( data, ptype, pname ) {
  
//   const vPropertyList = {
//     fileContent:  DLS_Component_getTemplateNode,
//     templateNode:  DLS_Component_getTemplateNode,
//     // Similar to category: 'label', + quote + array
//     category: ( d )=> [`'${d.label}'`],
//   };
//   return( DSLInclude_get( vPropertyList, data, ptype, pname ) );
// }
// // Keep var in the following lines
// var DSL_BasicNode_get = DSL_Component_get;
// var DSL_Picture_get = DSL_Component_get;
// var DSL_BasicLink_get = DSL_Component_get;


function DataFlow_JSON2Text( nodeData, name, value ) {
  //value = JSON.parse( value );
  if( !Array.isArray( value ) ) {
    value = [value];
  }
  const result = value.reduce( (acc, m)=> `${(acc? acc+'\n':'')}${m.role}> ${m.content}`,'')
  graphData.dfe.fireOutput( nodeData, 'out', result );
}
function DataFlow_Text2JSON( nodeData, name, value ) {
  const valueList = value.split( '\n' );
  let result = [];

  let role = '';
  let newRole = '';
  let content = '';
  let newContent = '';
  for( const line of valueList ) {
    switch( true ) {
      case line.startsWith( 'user> ' ):
        newRole = 'user'; 
        newContent = line.substring( newRole.length + 2 );
        break;
      case line.startsWith( 'assistant> ' ):
        newRole = 'assistant'; 
        newContent = line.substring( newRole.length + 2 );
        break;
      case line.startsWith( 'system> ' ):
        newRole = 'system'; 
        newContent = line.substring( newRole.length + 2 );
        break;
      default:
        content = content + '\n' + line;
    }
    if( newRole ) {
      if( role ) {
        result.push( {role, content} );
      }
      role = newRole;
      newRole = '';
      content = newContent;
    }
  }
  if( role ) {
    result.push( {role, content} );
  }
  //result = JSON.stringify( result );
  graphData.dfe.fireOutput( nodeData, 'out', result );
}
function DataFlow_ChatJSONSplitter( nodeData, name, value ) {
  let historyValue = [];
  let userValue = { role:"user", content:"" }; 
  //value = JSON.parse( value );
  const len = value.length;
  if( len ) {
    let lastIdx = len-1;
    if( value[lastIdx].role == 'user' ) {
      userValue.content = value[lastIdx].content;
    } else {
      ++lastIdx;
    }
    if( graphData.dfe.isOutputConnected( nodeData, 'history' ) ) {
      historyValue = value.slice( 0, lastIdx );
    }
  }
  //historyValue = JSON.stringify( historyValue );
  graphData.dfe.fireOutput( nodeData, 'history', historyValue );
  //userValue = JSON.stringify( userValue );
  graphData.dfe.fireOutput( nodeData, 'user', userValue );
}
function DataFlow_LLM( nodeData, name, value ) {
  if( name == 'doCompute' ) {
    const systemInput = graphData.dfe.getInput( nodeData, 'system', '' );
    const userInput = graphData.dfe.getInput( nodeData, 'user', '' );
    let history = graphData.dfe.get( nodeData, 'history', [] );
    
    let isNewChat = graphData.dfe.isInputNew( nodeData, 'system' );
    const hasHistory = graphData.dfe.getProperty( nodeData, 'hasHistory', false );
    
    if( !hasHistory ) {
      isNewChat = true;
    }
    
    if( isNewChat ) {
      // Empty history and add new system prompt
      //history.splice( 0, history.length );
      history = [];
      if( systemInput ) {
        const entry = { role: 'system', content: systemInput };
        history.push( entry );
      }
    }
    if( userInput ) {
      const entry = { role: 'user', content: userInput };
      // Update history
      history.push( entry );
    }

    // Pass all property to REST call
    const propertyList = graphData.dfe.getPropertyList( nodeData );
    graphData.chatGPT.setParamList( propertyList );
        
    // Ask chatGPT
    graphData.chatGPT.getResponse( history, (response)=>{
      if( hasHistory ) {
        // Update history
        history.push( { role: 'assistant', content: response } );
        graphData.dfe.set( nodeData, 'history', history );
      }
      // Genereate output
      graphData.dfe.fireOutput( nodeData, 'history', history );
      graphData.dfe.fireOutput( nodeData, 'assistant', response );
    });
  }
}
function DataFlow_Chat_get( data, ptype, pname ) {
  const vPropertyList = {
    fileContent:  (d)=> `<div id="chat-div-${d.key}"></div><script>DataFlow_Chat_initChat( ${d.key} );</script>`,
  };
  return( DSLInclude_get( vPropertyList, data, ptype, pname ) );
}
function DataFlow_Chat_initChat( dataKey ) {
  const hc = new HChat( `chat-div-${dataKey}`, '100%', '100%' );
  const dfe = DataFlowEngine.getInstance();
  dfe.setStorage( dataKey, 'chatInstance', hc );

  hc.registerEvent( 'onSend', (mi)=> DataFlow_Chat_sendMessage( dataKey, hc, mi ) );
  const nodeData = getNodeData( dataKey );
}
function DataFlow_Chat_initUserList( nodeData, hc ) {
  // Get userList input
  let userList = graphData.dfe.getInput( nodeData, 'userList', null );
  const dfe = DataFlowEngine.getInstance();
  if( !userList ) {
    // // If no input -> get userList property
    // const userListProperty = nodeData.props_.find( (p)=>p.name == 'userList' );
    // if( userListProperty ) {
    //   userList = jsyaml.load( userListProperty.value );
    // }
    // Alternative with DataFlowEngine
    const userListPropValue = dfe.getProperty( nodeData, 'userList', null );
    if( userListPropValue ) {
      userList = jsyaml.load( userListPropValue );
    }
  } // This is not an else
  if( userList ) {
    // If userList is defined (input or property)
    for( const userInfo of userList ) {
      const userName = userInfo.name;
      const userImageURL = userInfo.url.replace( '~', HChat.path );
      const isSender = ( userName.toLowerCase() != 'all' );
      const userColor = userInfo.color;
      hc.addUser( userName, userImageURL, userColor, isSender );
    }
  }
  // // Option 1
  // nodeData.props_.forEach( (p)=> hc.setProperty( p.name, jsyaml.load( p.value ) ));
  // Opition 2
  const propList = dfe.getPropertyList( nodeData );
  for( const name in propList ) {
    hc.setProperty( name, propList[name] );
  }
}
function DataFlow_Chat_sendMessage( dataKey, hc, messageInfo ) {
  const data = getNodeData( dataKey );
  const dialog = hc.getHistory( false );
  const history = hc.getHistory( true );
  graphData.dfe.fireOutput( data, 'history', history );
  graphData.dfe.fireOutput( data, 'dialog', dialog );
  graphData.dfe.fireOutput( data, 'allMessage', messageInfo );
  graphData.dfe.fireOutput( data, 'uiMessage', messageInfo );
}
function DataFlow_Chat( nodeData, name, value ) {
  const hc = graphData.dfe.getStorage( nodeData, 'chatInstance' );
  if( hc ) {
    if( name == 'clear' ) {
      hc.clear();
      DataFlow_Chat_initUserList( nodeData, hc );
    } else if( name == 'init' ) {
      hc.clear();
      hc.setHistory( value );
    } else if( name == 'selectSender' ) {
      if( value ) {
        hc.selectSender( value );
      }
    } else if( name == 'message' ) {
      hc.addMessage( value.sender, value.receiver, value.text );
      const history = hc.getHistory( true );
      graphData.dfe.fireOutput( nodeData, 'history', history );

      if( !value.sender.startsWith( '_' ) ) {
        const dialog = hc.getHistory( false );
        graphData.dfe.fireOutput( nodeData, 'dialog', dialog );
        graphData.dfe.fireOutput( nodeData, 'allMessage', value );
      }
    }
  }
}
function DataFlow_Message( nodeData, name, value ) {

  if( value !== undefined ) {
    if( typeof( value ) == 'string' ) {
      setNodeDataField( nodeData, 'label', value );
    } else {
      setNodeDataField( nodeData, 'label', JSON.stringify( value, null, 2 ) );
    }
  } else {
    value = nodeData.label;
    try {
      value = JSON.parse( value );
    } catch( e ) {
      try {
        //value = jsyaml.load( value );
      } catch( e ) {
      }
    }
  }

  graphData.dfe.fireOutput( nodeData, 'out', value );
}
function DataFlow_Template( nodeData, name, value ) {
  function applyTemplate( matcher, matcherBraceLen, templateStr, values, isKeepUnmatchedValues ) {
    let result = '';
    // Function to get key->value replacement
    const getKeyValue = ( matchStr )=> {
      const name = matchStr.substring( matcherBraceLen, matchStr.length-matcherBraceLen );
      if ( name in values) {
        const v = values[name];
        if( typeof( v ) == 'string' ) {
          return( v );
        } else if( typeof( v.value ) == 'string' ) {
          return( v.value );
        } else {
          return( JSON.stringify( v, null, 2 ) );
        }
      } else {
        if( isKeepUnmatchedValues ) {
          return( `${matchStr}`);
        } else {
          return( '' );
        }
      }
    }
    if( templateStr ) {
      //result = templateStr.replace( /<[^>]+>/g, getKeyValue );
      result = templateStr.replace( new RegExp( matcher, 'g' ), getKeyValue );
    }
    return( result );
  }
  if( name == 'doCompute' ) {
    const matcher = graphData.dfe.getProperty( nodeData, 'matcher', '<[^>]+>' );
    const matcherBraceLen = graphData.dfe.getProperty( nodeData, 'matcherBraceLen', 1 );
    const skipComments = graphData.dfe.getProperty( nodeData, 'skipComments', false );
    let tagList = graphData.dfe.getInputList( nodeData );
    // const inputNameList = graphData.dfe.getInputNameList( nodeData );
    // for( const inName of inputNameList ) {
    //   tagList[inName] = graphData.dfe.getInput( nodeData, inName, '' );
    // }
    const propertyList = graphData.dfe.getPropertyList( nodeData );
    tagList = Object.assign( tagList, propertyList );
    
    // True if all inputs arrived
    let templateStr = nodeData.fileContent;
    if( templateStr ) {
      if( skipComments ) {
        // Remove comments in the form: (% comment %)
        templateStr = templateStr.replaceAll( /\(%[\s\S]+?%\)\s*/gm, '' );
        //templateStr = templateStr.replaceAll( /\(%[^]+?%\)/gm, '' );
      }
      const value = applyTemplate( matcher, matcherBraceLen, templateStr, tagList );
      graphData.dfe.fireOutput( nodeData, 'out', value );
    }
  }
}
function DataFlow_Merge( nodeData, name, value ) {
  if( name == 'doCompute' ) {
    const inputNameList = graphData.dfe.getInputNameList( nodeData );
    const valueList = [];
    for( const inName of inputNameList ) {
      const inputValue = graphData.dfe.getInput( nodeData, inName, '' );
      if( inputValue ) {
        valueList.push( inputValue );
      }
    }
    
    const sep = nodeData.label || '\n';
    let value = valueList.join( sep );
    graphData.dfe.fireOutput( nodeData, 'out', value );
  }
}
function DataFlow_Dispatch( nodeData, name, value ) {
  const outputNameList = graphData.dfe.getOutputNameList( nodeData );

  for( const outName of outputNameList ) {
    if( graphData.dfe.isOutputConnected( nodeData, outName ) ) {
      graphData.dfe.fireOutput( nodeData, outName, value );
    } else {
      // If output is not connected, try fireByRef
      graphData.dfe.fireByRef( nodeData, outName, value );
    }
  }
}
function DataFlow_DispatchBack( nodeData, name, value ) {
  const outputNameList = graphData.dfe.getOutputNameList( nodeData ).reverse();

  for( const outName of outputNameList ) {
    if( graphData.dfe.isOutputConnected( nodeData, outName ) ) {
      graphData.dfe.fireOutput( nodeData, outName, value );
    } else {
      // If output is not connected, try fireByRef
      graphData.dfe.fireByRef( nodeData, outName, value );
    }
  }
}
function DataFlow_DataGate( nodeData, name, value ) {
  if( nodeData.buttons_[0].checked || name == 'reset' ) {
    DataFlow_Data( nodeData, name, value );
  }
}
function DataFlow_DataSend( nodeData, name, value ) {
  // We use 'store' to avoid to fire output
  DataFlow_Data( nodeData, 'store', value );
}
function DataFlow_Data( nodeData, name, value ) {
  let outValue = null;
  
  // Retrieve content
  let strValue = nodeData.fileContent;
    
  // value is undefined for pure event 
  if( value === undefined ) {
    outValue = strValue;
    try {
      outValue = JSON.parse( strValue );
    } catch (error) {}
    // switch( nodeData.fileType ) {
    //   case 'text/text':
    //     outValue = strValue;
    //     break;
    //   default: //'text/json'
    //     outValue = strValue;
    //     try {
    //       outValue = JSON.parse( strValue );
    //     } catch (error) {}
    //     break;
    // }
  } else {
    if( typeof( value ) == 'object' ) {
      strValue = JSON.stringify( value, null, 2 );
    } else {
      strValue = value;
    }
    switch( nodeData.fileType ) {
      case 'text/text':
        outValue = strValue;
        break;
      default: //'text/json'
        if( typeof( value ) == 'object' ) {
          outValue = value;
        } else {
          try {
            outValue = JSON.parse( value );
          } catch (error) {
            outValue = value;
          }
        }
        break;
    }

    // Set editor content in output link of Chat editor
    setNodeDataField( nodeData, 'fileContent', strValue );
  }
  
  DataFlow_Dispatch( nodeData, name, outValue );
}
function DataFlow_StateMachine( nodeData, name, value ) {
  const color = {
    active: 'Gold',
    inactive: 'Silver',
  };
  const isActive = graphData.dfe.get( nodeData, 'isActive', false );

  const getIfActive = function( aNodeData ) {
    const isActive = graphData.dfe.get( aNodeData, 'isActive', false );
    return( isActive? aNodeData: null ); 
  };
  const setActive = function( aNodeData, state ) {
    graphData.dfe.set( aNodeData, 'isActive', state );
    setNodeDataField( aNodeData.key, 'color', ( state? color.active: color.inactive ) );
  }

  if( name == 'in') {
    // Nothing to do
  } else if( name == 'doReset' ) {
    if( nodeData.group ) {
      // Get all fsm nodes
      const dataList = graphData.dfe.me.getNodeListIf( graphData.dfe.me.modelId, 
                                                (d)=> ( d.category == nodeData.category ) &&
                                                      ( d.group == nodeData.group ) );
      dataList.forEach( (d)=> setActive( d, false ) );
    }
    setActive( nodeData, false );
  } else {
    const nodeList = graphData.dfe.getInputNodeDataList( nodeData, 'in' );
    
    if( nodeList && nodeList.length ) {
      let activeParent = null;
      nodeList.find( (nd)=> activeParent = getIfActive( nd ) );
      
      if( activeParent ) {
        // Set parent inactive
        setActive( activeParent, false );
        // Set this node active
        setActive( nodeData, true );
        // Execute actions
        DataFlow_Dispatch( nodeData, 'in' );
      }
    } else { // If in have no connection (start node) ==> This node become active
      // Set this node active
      setActive( nodeData, true );
      // Execute actions
      DataFlow_Dispatch( nodeData, 'in' );
    }
  }
}
function DataFlow_BlinkLED( nodeData, name, value ) {
  let onColor = graphData.dfe.getProperty( nodeData, 'onColor', 'green' );
  let offColor = graphData.dfe.getProperty( nodeData, 'offColor', 'grey' );
  const map = {};
  map[onColor] = offColor;
  map[offColor] = onColor;

  if( name == 'doOn' ) {
    setNodeDataField( nodeData.key, 'color', onColor  );
  } else if( name == 'doOff' ) {
    setNodeDataField( nodeData.key, 'color', offColor  );
  } else if( name == 'doToggle' ) {
    setNodeDataField( nodeData.key, 'color', map[nodeData.color] );
  } else if( name == 'doBlink' ) {
    showEvent( 5 );
    
    function showEvent( count ) {
      //const color = ( nodeData.color == offColor? onColor: map[nodeData.color] );
      setNodeDataField( nodeData.key, 'color', map[nodeData.color] );
      if( count > 0 ) {
        setTimeout( ()=> showEvent( count-1 ), 500 );
      } else {
        setNodeDataField( nodeData.key, 'color', offColor  );
      }
    }
  }
}
function DataFlow_SystemEvent( nodeData, name, value ) {
  debugger
  graphData.dfe.fireOutput( nodeData, 'onGraphLoaded' );
}
function DataFlow_BrowserTTS( nodeData, name, value ) {

  const voiceMap = graphData.dfe.getProperty( nodeData, 'voiceMap', '' );
  const voiceMapList = jsyaml.load( voiceMap );
  let voiceId = 0;
  if( voiceMapList && voiceMapList.length ) {
    voiceMapList.forEach( (e)=> { if( value.sender == e.name ) voiceId = e.id } );
  }

  graphData.dfe.fireOutput( nodeData, 'onStart' );
  if( !value.text.endsWith( '(silence)' ) ) {
    saySentence( value.text, voiceId, fireOnStop );
  } else {
    fireOnStop();
  }

  function fireOnStop() {
    graphData.dfe.fireOutput( nodeData, 'onStop' )
  }
  function saySentence( message, voiceId, onEnd ) {
    // Select voice
    //let voiceId = 0;
    // VoiceList cache
    let voiceList = null;
    
    // Callback when tts finished speaking
    const onTTSEnd = ()=> {
      if( onEnd ) {
        onEnd();
      }
    }

    let isVoicePresent = false;
    let utterance = null;
    // Get voice
    utterance = new SpeechSynthesisUtterance( message );
    utterance.onerror = console.log;
    //console.log( 'say', this.voiceId, message);
    
    if( !voiceList || !voiceList.length ) {
      voiceList = speechSynthesis.getVoices();
    }
    
    // If we got the list of voices
    if( voiceList && voiceList.length ) {
      // Get a correct index for a voice
      const vIdx = voiceId % voiceList.length;
      // Set voice
      utterance.voice = voiceList[vIdx];
      isVoicePresent = true;
    }

    if( isVoicePresent && utterance ) {
      utterance.addEventListener( 'end', onTTSEnd, { once: true } );
      speechSynthesis.speak( utterance );
    } else {
      // Use heuristic timer to call the on end
      const timeout = Math.max( 2, message.length*200 );
      setTimeout( onTTSEnd, timeout );
    }
  }
}
function DataFlow_ROSServer( nodeData, name, value ) {

  if( name == 'doConnect' ) {
    let isRosConnected = true;
    let ros = graphData.dfe.get( nodeData, 'ros', null );
    if( !ros ) {
      const rosServerURL = graphData.dfe.getProperty( nodeData, 'rosServerURL', '' );
      if( rosServerURL ) {
        // Connect to the ROS Bridge WebSocket server
        ros = new ROSLIB.Ros({
          url: rosServerURL, // The WebSocket connection URL to your ROS Bridge server
        });
        graphData.dfe.set( nodeData, 'ros', ros );
        
        // This function is called upon a successful connection to ROS
        ros.on('connection', function() {
          const msg = 'Connected to ROS websocket server.';
          console.log( msg );
          graphData.dfe.fireOutput( nodeData, 'status', msg );
          graphData.dfe.fireOutput( nodeData, 'rosServer', ros );
        });
        
        // This function is called if the connection to ROS is closed
        ros.on('close', function() {
          const msg = 'Connection to ROS websocket server closed.';
          console.log( msg );
          graphData.dfe.fireOutput( nodeData, 'status', msg );
          graphData.dfe.set( nodeData, 'ros', null );
        });
        
        // This function is called if there's an error in the connection to ROS
        ros.on('error', function(error) {
          isRosConnected = false;
          const msg = 'Error connecting to ROS websocket server: '+error;
          console.log( msg );
          graphData.dfe.fireOutput( nodeData, 'status', msg );
        });
      } else {
        isRosConnected = false;
        graphData.dfe.fireOutput( nodeData, 'status', 'Error: rosServerURL not defined in properties' );
      }
    }    
  }
}
function DataFlow_ROSTopic( nodeData, name, value ) {

  if( name == 'rosServer' ) {
    const ros = value;
    graphData.dfe.set( nodeData, 'ros', ros );
    setSubscribeTopics( nodeData, ros );
  } else if( name == 'in' ) {
    const ros = graphData.dfe.get( nodeData, 'ros', null );
    const topicName = nodeData.label.toLowerCase();
    if( ros ) {
      const dataType = graphData.dfe.getProperty( nodeData, 'dataType', 'std_msgs/String' );
      // Define a ROS publisher.
      const topic = new ROSLIB.Topic({
        ros: ros,
        name: topicName,
        messageType: dataType,
      });
    
      // Define a new mwssage
      const message = new ROSLIB.Message( value );
      // Publish the message.
      topic.publish( message );
    }
  }
  function setSubscribeTopics( nodeData, ros ) {
    if( graphData.dfe.isOutputConnected( nodeData, 'out' ) ) {
      const topicName = nodeData.label.toLowerCase();
      const dataType = graphData.dfe.getProperty( nodeData, 'dataType', 'std_msgs/String' );
      
      // Create a new ROSLIB.Topic object to subscribe to a ROS topic
      const topic = new ROSLIB.Topic({
        ros: ros, // The ROSLIB.Ros connection handle
        name: topicName, // The name of the topic to subscribe to
        messageType: dataType, // The message type of the topic
      });
      
      // Define a callback function to handle received messages
      const onMessageReceived = ( message )=> {
        console.log('Received message on ' + topic.name + ': ' + message.data );
        let outValue = message.data;
        try {
          outValue = JSON.parse( message.data );
        } catch( e ) {}
        graphData.dfe.fireOutput( nodeData, 'out', outValue );
      }
      
      // Subscribe to the topic with the callback
      topic.subscribe( onMessageReceived );
    }
  }
}
function DataFlow_ROSService( nodeData, name, value ) {

  if( name == 'rosServer' ) {
    const ros = value;
    graphData.dfe.set( nodeData, 'ros', ros );
  } else if( name == 'arguments' ) {
    const ros = graphData.dfe.get( nodeData, 'ros', null );
    
    // Define the name of the ROS service you want to call
    const serviceName = nodeData.label.toLowerCase(); // Replace with your desired service name
    const serviceType = graphData.dfe.getProperty( nodeData, 'serviceType', '' );
    
    // Create a service client for the specified service
    const serviceClient = new ROSLIB.Service({
      ros,
      name: serviceName,
      serviceType,
    });
    
    // Define argumments
    const argList = graphData.dfe.getInput( nodeData, 'arguments', '' );
  
    // Define the service request
    const request = new ROSLIB.ServiceRequest( argList );

    // Call the service with the request
    serviceClient.callService( request, (response) => {
      console.log(`Service response received: ${JSON.stringify(response)}`);
      
      // Process the response here
      if( graphData.dfe.isOutput( nodeData, 'response' ) ) {
        graphData.dfe.fireOutput( nodeData, 'response', response );
      }
    });
  }
}
function DataFlow_ROSAction( nodeData, name, value ) {

  if( name == 'rosServer' ) {
    const ros = value;
    graphData.dfe.set( nodeData, 'ros', ros );
  } else if( name == 'goal' ) {
    const ros = graphData.dfe.get( nodeData, 'ros', null );
    
    // Define the name of the ROS action you want to call
    const serverName  = nodeData.label.toLowerCase();
    const actionName = graphData.dfe.getProperty( nodeData, 'actionType', '' );
    
    // Create an action client for the specified action
    const actionClient = new ROSLIB.ActionClient({
      ros,
      serverName,
      actionName,
    });
    
    // Create an action goal
    const actionGoal = new ROSLIB.Goal({
      actionClient: actionClient,
      goalMessage: value,
    });
    
    // Listen for action feedback
    actionGoal.on('feedback', (feedbackMessage) => {
      console.log(`Action feedback received: ${JSON.stringify(feedbackMessage)}`);
    
      if( graphData.dfe.isOutput( nodeData, 'feedback' ) ) {
        graphData.dfe.fireOutput( nodeData, 'feedback', feedbackMessage );
      }
    });
    
    // Send the action goal
    actionGoal.on( 'result', (resultMessage) => {
      console.log(`Action result received: ${JSON.stringify(resultMessage)}`);
      // Process the response here
      if( graphData.dfe.isOutput( nodeData, 'result' ) ) {
        graphData.dfe.fireOutput( nodeData, 'result', resultMessage );
      }
    });
    
    // Send the action goal and listen for feedback
    actionGoal.send();
  }
}
function DataFlow_InputSelector( nodeData, name, value ) {

  const isTriggerOnInputName = graphData.dfe.getProperty( nodeData, 'isTriggerOnInputName', true );
  if( ( name == 'inputName' ) && isTriggerOnInputName ) {
    const outValue = graphData.dfe.getInput( nodeData, value, null );

    graphData.dfe.fireOutput( nodeData, 'out', outValue );
  } else if(  ( name != 'inputName' ) && !isTriggerOnInputName ){
    const inputName = graphData.dfe.getInput( nodeData, 'inputName', null );
    if( name == inputName ) {
      graphData.dfe.fireOutput( nodeData, 'out', value );
    }
  }
}
function DataFlow_OutputSelector( nodeData, name, value ) {

  const isTriggerOnOutputName = graphData.dfe.getProperty( nodeData, 'isTriggerOnOutputName', true );
  if( ( name == 'outputName' ) && isTriggerOnOutputName ) {
    const outValue = graphData.dfe.getInput( nodeData, 'in', null );

    graphData.dfe.fireOutput( nodeData, value, outValue );
  } else if( ( name != 'outputName' ) && !isTriggerOnOutputName ){
    const outputName = graphData.dfe.getInput( nodeData, 'outputName', null );
    if( graphData.dfe.isOutput( nodeData, outputName ) ) {
      graphData.dfe.fireOutput( nodeData, outputName, value );
    }
  }
}
function DataFlow_AsyncCall( nodeData, name, value ) {
  const delay = graphData.dfe.getProperty( nodeData, 'delay', true );
  setTimeout( ()=> graphData.dfe.fireOutput( nodeData, 'out', value ), parseFloat( delay )*1000 );
}
function DataFlow_FireValue( nodeData, name, value ) {
  const outValue = value || jsyaml.load( name );
  graphData.dfe.fireOutput( nodeData, 'out', outValue );
}
function DataFlow_Watchdog( nodeData, name, value ) {
  if( name == 'in' ) {
    const timer = graphData.dfe.get( nodeData, 'timer', null );
    if( timer ) {
      clearTimeout( timer );
      graphData.dfe.set( nodeData, 'timer', null );
      graphData.dfe.fireOutput( nodeData, 'out', value );
    }
  } else if( name == 'start' ) {
    let timer = graphData.dfe.get( nodeData, 'timer', null );
    if( timer ) {
      clearTimeout( timer );
    }
    const timeOut = graphData.dfe.getProperty( nodeData, 'timeOut', 4 );
    timer = setTimeout( ()=> {
                                 const outValue = graphData.dfe.getInput( nodeData, 'timeOutIn', null );
                                 graphData.dfe.fireOutput( nodeData, 'out', outValue );
                                 graphData.dfe.set( nodeData, 'timer', null );
                               }, 
                               parseFloat( timeOut )*1000 );
    graphData.dfe.set( nodeData, 'timer', timer );
  }
}
function DataFlow_SetOut( nodeData, name, value ) {
  const setValue = graphData.dfe.getProperty( nodeData, 'setValue', '' );
  const cValue = jsyaml.load( setValue );
  graphData.dfe.fireOutput( nodeData, 'out', cValue );
}
function DataFlow_PassOnTrigger( nodeData, name, value ) {
  // isInputCleaned: true
  // doTrigger:   1        1    1           1     1
  //        in:        A            B   C
  //       out:             A                C      

  // isInputCleaned: false
  // doTrigger:   1        1    1           1     1
  //        in:        A            B   C
  //       out:             A    A           C     C

  // Update input values
  if( name == 'doTrigger' ) {
    const isInputCleaned = graphData.dfe.getProperty( nodeData, 'isInputCleaned', false );

    const outValue = graphData.dfe.getInput( nodeData, 'in', null );
    if( isInputCleaned ) {
      graphData.dfe.setInput( nodeData, 'in', null );
    }
    if( outValue != null ) {
      graphData.dfe.fireOutput( nodeData, 'out', outValue ); 
    }
  }
}
function DataFlow_BlockOnTrigger( nodeData, name, value ) {
  // doTrigger:   1              1      
  //        in:        A     B     C  D   E
  //       out:               B        D   E

  // Update input values
  if( name == 'doTrigger' ) {
    graphData.dfe.set( nodeData, 'isTriggerOn', true );
  } else {
    const isTriggerOn = graphData.dfe.get( nodeData, 'isTriggerOn', false );
    if( !isTriggerOn ) {
      graphData.dfe.fireOutput( nodeData, 'out', value );
    } else {
      graphData.dfe.set( nodeData, 'isTriggerOn', false );
    }
  }
}
function DataFlow_Gate( nodeData, name, value ) {
  //  gateOn: true
  //    gate:   T          F        T      
  //      in:      A    B      C  D   E
  //     out:       A    B             E

  //  gateOn: false
  //    gate:   F          T        F      
  //      in:      A    B      C  D   E
  //     out:       A    B             E

  // Update input values
  if( name == 'in' ) {
    // Get gateOn value
    const gateOn = graphData.dfe.getProperty( nodeData, 'gateOn', true );
    const gate = graphData.dfe.getInput( nodeData, 'gate', true );
    
    // Generate ouptut if gate on
    if( gateOn == gate ) {
      // Generate an output trigger
      graphData.dfe.fireOutput( nodeData, 'out', value );
    }
  }
}
function DataFlow_ConvertToEvent( nodeData, name, value ) {

  graphData.dfe.fireOutput( nodeData, 'out' );
}
function DataFlow_SetInArray( nodeData, name, value ) {

  if( name == 'doCompute' ) {
    const item = graphData.dfe.getInput( nodeData, 'item', null );
    const array = graphData.dfe.getInput( nodeData, 'array', [] );
    const action = graphData.dfe.getProperty( nodeData, 'action', 'set' );
    let index = graphData.dfe.getProperty( nodeData, 'index', 0 );
    const arrayLen = array.length;

    const position = graphData.dfe.getProperty( nodeData, 'position', 'atBottom' );
    switch( position ) {
      case 'atTop':
        index = 0;
        if( action == 'insert' ) {
          array.unshift( item );
        } else {
          array[index] = item;
        }
        break;
      case 'atIndex':
        const isIndexRandom = graphData.dfe.getProperty( nodeData, 'isIndexRandom', false );
        const indexInput = graphData.dfe.getInput( nodeData, 'index', -1 );
        index = ( indexInput == -1 )? index: indexInput;
        
        if( isIndexRandom ) {
          index = Math.floor( Math.random()*arrayLen );
        } else {
          index = Math.max( 0, Math.min( arrayLen-1, index ) );
        }
        
        if( action == 'insert' ) {
          array.splice( index, 0, item );
        } else {
          array[index] = item;
        }
        break;
      default: // atBottom
        index = arrayLen;
        if( action == 'insert' ) {
          array.push( item );
        } else {
          array[index] = item;
        }
        break;
    }
    graphData.dfe.fireOutput( nodeData, 'out', array );
    graphData.dfe.fireOutput( nodeData, 'outIndex', index );
  }
}
function DataFlow_GetFromArray( nodeData, name, value ) {

  if( name == 'doCompute' ) {
    const array = graphData.dfe.getInput( nodeData, 'array', [] );
    const action = graphData.dfe.getProperty( nodeData, 'action', 'get' );
    let index = graphData.dfe.getProperty( nodeData, 'index', 0 );
    const arrayLen = array.length;
    
    if( arrayLen > 0 ) {
      const position = graphData.dfe.getProperty( nodeData, 'position', 'atBottom' );
      let outValue = null;
      switch( position ) {
        case 'atTop':
          index = 0;
          if( action == 'extract' ) {
            outValue = array.shift();
          } else {
            outValue = array[index];
          }
          break;
        case 'atIndex':
          const isIndexRandom = graphData.dfe.getProperty( nodeData, 'isIndexRandom', false );
          const indexInput = graphData.dfe.getInput( nodeData, 'index', -1 );
          index = ( indexInput == -1 )? index: indexInput;
          
          if( isIndexRandom ) {
            index = Math.floor( Math.random()*arrayLen );
          } else {
            index = Math.max( 0, Math.min( arrayLen-1, index ) );
          }
          
          if( action == 'extract' ) {
            outValue = array[index];
            array.splice( index, 1 );
          } else {
            outValue = array[index];
          }
          break;
        default: // atBottom
          index = arrayLen-1;
          if( action == 'extract' ) {
            outValue = array.pop();
          } else {
            outValue = array[index];
          }
          break;
      }
      
      graphData.dfe.fireOutput( nodeData, 'array', array );
      graphData.dfe.fireOutput( nodeData, 'out', outValue );
      graphData.dfe.fireOutput( nodeData, 'outIndex', index );
    }
  }
}
function DataFlow_TunnelIn( nodeData, name, value ) {

  if( name == 'in' ) {
    const outNodeDataList = graphData.dfe.me.getNodeListBy( graphData.dfe.modelId, 'label', nodeData.label, (d)=> d.category == 'DataFlow_TunnelOut' );
    for( const outNodeData of outNodeDataList ) {
      DataFlow_TunnelOut( outNodeData, name, value );
    }
  }
}
function DataFlow_TunnelOut( nodeData, name, value ) {
  graphData.dfe.fireOutput( nodeData, 'out', value );
}
function DataFlow_ArrayWrap( nodeData, name, value ) {
  if( name == 'doCompute' ) {
    const outValue = [];
    const inNameList = graphData.dfe.getInputNameList( nodeData );
    for( const inName of inNameList ) {
      const value = graphData.dfe.getInput( nodeData, inName, null );
      outValue[inName] = value;
    }
    graphData.dfe.fireOutput( nodeData, '[]', outValue );
  }
}
function DataFlow_ObjectWrap( nodeData, name, value ) {
  if( name == 'doCompute' ) {
    const outValue = {};
    const inNameList = graphData.dfe.getInputNameList( nodeData );
    for( const inName of inNameList ) {
      const value = graphData.dfe.getInput( nodeData, inName, null );
      outValue[inName] = value;
    }
    graphData.dfe.fireOutput( nodeData, '{}', outValue );
  }
}
function DataFlow_ArrayMerge( nodeData, name, value ) {
  if( name == 'doCompute' ) {
    const outValue = [];
    const inNameList = graphData.dfe.getInputNameList( nodeData );
    for( const inName of inNameList ) {
      const value = graphData.dfe.getInput( nodeData, inName, null );
      outValue = outValue.concat( value );
    }
    graphData.dfe.fireOutput( nodeData, '[]', outValue );
  }
}
function DataFlow_ObjectMerge( nodeData, name, value ) {
  if( name == 'doCompute' ) {
    const outValue = {};
    const inNameList = graphData.dfe.getInputNameList( nodeData );
    for( const inName of inNameList ) {
      const value = graphData.dfe.getInput( nodeData, inName, null );
      Object.assign( outValue, value );
    }
    graphData.dfe.fireOutput( nodeData, '{}', outValue );
  }
}
function DataFlow_ArrayUnwrap( nodeData, name, value ) {
  const outNameList = graphData.dfe.getOutputNameList( nodeData );

  for( const outName of outNameList ) {
    const outValue = value[outName];
    graphData.dfe.fireOutput( nodeData, outName, outValue );
  }
}
function DataFlow_ObjectUnwrap( nodeData, name, value ) {
  DataFlow_ArrayUnwrap( nodeData, name, value );
}
function DataFlow_StopWatch( nodeData, name, value ) {
  if( name == 'start' ) {
    const startT = performance.now();
    graphData.dfe.set( nodeData, 'startT', startT );
  } else if( name == 'stop' ) {
    const endT = performance.now();
    const startT = graphData.dfe.get( nodeData, 'startT', 0 );
    const elapse = (endT-startT)/1000;
    const s = Math.trunc(elapse);
    const ms = Math.trunc((elapse - s)*1000);
    const outValue = `${s}s ${ms}ms`;
    graphData.dfe.fireOutput( nodeData, 'time', elapse );
    graphData.dfe.fireOutput( nodeData, 'timeString', outValue );
  }
}
function DataFlow_BasicStats( nodeData, name, value ) {
  if( name == 'in' ) {
    let min = Infinity;
    let max = -Infinity;
    let std = 0;
    let mean = 0;
    let sum = 0;
    let sum2 = 0;
    let len = value.length;
    value.forEach( v=> {
      if( v > max ) max = v;
      if( v < min ) min = v;
      sum += v;
    });
    mean = sum/len;
    value.forEach( v=> {
      sum2 += Math.pow( v-mean, 2 );
    });
    std = Math.sqrt( sum2/len );
    graphData.dfe.fireOutput( nodeData, 'min', min );
    graphData.dfe.fireOutput( nodeData, 'mean', mean );
    graphData.dfe.fireOutput( nodeData, 'std', std );
    graphData.dfe.fireOutput( nodeData, 'max', max );
  }
}
function DataFlow_ForEach( nodeData, name, value ) {

  if( name == 'doInit' ) {
    const object = graphData.dfe.getInput( nodeData, 'object', [] );
    const array = Object.keys( object );
    graphData.dfe.set( nodeData, 'array', array );
    if( array && array.length ) {
      const index = 0;
      graphData.dfe.set( nodeData, 'index', index );
      const key = array[index];
      graphData.dfe.fireOutput( nodeData, 'key', key );
      const outValue = object[key];
      graphData.dfe.fireOutput( nodeData, 'item', outValue );
    }
  } else if( name == 'doNext' ) {
    const object = graphData.dfe.getInput( nodeData, 'object', [] );
    const array = graphData.dfe.get( nodeData, 'array', [] );
    const index = graphData.dfe.get( nodeData, 'index', 0 ) + 1;
    if( index < array.length ) {
      graphData.dfe.set( nodeData, 'index', index );
      const key = array[index];
      graphData.dfe.fireOutput( nodeData, 'key', key );
      const outValue = object[key];
      graphData.dfe.fireOutput( nodeData, 'item', outValue );
    } else {
      graphData.dfe.fireOutput( nodeData, 'onEnd' );
    }
  }
}
function DataFlow_Loop( nodeData, name, value ) {
  if( name == 'doInit' ) {
    const fromIndex = graphData.dfe.getInput( nodeData, 'fromIndex', 0 );
    const index = fromIndex;
    graphData.dfe.set( nodeData, 'index', index );
    const outValue = index;
    graphData.dfe.fireOutput( nodeData, 'index', outValue );
  } else if( name == 'doNext' ) {
    const toIndex = graphData.dfe.getInput( nodeData, 'toIndex', 0 );
    const index = graphData.dfe.get( nodeData, 'index' ) + 1;
    if( index < toIndex ) {
      graphData.dfe.set( nodeData, 'index', index );
      graphData.dfe.fireOutput( nodeData, 'index', index );
    } else {
      graphData.dfe.fireOutput( nodeData, 'onEnd' );
    }
  }
}
function DataFlow_CodeIn( nodeData, name, value ) {
  if( name == 'doCompute' ) {
    let _evalCode = [];
    // Generate input variables with input values
    const inputNameList = graphData.dfe.getInputNameList( nodeData );
    inputNameList.forEach( n=> _evalCode.push( `let ${n} = graphData.dfe.getInput( nodeData, '${n}', '' );` ) );
    // Generate output variables for holding values to be fired (if not null)
    const outputNameList = graphData.dfe.getOutputNameList( nodeData );
    outputNameList.forEach( n=> {
      if( !inputNameList.includes( n ) ) { // Avoid redeclaration of output variables with same name as input
        _evalCode.push( `let ${n} = null;` ) 
      }
    });

    // First try to get code from property
    let _code = graphData.dfe.getProperty( nodeData, 'code', null );
    if( !_code ) {
      // If code is not in property, get it from label
      _code = nodeData.label;
    }
    _evalCode.push( _code );

    // Generate all fire output calls
    outputNameList.forEach( n=> _evalCode.push( `if( ${n} != null ) graphData.dfe.fireOutput( nodeData, '${n}', ${n} );` ) );

    try {
      // Run the code
      eval( _evalCode.join( '\n' ) );
    } catch( e ) {}
  }
}
function DataFlow_CondInLabel( nodeData, name, value ) {
  if( name == 'doCompute' ) {
    let _evalCode = [];

    // Generate input variables with input values
    const inputNameList = graphData.dfe.getInputNameList( nodeData );
    inputNameList.forEach( n=> _evalCode.push( `let ${n} = graphData.dfe.getInput( nodeData, '${n}', '' );` ) );
    // Generate output variables for holding values to be fired (if not null)
    const outputNameList = graphData.dfe.getOutputNameList( nodeData );
    outputNameList.forEach( n=> {
      if( !inputNameList.includes( n ) ) { // Avoid redeclaration of output variables with same name as input
        _evalCode.push( `let ${n} = null;` ) 
      }
    });

    // Result of condition evalution
    let _value = false;

    // If code is not in property, get it from label
    _code = nodeData.label;
    _evalCode.push( `_value = (${_code});` );

    try {
      // Run the code
      eval( _evalCode.join( '\n' ) );
    } catch( e ) {}
    
    // Fire output 
    if( _value ) {
      graphData.dfe.fireOutput( nodeData, 'onTrue' );
    } else {
      graphData.dfe.fireOutput( nodeData, 'onFalse' );
    }
  }
}
function DataFlow_ParseGPTObject( nodeData, name, value ) {
  if (name == 'in') {
  
    const dataFormat = graphData.dfe.getProperty( nodeData, 'dataFormat', 'json' );
    const outFormat = graphData.dfe.getProperty( nodeData, 'outFormat', 'array' );
  
    //const regex = /\`\`\`\s*json([\s\S]*?)\`\`\`/g; // Use global flag to match all occurrences
    const regex = new RegExp("\\`\\`\\`\\s*" + dataFormat + "([\\s\\S]*?)\\`\\`\\`", "g");
    let matches, outValue = [];
    while ((matches = regex.exec(value)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (matches.index === regex.lastIndex) {
        regex.lastIndex++;
      }
  
      // The match is in the second group (index 1)
      if (matches[1]) {
        // Remove any trailing comment
        const jsonStr = matches[1].replaceAll( /\s*\/\/.*/g, '' );
        try {
          // Parse each match as JSON and push to outValue array
          outValue.push(JSON.parse(jsonStr));
        } catch (e) {
          // If parsing fails, push the raw string
          outValue.push(jsonStr);
        }
      }
    }
  
    // If no matches were found, try parsing the entire value as JSON
    if (outValue.length === 0) {
      try {
        outValue = [JSON.parse(value)]; // Wrap in array to maintain array output
      } catch (e) {
        // If parsing fails, leave outValue as an empty array or push the raw value as a single element array
        outValue = [value]; // Optional: Decide based on requirements
      }
    }
    if( outFormat == 'array' ) {
      graphData.dfe.fireOutput(nodeData, 'out', outValue );
    } else {
      graphData.dfe.fireOutput(nodeData, 'out', outValue[0] );
    }
  }
}