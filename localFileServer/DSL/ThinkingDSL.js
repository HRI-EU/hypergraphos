/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
   DSL for Brain Storming
    - Created 08-07-2021
    - By Frankonello
*/
function ThinkingDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}
function ThinkingDSL_setupDSL( g ) {
/*  let diagram = (g.diagram? g.diagram: g.nodePalette);

  const cm = g.contextMenu;
  cm.add( menuDSL, 'basicNodeMenu' );

  const selectedNodeContextMenu = cm.getMenu( 'basicNodeMenu' );

  // create a button that brings up the context menu
  function CMButton(options) {
    return $(go.Shape,
      {
        fill: "orange", stroke: "gray", background: "transparent",
        geometryString: "F1 M0 0 M0 4h4v4h-4z M6 4h4v4h-4z M12 4h4v4h-4z M0 12",
        isActionable: true, cursor: "context-menu",
        
        click: (e, shape) => {
          selectedNodeContextMenu.show(shape.part.data);
        }
      },
      options || {});
  }
  function onSelectionChanged( node ) { 
    if( node.isSelected ){
      console.log('selected')
      node.add
    } else {
      console.log('not selected')
    }
    //selectedNodeContextMenu.hide(node.data); 
  };

  const nodeTemplate = diagram.nodeTemplateMap.get( 'Thinking_BigComment' );
  if( nodeTemplate ) {
    nodeTemplate.selectionAdornmentTemplate =
      $(go.Adornment, "Spot",
        $(go.Placeholder, 
          { 
            padding: 10,
          }),
        CMButton({ 
          alignment: new go.Spot(0.90, 0),
         }),
      );
    nodeTemplate.selectionChanged = onSelectionChanged;
  }*/
  
}
function ThinkingDSL_getDSL( g ) {
  let diagram = (g.diagram? g.diagram: g.nodePalette);
/*
  ANTONELLO: This menu generate an error. I don't know why
             I also changed the first line of the templateNodeList
  const cm = g.contextMenu;
  cm.add( menuDSL, 'basicNodeMenu' );

  const selectedNodeContextMenu = cm.getMenu( 'basicNodeMenu' );
*/
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
  //-----------------------
  // Define palette
  //-----------------------
  
  const dsl = {
    templateNodeList: [
      //{ category: 'Thinking_BigComment',              template: dsl_BasicNode, param: {hasTag: false, hasType:false,  minSize: new go.Size(270,60), figure: "rectangle",            fill: "white",         labelTextAlign: "center",  isFromLinkable: false, isToLinkable: false, labelStroke: "darkgray", labelFont: "bold 36px sans-serif", label: "", menu: selectedNodeContextMenu} },
      { category: 'Thinking_BigComment',              template: dsl_BasicNode, param: {hasTag: false, hasType:false,  minSize: new go.Size(270,60), figure: "rectangle",            fill: "white",         labelTextAlign: "center",  isFromLinkable: false, isToLinkable: false, labelStroke: "darkgray", labelFont: "bold 36px sans-serif", label: ""} },
      { category: 'Thinking_Comment',                 template: dsl_BasicNode, param: {hasTag: false, hasType:false,  minSize: new go.Size(270,40), figure: "rectangle",            fill: "LightGray",     labelTextAlign: "center",  isFromLinkable: false, isToLinkable: false, labelStroke: "black", labelFont: "bold 20px sans-serif", } },
      { category: 'Thinking_RectangleCenter',         template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "rectangle",            fill: "powderblue",    labelTextAlign: "center",  isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_RectangleLeft',           template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "rectangle",            fill: "powderblue",    labelTextAlign: "left",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_RoundedRectangleCenter',  template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "roundedRectangle",     fill: "yellowgreen",   labelTextAlign: "center",  isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_RoundedRectangleLeft',    template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "roundedRectangle",     fill: "yellowgreen",   labelTextAlign: "left",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_HexagoneCenter',          template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "RightPointLeftPoint",  fill: "lightsalmon",   labelTextAlign: "center",  isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_PointLeftCenter',         template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "LeftPointSquare",      fill: "peachpuff",     labelTextAlign: "center",  isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_PointLeftRight',          template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "LeftPointSquare",      fill: "peachpuff",     labelTextAlign: "right",   isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_PointRightCenter',        template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "RightPointSquare",     fill: "khaki",         labelTextAlign: "center",  isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_PointRightLeft',          template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "RightPointSquare",     fill: "khaki",         labelTextAlign: "left",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_CircleCenterGreen',       template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,10),  figure: "circle",               fill: "darkcyan",      labelTextAlign: "center",  isFromLinkable: true,  isToLinkable: true, labelStroke: "white"} },
      { category: 'Thinking_CircleCenterRed',         template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,10),  figure: "circle",               fill: "crimson",       labelTextAlign: "center",  isFromLinkable: true,  isToLinkable: true, labelStroke: "white"} },
      { category: 'Thinking_EllipseCenter',           template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,10), figure: "ellipse",              fill: "palegreen",     labelTextAlign: "center",  isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
    ],
    dataNodeList: [
      {
        label: 'Big Comment',
        tag: 'tag',
        type: 'type',
        category: 'Thinking_BigComment',
        size: "150 40"
      },
      {
        label: 'Comment',
        tag: 'tag',
        type: 'type',
        category: 'Thinking_Comment',
        size: "150 40"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_RectangleCenter',
        size: "150 40"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_RectangleLeft',
        size: "150 40"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_RoundedRectangleCenter',
        size: "150 40"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_RoundedRectangleLeft',
        size: "150 40"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_HexagoneCenter',
        size: "150 40"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_PointLeftCenter',
        size: "150 40"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_PointLeftRight',
        size: "150 40"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_PointRightCenter',
        size: "150 40"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_PointRightLeft',
        size: "150 40"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_CircleCenterGreen',
        size: "80 80"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_CircleCenterRed',
        size: "80 80"
      },
      {
        tag: 'tag',
        type: 'type',
        category: 'Thinking_EllipseCenter',
        size: "150 40"
      },
    ],
    templateLinkList: [],
    dataLinkList: [],
  };

  return( dsl );
}