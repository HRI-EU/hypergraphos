/*
   DSL for Brain Storming
    - Created 08-07-2021
    - By Frankonello
*/
function ThinkingDSL_includeList() {
  return(['/fileServer/DSLInclude.js']);
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

  const cm = g.contextMenu;
  cm.add( menuDSL, 'basicNodeMenu' );

  const selectedNodeContextMenu = cm.getMenu( 'basicNodeMenu' );
  //-----------------------
  // Define event handler
  //-----------------------

 
  //-----------------------
  // Define palette
  //-----------------------
  
  const dsl = {
    templateNodeList: [
      { category: 'Thinking_BigComment',              template: dsl_BasicNode, param: {hasTag: false, hasType:false,  minSize: new go.Size(270,60), figure: "rectangle",            fill: "white",         textAlign: "center",  fromLinkable: false, toLinkable: false, labelStroke: "darkgray", font: "bold 36px sans-serif", label: "", menu: selectedNodeContextMenu} },
      { category: 'Thinking_Comment',                 template: dsl_BasicNode, param: {hasTag: false, hasType:false,  minSize: new go.Size(270,40), figure: "rectangle",            fill: "LightGray",     textAlign: "center",  fromLinkable: false, toLinkable: false, labelStroke: "black", font: "bold 20px sans-serif", } },
      { category: 'Thinking_RectangleCenter',         template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "rectangle",            fill: "powderblue",    textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_RectangleLeft',           template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "rectangle",            fill: "powderblue",    textAlign: "left",    fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_RoundedRectangleCenter',  template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "roundedRectangle",     fill: "yellowgreen",   textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_RoundedRectangleLeft',    template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "roundedRectangle",     fill: "yellowgreen",   textAlign: "left",    fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_HexagoneCenter',          template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "RightPointLeftPoint",  fill: "lightsalmon",   textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_PointLeftCenter',         template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "LeftPointSquare",      fill: "peachpuff",     textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_PointLeftRight',          template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "LeftPointSquare",      fill: "peachpuff",     textAlign: "right",   fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_PointRightCenter',        template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "RightPointSquare",     fill: "khaki",         textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_PointRightLeft',          template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,40), figure: "RightPointSquare",     fill: "khaki",         textAlign: "left",    fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Thinking_CircleCenterGreen',       template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,10),  figure: "circle",               fill: "darkcyan",      textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "white"} },
      { category: 'Thinking_CircleCenterRed',         template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,10),  figure: "circle",               fill: "crimson",       textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "white"} },
      { category: 'Thinking_EllipseCenter',           template: dsl_BasicNode, param: {hasTag: true,  hasType:true,   minSize: new go.Size(10,10), figure: "ellipse",              fill: "palegreen",     textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
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