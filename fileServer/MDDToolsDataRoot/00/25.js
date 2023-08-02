/*
  GetRuleList Data Model
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
function ruleGetSrc( g ,d ) {
  const type = (d.type? d.type: 'rule' );
  const caseList = [
    [ 'recognized', 'intention' ],
    [ 'done',       'actionDone' ],
    [ 'activated',  'activatedWM' ],
    [ 'inhibited',  'inhibitedWM' ],
    [ 'rule',       'previousRule' ],
  ];
  let result = g.getMapValue( type, caseList, (v,i)=> v.indexOf( i ) != -1  );
  return( result );
}
function ruleGetSrcForSlot( g ,d ) {
  const caseList = [
    [ 'empty',      'emptySlot' ],
    [ 'filled',     'filledSlot' ],
    [ 'changed',    'changedSlot' ],
    [ 'unchanged',  'unchangedSlot' ],
  ];
  let result = g.getMapValue( d.modality, caseList, (v,i)=> v.indexOf( i ) != -1  );
  return( result );
}
function ruleGetType( g, d ) {
  let modality = '';
  if( d.modality ) {
    if( d.modality.endsWith( 'Slot' ) ) {
      modality = 'slot';
    } else {
      modality = d.modality;
    } 
  } else {
    modality = 'rule';
  }
  const type = (d.type? d.type: 'rule' );
  return( (type.indexOf('inner') != -1) && (modality != 'internal')? 
      'internal'+modality[0].toUpperCase()+modality.substring( 1 ): 
      modality );
}
function ruleGetDest( g, d ) {
  const caseList = [
    [ 'do ',       'goal' ],
    [ 'internal',  'goal' ],
    [ 'activate',  'activateWM' ],
    [ 'inhibit',   'inhibitWM' ],
    [ 'reset',     'resetWM' ],
  ];
  let result = g.getMapValue( d.type, caseList, (v,i)=> v.indexOf( i ) != -1  );
  return( result );
}
class RuleOrModel {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  Begin_OR() {
    const result = [];
    let sign = 1;
    if( this.node.data.category == 'Dialog_InhibitAnd' ) {
      sign = -1;
    }
    if( this.node.data.category == 'Dialog_And' ||
        this.node.data.category == 'Dialog_InhibitAnd' ) {
      const fi = this.g.getDataListFanInFromNode( this.node );
      const weight = sign*( fi.length == 0? 1: 1/fi.length );
      for( const d of fi ) {
        const info = this._ruleFanInGetInfo( d, weight );
        result.push( info );
      }
    } else {
      const weight = 1;
      const info = this._ruleFanInGetInfo( this.node.data, weight );
      result.push( info );
    }
    return( result );
  }
  // Helper Functions
  _ruleFanInGetInfo( d, weight ) {
    let result = [];
    if( d ) {
      let src;
      const modality = (d.modality? d.modality: '');
      if( modality.indexOf( 'Slot' ) != -1 ) {
        src = ruleGetSrcForSlot( this.g, d );
      } else {
        src = ruleGetSrc( this.g, d );
      }
      const mironName = ( d.category == 'Dialog_Rule'? 'rule'+d.key: d.mironName );
      const type = ruleGetType( this.g, d );
      const comment = ( d.category == 'Dialog_Rule'? 'is previous rule active?: rule'+d.key: d.type+': '+mironName );
      result = [ src, mironName, type, weight, comment ];
    }
    return( result );
  }
}
class RuleModel {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  Begin_Header_Rule() {
    let d = this.g.getDataFanOutFromNode( this.node, 
                    (n,d)=> d.category == 'Dialog_RuleComment' );
    const comment = ( d? d.label: '' );
    d = this.node.data;
    const result = [
      [ d.key, d.key, comment ],
      [ 'rule'+d.key ],
      [ d.key ],
    ];
    return( result );
  }
  Loop_Begin_FanIn() {
    return( this.g.getLoopObjList(
                      this.node,
                      'getNodeListFanInFromNode',
                      null,
                      RuleOrModel
    ));
  }
  Begin_FanOut() {
    const result = [];
    const fo = this.g.getDataListFanOutFromNode( this.node, 
                       (n,d)=> ( d.category != 'Dialog_RuleComment' ) && 
                               ( d.category != 'Dialog_And' ) &&
                               ( d.category != 'Dialog_InhibitAnd') &&
                               ( d.category != 'Dialog_Rule' ));
    for( const d of fo ) {
      const info = this._ruleFanOutGetInfo( d );
        result.push( info );
    }
    return( result );
  }
  // Helper Functions
  _ruleFanOutGetInfo( d ) {
    let result = [];
    if( d ) {
      const dest = ruleGetDest( this.g, d );
      const mironName = d.mironName;
      let type = ruleGetType( this.g, d );
      const weight = '1';
      const comment = d.type+': '+d.mironName;
      if( type == 'wm' && mironName.startsWith( 'perform_')) {
        type = 'canDo';
      }
      result = [ dest, mironName, type, weight, comment ];
    }
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
    // me.getNodeIf( '', (d)=> d.category == 'Hierarchy_GraphInfo' && d.label == 'Graph Info' )
    const d = this.g.getDataIf( this.node, 
                                (n,d)=> ( d.category == 'Hierarchy_GraphInfo') &&
                                        ( d.label == 'Graph Info' ) );
    if( d ) {
      let path = getTableRowValue( d.rows, 'Path' );
      let name = getTableRowValue( d.rows, 'Name' );
      const fileName =  path+name+'.json';
      result.push( [ fileName ] );
    }
    return( result );
  }
  Define_Avatar() {
    let result = [];
    //me.getNodeIf( '', (d)=> d.category == 'Property_ListKV' && d.label == 'Dialog Info' )
    const d = this.g.getDataIf( this.node, 
                                (n,d)=> ( d.category == 'Property_ListKV') &&
                                        ( d.label == 'Dialog Info' ) );
    if( d ) {
      let name = getTableRowValue( d.rows, 'Name' );
      result.push( [ name ] );
    }
    return( result );
  }
  Begin_Header_Info() {
    let result = [];
    // me.getNodeIf( '', (d)=> d.category == 'Hierarchy_GraphInfo' && d.label == 'Graph Info' )
    const d = this.g.getDataIf( this.node, 
                                (n,d)=> ( d.category == 'Hierarchy_GraphInfo') &&
                                        ( d.label == 'Graph Info' ) );
    if( d ) {
      let version = getTableRowValue( d.rows, 'Version' );
      let date = getTableRowValue( d.rows, 'Date' );
      result.push( [ version ] );
      result.push( [ date ] );
    }
    return( result );
  }
  Loop_Begin_Rule() {
    //me.getNodeListIf( '', (d)=> d.category == 'Dialog_Rule' )
    return( this.g.getLoopObjList(
                      this.node,
                      'getNodeListIf',
                      (n,d)=> d.category == 'Dialog_Rule',
                      RuleModel
    ));
  }
}

module.exports = RootModel;
