/*
  GetFieldList Data Model
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
class FieldModel {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  
  Define_Field_Name() {
    const d = this.node.data;
    const result = [
      [ d.label ],
    ];
    return( result );
  }
  Define_Field_Value() {
    const result = [];
    const d = this.node.data;
    for( const row of d.rows ) {
      const template = row.name.replaceAll( '\n', '\\n' ).replaceAll( "'", "\\'");
      result.push( [ template ] );
    }
    return( result );
  }
}
class MironTemplateModel {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  
  Define_Miron_Template_Name() {
    const result = [];
    const d =  this.node;
    if( d.rows ) {
      for( const row of d.rows ) {
        const template = row.name.replaceAll( '\n', '\\n' ).replaceAll( "'", "\\'");
        result.push( [ template ] );
      }
    }
    return( result );
  }

}
class SlotModel {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  
  Define_Slot_Pairs() {
    const result = [];
    const d =  this.node;
    if( d.rows ) {
      for( const row of d.rows ) {
        result.push( [ row.name, row.value ] );
      }
    }
    return( result );
  }
}
class MironModel {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  
  Define_Miron_Name() {
    const result = [
      [ this.node ],
    ];
    return( result );
  }
  Loop_Begin_Miron_Templates() {
    let filterList ={};
    const nodeList = this.g.getNodeListIf( null,
                            (n,d)=> d.category && 
                                    ( d.category == 'Dialog_MironCondition' ||
                                      d.category == 'Dialog_MironAction' ) &&
                                    d.mironName == this.node );
    const outputDataList = [];
    let mironTemplate = {};
    for( const node of nodeList ) {
      const fanOutData = this.g.getDataFanOutFromNode( 
                                      node,
                                      (n,d)=> d.category == 'Dialog_MironTemplate');
                                    
      if( fanOutData ) {
        mironTemplate[this.node] = fanOutData;
        break;
      }
    }
    // For mirons not explicitely defined use their name as template
    // Here we define a template for miron without template (we use the mironName)
    const fakeTemplate = ( this.node.indexOf( '{' ) != -1? '': this.node );
    const fakeTemplateData = { rows: [ { name: fakeTemplate } ] };
    const mironTemplateData = ( mironTemplate[this.node]?
                                mironTemplate[this.node]:
                                fakeTemplateData );
    outputDataList.push(mironTemplateData);
  
    
    return( this.g.getLoopObjListFromArray( outputDataList, MironTemplateModel ));
  }
  Loop_Begin_Data_Slots() {
    let filterList ={};
    const nodeList = this.g.getNodeListIf( null,
                            (n,d)=> d.category && 
                                    ( d.category == 'Dialog_MironCondition' ||
                                      d.category == 'Dialog_MironAction' ) &&
                                    d.mironName == this.node );
    const outputDataList = [];
    let mironDataSlot = {};
    for( const node of nodeList ) {
      const fanOutData = this.g.getDataFanOutFromNode( 
                                    node,
                                    (n,d)=> d.category == 'Dialog_DataSlot');
                                    
      if( fanOutData ) {
        mironDataSlot[this.node] = fanOutData;
        break;
      }
    }
    if( mironDataSlot[this.node] ) {
      outputDataList.push(mironDataSlot[this.node]);
    }
    return( this.g.getLoopObjListFromArray( outputDataList, SlotModel ));
  }
  Loop_Begin_Slots() {
    let filterList ={};
    const nodeList = this.g.getNodeListIf( null,
                            (n,d)=> d.category && 
                                    ( d.category == 'Dialog_MironCondition' ||
                                      d.category == 'Dialog_MironAction' ) &&
                                    d.mironName == this.node );
    const outputDataList = [];
    let mironSlot = {};
    for( const node of nodeList ) {
      const fanOutData = this.g.getDataFanOutFromNode( 
                                      node,
                                      (n,d)=> d.category == 'Dialog_Slot');
                                    
      if( fanOutData ) {
        mironSlot[this.node] = fanOutData;
        break;
      }
    }
    if( mironSlot[this.node] ) {
      outputDataList.push(mironSlot[this.node]);
    }
    
    return( this.g.getLoopObjListFromArray( outputDataList, SlotModel ));
  }
}
class ModalityModel {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }

  Define_Modality_Name() {
    const result = [
      [ this.node ],
    ];
    return( result );
  }
  Loop_Begin_Mirons() {
    let filterList = {};
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
    const nodeList = Object.keys(filterList); // list of mironName
    
    return( this.g.getLoopObjListFromArray( nodeList, MironModel ));
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
  Loop_Begin_Modalities() {
    let filterList ={};
    const dataList = this.g.getDataListIf( this.node,
                            (n,d)=> d.category && 
                                    ( d.category == 'Dialog_MironCondition' ||
                                      d.category == 'Dialog_MironAction' ||
                                      d.category == 'Dialog_WMAction' ));
    for( const data of dataList ) {
      if( data.category == 'Dialog_WMAction' && data.mironName.startsWith('perform_')) {
        filterList['canDo'] = 1;
      } else if( data.type.includes( 'inner' ) && data.modality != 'internal' ) {
        const modality = 'internal'+data.modality[0].toUpperCase()+data.modality.substring( 1 );
         filterList[modality] = 1;
      } else {
        filterList[data.modality] = 1;
      }
    }
    const nodeList = Object.keys(filterList); // list of modalities
    
    return( this.g.getLoopObjListFromArray( nodeList, ModalityModel ));
  }
}

module.exports = RootModel;