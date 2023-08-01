
class PublicMethod {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  Define_Signature() {
    switch( this.node ) {
      case 1: return([
        ['add', 'userName', 'userSurname', 'This method add a new user'],
      ]);
      case 2: return([
        ['getUserName', 'userSurname', 'This method getuser\'s name'],
      ]);
      case 3: return([
        ['getUserSurname', 'userName', 'This method getuser\'s surname'],
      ]);
      case 4: return([
        ['save', 'This method save the data'],
      ]);
      case 5: return([
        ['load', 'This method load the data']
      ]);
    }
  }
}
class PrivateMethod {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  Begin_Signature() {
    switch( this.node ) {
      case 1: return([
        ['saveInTable', 'name',     'INPUT', 'Name of table'],
        ['',            'tableType', 'INPUT', 'Type of table'],
      ]);
      case 2: return([
        ['getTableType', 'tableName',  'INPUT', 'Name of table'],
        ['',             'fName',      'INPUT', 'Type of the field'],
        ['',             'tableT',     'OUTPUT', 'Type of table'],
        ['',             'fieldType',  'OUTPUT', 'Type of the field'],
      ]);
      case 3: return([
        ['geSynchronoustTableType', 'tableName',  'INPUT', 'Name of table'],
        ['',             'fName',      'INPUT', 'Type of the field'],
        ['',             'tableT',     'OUTPUT', 'Type of table'],
        ['',             'fieldType',  'OUTPUT', 'Type of the field'],
      ]);
      case 4: return([
        ['checInTable', 'tableCount', 'OUTPUT', 'Name of table'],
        ['',            'tableMax',   'OUTPUT', 'Type of table'],
      ]);
    }
  }
}
class RootModel {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  Begin_Header() {
    return({
      className: 'MyClass',
      comment: 'This is my class',
    });
  }
  Define_Packages() {
    return([
      ['fs', 'fs'],
      ['dir', 'dir'],
    ]);
  }
  Define_Class() {
    return({ 
      className: 'MyClass',
    });
  }
  Define_Constructor_Body() {
    return([
      [ 'this.i = 0;' ],
      [ 'this.fd = null;' ],
      [ 'this.currDir = \'./\';' ],
    ]);
  }
  Loop_Begin_Public_Method() {
    return([
      new PublicMethod( this.g, 1 ), 
      new PublicMethod( this.g, 2 ), 
      new PublicMethod( this.g, 3 ), 
      new PublicMethod( this.g, 4 ),
    ]);
  }
  Loop_Begin_Private_Method() {
    return([
      new PrivateMethod( this.g, 1 ),
      new PrivateMethod( this.g, 2 ),
      new PrivateMethod( this.g, 3 ),
      new PrivateMethod( this.g, 4 ),
    ]);
  }
}

module.exports = RootModel;
  