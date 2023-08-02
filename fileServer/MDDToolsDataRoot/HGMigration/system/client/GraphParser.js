/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Model Parser (temporary usage, replaced by ModelExplorer)
Date: 10.07.2020
=============================================================================
*/

class GraphParser {
  constructor( g ) {
    this.g = g;
  }
  /* TODO: we have a small problem:
     if we execute the following code:

      n = m.graphParser.getNodeIf();
      n1 = m.graphParser.getDataIf( n )

    We get the following error:

    GraphParser.js:88 Uncaught TypeError: it.reset is not a function
    at GraphParser.getDataIf (GraphParser.js:88)
    at <anonymous>:1:20

    This is because the output of the first function is not
    an iterator, instead, it is an array.
    Therefore we can't compose results. This is not nice.
    We should make sure that on of this case works:
    - every result must be an iterator
    - or we transform all in array and we only loop on arrays
    - or we handle both iterators and array
  */
  getRootModel() {
    return( this.g.diagram.nodes );
  }
  getDataList( nodeList ) {
    let result = [];
    const it = ( nodeList? nodeList: this.g.diagram.nodes );
    it.reset();
    while ( it.next() ) {
      const n = it.value;
      const d = it.value.data;
      result.push( d );
    }
    return( result );
  }
  getNodeList( nodeList ) {
    let result = [];
    const it = ( nodeList? nodeList: this.g.diagram.nodes );
    it.reset();
    while ( it.next() ) {
      const n = it.value;
      result.push( n );
    }
    return( result );
  }
  getNodeListIf( nodeList, condition ) {
    let result = [];
    const it = ( nodeList? nodeList: this.g.diagram.nodes );
    it.reset();
    while ( it.next() ) {
      const n = it.value;
      const d = it.value.data;
      if( !condition ||
          condition( n, d ) ) {
        result.push( n );
      }
    }
    return( result );
  }
  getDataListIf( nodeList, condition ) {
    let result = [];
    const it = ( nodeList? nodeList: this.g.diagram.nodes );
    it.reset();
    while ( it.next() ) {
      const n = it.value;
      const d = it.value.data;
      if( !condition ||
          condition( n, d ) ) {
        result.push( d );
      }
    }
    return( result );
  }
  getNodeIf( nodeList, condition, index ) {
    let result = null;
    let resultList = [];
    const it = ( nodeList? nodeList: this.g.diagram.nodes );
    it.reset();
    while ( it.next() ) {
      const n = it.value;
      const d = it.value.data;
      if( !condition ||
          condition( n, d ) ) {
        if( index == undefined ) {
          result = n;
          break;
        } else {
          resultList.push( n );
        }
      }
    }
    if( index != undefined ) {
      result = resultList[( index < resultList.length? index: 0 )];
    }
    return( result );
  }
  getDataIf( nodeList, condition, index ) {
    let result = null;
    let resultList = [];
    const it = ( nodeList? nodeList: this.g.diagram.nodes );
    it.reset();
    while ( it.next() ) {
      const n = it.value;
      const d = it.value.data;
      if( !condition ||
          condition( n, d ) ) {
        if( index == undefined ) {
          result = d;
          break;
        } else {
          resultList.push( d );
        }
      }
    }
    if( index != undefined ) {
      result = resultList[( index < resultList.length? index: 0 )];
    }
    return( result );
  }
  getCleanData( data ) {
    if( data ) {
      if( Array.isArray( data ) && data[0] ) {
        return( g.filterObjectData( data[0] ) );
      } else {
        return( g.filterObjectData( data ) );
      }
    } else {
      return( {} );
    }
  }
  getCleanDataList( dataList ) {
    let result = [];
    if( dataList ) {
      for( const d of dataList ) {
        result.push( g.filterObjectData( d ) );
      }
    } else {
      const it = this.g.diagram.nodes;
      it.reset();
      while ( it.next() ) {
        const n = it.value;
        const d = it.value.data;
        result.push( g.filterObjectData( d ) );
      }
    }
    return( result );
  }
  getDataFanOutFromNode( node, condition ) {
    const fanOutNodes = node.findNodesOutOf();
    const d = this.getDataIf( fanOutNodes.iterator, condition );
    return( d );
  }
  getDataListFanOutFromNode( node, condition ) {
    let result = [];
    const fanOutNodes = node.findNodesOutOf();
    while( fanOutNodes.next() ) {
      const n = fanOutNodes.value;
      const d = n.data;
      if( condition ) {
        if( condition( n, d ) ) {
          result.push( d );
        }
      } else {
        result.push( d );
      }
    }
    return( result );
  }
  getNodeFanOutFromNode( node, condition ) {
    const fanOutNodes = node.findNodesOutOf();
    const n = this.getNodeIf( fanOutNodes.iterator, condition );
    return( n );
  }
  getNodeListFanOutFromNode( node, condition ) {
    let result = [];
    const fanOutNodes = node.findNodesOutOf();
    while( fanOutNodes.next() ) {
      const n = fanOutNodes.value;
      const d = n.data;
      if( condition ) {
        if( condition( n, d ) ) {
          result.push( n );
        }
      } else {
        result.push( n );
      }
    }
    return( result );
  }
  getDataFanInFromNode( node, condition ) {
    const fanInNodes = node.findNodesInto();
    const d = this.getDataIf( fanInNodes.iterator, condition );
    return( d );
  }
  getDataListFanInFromNode( node, condition ) {
    let result = [];
    const fanInNodes = node.findNodesInto();
    while( fanInNodes.next() ) {
      const n = fanInNodes.value;
      const d = n.data;
      if( condition ) {
        if( condition( n, d ) ) {
          result.push( d );
        }
      } else {
        result.push( d );
      }
    }
    return( result );
  }
  getNodeFanInFromNode( node, condition ) {
    const fanInNodes = node.findNodesInto();
    const n = this.getNodeIf( fanInNodes.iterator, condition );
    return( n );
  }
  getNodeListFanInFromNode( node, condition ) {
    let result = [];
    const fanInNodes = node.findNodesInto();
    while( fanInNodes.next() ) {
      const n = fanInNodes.value;
      const d = n.data;
      if( condition ) {
        if( condition( n, d ) ) {
          result.push( n );
        }
      } else {
        result.push( n );
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
}