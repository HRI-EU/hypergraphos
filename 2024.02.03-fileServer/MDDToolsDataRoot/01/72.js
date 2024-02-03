//------------------------------
// Engine Pubblic API
//------------------------------
function Engine_get( keyOrData, name, defaultValue ) {
  if( graphData.g && !graphData.g.diagram.model._graphData ) {
    Engine_initNodeStatus();
  }
  const gd = graphData.g.diagram.model._graphData;
  let key = keyOrData;
  if( typeof( keyOrData ) == 'object' ) {
    key = keyOrData.key;
  }
  
  if( !gd[key] ) {
    gd[key] = {};
  }
  if( gd[key][name] === undefined ) {
    gd[key][name] = defaultValue;
  }
  return( gd[key][name] );
}
function Engine_set( keyOrData, name, value ) {
  if( graphData.g && !graphData.g.diagram.model._graphData ) {
    Engine_initNodeStatus();
  } 
  const gd = graphData.g.diagram.model._graphData;
  let key = keyOrData;
  if( typeof( keyOrData ) == 'object' ) {
    key = keyOrData.key;
  }
  
  if( !gd[key] ) {
    gd[key] = {};
  }
  
  gd[key][name] = value;
}
function Engine_getProperty( nodeData, name, defaultValue ) {
  const value = graphData.me.getProperty( modelId, nodeData, name );
  if( value != undefined ) {
    return( value );
  } else {
    return( defaultValue );
  }
}
function Engine_getNodeDataValue( key, name, defaultValue ) {
  const nodeData = graphData.me.getNode( modelId, key );
  const value = nodeData[name];
  if( value != undefined ) {
    return( value );
  } else {
    return( defaultValue );
  }
}
function Engine_isInputNew( nodeData, name ) {
  let result = false;
  
  // Get current input status
  let inState = Engine_get( nodeData, 'inState', {} );
  
  if( inState._in && inState._in[name] ) {
    result = inState._in[name].isNew;
  }
  
  return( result );
}
function Engine_getInput( nodeData, name, defaultValue ) {
  // returns:
  //   defaultValue: if not connected (never arrived)
  //   value: if connected and arrived (new value) or not arrived (last value)
  let result = undefined;

  // Parse input name with @ and interpret as a reference
  if( name.indexOf( '@' ) >= 0 ) {
    let [ fieldName, key ] = name.split( '@' );
    key = key || 'self';
    
    if( parseInt( key ) == key ) {
      // Case of node reference
      result = Engine_getNodeDataValue( key, fieldName, defaultValue );
    } else {
      // Case of group/self/property reference
      let value = undefined;
      switch( key ) {
        case 'self':
          value = nodeData[fieldName]
          break;
        case 'group':
          key = nodeData.group;
          if( key ) {
            value = Engine_getNodeDataValue( key, fieldName, defaultValue );
          }
          break;
        case 'property':
          value = Engine_getProperty( nodeData, fieldName, defaultValue );
          break;
      }
      result = ( value == undefined? defaultValue: value );
    }
  } else {
    // Get current input status
    let inState = Engine_get( nodeData, 'inState', {} );
  
    // Crete in object and input state
    if( !inState._in ) {
      inState._in = {};
    }
    if( !inState._in[name] ) {
      inState._in[name] = {}; // This will be as: in[name] = { value, isNew }
    }
  
    if( inState._in[name].value == undefined ) {
      result = defaultValue;
    } else {
      result = inState._in[name].value;
    }
  }
  return( result );
}
function Engine_setInput( nodeData, name, value ) {
  // Get current input status
  let inState = Engine_get( nodeData, 'inState', {} );

  // Crete in object and input state
  if( !inState._in ) {
    inState._in = {};
  }
  if( !inState._in[name] ) {
    inState._in[name] = {};
  }
  // Update input state
  inState._in[name].value = value;
  inState._in[name].isNew = true;
}
function Engine_getInputNameList( nodeData ) {
  let result = [];
  if( nodeData.in_ ) {
    for( const inInfo of nodeData.in_ ) {
      result.push( inInfo.name );
    }
  }
  return( result );
}

//------------------------------
// This code is for HierarchyDSL
//------------------------------
// Get current graphical canvas editor
if( !graphData.g ) {
  graphData.g = getMainGraph();
  Engine_initNodeStatus();
}
// Model ID for the current graph
var modelId = 'main';
// Load the Model Explorer
if( !graphData.me ) {
  Engine_loadModel();
  //Latest This is the version
}

//------------------------------
// Engine State
//------------------------------
var Engine_currNodeSelectionKey = null;
function Engine_selectNode( nodeData ) {
  const key = nodeData.key;
  if( Engine_currNodeSelectionKey != key ) {
    Engine_currNodeSelectionKey = key;
    m.e.selectNodeInGraph( key );
    console.log( 'SEL: ', nodeData.label, key );
  }
}
function Engine_doRun() {
  graphData.engineIsRun = true;
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
  if( graphData.engineIsRun ) {
    setTimeout( Engine_doStep, graphData.engineRuntimeout*1000 );
  }
}
function Engine_doPause() {
  graphData.engineIsRun = false;
}
function Engine_fireOutput( nodeData, name, value ) {
  // Update the state
  const inState = Engine_get( nodeData, 'inState', {} );
  
  // Execute the fire
  if( graphData.engineIsStepByStep ) {
    Engine_fireOutputStep( nodeData, name, value );
  } else {
    Engine_fireOutputFlow( nodeData, name, value );
  }
}
function Engine_fireOutputStep( nodeData, name, value ) {
  // Get output link list
  const outLinkDataList = Engine_getOutputLinkDataList( nodeData, name );
  // If Output is connected
  if( outLinkDataList && outLinkDataList.length ) {
    Engine_selectNode( nodeData );
    
    Engine_addStep({ outLinkDataList, name, value });
  }
}
function Engine_fireOutputFlow( nodeData, name, value ) {
  // Get output link list
  const outLinkDataList = Engine_getOutputLinkDataList( nodeData, name );
  // If Output is connected
  if( outLinkDataList && outLinkDataList.length ) {
    Engine_selectNode( nodeData );
        
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
  Engine_selectNode( nodeData );
  
  const inState = Engine_updateInput( nodeData, name, value );
  
  Engine_fireEvent( nodeData, name, value );
  
  if( inState.isCompute ) {
    inState.didCompute = true;
    
    // Check type of fanout component
    Engine_fireEvent( nodeData, 'doCompute' );
  }
}
function Engine_fireEvent( nodeData, name, value ) {
  switch( nodeData.category ) {
    // case 'DataFlow_Data':
    // case 'DataFlow_DataSend': {
    //   DataFlowDSL_Data( nodeData, name, value );
    // }
    // break;
    // case 'DataFlow_Template': {
    //   DataFlowDSL_Template( nodeData, name, value );
    // }
    // break;
    // case 'DataFlow_Concatenate': {
    //   DataFlowDSL_Concatenate( nodeData, name, value );
    // }
    // break;
    // case 'DataFlow_Message': {
    //   DataFlow_Message( nodeData, name, value );
    // }
    // break;
    default: {
      if( nodeData.doCompute || 
        ( nodeData.fileContent && nodeData.fileType == 'text/javascript' ) ) {
        // eval node fileContent
        if ( nodeData.doCompute ) {
          window[nodeData.doCompute]( nodeData, name, value );
        } else if( nodeData.fileContent ) {
          eval( nodeData.fileContent );
        } 
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
  if( nodeData.in_ ) {
    for( const inputData of nodeData.out_ ) {
      if( inputData.name == InName ) {
        
        // Get output link from name port
        const outLinkDataList = graphData.me.getLinkListFanOutByNodeKey( modelId, nodeData.key, inName );
        
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
function Engine_applyTemplate( templateStr, values, isKeepUnmatchedValues ) {
  let result = '';
  // Function to get key->value replacement
  const getKeyValue = ( matchStr )=> {
    const name = matchStr.substring( 1, matchStr.length-1 );
    if ( name in values) {
      const v = values[name];
      if( typeof( v ) == 'string' ) {
        return( v );
      } else if( typeof( v.value ) == 'string' ) {
        return( v.value );
      } else {
        return( '' );
      }
    } else {
      if( isKeepUnmatchedValues ) {
        return( `${matchStr}`);
      } else {
        return( '' );
      }
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
      graphData.engineStatus.stack = [];
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
function Engine_initNodeStatus() {
   graphData.g.diagram.model._graphData = {};
}
function Engine_loadModel() {
  // Get current graph model
  const model = graphData.g.getJSONModel();
  // Create a new Model Explorer
  graphData.me = new ModelExplorer();
  // Load current graph model in Model Explorer
  graphData.me.setJSONModel( modelId, model );
}
function Engine_initialize( nodeData ) {
  if( !graphData.engineData ) {
    graphData.engineData = nodeData;
    graphData.engineStatus = { stack: [] };
    graphData.engineIsRun = false;
  }
}
function Engine_updateEngineNode( key ) {
  // Get updated data from graph (model is not updated)
  const g = getMainGraph();
  const nodeData = getNodeData( key );
  graphData.engineData = nodeData;
  return( nodeData );
}
function Engine_updateProperty( nodeData ) {
  graphData.engineIsStepByStep = graphData.me.getProperty( modelId, nodeData, 'isStepByStep' );
  graphData.engineRuntimeout = graphData.me.getProperty( modelId, nodeData, 'runTimeout' );
  graphData.engineIsStepByStepDeepFirst = graphData.me.getProperty( modelId, nodeData, 'isStepByStepDeepFirst' );
}
function Engine_getNextStepData() {
  let result = null;
  let stepInfo = null;
  if( graphData.engineStatus.stack.length ) {
    if( graphData.engineIsStepByStepDeepFirst ) {
      // Get newest step info
      const stepList = graphData.engineStatus.stack.slice( -1 );
      if( stepList.length ) {
        stepInfo = stepList[0];
      }
    } else {
      // Get oldest step info
      stepInfo = graphData.engineStatus.stack[0];
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
      if( graphData.engineIsStepByStepDeepFirst ) {
        // Remove newest step
        graphData.engineStatus.stack.pop();
      } else {
        // Remove oldest step
        graphData.engineStatus.stack.shift();
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
    graphData.engineStatus.stack.push( stepInfo );
  }
}
function Engine_getInputLinkDataList( nodeData, name ) {
  let result = null;
  // Check if name exist
  if( nodeData.in_ ) {
    for( const inputData of nodeData.in_ ) {
      if( inputData.name == name ) {
        
        // Get input link from name port
        result = graphData.me.getLinkListFanInByNodeKey( modelId, nodeData.key, name );
        break;
      }
    }
  }
  return( result );
}
function Engine_getOutputLinkDataList( nodeData, name ) {
  let result = null;
  // Check if name exist
  if( nodeData.out_ ) {
    for( const outputData of nodeData.out_ ) {
      if( outputData.name == name ) {
        
        // Get output link from name port
        result = graphData.me.getLinkListFanOutByNodeKey( modelId, nodeData.key, name );
        break;
      }
    }
  }
  return( result );
}
function Engine_getComputeBarrier( nodeData ) {
  /*
   * Values for computeBarrier:
   * - computeBarrier = '*' => all inputs belong to the barrier
   * - computeBarrier = 'in1,in2' => only 'in1' & 'in2' belong to the barrier
   * - computeBarrier = '' or undefined => no doCompute event generated
   */
  let computeBarrier = graphData.me.getProperty( modelId, nodeData, 'computeBarrier', null );
  if( computeBarrier ) {
    if( computeBarrier.trim() == '*' ) {
      computeBarrier =  Engine_getInputNameList( nodeData );
    } else {
      computeBarrier = computeBarrier.split( ',' ).map(item=>item.trim( item ));
    }
  } else {
    computeBarrier = null;
  }
  return( computeBarrier );
}
function Engine_updateInput( nodeData, name, value, inCondition ) {
  let isCompute = true;
  
  // Get current input status
  let inState = Engine_get( nodeData, 'inState', {} );
  
  // If I just executed the doCompute => reset inputs isNew state
  if( inState.didCompute ) {
    if( inState._in ) {
      for( const inName in inState._in ) {
        inState._in[inName].isNew = false;
      }
    }
    inState.didCompute = false;
  }

  // Set current input value
  Engine_setInput( nodeData, name, value );
  
  // Get input list for the barrier
  const inputNameList = Engine_getComputeBarrier( nodeData );
  if( inputNameList ) {
    for( const inName of inputNameList ) {
      if( Engine_isInputConnected( nodeData, inName ) ) {
        let isNewInput = false;
        if( inState._in[inName] ) {
          isNewInput = inState._in[inName].isNew;
        }
        if( inCondition ) {
          isNewInput = inCondition( name, value, isNewInput );
        }
        isCompute &&= isNewInput;
      }
    }
    
    // Update input value object
    inState.isCompute = isCompute;
  } else {
    inState.isCompute = false;
  }

  // Return input state
  return( inState );
}

