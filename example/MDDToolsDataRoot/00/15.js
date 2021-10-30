/*
   GetMapList Data Model
*/

function getTableRowValue( rows, name ) {
  let result = '';
  if( rows ) {
    for( const item of rows ) {
      if( item.name == name) {
        result = item.value;
        break;
      }
    }
  }
  return( result );
}
class ModalityModel {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  
  Begin_Load_Miron_Name() {
    let filterList ={};
    const dataList = this.g.getDataListIf( null,
                            (n,d)=> d.category && 
                                    ( d.category == 'Dialog_MironCondition' ||
                                      d.category == 'Dialog_MironAction' ||
                                      d.category == 'Dialog_WMCondition' ||
                                      d.category == 'Dialog_WMAction' ) );
    const nodeLower = this.node.toLowerCase();
    for( const data of dataList ) {
      // Case of inner actions
      if( this.node != 'internal' && 
         this.node.startsWith( 'internal' ) && nodeLower.endsWith( data.modality ) &&
          data.type.includes( 'inner' ) && data.modality != 'internal' &&
          data.category != 'Dialog_WMAction' ) {
        filterList[data.mironName] = 1;
      // Case of canDo
      } else if ( this.node == 'canDo' && data.category == 'Dialog_WMAction' && data.mironName.startsWith('perform_') ) {
        filterList[data.mironName] = 1;
      } else if ( this.node == 'wm' && data.category == 'Dialog_WMAction' && !data.mironName.startsWith('perform_') ) {
        filterList[data.mironName] = 1;
      // All other cases
      } else if( data.modality == this.node && this.node != 'wm' &&
          !data.type.includes( 'inner' )) {
        filterList[data.mironName] = 1;
      // Case of internal
      } else if( this.node == 'internal' && data.modality == 'internal' ) {
        filterList[data.mironName] = 1;
      }
    }
    this.mironNameList = Object.keys(filterList); // list of mironName
  }
  Define_Modality_Name() {
    const result = [
      [ this.node ],
    ];
    return( result );
  }
  Define_Miron_ByIndex() {
    const result = [];
    for( let i = 0; i < this.mironNameList.length; ++i ) {
      const mironName = this.mironNameList[i];
      result.push( [ i+1, mironName ] );
    }
    return( result );
  }
  Define_Miron_ByName() {
    const result = [];
    for( let i = 0; i < this.mironNameList.length; ++i ) {
      const mironName = this.mironNameList[i];
      result.push( [ mironName, i+1 ] );
    }
    return( result );
  }
  Begin_Modality_Info() {
    const result = [
      [ this.mironNameList.length ], 
      [ ( (this.node == 'internal' || this.node == 'wm')? false: true ) ]
    ];
    return( result );
  }
}
class RootModel {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  
  Define_FileName() {
    let result = [];
    const d = this.g.getDataIf( this.node, 
                                (n,d)=> ( d.category == 'Property_GraphInfo') &&
                                        ( d.label == 'Graph Info' ) );
    if( d ) {
      let path = getTableRowValue( d.rows, 'Path' );
      let name = getTableRowValue( d.rows, 'Name' );
      const fileName =  path+name+'.json';
      result.push( [ fileName ] );
    }
    return( result );
  }
  Begin_Header_Info() {
    let result = [];
    const d = this.g.getDataIf( this.node, 
                                (n,d)=> ( d.category == 'Property_GraphInfo') &&
                                        ( d.label == 'Graph Info' ) );
    if( d ) {
      let version = getTableRowValue( d.rows, 'Version' );
      let date = getTableRowValue( d.rows, 'Date' );
      result.push( [ version ] );
      result.push( [ date ] );
    }
    return( result );
  }
  Loop_Begin_Fields() {
    return( this.g.getLoopObjList(
                    this.node,
                    'getNodeListIf',
                    (n,d)=> d.category == 'Dialog_Grammar',
                    FieldModel
    ));
  }
  Define_Avatar() {
    let result = [];
    const d = this.g.getDataIf( this.node, 
                                (n,d)=> ( d.category == 'Property_ListKV') &&
                                        ( d.label == 'Dialog Info' ) );
    if( d ) {
      let name = getTableRowValue( d.rows, 'Name' );
      result.push( [ name ] );
    }
    return( result );
  }
  Loop_Begin_Modalities() {
    let filterList ={};
    const dataList = this.g.getDataListIf( this.node,
                            (n,d)=> d.category && 
                                    ( d.category == 'Dialog_MironCondition' ||
                                      d.category == 'Dialog_MironAction' ||
                                      d.category == 'Dialog_WMCondition' ||
                                      d.category == 'Dialog_WMAction' ));
    for( const data of dataList ) {
      if( data.type.includes( 'inner' ) && data.modality != 'internal' ) {
        const modality = 'internal'+data.modality[0].toUpperCase()+data.modality.substring( 1 );
        filterList[modality] = 1;
      } else {
        filterList[data.modality] = 1;
      }
    }
    const nodeList = Object.keys(filterList); // list of modalities
    
    return( this.g.getLoopObjListFromArray( nodeList, ModalityModel ));
  }
  Begin_Load_CanDo() {
    let filterList ={};
    const dataList = this.g.getDataListIf( null,
                            (n,d)=> d.category && 
                                    ( d.category == 'Dialog_WMCondition' ||
                                      d.category == 'Dialog_WMAction' ) );
    for( const data of dataList ) {
      if( data.mironName.startsWith( 'perform_') ) {
        filterList[data.mironName] = 1;
      }
    }
    this.canDoMironNameList = Object.keys(filterList); // list of mironName
  }
  Define_CanDo_ByIndex() {
    let result = [];
    for( let i = 0; i < this.canDoMironNameList.length; ++i ) {
      const mironName = this.canDoMironNameList[i];
      result.push( [ i+1, mironName ] );
    }
    return( result );
  }
  Define_CanDo_ByName() {
    let result = [];
    for( let i = 0; i < this.canDoMironNameList.length; ++i ) {
      const mironName = this.canDoMironNameList[i];
      result.push( [ mironName, i+1 ] );
    }
    return( result );
  }
  Define_CanDo_Info() {
    const result = [
      [ this.canDoMironNameList.length ], 
    ];
    return( result );
  }
  Begin_Load_Slot() {
    let filterList ={};
    const dataList = this.g.getDataListIf( null,
                            (n,d)=> d.category && 
                                    ( d.category == 'Dialog_Slot' ||
                                      d.category == 'Dialog_SlotCondition' ) );
    for( const data of dataList ) {
      if( data.rows ) {
        for( const row of data.rows ) {
          filterList[row.name] = 1;
        }
      } else {
        filterList[data.mironName] = 1;
      }
    }
    this.slotMironNameList = Object.keys(filterList); // list of mironName
  }
  Define_Slot_ByIndex() {
    let result = [];
    for( let i = 0; i < this.slotMironNameList.length; ++i ) {
      const mironName = this.slotMironNameList[i];
      result.push( [ i+1, mironName ] );
    }
    return( result );
  }
  Define_Slot_ByName() {
    let result = [];
    for( let i = 0; i < this.slotMironNameList.length; ++i ) {
      const mironName = this.slotMironNameList[i];
      result.push( [ mironName, i+1 ] );
    }
    return( result );
  }
  Define_Slot_Info() {
    const result = [
      [ this.slotMironNameList.length ], 
    ];
    return( result );
  }
  Begin_Load_DataSlot() {
    let filterList ={};
    const dataList = this.g.getDataListIf( null,
                            (n,d)=> d.category && 
                                    d.category == 'Dialog_DataSlot' );
    for( const data of dataList ) {
      for( const row of data.rows ) {
        filterList[row.name] = 1;
      }
    }
    this.dataSlotMironNameList = Object.keys(filterList); // list of mironName
  }
  Define_DataSlot_ByIndex() {
    let result = [];
    for( let i = 0; i < this.dataSlotMironNameList.length; ++i ) {
      const mironName = this.dataSlotMironNameList[i];
      result.push( [ i+1, mironName ] );
    }
    return( result );
  }
  Define_DataSlot_ByName() {
    let result = [];
    for( let i = 0; i < this.dataSlotMironNameList.length; ++i ) {
      const mironName = this.dataSlotMironNameList[i];
      result.push( [ mironName, i+1 ] );
    }
    return( result );
  }
  Define_DataSlot_Info() {
    const result = [
      [ this.dataSlotMironNameList.length ], 
    ];
    return( result );
  }
  Begin_Load_Rule() {
    let filterList ={};
    const dataList = this.g.getDataListIf( null,
                            (n,d)=> d.category && 
                                    d.category == 'Dialog_Rule' );
    for( const data of dataList ) {
      filterList['rule'+data.key] = data.key;
    }
    this.ruleMironInfo = filterList; // list of mironName
  }
  Define_Rule_ByIndex() {
    let result = [];
    const ruleNameList = Object.keys( this.ruleMironInfo );
    for( const mironName of ruleNameList ) {
      const mironIndex = this.ruleMironInfo[mironName];
      result.push( [ mironIndex, mironName ] );
    }
    return( result );
  }
  Define_Rule_ByName() {
    let result = [];
    const ruleNameList = Object.keys( this.ruleMironInfo );
    for( const mironName of ruleNameList ) {
      const mironIndex = this.ruleMironInfo[mironName];
      result.push( [ mironName, mironIndex ] );
    }
    return( result );
  }
  Define_Rule_Info() {
    const ruleMironNameList = Object.keys( this.ruleMironInfo );
    const result = [
      [ ruleMironNameList.length ], 
    ];
    return( result );
  }
}

module.exports = RootModel;