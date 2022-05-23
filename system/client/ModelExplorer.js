/*
=============================================================================
Licensed Materials - Property of LorinWare Prod.
(C) Copyright Christophe LORIN 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Christophe LORIN.
=============================================================================
Module: MDDTools Model Explorer for Model Navigation
Date: 10.07.2020
=============================================================================
*/

/*
  // Quick test script:
  d = m.e.getEditor('diagram');
  j = d.getJSONModel();
  me = new ModelExplorer()
  me.setJSONModel( 'test', j );
*/

class ModelExplorer {
  constructor( indexNodeFieldNameList, indedLinkFieldNameList ) {
    this.model = {};

    const nodeIndexList = [ 'key', 'category', 'label', 'text' ];
    const linkIndexList = [ 'key', 'category', 'from', 'to', 'fromPort', 'toPort' ];
    
    this.indexNodeFieldNameList = nodeIndexList; //indexNodeFieldNameList;
    this.indedLinkFieldNameList = linkIndexList; //indedLinkFieldNameList;
  }
  setJSONModel( id, jsonModel ) {
    this.model[id] = {
      jsonModel,
      objModel: null,
      indexModel: null,
    }
    this._createModelIndex( id );
  }
  getNodeIf( id, condition, index ) {
    id = this._getId( id );
    let result = [];
    let nodeList = this.model[id].objModel.nodeDataArray;

    if( !id ) {
      return( result );
    }

    for( const nodeData of nodeList ) {
      if( condition( nodeData ) ) {
        if( index == undefined ) {
          result = nodeData;
          break;
        } else {
          result.push( nodeData );
        }
      }
    }
    if( index != undefined ) {
      result = ( result[index]? result[index]: result[0] );
    }
    return( result );
  }
  getNodeListIf( id, condition ) {
    id = this._getId( id );
    let result = [];
    let nodeList = this.model[id].objModel.nodeDataArray;

    if( !id ) {
      return( result );
    }

    for( const nodeData of nodeList ) {
      if( condition( nodeData ) ) {
        result.push( nodeData );
      }
    }
    return( result );
  }
  getNodeListFanInByNodeKey( id, key, toPort, condition ) {
    id = this._getId( id );
    let result = [];

    if( !id ) {
      return( result );
    }

    const subject = this.model[id].indexModel.nodeKeyFanIn;
    if( subject ) {
      let nodeKeyList = [];
      if( toPort ) {
        const linkList = this.getLinkListFanInByNodeKey( id, key );
        for( const linkDataV of linkList ) {
          //if( linkDataV && linkDataV[0] && ( linkDataV[0].toPort == toPort ) ) {
          if( linkDataV && ( linkDataV.toPort == toPort ) ) {
            nodeKeyList.push( linkDataV.from );
          }
        }
      } else {
        nodeKeyList = subject[key];
      }
      // Retrieve all nodeData from nodeKey
      for( const nodeKey of nodeKeyList ) {
        const subject1 = this.model[id].indexModel.node.key;
        if( subject1 ) {
          if( subject1[nodeKey] && ( subject1[nodeKey].length > 0 ) ) { 
            const nodaData = subject1[nodeKey][0];
            if( condition ) {
              if( !condition( nodeData ) ) {
                continue;
              }
            }
            result.push( nodaData );
          }
        }
      }
    } else {
      // Search in the json model without index
    }
    return( result );
  }
  getNodeListFanOutByNodeKey( id, key, fromPort ) {
    id = this._getId( id );
    let result = [];

    if( !id ) {
      return( result );
    }

    const subject = this.model[id].indexModel.nodeKeyFanOut;
    if( subject ) {
      let nodeKeyList = [];
      if( fromPort ) {
        const linkList = this.getLinkListFanOutByNodeKey( id, key );
        for( const linkDataV of linkList ) {
          //if( linkDataV && linkDataV[0] && ( linkDataV[0].fromPort == fromPort ) ) {
          if( linkDataV && ( linkDataV.fromPort == fromPort ) ) {
            nodeKeyList.push( linkDataV.to );
          }
        }
      } else {
        result = subject[key];
      }
      // Retrieve all nodeData from nodeKey
      for( const nodeKey of nodeKeyList ) {
        const subject1 = this.model[id].indexModel.node.key;
        if( subject1 ) {
          if( subject1[nodeKey] && ( subject1[nodeKey].length > 0 ) ) { 
            result.push( subject1[nodeKey][0] );
          }
        }
      }
    } else {
      // Search in the json model
    }
    return( result );
  }
  getNodeByFieldName( id, fieldName, fieldNameValue, condition ) {
    const result = this.getNodeListByFieldNameList( id, fieldName, [fieldNameValue], condition ) ;
    return( result[0] );
  }
  getNodeListByFieldNameList( id, fieldName, fieldNameValueList, condition ) {
    id = this._getId( id );
    let result = [];

    if( !id ) {
      return( result );
    }

    const indexModel = this.model[id].indexModel;
    for( const fieldValue of fieldNameValueList ) {
      if( indexModel.node[fieldName] ) {
        const nodeDataList = indexModel.node[fieldName][fieldValue];
        if( nodeDataList ) {
          if( condition ) {
            for( const nodeData of nodeDataList ) {
              if( condition( nodeData ) ) {
                result.push( nodeData );
              }
            }
          } else {
            result = result.concat( nodeDataList );
          }
        }
      }
    }
    return( result );
  }
  getLinkListFanInByNodeKey( id, key, toPort, condition ) {
    id = this._getId( id );
    let result = [];

    if( !id ) {
      return( result );
    }

    const subject = this.model[id].indexModel.linkKeyOfNodeKeyFanIn;
    if( subject && subject[key] ) {
      const linkKeyList = subject[key];
      const indexLinkKey = this.model[id].indexModel.link.key;
      for( const linkKey of linkKeyList ) {
        const linkDataV = indexLinkKey[linkKey];
        if( linkDataV ) {
          if( toPort != undefined || condition ) {
            for( const linkData of linkDataV ) {
              if( toPort && linkData.toPort != toPort ) {
                continue;
              }
              if( condition ) {
                if( !condition( linkData ) ) {
                  continue;
                }
              }
              result.push( linkData );
            }
          } else {
            result = result.concat( linkDataV );
          }
        }
      }
    }
    return( result );
  }
  getLinkListFanOutByNodeKey( id, key, fromPort, condition ) {
    id = this._getId( id );
    let result = [];

    if( !id ) {
      return( result );
    }

    const subject = this.model[id].indexModel.linkKeyOfNodeKeyFanOut;
    if( subject && subject[key] ) {
      const linkKeyList = subject[key];
      const indexLinkKey = this.model[id].indexModel.link.key;
      for( const linkKey of linkKeyList ) {
        const linkDataV = indexLinkKey[linkKey];
        if( linkDataV ) {
          if( fromPort != undefined || condition ) {
            for( const linkData of linkDataV ) {
              if( fromPort && linkData.fromPort != fromPort ) {
                continue;
              }
              if( condition ) {
                if( !condition( linkData ) ) {
                  continue;
                }
              }
              result.push( linkData );
            }
          } else {
            result = result.concat( linkDataV );
          }
        }
      }
    }
    return( result );
  }
  getMapValue( value, map, compare ) {
    let result = '';
    for( const item of map ) {
      if( compare ) {
        if( compare( value, item[0] ) ) {
          result = item[1];
          break;
        }
      } else if( value == item[0] ) {
        result = item[1];
        break;
      }
    }
    return( result );
  }
  getLoopObjList( node, selectorFuncName, condition, SubClass ) {
    let result = [];
    if( selectorFuncName && this[selectorFuncName] ) {
      const nodeList = this[selectorFuncName]( node, condition );
      if( nodeList ) {
        for( const nodeItem  of nodeList ) {
          let resultItem = ( SubClass? new SubClass( this, nodeItem ): nodeItem );
          result.push( resultItem );
        }
      }
    }
    return( result );
  }
  getLoopObjListFromArray( nodeList, SubClass ) {
    let result = [];
    if( nodeList ) {
      for( const nodeItem  of nodeList ) {
      let resultItem = ( SubClass? new SubClass( this, nodeItem ): nodeItem );
      result.push( resultItem );
      }
    }
    return( result );
  }
  //------------------------
  // Private Functions
  //------------------------
  _getId( id ) {
    let result = id;
    if( !id ) {
      const keys = Object.keys( this.model );
      if( keys.length > 0 ) {
        result = keys[0];
      }
    }
    return( result );
  }
  _createModelIndex( id ) {
    const modelInfo = this.model[id];
    // this.model[id] = {
    //   objModel = {...object model of JSON model...},
    //   indexModel = {
    //     node: {
    //       'key': ....... see bellow
    //       'category': .. see bellow
    //     },
    //     link: {
    //       'key': ....... see bellow
    //       'category': .. see bellow
    //     },
    //   },
    // }
    // Get Object model
    const objModel = JSON.parse( modelInfo.jsonModel );
    modelInfo.objModel = objModel;
    // Create Index structure
    modelInfo.indexModel = {
      node: {
        //'key': {
        //  '1': [ nodeData1 ],
        //  '2': [ nodeData2 ],
        //  ...
        //},
        //'category': {
        //  'DrawDSL_node1': [ nodeData4, nodeData7, ... ],
        //  'CardDSL_node2': [ nodeData4, nodeData7, ... ],
        //  ...
        //},
      },
      link: {
      //'key': {
        //  '1': [ linkData1 ],
        //  '2': [ linkData2 ],
        //  ...
        //},
        //'category': {
        //  'DrawDSL_link1': [ linkData4, linkData7, ... ],
        //  'CardDSL_link2': [ linkData4, linkData7, ... ],
        //  ...
        //},
      },
      nodeKeyFanInNodeKey: null,  // list of key of nodes in the fan-in of a nodeKey
      // n1 : [nlist]  --> n1 is node key, [nlist] are all fan-in connected node key
      // '1': [6],
      // '2': [7,8],
      // ...
      nodeKeyFanOutNodeKey: null, // list of key of nodes in the fan-out of a nodeKey
      // n1 : [nlist]  --> n1 is node key, [nlist] are all fan-out connected node key
      // '1': [6],
      // '2': [7,8],
      // ...
      nodeKeyFanInLinkKey: null,  // list of key of links in fan-in of nodeKey
      // n1 : [llist]  --> n1 is node key, [llist] are all fan-in connected link key
      // '1': [6],
      // '2': [7,8],
      // ...
      nodeKeyFanOutLinkKey: null, // list of key of links in fan-out of nodeKey
      // n1 : [llist]  --> n1 is node key, [llist] are all fan-out connected link key
      // '1': [6],
      // '2': [7,8],
      // ...
    };
    for( const nodeData of objModel.nodeDataArray ) {
      for( const fieldName of this.indexNodeFieldNameList ) {
        this._createIndexFor( modelInfo.indexModel.node, fieldName, nodeData );
      }
    }
    for( const linkData of objModel.linkDataArray ) {
      // Create list of key of links in fan-in of nodeKey
      if( !modelInfo.indexModel.linkKeyOfNodeKeyFanIn ) {
        modelInfo.indexModel.linkKeyOfNodeKeyFanIn = {};
      }
      // Create list of key of links in fan-out of nodeKey
      if( !modelInfo.indexModel.linkKeyOfNodeKeyFanOut ) {
        modelInfo.indexModel.linkKeyOfNodeKeyFanOut = {};
      }
      for( const fieldName of this.indedLinkFieldNameList ) {
        this._createIndexFor( modelInfo.indexModel.link, fieldName, linkData );
        if( fieldName == 'from' ) {
          if( !modelInfo.indexModel.nodeKeyFanOut ) {
            modelInfo.indexModel.nodeKeyFanOut = {};
          }
          const fromNodeKey = linkData.from;
          if( !modelInfo.indexModel.nodeKeyFanOut[fromNodeKey] ) {
            modelInfo.indexModel.nodeKeyFanOut[fromNodeKey] = [];
          }
          const toNodeKey = linkData.to;
          modelInfo.indexModel.nodeKeyFanOut[fromNodeKey].push( toNodeKey );

          // This link belongs to the fan-out of the node in 'from'
          if( !modelInfo.indexModel.linkKeyOfNodeKeyFanOut[fromNodeKey] ) {
            modelInfo.indexModel.linkKeyOfNodeKeyFanOut[fromNodeKey] = [];
          }
          modelInfo.indexModel.linkKeyOfNodeKeyFanOut[fromNodeKey].push( linkData.key );
        }
        if( fieldName == 'to' ) {
          if( !modelInfo.indexModel.nodeKeyFanIn ) {
            modelInfo.indexModel.nodeKeyFanIn = {};
          }
          const toNodeKey = linkData.to;
          if( !modelInfo.indexModel.nodeKeyFanIn[toNodeKey] ) {
            modelInfo.indexModel.nodeKeyFanIn[toNodeKey] = [];
          }
          const fromNodeKey = linkData.from;
          modelInfo.indexModel.nodeKeyFanIn[toNodeKey].push( fromNodeKey );

          // This link belongs to the fan-in of the node in 'from'
          if( !modelInfo.indexModel.linkKeyOfNodeKeyFanIn[toNodeKey] ) {
            modelInfo.indexModel.linkKeyOfNodeKeyFanIn[toNodeKey] = [];
          }
          modelInfo.indexModel.linkKeyOfNodeKeyFanIn[toNodeKey].push( linkData.key );
        }
      }
    }
  }
  _createIndexFor( indexModel, fieldName, nodeData ) {
    if( nodeData[fieldName] != undefined ) {
      if( !indexModel[fieldName] ) {
        indexModel[fieldName] = {};
      }
      if( !indexModel[fieldName][nodeData[fieldName]] ) {
        indexModel[fieldName][nodeData[fieldName]] = [];
      }
      indexModel[fieldName][nodeData[fieldName]].push( nodeData );
    }
  }
}