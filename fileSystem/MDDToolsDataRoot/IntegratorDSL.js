/*
   DSL for list of buttons
*/
function IntegratorDSL_includeList() {
  return(['/fileServer/DSLInclude.js']);
}
function IntegratorDSL_getDSL( g ) {
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
            Code:         'Integrator_Code',
            Feature:      'x',
            Button:       'x',
            File:         'Integrator_Code',
            Bus:          'Integrator_Code',
            in:           'x',
          },
          Feature: {
            Code:         'x',
            Feature:      'Integrator_Feature',
            Button:       'x',
            File:         'Integrator_Feature',
            Bus:          'x',
            in:           'x',
        },
          Button: {
            Code:         'x',
            Feature:      'x',
            Button:       'x',
            File:         'Integrator_Button',
            Bus:          'x',
            in:           'x',
          },
          out: {
            Code:         'x',
            Feature:      'x',
            Button:       'x',
            File:         'Integrator_Code',
            Bus:          'Integrator_Code',
            in:           'x',
          },
          Bus: {
            Code:         'x',
            Feature:      'x',
            Button:       'x',
            File:         'x',
            Bus:          'x',
            in:           'Integrator_Code',
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
        if( fromNodeCategory.startsWith( 'Integrator_' ) ) {
          category = 'Integrator_Code';
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
      const uncheckedColor = nodeData.buttons[0].color;
      diagram.model.setDataProperty( nodeData, "color", uncheckedColor );
      diagram.model.setDataProperty( nodeData.buttons[0], "color", partColor );
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
      if( node.data.buttons[0].checked != isChecked ) {
        diagram.model.setDataProperty( node.data.buttons[0], 'checked', isChecked );
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
      const it = groupNode.memberParts;
      // Find all links in fanout and update their status
      while (it.next()) {
        const part = it.value;
        if( it.value instanceof go.Node ) {
          // part is a node
          const nodeData = it.value.data;
          if( nodeData.category.startsWith( 'Integrator_Feature' ) &&
              nodeData.buttons[0].checked ) {
            diagram.model.setDataProperty( nodeData.buttons[0], 'checked', false );
            swapColor( nodeData );
          }
        }
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
      { category: 'Integrator_Operator',        template: dsl_Component, param: { portId: '',        fromLinkable: false, toLinkable: false, hasTag: false,  hasType: true,  editableType: false, type: '@fileTypeName', hasValue: false, hasUnit: false,  figure: 'SquareUShape',    hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: true, canAddOutput: true, } },
      { category: 'Integrator_OperatorIn',      template: dsl_Component, param: { portId: '',        fromLinkable: false, toLinkable: false, hasTag: false,  hasType: true,  editableType: false, type: '@fileTypeName', hasValue: false, hasUnit: false,  figure: 'SquareUShape',    hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: true, canAddOutput: true, isPortInside: true, } },
      { category: 'Integrator_Code',            template: dsl_Component, param: { portId: '',        fromLinkable: false, toLinkable: false, hasTag: false,  hasType: true,  editableType: false, type: '@fileTypeName', hasValue: true,  hasUnit: false,  figure: 'Rectangle',       hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: true,      typeMenu: fileTypeContextMenu, canAddInput: true, canAddOutput: true, } },
      { category: 'Integrator_CodeIn',          template: dsl_Component, param: { portId: '',        fromLinkable: false, toLinkable: false, hasTag: false,  hasType: true,  editableType: false, type: '@fileTypeName', hasValue: true,  hasUnit: false,  figure: 'Rectangle',       hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: true,      typeMenu: fileTypeContextMenu, canAddInput: true, canAddOutput: true, isPortInside: true, } },
      { category: 'Integrator_Merge',           template: dsl_Component, param: { portId: '',        fromLinkable: false, toLinkable: false, hasTag: false,  hasType: false, editableType: false,                        hasValue: false, hasUnit: false,  figure: 'Rectangle',       hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: true, canAddOutput: false, resizable: false, editable: false, maxSize: new go.Size(10, NaN),  } },
      { category: 'Integrator_Multiplexer',     template: dsl_Component, param: { portId: '',        fromLinkable: false, toLinkable: false, hasTag: false,  hasType: false, editableType: false,                        hasValue: false, hasUnit: false,  figure: 'RightPointSquare',hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: true, canAddOutput: false, resizable: false, editable: false, maxSize: new go.Size(20, NaN),  } },
      { category: 'Integrator_Demultiplexer',   template: dsl_Component, param: { portId: '',        fromLinkable: false, toLinkable: false, hasTag: false,  hasType: false, editableType: false,                        hasValue: false, hasUnit: false,  figure: 'LeftPointSquare', hasInputs: true,  hasOutputs: true,  hasFunctionButtons: false, hasProperties: false, canAddInput: false, canAddOutput: true, resizable: false, editable: false, maxSize: new go.Size(20, NaN),  } },
      { category: 'Integrator_Library',         template: dsl_Component, param: { portId: '',        fromLinkable: false, toLinkable: false, hasTag: false,  hasType: true,  editableType: false, type: '@fileTypeName', hasValue: false, hasUnit: false,  figure: 'Rectangle',       hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasProperties: false,  } },
      { category: 'Property_GraphInfo',         template: dsl_Component, param: { portId: '',        fromLinkable: false, toLinkable: false, hasTag: false,  hasType: false, editableType: false,                        hasValue: true,  hasUnit: false,  figure: 'File',            hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasProperties: true,  canAddProperties: false} },
      { category: 'Integrator_Param',           template: dsl_Component, param: { portId: '',        fromLinkable: false, toLinkable: false, hasTag: false,  hasType: false, editableType: false,                        hasValue: true,  hasUnit: false,  figure: 'BendedLeftRight', hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasProperties: true,  canAddProperties: true, } },
      { category: 'Integrator_Button',          template: dsl_Component, param: { portId: '',        fromLinkable: false, toLinkable: false, hasTag: false,  hasType: false, editableType: false,                        hasValue: true,  hasUnit: false,  figure: 'Rectangle',       hasInputs: false, hasOutputs: false, hasFunctionButtons: true,  hasProperties: true,  canAddProperties: false,  fromLinkable: true,  toLinkable: false, fromSpot: go.Spot.Center, toSpot:go.Spot.Center, buttonMinSize: new go.Size(70, 20), textAlign: 'left', } },
      { category: 'Integrator_FeatureOnOff',    template: dsl_Component, param: { portId: 'Feature', fromLinkable: true,  toLinkable: true,  hasTag: false,  hasType: false, editableType: false,                        hasValue: false, hasUnit: false,  figure: 'Rectangle',       hasInputs: false, hasOutputs: false, hasFunctionButtons: true,  hasProperties: false, buttonInternalCallback: featureOnOff, hasCheckBoxes: true, hasProperties: false, labelStroke: 'white',     fromSpot: go.Spot.Center, toSpot:go.Spot.Center, buttonStroke: 'white', textAlign: 'left',} },
      { category: 'Integrator_Feature',         template: dsl_Component, param: { portId: 'Feature', fromLinkable: true,  toLinkable: true,  hasTag: false,  hasType: false, editableType: false,                        hasValue: false, hasUnit: false,  figure: 'Rectangle',       hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasProperties: false, labelStroke: 'white',     fromSpot: go.Spot.Right, toSpot:go.Spot.Left, buttonStroke: 'white', textAlign: 'left',} },
      { category: 'Integrator_File',            template: dsl_BasicNode, param: { portId: 'File',    fromLinkable: true,  toLinkable: true,  hasTag: false,  hasType: true,  editableType: false, type: '@fileTypeName', hasValue: false, hasUnit: false,  figure: 'File',            minSize: new go.Size(150,40), textAlign: 'center',                  labelStroke: 'black', typeMenu: fileTypeContextMenu,  } },
      { category: 'Integrator_Bus',             template: dsl_BasicNode, param: { portId: 'Bus',     fromLinkable: true,  toLinkable: true,  hasTag: false,  hasType: false,  editableType: false, hasValue: false, hasUnit: false,  figure: 'ellipse',            minSize: new go.Size(40,40), textAlign: 'center',                  labelStroke: 'black',  } },
    ],
    dataNodeList: [
      {
        label: 'Graph Info',
        category: 'Property_GraphInfo',
        size: '180 40',
        color: 'SkyBlue',
        rows: [
          { name: 'Name', value: 'tbd' },
          { name: 'Version', value: '1.0' },
          { name: 'Date', value: '@getDate()' },
          { name: 'Path', value: './' },
          { name: 'Authors', value: 'Frankonello' },
        ],
      },
      {
        label: 'Parameters',
        category: 'Integrator_Param',
        size: '180 40',
        color: 'sandybrown',
        rows: [
          { name: 'name1', value: 'value1' },
          { name: 'name2', value: 'value2' },
        ],
      },
      {
        label: 'Label',
        category: 'Integrator_Button',
        size: '180 40',
        color: 'YellowGreen', 
        buttons: [
          {name: 'Generate', checked: false},
        ],
        'isFile': true,
        'fileContent': nodeButtonFileContent,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
     },
      {
        label: 'Label',
        category: 'Integrator_Button',
        size: '180 40',
        color: 'YellowGreen', 
        buttons: [
          {name: 'Run', checked: false},
        ],
        'isFile': true,
        'fileContent': nodeButtonFileContent,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Label',
        category: 'Integrator_Button',
        color: 'YellowGreen', 
        size: '180 40',
        buttons: [
          {name: 'Deploy', checked: false},
        ],
        rows: [
          { name: 'path', value: 'value1' },
        ],
       'isFile': true,
        'fileContent': nodeButtonFileContent,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Feature',
        category: 'Integrator_Feature',
        size: '180 40',
        color: 'RebeccaPurple', 
        buttons: [
          {name: '', checked: false, color: 'green'},
        ],
      },
      {
        label: 'Release/version',
        category: 'Integrator_FeatureOnOff',
        size: '180 40',
        color: 'RebeccaPurple', 
        buttons: [
          {name: '', checked: false, color: 'green'},
        ],
      },
      {
        label: 'Operator',
        category: 'Integrator_Operator',
        size: '180 100',
        color: 'orange', 
        in: [ 
          { portId:'in' },
        ],
        out: [ 
          { portId:'out' },
        ],
        'isFile': true,
        'fileContent': '',
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Operator',
        category: 'Integrator_OperatorIn',
        size: '180 100',
        color: 'orange', 
        in: [ 
          { portId:'in' },
        ],
        out: [ 
          { portId:'out' },
        ],
        'isFile': true,
        'fileContent': '',
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: '',
        category: 'Integrator_Merge',
        color: 'white', 
        rows: [        ],
        in: [ 
          { portId:'in0' },
          { portId:'in1' },
        ],
        out: [ 
          { portId:'out' },
        ],
      },
      {
        label: '',
        category: 'Integrator_Multiplexer',
        color: 'lightseagreen', 
        rows: [        ],
        in: [ 
          { portId:'in0' },
          { portId:'in1' },
        ],
        out: [ 
          { portId:'out' },
        ],
      },
      {
        label: 'Bus',
        size: '35 35',
        category: 'Integrator_Bus',
        color: 'lightseagreen',
        'isFile': true,
        'fileTypeName': 'Text',
        'fileType': 'text/text',
        'fileURL': '',
      },
      {
        label: '',
        category: 'Integrator_Demultiplexer',
        color: 'lightseagreen', 
        rows: [        ],
        in: [ 
          { portId:'in' },
        ],
        out: [ 
          { portId:'out1' },
          { portId:'out2' },
        ],
      },
      {
        label: 'Source Code',
        category: 'Integrator_Code',
        size: '180 100',
        color: 'orange', 
        rows: [
        ],
        in: [ 
          { portId:'in0' },
          { portId:'in1' },
        ],
        out: [ 
          { portId:'out' },
        ],
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Source Code',
        category: 'Integrator_CodeIn',
        size: '180 100',
        color: 'orange', 
        rows: [
        ],
        in: [ 
          { portId:'in0' },
          { portId:'in1' },
        ],
        out: [ 
          { portId:'out' },
        ],
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Common Code',
        category: 'Integrator_Library',
        size: '180 100',
        color: 'orange', 
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'File',
        size: '180 35',
        category: 'Integrator_File',
        color: 'lightseagreen',
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
        'fileURL': '',
      },
    ],
    templateLinkList: [
      { category: 'Integrator_Code',     template: dsl_BasicLink, param: {toScale: 2, strokeWidth: 4,toShortLength:0}},
      { category: 'Integrator_Feature',  template: dsl_BasicLink, param: {stroke:'RebeccaPurple', toArrow: 'standard', toScale: 2, strokeWidth: 4, toShortLength:10}},
      { category: 'Integrator_Button',   template: dsl_BasicLink, param: {stroke:'YellowGreen',  strokeWidth: 4,}},
    ],
    // Define link palette
    dataLinkList: [
      {
        category: 'Integrator_Code',
        fromPort: '',
        toPort: '',
      },
      {
        category: 'Integrator_Feature',
        fromPort: '',
        toPort: '',
      },
      {
        category: 'Integrator_Button',
        fromPort: '',
        toPort: '',
      },
    ],
  };

  return( dsl );
}