/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
/*
============================================================================
Module: DataFlow Engine
Date: 10.07.2020
=============================================================================
*/

// TODO: this class should not use any function of
// the system, sicne it should be possible to
// execute models on server side.
// Any client side function should be implemented
// in the ModelExplorer
class DataFlowEngine {
  constructor(engineData) {
    graphData.engine = this;
    // Store component with buttons and parameter for the engine
    this.engineData = engineData;
    this.engineStatus = { stack: [] };
    this.engineIsRun = false;
    //------------------------------
    // Get current graphical canvas editor
    this.g = getMainGraph();

    // Model ID for the current graph
    this.modelId = 'main';
    this.loadModel();
    // Exdecution Data: runtime instance execution data for all nodes
    this.ed = {};
    // Storage Data: runtime storage data for all nodes
    this.sd = {};

    // Debug mode
    this.isDebugCompute = false;
    this.isTraceLogOn = false;
    this.execTraceLog = [];
    //------------------------------
    // Engine State
    //------------------------------
    this.currNodeSelectionKey = null;
    this.isOutputBuffered = false;
    this.isPause = false;
    this.pauseData = null;
    this.isLogOn = false;
  }
  //------------------------------
  // Public Component API
  //------------------------------
  setState( property, value ) {
    switch( property ) {
      case 'isOutputBuffered':
        this.isOutputBuffered = value;
        break;
      case 'isTraceLogOn':
        this.isTraceLogOn = value;
        break;
      case 'isLogOn':
        this.isLogOn = value;
    }
  }
  clearInstanceData() {
    this.ed = {};
    this.isPause = false;
    this.pauseData = null;
    this.execTraceLog = [];
  }
  setLogOn() {
    this.isLogOn = true;
  }
  setLogOff() {
    this.isLogOn = false;
  }
  getTraceLog( isCommentOn ) {
    const traceLogLen = this.execTraceLog.length;
    if( traceLogLen ) {
      let log = '';
      this.execTraceLog.forEach( (l, i)=> {
        const comma = ( i == traceLogLen-1? '': ',' );
        log = log+`\n  { "key": ${l.key} }${comma}${ isCommentOn? `  // ${l.label}`: '' }`;
      });
      return( `[${log}\n]`)
    } else {
      return( '[]' );
    }
  }
  loadModel() {
    // Get current graph model
    graphData.g = getMainGraph();
    const model = graphData.g.getJSONModel();
    // Create a new Model Explorer
    this.me = new ModelExplorer();
    // Load current graph model in Model Explorer
    this.me.setJSONModel(this.modelId, model);
  }
  get(keyOrData, name, defaultValue) {
    let key = this._getKey( keyOrData );    
    return ( this._get( this.ed, key, name, defaultValue ) );
  }
  set(keyOrData, name, value) {
    let key = this._getKey( keyOrData );
    this._set( this.ed, key, name, value );
  }
  getStorage(keyOrData, name, defaultValue) {
    let key = this._getKey( keyOrData );    
    return ( this._get( this.sd, key, name, defaultValue ) );
  }
  setStorage(keyOrData, name, value) {
    let key = this._getKey( keyOrData );
    this._set( this.sd, key, name, value );
  }
  getPropertyNameList( nodeData ) {
    let result = [];
    if( nodeData.props_ ) {
      nodeData.props_.filter( (r)=> result.push( r.name ) );
    }
    return( result );
  }
  isProperty( nodeData, name ) {
    let result = false;
    if( nodeData.props_ ) {
      nodeData.props_.find( (r)=> result = ( r.name == name ) );
    }
    return( result );
  }
  getProperty( nodeData, name, defaultValue ) {
    let value = defaultValue;
    if( nodeData.props_ ) {
      nodeData.props_.find( (r)=> { if( r.name == name ) { value = r.value; return( true ); } });
    }

    value = this._getParsedValue( nodeData, value );
    return( value ); 
  }
  getPropertyRef( nodeData, name, defaultValue ) {
    let value = defaultValue;
    if( nodeData.props_ ) {
      nodeData.props_.find( (r)=> { if( r.name == name ) { value = r.value; return( true ); } });
    }

    // Convert property to a data type
    value = this._evalValue( value );
    // Get reference info
    const refInfo = parseRefValue( nodeData, value );
    return( refInfo ); 
  }
  getPropertyList( nodeData ) {
    let result = {};
    if( nodeData.props_ ) {
      nodeData.props_.filter( (r)=> result[r.name] = this._getParsedValue( nodeData, r.value ) );
    }
    return( result );
  }
  isInput( nodeData, name ) {
    let result = false;
    if( nodeData.in_ ) {
      nodeData.in_.find( (i)=> result = ( i.name == name ) );
    }
    return( result );
  }
  isOutput( nodeData, name ) {
    let result = false;
    if( nodeData.out_ ) {
      nodeData.out_.find( (o)=> result = ( o.name == name ) );
    }
    return (result);
  }
  getInputNameList(nodeData) {
    let result = [];
    if( nodeData.in_ ) {
      nodeData.in_.filter( (i)=> result.push( i.name ) );
    }
    return (result);
  }
  getOutputNameList(nodeData) {
    let result = [];
    if (nodeData.out_) {
      nodeData.out_.filter( (o)=> result.push( o.name ) );
    }
    return (result);
  }
  getInputList(nodeData) {
    let result = {};
    const inputNameList = this.getInputNameList( nodeData );
    for( const inName of inputNameList ) {
      result[inName] = graphData.dfe.getInput( nodeData, inName, '' );
    }
    return( result );
  }
  getNodeDataValue(key, name, defaultValue) {
    const nodeData = this.me.getNode(this.modelId, key);
    const value = nodeData[name];
    if (value != undefined) {
      return (value);
    } else {
      return (defaultValue);
    }
  }
  isInputNew(nodeData, name) {
    let result = false;

    // Get current input status
    let inState = this.get(nodeData, 'inState', {});

    if (inState._in && inState._in[name]) {
      result = inState._in[name].isNew;
    }

    return (result);
  }
  getInput(nodeData, name, defaultValue) {
    // returns:
    //   defaultValue: if not connected (never arrived)
    //   value: if connected and arrived (new value) or not arrived (last value)
    let result = undefined;

    // Get current input status
    let inState = this.get(nodeData, 'inState', {});

    // Crete in object and input state
    if (!inState._in) {
        inState._in = {};
    }
    if (!inState._in[name]) {
        inState._in[name] = {}; // This will be as: in[name] = { value, isNew }
    }

    if (inState._in[name].value == undefined) {
        result = defaultValue;
    } else {
        result = inState._in[name].value;
    }
    return (result);
  }
  setInput(nodeData, name, value) {
    // Get current input status
    let inState = this.get(nodeData, 'inState', {});

    // Crete in object and input state
    if (!inState._in) {
      inState._in = {};
    }
    if (!inState._in[name]) {
      inState._in[name] = {};
    }
    // Update input state
    inState._in[name].value = value;
    inState._in[name].isNew = true;
  }
  getOutput( nodeData, name, defaultValue ) {
    let result = defaultValue;

    // Get current input status
    let inState = this.get(nodeData, 'inState', {});

    // Crete in object and input state
    if ( inState._out ) {
      const v = inState._out[name];
      if( v != undefined ) {
        result = v.value;
      }
    }
    return( result );
  }
  fireOutput( nodeData, name, value ) {
    // Update the state
    const inState = this.get(nodeData, 'inState', {});

    // Store output value
    if( this.isOutputBuffered ) {
      this._setOutput( inState, name, value );
    }

    // Execute the fire
    if (graphData.engineIsStepByStep) {
      this._fireOutputStep(nodeData, name, value);
    } else {
      this._fireOutputFlow(nodeData, name, value);
    }
  }
  fireByRef( nodeData, refValue, value ) {
    const refInfo = parseRefValue( nodeData, refValue );
    if( refInfo.isRef && refInfo.nodeData ) {
      graphData.dfe._fireInput( refInfo.nodeData, refInfo.name, value );
    }
  }
  isOutputConnected(nodeData, name) {
    // Get output link list
    const list = this.getOutputLinkDataList(nodeData, name);
    // If output is connected
    return (list && list.length)
  }
  isInputConnected(nodeData, name) {
    // Get input link list
    const list = this.getInputLinkDataList(nodeData, name);
    // If input is connected
    return (list && list.length)
  }
  isSelfLoop(nodeData, inName) {
    // Check if name exist
    if (nodeData.in_) {
      for (const inputData of nodeData.out_) {
        if (inputData.name == inName) {
          //---const inPortId = inputData.portId;
          // Get output link from name port
          //---const outLinkDataList = graphData.me.getLinkListFanOutByNodeKey(this.modelId, nodeData.key, inPortId);
          const outLinkDataList = graphData.me.getLinkListFanOutByNodeKey(this.modelId, nodeData.key, inName);

          if (outLinkDataList.length) {
            for (const outData of outLinkDataList) {
              if ((outData.to == nodeData.key) &&
                (outData.fromPort == inPortId)) {
                return (true);
              }
            }
          }
        }
      }
    }
    return (false);
  }
  getInputNodeDataList(nodeData, name) {
    let result = null;
    // Check if name exist
    if (nodeData.in_) {
      for (const inputData of nodeData.in_) {
        if (inputData.name == name) {
          //--const portId = inputData.portId;
          // Get input link from name port
          //--result = this.me.getNodeListFanInByNodeKey(this.modelId, nodeData.key, portId);
          result = this.me.getNodeListFanInByNodeKey(this.modelId, nodeData.key, name);
          break;
        }
      }
    }
    return (result);
  }
  getOutputNodeDataList(nodeData, name) {
    let result = null;
    // Check if name exist
    if (nodeData.out_) {
      for (const outputData of nodeData.out_) {
        if (outputData.name == name) {
          //--const portId = outputData.portId;
          // Get output link from name port
          //--result = this.me.getNodeListFanOutByNodeKey(this.modelId, nodeData.key, portId);
          result = this.me.getNodeListFanOutByNodeKey(this.modelId, nodeData.key, name);
          break;
        }
      }
    }
    return (result);
  }
  getInputLinkDataList(nodeData, name) {
    let result = null;
    // Check if name exist
    if (nodeData.in_) {
      for (const inputData of nodeData.in_) {
        if (inputData.name == name) {
          //--const portId = inputData.portId;
          // Get input link from name port
          //--result = this.me.getLinkListFanInByNodeKey(this.modelId, nodeData.key, portId);
          result = this.me.getLinkListFanInByNodeKey(this.modelId, nodeData.key, name);
          break;
        }
      }
    }
    return (result);
  }
  getOutputLinkDataList(nodeData, name) {
    let result = null;
    // Check if name exist
    if (nodeData.out_) {
      for (const outputData of nodeData.out_) {
        if (outputData.name == name) {
          //--const portId = outputData.portId;
          // Get output link from name port
          //--result = this.me.getLinkListFanOutByNodeKey(this.modelId, nodeData.key, portId);
          result = this.me.getLinkListFanOutByNodeKey(this.modelId, nodeData.key, name);
          break;
        }
      }
    }
    return (result);
  }
  //------------------------------
  // Public EngineControl API
  //------------------------------
  executeAction(nodeData, actionName) {
    // Update engine node data
    nodeData = this._updateEngineNode(nodeData.key);

    // Update engine properties in case of change
    this._updateProperty(nodeData);

    // Execute selected action
    switch (actionName) {
      case 'Reset':
        this.engineStatus.stack = [];
        break;
      case 'Run':
        this.doRun();
        break;
      case 'Step':
        this.doStep();
        break;
      case 'Pause':
        this.doPause();
        break;
    }
  }
  doRun() {
    this.engineIsRun = true;
    this.doStep();
  }
  doStep() {
    // Get next step Data
    const stepData = this._getNextStepData();
    // Check if a node has been found
    if (stepData) {
      // execute the node
      this._fireInput(stepData.nodeData, stepData.name, stepData.value);
    }

    // Check if we should run continuously
    if (this.engineIsRun) {
      setTimeout(this.doStep, this.engineRuntimeout * 1000);
    }
  }
  doPause() {
    //this.engineIsRun = false;
    this.isPause = true;
  }
  doContinue() {
    if( this.isPause ) {
      this.isPause = false;
      if( this.pauseData ) {
        const nodeData = this.pauseData.nodeData;
        const name = this.pauseData.name;
        const value = this.pauseData.value;
        // Clear pauseData
        this.pauseData = null;
        // Continue execution
        this._fireInputCore( nodeData, name, value );
      }
    }
  }
  _updateEngineNode(key) {
    // Get updated data from graph (model is not updated)
    const g = getMainGraph();
    const nodeData = getNodeData(key);
    this.engineData = nodeData;
    return (nodeData);
  }
  _updateProperty(nodeData) {
    graphData.engineIsStepByStep = graphData.me.getProperty(this.modelId, nodeData, 'isStepByStep');
    graphData.engineRuntimeout = graphData.me.getProperty(this.modelId, nodeData, 'runTimeout');
    graphData.engineIsStepByStepDeepFirst = graphData.me.getProperty(this.modelId, nodeData, 'isStepByStepDeepFirst');
  }
  //------------------------------
  // Private Functions
  //------------------------------
  _getKey( keyOrData ) {
    let result = keyOrData;
    if (typeof (keyOrData) == 'object') {
      result = keyOrData.key;
    }
    return( result );
  }
  _get( storage, key, name, defaultValue ) {
    if (!storage[key]) {
      storage[key] = {};
    }
    if (storage[key][name] === undefined) {
      storage[key][name] = defaultValue;
    }
    return( storage[key][name] );
  }
  _set( storage, key, name, value ) {
    if (!storage[key]) {
      storage[key] = {};
    }
    storage[key][name] = value;
  }
  _getParsedValue( nodeData, value ) {
    // Convert property to a data type
    value = this._evalValue( value );

    // Get reference info
    const refInfo = getRefValue( nodeData, value );
    if( refInfo.isRef ) {
      if( graphData.dfe.isInput( refInfo.nodeData, refInfo.name ) ) {
        refInfo.value = graphData.dfe.getInput( refInfo.nodeData, refInfo.name );
      } else if( graphData.dfe.isOutput( refInfo.nodeData, refInfo.name ) ) {
        refInfo.value = graphData.dfe.getOutput( refInfo.nodeData, refInfo.name );
      } else if( graphData.dfe.isProperty( refInfo.nodeData, refInfo.name ) ) {
        refInfo.value = graphData.dfe.getProperty( refInfo.nodeData, refInfo.name );
      }
    }
    return( refInfo.value );
  }
  _selectNode(nodeData) {
    const key = nodeData.key;
    if (this.currNodeSelectionKey != key) {
      this.currNodeSelectionKey = key;
      m.e.selectNodeInGraph(key);
      if( this.isLogOn ) {
        console.log('SEL: ', nodeData.label, key);
      }
    }
  }
  _setOutput( inState, name, value ) {
    // Crete in object and input state
    if (!inState._out) {
      inState._out = {};
    }
    if (!inState._out[name]) {
      inState._out[name] = {};
    }
    // Update input state
    inState._out[name].value = value;
  }
  _fireOutputStep(nodeData, name, value) {
    // Get output link list
    const outLinkDataList = this.getOutputLinkDataList(nodeData, name);
    // If Output is connected
    if (outLinkDataList && outLinkDataList.length) {
      this._selectNode(nodeData);

      this._addStep({ outLinkDataList, name, value });
    }
  }
  _fireOutputFlow(nodeData, name, value) {
    // Get output link list
    const outLinkDataList = this.getOutputLinkDataList(nodeData, name);
    // If Output is connected
    if (outLinkDataList && outLinkDataList.length) {
      this._selectNode(nodeData);

      // Loop over out components
      for (const outLinkData of outLinkDataList) {
        const outNodeKey = outLinkData.to;
        // Read data of fanOut components
        const outNodeData = getNodeData( outNodeKey );
        // Execute target component for its input
        const portId = outLinkData.toPort;
        const inName = this._getPortName( outNodeData, portId, 'in' );

        // Reset debug compute
        this.isDebugCompute = false;
        // Log link message if present
        switch( outLinkData.category ) {
          case 'DataFlow_Log':
            let logMsg = outLinkData.label;
            if( logMsg == 'debugger' ) {
              //debugger
              this.isDebugCompute = true;
            } else if( logMsg && !logMsg.startsWith( '//' ) ) {
              if( logMsg.indexOf( '{value}' ) != -1 ) {
                let valueStr = ( typeof( value ) == 'object'?
                                  JSON.stringify( value, null, 2 ):
                                  value );
                logMsg = logMsg.replace( '{value}', valueStr );
              }
              console.log( logMsg );
            }
            break;
          case 'DataFlow_Pause':
            this.doPause();
            break;
          case 'DataFlow_Stop':
            return;
        }

        this._fireInput(outNodeData, inName, value );
      }
    }
  }
  _fireInput(nodeData, name, value) {
    
    if( this.isPause && !nodeData.isNoPauseNode ) {
      this.pauseData = { nodeData, name, value };
    } else {
      this._fireInputCore( nodeData, name, value );
    }
  }
  _fireInputCore( nodeData, name, value ) {
    // Select current node
    this._selectNode(nodeData);

    const inState = this._updateInput(nodeData, name, value);

    this._fireEvent(nodeData, name, value);

    if (inState.isCompute) {
      inState.didCompute = true;

      // Check type of fanout component
      this._fireEvent(nodeData, 'doCompute');
    }
  }
  _fireEvent(nodeData, name, value) {
    // Update execution log if on
    if( this.isTraceLogOn ) {
      let label = ( nodeData.label? nodeData.label: nodeData.category );
      const labelLen = label.length;
      // Remove new lines, "}" since I will look for that, and cut to 30 chars
      label = label.replaceAll( '\n', ' ' ).replaceAll( '}', '' ).substring( 0, 30 );
      if( label.length < labelLen ) {
        label = label+'...';
      }
      this.execTraceLog.push( { key: nodeData.key, label } );
    }
    // const doEval = function( nodeData, name, value ) {
    //   eval(_nodeData_.fileContent);
    // }
    if (nodeData.doCompute) {
      window[nodeData.doCompute](nodeData, name, value);
    } else if (nodeData.fileContent && (nodeData.fileType == 'text/javascript')) {
      //eval( nodeData.fileContent );
      DataFlowEngine_doExecuteNode( nodeData, name, value, this.isDebugCompute );
      this.isDebugCompute = false;
      // const nodeBody = nodeData.fileContent;
      // const nodeFunction = Function( 'nodeData', 'name', 'value', nodeBody );
      // nodeFunction( nodeData, name, value );
    } else if( nodeData.fileURL && nodeData.fileURL.startsWith( 'graph://' ) &&
               ( nodeData.fileType == 'text/javascript' ) ) {
      const onLoaded = ()=> {
        DataFlowEngine_doExecuteGraphNode( nodeData, name, value, source, this.isDebugCompute );
      }
      loadNodeContent( nodeData, onLoaded );
      this.isDebugCompute = false;
    } 
  }
  _getPortName( nodeData, portId, portType ) {
    let result = '';
    const portList = ( portType == 'in'? nodeData.in_: nodeData.out_ );
    portList.find( (p)=> { if( p.portId == portId ) { result = p.name; return( true ) } } );
    return( result );
  }
  //------------------------------
  // Engine Helper Functions
  //------------------------------
  _getNextStepData() {
    let result = null;
    let stepInfo = null;
    if (this.engineStatus.stack.length) {
      if (this.engineIsStepByStepDeepFirst) {
        // Get newest step info
        const stepList = this.engineStatus.stack.slice(-1);
        if (stepList.length) {
          stepInfo = stepList[0];
        }
      } else {
        // Get oldest step info
        stepInfo = this.engineStatus.stack[0];
      }
    }
    // If a step has been found
    if (stepInfo) {
      // Get output link list
      const outLinkData = stepInfo.outLinkDataList[stepInfo.index];
      // Get target input port of the current link
      const outNodeKey = outLinkData.to;
      // Read data of fanOut components
      const outNodeData = getNodeData(outNodeKey);

      // Clear current step in case it has been
      // fully executed (all links traversed)
      // NOTE: clear must be done at this exact moment
      // In this line!!!
      this._clearStep(stepInfo);

      // Execute target component for its input
      const name = outLinkData.toPort;
      // Return the node info
      result = {
        name,                   // Input name of next node to execute
        value: stepInfo.value, // Input value
        nodeData: outNodeData,  // Node data of next node to execute
      }
    }
    return (result);
  }
  _clearStep(stepInfo) {
    if (stepInfo) {
      // Check if all links have been visited
      if (stepInfo.index + 1 >= stepInfo.outLinkDataList.length) {
        // If all links visited, remove first step from stack
        if (this.engineIsStepByStepDeepFirst) {
          // Remove newest step
          this.engineStatus.stack.pop();
        } else {
          // Remove oldest step
          this.engineStatus.stack.shift();
        }
      } else {
        ++stepInfo.index; // Go to next link
      }
    }
  }
  _addStep(stepInfo) {
    if (stepInfo) {
      // Initialize step index
      stepInfo.index = 0;
      // Push a new step at the end of the stack
      this.engineStatus.stack.push(stepInfo);
    }
  }
  _getComputeBarrier(nodeData) {
    /*
    * Values for computeBarrier:
    * - computeBarrier = '*' => all inputs belong to the barrier
    * - computeBarrier = 'in1,in2' => only 'in1' & 'in2' belong to the barrier
    * - computeBarrier = '' or undefined => no doCompute event generated
    */
    let computeBarrier = this.me.getProperty(this.modelId, nodeData, 'computeBarrier', null );
    if ( computeBarrier == null ) {
      computeBarrier = ( nodeData.computeBarrier != undefined? nodeData.computeBarrier: null );
    }

    if( computeBarrier != null ) {
      if ( computeBarrier.trim() == '*' ) {
        computeBarrier = this.getInputNameList(nodeData);
      } else {
        computeBarrier = computeBarrier.split(',').map(item => item.trim(item));
      }
    }

    return (computeBarrier);
  }
  _updateInput(nodeData, name, value, inCondition) {
    let isCompute = true;

    // Get current input status
    let inState = this.get(nodeData, 'inState', {});

    // If I just executed the doCompute => reset inputs isNew state
    if (inState.didCompute) {
      if (inState._in) {
        for (const inName in inState._in) {
          inState._in[inName].isNew = false;
        }
      }
      inState.didCompute = false;
    }

    // Set current input value
    this.setInput(nodeData, name, value);

    // Get input list for the barrier
    const inputNameList = this._getComputeBarrier(nodeData);
    if (inputNameList) {
      for (const inName of inputNameList) {
        if (this.isInputConnected(nodeData, inName)) {
          let isNewInput = false;
          if (inState._in[inName]) {
            isNewInput = inState._in[inName].isNew;
          }
          if (inCondition) {
            isNewInput = inCondition(name, value, isNewInput);
          }
          isCompute &&= isNewInput;
        } else {
          isCompute = false;
        }
      }

      // Update input value object
      inState.isCompute = isCompute;
    } else {
      inState.isCompute = false;
    }

    // Return input state
    return (inState);
  }
  _evalValue( value ) {
    switch( typeof( value ) ) {
      case 'string':
        switch( value ) {
          case 'true':
            value = true;
            break;
          case 'false':
            value = false;
            break;
          default:
            // Check if the value is a number
            if( !isNaN( value ) ) {
              value = parseFloat( value );
            }
            break;
        }
        break;
      case 'boolean':
        break;
    }
    return( value );
  }
}

DataFlowEngine.getInstance = function (engineData) {
  if (!graphData.dfe) {
    graphData.dfe = new DataFlowEngine(engineData);
  } else {
    graphData.dfe.loadModel();
  }

  return (graphData.dfe);
}

function DataFlowEngine_doExecuteNode( nodeData, name, value, isDebugCompute ) {
  let computeSource = nodeData.fileContent;
  if( isDebugCompute ) {
    computeSource = 'debugger;'+computeSource;
  }
  eval( computeSource );
}
function DataFlowEngine_doExecuteGraphNode( nodeData, name, value, source, isDebugCompute ) {
  let computeSource = source;
  if( isDebugCompute ) {
    computeSource = 'debugger;'+computeSource;
  }
  eval( computeSource );
}