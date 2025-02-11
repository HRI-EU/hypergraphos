/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
   DSL for list of buttons
*/
function CodeFlowDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}
function CodeFlowDSL_getDSL( g ) {
  let diagram = (g.diagram? g.diagram: g.nodePalette);

  const cm = g.contextMenu;
  cm.add( menuDSL, 'fileTypeMenu' );

  const fileTypeContextMenu = cm.getMenu( 'fileTypeMenu' );
 
  //-----------------------
  // Event Listener
  //-----------------------
  
  turnOnVisibitityOfButtonsProxy = function(evt) {
    turnOnVisibitityOfButtons(evt,diagram);
  }
  turnOffVisibitityOfButtonsProxy = function(evt) {
    turnOffVisibitityOfButtons(evt,diagram);
  }

  // Connectivity rules
  if( diagram ) {
    diagram.addDiagramListener( 'LinkDrawn',
      function(evt) {
        const linkCategory = {
          Code: {
            Code:         'CodeFlow_Code',
            Feature:      'x',
            Button:       'x',
            File:         'CodeFlow_Code',
            Bus:          'CodeFlow_Code',
            in:           'x',
          },
          Feature: {
            Code:         'x',
            Feature:      'CodeFlow_Feature',
            Button:       'x',
            File:         'CodeFlow_Feature',
            Bus:          'x',
            in:           'x',
        },
          Button: {
            Code:         'x',
            Feature:      'x',
            Button:       'x',
            File:         'CodeFlow_Button',
            Bus:          'x',
            in:           'x',
          },
          out_: {
            Code:         'x',
            Feature:      'x',
            Button:       'x',
            File:         'CodeFlow_Code',
            Bus:          'CodeFlow_Code',
            in:           'CodeFlow_Code',
          },
          Bus: {
            Code:         'x',
            Feature:      'x',
            Button:       'x',
            File:         'x',
            Bus:          'x',
            in:           'CodeFlow_Code',
          },
        };
        const link = evt.subject;
        const diagram = evt.diagram;
        const model = diagram.model;
        const linkData = model.findLinkDataForKey( link.data.key );
        const fromPort = linkData.fromPort;
        const toPort = linkData.toPort;
        const fromNode = link.fromNode;
        //const fromNodeColor = fromNode.findObject("MAIN").fill;
        const fromNodeColor = fromNode.data.color;
        const fromNodeCategory = fromNode.data.category;
        console.log(fromNodeColor);
        //if( (fromPort == 'out' && toPort != 'File') ) {
        if( fromNodeCategory.startsWith( 'CodeFlow_' ) ) {
          category = 'CodeFlow_Code';
          diagram.startTransaction( 'set link category' );
            //link.stroke = fromNodeColor;
            model.setDataProperty( linkData, 'color', fromNodeColor );
            model.setCategoryForLinkData( linkData, category );
          diagram.commitTransaction('set link category');
        }
        else if( fromPort && linkCategory[fromPort] && toPort && linkCategory[fromPort][toPort] ) {
          let category = linkCategory[fromPort][toPort];
          if( category == 'x' ) {
            diagram.startTransaction( 'delete link' );
              diagram.remove(link);
            diagram.commitTransaction('setLinkCategory');
          } else {
            diagram.startTransaction( 'set link category' );
              model.setDataProperty( linkData, 'color', fromNodeColor );
              model.setCategoryForLinkData( linkData, category );
            diagram.commitTransaction('set link category');
          }
        } else {
          //diagram.startTransaction( 'delete link' );
          //  diagram.remove(link);
          //diagram.commitTransaction('setLinkCategory');
        }
      }
    );
    diagram.addDiagramListener( 'ChangingSelection', turnOffVisibitityOfButtonsProxy );
    diagram.addDiagramListener( 'ChangedSelection', turnOnVisibitityOfButtonsProxy );
  }

  // Internal button function to propagate checkbox status
  function featureOnOff( event, obj ) {
    function swapColor( nodeData ) {
      const partColor = nodeData.color;
      const uncheckedColor = nodeData.buttons_[0].color;
      diagram.model.setDataProperty( nodeData, "color", uncheckedColor );
      diagram.model.setDataProperty( nodeData.buttons_[0], "color", partColor );
      const groupList = diagram.findNodesByExample({ label: nodeData.label, isGroup: true });
      if( groupList ) {
        const it = groupList.iterator;
        while( it.next() ) {
          const node = it.value;
          let groupColor = node.data.color;
          let colorSwap = node.data.colorSwap;
          if( !colorSwap ) {
            colorSwap = groupColor;
            groupColor = 'green';
          } else {
            const tmpColor = groupColor;
            groupColor = colorSwap;
            colorSwap = tmpColor;
          }
          diagram.model.setDataProperty( node.data, "color", groupColor );
          diagram.model.setDataProperty( node.data, "colorSwap", colorSwap );
        }
      }
    }
    function propagateState( node, isChecked ) {
      // Update status
      if( node.data.buttons_[0].checked != isChecked ) {
        diagram.model.setDataProperty( node.data.buttons_[0], 'checked', isChecked );
        swapColor( node.data );
      }

      // Find all links in fanout and update their status
      let nodeIterator = node.findNodesOutOf().iterator;
      while (nodeIterator.next()) {
        const node = nodeIterator.value;
        propagateState( node, isChecked );
      }
    }
    function uncheckAll( group ) {
      const groupNode = diagram.findNodeForKey( group );
      if( groupNode ) {
        const it = groupNode.memberParts;
        // Find all links in fanout and update their status
        while (it.next()) {
          const part = it.value;
          if( it.value instanceof go.Node ) {
            // part is a node
            const nodeData = it.value.data;
            if( nodeData.category.startsWith( 'CodeFlow_Feature' ) &&
                nodeData.buttons_[0].checked ) {
              diagram.model.setDataProperty( nodeData.buttons_[0], 'checked', false );
              swapColor( nodeData );
            }
          }
        }
      } else {
        alert( 'Warning: feature not in group!!' );
      }
    }
    const nodePart = obj.part;
    //const diagram = nodePart.diagram;
    const node = diagram.findNodeForKey( nodePart.key );
    const nodeData = node.data;
    diagram.startTransaction( "Check Box" );
      const targetState = !obj.data.checked;
      uncheckAll( nodeData.group );
      if( targetState ) {
        const isChecked = true;    
        propagateState( node, isChecked );
      }
    diagram.commitTransaction( "Check Box" );
  };

  
  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    templateNodeList: [
      { category: 'CodeFlow_Operator',        template: dsl_Component, param: { portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: true,  isTypeEditable: false, type: '@fileTypeName', hasValue: false, hasUnit: false,  figure: 'SquareUShape',    hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: true, canAddOutput: true, labelVerticalAlignment: 'left' } },
      { category: 'CodeFlow_OperatorIn',      template: dsl_Component, param: { portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: true,  isTypeEditable: false, type: '@fileTypeName', hasValue: false, hasUnit: false,  figure: 'SquareUShape',    hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: true, canAddOutput: true, isPortInside: true, } },
      { category: 'CodeFlow_Code',            template: dsl_Component, param: { portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: true,  isTypeEditable: false, type: '@fileTypeName', hasValue: true,  hasUnit: false,  figure: 'Rectangle',       hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: true,      typeMenu: fileTypeContextMenu, canAddInput: true, canAddOutput: true, } },
      { category: 'CodeFlow_CodeIn',          template: dsl_Component, param: { portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: true,  isTypeEditable: false, type: '@fileTypeName', hasValue: true,  hasUnit: false,  figure: 'Rectangle',       hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: true,      typeMenu: fileTypeContextMenu, canAddInput: true, canAddOutput: true, isPortInside: true, } },
      { category: 'CodeFlow_Merge',           template: dsl_Component, param: { portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: false, hasUnit: false,  figure: 'Rectangle',       hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: true, canAddOutput: false, isResizable: false, isLabelEditable: true, maxSize: new go.Size(0, NaN),  } },
      { category: 'CodeFlow_Multiplexer',     template: dsl_Component, param: { portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: false, hasUnit: false,  figure: 'RightPointSquare',hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: true, canAddOutput: false, isResizable: false, isLabelEditable: false, maxSize: new go.Size(20, NaN),  } },
      { category: 'CodeFlow_Demultiplexer',   template: dsl_Component, param: { portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: false, hasUnit: false,  figure: 'LeftPointSquare', hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: false, canAddOutput: true, isResizable: false, isLabelEditable: false, maxSize: new go.Size(20, NaN),  } },
      { category: 'CodeFlow_Library',         template: dsl_Component, param: { portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: true,  isTypeEditable: false, type: '@fileTypeName', hasValue: false, hasUnit: false,  figure: 'Rectangle',       hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasProperties: false,  } },
      { category: 'CodeFlow_Param',           template: dsl_Component, param: { portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: true,  hasUnit: false,  figure: 'BendedLeftRight', hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasProperties: true,  canAddProperties: true, } },
      { category: 'CodeFlow_Button',          template: dsl_Component, param: { portId: '',        isFromLinkable: false, isToLinkable: false, hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: true,  hasUnit: false,  figure: 'Rectangle',       hasInputs: false, hasOutputs: false, hasFunctionButtons: true,  hasProperties: true,  canAddProperties: false,  isFromLinkable: true,  isToLinkable: false, fromSpot: go.Spot.Center, toSpot:go.Spot.Center, buttonMinSize: new go.Size(70, 20), labelTextAlign: 'left', } },
      { category: 'CodeFlow_FeatureOnOff',    template: dsl_Component, param: { portId: 'Feature', isFromLinkable: true,  isToLinkable: true,  hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: false, hasUnit: false,  figure: 'Rectangle',       hasInputs: false, hasOutputs: false, hasFunctionButtons: true,  hasProperties: false, buttonInternalCallback: featureOnOff, isCheckBoxes: true, hasProperties: false, labelStroke: 'white',     fromSpot: go.Spot.Center, toSpot:go.Spot.Center, buttonStroke: 'white', labelTextAlign: 'left',} },
      { category: 'CodeFlow_Feature',         template: dsl_Component, param: { portId: 'Feature', isFromLinkable: true,  isToLinkable: true,  hasTag: false,  hasType: false, isTypeEditable: false,                        hasValue: false, hasUnit: false,  figure: 'Rectangle',       hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasProperties: false, labelStroke: 'white',     fromSpot: go.Spot.Right, toSpot:go.Spot.Left, buttonStroke: 'white', labelTextAlign: 'left',} },
      { category: 'CodeFlow_Bus',             template: dsl_BasicNode, param: { portId: 'Bus',     isFromLinkable: true,  isToLinkable: true,  hasTag: false,  hasType: false,  isTypeEditable: false, hasValue: false, hasUnit: false,  figure: 'ellipse',            minSize: new go.Size(40,40), labelTextAlign: 'center',                  labelStroke: 'black',  } },
      { category: 'CodeFlow_Message',         template: dsl_Component, param: { g, figure: 'RoundedRectangle', fill: 'LightYellow', hasInputs: true,  canAddInput: false, isInputEditable: false, hasOutputs: true, canAddOutput: false, isOutputEditable: false, hasTag: false, hasType:false, hasProperties: false, minSize: new go.Size(30,30), labelTextAlign: "left", isFromLinkable: false, isToLinkable: false, stroke: "transparent", labelFont: "45px sans-serif", isLabelWrap: true, isLabelEditable: false } },
    ],
    dataNodeList: [
      {
        label: 'Parameters',
        category: 'CodeFlow_Param',
        size: '180 40',
        color: 'sandybrown',
        props_: [
          { name: 'name1', value: 'value1' },
          { name: 'name2', value: 'value2' },
        ],
      },
      {
        label: 'Label',
        category: 'CodeFlow_Button',
        size: '180 40',
        color: 'YellowGreen', 
        buttons_: [
          {name: 'Generate', checked: false},
        ],
        'isFile': true,
        'fileContent': nodeButtonFileContent,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
     },
      {
        label: 'Label',
        category: 'CodeFlow_Button',
        size: '180 40',
        color: 'YellowGreen', 
        buttons_: [
          {name: 'Run', checked: false},
        ],
        'isFile': true,
        'fileContent': nodeButtonFileContent,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Label',
        category: 'CodeFlow_Button',
        color: 'YellowGreen', 
        size: '180 40',
        buttons_: [
          {name: 'Deploy', checked: false},
        ],
        props_: [
          { name: 'path', value: 'value1' },
        ],
       'isFile': true,
        'fileContent': nodeButtonFileContent,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Feature',
        category: 'CodeFlow_Feature',
        size: '180 40',
        color: 'RebeccaPurple', 
        buttons_: [
          {name: '', checked: false, color: 'green'},
        ],
      },
      {
        label: 'Release/version',
        category: 'CodeFlow_FeatureOnOff',
        size: '180 40',
        color: 'RebeccaPurple', 
        buttons_: [
          {name: '', checked: false, color: 'green'},
        ],
      },
      {
        label: 'Operator',
        category: 'CodeFlow_Operator',
        size: '180 100',
        color: 'orange', 
        in_: [ 
          { portId:'1in', name:'in' },
        ],
        out_: [ 
          { portId:'1out', name:'out' },
        ],
        'isFile': true,
        'fileContent': '',
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Operator',
        category: 'CodeFlow_OperatorIn',
        size: '180 100',
        color: 'orange', 
        in_: [ 
          { portId:'1in', name:'in' },
        ],
        out_: [ 
          { portId:'1out', name:'out' },
        ],
        'isFile': true,
        'fileContent': '',
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: '',
        category: 'CodeFlow_Merge',
        color: 'white', 
        props_: [        ],
        in_: [ 
          { portId:'1in', name:'in1' },
          { portId:'2in', name:'in2' },
        ],
        out_: [ 
          { portId:'1out', name:'out' },
        ],
      },
      {
        label: '',
        category: 'CodeFlow_Multiplexer',
        color: 'lightseagreen', 
        props_: [        ],
        in_: [ 
          { portId:'1in', name:'in1' },
          { portId:'2in', name:'in2' },
        ],
        out_: [ 
          { portId:'1out', name:'out' },
        ],
      },
      {
        label: 'Bus',
        size: '35 35',
        category: 'CodeFlow_Bus',
        color: 'lightseagreen',
        'isFile': true,
        'fileTypeName': 'Text',
        'fileType': 'text/text',
        'fileURL': '',
      },
      {
        label: '',
        category: 'CodeFlow_Demultiplexer',
        color: 'lightseagreen', 
        props_: [        ],
        in_: [ 
          { portId:'1in', name:'in' },
        ],
        out_: [ 
          { portId:'1out', name:'out1' },
          { portId:'2out', name:'out2' },
        ],
      },
      {
        label: 'Source Code',
        category: 'CodeFlow_Code',
        size: '180 100',
        color: 'orange', 
        props_: [
        ],
        in_: [ 
          { portId:'1in', name:'in1' },
          { portId:'2in', name:'in2' },
        ],
        out_: [ 
          { portId:'1out', name:'out' },
        ],
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Source Code',
        category: 'CodeFlow_CodeIn',
        size: '180 100',
        color: 'orange', 
        props_: [
        ],
        in_: [ 
          { portId:'1in', name:'in1' },
          { portId:'2in', name:'in2' },
        ],
        out_: [ 
          { portId:'1out', name:'out' },
        ],
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Common Code',
        category: 'CodeFlow_Library',
        size: '180 100',
        color: 'orange', 
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Label',
        category: 'CodeFlow_Message',
        alignment: "0 0.5 0 0",
        alignmentFocus: "0 0.5 0 0",
        size: "370 60",
        in_: [ 
          { portId:'1in', name:'in' },
        ],
        out_: [ 
          { portId:'1out', name:'out' },
        ],
        'doCompute': 'CodeFlow_Message',
      },
    ],
    templateLinkList: [
      { category: 'CodeFlow_Code',     template: dsl_BasicLink, param: {toScale: 2, strokeWidth: 4,toShortLength:0}},
      { category: 'CodeFlow_Feature',  template: dsl_BasicLink, param: {stroke:'RebeccaPurple', toArrow: 'standard', toScale: 2, strokeWidth: 4, toShortLength:10}},
      { category: 'CodeFlow_Button',   template: dsl_BasicLink, param: {stroke:'YellowGreen',  strokeWidth: 4,}},
    ],
    // Define link palette
    dataLinkList: [
      {
        category: 'CodeFlow_Code',
        fromPort: '',
        toPort: '',
      },
      {
        category: 'CodeFlow_Feature',
        fromPort: '',
        toPort: '',
      },
      {
        category: 'CodeFlow_Button',
        fromPort: '',
        toPort: '',
      },
    ],
  };

  return( dsl );
}