/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
============================================================================
Module: DSL File
Date: 10.07.2020
=============================================================================
*/

//--------------------------------------------------
// Define list of include files (Optional Function)
//--------------------------------------------------
function TreeDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}

//--------------------------------------------------
// Define setup of DSL
//--------------------------------------------------
function TreeDSL_setupDSL( g ) {
}

//--------------------------------------------------
// Define DSL Meta-Model and DSL Model
//--------------------------------------------------
function TreeDSL_getDSL( g ) {
  let diagram = (g.diagram? g.diagram: g.nodePalette);

  const cm = g.contextMenu;
  cm.add( menuDSL, 'treeDataTypeMenu' );

  const treeDataTypeMenu = cm.getMenu( 'treeDataTypeMenu' );
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
    diagram.addDiagramListener( 'ChangingSelection', turnOffVisibitityOfButtonsProxy );
    diagram.addDiagramListener( 'ChangedSelection', turnOnVisibitityOfButtonsProxy );
    diagram.addDiagramListener( 'ObjectContextClicked', (e,o)=> {console.log(e)} );
  }

  function findTreeSelectedItems( node ) {
    var items = [];
    var tree = node.findObject("TREE");
    if( tree ) {
      for( var iit = tree.elements; iit.next(); ) {
        var itempanel = iit.value;
        if( itempanel.background !== "transparent" ) {
          items.push(itempanel);
        }
      }
    }
    return items;
  }
  function addTreeRow(e, obj) {
    const incrementArrayName = function( itemArray, i, level ) {
      const itemLen = itemArray.length;
      while( ++i < itemLen ) {
        if( itemArray[i].level == level ) {
          itemArray[i].name = ''+(parseInt( itemArray[i].name )+1);
          const item = itemArray[i];
          diagram.model.removeArrayItem( itemArray, i );
          diagram.model.insertArrayItem( itemArray, i, item );
        } else if( itemArray[i].level < level ) {
          break;
        }
      }
    };
    const getParentType = function( itemArray, i ) {
      let result = 'Object';
      const level = itemArray[i].level;
      while( i > 0 ) {
        if( itemArray[--i].level < level ) {
          result = itemArray[i].type;
          break;
        }
      }
      return( result );
    };

    const node = obj.part;
    if (node) {
      const selecetedItems = findTreeSelectedItems( node );
      let diagram = node.diagram;
      diagram.startTransaction("Add tree row");
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      //let level = 0;
      //let name = 'name';
      const newItem = { "level": '0', "name": 'name', "value": "value", "type": "Data" };
      // If at least one selected row
      if ( selecetedItems.length > 0) {  
        // Consider last selected row
        const selectIndex = selecetedItems.length - 1;
        const panel = selecetedItems[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData.props_;
        const itemData = panel.data;
        itemIndex = itemArray.indexOf(itemData);
        const itemRow = nodeData.props_[itemIndex];
        newItem.level = itemRow.level+( itemRow.type == 'Data'? 0: 1 );
        if( itemRow.type == 'Array' ) {
          newItem.name = '0';
          //newItem.isKeyEditable = false;
          incrementArrayName( itemArray, itemIndex, itemRow.level+1 );
        } else if( itemRow.type == 'Data' ) {
          const parentType = getParentType( itemArray, itemIndex );
          if( parentType == 'Array' ) {
            newItem.name = ''+(parseInt( itemArray[itemIndex].name )+1);
            //newItem.isKeyEditable = false;
            incrementArrayName( itemArray, itemIndex, itemRow.level );
          }
        }
      } else {
        nodeData = node.data;
        itemArray = nodeData.props_;
      }

      diagram.model.insertArrayItem(itemArray, itemIndex+1, newItem );
      diagram.commitTransaction("Add tree row");
    }
  }
  function deleteTreeRow(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findTableSelectedItems( node );
      if (items.length > 0) {  // if there are any selected items, delete them
        let diagram = node.diagram;
        diagram.startTransaction("Delete table row");
        for( let i = 0; i < items.length; i++ ) {
          const panel = items[i];
          const nodeData = panel.part.data;
          const itemArray = nodeData.props_;
          const itemData = panel.data;
          const itemIndex = itemArray.indexOf(itemData);
          diagram.model.removeArrayItem(itemArray, itemIndex);
        }
        diagram.commitTransaction("Delete table row");
      }
    }
  }
  //---------------------------
  // Define DSL API functions
  //---------------------------
  function TreeDSL_stringifyTextJs( v ) {
    let result = v;
    const lineList = v.split( '\n' );
    for( let i = 0; i < lineList.length; ++i ) {
      const tline = lineList[i].trim();
      if( tline &&
          !tline.startsWith( '//' ) &&
          !tline.endsWith( '[' ) &&
          !tline.endsWith( '{' ) &&
          !tline.endsWith( ',' ) ) {
        lineList[i] = `  ${lineList[i].trimEnd()},`;
      } else {
        lineList[i] = `  ${lineList[i]}`;
      }
    }
    try {
      const value = `{\n${lineList.join( '\n' )}\n}`;
      eval( `a = ${value}` );
      result = value;
    } catch (error) {
      const value = `[\n${lineList.join( '\n' )}\n]`;
      eval( `a = ${value}` );
      result = value;
    }
    return( result );
  }

  function TreeDSL_stringifyTextJSON( v ) {
    let result = v;
    const lineList = v.split( '\n' );
    for( let i = 0; i < lineList.length; ++i ) {
      const tline = lineList[i].trim();
      if( tline &&
          !tline.startsWith( '//' ) &&
          !tline.endsWith( '[' ) &&
          !tline.endsWith( '{' ) &&
          !tline.endsWith( ',' ) ) {
        lineList[i] = `  ${lineList[i].trimEnd()},`;
      } else {
        lineList[i] = `  ${lineList[i]}`;
      }
    }
    try {
      const value = `{\n${lineList.join( '\n' )}\n}`;
      const v2 = eval( `a = ${value}` );
      result = JSON.stringify( v2, null, 2 );
    } catch (error) {
      const value = `[\n${lineList.join( '\n' )}\n]`;
      const v2 = eval( `a = ${value}` );
      result = JSON.stringify( v2, null, 2 );
    }
    return( result );
  }
  function Tree_JsonNode_getJSON( data ) {
    return( TreeDSL_stringifyTextJSON( data.value ) );
  }
  function Tree_JsonNode_getJS( data ) {
    return( TreeDSL_stringifyTextJs( data.value ) );
  }

  // _get( node ) -> fileContent || label || key
  // _get( node, 'label' )
  // _get( node, 'field', 'label' )
  // _get( node, 'inputList' ) -> array of inputs
  // _get( node, 'input', 'in1' )
  // _get( node, 'property', 'path' )
  function DSLInclude_get( vPropertyList, data, ptype, pname ) {
    const isDefined = (name)=> {
      return( data[name] !== null && data[name] !== undefined );
    }
    let type, name;
    if( pname ) {
      name = pname;
    } else {
      name = ptype || ( isDefined( 'fileContent' )? 'fileContent': isDefined( 'label' )? 'label': 'key' );
      ptype = undefined;
    }
    if( ptype ) {
      type = ptype;
    } else {
      type = 'field';
    }

    switch( type ) {
      case 'field':
        if( vPropertyList[name] )
          return( vPropertyList[name]( data ) );
        else
          return( data[name] );
      case 'input':
        if( data.in_ )
          return( data.in_.find( e => e.name == name ) );
        else
          return( undefined );
      case 'output':
        if( data.out_ )
          return( data.out_.find( e => e.name == name ) );
        else
          return( undefined );
      case 'property':
        if( data.props_ )
          return( data.props_.find( e => e.name == name ) );
        else
          return( undefined );
      case 'inputList':
        return( data.in_ )
      case 'outputList':
        return( data.out_ )
      case 'propertyList':
        return( data.props_ );
    }
  }
  function Tree_JsonNode_get( data, ptype, pname ) {
    const vPropertyList = {
      'JSON':  Tree_JsonNode_getJSON,
      'JS': Tree_JsonNode_getJS,
    };
    return( DSLInclude_get( vPropertyList, data, ptype, pname ) );
  }

  //----------------------------------
  // Define DSL Meta-Models functions
  //----------------------------------
  const dsl_TreeNode = (param)=> {
    param = ( param? param: {} );
    // NODE SHAPE
    param.figure = ( param.figure? param.figure: "rectangle" );
    param.fill = ( param.fill? param.fill: "white" );
    param.stroke = ( param.stroke? param.stroke: "black" );
    param.strokeWidth = ( param.strokeWidth? param.strokeWidth: 1 );
    param.isResizable = ( param.isResizable !== undefined? param.isResizable: true );
    param.minSize = ( param.minSize? param.minSize: new go.Size(40, 40));
    param.maxSize = ( param.maxSize? param.maxSize: new go.Size(NaN, NaN));
    param.portId = ( param.portId? param.portId: "" );
    // NODE INPUT CONNECTIVITY
    param.fromSpot = ( param.fromSpot? param.fromSpot: go.Spot.Bottom );
    param.isFromLinkable = ( param.isFromLinkable !== undefined? param.isFromLinkable: true );
    param.isFromLinkableSelfNode = ( param.isFromLinkableSelfNode !== undefined? param.isFromLinkableSelfNode: false );
    param.isFromLinkableDuplicates = ( param.isFromLinkableDuplicates !== undefined? param.isFromLinkableDuplicates: false );
    param.fromMaxLinks = ( param.fromMaxLinks !== undefined? param.fromMaxLinks: Infinity );
    // NODE OUTPUT CONNECTIVITY
    param.toSpot = ( param.toSpot? param.toSpot: go.Spot.Top );
    param.isToLinkable = ( param.isToLinkable !== undefined? param.isToLinkable: true );
    param.isToLinkableSelfNode = ( param.isToLinkableSelfNode !== undefined? param.isToLinkableSelfNode: false );
    param.isToLinkableDuplicates = ( param.isToLinkableDuplicates !== undefined? param.isToLinkableDuplicates: false );
    param.toMaxLinks = ( param.toMaxLinks !== undefined? param.toMaxLinks: Infinity );
    // NODE LABEL
    param.label = ( param.label !== undefined? param.label: '' );
    param.labelStroke = ( param.labelStroke? param.labelStroke: "Black" );
    param.isLabelEditable = ( param.isLabelEditable !== undefined? param.isLabelEditable: true );
    param.isLabelMultiline = ( param.isLabelMultiline !== undefined? param.isLabelMultiline: true );
    param.labelTextAlign = ( param.labelTextAlign? param.labelTextAlign: "center" );
    param.labelFont = ( param.labelFont? param.labelFont: "18px sans-serif" );
    param.labelMargin = ( param.labelMargin? param.labelMargin: 0 );
    // NODE PROPERTIES
    param.canAddProperties = ( param.canAddProperties !== undefined? param.canAddProperties: true );
    param.itemFill = ( param.itemFill? param.itemFill: "white" );
    param.itemMinSize = ( param.itemMinSize? param.itemMinSize: new go.Size(150, 1) );
    param.separatorStroke = ( param.separatorStroke? param.separatorStroke: "gray" );
    // KEY PROPERTY
    param.keyFont = ( param.keyFont? param.keyFont: "bold 13px sans-serif" );
    param.keyStroke = ( param.keyStroke? param.keyStroke: "Black" );
    param.isKeyEditable = ( param.isKeyEditable !== undefined? param.isKeyEditable: true );
    param.keyMenu = ( param.keyMenu !== undefined? param.keyMenu: treeDataTypeMenu );    
    // VALUE PROPERTY
    param.hasValue = ( param.hasValue !== undefined? ( param.hasUnit? true: param.hasValue ): true );
    param.valueStroke = ( param.valueStroke? param.valueStroke: "Black" );
    param.valueFont = ( param.valueFont? param.valueFont: "13px sans-serif" );
    param.isValueEditable = ( param.isValueEditable !== undefined? param.isValueEditable: true );
    // NODE SELECTION 
    param.selectFill = ( param.selectFill? param.selectFill: "dodgerblue" );

    linkExtra = commonLinkProps(param);

    let textBinding = new go.Binding("text", "label").makeTwoWay();
    if( param.label && param.label.startsWith('@') ) {
      textBinding = new go.Binding("text", param.label.substring(1)).makeTwoWay();
    }    

    let addPropertyButton = {};
    let deletePropertyButton ={};
    if( param.canAddProperties ) {
      addPropertyButton =
      $("Button",
        { 
          name: "HIDE ON DESELECT",
          alignment: go.Spot.Left,
          visible: false,
        },
        $(go.Shape, "PlusLine", { width: 8, height: 8 }),
        { click: addTreeRow }
      );
      deletePropertyButton =
      $("Button",
        { 
          name: "HIDE ON DESELECT",
          alignment: go.Spot.Right,
          visible: false,
        },
        $(go.Shape, "minusLine", { width: 8, height: 8 }),
        { click: deleteTreeRow }
      );
    }

    return( 
      $(go.Node, "Spot",
        {
          resizable: param.isResizable,
          locationObjectName: "BODY",  
          resizeObjectName: 'BODY',
          locationSpot: go.Spot.Center,
        },
        new go.Binding("location", "location",go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, "Vertical",
          $(go.Panel, "Auto",
            { 
              stretch: go.GraphObject.Fill,
            },
            $(go.Shape,
              {
                name: "BODY",
                stretch: go.GraphObject.Fill,
                figure: param.figure, 
                fill: param.fill, 
                stroke: param.stroke,
                strokeWidth: param.strokeWidth,
                minSize: param.minSize, 
                maxSize: param.maxSize, 
                cursor: "pointer",  // the Shape is the port, not the whole Node
              },
              linkExtra,
              new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
              new go.Binding("fill", "color").makeTwoWay()
            ),
            $(go.TextBlock,
              { 
                name: "LABEL",
                //background: "red",
                minSize: new go.Size(NaN, 20), 
                text: param.label,
                stroke: param.labelStroke,
                editable: param.isLabelEditable,
                isMultiline: param.isLabelMultiline,
                textAlign: param.labelTextAlign,
                margin: param.labelMargin,
                font: param.labelFont,
                overflow: go.TextBlock.OverflowEllipsis,
                verticalAlignment: go.Spot.Center,
              },
              textBinding
            ), // Text Block
          ),
          $(go.Panel, "Vertical",
            {
              name: "TREE", 
              stretch: go.GraphObject.Horizontal, 
              background: param.itemFill, 
              //stretch: go.GraphObject.None,
              minSize: param.itemMinSize,
              itemTemplate: 
                $(go.Panel, "Horizontal", 
                  { 
                    alignment: go.Spot.Left,
                    stretch: go.GraphObject.Horizontal,
                    background: 'transparent', 
                    // allow the user to select items -- the background color indicates whether "selected"
                    click: function(e, item) {
                      // assume "transparent" means not "selected", for items
                      var oldskips = item.diagram.skipsUndoManager;
                      item.diagram.skipsUndoManager = true;
                      if (item.background === 'transparent') {
                        item.background = param.selectFill;
                      } else {
                        item.background = 'transparent';
                      }
                      item.diagram.skipsUndoManager = oldskips;
                    }
                  },
                  $(go.TextBlock,
                    {
                      margin: new go.Margin(0, 2),
                      stretch: go.GraphObject.Horizontal,
                      font: param.keyFont,
                      stroke: param.keyStroke,
                      wrap: go.TextBlock.None,
                      overflow: go.TextBlock.OverflowEllipsis,
                      editable: param.isKeyEditable,
                      fromLinkable: false, 
                      toLinkable: false,
                      contextMenu: param.keyMenu,
                    },
                    new go.Binding("editable", "isKeyEditable").makeTwoWay(),
                    new go.Binding("name", "id").makeTwoWay(),
                    new go.Binding("text", "name").makeTwoWay(),
                    new go.Binding("margin", "level", ( d )=> {
                      const marginLeft = 2+10*( d? d: 0 );
                      return( new go.Margin( 0, 0, 0, marginLeft ) );
                    }),
                  ),
                  $(go.TextBlock,
                    {
                      margin: new go.Margin(0, 2),
                      font: param.keyFont,
                      stroke: param.separatorStroke,
                      wrap: go.TextBlock.None,
                      overflow: go.TextBlock.OverflowEllipsis,
                      editable: false,
                      fromLinkable: false, 
                      toLinkable: false,
                      text: ': ',
                    },
                    new go.Binding("text", "type", function(v) { const map = { 'Object': ' { ', 'Array': ' [ ', 'Data': ' : ' }; return map[v]; })
                  ),
                  $(go.TextBlock,
                    {
                      margin: new go.Margin(0, 2),
                      stretch: go.GraphObject.Horizontal,
                      font: param.valueFont,
                      stroke: param.valueStroke,
                      wrap: go.TextBlock.None,
                      overflow: go.TextBlock.OverflowEllipsis,
                      editable: param.isValueEditable,
                      fromLinkable: false, 
                      toLinkable: false,
                    },
                    new go.Binding("text", "value").makeTwoWay()
                  ),
                )
            },
            new go.Binding("itemArray", "props_").makeTwoWay(),
          ),
          $(go.Panel, "Horizontal", 
            { 
              alignment: go.Spot.Left,
              background: "transparent", 
            },
            addPropertyButton,
            deletePropertyButton
          ),
        ),
      )
    );
  }
  const dsl_JsonNode = (param)=> {
    param = ( param? param: {} );
    // NODE SHAPE
    param.figure = ( param.figure? param.figure: "rectangle" );
    param.fill = ( param.fill? param.fill: "white" );
    param.stroke = ( param.stroke? param.stroke: "black" );
    param.strokeWidth = ( param.strokeWidth? param.strokeWidth: 1 );
    param.isResizable = ( param.isResizable !== undefined? param.isResizable: true );
    param.minSize = ( param.minSize? param.minSize: new go.Size(40, 40));
    param.maxSize = ( param.maxSize? param.maxSize: new go.Size(NaN, NaN));
    param.portId = ( param.portId? param.portId: "" );
    // NODE INPUT CONNECTIVITY
    param.fromSpot = ( param.fromSpot? param.fromSpot: go.Spot.Bottom );
    param.isFromLinkable = ( param.isFromLinkable !== undefined? param.isFromLinkable: true );
    param.isFromLinkableSelfNode = ( param.isFromLinkableSelfNode !== undefined? param.isFromLinkableSelfNode: false );
    param.isFromLinkableDuplicates = ( param.isFromLinkableDuplicates !== undefined? param.isFromLinkableDuplicates: false );
    param.fromMaxLinks = ( param.fromMaxLinks !== undefined? param.fromMaxLinks: Infinity );
    // NODE OUTPUT CONNECTIVITY
    param.toSpot = ( param.toSpot? param.toSpot: go.Spot.Top );
    param.isToLinkable = ( param.isToLinkable !== undefined? param.isToLinkable: true );
    param.isToLinkableSelfNode = ( param.isToLinkableSelfNode !== undefined? param.isToLinkableSelfNode: false );
    param.isToLinkableDuplicates = ( param.isToLinkableDuplicates !== undefined? param.isToLinkableDuplicates: false );
    param.toMaxLinks = ( param.toMaxLinks !== undefined? param.toMaxLinks: Infinity );
    // NODE LABEL
    param.label = ( param.label !== undefined? param.label: '' );
    param.labelStroke = ( param.labelStroke? param.labelStroke: "Black" );
    param.isLabelEditable = ( param.isLabelEditable !== undefined? param.isLabelEditable: true );
    param.isLabelMultiline = ( param.isLabelMultiline !== undefined? param.isLabelMultiline: true );
    param.labelTextAlign = ( param.labelTextAlign? param.labelTextAlign: "center" );
    param.labelFont = ( param.labelFont? param.labelFont: "18px sans-serif" );
    param.labelMargin = ( param.labelMargin? param.labelMargin: 0 );
    // NODE PROPERTIES
    param.itemFill = ( param.itemFill? param.itemFill: "white" );
    param.itemMinSize = ( param.itemMinSize? param.itemMinSize: new go.Size(150, 1) );
    // KEY PROPERTY
    param.keyFont = ( param.keyFont? param.keyFont: "13px monospace" );
    param.keyStroke = ( param.keyStroke? param.keyStroke: "Black" );
    param.isKeyEditable = ( param.isKeyEditable !== undefined? param.isKeyEditable: true );

    linkExtra = commonLinkProps(param);

    let textBinding = new go.Binding("text", "label").makeTwoWay();
    if( param.label && param.label.startsWith('@') ) {
      textBinding = new go.Binding("text", param.label.substring(1)).makeTwoWay();
    } 

    return( 
      $(go.Node, "Spot",
        {
          resizable: param.isResizable,
          locationObjectName: "BODY",  
          resizeObjectName: 'BODY',
          locationSpot: go.Spot.Center,
        },
        new go.Binding("location", "location",go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, "Vertical",
          {
            background: 'white',
          },
          $(go.Panel, "Auto",
            { 
              stretch: go.GraphObject.Fill,
            },
            $(go.Shape,
              {
                name: "BODY",
                stretch: go.GraphObject.Fill,
                figure: param.figure, 
                fill: param.fill, 
                stroke: param.stroke,
                strokeWidth: param.strokeWidth,
                minSize: param.minSize, 
                maxSize: param.maxSize, 
                cursor: "pointer",  // the Shape is the port, not the whole Node
              },
              linkExtra,
              new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
              new go.Binding("fill", "color").makeTwoWay()
            ),
            $(go.TextBlock,
              { 
                name: "LABEL",
                //background: "red",
                minSize: new go.Size(NaN, 20), 
                text: param.label,
                stroke: param.labelStroke,
                editable: param.isLabelEditable,
                isMultiline: param.isLabelMultiline,
                textAlign: param.labelTextAlign,
                margin: param.labelMargin,
                font: param.labelFont,
                overflow: go.TextBlock.OverflowEllipsis,
                verticalAlignment: go.Spot.Center,
              },
              textBinding
            ), // Text Block
          ),
          $(go.TextBlock,
            {
              margin: new go.Margin(5, 2),
              stretch: go.GraphObject.Horizontal,
              font: param.keyFont,
              stroke: param.keyStroke,
              wrap: go.TextBlock.None,
              overflow: go.TextBlock.OverflowEllipsis,
              editable: param.isKeyEditable,
              isMultiline: true,
              fromLinkable: false, 
              toLinkable: false,
              contextMenu: param.keyMenu,
              formatting: go.TextBlock.FormatNone,
              spacingBelow: 2,
            },
            new go.Binding("text", "value").makeTwoWay()
          ),
        ),
      )
    );
  }

  //----------------------------------
  // Define DSL data
  //----------------------------------
  const dsl = {
    
    //-----------------------------------
    // Define DSL Meta-Models categories
    //-----------------------------------
    templateNodeList: [
      { category: 'Tree_Node', template: dsl_TreeNode },
      { category: 'Tree_JsonNode', template: dsl_JsonNode },
    ],

    //-----------------------------------
    // Define DSL Models Node Elements
    //-----------------------------------
    dataNodeList:[
      {
        'label': 'Tree Node',
        'color': 'Red',
        'category': 'Tree_Node',
        'props_': [
          { 'id': 0, 'level': 0, 'name': 'category', 'value': '', 'type': 'Object'},
          { 'id': 1, 'level': 1, 'name': 'label', 'value': '', 'type': 'Array'},
          { 'id': 2, 'level': 2, 'name': '0', 'value': 'text', 'type': 'Data'},
        ],
        'size': '240 40',
      },
      {
        'label': 'JSON Node',
        'color': 'Red',
        'category': 'Tree_JsonNode',
        'size': '240 40',
        'value': '{}',
      },
    ],

    //-----------------------------------
    // Define DSL Models Link Elements
    //-----------------------------------
    templateLinkList:[],
    dataLinkList:[],
  };

  // Return DSL data
  return( dsl );
}