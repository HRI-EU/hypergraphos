/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
   DSL for list of buttons
*/
function DSLConfigDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}

//---------------------------
// Define DSL API helper functions
//---------------------------
function DSL_stringifyTextJs( v ) {
  let result = v;
  let resultArray = [];
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
    resultArray = [ '{', ...lineList, '}' ];
    //const value = `{\n${lineList.join( '\n' )}\n}`;
    const value = resultArray.join( '\n' );
    eval( `a = ${value}` );
    result = value;
  } catch (error) {
    resultArray = [ '[', ...lineList, ']' ];
    //const value = `[\n${lineList.join( '\n' )}\n]`;
    const value = resultArray.join( '\n' );
    eval( `a = ${value}` );
    result = value;
  }
  return( resultArray ); 
}
function DSL_stringifyTextJSON( v ) {
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
  return( result.split( '\n') );
}
function DLS_Data_getJSON( data ) {
  return( DSL_stringifyTextJSON( data.props_[0].name ) );
}
function DLS_Data_getJS( data ) {
  return( DSL_stringifyTextJs( data.props_[0].name ) );
}
function DLS_Component_getTemplateNode( data ) {
  let params = '';
  for( const param of data.props_ ) {
    if( param.valueChanged ) {
      let name = param.name;
      let value = '';
      if( name.endsWith( 'Size' ) ) {
        value = `go.Size.parse('${param.value}')`;
      } else if( name.endsWith( 'Menu' ) && param.value == '' ) {
        value = `null`;
      } else if( name.endsWith( 'Spot' ) ) {
        value = `go.Spot.${param.value}`; // TODO: Force Capital case of value
      } else if( param.value.match(/true|false|^[+-]\d+(\.\d+)?/) ) {
        value = param.value; // In case of true, false or float number
      } else {
        value = `'${param.value}'`;
      }
      params = params + `, ${name}: ${value}`;
    }
  }
 
  // { category: 'DLS_Data', template: dsl_Component, param: { g, fill: 'SteelBlue', hasInputs: true, canAddInput: false } },
  const result = `{ category: '${data.label}', template: ${data.category}, param: { g${params} } }`;
  return( [result] );
}

//---------------------------
// Define DSL API functions
//---------------------------
function DLS_Data_get( data, ptype, pname ) {
  
  const vPropertyList = {
    'fileContent':  DLS_Data_getJS,
    'JSON':  DLS_Data_getJSON,
    'JS': DLS_Data_getJS,
  };
  return( DSLInclude_get( vPropertyList, data, ptype, pname ) );
}
function DSL_Component_get( data, ptype, pname ) {
  
  const vPropertyList = {
    'fileContent':  DLS_Component_getTemplateNode,
    'templateNode':  DLS_Component_getTemplateNode,
    // Similar to 'category': 'label', + quote + array
    'category': ( d )=> [`'${d.label}'`],
  };
  return( DSLInclude_get( vPropertyList, data, ptype, pname ) );
}
// Keep var in the following lines
var DSL_BasicNode_get = DSL_Component_get;
var DSL_Picture_get = DSL_Component_get;
var DSL_BasicLink_get = DSL_Component_get;


function DSLConfigDSL_getDSL( g ) {

  const cm = g.contextMenu;
  cm.add( menuDSL, 'figureMenu' );

  const figureContextMenu = cm.getMenu( 'figureMenu' );
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
  
  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    templateNodeList: [
      { category: 'DSL_Data',         template: dsl_Component, param: { g, fill: 'SteelBlue',     hasInputs: true,  canAddInput: false, hasOutputs: true, hasProperties: true, canAddProperties: false, canAddOutput: false, hasTag: false, hasType: false, hasValue: false, hasUnit: false, keyFont: "13px monospace"} },
      { category: 'DSL_CGButton',     template: dsl_Component, param: { g, fill: 'YellowGreen',   hasInputs: false, hasOutputs: false, canAddOutput: false, hasProperties: false, hasFunctionButtons: true,  isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: false,  buttonMinSize: new go.Size(70, 20), label: 'DSL Generator', labelTextAlign: 'left', figure: 'Rectangle', isResizable: false, } },
      { category: 'DSL_Component',    template: dsl_Component, param: { g, fill: 'DarkCyan',      hasInputs: false, hasOutputs: true,  canAddOutput: false, hasProperties: true,  hasFunctionButtons: false, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true,  isTypeEditable: false, type: 'dsl_Component', hasProperty: true, canAddProperties: false, isKeyEditable: false, hasValue: true,  hasUnit: false,  figure: 'Rectangle', isPropertiesDynamic: true, } },
      { category: 'DSL_BacicNode',    template: dsl_Component, param: { g, fill: 'LightSeaGreen', hasInputs: false, hasOutputs: true,  canAddOutput: false, hasProperties: true,  hasFunctionButtons: false, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true,  isTypeEditable: false, type: 'dsl_BasicNode', hasProperty: true, canAddProperties: false, isKeyEditable: false, hasValue: true,  hasUnit: false,  figure: 'Rectangle', isPropertiesDynamic: true, } },
      { category: 'DSL_Picture',      template: dsl_Component, param: { g, fill: 'DarkSeaGreen',  hasInputs: false, hasOutputs: true,  canAddOutput: false, hasProperties: true,  hasFunctionButtons: false, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true,  isTypeEditable: false, type: 'dsl_Picture',   hasProperty: true, canAddProperties: false, isKeyEditable: false, hasValue: true,  hasUnit: false,  figure: 'Rectangle', isPropertiesDynamic: true, } },
      { category: 'DSL_BasicLink',    template: dsl_Component, param: { g, fill: 'PaleTurquoise', hasInputs: false, hasOutputs: true,  canAddOutput: false, hasProperties: true,  hasFunctionButtons: false, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true,  isTypeEditable: false, type: 'dsl_BasicLink', hasProperty: true, canAddProperties: false, isKeyEditable: false, hasValue: true,  hasUnit: false,  figure: 'Rectangle', isPropertiesDynamic: true, } },
    ],
    dataNodeList: [
      {
        'label': 'DSL Data',
        'category': 'DSL_Data',
        'size': '240 40',
        in_: [
          { portId: 'category', name:'category' },
        ],
        out_: [
          { portId: 'json', name:'json' },
        ],
        props_: [
          { name: '{}' },
        ],      
      },
      {
        category: 'DSL_CGButton',
        size: '250 40',
        buttons_: [
          {name: 'Generate', checked: false},
        ],
        'isFile': true,
        'fileContent': nodeButtonFileContent,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Category name',
        category: 'DSL_Component',
        size: "350 60",
        props_: [
          { name: 'NODE SHAPE'              , value: '\n' },
          { name: 'figure'                  , value: 'rectangle', valueMenu: 'figureMenu', isEditable: false, font: "italic 13px sans-serif" },
          { name: 'fill'                    , value: 'white' },
          { name: 'stroke'                  , value: 'Black' },
          { name: 'strokeWidth'             , value: '1' },
          { name: 'isResizable'             , value: 'true' },
          { name: 'minSize'                 , value: '40 40' },
          { name: 'maxSize'                 , value: 'NaN NaN' },
          { name: 'portId'                  , value: '' },
          { name: 'NODE INPUT CONNECTIVITY' , value: '\n' },
          { name: 'fromSpot'                , value: 'Bottom' },
          { name: 'isFromLinkable'          , value: 'true' },
          { name: 'isFromLinkableSelfNode'  , value: 'false' },
          { name: 'isFromLinkableDuplicates', value: 'false' },
          { name: 'fromMaxLinks'            , value: 'Infinity' },
          { name: 'NODE OUTPUT CONNECTIVITY', value: '\n' },
          { name: 'toSpot'                  , value: 'Bottom' },
          { name: 'isToLinkable'            , value: 'true' },
          { name: 'isToLinkableSelfNode'    , value: 'false' },
          { name: 'isToLinkableDuplicates'  , value: 'false' },
          { name: 'ToMaxLinks'              , value: 'Infinity' },
          { name: 'NODE LABEL'              , value: '\n' },
          { name: 'label'                   , value: '' },
          { name: 'labelStroke'             , value: 'Black' },
          { name: 'isLabelEditable'         , value: 'true' },
          { name: 'isLabelMultiline'        , value: 'true' },
          { name: 'labelTextAlign'          , value: 'center' },
          { name: 'labelFont'               , value: '18px sans-serif' },
          { name: 'labelMargin'             , value: '0' },
          { name: 'labelVerticalAlignment'  , value: 'center' },
          { name: 'labelHorizontalAlignment', value: 'center' },
          { name: 'NODE ICON'              , value: '\n' },
          { name: 'hasIcon'                 , value: 'false' },
          { name: 'iconURL'                 , value: '' },
          { name: 'iconWidth'               , value: '0' },
          { name: 'iconHeight'              , value: '0' },
          { name: 'NODE TAG'                , value: '\n' },
          { name: 'hasTag'                  , value: 'true' },
          { name: 'tag'                     , value: '' },
          { name: 'tagStroke'               , value: 'Black' },
          { name: 'tagFont'                 , value: 'italic 10px sans-serif' },
          { name: 'isTagEditable'           , value: 'true' },
          { name: 'tagMenu'                 , value: '' },
          { name: 'NODE TYPE'               , value: '\n' },
          { name: 'hasType'                 , value: 'true' },
          { name: 'type'                    , value: '' },
          { name: 'typeStroke'              , value: 'Black' },
          { name: 'typeFont'                , value: 'italic 10px sans-serif' },
          { name: 'isTypeEditable'          , value: 'true' },
          { name: 'typeMenu'                , value: '' },
          { name: 'NODE BUTTONS'            , value: '\n' },
          { name: 'hasFunctionButtons'      , value: 'false' },
          { name: 'buttonInternalCallback'  , value: '' },
          { name: 'isCheckBoxes'            , value: 'false' },
          { name: 'buttonMinSize'           , value: 'NaN 20' },
          { name: 'buttonMaxSize'           , value: 'NaN NaN' },
          { name: 'buttonMargin'            , value: '2' },
          { name: 'buttonFill'              , value: 'lightGray' },
          { name: 'buttonStroke'            , value: 'Black' },
          { name: 'buttonFont'              , value: '13px sans-serif' },
          { name: 'buttonInternalCallback'  , value: 'runGraphFile' },
          { name: 'NODE SELECTION'          , value: '\n' },
          { name: 'selectFill'              , value: 'dodgerblue' },
          { name: 'NODE PROPERTIES'         , value: '\n' },
          { name: 'hasProperties'           , value: 'true' },
          { name: 'isPropertiesDynamic'     , value: 'false' },
          { name: 'canAddProperties'        , value: 'true' },
          { name: 'itemFill'                , value: 'White' },
          { name: 'itemMinSize'             , value: '150 1' },
          { name: 'separatorStroke'         , value: 'Gray' },
          { name: 'KEY PROPERTY'            , value: '\n' },
          { name: 'keyFont'                 , value: 'bold 13px sans-serif' },
          { name: 'keyStroke'               , value: 'Black' },
          { name: 'isKeyEditable'           , value: 'true' },
          { name: 'VALUE PROPERTY'          , value: '\n' },
          { name: 'hasValue'                , value: 'true' },
          { name: 'valueStroke'             , value: 'Black' },
          { name: 'valueFont'               , value: '13px sans-serif' },
          { name: 'isValueEditable'         , value: 'true' },
          { name: 'UNIT PROPERTY'           , value: '\n' },
          { name: 'hasUnit'                 , value: 'true' },
          { name: 'unitStroke'              , value: 'Black' },
          { name: 'unitFont'                , value: '13px sans-serif' },
          { name: 'isUnitEditable'          , value: 'true' },
          { name: 'NODE INPUT PORTS'        , value: '\n' },
          { name: 'hasInputs'               , value: 'true' },
          { name: 'canAddInput'             , value: 'true' },
          { name: 'isInputLinkable'         , value: 'true' },
          { name: 'isInputLinkableSelfNode' , value: 'false' },
          { name: 'isInputLinkableDuplicates', value: 'false' },
          { name: 'inputMaxLinks'           , value: 'Infinity' },
          { name: 'isInputEditable'         , value: 'true' },
          { name: 'inputTextAlign'          , value: 'right' },
          { name: 'inputMenu'               , value: '' },
          { name: 'NODE OUTPUT PORTS'       , value: '\n' },
          { name: 'hasOutputs'              , value: 'true' },
          { name: 'canAddOutput'            , value: 'true' },
          { name: 'isOutputLinkable'        , value: 'true' },
          { name: 'isOutputLinkableSelfNode', value: 'false' },
          { name: 'isOutputLinkableDuplicates', value: 'false' },
          { name: 'outputMaxLinks'          , value: 'Infinity' },
          { name: 'isOutputEditable'        , value: 'true' },
          { name: 'outputTextAlign'         , value: 'left' },
          { name: 'outputMenu'              , value: '' },
          { name: 'PORTS'                   , value: '\n' },
          { name: 'isPortInside'            , value: 'false' },
          { name: 'portStroke'              , value: 'Black' },
          { name: 'portFont'                , value: '14px sans-serif' },
        ],
        out_: [
          { portId: 'templateNode', name:'templateNode' },
          { portId: 'category', name:'category' },
        ],
      },
      {
        label: 'Category name',
        category: 'DSL_BacicNode',
        size: "350 60",
        props_: [
          { name: 'NODE SHAPE'              , value: '\n' },
          { name: 'figure'                  , value: 'rectangle', valueMenu: 'figureMenu', isEditable: false, font: "italic 13px sans-serif" },
          { name: 'fill'                    , value: 'white' },
          { name: 'stroke'                  , value: 'Black' },
          { name: 'strokeWidth'             , value: '1' },
          { name: 'isResizable'             , value: 'true' },
          { name: 'minSize'                 , value: '40 40' },
          { name: 'maxSize'                 , value: 'NaN NaN' },
          { name: 'portId'                  , value: '' },
          { name: 'NODE INPUT CONNECTIVITY' , value: '\n' },
          { name: 'fromSpot'                , value: 'Bottom' },
          { name: 'isFromLinkable'          , value: 'true' },
          { name: 'isFromLinkableSelfNode'  , value: 'false' },
          { name: 'isFromLinkableDuplicates', value: 'false' },
          { name: 'fromMaxLinks'            , value: 'Infinity' },
          { name: 'NODE OUTPUT CONNECTIVITY', value: '\n' },
          { name: 'toSpot'                  , value: 'Bottom' },
          { name: 'isToLinkable'            , value: 'true' },
          { name: 'isToLinkableSelfNode'    , value: 'false' },
          { name: 'isToLinkableDuplicates'  , value: 'false' },
          { name: 'ToMaxLinks'              , value: 'Infinity' },
          { name: 'NODE LABEL'              , value: '\n' },
          { name: 'label'                   , value: '' },
          { name: 'labelStroke'             , value: 'Black' },
          { name: 'isLabelEditable'         , value: 'true' },
          { name: 'isLabelMultiline'        , value: 'true' },
          { name: 'labelFont'               , value: '18px sans-serif' },
          { name: 'labelMargin'             , value: '10' },
          { name: 'labelVerticalAlignment'  , value: 'center' },
          { name: 'labelHorizontalAlignment', value: 'center' },
          { name: 'isLabelWrap'             , value: 'false' },
          { name: 'NODE TAG'                , value: '\n' },
          { name: 'hasTag'                  , value: 'true' },
          { name: 'tag'                     , value: '' },
          { name: 'tagStroke'               , value: 'Black' },
          { name: 'tagFont'                 , value: 'italic 10px sans-serif' },
          { name: 'isTagEditable'           , value: 'true' },
          { name: 'tagMenu'                 , value: '' },
          { name: 'NODE TYPE'               , value: '\n' },
          { name: 'hasType'                 , value: 'true' },
          { name: 'type'                    , value: '' },
          { name: 'typeStroke'              , value: 'Black' },
          { name: 'typeFont'                , value: 'italic 10px sans-serif' },
          { name: 'isTypeEditable'          , value: 'true' },
          { name: 'typeMenu'                , value: '' },
          { name: 'NODE IMAGE'              , value: '\n' },
          { name: 'hasImage'                , value: 'none' },
          { name: 'imageStretch'            , value: 'UniformToFill' },
          { name: 'isLinkFromImage'         , value: 'true' },
        ],
        out_: [
          { portId: 'templateNode', name:'templateNode' },
          { portId: 'category', name:'category' },
        ],
      },
      {
        label: 'Category name',
        category: 'DSL_Picture',
        size: "350 60",
        props_: [
          { name: 'NODE SHAPE'              , value: '\n' },
          { name: 'figure'                  , value: 'rectangle', valueMenu: 'figureMenu', isEditable: false, font: "italic 13px sans-serif" },
          { name: 'fill'                    , value: 'transparent' },
          { name: 'stroke'                  , value: 'Black' },
          { name: 'strokeWidth'             , value: '0' },
          { name: 'isResizable'             , value: 'true' },
          { name: 'minSize'                 , value: '80 40' },
          { name: 'maxSize'                 , value: 'NaN NaN' },
          { name: 'portId'                  , value: '' },
          { name: 'NODE INPUT CONNECTIVITY' , value: '\n' },
          { name: 'fromSpot'                , value: 'Bottom' },
          { name: 'isFromLinkable'          , value: 'true' },
          { name: 'isFromLinkableSelfNode'  , value: 'false' },
          { name: 'isFromLinkableDuplicates', value: 'false' },
          { name: 'fromMaxLinks'            , value: 'Infinity' },
          { name: 'NODE OUTPUT CONNECTIVITY', value: '\n' },
          { name: 'toSpot'                  , value: 'Bottom' },
          { name: 'isToLinkable'            , value: 'true' },
          { name: 'isToLinkableSelfNode'    , value: 'false' },
          { name: 'isToLinkableDuplicates'  , value: 'false' },
          { name: 'ToMaxLinks'              , value: 'Infinity' },
          { name: 'NODE LABEL'              , value: '\n' },
          { name: 'label'                   , value: '' },
          { name: 'labelStroke'             , value: 'Black' },
          { name: 'isLabelEditable'         , value: 'true' },
          { name: 'isLabelMultiline'        , value: 'true' },
          { name: 'labelFont'               , value: '18px sans-serif' },
          { name: 'labelMargin'             , value: '10' },
          { name: 'NODE IMAGE'              , value: '\n' },
          { name: 'hasImage'                , value: 'none' },
          { name: 'imageStretch'            , value: 'UniformToFill' },
          { name: 'isLinkFromImage'         , value: 'false' },
        ],
        out_: [
          { portId: 'templateNode', name:'templateNode' },
          { portId: 'category', name:'category' },
        ],
      },
      {
        label: 'Category name',
        category: 'DSL_BasicLink',
        size: "350 60",
        props_: [
          { name: 'LINK SHAPE'              , value: '\n' },
          { name: 'stroke'                  , value: 'Black' },
          { name: 'strokeWidth'             , value: '2' },
          { name: 'strokeDashArray'         , value: '' },
          { name: 'isResizable'             , value: 'true' },
          { name: 'isResegmentable'         , value: 'true' },
          { name: 'jump'                    , value: 'JumpGap' },
          { name: 'FROM END'                , value: '\n' },
          { name: 'fromArrow'               , value: '' },
          { name: 'fromScale'               , value: '1' },
          { name: 'fromShortLength'         , value: '0' },
          { name: 'isRelinkableFrom'        , value: 'true' },
          { name: 'TO END'                  , value: '\n' },
          { name: 'toArrow'                 , value: '' },
          { name: 'toScale'                 , value: '1' },
          { name: 'toShortLength'           , value: '0' },
          { name: 'isRelinkableTo'          , value: 'true' },
        ],
        out_: [
          { portId: 'templateNode', name:'templateNode' },
          { portId: 'category', name:'category' },
        ],
      },
    ],
    templateLinkList: [],
    dataLinkList: [],
  };

  return( dsl );
}