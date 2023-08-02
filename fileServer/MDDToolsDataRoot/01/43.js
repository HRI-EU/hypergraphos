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
  //   defaultValue: if not connected (never arrived)
  //   value: if connected and arrived (new value) or not arrived (last value)
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
    result = defaultValue;
  } else {
    result = inState.in[name].value;
  }
  return( result );
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
  /************************/
  /* DEPRECATED: Don't use
  /************************/
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
function Engine_doRun() {
  appData.engineIsRun = true;
  Engine_doStep();
}
function Engine_doStep() {
  // Get next step Data
  const stepData = Engine_getNextStepData();
  // Check if a node has been found
  if( stepData ) {
    // execute the node
    Engine_fireInput( stepData.nodeData, stepData.name, stepData.value );
  }
  
  // Check if we should run continuously
  if( appData.engineIsRun ) {
    setTimeout( Engine_doStep, appData.engineRuntimeout*1000 );
  }
}
function Engine_doPause() {
  appData.engineIsRun = false;
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
  // Update engine node data
  nodeData = Engine_updateEngineNode( nodeData.key );
  
  // Update engine properties in case of change
  Engine_updateProperty( nodeData );
  
  // Execute selected action
  switch( actionName ) {
    case 'Reset':
      Engine_initStack();
      break;
    case 'Run':
      Engine_doRun();
      break;
    case 'Step':
      Engine_doStep();
      break;
    case 'Pause':
      Engine_doPause();
      break;
  }
}
function Engine_initialize( nodeData ) {
  if( !appData.engineData ) {
    appData.engineData = nodeData;
    Engine_initStack();
    appData.engineIsRun = false;
  }
}
function Engine_initStack() {
  appData.engineStatus = { stack: [[]] };
}
function Engine_updateEngineNode( key ) {
  // Get updated data from graph (model is not updated)
  const g = getMainGraph();
  const nodeData = getNodeData( key );
  appData.engineData = nodeData;
  return( nodeData );
}
function Engine_updateProperty( nodeData ) {
  appData.engineIsStepByStep = appData.me.getProperty( modelId, nodeData, 'isStepByStep' );
  appData.engineRuntimeout = appData.me.getProperty( modelId, nodeData, 'runTimeout' );
  appData.engineIsStepByStepDeepFirst = appData.me.getProperty( modelId, nodeData, 'isStepByStepDeepFirst' );
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
    // Get last element of the stack
    const lastStack = appData.engineStatus.stack.slice( -1 );
    // Push a new step at the end of the stack
    //appData.engineStatus.stack.push( stepInfo );
    if( lastStack && lastStack.length ) {
      lastStack[0].push( stepInfo );
    }
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
  
  // Set current input value
  Engine_setInput( nodeData, name, value );
  
  // Get input list for the barrier
  const inputNameList = Engine_getComputeBarrier( nodeData );
  for( const inName of inputNameList ) {
    if( Engine_isInputConnected( nodeData, inName ) ) {
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
  
  // Return input state
  return( inState );
}
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
