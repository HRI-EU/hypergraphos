/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: CodeFlow Engine
Date: 10.07.2020
=============================================================================
*/

function CodeFlowEngine_startGeneration( nodeData ) {
  // Get main graph editor
  //const g = m.e.getEditor( config.htmlDiv.graphDiv );
  const g = getMainGraph();
  // Get current graph model
  const model = g.getJSONModel();
  const modelId = 'main';

  // Instantiate Model Explorer
  const me = new ModelExplorer();
  me.setJSONModel( modelId, model );

  // Cache of all data generated or stored in the model
  const dataCache = {
    //'Header.body': ['Line1', 'Line2', ...],
    //'Style.url': ['http://styleServer.come/style.css'],
    // Missing entry => generate and add to cache
    // Then return the entry content
  };

  /************************
   * Setup functions
   ************************/
  // Detect all active features
  var activeFeature = new Set();
  const featureList = me.getNodeListByFieldNameList( 'main', 'category', ['CodeFlow_Feature'] );
  for( const feature of featureList ) {
    if( feature.buttons_[0].checked ) {
      // We get here all enabled groups (green titla backgound)
      const groupData = me.getNodeByFieldName( 'main', 'label', feature.label, (d)=> d.isGroup == true );
      if( groupData ) {
        activeFeature.add( groupData.key );
      }
    }
  }
  // Load all libraries for code generation
  const libraryNodeList = me.getNodeListByFieldNameList( 'main', 'category', ['CodeFlow_Library'], filterOutDisabledNodes );
  let libraryNameList = new Set( ['javascript' ] );
  for( const libraryNode of libraryNodeList ) {
    // Add the library to the available libraries
    libraryNameList.add( libraryNode.label );
    // If library has JavaScript code, we load it
    if( libraryNode.fileContent ) {
      eval( libraryNode.fileContent );
    }
  }
  // /************************
  //  * Property caching functions
  //  ************************/
  // // Cache all name/value pairs from CodeFlow_Param nodes
  // const paramNodeList = me.getNodeListByFieldNameList( 'main', 'category', ['CodeFlow_Param', 'Hierarchy_GraphInfo'], filterOutDisabledNodes );
  // for( const paramNode of paramNodeList ) {
  //   if( nodeData.props_ ) {
  //     for( const row of paramNode.props_ ) {
  //       const value = getValueOfRef( row.value );
  //     }
  //   }
  // }

  /************************
   * Start generation
   ************************/
  // Detect starting nodes for code generation
  const categoryList = ['Hierarchy_CodeInGraph','Hierarchy_CodeInFile'];
  const startNodeList = me.getNodeListByFieldNameList( 'main', 'category', categoryList );
  for( const startNode of startNodeList ) {
    generateStartNode( startNode );
  }
  //console.log( dataCache );

  /************************
   * Utility functions
   ************************/
  // Filter nodes in disabled features as condition for "me" functions
  function filterOutDisabledNodes(d) {
    return( !d.isGroup && ( !d.group || activeFeature.has( d.group ) ) ); 
  }
  function isNumber( v ) {
    return( parseInt(v).toString() === v.toString() );
  }
  function getArrayOf( v ) {
    if( v instanceof String ) {
      return( v.split( '\n' ) );
    } else if( Array.isArray( v ) ) {
      return( v );
    } else {
      return( [v] );
    }
  }
  function getId( nodeData, property ) {
    //return( ( nodeData.label? nodeData.label: nodeData.key ) + ( property? '.'+ property: '' ) );
    return( nodeData.key+( property? '.'+ property: '' ) );
  }
  function parseInputPortName( portName ) {
    let value = '';
    let [name, reference] = portName.split( '@' );
    if( name.endsWith( '\\' ) ) {
      // Case of refValue containing a \@ to avoid interpretation as reference
      // Example: emailServer: \@gmail.com
      // Example: email: antonello\@gmail.com
      // Remove the '\'
      name = name.substing( name.length-1 );
      value = getArrayOf( name+'@'+reference );
      reference = '';
      name = '';
    }
    if( reference == undefined ) {
      reference = '';
    }
    return({ name, reference, value });
  }
  /************************
   * DataCache functions
   ************************/
  function getCacheValue( id, onDone ) {
    let isAsynchCase = false;
    let value = [''];
    const dValue = dataCache[id];
    if( dValue ) {
      // Case of ref being defined in the dataCache
      value = dValue;
    } else {
      // Case of ref being not defined in the dataCache
      // Split the reference into Name.property
      const [name, property] = id.split( '.' );
      if( name && property ) {
        if( libraryNameList.has( name ) ) {
          // Case of a javascript function 
          eval( `value = getArrayOf( ${property} )` );
        } else {
          // Case of recursion
          value = getValueOfNode( name, property );
          setCacheValue( id, value );
        }
      } else if( name ) {
        isAsynchCase = true;
        //value = getValueOfNode( name );
        getValueOfNode( name, onDone );
      } else {
        value = [`Error: could not resolve "${id}"`];
      }
    }
    //return( value );
    if( !isAsynchCase && onDone ) {
      onDone( value );
    }
  }
  function setCacheValue( id, value ) {
    if( !dataCache.hasOwnProperty( id ) ) {
      dataCache[id] = value;
    }
  }
  /************************
   * Generation functions
   ************************/
  function getFanInNodeValueList( nodeData, portName, onDone ) {
    let valueList = [];
    // Get node from fan in
    const linkList = me.getLinkListFanInByNodeKey( 'main', nodeData.key, portName );
    const linkListLen = ( linkList? linkList.length: 0 );
    if( linkListLen == 0 ) {
      // Provide {} as empty link this is necessary to get
      // an empty value in case the input is not connected
      // or connected to a disable node
      //const value = getValueOfRef( portName, {} );
      getValueOfRef( portName, {}, (value)=> {
        valueList.push( value );

        if( onDone ) onDone( valueList );
      });
    } else {
      for( let i = 0; i < linkListLen; ++i ) {
        const linkData = linkList[i];
        //const refValue = linkData.toPortName;
        const refValue = linkData.fromPortName;
        //const value = getValueOfRef( refValue, linkData );
        getValueOfRef( refValue, linkData, (value)=> {
          if( value && value.length > 0 ) {
            valueList.push( value );
          }
          // If we are at the end of the loop ==> call onDone
          if( ( i == linkListLen-1 ) && onDone ) {
            onDone( valueList );
          }
        });
      }
    }
    //return( valueList );
  }
  function getGenerationValueFrom( nodeData, portName, onDone ) {
    let value = [];
    
    getFanInNodeValueList( nodeData, portName, (valueList)=> {
      if( valueList && valueList.length == 1 ) {
        value = valueList[0];
      } else {
        if( !valueList || valueList.length == 0 ) {
          // Reference name is not found in the graph
          value = [];
        } else {
          // Reference name is used multiple time in the graph
          value = [`Error: Multiple source enalbled for "${nodeData.label}.${portName}"`];
        }
      }

      if( onDone ) onDone( value );
    });
    //return( value );
  }
  function generateNode( nodeData, property, onDone ) {
    let value = [''];
    let id = '';
    let isAsynchCase = false;
    
    switch( nodeData.category ) {
      case 'Hierarchy_CodeInGraph':
      case 'Hierarchy_CodeInFile':
        isAsynchCase = true;
        //value = getGenerationValueFrom( nodeData, '' );
        getGenerationValueFrom( nodeData, '', (value)=> {
          nodeData.fileContent = value.join( '\n' );
          // NOTE: then next function is async, but we don't handle 
          // the callback for now
          saveNodeContent( nodeData );
          id = getId( nodeData );
          setCacheValue( id, value );

          if( onDone ) onDone( value );
        });
        break;
      case 'CodeFlow_Message':
        isAsynchCase = true;
        //const inValue = getGenerationValueFrom( nodeData, 'in' );
        getGenerationValueFrom( nodeData, 'in', (inValue)=> {
          if( inValue.length ) {
            value = inValue;
            setNodeDataField( nodeData, 'label', value.join( '\n' ) );
          } else {
            value = [nodeData.label];
          }

          if( onDone ) onDone( value );
        });
        break;
      case 'CodeFlow_Code':
        isAsynchCase = true;
        // Data model for node code generation
        let m = {};

        // We only support nodes with:
        //  - fileContent
        //  - fileURL = graph://...
        // We don't support fileURL accessing the server
        if( nodeData.fileURL && !nodeData.fileURL.startsWith( 'graph://' ) ) {
          const label = nodeData.label;
          alert( `Error: component "${label}" with fileURL accessing the server is not supported` );
          return;
        }
        
        // Final part of the generation for CodeFlow_Code
        const finalizeCodeGeneration = ()=> {
          if( nodeData.props_ && ( nodeData.props_.length > 0 ) ) {
            let objData = {};
            for( const row of nodeData.props_ ) {
              //let pValue = getValueOfRef( row.value );
              let pValue = row.value;
              if( Array.isArray( pValue ) && ( pValue.length > 0 ) ) {
                pValue = pValue[0];
              } else {
                pValue = '';
              }
              objData[row.name] = pValue;
            }
            funcName = 'Begin_Property';
            m[funcName] = ()=> objData;
            funcName = 'Define_Property';
            m[funcName] = ()=> objData;
          }
          // Get node template
          loadNodeContent( nodeData, (templateSource)=> {
            // Get the output to be generated
            const outputName = property;
            // Create the template generator
            const tg = new TemplateGenerator( templateSource );
            const beginTag = `[# Begin ${outputName} #]`;
            const endTag = `[# End ${outputName} #]`;
            // Get output template and trim to first line indentation (true)
            const block = tg.extractNextLineBlock( true, beginTag, endTag );
            //const blockSrc = block.getTemplate();
            // Set template language
            const [format, language] = nodeData.fileType.split( '/' );
            block.setLanguage( language );
            block.setProperty( 'isKeepBlockOnNoData', true );
            // Execute code generation
            block.process( m );
            // Get output
            value = block.getOutput();
  
            if( onDone ) onDone( value );
          });
        };
        
        // Start by checking inputs
        if( nodeData.in_ ) {
          const inLen = nodeData.in_.length;
          for( let i = 0; i < inLen; ++i ) {
            const input = nodeData.in_[i];
            //const inValue = getGenerationValueFrom( nodeData, input.name );
            getGenerationValueFrom( nodeData, input.name, (inValue)=> {
              const refInfo = parseInputPortName( input.name );
              let funcName = 'Begin_'+refInfo.name.replaceAll( ' ', '_' );
              //m[funcName] = ()=> [inValue];
              // We put undefined in case the input is not connected
              m[funcName] = ()=> ( inValue.length == 0? undefined: inValue );
              funcName = 'Define_'+refInfo.name.replaceAll( ' ', '_' );
              //m[funcName] = ()=> [inValue];
              m[funcName] = ()=> ( inValue.length == 0? undefined: inValue );
              funcName = 'Insert_'+refInfo.name.replaceAll( ' ', '_' );
              m[funcName] = ()=> ( inValue.length == 0? undefined: inValue );

              if( i == inLen-1 ) {// End of the for loop
                finalizeCodeGeneration();
              }
            });
          }
        } else {
          // Finalize in case no inputs found
          finalizeCodeGeneration();
        }
        break;
      case 'CodeFlow_Operator':
        isAsynchCase = true;
        let inOutValue = {};

        // Final part of the generation for CodeFlow_Operator
        const finalizeOperatorGeneration = ()=> {
          if( nodeData.props_ ) {
            for( const row of nodeData.props_ ) {
              //const pValue = getValueOfRef( row.value );
              const pValue = row.value;
              inOutValue[row.name] = pValue;
            }
          }
          if( nodeData.fileContent ) {
            /**
             * NOTE: CodeFlow_Operator components can call 2 functions
             *         value = getInput( '<inputName>' )   // returns input value
             *         setOutput( '<outputName>', value )  // sets output value
             */
            try {
              const getInput = (name)=>{ return( inOutValue[name] ); };
              const setOutput = (name, value)=>{ inOutValue[name] = value; };
              eval( nodeData.fileContent );
            } catch( e ) {
              isAsynchCase = true; //---> Avoid to continue generation
              alert( `Error in operator "${nodeData.lable}": ${e.message}\n${e.stack}`, false );
            }
            if( nodeData.out_ ) {
              for( const output of nodeData.out_ ) {
                let oValue = inOutValue[output.name];
                if( oValue ) {
                  oValue = oValue.split( '\n' );
                }
                if( property == output.name ) {
                  value = oValue;
                }
              }
            }
          }
        };

        if( nodeData.in_ ) {
          const inLen = nodeData.in_.length;
          for( let i = 0; i < inLen; ++i ) {
            const input = nodeData.in_[i];
            //const inValue = getGenerationValueFrom( nodeData, input.name );
            getGenerationValueFrom( nodeData, input.name, (inValue)=> {
              const refInfo = parseInputPortName( input.name );
              inOutValue[refInfo.name] = inValue.join( '\n' );

              if( i == inLen-1 ) {
                finalizeOperatorGeneration
              }
            });
          }
        } else {
          // Finalize in case no inputs found
          finalizeOperatorGeneration();
        }
        break;
      case 'CodeFlow_Merge':
        isAsynchCase = true;
        value = [];
        if( nodeData.in_ ) {
          const inLen = nodeData.in_.length;
          for( let i = 0; i < inLen; ++i ) {
            const input = nodeData.in_[i];
            //const inValue = getGenerationValueFrom( nodeData, input.name );
            getGenerationValueFrom( nodeData, input.name, (inValue)=> {
              value = value.concat( inValue );

              if( ( i == inLen-1 ) && onDone ) {
                onDone( value );
              }
            });
          }
        }
        break;
      case 'CodeFlow_Param':
        if( nodeData.props_ ) {
          isAsynchCase = true;
          const propsLen = nodeData.props_.length;
          for( let i = 0; i < propsLen; ++i ) {
            const row = nodeData.props_[i];
            //const pValue = getValueOfRef( row.value );
            getValueOfRef( row.value, (pValue)=> {
              if( row.name == property ) {
                value = pValue;
              }

              if( ( i == propsLen-1 ) && onDone ) {
                onDone( value );
              }
            });
          }
        }
        break;
    }
    //return( value );
    if( !isAsynchCase && onDone ) {
      onDone( value );
    } 
  }
  function getValueOfNode( name, property, onDone ) {
    let value = [''];
    let nodeData = null;
    
    if( isNumber( name ) ) {
      // If name is a node key ==> get the node by key
      nodeData = me.getNodeByFieldName( 'main', 'key', [name], filterOutDisabledNodes );
    } else {
      // Find component with label = name
      const nodeDataList = me.getNodeListByFieldNameList( 'main', 'label', [name], filterOutDisabledNodes );
      if( nodeDataList && nodeDataList.length == 1 ) {
        // A unique node is found with this name
        nodeData = nodeDataList[0];
      } else {
        if( !nodeDataList || nodeDataList.length == 0 ) {
          // Reference name is not found in the graph
          value = [`Error: Reference name "${name}" is not a node in the graph`];
        } else {
          // Reference name is used multiple time in the graph
          value = [`Error: Reference name "${name}" is a label for multiple nodes in the graph`];
        }
      }
    }
    // If we found a node
    if( nodeData ) {
      //value = generateNode( nodeData, property );
      generateNode( nodeData, property, onDone );
    } else if( onDone ) {
      onDone( value );
    }
    //return( value );
  }
  function getValueOfRef( refValue, linkData, onDone ) {
    let isAsynchCase = false;
    let value = [];
    
    const refInfo = parseInputPortName( refValue );
    if( ( refInfo.reference == '' ) && 
        ( refInfo.name == '' ) && 
        ( refInfo.value ) ) {
      // Case of refValue containing a \@ to avoid interpretation as reference
      // Example: emailServer: \@gmail.com
      // Example: email: antonello\@gmail.com
      // Remove the '\'
      value = refInfo.value;
    } else if( refInfo.reference ) {
      // Case of refValue being a reference
      // Remove the '@'
      const id = refInfo.reference;
      isAsynchCase = true;
      //value = getCacheValue( id );
      getCacheValue( id, onDone );
    } else {
      // Case of refValue being a value like string, array or number
      if( linkData ) {
        // Get all nodes connected to the nodeData
        const fromKey = linkData.from;
        const fromPortName = linkData.fromPortName;
        const nodeData = me.getNodeByFieldName( 'main', 'key', fromKey, filterOutDisabledNodes );
        if( nodeData ) {
          const id = getId( nodeData, fromPortName );
          isAsynchCase = true;
          //value = getCacheValue( id );
          getCacheValue( id, onDone );
        } else {
          // We do nothing, because the node is not in an enabled feature
        }
      } else {
        value = getArrayOf( refValue );
      }
    }
    //return( value );
    if( !isAsynchCase && onDone ) {
      onDone( value );
    }
  }
  function generateStartNode( nodeData ) {
    generateNode( nodeData );
  }
}