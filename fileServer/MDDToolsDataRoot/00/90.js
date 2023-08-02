//------------------------------
// This code is for HierarchyDSL
//------------------------------

// Get current graphical canvas editor
if( !appData.g ) {
  appData.g = getMainGraph();
  appData.g.diagram.model._graphData = {};
}
// Model ID for the current graph
var modelId = 'main';
// Load the Model Explorer
if( !appData.me ) {
  // Get current graph model
  const model = appData.g.getJSONModel();
  // Create a new Model Explorer
  appData.me = new ModelExplorer();
  // Load current graph model in Model Explorer
  appData.me.setJSONModel( modelId, model );
}

//------------------------------
// Engine State
//------------------------------
var Engine_currNodeSelectionKey = null;
function selectNode( nodeData ) {
  const key = nodeData.key;
  if( Engine_currNodeSelectionKey != key ) {
    Engine_currNodeSelectionKey = key;
    m.e.selectNodeInGraph( key );
    console.log( 'SEL: ', nodeData.label, key );
  }
}
//------------------------------
// Engine API
//------------------------------
function Engine_get( keyOrData, name, defaultValue ) {
  if( appData.g && !appData.g.diagram.model._graphData ) {
    appData.g.diagram.model._graphData = {};
  }
  const gd = appData.g.diagram.model._graphData;
  let key = keyOrData;
  if( typeof( keyOrData ) == 'object' ) {
    key = keyOrData.key;
  }
  
  if( !gd[key] ) {
    gd[key] = {};
  }
  if( !gd[key][name] ) {
    gd[key][name] = defaultValue;
  }
  return( gd[key][name] );
}
function Engine_set( keyOrData, name, value ) {
  if( appData.g && !appData.g.diagram.model._graphData ) {
    appData.g.diagram.model._graphData = {};
  } 
  const gd = appData.g.diagram.model._graphData;
  let key = keyOrData;
  if( typeof( keyOrData ) == 'object' ) {
    key = keyOrData.key;
  }
  
  if( !gd[key] ) {
    gd[key] = {};
  }
  gd[key][name] = value;
}
function Engine_getInput( nodeData, name, defaultValue ) {
  // returns:
  //   undefined if not connected (never arrived)
  //   defaultValue if connected and never arrived (it has been cleared and did not errived yet)
  //   value if connected and arrived
  let result = undefined;

  // Get current input status
  let inState = Engine_get( nodeData, 'inState', {} );

  // Crete in object and input state
  if( !inState.in ) {
    inState.in = {};
  }
  if( !inState.in[name] ) {
    inState.in[name] = {}; // This will be as: in[name] = { value, isNew }
  }

  if( inState.in[name].value == undefined ) {
    result = undefined;
  } else if( inState.in[name].value == null ) {
    result = defaultValue;
  } else {
    result = inState.in[name].value;
  }
  return( result );
}
function Engine_getInput2( keyOrData, name, defaultValue ) {
  // returns:
  //   undefined if not connected (never arrived)
  //   defaultValue if connected and never arrived (it has been cleared and did not errived yet)
  //   value if connected and arrived
  
  const gd = appData.g.diagram.model._graphData;
  let key = keyOrData;
  if( typeof( keyOrData ) == 'object' ) {
    key = keyOrData.key;
  }
  
  if( !gd[key] ) {
    gd[key] = {};
  }
  if( !gd[key].inputList ) {
    return( undefined );
  }
  if( gd[key].inputList[name] == null ) {
    return( defaultValue );
  }
  return( gd[key].inputList[name] );
}
function Engine_setInput( nodeData, name, value ) {
  // Get current input status
  let inState = Engine_get( nodeData, 'inState', {} );

  // Crete in object and input state
  if( !inState.in ) {
    inState.in = {};
  }
  if( !inState.in[name] ) {
    inState.in[name] = {};
  }
  // Update input state
  inState.in[name].value = value;
  inState.in[name].isNew = true;
}
function Engine_setInput2( keyOrData, name, value ) {
  const gd = appData.g.diagram.model._graphData;
  let key = keyOrData;
  if( typeof( keyOrData ) == 'object' ) {
    key = keyOrData.key;
  }
  
  if( !gd[key] ) {
    gd[key] = {};
  }
  if( !gd[key].inputList ) {
    gd[key].inputList = {};
  }
  gd[key].inputList[name] = value;
}
function Engine_getInputNameList( nodeData ) {
  let result = [];
  if( nodeData.in ) {
    for( const inInfo of nodeData.in ) {
      result.push( inInfo.portId );
    }
  }
  return( result );
}
function Engine_clearInputs( nodeData, nameList ) {
  // Get current input status
  let inState = Engine_get( nodeData, 'inState', {} );

  // Crete in object and input state
  if( !inState.in ) {
    inState.in = {};
  }
  for( const name in inState.in ) {
    inState.in[name].value = null;
    inState.in[name].isNew = false;
  }
}
function Engine_clearInputs2( nodeData, nameList ) {
  nameList = ( nameList || gd[key].inputList );
  const gd = appData.g.diagram.model._graphData;
  let key = nodeData.key;
  
  if( !gd[key] ) {
    gd[key] = {};
  }
  if( gd[key].inputList ) {
    for( const name in nameList ) {
      gd[key].inputList[name] = null;
    }
  }
}
function Engine_doStep() {
  // Get next step Data
  const stepData = Engine_getNextStepData();
  // Check if a node has been found
  if( stepData ) {
    // execute the node
    Engine_fireInput( stepData.nodeData, stepData.name, stepData.value );
  }
}
function Engine_fireOutput( nodeData, name, value ) {
  //if( Engine_isStepByStep ) {
  if( appData.engineIsStepByStep ) {
    Engine_fireOutputStep( nodeData, name, value );
  } else {
    Engine_fireOutputFlow( nodeData, name, value );
  }
  const inState = Engine_get( nodeData, 'inState', {} );
  inState.didCompute = true;
}
function Engine_fireOutputStep( nodeData, name, value ) {
  // Get output link list
  const outLinkDataList = Engine_getOutputLinkDataList( nodeData, name );
  // If Output is connected
  if( outLinkDataList && outLinkDataList.length ) {
    selectNode( nodeData );
    
    Engine_addStep({ outLinkDataList, name, value });
  }
}
function Engine_fireOutputFlow( nodeData, name, value ) {
  // Get output link list
  const outLinkDataList = Engine_getOutputLinkDataList( nodeData, name );
  // If Output is connected
  if( outLinkDataList && outLinkDataList.length ) {
    selectNode( nodeData );
        
    // Loop over out components
    for( const outLinkData of outLinkDataList ) {
      const outNodeKey = outLinkData.to;
      
      // Read data of fanOut components
      const outNodeData = getNodeData( outNodeKey );
      
      // Execute target component for its input
      const inName = outLinkData.toPort;
      Engine_fireInput( outNodeData, inName, value );
    } 
  }
}
function Engine_fireInput( nodeData, name, value ) {
  // Select current node
  selectNode( nodeData );
  
  // Check type of fanout component
  switch( nodeData.category ) {
    case 'AIFlow_Data':
    case 'AIFlow_DataSend': {
      AIFlowDSL_Data( nodeData, name, value );
    }
    break;
    case 'AIFlow_Template': {
      AIFlowDSL_Template( nodeData, name, value );
    }
    break;
    case 'AIFlow_Concatenate': {
      AIFlowDSL_Concatenate( nodeData, name, value );
    }
    break;
    default: {
      if( nodeData.onCompute || 
        ( nodeData.fileContent && nodeData.fileType == 'text/javascript' ) ) {
        // eval node fileContent
        if ( nodeData.onCompute ) {
          window[nodeData.onCompute]( nodeData, name, value );
        } else if( nodeData.fileContent ) {
          eval( nodeData.fileContent );
        } 
      } else {
        // Set label content
        setNodeDataField( nodeData, 'label', value );
      }
    } 
  }
}
function Engine_isOutputConnected( nodeData, name ) {
  // Get output link list
  const list = Engine_getOutputLinkDataList( nodeData, name );
  // If output is connected
  return( list && list.length )
}
function Engine_isInputConnected( nodeData, name ) {
  // Get input link list
  const list = Engine_getInputLinkDataList( nodeData, name );
  // If input is connected
  return( list && list.length )
}
function Engine_isSelfLoop( nodeData, inName ) {
  // Check if name exist
  if( nodeData.in ) {
    for( const inputData of nodeData.out ) {
      if( inputData.portId == InName ) {
        
        // Get output link from name port
        const outLinkDataList = appData.me.getLinkListFanOutByNodeKey( modelId, nodeData.key, inName );
        
        if( outLinkDataList.length ) {
          for( const outData of outLinkDataList ) {
            if( ( outData.to == nodeData.key ) && 
                ( outData.fromPort == inName ) ) {
              return( true );
            }
          }
        }
      }
    }
  }
  return( false );
}
function Engine_applyTemplate( templateStr, values ) {
  let result = '';
  // Function to get key->value replacement
  const getKeyValue = ( matchStr )=> {
    const name = matchStr.substring( 1, matchStr.length-1 );
    if ( name in values) {
      return( values[name].value );
    } else {
      // return( `${matchStr}`);
      return( '' );
    }
  }
  if( templateStr ) {
    result = templateStr.replace( /<[^>]+>/g, getKeyValue );
  }
  return( result );
}
//------------------------------
// Engine Helper Functions
//------------------------------
function Engine_executeAction( nodeData, actionName ) {
  // Initialize engine in case it is not yet initialized (done once)
  Engine_initialize( nodeData );
  
  switch( actionName ) {
    case 'Reset':
      appData.engineStatus.stack = [];
      break;
    case 'Step':
      Engine_doStep();
      break;
  }
}
function Engine_initialize( nodeData ) {
  if( !appData.engineData ) {
    appData.engineData = nodeData;
    appData.engineStatus = { stack: [] };
    appData.engineIsStepByStep = appData.me.getProperty( modelId, nodeData, 'isStepByStep' );
    appData.engineIsStepByStepDeepFirst = appData.me.getProperty( modelId, nodeData, 'isStepByStepDeepFirst' );
  }
}
function Engine_getNextStepData() {
  let result = null;
  let stepInfo = null;
  if( appData.engineStatus.stack.length ) {
    if( appData.engineIsStepByStepDeepFirst ) {
      // Get newest step info
      const stepList = appData.engineStatus.stack.slice( -1 );
      if( stepList.length ) {
        stepInfo = stepList[0];
      }
    } else {
      // Get oldest step info
      stepInfo = appData.engineStatus.stack[0];
    }
  }
  // If a step has been found
  if( stepInfo ) {
    // Get output link list
    const outLinkData = stepInfo.outLinkDataList[stepInfo.index];
    // Get target input port of the current link
    const outNodeKey = outLinkData.to;
    // Read data of fanOut components
    const outNodeData = getNodeData( outNodeKey );
    
    // Clear current step in case it has been
    // fully executed (all links traversed)
    // NOTE: clear must be done at this exact moment
    // In this line!!!
    Engine_clearStep( stepInfo );
    
    // Execute target component for its input
    const name = outLinkData.toPort;
    // Return the node info
    result = {
      name,                   // Input name of next node to execute
      value: stepInfo.value, // Input value
      nodeData: outNodeData,  // Node data of next node to execute
    }
  }
  return( result );
}
function Engine_clearStep( stepInfo ) {
  if( stepInfo ) {
    // Check if all links have been visited
    if( stepInfo.index+1 >= stepInfo.outLinkDataList.length ) {
      // If all links visited, remove first step from stack
      if( appData.engineIsStepByStepDeepFirst ) {
        // Remove newest step
        appData.engineStatus.stack.pop();
      } else {
        // Remove oldest step
        appData.engineStatus.stack.shift();
      }
    } else {
      ++stepInfo.index; // Go to next link
    }
  }
}
function Engine_addStep( stepInfo ) {
  if( stepInfo ) {
    // Initialize step index
    stepInfo.index = 0;
    // Push a new step at the end of the stack
    appData.engineStatus.stack.push( stepInfo );
  }
}
function Engine_getInputLinkDataList( nodeData, name ) {
  let result = null;
  // Check if name exist
  if( nodeData.in ) {
    for( const inputData of nodeData.in ) {
      if( inputData.portId == name ) {
        
        // Get input link from name port
        result = appData.me.getLinkListFanInByNodeKey( modelId, nodeData.key, name );
        break;
      }
    }
  }
  return( result );
}
function Engine_getOutputLinkDataList( nodeData, name ) {
  let result = null;
  // Check if name exist
  if( nodeData.out ) {
    for( const outputData of nodeData.out ) {
      if( outputData.portId == name ) {
        
        // Get output link from name port
        result = appData.me.getLinkListFanOutByNodeKey( modelId, nodeData.key, name );
        break;
      }
    }
  }
  return( result );
}

function Engine_getComputeBarrier( nodeData ) {
  let computeBarrier = appData.me.getProperty( modelId, nodeData, 'computeBarrier', null );
  if( computeBarrier ) {
    computeBarrier = computeBarrier.split( ',' ).map(item=>item.trim( item ));
  } else {
    computeBarrier =  Engine_getInputNameList( nodeData );
  }
  return( computeBarrier );
}
function Engine_updateInput( nodeData, name, value, inCondition ) {
  let isCompute = true;
  
  // Get current input status
  let inState = Engine_get( nodeData, 'inState', {} );
  
  // If I just executed the doCompute => reset inputs isNew state
  if( inState.didCompute ) {
    if( inState.in ) {
      for( const inName in inState.in ) {
        inState.in[inName].isNew = false;
      }
    }
    inState.didCompute = false;
  }
  Engine_set( nodeData, 'inState', inState );
  
  Engine_setInput( nodeData, name, value );
  // // Crete in object and input state
  // if( !inState.in ) {
  //   inState.in = {};
  // }
  // if( !inState.in[name] ) {
  //   inState.in[name] = {};
  // }
  // // Update input state
  // inState.in[name].value = value;
  // inState.in[name].isNew = true;
  
  // Get input list for the barrier
  const inputNameList = Engine_getComputeBarrier( nodeData );
  for( const inName of inputNameList ) {
    if( Engine_isInputConnected( nodeData, inName ) ) {
      // True if the input arrived
      // isCompute &&= ( inState[inName] != null ) && 
      //               ( inState[inName] != undefined ) &&
      //               // TODO: is the next condition useful????
      //               ( inState[inName] != '' );
      let isNewInput = false;
      if( inState.in[inName] ) {
        isNewInput = inState.in[inName].isNew;
      }
      if( inCondition ) {
        isNewInput = inCondition( name, value, isNewInput );
      }
      isCompute &&= isNewInput;
    }
  }
  
  // Update input value object
  inState.isCompute = isCompute;
  //Engine_set( nodeData, 'inState', inState );
  
  // Return input state
  return( inState );
}
// function Engine_doCompute( nodeData, doCompute ) {
//   const isCompute = 
//   if( isCompute && doCompute ) {
//     const didCompute = doCompute( inState );
//     if( didCompute ) {
//       Engine_set( nodeData, 'inState', {} );
//     }
//   }
// }
//------------------------------
// DSL Functions
//------------------------------
function AIFlowDSL_Template( nodeData, name, value ) {
  // Update input values
  const inState = Engine_updateInput( nodeData, name, value );
  
  // True if all inputs arrived
  if( inState.isCompute ) {
    const templateStr = nodeData.fileContent;
    if( templateStr ) {
      //const inState = Engine_get( nodeData, 'inState', {} );
      const outValue = Engine_applyTemplate( templateStr, inState.in );
      Engine_fireOutput( nodeData, 'out', outValue );
    }
  }
}
function AIFlowDSL_Concatenate( nodeData, name, value ) {
  // Get current input barriar status
  let inputValueObj = Engine_get( nodeData, 'inputBarrier', {} );
  inputValueObj[name] = value;
  Engine_set( nodeData, 'inputBarrier', inputValueObj );
  // True if all inputs arrived
  let isCompute = true;
  const inputNameList = Engine_getInputNameList( nodeData );
  for( const inName of inputNameList ) {
    if( Engine_isInputConnected( nodeData, inName ) ) {
      // True if the input arrived
      isCompute &&= ( inputValueObj[inName] != null ) && 
                    ( inputValueObj[inName] != undefined ) &&
                    // TODO: is the next condition useful????
                    ( inputValueObj[inName] != '' );
    }
  }
  if( isCompute ) {
    const sep = nodeData.label || '\n';
    let outValue = Object.values( inputValueObj ).join( sep );
    Engine_fireOutput( nodeData, 'out', outValue );
    Engine_set( nodeData, 'inputBarrier', {} );
  }
}
function AIFlowDSL_Data( nodeData, name, value ) {
  let outValue = value;
  // Check persistency in the graph data TODO: Consider engine 
  const isPersistent = true; //appData.me.getProperty( modelId, nodeData, 'isPersistent' );
  
  // value is undefined for pure event 
  if( outValue == undefined ) {
    if( isPersistent ) {
      switch( nodeData.fileType ) {
        case 'text/text':
          outValue = nodeData.fileContent;
          break;
        case 'text/json':
          try {
            outValue = JSON.parse( nodeData.fileContent );
          } catch (error) {
            outValue = {};
          }
          break;
      }
    } else {
      if( appData[nodeData.key] ) {
        outValue = appData[nodeData.key].value;
      } else {
        outValue = null;
      }
    }
  } else {
  
    let valueStr = outValue;
    // Get the editor from the node data
    const e = m.e.getEditor( nodeData );
      
    if( e || isPersistent ) {
      if( typeof( outValue ) == 'object' ) {
        valueStr = JSON.stringify( outValue, null, 2 );
      }
    }
    if( e ) {
      // Set editor content
      e.setEditorSource( valueStr );
    } 
    // Set editor content in output link of Chat editor
    if( isPersistent ) {
      setNodeDataField( nodeData, 'fileContent', valueStr );
    } else {
      // TODO make non-persistent (save in model??)
      if( !appData[nodeData.key] ) {
        appData[nodeData.key]  = {};
      }
      appData[nodeData.key].value = outValue;
    }
  }
  
  // Continue fire propagation in case of data
  if( nodeData.category == 'AIFlow_Data' ) {
    // TODO: Make indirect call
    Engine_fireOutput( nodeData, 'out', outValue );
  }
}