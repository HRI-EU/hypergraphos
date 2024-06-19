/*
   DSL for Creating DSL
*/
function DSLComposeDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}
function DSLComposeDSL_setupDSL() {
}
function DSLComposeDSL_getDSL( g ) {
  let diagram = (g.diagram? g.diagram: g.nodeDSL);
  

  const cm = g.contextMenu;
  cm.add( menuDSL, 'fileTypeMenu' );
  cm.add( menuDSL, 'figureMenu' );
  const fileTypeContextMenu = cm.getMenu( 'fileTypeMenu' );
  const shapeContextMenu = cm.getMenu( 'figureMenu' );
  //-----------------------
  // Define specific shapes
  //-----------------------
  
  //-----------------------
  // Define specific menus
  //-----------------------   

  //-----------------------
  // Define node templates
  //-----------------------
  function selectItem( e, item, param ) {
    param = ( param? param: {} );
    param.stroke = ( param.stroke? param.stroke: 'transparent' );
    param.strokeWidth = ( param.strokeWidth? param.strokeWidth: 1 );
    param.selectColor = ( param.selectColor? param.selectColor: "dodgerblue" );

    // assume param.portFill means not "selected", for items
    var oldskips = item.diagram.skipsUndoManager;
    item.diagram.skipsUndoManager = true;
    if (item.stroke === param.stroke) {
      item.stroke = param.selectColor;
      item.strokeWidth = 3;
    } else {
      item.stroke = param.stroke;
      item.strokeWidth = param.strokeWidth;
      //item.stroke = 'red';
      //item.strokeWidth = 1;
    }
    item.diagram.skipsUndoManager = oldskips;
  }
  function makePort( param ) {
    param = ( param? param: {} );
    param.isTerminal = ( param.isTerminal !== undefined? param.isTerminal: false );
    param.isVisible = ( param.isVisible !== undefined? param.isVisible: true );
    param.portWidth = ( param.portWidth? param.portWidth: 40 ); 
    param.portHeight = ( param.portHeight? param.portHeight: 40 ); 
    param.portName = ( param.portName? param.portName: "portId" );

    let colorBinding = {};
    let portBinding = {};
    let fillColor = {};
    if( !param.portColor ) {
      colorBinding = new go.Binding( "fill", "", ( data, node )=> {
        let color = 'Purple';
        switch( data.value ) {
          case 'function':
            color = 'AliceBlue';
            break;
          case 'layout':
            color = 'SandyBrown';
            break;
          case 'template':
            color = 'MediumPurple';
            break;
          case '':
            color = '';
            break;
        };
        return(color);
      });
    } else {
      fillColor = { fill: param.portColor };
    }
    portBinding = new go.Binding( "portId", param.portName );
    return(
      $(go.Shape, "Circle",        
        { 
          name: param.portName,
          portId: param.portName,
          width: param.portWidth, 
          height: param.portHeight, 
          margin: 0, 
          //fill: param.portColor,
          visible: param.isVisible
        },
        fillColor,
        makeConnection( param ),
        portBinding,
        colorBinding,
        new go.Binding( "visible", "value", function(v) { return( ['function','layout','template'].includes(v)? true: param.isVisible )} ),
      )
    );
  }
  function makeConnection( param ) {
    param = ( param? param: {} );
    param.name = ( param.name? param.name: undefined ); 
    portId = ( param.portId? param.portId: "" ); 
    // allow all kinds of links from this port
    param.fromSpot = ( param.fromSpot? param.fromSpot: go.Spot.Center );
    param.fromEndSegmentLength = ( param.fromEndSegmentLength? param.fromEndSegmentLength: 0 );
    param.fromLinkable = ( param.isFromLinkable !== undefined? param.isFromLinkable: false );
    param.fromLinkableSelfNode = ( param.isFromLinkableSelfNode!== undefined? param.isFromLinkableSelfNode: false );
    param.fromLinkableDuplicates = ( param.isFromLinkableDuplicates!== undefined? param.isFromLinkableDuplicates: false );
    param.fromMaxLinks = ( param.fromMaxLinks? param.fromMaxLinks: Infinity );
    // allow all kinds of links to this port
    param.toSpot = ( param.toSpot? param.toSpot: go.Spot.Center );
    param.toEndSegmentLength = ( param.toEndSegmentLength? param.toEndSegmentLength: 0 );
    param.toLinkable = ( param.isToLinkable !== undefined? param.isToLinkable: false );
    param.toLinkableSelfNode = ( param.isToLinkableSelfNode !== undefined? param.isToLinkableSelfNode: false );
    param.toLinkableDuplicates = ( param.isToLinkableDuplicates !== undefined? param.isToLinkableDuplicates: false );
    param.toMaxLinks = ( param.toMaxLinks? param.toMaxLinks: Infinity );

    return(
      {
        cursor: "pointer", 
        name: param.name, 
        portId: param.portId, 
        // allow all kinds of links from this port
        fromSpot: param.fromSpot,
        fromEndSegmentLength: param.fromEndSegmentLength,
        fromLinkable: param.isFromLinkable,
        fromLinkableSelfNode: param.isFromLinkableSelfNode,
        fromLinkableDuplicates:param.isFromLinkableDuplicates,
        fromMaxLinks: param.fromMaxLinks,
        // allow all kinds of links to this port
        toSpot: param.toSpot,
        toEndSegmentLength: param.toEndSegmentLength,
        toLinkable: param.isToLinkable,
        toLinkableSelfNode: param.isToLinkableSelfNode,
        toLinkableDuplicates: param.isToLinkableDuplicates,
        toMaxLinks: param.toMaxLinks,
      }
    );
  }
  function makeButton( param ) {
    param = ( param? param: {} );
    param.name = ( param.name? param.name: undefined );
    param.alignment = ( param.alignment? param.alignment: go.Spot.Center );
    param.figure = ( param.figure? param.figure: 'PlusLine' );
    param.onClick = ( param.onClick? param.onClick: null );  
  
    return(
      $("Button",
        { 
          name: ( param.name? param.name: undefined ), 
          visible: false,
          alignment: ( param.alignment? param.alignment: go.Spot.Center ),
        },
        new go.Binding( 'visible', 'isSelected', (v)=> {v? true: false} ).ofObject(),
        //new go.Binding( 'visible', 'isSelected' ).ofObject(),
        $( go.Shape, 
          { 
            name: 'buttonFig',
            figure: ( param.figure? param.figure: 'PlusLine' ),
            width: 8, height: 8 
          }),
        { click: ( param.onClick? param.onClick: null ) }
      )
    );
  }
  function makeVerticalPanel( param ) {
    param = ( param? param: {} );
    param.name = ( param.name? param.name: 'list' );
    param.alignment = ( param.alignment? param.alignment: go.Spot.Center );
    param.stroke = ( param.stroke? param.stroke: 'Black' );
    param.color = ( param.color? param.color: 'White' );
    param.portColor = ( param.portColor? param.portColor: 'Gray' );
    param.selectColor = ( param.selectColor? param.selectColor: "dodgerblue" );

    return(
      $(go.Panel, "Vertical",
        new go.Binding("itemArray", param.name+"_").makeTwoWay(),
        {
          name: param.name,
          alignment: param.alignment,
          itemTemplate:
          $(go.Panel, "Auto",
            {
              background: "transparent", 
              stretch: go.GraphObject.Horizontal,
            },
            $(go.Shape,
              {
                figure: "Rectangle",
                stroke: param.stroke, 
                strokeWidth: 1,
                fill: param.color,
                width: 80, 
                height: 80, 
                margin: 0, 
                // allow the user to select items -- the background color indicates whether "selected"
                click: (e,i)=>selectItem( e, i, param )
              },
            ),
            makePort( { portName: 'portId', portColor: param.portColor, isToLinkable: true, toMaxLinks: 1 } )

          )  // end itemTemplate
        }
      )
    );  // end Vertical Panel
  }
  function makeVerticalAutoPanel( param ) {
    param = ( param? param: {} );
    param.name = ( param.name? param.name: 'list' );
    param.alignment = ( param.alignment? param.alignment: go.Spot.Center );
    param.stroke = ( param.stroke? param.stroke: 'transparent' );
    param.color = ( param.color? param.color: 'White' );
    param.portColor = ( param.portColor? param.portColor: 'Gray' );
    param.selectColor = ( param.selectColor? param.selectColor: "dodgerblue" );

    return(
      $(go.Panel, "Vertical",
        new go.Binding("itemArray", param.name+"_").makeTwoWay(),
        {
          name: param.name,
          alignment: param.alignment,
          itemTemplate:
          $(go.Panel, "Auto",
            {
              background: "transparent", 
              //stretch: go.GraphObject.Horizontal,
            },
            $(go.Shape,
              {
                figure: "Rectangle",
                stroke: param.stroke, 
                strokeWidth: 0,
                fill: param.color,
                width: 80, 
                height: 50, 
                margin: 0, 
                // allow the user to select items -- the background color indicates whether "selected"
                click: (e,i)=>selectItem( e, i, { selectColor: param.selectColor, strokeWidth: 0 } )
              },
            ),
            makePort( { portName: 'portId', portColor: param.portColor, isToLinkable: true, toMaxLinks: 1 } )

          )  // end itemTemplate
        }
      )
    );  // end Vertical Panel
  }
  function makeHorizontalPanel( param ) {
    param = ( param? param: {} );
    param.name = ( param.name? param.name: 'list' );
    param.alignment = ( param.alignment? param.alignment: go.Spot.Center );
    param.stroke = ( param.stroke? param.stroke: 'Black' );
    param.stroke = ( param.stroke? param.stroke: 'Black' );
    param.color = ( param.color? param.color: 'White' );
    param.portColor = ( param.portColor? param.portColor: 'Gray' );
    param.selectColor = ( param.selectColor? param.selectColor: "dodgerblue" );

    return(
      $(go.Panel, "Horizontal",
        new go.Binding("itemArray", param.name+"_").makeTwoWay(),
        {
          name: param.name,
          alignment: param.alignment,
          itemTemplate:
          $(go.Panel, "Auto",
            {
              background: "transparent", 
              stretch: go.GraphObject.Horizontal,
            },
            $(go.Shape,
              {
                figure: "Rectangle",
                stroke: param.stroke, 
                strokeWidth: 1,
                fill: param.color,
                width: 80, 
                height: 80, 
                margin: 0, 
                // allow the user to select items -- the background color indicates whether "selected"
                click: (e,i)=>selectItem( e, i, param )
              },
            ),
            makePort( { portName: 'portId', portColor: param.portColor, isToLinkable: true, toMaxLinks: 1 } )

          )  // end itemTemplate
        }
      )
    );  // end Vertical Panel
  }
  function makeCategoryTitle( param ) {
    param = ( param? param: {} );
    param.name = ( param.name? param.name: 'list' );
    param.alignment = ( param.alignment? param.alignment: go.Spot.Center );
    param.stroke = ( param.stroke? param.stroke: 'Black' );
    param.font = ( param.font? param.font: 'bold italic 15px sans-serif' );
    param.isVisible = ( param.isVisible != undefined? param.isVisible: true );

    return(
      $(go.TextBlock,
        {
          name: "TYPE",
          //height: 10, 
          font:  param.font,
          stroke: param.stroke,
          visible: param.isVisible,
          margin: 0,  // make some extra space for the shape around the text
          isMultiline: false,  // don't allow newlines in text
          editable: false,  // allow in-place editing by user
          //contextMenu: param.tagMenu,
        },
        new go.Binding( "visible", "", (data,node)=> {
          const nodeData = node.findBindingPanel().part.data;
          let result = false;
          if( nodeData.showProperty ) {
            if( data.category ) {
              result = true;
            }
          }
          return( result );
        }),
        new go.Binding( "text", "category" )
      )
    );  // end Vertical Panel
  }
  function makeProperties (param ) {
    param = ( param? param: {} );
    param.selectColor = ( param.selectColor? param.selectColor: "dodgerblue" );
    param.keyFont = ( param.keyFont? param.keyFont: "bold 10px sans-serif" );
    param.keyStroke = ( param.keyStroke? param.keyStroke: "Black" );
    param.isKeyEditable = ( param.isKeyEditable !== undefined? param.isKeyEditable: true );
    param.valueStroke = ( param.valueStroke? param.valueStroke: "Black" );
    param.valueFont = ( param.valueFont? param.valueFont: "10px sans-serif" );
    param.isValueEditable = ( param.isValueEditable !== undefined? param.isValueEditable: true );
    param.hasKeyPort = ( param.hasKeyPort !== undefined? param.hasKeyPort: true );
    
    let keyPort = {};
    if( param.hasKeyPort ) {
      keyPort = makePort( { portName: 'keyId', portColor: 'Brown', portWidth: 10, portHeight: 10, isFromLinkable: true } );
    }

    return(
      $(go.Panel, "Spot",
        {
          defaultStretch: go.GraphObject.Horizontal,
          stretch: go.GraphObject.Horizontal
        },
        $(go.Shape, 
          { 
            click: (e,i)=>selectItem( e, i, {stroke: 'black'} ),
            height: 8,
            width: 8,
            figure: "Rectangle",
            fill: 'white',
            stroke: 'black',
            margin: 2,
            //maxSize: new go.Size(NaN,NaN)
            visible: false
          },
          new go.Binding( "visible", "", toVisiblePropSelector )
          //new go.Binding( 'visible', 'isSelected', (v)=> { console.log(v);return(v? true: false)} ).ofObject(),
          //new go.Binding( 'visible', 'isSelected' ).ofObject(),
        ),        
        $(go.Panel, "Horizontal",
          {
            background: "transparent",
            alignment: new go.Spot(1, 0.5, 2, 0),
            alignmentFocus: go.Spot.Left,
            stretch: go.GraphObject.Horizontal,
            visible: false
          },
          new go.Binding( "visible", "", toVisibleProperty ),
          keyPort,
          $(go.TextBlock,
            {
              margin: new go.Margin(2, 2),
              font: param.keyFont,
              stroke: param.keyStroke,
              wrap: go.TextBlock.None,
              overflow: go.TextBlock.OverflowEllipsis,
              editable: param.isKeyEditable,
              formatting: go.TextBlock.FormatNone,
            },
            new go.Binding("editable", "isKeyEditable"),
            new go.Binding("text", "name").makeTwoWay(),
            {
              // this tooltip Adornment is shared by all inputs
              toolTip:  // define a tooltip for each node that displays the color as text
              $(go.Adornment, "Auto",
                $(go.Shape, { fill: "#EFEFCC" }),
                $(go.TextBlock, { margin: 4 },  // margin to give room for the drop shadow
                  // TextBlock.text is bound to Node.data.tooltip
                  new go.Binding("text", "tooltip"),
                  new go.Binding("text", "nameTooltip"))
              ),  // end of Adornment
            }
          ),
          $(go.TextBlock,
            {
              margin: new go.Margin(0, 2),
              font: param.valueFont,
              stroke: param.valueStroke,
              overflow: go.TextBlock.OverflowEllipsis,
              editable: param.isValueEditable,
              formatting: go.TextBlock.FormatNone,
              textEdited: (node, oldstr, newstr)=> { onPropertyValueEdited(node, oldstr, newstr, param.valueStroke); },
            },
            new go.Binding("text", "value").makeTwoWay(),
            new go.Binding("editable", "isValueEditable"),
            new go.Binding("font", "font").makeTwoWay(),
            new go.Binding("stroke", "default", function(v) { return (v? 'red': param.valueStroke )}), //.makeTwoWay(function(v) { return ( v == 'red' ) } ),
            {
              // this tooltip Adornment is shared by all inputs
              toolTip:  // define a tooltip for each node that displays the color as text
              $(go.Adornment, "Auto",
                $(go.Shape, { fill: "#EFEFCC" }),
                $(go.TextBlock, { margin: 4 },  // margin to give room for the drop shadow
                  // TextBlock.text is bound to Node.data.tooltip
                  new go.Binding("text", "tooltip"),
                  new go.Binding("text", "valueTooltip"))
              ),  // end of Adornment
            }
          ),
          makePort( { portName: 'valueId', portWidth: 10, portHeight: 10, isToLinkable: true, isVisible: false } ),
        )
      )
    );  // end Vertical Panel
  }
  function makeStaticProperties ( param ) {
    param = ( param? param: {} );
    param.name = ( param.name? param.name: 'props' );
    
    return(
      $(go.Panel, "Vertical",
        new go.Binding("itemArray", "props_").makeTwoWay(),
        {
          name: param.name,
          itemTemplate:
          $(go.Panel, "Vertical",
            {
              background: "transparent", 
              stretch: go.GraphObject.Horizontal,
            },
            makeCategoryTitle( { isVisible: false} ),
            makeProperties( param )
          )  // end itemTemplate
        }
      )
    );  // end Vertical Panel
  }
  function makeDynamicProperties ( param ) {
    param = ( param? param: {} );
    param.name = ( param.name? param.name: 'props' );
    param.selectColor = ( param.selectColor? param.selectColor: "dodgerblue" );
    param.color = ( param.color? param.color: "transparent" );
    param.stroke = ( param.stroke? param.stroke: "transparent" );
    
    return(
      $(go.Panel, "Vertical",
        {
          visible: true
        },
        //new go.Binding("visible","showProperty"),
        $(go.Panel, "Horizontal",
          makeButton( { figure: 'PlusLine', onClick: (e, obj)=> addItem( e, obj, param.name, param.selectColor, { name: 'key:', value: 'value' }, 'keyId' ) } ),
          makeButton( { figure: 'MinusLine', onClick: (e, obj)=> deleteItem( e, obj, param.name, param.selectColor, 'keyId' ) } )
        ),
        $(go.Panel, "Auto",
          $(go.Shape, 
            { 
              name: 'BODY',
              figure: "Rectangle",
              fill: param.color,
              stroke: param.stroke
            },
          ),
          $(go.Panel, "Vertical",
            new go.Binding("itemArray", param.name+"_").makeTwoWay(),
            {
              name: param.name,
              itemTemplate: makeProperties( param )
            } 
          )
        )
      )
    );  // end Vertical Panel
  }
  function makeDSLNodeName( param ) {
    param = ( param? param: {} );
    param.name = ( param.name? param.name: '' );
    param.alignment = ( param.alignment? param.alignment: go.Spot.Center );
    param.stroke = ( param.stroke? param.stroke: 'Black' );
    param.font = ( param.font? param.font: 'bold 20px sans-serif' );
    param.labelMenu = ( param.labelMenu? param.labelMenu: undefined );

    return(
      $(go.TextBlock,
        {
          name: "TYPE",
          //height: 10, 
          font:  param.font,
          stroke: param.stroke,
          margin: 0,  // make some extra space for the shape around the text
          isMultiline: false,  // don't allow newlines in text
          editable: false,  // allow in-place editing by user
          contextMenu: param.labelMenu,
        },
        new go.Binding( "text", "type" )
      )
    );  // end Vertical Panel
  }
  
  //-----------------------
  // Define link templates
  //-----------------------
  
  
  //-----------------------
  // Define event handler
  //-----------------------
  if( diagram ) {
    //diagram.addDiagramListener( 'ChangingSelection', turnOffVisibitityOfButtonsProxy );
    //diagram.addDiagramListener( 'ChangedSelection', turnOnVisibitityOfButtonsProxy );
    diagram.addDiagramListener( 'InitialLayoutCompleted', (e)=> {
      diagram.updateAllRelationshipsFromData();
      setTimeout( ()=> diagram.updateAllTargetBindings(), parseFloat( 0.01 )*1000 )
    } );
  }
  function findSelectedItem( node, name, selectColor, portName ) {
    const items = [];
    let maxId = 0;
    const list = node.findObject( name );
    if( list ) {
      // Iterate on all row items 
      for( let it1 = list.elements; it1.next(); ) {
        const panelItem = it1.value;
        
        // Update maxId
        const portData = panelItem.data; // { portId, name }
        const currIdIdx = parseInt( portData[portName] );
        if( currIdIdx > maxId ) {
          maxId = currIdIdx;
        }

        // Find the next shape in the part hierarchy
        const it2 = panelItem.elements;
        it2.next();
        const obj = it2.value;
        if( obj.constructor.className == "Shape" ) {
          // Check if port shape is selected
          if( obj.stroke == selectColor ) {
            items.push( panelItem );
          }
        }
      }
    }
    return( [ items, maxId ] );
  }
  function addItem( e, obj, itemArrName, selectColor, obj2Add, portName ) {
    const node = obj.part;
    if( node ) {
      const [ items, maxId ] = findSelectedItem( node, itemArrName, selectColor, portName );
      const diagram = node.diagram;
      diagram.startTransaction( `Add item` );
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      //let portId = `${maxId+1}${itemArrName}`;
      if( items.length > 0 ) {  // if there are any selected items, add one above
        const selectIndex = 0;
        const panel = items[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData[itemArrName+'_'];
        const itemData = panel.data;
        itemIndex = itemArray.indexOf( itemData );
      } else {
        nodeData = node.data;
        itemArray = nodeData[itemArrName+'_'];
      }
      switch( itemArrName ) {
        case 'props':
          obj2Add.keyId = `${maxId+1}key`;
          obj2Add.valueId = `${maxId+1}value`;
          break;
        default:
          obj2Add.portId = `${maxId+1}item`;
          break;
      }
      diagram.model.insertArrayItem( itemArray, itemIndex, obj2Add );

      diagram.commitTransaction( `Add item` );
    }
  }
  function deleteItem( e, obj, itemArrName, selectColor, portName ) {
    const node = obj.part;
    if( node ) {
      const [ items ] = findSelectedItem( node, itemArrName, selectColor, portName );
      if( items.length > 0 ) {  // if there are any selected items, delete them
        const diagram = node.diagram;
        diagram.startTransaction( `Delete item` );
        for( let i = 0; i < items.length; i++ ) {
          const panel = items[i];
          const nodeData = panel.part.data;
          const itemArray = nodeData[itemArrName+'_'];
          const itemData = panel.data;
          const itemIndex = itemArray.indexOf( itemData );
          diagram.model.removeArrayItem( itemArray, itemIndex );
        }
        diagram.commitTransaction( `Delete item` );
      }
    }
  }
  function onPropertyValueEdited(node, oldstr, newstr, defaultColor)  {
    const data = node.part.data;
    const diagram = node.diagram;
    const rowIndex = node.findBindingPanel().itemIndex;
    diagram.startTransaction("change value");
      const defaultValue = jsyaml.load( data.props_[rowIndex].default );
      if( defaultValue == jsyaml.load( newstr ) ) {
        diagram.model.setDataProperty( data.props_[rowIndex], 'default', undefined );
        node.stroke = defaultColor;
      } else if( defaultValue == "undefined" && jsyaml.load( newstr ) != jsyaml.load( oldstr )) {
        diagram.model.setDataProperty( data.props_[rowIndex], 'default', oldstr );
        node.stroke = 'red';
      }
    diagram.commitTransaction("change value");
  }
  function toggleProperties( e, obj ) {
    const node = obj.part;
    if( node ) {
      const diagram = node.diagram;
      diagram.startTransaction( `Toggle Properties` );
        const showProperty = node.data.showProperty;
        const button = node.findObject( 'toggleProperty' );
        const shape = button.findObject('buttonFig');
        if( showProperty ) {
          diagram.model.setDataProperty( node.data, 'showProperty', false );
          shape.figure = 'TriangleDown';
        } else {
          diagram.model.setDataProperty( node.data, 'showProperty', true );
          shape.figure = 'TriangleUp';
        }
      diagram.commitTransaction( `Toggle Properties` );
    }
  }
  function toVisibleProperty( data, node ) {
    const nodeData = node.findBindingPanel().part.data;
    const nbKeyLinks = node.part.findLinksConnected(data.keyId).count;
    const nbValueLinks = node.part.findLinksConnected(data.valueId).count;
    let result = true;
    if( !nodeData.showProperty ) {
      if( (nbKeyLinks == 0 && nbValueLinks == 0) && !data.default ) {
        result = false;
      }
    }
    return( result );
  }
  function toVisiblePropSelector( data, node ) {
    const panel = node.findBindingPanel();
    const nodeData = panel.part.data;
    let result = nodeData.showProperty;
    return( result );
  }
   
  //-----------------------
  // Define palette
  //-----------------------
  var dsl_ConcentricCircle = (param)=> {
    param = ( param? param: {} );
    param.isTerminal = ( param.isTerminal !== undefined? param.isTerminal: false );
    param.selectColor = ( param.selectColor? param.selectColor: "dodgerblue" );

    if( param.isTerminal ) {
      param.portId = "DSLNode";
      param.isToLinkable = true; 
      param.toMaxLinks = 1;
    } else {
      param.portId = "DSLNode";
      param.isToLinkable = true;
      param.isFromLinkable = true;
      param.toMaxLinks = (param.toMaxLinks? param.toMaxLinks: 1); 
    }

    return( 
      $(go.Node, "Vertical",
        new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
        //new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        makeDSLNodeName( param ),
        $(go.Panel, "Auto",
          $(go.Shape, "Circle",        
            { 
              width: 80, 
              height: 80, 
              margin: 4, 
              fill: param.color
            }
          ),
          makePort( { portName: 'portId', portColor: param.portColor, isToLinkable: true, toMaxLinks: 1 } )
          //makePort( param ),
        ),
        makeButton( { name: 'toggleProperty', figure: 'TriangleDown', onClick: toggleProperties } ),
        makeDynamicProperties( { name: 'props' } )
      )
    );
  }
  var dsl_AutoPanel = (param)=> {
    param = ( param? param: {} );
    param.selectColor = ( param.selectColor? param.selectColor: "dodgerblue" );

    return( 
      $(go.Node, "Spot",
        {
          locationObjectName: "BODY",  
          resizeObjectName: 'BODY',
          locationSpot: go.Spot.Center,
        },
        new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
        //new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        $(go.Panel, "Vertical",
          makeDSLNodeName( param ),
          $(go.Panel, "Vertical",
            makeConnection( { portId: "DSLPanel", isFromLinkable: true } ),
            makeButton( { figure: 'PlusLine', onClick: (e, obj)=> addItem( e, obj, 'list', param.selectColor, { portId }, 'portId' ) } ),
            $(go.Panel, "Auto",
              $(go.Shape,
                {
                  name: 'BODY',
                  figure: "Rectangle",
                  stroke: param.stroke, 
                  strokeWidth: 1,
                  fill: param.color,
                  width: 80, 
                  minSize: new go.Size(NaN, 80), 
                  margin: 0, 
                },
              ),
              makeVerticalAutoPanel( { name: 'list', color: param.color, portColor: param.portColor } )
            ),
            makeButton( { figure: 'MinusLine', onClick: (e, obj)=> deleteItem( e, obj, 'list', param.selectColor, 'portId' ) } )
          ),
          makeButton( { name: 'toggleProperty', figure: 'TriangleDown', onClick: toggleProperties } ),
          makeDynamicProperties( { name: 'props' } )
        )
      )
    );
  }
  var dsl_VPanel = (param)=> {
    param = ( param? param: {} );
    param.selectColor = ( param.selectColor? param.selectColor: "dodgerblue" );

    return( 
      $(go.Node, "Spot",
        {
          locationObjectName: "Body",  
          resizeObjectName: 'Body',
          locationSpot: go.Spot.Center,
        },
        new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
        //new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        $(go.Panel, "Vertical",
          makeDSLNodeName( param ),
          $(go.Panel, "Vertical",
            {
              name: 'Body',
            },
            makeConnection( { portId: "DSLPanel", isFromLinkable: true } ),
            makeButton( { figure: 'PlusLine', onClick: (e, obj)=> addItem( e, obj, 'list', param.selectColor, { portId }, 'portId' ) } ),
            makeVerticalPanel( { name: 'list', color: param.color, portColor: param.portColor } ),
            makeButton( { figure: 'MinusLine', onClick: (e, obj)=> deleteItem( e, obj, 'list', param.selectColor, 'portId' ) } )
          ),
          makeButton( { name: 'toggleProperty', figure: 'TriangleDown', onClick: toggleProperties } ),
          makeDynamicProperties( { name: 'props' } )
        )
      )
    );
  }
  var dsl_HPanel = (param)=> {
    param = ( param? param: {} );
    param.selectColor = ( param.selectColor? param.selectColor: "dodgerblue" );

    return( 
      $(go.Node, "Spot",
        {
          locationObjectName: "Body",  
          resizeObjectName: 'Body',
          locationSpot: go.Spot.Center,
        },
        new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
        //new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        $(go.Panel, "Vertical",
          makeDSLNodeName( param ),
          $(go.Panel, "Horizontal",
            {
              name: 'Body',
            },
            makeConnection( { portId: "DSLPanel", isFromLinkable: true } ),
            makeButton( { figure: 'PlusLine', onClick: (e, obj)=> addItem( e, obj, 'list', param.selectColor, { portId }, 'portId' ) } ),
            makeHorizontalPanel( { name: 'list', color: param.color, portColor: param.portColor } ),
            makeButton( { figure: 'MinusLine', onClick: (e, obj)=> deleteItem( e, obj, 'list', param.selectColor, 'portId' ) } )
          ),
          makeButton( { name: 'toggleProperty', figure: 'TriangleDown', onClick: toggleProperties } ),
          makeDynamicProperties( { name: 'props' } )
        )
      )
    );
  }
  var dsl_Shape = (param)=> {
    param = ( param? param: {} );
    param.color = ( param.color? param.color: 'White' );

    return( 
      $(go.Node, "Spot",
        {
          resizable: true,
          locationObjectName: "Body",  
          resizeObjectName: 'Body',
          locationSpot: go.Spot.Center,
        },
        new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
        //new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        $(go.Panel, "Vertical",
          makeDSLNodeName( { labelMenu: shapeContextMenu } ),
          $(go.Panel, "Auto",
            {
              name: "Body",
            },
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            $(go.Shape, 
              { 
                figure: "Rectangle",
                fill: param.color
              },
              makeConnection( { portId: "DSLShape", isFromLinkable: true } ),
              new go.Binding("figure", "label"),
              new go.Binding("fill", "color")
            ),
          ),
          makeButton( { name: 'toggleProperty', figure: 'TriangleDown', onClick: toggleProperties } ),
          makeDynamicProperties( { name: 'props' } )
        )
      )
    );
  }
  var dsl_Text = (param)=> {
    param = ( param? param: {} );
    param.color = ( param.color? param.color: 'White' );

    return( 
      $(go.Node, "Spot",
        {
          resizable: true,
          locationObjectName: "Body",  
          resizeObjectName: 'Body',
          locationSpot: go.Spot.Center,
        },
        new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, "Vertical",
          makeDSLNodeName( param ),
          $(go.Panel, "Auto",
            {
              name: "Body",
            },
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            $(go.TextBlock,
              { 
                background: param.color,
                font:  "24px sans-serif",
                text: "Label",
                stroke: 'Black',
                margin: 5,  // make some extra space for the shape around the text
                isMultiline: true,  // don't allow newlines in text
                editable: false,  // allow in-place editing by user
              },
              makeConnection( { portId: "DSLText", isFromLinkable: true } ),
              new go.Binding("stroke", "color"),
              new go.Binding("text", "label")
            ),
          ),
          makeButton( { name: 'toggleProperty', figure: 'TriangleDown', onClick: toggleProperties } ),
          makeDynamicProperties( { name: 'props' } )
        )
      )
    );
  }
  var dsl_Picture = (param)=> {
    param = ( param? param: {} );
    param.color = ( param.color? param.color: 'White' );

    return( 
      $(go.Node, "Spot",
        {
          resizable: true,
          locationObjectName: "Picture",  
          resizeObjectName: 'Picture',
          locationSpot: go.Spot.Center,
        },
        new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, "Vertical",
        makeDSLNodeName( param ),
          $(go.Panel, "Auto",
            {
              name: "Picture",
            },
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            $(go.Picture,
              {
                margin: 2,
                imageStretch: go.GraphObject.Fill,
              }, 
              new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
              new go.Binding( "source", "fileURL", getDefaultPicture ),
              //new go.Binding( "desiredSize", "size", getReducedSize )
              makeConnection( { portId: "DSLText", isFromLinkable: true } ),
            ),
          ),
          makeButton( { name: 'toggleProperty', figure: 'TriangleDown', onClick: toggleProperties } ),
          makeDynamicProperties( { name: 'props' } )
        )
      )
    );
  }
  var dsl_Function = (param)=> {
    param = ( param? param: {} );
    param.color = ( param.color? param.color: 'White' );

    return( 
      $(go.Node, "Spot",
        {
          resizable: true,
          locationObjectName: "Body",  
          resizeObjectName: 'Body',
          locationSpot: go.Spot.Center,
        },
        new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, "Vertical",
          makeDSLNodeName( {} ),
          $(go.Panel, "Horizontal",
            makePort( { portName: 'portId', portWidth: 10, portHeight: 10, isFromLinkable: true, portColor: param.portColor } ),
            $(go.Panel, "Auto",
              {
                name: 'Body',
              },
              new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
              $(go.Shape, 
                { 
                  figure: "Rectangle",
                  fill: param.color
                },
                new go.Binding("figure", "type"),
                new go.Binding("fill", "color")
              ),
              $(go.TextBlock,
                {
                  height: 20, 
                  font:  "24px sans-serif",
                  text: "Label",
                  stroke: 'Black',
                  margin: 10,  // make some extra space for the shape around the text
                  isMultiline: true,  // don't allow newlines in text
                  editable: true,  // allow in-place editing by user
                },
                new go.Binding("text", "label")
              ),
              
            ),
          ),
          makeButton( { name: 'toggleProperty', figure: 'TriangleDown', onClick: toggleProperties } ),
          makeDynamicProperties( { name: 'props' } )
        )
      )
    );
  }
  var dsl_Binding = (param)=> {
    param = ( param? param: {} );
    param.color = ( param.color? param.color: 'White' );

    return( 
      $(go.Node, "Spot",
        {
          resizable: true,
          locationObjectName: "Body",  
          resizeObjectName: 'Body',
          locationSpot: go.Spot.Center,
        },
        new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, "Vertical",
          makeDSLNodeName( param ),
          $(go.Panel, "Horizontal",
            $(go.Panel, "Auto",
              {
                name: 'Body',
              },
              new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
              $(go.Shape, 
                { 
                  figure: "Rectangle",
                  fill: param.color
                },
              ),
              $(go.TextBlock,
                {
                  name: 'BODY',
                  height: 20, 
                  font:  "24px sans-serif",
                  //text: "Label",
                  stroke: 'Black',
                  margin: 5,  // make some extra space for the shape around the text
                  isMultiline: false,  // don't allow newlines in text
                  editable: true,  // allow in-place editing by user
                },
                new go.Binding("text", "label").makeTwoWay()
              ), 
            ),
            makePort( { portName: 'bindId', portWidth: 10, portHeight: 10, isToLinkable: true, portColor: param.portColor } ),
          ),
          makeButton( { name: 'toggleProperty', figure: 'TriangleDown', onClick: toggleProperties } ),
          makeDynamicProperties( { name: 'props' } )
        )
      )
    );
  }
  var dsl_DataFields = (param)=> {
    param = ( param? param: {} );
    param.color = ( param.color? param.color: 'White' );

    return( 
      $(go.Node, "Spot",
        {
          locationObjectName: "Body",  
          resizeObjectName: 'Body',
          locationSpot: go.Spot.Center,
        },
        new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
        //new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        $(go.Panel, "Vertical",
          makeDSLNodeName( {} ),
          makeDynamicProperties( { name: 'props', color: param.color, hasKeyPort: false } )
        )
      )
    );
  }
  var dsl_DSLElement = (param)=> {
    return(
      $(go.Group, "Vertical",
        {
          selectable: true,
        },
        $(go.TextBlock,         // group title
          { 
            alignment: go.Spot.Right, 
            font: "Bold 12pt Sans-Serif" 
          },
          new go.Binding("text", "label")
        ),
        $(go.Panel, "Auto",
          $(go.Shape, "RoundedRectangle",  // surrounds the Placeholder
            { 
              fill: "rgba(128,128,128,0.33)" 
            }
          ),
          $(go.Placeholder,    // represents the area of all member parts,
            { 
              padding: 5
            }
          )  // with some extra padding around them
        ),
        makeButton( { name: 'toggleProperty', figure: 'TriangleDown', onClick: toggleProperties } ),
        makeDynamicProperties( { name: 'props' } )
      )
    );
  }
  const dsl = {
    templateNodeList: [
      { category: 'DSLCompose_Node',            template: dsl_ConcentricCircle, param: { color: 'Thistle', portColor: 'MediumPurple', isTerminal: true } },
      { category: 'DSLCompose_AutoPanel',       template: dsl_AutoPanel, param: { color: 'Lavender', portColor: 'MediumPurple', toMaxLinks: Infinity, isTerminal: false } },
      { category: 'DSLCompose_VerticalPanel',   template: dsl_VPanel, param: { color: 'Lavender', portColor: 'MediumPurple', isTerminal: false } },
      { category: 'DSLCompose_HorizontalPanel', template: dsl_HPanel, param: { color: 'Lavender', portColor: 'MediumPurple', isTerminal: false } },
      { category: 'DSLCompose_Shape',           template: dsl_Shape, param: { isTerminal: false } },
      { category: 'DSLCompose_Text',            template: dsl_Text, param: { isTerminal: false } },
      { category: 'DSLCompose_Picture',         template: dsl_Picture, param: { isTerminal: false } },
      { category: 'DSLCompose_Function',        template: dsl_Function, param: { color: 'Lavender', portColor: 'AliceBlue', isTerminal: false } },
      { category: 'DSLCompose_Binding',         template: dsl_Binding, param: { color: 'Cornsilk', portColor: 'Brown', isTerminal: false } },
      { category: 'DSLCompose_DataFields',      template: dsl_DataFields, param: { color: 'Cornsilk', isTerminal: true } },
    ],
    dataNodeList: [
      {
        type: 'Node',
        category: 'DSLCompose_Node',
        isLabelEditable: false,
        showProperty: false,
        portId: 'DSLNode',
        props_: [
        ]
      },
      {
        type: 'Link',
        category: 'DSLCompose_Node',
        isLabelEditable: false,
        showProperty: false,
        portId: 'DSLLink',
        props_: [
          // { category: '- Node -',           name: 'avoidable:',       value: true,              nameTooltip: 'Gets or sets whether this Node is to be avoided\nby Links whose Link.routing is Link.AvoidsNodes.', tooltip: 'default: true' },
          // {                                 name: 'avoidableMargin:', value: '2,2,2,2',         nameTooltip: 'Gets or sets the margin around this Node in which avoidable links will not be routed.\n\nYou may need to increase the fromEndSegmentLength and toEndSegmentLength\nin order to prevent link routes from turning within the avoidable area around the Node.', tooltip: 'default: 2,2,2,2' },
          // {                                 name: 'isTreeExpanded:',  value: true,              nameTooltip: 'Gets or sets whether the subtree graph starting at this node is expanded.\nChanging this property\'s value will call collapseTree or expandTree,\nand also will call the value of treeExpandedChanged if it is a function.', tooltip: 'default: true' },
          // {                                 name: 'isTreeLeaf:',      value: true,              nameTooltip: 'The initial value is true, meaning that there are no links connected with child nodes.', tooltip: 'default: true' },
          // // { category: '- Link -',           name: 'labeledLink:',     value: 'link',            nameTooltip: 'Gets or sets the Link for which this Node is acting as a smart label. Most nodes do not act as link labels, so this property will be null.', tooltip: 'default: null' },
          // {                                 name: 'portSpreading:',   value: 'SpreadingEvenly', nameTooltip: 'Gets or sets how link points are computed when the port spot is a "side" spot. ', tooltip: 'default: SpreadingEvenly, other values:  SpreadingNone, SpreadingEvenly, SpreadingPacked.' },
          // { category: '- Link Actions -',   name: 'linkConnected:',   value: 'function',        nameTooltip: 'Gets or sets the function that is called after a Link has been connected with this Node.', tooltip: 'args: (node,link,port)' },
          // {                                 name: 'linkDisconnected:',value: 'function',        nameTooltip: 'Gets or sets the function that is called after a Link has been disconnected from this Node.', tooltip: 'args: (node,link,port)' },
          // {                                 name: 'linkValidation:',  value: 'function',        nameTooltip: 'Gets or sets a predicate that determines whether or not a Link may be connected with this node.', tooltip: 'args: (node,link,port) -> bool' },
        ]
      },
      {
        type: 'Group',
        category: 'DSLCompose_Node',
        isLabelEditable: false,
        showProperty: false,
        portId: 'DSLGroup',
        props_: [
          // { category: '- Node -',           name: 'avoidable:',                       value: true,       nameTooltip: 'Gets or sets whether this Node is to be avoided\nby Links whose Link.routing is Link.AvoidsNodes.', tooltip: 'default: true' },
          // {                                 name: 'avoidableMargin:',                 value: '2,2,2,2',  nameTooltip: 'Gets or sets the margin around this Node in which avoidable links will not be routed.\n\nYou may need to increase the fromEndSegmentLength and toEndSegmentLength\nin order to prevent link routes from turning within the avoidable area around the Node.', tooltip: 'default: 2,2,2,2' },
          // {                                 name: 'isTreeExpanded:',                  value: true,       nameTooltip: 'Gets or sets whether the subtree graph starting at this node is expanded.\nChanging this property\'s value will call collapseTree or expandTree,\nand also will call the value of treeExpandedChanged if it is a function.', tooltip: 'default: true' },
          // {                                 name: 'isTreeLeaf:',                      value: true,       nameTooltip: 'The initial value is true, meaning that there are no links connected with child nodes.', tooltip: 'default: true' },
          // { category: '- Group -',          name: 'computesBoundsAfterDrag:',         value: false,      nameTooltip: 'Gets or sets whether the size of the area of the Group\'s placeholder\nshould remain the same during a DraggingTool move until a drop occurs.', tooltip: 'default: false' },
          // {                                 name: 'computesBoundsIncludingLinks:',    value: true,       nameTooltip: 'Gets or sets whether a placeholder\'s bounds includes the bounds of member Links.', tooltip: 'default: true' },
          // {                                 name: 'computesBoundsIncludingLocation:', value: false,      nameTooltip: 'Gets or sets whether a placeholder\'s bounds includes the previous Group.location.', tooltip: 'default: false' },
          // {                                 name: 'handlesDragDropForMembers:',       value: false,      nameTooltip: 'Gets or sets whether drag-and-drop events may be bubbled up to this Group if not handled by member Parts.', tooltip: 'default: false' },
          // {                                 name: 'isSubGraphExpanded:',              value: true,       nameTooltip: 'Gets or sets whether the subgraph contained by this group is expanded.', tooltip: 'default: frue' },
          // {                                 name: 'wasSubGraphExpanded:',             value: false,      nameTooltip: 'Gets or sets whether the subgraph starting at this group had been collapsed by a call to expandSubGraph on the containing Group.', tooltip: 'default: frue' },
          // {                                 name: 'ungroupable:',                     value: false,      nameTooltip: 'Gets or sets whether the user may ungroup this group.', tooltip: 'default: false' },
          // {                                 name: 'layout:',                          value: 'layout',   nameTooltip: 'Gets or sets the Layout used to position all of the immediate member nodes and links in this group.', tooltip: 'default: false' },
          // { category: '- Group Actions -',  name: 'memberAdded:',                     value: 'function', nameTooltip: 'Gets or sets the function that is called after a member Part has been added to this Group.\nIt is typically used to modify the appearance of the group.', tooltip: 'args: (group,part)' },
          // {                                 name: 'memberRemoved:',                   value: 'function', nameTooltip: 'Gets or sets the function that is called after a member Part has been removed from this Group.\nIt is typically used to modify the appearance of the group.', tooltip: 'args: (group,part)' },
          // {                                 name: 'memberValidation:',                value: 'function', nameTooltip: 'Gets or sets the predicate that determines whether or not a Part may become a member of this group.', tooltip: 'args: (group,part) -> bool' },
          // {                                 name: 'subGraphExpandedChanged:',         value: 'function', nameTooltip: 'Gets or sets the function that is called when isSubGraphExpanded has changed value. The argument to that function will be this Group.', tooltip: 'args: (group)' },
        ]
      },
      {
        type: 'Auto Panel',
        category: 'DSLCompose_AutoPanel',
        isLabelEditable: false,
        list_: [
          { portId: '1item' },
          { portId: '2item' }
        ],
        showProperty: false,
        props_: [
          // { name: 'name:', value: '', category: '- General -', nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'visible:', value: true, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'pickable:', value: true, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'cursor:', value: true, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'opacity:', value: 1, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'background:', value: true, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'shadowVisible:', value: null, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'tooltip:', value: '', nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'desiredSize:', value: true, category: '- Sizing -', nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'width:', value: true, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'height:', value: true, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'minSize:', value: true, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'maxSize:', value: true, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'angle:', value: true, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'scale:', value: 1, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'stretch:', value: true, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'position:', value: 'NaN,NaN', category: '- Positioning -', nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'alignment:', value: '0,0,0,0', nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'alignmentFocus:', value: '0,0,0,0', nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'isMainPanel:', value: false, nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'margin:', value: '0,0,0,0', nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'padding:', value: '0,0,0,0', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'isEnabled:', value: true, category: '- Actions -', nameTooltip: 'Gets or sets whether this Panel or any GraphObject inside the panel actually responds to user click events. It may be used as a Binding target.', tooltip: 'default: true' },
          // { name: 'actionCancel:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'actionDown:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'actionUp:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'actionMove:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'mouseDragEnter:', value: 'function', category: '- Events -', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'mouseDragLeave:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'mouseDrop:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'mouseEnter:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'mouseHold:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'mouseHover:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'mouseLeave:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'mouseOver:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'click:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'doubleClick:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
          // { name: 'contextClick:', value: 'function', nameTooltip: 'Gets or sets the space between this Panel\'s border and its content.\nUnlike GraphObject.margin, padding expands the area inside of the Panel\'s border.\nIf this Panel\'s size is unconstrained, this will increase the size of the panel.\nIf this Panel\'s size is constrained, this will decrease the total area for the Panel elements to arrange themselves.', tooltip: 'default: 0,0,0,0' },
        ]
      },
      {
        type: 'Vertical Panel',
        category: 'DSLCompose_VerticalPanel',
        isLabelEditable: false,
        list_: [
          { portId: '1item' }
        ],        
        showProperty: false,
        props_: [
          { name: 'key:', value: 'value', "keyId": "1key", "valueId": "1value" },
        ],
      },
      {
        type: 'Horizontal Panel',
        category: 'DSLCompose_HorizontalPanel',
        isLabelEditable: false,
        list_: [
          { portId: '1item' }
        ],
        showProperty: false,
        props_: [
          { name: 'key:', value: 'value', "keyId": "1key", "valueId": "1value" },
        ],
      },
      {
        type: 'Rectangle',
        category: 'DSLCompose_Shape',
        isLabelEditable: false,
        color: 'Yellow',        
        showProperty: false,
        props_: [
          { name: 'key:', value: 'value', "keyId": "1key", "valueId": "1value" },
        ],
      },
      {
        type: 'Text',
        label: 'Label',
        category: 'DSLCompose_Text',
        isLabelEditable: false,
        color: 'Black',        
        showProperty: false,
        props_: [
          { name: 'key:', value: 'value', "keyId": "1key", "valueId": "1value" },
        ],
      },
      {
        type: 'Picture',
        category: 'DSLCompose_Picture',
        isLabelEditable: false,
        color: 'Black',        
        showProperty: false,
        props_: [
          { name: 'key:', value: 'value', "keyId": "1key", "valueId": "1value" },
        ],
        fileURL: "/fileServer/pictures/Monalisa.png"
      },
      {
        type: 'Function',
        label: 'Function name',
        category: 'DSLCompose_Function',
        isLabelEditable: false,
        showProperty: false,
        props_: [
          { name: 'key:', value: 'value', "keyId": "1key", "valueId": "1value" },
        ],
        portId: 'Func',
        isFile: true,
        fileType: "text/javascript",
        fileContent: ''
      },
      {
        type: 'Binding',
        label: 'FBinding name',
        category: 'DSLCompose_Binding',
        isLabelEditable: false,
        showProperty: false,
        props_: [
          { name: 'key:', value: 'value', "keyId": "1key", "valueId": "1value" },
        ],
        portId: 'Func',
        bindId: 'Bind',
        isFile: true,
        fileType: "text/javascript",
        fileContent: ''
      },
      {
        type: 'DataFields',
        category: 'DSLCompose_DataFields',
        isLabelEditable: false,
        props_: [
          { name: 'key:', value: 'value' },
        ],
      },
    ],
    
    templateGroupList: [
      { category: 'DSLCompose_DSLElement',            template: dsl_DSLElement, param: {} },
    ],
    dataGroupList: [
      {
        label: 'DSLElement',
        category: 'DSLCompose_DSLElement',
        isGroup: true,
        showProperty: true,
        props_: [
        ],
        size: '160 100',
      },
    ],
    templateLinkList: [
      { category: 'DSLCompose_Arrow',    template: ()=>{
        return(
          $(go.Link,
            { 
              curve: go.Link.JumpGap,         
              reshapable: true,
              resegmentable: true,
              relinkableFrom: true,
              relinkableTo: true,
            },
            new go.Binding("points", "points").makeTwoWay(),
            $(go.Shape),
            $(go.Shape, { toArrow: "Standard" })
          )
        );
      }},
        //dsl_BasicLink, param: { stroke:'SlateBlue', toArrow: 'standard', toScale: 1, strokeWidth: 2, toShortLength:10 }},
    ],
    dataLinkList: [
      {
        category: 'DSLCompose_Arrow',
        fromPort: '',
        toPort: '',
      },
    ],
  };

  return( dsl );
}
