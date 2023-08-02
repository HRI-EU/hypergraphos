
class RootModel {
  constructor( g, node ) {
    this.g = g;
    this.node = node;
  }
  Begin_MainTitle() {
    return({
      name: 'Example of execution of a',
      subject: 'for and HTML source page',
    });
  }
  Define_ParagraphText() {
    return([
      ['Questo e\' un esemptio', 'br' ],
      ['di test multi linea', 'br'],
    ]);
  }
  Define_ParagraphLines() {
    return([
      'Anche questo e\' un esemptio',
      'di test multi linea, ma con un semplice',
      'array di stringe'
    ]);
  }
  Insert_Header() {
    return([['====================',
            ' Coyright (c) 9001',
            '====================']]);
  }
}

module.exports = RootModel;
  