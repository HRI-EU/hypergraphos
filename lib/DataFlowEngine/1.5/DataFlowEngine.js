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
    // Runtime data for all nodes
    this.gd = {};

    //------------------------------
    // Engine State
    //------------------------------
    this.currNodeSelectionKey = null;
    this.isOutputBuffered = false;
  }
  //------------------------------
  // Public Component API
  //------------------------------
  setState( property, value ) {
    switch( property ) {
      case 'isOutputBuffered':
        this.isOutputBuffered = value;
        break;
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
    let key = keyOrData;
    if (typeof (keyOrData) == 'object') {
      key = keyOrData.key;
    }
    if (!this.gd[key]) {
      this.gd[key] = {};
    }
    if (this.gd[key][name] === undefined) {
      this.gd[key][name] = defaultValue;
    }
    return (this.gd[key][name]);
  }
  set(keyOrData, name, value) {
    let key = keyOrData;
    if (typeof (keyOrData) == 'object') {
      key = keyOrData.key;
    }

    if (!this.gd[key]) {
      this.gd[key] = {};
    }

    this.gd[key][name] = value;
  }
  getPropertyNameList( nodeData ) {
    let result = [];
    if( nodeData.rows ) {
      nodeData.rows.filter( (r)=> result.push( r.name ) );
    }
    return( result );
  }
  isProperty( nodeData, name ) {
    let result = false;
    if( nodeData.rows ) {
      nodeData.rows.find( (r)=> result = ( r.name == name ) );
    }
    return( result );
  }
  getProperty( nodeData, name, defaultValue ) {
    let value = defaultValue;
    if( nodeData.rows ) {
      nodeData.rows.find( (r)=> { if( r.name == name ) { value = r.value; return( true ); } });
    }

    value = this._getParsedValue( nodeData, value );
    return( value ); 
  }
  getPropertyRef( nodeData, name, defaultValue ) {
    let value = defaultValue;
    if( nodeData.rows ) {
      nodeData.rows.find( (r)=> { if( r.name == name ) { value = r.value; return( true ); } });
    }

    // Convert property to a data type
    value = this._evalValue( value );
    // Get reference info
    const refInfo = parseRefValue( nodeData, value );
    return( refInfo ); 
  }
  getPropertyList( nodeData ) {
    let result = {};
    if( nodeData.rows ) {
      nodeData.rows.filter( (r)=> result[r.name] = this._getParsedValue( nodeData, r.value ) );
    }
    return( result );
  }
  isInput( nodeData, name ) {
    let result = false;
    if( nodeData.in ) {
      nodeData.in.find( (i)=> result = ( i.portId == name ) );
    }
    return( result );
  }
  isOutput( nodeData, name ) {
    let result = false;
    if( nodeData.out ) {
      nodeData.out.find( (o)=> result = ( o.portId == name ) );
    }
    return (result);
  }
  getInputNameList(nodeData) {
    let result = [];
    if( nodeData.in ) {
      nodeData.in.filter( (i)=> result.push( i.portId ) );
    }
    return (result);
  }
  getOutputNameList(nodeData) {
    let result = [];
    if (nodeData.out) {
      nodeData.out.filter( (o)=> result.push( o.portId ) );
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

    if (inState.in && inState.in[name]) {
      result = inState.in[name].isNew;
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
    if (!inState.in) {
        inState.in = {};
    }
    if (!inState.in[name]) {
        inState.in[name] = {}; // This will be as: in[name] = { value, isNew }
    }

    if (inState.in[name].value == undefined) {
        result = defaultValue;
    } else {
        result = inState.in[name].value;
    }
    return (result);
  }
  setInput(nodeData, name, value) {
    // Get current input status
    let inState = this.get(nodeData, 'inState', {});

    // Crete in object and input state
    if (!inState.in) {
      inState.in = {};
    }
    if (!inState.in[name]) {
      inState.in[name] = {};
    }
    // Update input state
    inState.in[name].value = value;
    inState.in[name].isNew = true;
  }
  getOutput( nodeData, name, defaultValue ) {
    let result = defaultValue;

    // Get current input status
    let inState = this.get(nodeData, 'inState', {});

    // Crete in object and input state
    if ( inState.out ) {
      const v = inState.out[name];
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
    if (nodeData.in) {
      for (const inputData of nodeData.out) {
        if (inputData.portId == InName) {

          // Get output link from name port
          const outLinkDataList = graphData.me.getLinkListFanOutByNodeKey(this.modelId, nodeData.key, inName);

          if (outLinkDataList.length) {
            for (const outData of outLinkDataList) {
              if ((outData.to == nodeData.key) &&
                (outData.fromPort == inName)) {
                return (true);
              }
            }
          }
        }
      }
    }
    return (false);
  }
  getInputLinkDataList(nodeData, name) {
    let result = null;
    // Check if name exist
    if (nodeData.in) {
      for (const inputData of nodeData.in) {
        if (inputData.portId == name) {

          // Get input link from name port
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
    if (nodeData.out) {
      for (const outputData of nodeData.out) {
        if (outputData.portId == name) {

          // Get output link from name port
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
    this.engineIsRun = false;
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
      console.log('SEL: ', nodeData.label, key);
    }
  }
  _setOutput( inState, name, value ) {
    // Crete in object and input state
    if (!inState.out) {
      inState.out = {};
    }
    if (!inState.out[name]) {
      inState.out[name] = {};
    }
    // Update input state
    inState.out[name].value = value;
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
        const outNodeData = getNodeData(outNodeKey);

        // Execute target component for its input
        const inName = outLinkData.toPort;
        this._fireInput(outNodeData, inName, value);
      }
    }
  }
  _fireInput(nodeData, name, value) {
    // Select current node
    this._selectNode(nodeData);

    const inState = this._updateInput(nodeData, name, value);

    this._fireEvent(nodeData, name, value);

    if (inState.isCompute) {
      inState.didCompute = true;

      // Check type of fanout component
      this._fireEvent(nodeData, 'onCompute');
    }
  }
  _fireEvent(nodeData, name, value) {
    // const doEval = function( nodeData, name, value ) {
    //   eval(_nodeData_.fileContent);
    // }
    if (nodeData.onCompute) {
      window[nodeData.onCompute](nodeData, name, value);
    } else if (nodeData.fileContent && (nodeData.fileType == 'text/javascript')) {
      //eval( nodeData.fileContent );
      DataFlowEngine_doExecuteNode( nodeData, name, value );
      // const nodeBody = nodeData.fileContent;
      // const nodeFunction = Function( 'nodeData', 'name', 'value', nodeBody );
      // nodeFunction( nodeData, name, value );
    } else if( nodeData.fileURL.startsWith( 'graph://' ) &&
               ( nodeData.fileType == 'text/javascript' ) ) {
      loadNodeContent( nodeData, (source)=> DataFlowEngine_doExecuteGraphNode( nodeData, name, value, source ) );
    } 
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
    let computeBarrier = this.me.getProperty(this.modelId, nodeData, 'computeBarrier', null);
    if (computeBarrier) {
      if (computeBarrier.trim() == '*') {
        computeBarrier = this.getInputNameList(nodeData);
      } else {
        computeBarrier = computeBarrier.split(',').map(item => item.trim(item));
      }
    } else {
      computeBarrier = null;
    }
    return (computeBarrier);
  }
  _updateInput(nodeData, name, value, inCondition) {
    let isCompute = true;

    // Get current input status
    let inState = this.get(nodeData, 'inState', {});

    // If I just executed the doCompute => reset inputs isNew state
    if (inState.didCompute) {
      if (inState.in) {
        for (const inName in inState.in) {
          inState.in[inName].isNew = false;
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
          if (inState.in[inName]) {
            isNewInput = inState.in[inName].isNew;
          }
          if (inCondition) {
            isNewInput = inCondition(name, value, isNewInput);
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
    return (inState);
  }
  _evalValue( value ) {
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

function DataFlowEngine_doExecuteNode( nodeData, name, value ) {
  //const a = name+value;
  eval( nodeData.fileContent );
}
function DataFlowEngine_doExecuteGraphNode( nodeData, name, value, source ) {
  //const a = name+value;
  eval( source );
}