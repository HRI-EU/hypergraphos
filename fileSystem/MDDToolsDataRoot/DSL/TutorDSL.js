/*
   DSL for Graph Dialog
    - Created 08-07-2021
    - By Frankonello
*/
function TutorDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}
function TutorDSL_getDSL( g ) {
    let diagram = (g.diagram? g.diagram: g.nodePalette);


  //-----------------------
  // Define specific menus
  //-----------------------   
  /*
  function changeModality(e, button) {
    e.handled = true;  // don't let the click bubble up
    let menuText = e.targetObject.text;
    updateModality( menuText );
  }
  function changeType(e, button) {
    e.handled = true;  // don't let the click bubble up
    let menuText = e.targetObject.text;
    updateType( menuText );
  }

  const modalityMenuTemplate = 
  $("ContextMenu",
    $("ContextMenuButton", $(go.TextBlock, "internal"),  { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "emotion"),   { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "body"),      { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "leftHand"),  { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "rightHand"), { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "gaze"),      { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "eyeLid"),    { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "speech"),    { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "vision"),    { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "signal"),    { defaultStretch: go.GraphObject.Horizontal, click: changeModality })
  );
  const doWMMenuTemplate = 
  $("ContextMenu",
    $("ContextMenuButton", $(go.TextBlock, "activate wm!"), { defaultStretch: go.GraphObject.Horizontal, click: changeType }),
    $("ContextMenuButton", $(go.TextBlock, "reset wm!"),    { defaultStretch: go.GraphObject.Horizontal, click: changeType }),
    $("ContextMenuButton", $(go.TextBlock, "inhibit wm!"),  { defaultStretch: go.GraphObject.Horizontal, click: changeType })
  );
  // Define menu for WM conditions
  const isWMMenuTemplate = 
  $("ContextMenu",
    $("ContextMenuButton", $(go.TextBlock, "is wm activated?"), { defaultStretch: go.GraphObject.Horizontal, click: changeType }),
    $("ContextMenuButton", $(go.TextBlock, "is wm inhibited?"), { defaultStretch: go.GraphObject.Horizontal, click: changeType })
  );
  // Define menu for slot conditions
  const isSlotMenuTemplate = 
  $("ContextMenu",
    $("ContextMenuButton", $(go.TextBlock, "emptySlot"),      { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "filledSlot"),     { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "changedSlot"),    { defaultStretch: go.GraphObject.Horizontal, click: changeModality }),
    $("ContextMenuButton", $(go.TextBlock, "unchangedSlot"),  { defaultStretch: go.GraphObject.Horizontal, click: changeModality })
  );
  */
  function updateModality( modality, diagram ) {
    const node = diagram.selection.first();
    if( node ) {
      const data = node.data;
      diagram.startTransaction( "changeModality" );
      // Change modality in model with the menu text
      diagram.model.set( data, "modality", modality );
      //console.log(button.part.data)
      diagram.commitTransaction( "changeModality" );
    }
  }
  function updateType( type, diagram ) {
    const node = diagram.selection.first();
    if( node ) {
      const data = node.data;
      diagram.startTransaction( "changeAspect" );
      // Change type in model with the menu text
      diagram.model.set( data, "type", type );
      diagram.commitTransaction( "changeAspect" );
    }
  }

  const cm = g.contextMenu;
  cm.add({
    'modalityContextMenu':
      { layout: 'vertical', itemList: [
        { label: 'internal',    do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'emotion',     do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'body',        do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'leftHand',    do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'rightHand',   do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'gaze',        do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'eyeLid',      do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'speech',      do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'vision',      do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'signal',      do: (o)=> updateModality( o.item.label, o.d.diagram ) },
      ]},
    'doWMContextMenu':
      { layout: 'vertical', itemList: [
        { label: 'activate wm!',  do: (o)=> updateType( o.item.label, o.d.diagram ) },
        { label: 'reset wm!',     do: (o)=> updateType( o.item.label, o.d.diagram ) },
        { label: 'inhibit wm!',   do: (o)=> updateType( o.item.label, o.d.diagram ) },
      ]},
    'isWMContextMenu':
      { layout: 'vertical', itemList: [
        { label: 'is wm activated?',   do: (o)=> updateType( o.item.label, o.d.diagram ) },
        { label: 'is wm inhibited?',   do: (o)=> updateType( o.item.label, o.d.diagram ) },
      ]},
    'isSlotContextMenu':
      { layout: 'vertical', itemList: [
        { label: 'emptySlot',       do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'filledSlot',      do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'changedSlot',     do: (o)=> updateModality( o.item.label, o.d.diagram ) },
        { label: 'unchangedSlot',   do: (o)=> updateModality( o.item.label, o.d.diagram ) },
      ]},
  });

  const modalityMenuTemplate = cm.getMenu( 'modalityContextMenu' );
  const doWMMenuTemplate = cm.getMenu( 'doWMContextMenu' );
  // Define menu for WM conditions
  const isWMMenuTemplate = cm.getMenu( 'isWMContextMenu' );
  // Define menu for slot conditions
  const isSlotMenuTemplate = cm.getMenu( 'isSlotContextMenu' );

  //-----------------------
  // Define specific maps
  //-----------------------   
  
  const icons = {
    "wm":             "M 0 -15 L 0 0 L 2 0 L 4 -5 L 6 0 L 8 0 L 8 -15 L 6 -15 L 6 -5 L 4 -10 L 2 -5 L 2 -15 z M 10 0 L 10 -15 L 12 -15 L 14 -10 L 16 -15 L 18 -15 L 18 0 L 16 0 L 16 -10 L 14 -6 L 12 -10 L 12 0 z",
    "leftHand":       "M 0 0 L 2.2 0 L 2.2 -14.72 L 0 -14.72 L 2.2 -14.72 L 2.2 0 M 2.2 -1.92 L 6.68 -1.92 L 6.68 -12.8 L 2.2 -12.8 z M 4.12 -3.84 C 4.12 -3.84 4.12 -3.2 4.76 -3.2 C 5.4 -3.2 5.4 -3.84 5.4 -3.84 C 5.4 -4.48 4.76 -4.48 4.76 -4.48 C 4.12 -4.48 4.12 -3.84 4.12 -3.84 z M 6.68 -3.84 L 9.24 -3.84 C 9.88 -2.56 10.52 -2.56 11.8 -2.56 L 23.96 -2.56 C 25.88 -2.56 25.88 -5.12 23.96 -5.12 L 16.92 -5.12 L 25.24 -5.12 C 27.16 -5.12 27.16 -7.68 25.24 -7.68 L 18.2 -7.68 L 26.52 -7.68 C 28.44 -7.68 28.44 -10.24 26.52 -10.24 L 16.92 -10.24 L 25.24 -10.24 C 27.16 -10.24 27.16 -12.8 25.24 -12.8 L 15.64 -12.8 C 15.64 -8.32 13.08 -7.68 10.52 -7.68 C 13.08 -7.68 15.64 -8.32 15.64 -12.8 L 13.72 -12.8 C 14.36 -13.44 15.64 -14.08 18.2 -14.08 C 20.12 -14.08 20.12 -16.64 18.2 -16.64 C 14.36 -16.64 9.24 -15.36 9.24 -10.88 L 6.68 -10.88 z",
    "rightHand":      "M 28 0 L 25.8 0 L 25.8 -14.72 L 28 -14.72 L 25.8 -14.72 L 25.8 0 M 25.8 -1.92 L 21.32 -1.92 L 21.32 -12.8 L 25.8 -12.8 z M 23.88 -3.84 C 23.88 -3.84 23.88 -3.2 23.24 -3.2 C 22.6 -3.2 22.6 -3.84 22.6 -3.84 C 22.6 -4.48 23.24 -4.48 23.24 -4.48 C 23.88 -4.48 23.88 -3.84 23.88 -3.84 z M 21.32 -3.84 L 18.76 -3.84 C 18.12 -2.56 17.48 -2.56 16.2 -2.56 L 4.04 -2.56 C 2.12 -2.56 2.12 -5.12 4.04 -5.12 L 11.08 -5.12 L 2.76 -5.12 C 0.84 -5.12 0.84 -7.68 2.76 -7.68 L 9.8 -7.68 L 1.48 -7.68 C -0.44 -7.68 -0.44 -10.24 1.48 -10.24 L 11.08 -10.24 L 2.76 -10.24 C 0.84 -10.24 0.84 -12.8 2.76 -12.8 L 12.36 -12.8 C 12.36 -8.32 14.92 -7.68 17.48 -7.68 C 14.92 -7.68 12.36 -8.32 12.36 -12.8 L 14.28 -12.8 C 13.64 -13.44 12.36 -14.08 9.8 -14.08 C 7.88 -14.08 7.88 -16.64 9.8 -16.64 C 13.64 -16.64 18.76 -15.36 18.76 -10.88 L 21.32 -10.88 z",
    "emotion":        "M 13 26 c 7.0696 0 13 -6 13 -13 s -6 -13 -13 -13 s -13 6 -13 13 s 6 13 13 13 z z M 6 9 c 0 -1 1 -2 2 -2 s 2 1 2 2 c 0 1 -1 2 -2 2 s -2 -1 -2 -2 z M 16 9 c 0 -1 1 -2 2 -2 s 2 1 2 2 c 0 1 -1 2 -2 2 s -2 -1 -2 -2 z M 18 16 l 2 1 c -2 3 -4 4 -7 4 s -5 -1 -7 -4 l 2 -1 c 2 3 4 3 5 3 s 3 0 5 -3 z",
    "speech":         "M 0 0 L 3 -5 C 2 -6 0 -8 0 -10 C 0 -15 6 -19 14 -19 C 22 -19 28 -15 28 -10 C 28 -5 22 -1 14 -1 C 10 -1 8 -2 6 -3 z",
    "gaze":           "M 0 -11 C 2 -8 4 -8 5 -8 C 6 -8 8 -8 10 -11 C 8 -14 6 -14 5 -14 C 4 -14 2 -14 0 -11 z M 3 -11 C 3 -12 4 -13 5 -13 C 6 -13 7 -12 7 -11 C 7 -10 6 -9 5 -9 C 4 -9 3 -10 3 -11 z z M 15 -11 C 17 -8 19 -8 20 -8 C 21 -8 23 -8 25 -11 C 23 -14 21 -14 20 -14 C 19 -14 17 -14 15 -11 z M 18 -11 C 18 -12 19 -13 20 -13 C 21 -13 22 -12 22 -11 C 22 -10 21 -9 20 -9 C 19 -9 18 -10 18 -11 z M 5 -11 L 16 -1 L 20 -11 L 16 -1 z M 14 -3 L 18 -3 L 18 1 L 14 1 z",
    "eyeLid":         "M 0 0 C 2.2 3.3 4.4 3.3 5.5 3.3 C 6.6 3.3 8.8 3.3 11 0 C 8.8 -3.3 6.6 -3.3 5.5 -3.3 C 4.4 -3.3 2.2 -3.3 0 0 z M 3.3 0 C 3.3 -1.1 4.4 -2.2 5.5 -2.2 C 6.6 -2.2 7.7 -1.1 7.7 0 C 7.7 1.1 6.6 2.2 5.5 2.2 C 4.4 2.2 3.3 1.1 3.3 0 z z M 16.5 0 C 18.7 3.3 20.9 3.3 22 3.3 C 23.1 3.3 25.3 3.3 27.5 0 C 25.3 -3.3 23.1 -3.3 22 -3.3 C 20.9 -3.3 18.7 -3.3 16.5 0 z M 0.88 -1.21 L 0 -2.09 M 2.09 -2.31 L 1.32 -3.3 M 3.74 -3.08 L 3.41 -4.18 M 5.5 -3.3 L 5.5 -4.4 M 7.26 -3.08 L 7.59 -4.18 M 8.91 -2.31 L 9.68 -3.3 M 10.12 -1.21 L 11 -2.09 M 17.38 1.21 L 16.5 2.09 M 18.59 2.31 L 17.82 3.3 M 20.24 3.08 L 19.91 4.18 M 22 3.3 L 22 4.4 M 23.76 3.08 L 24.09 4.18 M 25.41 2.31 L 26.18 3.3 M 26.62 1.21 L 27.5 2.09",
    "internal":       "M 0 0 l 0 -11 c 0 -1 1 -1 1 0 L 1 -6 L 3 -6 L 3 -9 L 4 -9 L 6 -11 L 9 -11 L 9 -13 L 6 -13 C 5 -13 5 -14 6 -14 L 13 -14 C 14 -14 14 -13 13 -13 L 10 -13 L 10 -11 L 14 -11 L 16 -9 L 18 -9 L 18 -11 L 21 -11 L 21 0 L 18 0 L 18 -2 L 16 -2 L 14 0 L 6 0 L 4 -2 L 3 -2 L 3 -5 L 1 -5 l 0 5 c 0 1 -1 1 -1 0 z",
    "body":           "M 0.88 -9.76 L 4.08 -5.92 C 6 -4.64 6.64 -5.28 9.84 -7.84 C 11.12 -7.2 13.04 -5.92 14.32 -4.64 L 16.24 -0.8 C 16.88 1.12 18.8 0.48 18.8 -0.8 C 18.16 -2.08 17.52 -4.64 16.24 -5.92 L 13.04 -9.76 C 14.32 -11.68 15.6 -12.96 16.24 -14.24 C 16.88 -14.24 17.52 -12.96 20.08 -12.96 C 22 -12.96 23.92 -14.88 23.92 -15.52 C 25.2 -16.8 23.28 -18.72 22 -16.8 C 21.36 -16.16 21.36 -15.52 20.08 -15.52 C 18.16 -15.52 14.96 -18.72 13.68 -19.36 C 7.92 -22.56 6.64 -18.72 4.72 -16.8 C 3.44 -15.52 5.36 -13.6 6.64 -15.52 C 7.92 -17.44 9.2 -19.36 11.76 -17.44 C 10.48 -15.0933 9.2 -12.7467 7.92 -10.4 C 5.36 -5.92 4.72 -9.12 2.8 -11.04 c -1.28 -1.28 -3.2 0 -1.92 1.28 Z M 15.6 -23.2 C 14.96 -22.56 14.32 -21.28 15.6 -20 C 16.24 -19.36 17.52 -18.72 18.8 -20 C 19.44 -20.64 20.08 -21.92 18.8 -23.2 C 18.16 -23.84 16.88 -24.48 15.6 -23.2 z",
    "vision":         "M 0 -8 C 3 -2 9 0 14 0 C 19 0 25 -2 28 -8 C 25 -14 19 -16 14 -16 C 9 -16 3 -14 0 -8 z M 8 -8 C 8 -11 11 -14 14 -14 C 14 -12.5 14 -11 14 -8 L 17.75 -8 L 17.75 -9.5 C 17.75 -10.85 17.75 -11.6 17.75 -12.35 C 17.9 -12.2 20 -10.4 20 -8 C 20 -5 17 -2 14 -2 C 11 -2 8 -5 8 -8 z",
    "signal":         "M -2.3 -14.5 L 1.1 -3.1 C 1.7 -0.9 2.6 -1.4 2.9 -3 L 4.1 -11.8 L 6.3 1.5 C 6.5 3 7.4 3.2 7.8 1.5 L 9.8 -8.9 L 10.5 -6.6 C 10.7 -5.7 11.5 -5.5 11.9 -6.6 L 13.9 -13.2 L 14.7 -8.4 L 17.8 -8.4 C 19 -8.4 19 -7.1 20.5 -7.1 C 22 -7.1 23 -8.5 23 -10 C 23 -11.5 22 -12.8 20.5 -12.8 C 19 -12.8 19 -11.5 17.8 -11.5 L 16.8 -11.5 L 15.2 -19.9 C 14.4 -20.55 13.8 -20.55 13.65 -19.95 L 11.2 -12.3 L 10.4 -15 C 9.9 -16.8 9 -16.7 8.6 -15.1 L 7.2 -7.8 L 4.9 -21.1 C 4.5 -23.5 3.4 -23.5 3 -21 L 1.5 -9.45 L 0 -15 C -0.6 -17.2 -2.8 -16.5 -2.3 -14.5 Z",
    "emptySlot":      "M 10 0 C 16 0 20 -5 20 -10 C 20 -12 18 -12 18 -10 C 18 -6 15 -2 10 -2 C 5 -2 2 -6 2 -10 C 2 -12 0 -12 0 -10 C 0 -5 4 0 10 0 z M 10 -18",
    "filledSlot":     "M 10 0 C 16 0 20 -5 20 -10 C 20 -12 18 -12 18 -10 L 10 -10 L 2 -10 C 2 -12 0 -12 0 -10 C 0 -5 4 0 10 0 z M 10 -11 L 16 -15 L 14 -15 L 14 -18 L 6 -18 L 6 -15 L 4 -15 Z",
    "changedSlot":    "M 10 0 C 16 0 20 -5 20 -10 C 20 -12 18 -12 18 -10 L 10 -10 L 2 -10 C 2 -12 0 -12 0 -10 C 0 -5 4 0 10 0 z M 6 -11 L 10 -15 L 8 -15 L 8 -18 L 4 -18 L 4 -15 L 2 -15 Z M 14 -18 L 10 -14 L 12 -14 L 12 -11 L 16 -11 L 16 -14 L 18 -14 Z",
    "unchangedSlot":  "M 10 0 C 16 0 20 -5 20 -10 C 20 -12 18 -12 18 -10 L 10 -10 L 2 -10 C 2 -12 0 -12 0 -10 C 0 -5 4 0 10 0 z M 10 -18 L 15 -18 L 15 -16 L 5 -16 L 5 -18 Z M 10 -14 L 15 -14 L 15 -12 L 5 -12 L 5 -14 Z",
  };
  const types = {
    "is outer miron recognized?": "RightPointExternalArrowIn", 
    "is inner miron recognized?": "RightPointInternalArrowIn",
    "is outer miron done?":       "RightPointExternalDiamon",
    "is inner miron done?":       "RightPointInternalDiamon",
    "is active?":                 "RightPointUShape",
    "is wm activated?":           "RightPointOutLevelUp",
    "is wm inhibited?":           "RightPointOutLevelDown",
    "do outer miron!":            "SquareExternalArrowOut",
    "do inner miron!":            "SquareInternalArrowOut",
    "activate wm!":               "SquareLevelUp",
    "reset wm!":                  "SquareLevelMiddle",
    "inhibit wm!":                "SquareLevelDown",
  };
  
  const modalities = {
    "internal":       {color: "BurlyWood",    textColor: "Black", isMenu: modalityMenuTemplate, doMenu: modalityMenuTemplate},
    "emptySlot":      {color: "Gold",         textColor: "Black", isMenu: isSlotMenuTemplate},
    "filledSlot":     {color: "Gold",         textColor: "Black", isMenu: isSlotMenuTemplate},
    "changedSlot":    {color: "Gold",         textColor: "Black", isMenu: isSlotMenuTemplate},
    "unchangedSlot":  {color: "Gold",         textColor: "Black", isMenu: isSlotMenuTemplate},
    "wm":             {color: "Thistle",      textColor: "Black", isMenu: isWMMenuTemplate,     doMenu: doWMMenuTemplate},
    "emotion":        {color: "LightPink",    textColor: "Black", isMenu: modalityMenuTemplate, doMenu: modalityMenuTemplate},
    "body":           {color: "LightSkyBlue", textColor: "Black", isMenu: modalityMenuTemplate, doMenu: modalityMenuTemplate},
    "leftHand":       {color: "LightSkyBlue", textColor: "Black", isMenu: modalityMenuTemplate, doMenu: modalityMenuTemplate},
    "rightHand":      {color: "LightSkyBlue", textColor: "Black", isMenu: modalityMenuTemplate, doMenu: modalityMenuTemplate},
    "gaze":           {color: "LightSkyBlue", textColor: "Black", isMenu: modalityMenuTemplate, doMenu: modalityMenuTemplate},
    "eyeLid":         {color: "LightSkyBlue", textColor: "Black", isMenu: modalityMenuTemplate, doMenu: modalityMenuTemplate},
    "speech":         {color: "LightGreen",   textColor: "Black", isMenu: modalityMenuTemplate, doMenu: modalityMenuTemplate},
    "vision":         {color: "DarkOrange",   textColor: "Black", isMenu: modalityMenuTemplate, doMenu: modalityMenuTemplate},
    "signal":         {color: "Black",        textColor: "White", isMenu: modalityMenuTemplate, doMenu: modalityMenuTemplate},
  };

  //-----------------------
  // Define node templates
  //-----------------------
  
  function addTable1Row(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findTableSelectedItems( node );
      let diagram = node.diagram;
      diagram.startTransaction("Add table row");
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      if (items.length > 0) {  // if there are any selected items, delete them
        const selectIndex = 0;
        const panel = items[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData.rows;
        const itemData = panel.data;
        itemIndex = itemArray.indexOf(itemData);
      } else {
        nodeData = node.data;
        itemArray = nodeData.rows;
      }
      diagram.model.insertArrayItem(itemArray, itemIndex, { "name": "value1"} );
      diagram.commitTransaction("Add table row");
    }
  }
  function addTable2Row(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findTableSelectedItems( node );
      let diagram = node.diagram;
      diagram.startTransaction("Add table row");
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      if (items.length > 0) {  // if there are any selected items, delete them
        const selectIndex = 0;
        const panel = items[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData.rows;
        const itemData = panel.data;
        itemIndex = itemArray.indexOf(itemData);
      } else {
        nodeData = node.data;
        itemArray = nodeData.rows;
      }
      diagram.model.insertArrayItem(itemArray, itemIndex, { "name": "key1", "value": "value1"} );
      diagram.commitTransaction("Add table row");
    }
  }
  function addTable3Row(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findTableSelectedItems( node );
      let diagram = node.diagram;
      diagram.startTransaction("Add table row");
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      if (items.length > 0) {  // if there are any selected items, delete them
        const selectIndex = 0;
        const panel = items[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData.rows;
        const itemData = panel.data;
        itemIndex = itemArray.indexOf(itemData);
      } else {
        nodeData = node.data;
        itemArray = nodeData.rows;
      }
      diagram.model.insertArrayItem(itemArray, itemIndex, { "name": "key1", "value": "value1", "unit": "unit1" } );
      diagram.commitTransaction("Add table row");
    }
  }
  function deleteTableRow(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findTableSelectedItems( node );
      if (items.length > 0) {  // if there are any selected items, delete them
        let diagram = node.diagram;
        diagram.startTransaction("Delete table row");
        for( let i = 0; i < items.length; i++ ) {
          const panel = items[i];
          const nodeData = panel.part.data;
          const itemArray = nodeData.rows;
          const itemData = panel.data;
          const itemIndex = itemArray.indexOf(itemData);
          diagram.model.removeArrayItem(itemArray, itemIndex);
        }
        diagram.commitTransaction("Delete table row");
      }
    }
  }
  function findTableSelectedItems( node ) {
    var items = [];
    var table = node.findObject("TABLE");
    if( table ) {
      for( var iit = table.elements; iit.next(); ) {
        var itempanel = iit.value;
        if( itempanel.background !== "transparent" ) {
          items.push(itempanel);
        }
      }
    }
    return items;
  }
  function findPortSelectedItems( node , portSide) {
    var items = [];
    var portPanel = node.findObject(portSide);
    if( portPanel ) {
      // Iterate on port items
      for( let it1 = portPanel.elements; it1.next(); ) {
        const panelItem = it1.value;
        
        // Find the next shape in the part hierarchy
        const it2 = panelItem.elements;
        it2.next();
        const obj = it2.value;
        if( obj.constructor.className == "Shape" ) {
          // Check if port shape is not white (means selected)
          if( obj.fill !== "white" ) {
            items.push(panelItem);
          }
        }
      }
    }
    return items;
  }
  function addInPort(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findPortSelectedItems( node, "INPORT" );
      console.log(items);
      let diagram = node.diagram;
      diagram.startTransaction("Add in port");
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      if (items.length > 0) {  // if there are any selected items, delete them
        const selectIndex = 0;
        const panel = items[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData.in;
        const itemData = panel.data;
        itemIndex = itemArray.indexOf(itemData);
      } else {
        nodeData = node.data;
        itemArray = nodeData.in;
      }
      diagram.model.insertArrayItem(itemArray, itemIndex, { "portId": "in"} );
      diagram.commitTransaction("Add in port");
    }
  }
  function addOutPort(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findPortSelectedItems( node, "OUTPORT" );
      console.log(items);
      let diagram = node.diagram;
      diagram.startTransaction("Add out port");
      let itemIndex = -1;
      let nodeData;
      let itemArray;
      if (items.length > 0) {  // if there are any selected items, delete them
        const selectIndex = 0;
        const panel = items[selectIndex];
        nodeData = panel.part.data;
        itemArray = nodeData.out;
        const itemData = panel.data;
        itemIndex = itemArray.indexOf(itemData);
      } else {
        nodeData = node.data;
        itemArray = nodeData.out;
      }
      diagram.model.insertArrayItem(itemArray, itemIndex, { "portId": "out"} );
      diagram.commitTransaction("Add out port");
    }
  }
  function deleteInPort(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findPortSelectedItems( node, "INPORT" );
      if (items.length > 0) {  // if there are any selected items, delete them
        let diagram = node.diagram;
        diagram.startTransaction("Delete in port");
        for( let i = 0; i < items.length; i++ ) {
          const panel = items[i];
          const nodeData = panel.part.data;
          const itemArray = nodeData.in;
          const itemData = panel.data;
          const itemIndex = itemArray.indexOf(itemData);
          diagram.model.removeArrayItem(itemArray, itemIndex);
        }
        diagram.commitTransaction("Delete in port");
      }
    }
  }
  function deleteOutPort(e, obj) {
    const node = obj.part;
    if (node) {
      const items = findPortSelectedItems( node, "OUTPORT"  );
      if (items.length > 0) {  // if there are any selected items, delete them
        let diagram = node.diagram;
        diagram.startTransaction("Delete out port");
        for( let i = 0; i < items.length; i++ ) {
          const panel = items[i];
          const nodeData = panel.part.data;
          const itemArray = nodeData.out;
          const itemData = panel.data;
          const itemIndex = itemArray.indexOf(itemData);
          diagram.model.removeArrayItem(itemArray, itemIndex);
        }
        diagram.commitTransaction("Delete out port");
      }
    }
  }

  // A data binding conversion function. Given an icon name, return a Geometry.
  // This assumes that all icons want to be filled.
  // This caches the Geometry, because the Geometry may be shared by multiple Shapes.
  function geoFunc(geoname) {
    let geo = icons[geoname];
    if (geo === undefined) geo = icons["speech"];  
    if (typeof geo === "string") {
      geo = icons[geoname] = go.Geometry.parse(geo, true);  // fill each geometry
    }
    return geo;
  }
  function typeFunc(type) {
    let geo = types[type];
    if (geo === undefined) geo = types["do outer!"];  
    return geo;
  }
  function fillFunc(modality) {
    let fill = modalities[modality].color;
    if (fill === undefined) fill = modalities.speech.color; 
    return fill;
  }
  function strokeFunc(modality) {
    let stroke = modalities[modality].textColor;
    if (stroke === undefined) stroke = modalities.speech.textColor; 
    return stroke;
  }
  function isMenuFunc(modality) {
    let menu = modalities[modality].isMenu;
    if (menu === undefined) menu = modalities.speech.isMenu;  
    return menu;
  }
  function doMenuFunc(modality) {
    let menu = modalities[modality].doMenu;
    if (menu === undefined) menu = modalities.speech.doMenu;  
    return menu;
  }
 
    
  const dsl_Condition = ()=> {
    return $(go.Node, "Horizontal",
      { 
        resizeObjectName: 'BODY',
        resizable: true,
        locationObjectName: "CIRCLE",  
        locationSpot: go.Spot.Center,
      },
      new go.Binding("location", "location",go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Panel, "Auto",
        $(go.Shape, "Rectangle",
          {
            minSize: new go.Size(150, 40),
            maxSize: new go.Size(NaN, 40),
            name: "BODY",
            fill: "white", 
            portId: "ConditionRef", 
            cursor: "pointer",  
            // allow outgoing links
            fromLinkable: true, 
            fromLinkableSelfNode: false, 
            fromLinkableDuplicates: false,
            // Do not allow incoming links
            toLinkable: true, 
            toLinkableSelfNode: false,
            toLinkableDuplicates: false,
          },
          new go.Binding("figure", "type", typeFunc),
          new go.Binding("fill", "color"), //"modality", fillFunc),
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)
        ),
        $(go.TextBlock,
          { 
            editable: true,
            isMultiline: false,
            textAlign: "left",
            overflow: go.TextBlock.OverflowEllipsis,
            font: "18px sans-serif"
          },
          new go.Binding("text", "mironName").makeTwoWay(),
          new go.Binding("stroke", "modality",strokeFunc)
        )
      ),
      $(go.Panel, "Auto",
        {
          fromSpot: go.Spot.Right,
          portId: "Condition", 
          cursor: "pointer",  
          // allow outgoing links
          fromLinkable: true, 
          fromLinkableSelfNode: false, 
          fromLinkableDuplicates: true,
          // Do not allow incoming links
          toLinkable: true, 
          toLinkableSelfNode: false,
          toLinkableDuplicates: false,
        },
        new go.Binding("contextMenu", "modality", isMenuFunc),
        $(go.Shape, "Circle",
          { 
            name: "CIRCLE",
            fill: "#c1adeb", 
            strokeWidth: 1, 
            width: 40, height: 40,
          },
          new go.Binding("fill", "color"), //"modality", fillFunc)
        ),
        $(go.Shape,
          { 
            name: "MODALITY",
            fill: "white", 
            strokeWidth: 1,
          },
          new go.Binding("geometry", "modality", geoFunc)
        )
      )
    );
  };
  const dsl_Action = ()=> {
    return $(go.Node, "Horizontal",
      { 
        resizable: true,
        resizeObjectName: 'BODY',
        locationObjectName: "CIRCLE",  
        locationSpot: go.Spot.Center,
      },
      new go.Binding("location", "location",go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Panel, "Auto",
        {
          toSpot: go.Spot.Left,
          portId: "Action", 
          cursor: "pointer",  // the Shape is the port, not the whole Node
          // do not allow outgoing links and self links
          fromLinkable: false, 
          fromLinkableSelfNode: false, 
          fromLinkableDuplicates: false,
          fromMaxLinks: Infinity,
          // allow incoming links and self links
          toLinkable: true, 
          toLinkableSelfNode: false,
          toLinkableDuplicates: false,
          toMaxLinks: 1,
        },
        new go.Binding("contextMenu", "modality", doMenuFunc),
        new go.Binding("portId", "portId"),
        $(go.Shape, "Circle",
          { 
            name: "CIRCLE",
            fill: "white", 
            strokeWidth: 1, 
            width: 40, height: 40,
          },
          new go.Binding("fill", "color"), //"modality", fillFunc)
        ),
        $(go.Shape,
          { 
            name: "MODALITY",
            fill: "white", 
            strokeWidth: 1,
          },
          new go.Binding("geometry", "modality", geoFunc)
        )
      ),
      $(go.Panel, "Auto",
        $(go.Shape, "Rectangle",
          {
            name: "BODY",
            minSize: new go.Size(150, 40),
            maxSize: new go.Size(NaN, 40),
            fill: "white", 
            portId: "ActionRef", 
            cursor: "pointer",  
            // allow outgoing links
            fromLinkable: true, 
            fromLinkableSelfNode: false, 
            fromLinkableDuplicates: true,
            // Do not allow incoming links
            toLinkable: true, 
            toLinkableSelfNode: false,
            toLinkableDuplicates: false,
          },
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          new go.Binding("figure", "type", typeFunc),
          new go.Binding("fill", "color"), //modality"), fillFunc),
          new go.Binding("portId", "portId2")
        ),
        $(go.TextBlock,
          { 
            font: "18px sans-serif",
            editable: true,
            isMultiline: false,
            textAlign: "left",
            overflow: go.TextBlock.OverflowEllipsis,
          },
          new go.Binding("text", "mironName").makeTwoWay(),
          new go.Binding("stroke", "modality",strokeFunc)
        )
      )
    );
  };

  
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
    diagram.addDiagramListener( "LinkDrawn",
      function(evt) {
        const linkCategory = {
          ConditionRef: {
            ConditionRef: "Tutor_Reference",
            And:          "x",
            InhibitAnd:   "x",
            Rule:         "x",
            Action:       "x",
            ActionRef:    "Tutor_Reference",
            Grammar:      "x",
            RuleComment:  "x",
            PortOut:      "Tutor_Component",
          },
          Condition: {
            ConditionRef: "x",
            And:          "Tutor_Condition",
            InhibitAnd:   "Tutor_Condition",
            Rule:         "Tutor_Condition",
            Action:       "x",
            ActionRef:    "x",
            Grammar:      "x",
            RuleComment:  "x",
            PortOut:      "x",
          },
          And: {
            ConditionRef: "x",
            And:          "x",
            InhibitAnd:   "x",
            Rule:         "Tutor_Rule",
            Action:       "x",
            ActionRef:    "x",
            Grammar:      "x",
            RuleComment:  "x",
            PortOut:      "x",
          },
          InhibitAnd: {
            ConditionRef: "x",
            And:          "x",
            InhibitAnd:   "x",
            Rule:         "Tutor_Inhibit",
            Action:       "x",
            ActionRef:    "x",
            Grammar:      "x",
            RuleComment:  "x",
            PortOut:      "x",
          },
          Rule: {
            ConditionRef: "x",
            And:          "Tutor_Rule",
            InhibitAnd:   "Tutor_Rule",
            Rule:         "Tutor_Rule",
            Action:       "Tutor_Action",
            ActionRef:    "x",
            Grammar:      "x",
            RuleComment:  "Tutor_Comment",
            PortOut:      "x",
          },
          ActionRef: {
            ConditionRef: "Tutor_Reference",
            And:          "x",
            InhibitAnd:   "x",
            Rule:         "x",
            Action:       "Tutor_Grammar",
            ActionRef:    "Tutor_Reference",
            Grammar:      "Tutor_Grammar",
            RuleComment:  "x",
            PortOut:      "Tutor_Component",
          },
          PortIn: {
            ConditionRef: "Tutor_Component",
            And:          "x",
            InhibitAnd:   "x",
            Rule:         "x",
            Action:       "x",
            ActionRef:    "Tutor_Component",
            Grammar:      "x",
            RuleComment:  "x",
            PortOut:      "x",
          }
        };
        const link = evt.subject;
        const diagram = evt.diagram;
        const model = diagram.model;
        const linkData = model.findLinkDataForKey( link.data.key );
        const fromPort = linkData.fromPort;
        const toPort = linkData.toPort;
        if( fromPort && linkCategory[fromPort] && toPort && linkCategory[fromPort][toPort] ) {
          const category = linkCategory[fromPort][toPort];
          if( category == 'x' ) {
            diagram.startTransaction( "delete link" );
              diagram.remove(link);
            diagram.commitTransaction("setLinkCategory");
          } else {
            diagram.startTransaction( "set link category" );
              model.setCategoryForLinkData( linkData, category );
            diagram.commitTransaction("set lnk category");
          }
        } else {
          /*diagram.startTransaction( "delete link" );
            diagram.remove(link);
          diagram.commitTransaction("setLinkCategory");*/
        }
      }
    );
    diagram.addDiagramListener( "ChangingSelection", turnOffVisibitityOfButtonsProxy );
    diagram.addDiagramListener( "ChangedSelection", turnOnVisibitityOfButtonsProxy );
  }
  
  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    // Give a category name to node templates
    templateNodeList: [
      { category: 'Tutor_WMCondition',       template: dsl_Condition, },
      { category: 'Tutor_MironCondition',    template: dsl_Condition, },
      { category: 'Tutor_SlotCondition',     template: dsl_Condition, },
      { category: 'Tutor_MironAction',       template: dsl_Action, },
      { category: 'Tutor_WMAction',          template: dsl_Action, },
      { category: 'Tutor_And',               template: dsl_BasicNode, param: {hasTag: false, hasType:false, maxSize: new go.Size(40,40),  figure: "circle", fill: "green",      label: "&",     portId: "And",         textAlign: "center", fromLinkable: true,  toLinkable: true, labelStroke: "white", editable: false,} },
      { category: 'Tutor_InhibitAnd',        template: dsl_BasicNode, param: {hasTag: false, hasType:false, maxSize: new go.Size(40,40),  figure: "circle", fill: "IndianRed",  label: "&",     portId: "InhibitAnd",  textAlign: "center", fromLinkable: true,  toLinkable: true, labelStroke: "white", editable: false,} },
      { category: 'Tutor_Rule',              template: dsl_BasicNode, param: {hasTag: false, hasType:false, maxSize: new go.Size(80,80),  figure: "circle", fill: "peru",       label: "@key",  portId: "Rule",        textAlign: "center", fromLinkable: true,  toLinkable: true, labelStroke: "white"} },
      { category: 'Tutor_BigComment',        template: dsl_BasicNode, param: {hasTag: false, hasType:false, minSize: new go.Size(300,80), font: "bold 32px sans-serif",                                                textAlign: "center", fromLinkable: false, toLinkable: false, labelStroke: "darkgray",} },
      { category: 'Tutor_RuleComment',       template: dsl_BasicNode, param: {hasTag: false, hasType:false, minSize: new go.Size(100,40), font: "bold 20px sans-serif",                         portId: "RuleComment", textAlign: "left",   fromLinkable: false, toLinkable: true,  toSpot: go.Spot.Left, toMaxLinks: 1, fill: "LightGray", margin: 10,} },
      { category: 'Tutor_Slot',              template: dsl_Component, param: {hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasTag: true,  hasType: true,  hasValue: true,  hasUnit: false,  figure: "SquareUShape",  fill: "Gold", editable: false, keyStroke: "red", valueStroke: "blue", portId: "Grammar",  fromLinkable: false, toLinkable: true, toSpot: go.Spot.Left, toMaxLinks: 1,} },
      { category: 'Tutor_DataSlot',          template: dsl_Component, param: {hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasTag: true,  hasType: true,  hasValue: true,  hasUnit: false,  figure: "UShapeInternalArrowOut",  fill: "GoldenRod", editable: false, keyStroke: "red", valueStroke: "blue", portId: "Grammar",  fromLinkable: false, toLinkable: true, toSpot: go.Spot.Left, toMaxLinks: 1,} },
      { category: 'Tutor_MironTemplate',     template: dsl_Component, param: {hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasTag: true,  hasType: true,  hasValue: false,  hasUnit: false,  figure: "RoundedRectangle",  fill: "LemonChiffon", editable: false, keyStroke: "blue", portId: "Grammar",  fromLinkable: false, toLinkable: true, toSpot: go.Spot.Left, toMaxLinks: 1,} },
      { category: 'Tutor_Grammar',           template: dsl_Component, param: {hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasTag: true,  hasType: true,  hasValue: false,  hasUnit: false,  figure: "BendedLeftRight",  fill: "LemonChiffon", editable: true, keyStroke: "blue", portId: "",  fromLinkable: false, toLinkable: false,} },
      { category: 'Tutor_Component',         template: dsl_Component, param: {hasTag: false, hasType:false, figure: "Rectangle",              fill: "lightcyan",    editable: true, portId: "", fromLinkable: false, toLinkable: false, hasProperties: false} }, 
      { category: 'Tutor_PortIn',            template: dsl_Component, param: {hasTag: false, hasType:false, figure: "Rectangle",              fill: "lightcyan",    editable: true, portId: "PortIn", fromLinkable: true, toLinkable: false, fromSpot: go.Spot.Right, hasProperties: false, resizable: true, isInputLinkable: true, isInputEditable: false, hasOutputs:false, canAddInput: false } }, 
      { category: 'Tutor_PortOut',           template: dsl_Component, param: {hasTag: false, hasType:false, figure: "Rectangle",              fill: "lightcyan",    editable: true, portId: "PortOut", fromLinkable: false, toLinkable: true, toSpot: go.Spot.Left, hasProperties: false, resizable: true, isOutputLinkable: true, isOutputEditable: false, hasInputs:false, canAddOutput: false } }, 
    ],
    // Define node palette
    dataNodeList: [
      {
        mironName: 'Test memory state',
        category: 'Tutor_WMCondition',
        modality: "wm",
        type: "is wm activated?",
      },
      {
        mironName: 'Miron is recognized',
        category: 'Tutor_MironCondition',
        modality: "speech",
        type: "is outer miron recognized?",
      },
      {
        mironName: 'Inner miron is recognized',
        category: 'Tutor_MironCondition',
        modality: "speech",
        type: "is inner miron recognized?",
      },
      {
        mironName: 'Miron is done',
        category: 'Tutor_MironCondition',
        modality: "speech",
        type: "is outer miron done?",
      },
      {
        mironName: 'Inner miron is done',
        category: 'Tutor_MironCondition',
        modality: "speech",
        type: "is inner miron done?",
      },
      {
        mironName: 'Test slot state',
        color: 'Gold',
        category: 'Tutor_SlotCondition',
        modality: "emptySlot",
        type: "is active?",
      },
      {
        category: 'Tutor_InhibitAnd',
      },
      {
        category: 'Tutor_And',
      },
      {
        category: 'Tutor_Rule',
      },
      {
        mironName: 'Action',
        category: 'Tutor_MironAction',
        modality: "speech",
        type: "do outer miron!",
      },
      {
        mironName: 'Inner Action',
        category: 'Tutor_MironAction',
        modality: "speech",
        type: "do inner miron!",
      },
      {
        mironName: 'Set memory state',
        category: 'Tutor_WMAction',
        modality: "wm",
        type: "activate wm!",
      },
      {
        label: 'Rule comment',
        category: 'Tutor_RuleComment',
        size: "300 40",
      },
      {
        label: 'Big comment',
        category: 'Tutor_BigComment',
        size: "300 70",
      },
      {
        label: 'Slot',
        category: 'Tutor_Slot',
        size: "200 40",
        rows: [
          { name: "key1", value: "value1" },
        ],
      },
      {
        label: 'DataSlot',
        category: 'Tutor_DataSlot',
        size: "200 40",
        rows: [
          { name: "key1", value: "value1" },
        ],
      },
      {
        label: 'Miron template',
        category: 'Tutor_MironTemplate',
        size: "200 40",
         rows: [
          { name: "value1" },
        ],
      },
      {
        label: 'Grammar',
        category: 'Tutor_Grammar',
        size: "200 40",
        rows: [
          { name: "value1" },
        ],
      },
      {
        label: 'Component',
        category: 'Tutor_Component',
        size: "200 100",
        in: [ 
          { portId:"in0" },
          { portId:"in1" },
        ],
        out: [ 
          { portId:"out0" },
          { portId:"out1" },
        ],
        'isDir': true,
        "fileType": "text/json",
        'fileURL': "",
      },
      {
        label: "In",
        category: 'Tutor_PortIn',
        size: "100 40",
        in: [ 
          { portId:"" },
        ],
      },
      {
        label: "Out",
        category: 'Tutor_PortOut',
        size: "100 40",
        out: [ 
          { portId:"" },
        ],
      },
    ],
    // Give a category name to link templates with the convention <dslName>_<categoryName
    templateLinkList: [
      { category: 'Tutor_Rule',      template: dsl_BasicLink, param: {stroke:"black", toArrow: "standard", toScale: 2, strokeWidth: 4,toShortLength:8}},
      { category: 'Tutor_Condition', template: dsl_BasicLink, param: {stroke:"black", toArrow: "diamond", toScale: 2, strokeWidth: 4,toShortLength:8}},
      { category: 'Tutor_Inhibit',   template: dsl_BasicLink, param: {stroke:"red", toArrow: "circle", toScale: 2, strokeWidth: 4,}},
      { category: 'Tutor_Comment',   template: dsl_BasicLink, param: {stroke:"black",  strokeDashArray: [2, 2], strokeWidth: 4,}},
      { category: 'Tutor_Action',    template: dsl_BasicLink, param: {stroke:"black",  strokeWidth: 4,}},
      { category: 'Tutor_Grammar',   template: dsl_BasicLink, param: {stroke:"DarkOrange", strokeWidth: 4,}},
      { category: 'Tutor_Reference', template: dsl_BasicLink, param: {stroke:"GreenYellow",strokeWidth: 4, strokeDashArray: [5, 5]}},
      { category: 'Tutor_Component', template: dsl_BasicLink, param: {stroke:"lightslategray",  strokeWidth: 4,}},
    ],
    // Define link palette
    dataLinkList: [
      {
        category: 'Tutor_Rule',
        fromPort: "",
        toPort: "",
      },
      {
        category: 'Tutor_Condition',
        fromPort: "",
        toPort: "",
      },
      {
        category: 'Tutor_Inhibit',
        fromPort: "",
        toPort: "",
      },
      {
        category: 'Tutor_Comment',
        fromPort: "",
        toPort: "",
      },
      {
        category: 'Tutor_Action',
        fromPort: "",
        toPort: "",
      },
      { 
        category: 'Tutor_Grammar',
        fromPort: "",
        toPort: "",
      },
      { 
        category: 'Tutor_Reference',
        fromPort: "",
        toPort: "",
      },
      { 
        category: 'Tutor_Component',
        fromPort: "",
        toPort: "",
      },
    ],
  };
  
  return( dsl );
}