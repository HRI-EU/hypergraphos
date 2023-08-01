/*
   DSL for list of buttons
*/
function AIFlowDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}
function AIFlowDSL_setupDSL() {
  if( !appData.chatGPT ) {
    loadScript( '/library/ChatGPT/1.1/ChatGPT.js', ()=>{
        appData.chatGPT = new ChatGPT();
        console.log( 'Instanciate ChatGPT' );
      });
  }
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
//   return( DSL_stringifyTextJSON( data.rows[0].name ) );
// }
// function DLS_Data_getJS( data ) {
//   return( DSL_stringifyTextJs( data.rows[0].name ) );
// }
// function DLS_Component_getTemplateNode( data ) {
//   let params = '';
//   for( const param of data.rows ) {
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
//     'fileContent':  DLS_Data_getJS,
//     'JSON':  DLS_Data_getJSON,
//     'JS': DLS_Data_getJS,
//   };
//   return( DSLInclude_get( vPropertyList, data, ptype, pname ) );
// }
// function DSL_Component_get( data, ptype, pname ) {
  
//   const vPropertyList = {
//     'fileContent':  DLS_Component_getTemplateNode,
//     'templateNode':  DLS_Component_getTemplateNode,
//     // Similar to 'category': 'label', + quote + array
//     'category': ( d )=> [`'${d.label}'`],
//   };
//   return( DSLInclude_get( vPropertyList, data, ptype, pname ) );
// }
// // Keep var in the following lines
// var DSL_BasicNode_get = DSL_Component_get;
// var DSL_Picture_get = DSL_Component_get;
// var DSL_BasicLink_get = DSL_Component_get;


function AIFlowDSL_JSON2Text( nodeData, name, value ) {
  //value = JSON.parse( value );
  if( !Array.isArray( value ) ) {
    value = [value];
  }
  const result = value.reduce( (acc, m)=> `${(acc? acc+'\n':'')}${m.role}> ${m.content}`,'')
  Engine_fireOutput( nodeData, 'out', result );
}
function AIFlowDSL_Text2JSON( nodeData, name, value ) {
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
  Engine_fireOutput( nodeData, 'out', result );
}
function AIFlowDSL_ChatJSONSplitter( nodeData, name, value ) {
  let historyValue = [];
  let userValue = { "role":"user", "content":"" }; 
  //value = JSON.parse( value );
  const len = value.length;
  if( len ) {
    let lastIdx = len-1;
    if( value[lastIdx].role == 'user' ) {
      userValue.content = value[lastIdx].content;
    } else {
      ++lastIdx;
    }
    if( Engine_isOutputConnected( nodeData, 'history' ) ) {
      historyValue = value.slice( 0, lastIdx );
    }
  }
  //historyValue = JSON.stringify( historyValue );
  Engine_fireOutput( nodeData, 'history', historyValue );
  //userValue = JSON.stringify( userValue );
  Engine_fireOutput( nodeData, 'user', userValue );
}

function AIFlowDSL_getDSL( g ) {

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
  function dataSend( event, obj ) {
    console.log('Send pressed.')
    const executeButtonFunc = function( event, obj, nodeData ) {
      // var event;    // event information (e.g. keyboard status...)
      // var obj;      // button object information
      // var nodeData; // node containing the button
      //
      // const buttonLabel = obj.data.name;
      // const buttonStatus = obj.data.checked;
      //
      const isPersistent = true;
      let value = undefined;
      // Get the editor from the node data
      const e = m.e.getEditor( nodeData );
      if( e ) {
        // Get editor content
        value = e.getEditorSource();
        if( isPersistent ) {
          setNodeDataField( nodeData, 'fileContent', value );
        } else {
          if( !appData[nodeData.key] ) {
            appData[nodeData.key]  = {};
          }
          switch( nodeData.fileType ) {
            case 'text/text':
              appData[nodeData.key].value = value;
              break;
            case 'text/json':
              try {
                appData[nodeData.key].value = JSON.parse( value );
              } catch (error) {
                appData[nodeData.key].value = {};
              }
              break;
          }
        }
      } 
      if( isPersistent ) {
        switch( nodeData.fileType ) {
          case 'text/text':
            value = nodeData.fileContent;
            break;
          case 'text/json':
            try {
              value = JSON.parse( nodeData.fileContent );
            } catch (error) {
              value = {};
            }
            break;
        }
      } else {
        if( appData[outNodeData.key] ) {
          value = appData[outNodeData.key].value;
        }
      }
      Engine_fireOutput( nodeData, 'out', value );       
    };
    const nodePart = obj.part;
    const diagram = nodePart.diagram;
    const node = diagram.findNodeForKey(nodePart.key);
    const nodeData = node.data;
    executeButtonFunc( event, obj, nodeData );
  };
  
  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    templateNodeList: [
      { category: 'AIFlow_Param',            template: dsl_Component, param: { g, figure: 'BendedLeftRight',  fill: 'sandybrown', hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: true, hasTag: false,  hasType: false, isFromLinkable: false, isToLinkable: false, hasIcon: true, iconURL: 'fileServer/pictures/API_Keys.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(460, 80)} },
      { category: 'AIFlow_Start',            template: dsl_Component, param: { g, figure: 'Circle',           fill: 'Purple',     hasInputs: false, canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: false, hasValue: false, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, hasTag: false, hasType: false, isFromLinkable: false, isToLinkable: false, hasFunctionButtons: true, minSize: new go.Size(80, 80), buttonMinSize: new go.Size(40, 20), buttonInternalCallback: dataSend,isResizable:false} },
      { category: 'AIFlow_Data',             template: dsl_Component, param: { g, figure: 'RoundedRectangle', fill: 'LightGreen', hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, hasTag: false, hasType: true, isFromLinkable: false, isToLinkable: false, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconWidth: 50, iconHeight: 50,hasFunctionButtons: false, minSize: new go.Size(140, 80),isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'AIFlow_DataSend',         template: dsl_Component, param: { g, figure: 'RoundedRectangle', fill: 'LightGreen', hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: true, hasValue: true, hasUnit: false, canAddProperties: false, isPropertiesDynamic: true, hasTag: false, hasType: true, isFromLinkable: false, isToLinkable: false, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: 'fileServer/pictures/Text_Data.png', iconWidth: 50, iconHeight: 50,hasFunctionButtons: true, minSize: new go.Size(150, 80), buttonMinSize: new go.Size(40, 20), buttonInternalCallback: dataSend,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
      { category: 'AIFlow_LLM',              template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: 'fileServer/pictures/LLM_ChatGPT.png', iconWidth: 50, iconHeight: 50,minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true, isResizable:false, isLabelEditable: false} },
      { category: 'AIFlow_JSON2Text',        template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: 'fileServer/pictures/JSON_Text.png', iconWidth: 50, iconHeight: 50,minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true, isResizable:false, isLabelEditable: false} },
      { category: 'AIFlow_Text2JSON',        template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: 'fileServer/pictures/Text_JSON.png', iconWidth: 50, iconHeight: 50,minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true, isResizable:false, isLabelEditable: false} },
      { category: 'AIFlow_ChatJSONSplitter', template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: false, hasOutputs: true, canAddOutput: false, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: false, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconURL: 'fileServer/pictures/ChatJSON_Splitter.png', iconWidth: 50, iconHeight: 50,minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true, isResizable:false, isLabelEditable: false} },
      { category: 'AIFlow_Component',        template: dsl_Component, param: { g, figure: 'Rectangle',        hasInputs: true,  canAddInput: true, hasOutputs: true, canAddOutput: true, hasProperties: true, hasValue: true, hasUnit: true, canAddProperties: true, isPropertiesDynamic: true, isFromLinkable: false, isToLinkable: false, hasTag: false, hasType: true, type: '@fileTypeName',isTypeEditable: false, hasIcon: true, iconWidth: 50, iconHeight: 50, minSize: new go.Size(240, 80), isInputLinkableSelfNode: true, isOutputLinkableSelfNode: true,isInputLinkableDuplicates:true,isOutputLinkableDuplicates:true} },
    ],
    dataNodeList: [
      {
        label: 'API Keys',
        category: 'AIFlow_Param',
        size: '460 80',
        rows: [
          { name: 'ChatGPT', value: '' },
        ],
      },
      {
        'label': '',
        'category': 'AIFlow_Start',
        'size': '80 80',
        buttons: [
          { name: 'Start', checked: false },
        ],
        out: [
          { portId: 'out' },
        ],
      },
      {
        'label': 'Data',
        'category': 'AIFlow_Data',
        'size': '140 80',
        in: [
          { portId: 'in' },
        ],
        out: [
          { portId: 'out' },
        ],
        rows: [
          { name: 'isPersistent', value: 'false' },
        ], 
        'isFile': true,
        'fileContent': '',
        'fileTypeName': 'Text',
        'fileType': 'text/text',
        'iconURL': 'fileServer/pictures/Text_Data.png',    
      },
      {
        'label': 'Data',
        'category': 'AIFlow_Data',
        'size': '140 80',
        in: [
          { portId: 'in' },
        ],
        out: [
          { portId: 'out' },
        ], 
        rows: [
          { name: 'isPersistent', value: 'false' },
        ], 
        'isFile': true,
        'fileContent': '',
        'fileTypeName': 'JSON',
        'fileType': 'text/json',     
        'iconURL': 'fileServer/pictures/JSON_Data.png',    
      },
      {
        'label': 'Data',
        'category': 'AIFlow_DataSend',
        'size': '180 80',
        buttons: [
          { name: 'Send', checked: false },
        ],
        in: [
          { portId: 'in' },
        ],
        out: [
          { portId: 'out' },
        ], 
        rows: [
          { name: 'isPersistent', value: 'false' },
        ], 
        'isFile': true,
        'fileContent': '',
        'fileTypeName': 'Text',
        'fileType': 'text/text',     
      },
      {
        'label': 'OpenAI GPT',
        'category': 'AIFlow_LLM',
        'size': '240 80',
        'color': 'LightSeaGreen',
        in: [
          { portId: 'system' },
          { portId: 'inHistory' },
          { portId: 'user' },
        ],
        out: [
          { portId: 'outHistory' },
          { portId: 'assistant' },
        ], 
        rows: [
          { name: 'model', value: 'gpt-3.5-turbo-0301',unit: '' },
          { name: 'isPersistent', value: 'false' },
          { name: 'maxConcurency', value: '5',unit: '' },
          { name: 'maxRetry', value: '3',unit: '' },
          { name: 'timeOut', value: '4',unit: 's' },
        ], 
        'isFile': true,
        'fileContent': '',
        'fileTypeName': 'LLM',
        'fileType': 'text/javascript',     
      },
      {
        'label': 'JSON to Text',
        'category': 'AIFlow_JSON2Text',
        'size': '240 80',
        'color': 'LightSeaGreen',
        in: [
          { portId: 'in' },
        ],
        out: [
          { portId: 'out' },
        ], 
        rows: [
          { name: 'isPersistent', value: 'false' },
        ], 
       'onCompute': 'AIFlowDSL_JSON2Text',
        'fileTypeName': 'Converter',
      },
      {
        'label': 'Text to JSON',
        'category': 'AIFlow_Text2JSON',
        'size': '240 80',
        'color': 'LightSeaGreen',
        in: [
          { portId: 'in' },
        ],
        out: [
          { portId: 'out' },
        ], 
        rows: [
          { name: 'isPersistent', value: 'false' },
        ], 
        'onCompute': 'AIFlowDSL_Text2JSON',
        'fileTypeName': 'Converter',
      },
      {
        'label': 'ChatJSON Splitter',
        'category': 'AIFlow_ChatJSONSplitter',
        'size': '240 80',
        'color': 'LightSeaGreen',
        in: [
          { portId: 'in' },
        ],
        out: [
          { portId: 'history' },
          { portId: 'user' },
        ], 
        rows: [
          { name: 'isPersistent', value: 'false' },
        ], 
       'onCompute': 'AIFlowDSL_ChatJSONSplitter',
        'fileTypeName': 'Splitter',
      },
      {
        'label': 'AI component',
        'category': 'AIFlow_Component',
        'size': '240 80',
        'color': 'LightSeaGreen',
        in: [
          { portId: 'in' },
        ],
        out: [
          { portId: 'out' },
        ], 
        rows: [
          { name: 'isPersistent', value: 'false' },
        ], 
        'isFile': true,
        'fileContent': 'var nodeData, name, value;\n',
        'fileTypeName': 'Component',
        'iconURL': ''   
      },
    ],
    templateLinkList: [],
    dataLinkList: [],
  };

  return( dsl );
}