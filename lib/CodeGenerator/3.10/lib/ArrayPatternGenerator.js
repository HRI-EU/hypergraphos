class BasicGenerator {
  constructor() {
    this.setDefaultParams();
  }
  setParams( params ) {
    this._setPlaceholderChar( params );
  }
  setDefaultParams() {
    this.pChar = '%';
  }
  _setPlaceholderChar( ch ) {
    this.pChar = ch;
  }
  _replacePlaceholder( templateLine ) {
    // This function replace each occurence of %b,%e,%i or %f 
    // into %<number> (%0, %1, ...)
    let result = [];
    let counter = 0;
    if( templateLine ) {
      for( let i = 0; i < templateLine.length; ++i ) {
        const ch = templateLine[i];
        if( ( ch == this.pChar ) && 
            ( i < templateLine.length-1 ) && 
            ( 'beif'.indexOf( templateLine[i+1] ) != -1 ) ) {
          result.push( this.pChar+counter++ );
          ++i;
        } else {
          result.push( ch );
        }
      }
    }
    return( { line: result.join( '' ), placeholderCount: counter } );
  }
  _fillFromArray( template, data ) {
    let result = [];

    const fillData =( template, data, maxCol )=> {
      let result = [];
      maxCol = ( maxCol !== undefined? maxCol: 0 );
      let resultLine = template[0];
      // Replace each iterator %<number> with data value with indentation
      let indentation = '';
      let i = 0;
      if( data ) {
        while( i < data.length ) {
          let idxData = resultLine.indexOf( this.pChar+i );
          let idxIndent = resultLine.indexOf( this.pChar+'t' );
          if( ( idxData == idxIndent ) && ( idxData == -1 ) ) {
            break;
          }
          idxData = ( idxData == -1? Infinity: idxData );
          idxIndent = ( idxIndent == -1? Infinity: idxIndent );
          if( idxData < idxIndent ) {
            resultLine = resultLine.replace( this.pChar+i, data[i] );
            indentation += ' '.repeat( maxCol[i]-data[i].length );
            ++i;
          } else {
            resultLine = resultLine.replace( this.pChar+'t', indentation );
            indentation = '';
          }
        }
      }
      result.push( resultLine );
      return( result );
    };

    // Case of a 1 line template, data may have 0 or 1 iterator
    if( template.length == 1 ) {
      let resultLine = fillData( template, data[0] );
      result.push( resultLine[0] );
    // Case of template with 3 lines
    } else {
      // Check all data rows have the same length
      let maxColLen;
      let rowLen = 0;
      for( let j = 0; j < data.length; ++j ) {
        if( j == 0 ) {
          rowLen = data[j].length;
        } else {
          if( rowLen != data[j].length ) {
            return( [ 'Error: all data lines must have same length' ] );
          }
        }
      }
      // Compute an array containing the max length of each data column
      for( let j = 0; j < data.length; ++j ) {
        if( !maxColLen ) {
          maxColLen = Array.from( new Array( rowLen ), () => 0 );
        }
        for( let k = 0; k < data[j].length; ++k ) {
          if( maxColLen[k] < data[j][k].length ) {
            maxColLen[k] = data[j][k].length;
          }
        }
      }
      // Recursivelly fill each line of the template with data
      const firstTemplate = [ template[0] ];
      const middleTemplate = [ template[1] ];
      const lastTemplate = [ template[2] ];
      for( let j = 0; j < data.length; ++j ) {
        let resultLine = '';
        if( j == 0 ) {
          resultLine = fillData( firstTemplate, data[j], maxColLen );
        } else if( j == data.length-1 ) {
          resultLine = fillData( lastTemplate, data[j], maxColLen );
        } else {
          resultLine = fillData( middleTemplate, data[j], maxColLen );
        }
        result.push( resultLine[0] );
      }
    }
    return( result );
  }
  _fillFromStringArray( template, data ) {
    let result = [];

    const fillData = ( template, data )=> {
      let result = '';
      if( data != undefined ) {
        let resultLine = template[0];
        result = resultLine.replace( this.pChar+0, data );
      }
      return( result );
    };
    // Case of a 1 line template, data may have 0 or 1 iterator
    if( template.length == 1 ) {
      let resultLine = fillData( template, data[0] );
      result.push( resultLine );
    } else {
      // Fill each line of the template with data
      const firstTemplate = [ template[0] ];
      const middleTemplate = [ template[1] ];
      const lastTemplate = [ template[2] ];
      for( let j = 0; j < data.length; ++j ) {
        let resultLine = '';
        if( j == 0 ) {
          resultLine = fillData( firstTemplate, data[j] );
        } else if( j == data.length-1 ) {
          resultLine = fillData( lastTemplate, data[j] );
        } else {
          resultLine = fillData( middleTemplate, data[j] );
        }
        result.push( resultLine );
      }
    }
    return( result );
  }
  _findLineTemplateParts( template ) {
    let result = [];
    if( template && ( template.length == 1 ) ) {
      const line = template[0];
      const iteratorIndex1 = line.indexOf( '§' );
      const iteratorIndex2 = line.indexOf( '§', iteratorIndex1+1 );
      if( iteratorIndex1 < iteratorIndex2 ) {
        const firstPart = line.substring( 0, iteratorIndex1 );
        const middlePart = ' '+line.substring( iteratorIndex1+1, iteratorIndex2 )+' ';
        const lastPart = line.substring( iteratorIndex2+1 );
        result.push( firstPart );
        result.push( middlePart );
        result.push( lastPart );
      } else {
        result.push( line );
      }
    }
    return( result );
  }
}

class LinePatternGenerator extends BasicGenerator {
  constructor() {
    super();
  }
  doReplace( templateObj, m, placeholderChar ) {
    if( placeholderChar ) {
      this._setPlaceholderChar( placeholderChar );
    }
    const template = templateObj.parameterList;
    let output = [];
    let templateIndex = 0;
    // Loop over each row of data
    if( m ) {
      for( const item of m ) {
        // Uses the template at index if defined
        if( template[templateIndex] ) {
          const out = this._generateLinePattern( [ template[templateIndex] ], item );
          output.push( out[0] );
        }
        // Cycle over template in case data has more row than template row
        if( templateIndex < template.length-1 ) {
          ++templateIndex;
        } else {
          templateIndex = 0;
        }
      }
    }
    templateObj.setTemplate( output );
  }
  // ----- Private Functions -----
  _generateLinePattern( template, data ) {
    let result = [];
    if( template && ( template.length == 1 ) && data ) {
      let beginPart = '';
      let middlePart = '';
      let endPart = '';
      // Example line: ' %b(§%i, %i, %i§) { // %e'
      const templateParts = this._findLineTemplateParts( template );
      if( templateParts.length == 1 ) {
        const templateInfo = this._replacePlaceholder( templateParts[0] );
        const line = this._fillFromArray( [ templateInfo.line ], [ data ] );
        result.push( line[0] );
      } else {
        if( templateParts[0] ) {
          // Case ' %b %b('
          const beginInfo = this._replacePlaceholder( templateParts[0] );
          if( beginInfo.placeholderCount > 0 ) {
            const beginData = data.splice( 0, beginInfo.placeholderCount );
            const filledBeginPart = this._fillFromArray( [ beginInfo.line ], [ beginData ] );
            beginPart = filledBeginPart[0];
          }
        }
        if( templateParts[2] ) {
          // Case ') { // %e %e %e'
          const endInfo = this._replacePlaceholder( templateParts[2] );
          if( endInfo.placeholderCount > 0 ) {
            const endData = data.splice( data.length-endInfo.placeholderCount, data.length );
            const filledEndPart = this._fillFromArray( [ endInfo.line ], [ endData ] );
            endPart = filledEndPart[0];
          }
        }
        if( templateParts[1] && data.length > 0 ) {
          // Case ' %i, %i, %i '
          const iteratorPart = templateParts[1];
          let posIter1 = iteratorPart.indexOf( this.pChar+'i' )+2;
          let posIter2 = iteratorPart.indexOf( this.pChar+'i', posIter1 );
          let separator = ''
          if( posIter1 < posIter2 ) {
            separator = iteratorPart.substring( posIter1, posIter2 );
          }
          const filledMiddlePart = data.join( separator );
          middlePart = ' '+filledMiddlePart+' ';
        }
        result.push( beginPart+middlePart+endPart );
      }
    }
    return( result );
  }
}

class ArrayPatternGenerator extends BasicGenerator {
  constructor() {
    super();
  }
  doReplace( templateObj, m, placeholderChar ) {
    if( placeholderChar ) {
      this._setPlaceholderChar( placeholderChar );
    }
    const template = templateObj.parameterList;
    const output = this._generateBlockPattern( template, m );
    templateObj.setTemplate( output );
  }
  // ----- Private Functions -----
  _generateBlockPattern( template, data ) {
    let result = [];
    if( data && template ) {
      const templateCases = this._generateTemplateOneZero( template );
      const row = data.length;
      // Check data layout
      // 1st: data = [ 'str1', 
      //               'str2',
      //               'str3' ]
      //      In this case we consider each string as a line
      //      NOTE: We can only use the %i placeholder in this case
      // 2nd: data = [ ['s1', 's2', ...],
      //               ['s4', 's5', ...],
      //               ['s8', ...] ]
      //      In this case we conside each row as a line
      //      NOTE: We can use %b, %i, %e, %f, %t, ...
      if( typeof( data[0] ) == 'string' ) {
        // We assume to use the 1st layout
        const col = 1;
        for( const key in templateCases ) {
          const templateInfo = templateCases[key];
          if( templateInfo.isMySize( row, col ) ) {
            result = this._fillFromStringArray( templateInfo.template, data );
            break;
          }
        }
      } else {
        // We assume to use the 2nd layout
        const col = ( data.length > 0 ? data[0].length: 0 );
        for( const key in templateCases ) {
          const templateInfo = templateCases[key];
          if( templateInfo.isMySize( row, col ) ) {
            result = this._fillFromArray( templateInfo.template, data );
            break;
          }
        }
      }
    } else {
      result = [ 'Error: data or template not defined correctly' ];
    }
    return( result );
  }
  _generateTemplateOneZero( templateN ) {
    // TODO: show errors in generated code, not in consol
    let templateOne = '';
    let templateZero = '';
    let newTemplateN = [];
    let dataLenCase0 = 0;
    let dataLenCase1N = 0;
    // In case of an input 0 or 1 line template we return an error
    // In case of an input 2 or more lines template we make the assumption:
    //   - we use the 1st, and last line and ignore the other ones
    //   - we can generate the middle line from the 1st and last line
    //   - we can generate a 0 and 1 line template
    if( templateN && ( templateN.length >= 2 ) ) {
      const line2Index = ( templateN.length >= 3? templateN.length-1: 1);
      const line1 = templateN[0];
      const line2 = templateN[line2Index];
      let lineOne = [];
      let lineZero = [];
      let lineMiddle = [];
      let isIteratorFound = false;
      // Build 0 and 1 line templates and middle line of 3 lines template
      const maxLen = Math.max( line1.length, line2.length );
      for( let i = 0; i < maxLen; ++i ) {
        const ch1 = ( i < line1.length? line1[i]: ' ' );
        const ch2 = ( i < line2.length? line2[i]: ' ' );

        // Building templateOne
        lineOne.push( ( !isIteratorFound? ch1: ch2 ) );

        // Building templateN middle line
        lineMiddle.push( ( isIteratorFound? ch1: ch2 ) );

        // Building templateZero
        if( !isIteratorFound ) {
          lineZero.push( ch1 );
        } else if( ( ch1 != ch2 ) || 
                  ( ( ch1 == ' ' ) && ( ch2 == ' ' ) ) ) {
          lineZero.push( ch2 );
        } else {
          // We don't push anything in this case!!!
        }

        // Find first iterator
        if( !isIteratorFound &&
            ( line1[i] == this.pChar ) && ( i < line1.length-1 ) && ( line1[i+1] == 'i' ) ) {
          isIteratorFound = true;
        }
      }

      // Clean template zero by trimming between special delimiter §
      templateZero = lineZero.join( '' ).replaceAll( /\§.*\§/g, '' );
      
      // Replace placeholder into positional one
      let tmp = this._replacePlaceholder( templateZero );
      dataLenCase0 = tmp.placeholderCount;
      templateZero = tmp.line;

      // Clean template one by removing special delimiter 
      templateOne = lineOne.join( '' ).replaceAll( '§', ' ' );

      // Replace placeholder into positional one
      tmp = this._replacePlaceholder( templateOne );
      dataLenCase1N = tmp.placeholderCount;
      templateOne = tmp.line;

      // Redefine templateN
      newTemplateN = [
        templateN[0],
        lineMiddle.join( '' ),
        templateN[templateN.length-1],
      ];
      for( let i = 0; i < newTemplateN.length; ++ i ) {
        // Clean template N by replacing special delimiter § by space
        const line = newTemplateN[i].replaceAll( '§', ' ' );

        // Replace placeholder into positional one
        tmp = this._replacePlaceholder( line );
        newTemplateN[i] = tmp.line;
      }
    } else {
      return({
        0: {
          template: [ 'Error: Template must be composed of at least 2 lines' ],
          isMySize: (r, c)=> true,
        },
      });
    }
    return({
      0: {
        template: [ templateZero ],
        isMySize: (r, c)=> r <= 1 && c == dataLenCase0,
      },
      1: {
        template: [ templateOne ],
        isMySize: (r, c)=> r == 1 && c == dataLenCase1N,
      },
      n: {
        template: newTemplateN,
        isMySize: (r, c)=> r => 1 && c == dataLenCase1N,
      }
    });
  }
}

var window;

if( !window ) {
  module.exports = { 
    apg: new ArrayPatternGenerator(),
    lpg: new LinePatternGenerator(),
  }
}

/*

const g = new ArrayPatternGenerator();

console.log( '--------------------TESTING replacePlaceholder' );
let a = [ '123%b102030%e_%i_%f_',
          '123%b102030%e_%i_%f',
          '%b102030%e_%i%f',
          '%g_%l_%k_%',
          undefined,
          '%i%%i%',
          [ 'a', '%', 'i', ' ' ] ];
for( const i of a ) {
  let out = g._replacePlaceholder( i );
  console.log( `${i} ==> ${JSON.stringify(out, null, 2)}` );
}

function showResult(t,d,r,expectedSuccess) {
  console.log( '--------------------' );
  console.log( 'template:' );
  console.log( t );
  console.log( 'data:' );
  console.log( d );
  console.log( '==> '+expectedSuccess );
  console.log( r );
}

console.log( '--------------------TESTING generatePattern(t,d)' );
let t = [ '%b(§%i,     // %i: %i'];
let d = [['getTableType', 'Name',      'INPUT',  'Name of Table'],
         ['',             'Type',      'INPUT',  'Type of the field'],
         ['',             'tableType', 'OUTPUT', 'Type of the table'],
         ['',             'fieldId',   'OUTPUT', 'Type of the field']];
let r = g.generateBlockPattern(t,d);
showResult(t,d,r,'ERROR');

t = [ '%b(§%i,     // %i: %i',
      '%f  %i§) {  // %i: %i' ];
d = [];
r = g.generateBlockPattern(t,d);
showResult(t,d,r,'ERROR');

t = [ '%b(§%i,     // %i: %i',
      '%f  %i§) {  // %i: %i' ];
d = [['getTableType']];
r = g.generateBlockPattern(t,d);
showResult(t,d,r,'OK');

t = [ '%b(§%i,     // %i: %i',
      '%f  %i§) {  // %i: %i' ];
d = [['getTableType', 'Name']];
r = g.generateBlockPattern(t,d);
showResult(t,d,r),'ERROR';

t = [ '%b(§%i,     // %i: %i',
      '%f  %i§) {  // %i: %i' ];
d = [['getTableType', 'Name',      'INPUT',  'Name of Table']];
r = g.generateBlockPattern(t,d);
showResult(t,d,r,'OK');

t = [ '%b(§%i,     // %i: %i',
      '%f  %i§) {  // %i: %i' ];
d = [['getTableType', 'Name',      'INPUT',  'Name of Table'],
     ['',             'Type',      'INPUT',  'Type of the field'],
     ['',             'tableType', 'OUTPUT', 'Type of the table'],
     ['',             'fieldId',   'OUTPUT', 'Type of the field']];
r = g.generateBlockPattern(t,d);
showResult(t,d,r,'OK');

t = [ '%b(§%i,     // %i: %i',
      '%f  %i§) {  // %i: %i' ];
d = [['getTableType', 'Name',      'INPUT',  'Name of Table'],
     ['',             'Type',      'INPUT',  'Type of the field'],
     ['',             'tableType', 'OUTPUT'],
     ['',             'fieldId',   'OUTPUT', 'Type of the field']];
r = g.generateBlockPattern(t,d);
showResult(t,d,r,'ERROR');

t = [ '%b(§%i,     // %i: %i',
      '%f  %i,     // %i: %i',
      '%f  %i§) {  // %i: %i' ];
d = [['getTableType', 'Name',      'INPUT',  'Name of Table'],
     ['',             'Type',      'INPUT',  'Type of the field'],
     ['',             'tableType', 'OUTPUT', 'Type of the table'],
     ['',             'fieldId',   'OUTPUT', 'Type of the field']];
r = g.generateBlockPattern(t,d);
showResult(t,d,r,'OK');

t = [ '%b(§%i,     // %i: %i',
      '%f  %i,     // %i: %i %i',
      '%f  %i§) {  // %i: %i' ];
d = [['getTableType', 'Name',      'INPUT',  'Name of Table'],
     ['',             'Type',      'INPUT',  'Type of the field'],
     ['',             'tableType', 'OUTPUT', 'Type of the table'],
     ['',             'fieldId',   'OUTPUT', 'Type of the field']];
r = g.generateBlockPattern(t,d);
showResult(t,d,r,'OK');

t = [ '%b(§%i,     // %i: %i',
      '%f  %i,     // %i: %i',
      '%f  %i§) {  // %i: %i %i' ];
d = [['getTableType', 'Name',      'INPUT',  'Name of Table'],
     ['',             'Type',      'INPUT',  'Type of the field'],
     ['',             'tableType', 'OUTPUT', 'Type of the table'],
     ['',             'fieldId',   'OUTPUT', 'Type of the field', 'Extra data']];
r = g.generateBlockPattern(t,d);
showResult(t,d,r,'ERROR');

t = [ '%b(§%i,     // %i: %i',
      '%f  %i,     // %i: %f',
      '%f  %i§) {  // %i: %i' ];
d = [['getTableType', 'Name',      'INPUT',  'Name of Table'],
     ['',             'Type',      'INPUT',  'Type of the field'],
     ['',             'tableType', 'OUTPUT', 'Type of the table'],
     ['',             'fieldId',   'OUTPUT', 'Type of the field']];
r = g.generateBlockPattern(t,d);
showResult(t,d,r,'OK');

t = [ '%b(§%i,     // %i: %i',
      '%f  %i,     // %i: %i',
      '%f  %i,     // %i: %i',
      '%f  %i§) {  // %i: %i' ];
d = [['getTableType', 'Name',      'INPUT',  'Name of Table'],
     ['',             'Type',      'INPUT',  'Type of the field'],
     ['',             'tableType', 'OUTPUT', 'Type of the table'],
     ['',             'fieldId',   'OUTPUT', 'Type of the field']];
r = g.generateBlockPattern(t,d);
showResult(t,d,r,'OK');

a = [ 
  { 
    t: [ ' %b(§%i, %i, %i§) { // %e' ],
    d: [ 'function1', 'p1', 'p2', 'This is a comment' ],
  },
  { 
    t: [ ' %b() { // %e' ],
    d: [ 'function1', 'This is a comment' ],
  },
  { 
    t: [ ' %b(§%i§) { // %e' ],
    d: [ 'function1', 'This is a comment' ],
  },
];
for( const item of a ) {
  const r = g.generateLinePattern( item.t, item.d );
  console.log( JSON.stringify( item, null, 2 ) );
  console.log( '-->', r );
}

*/