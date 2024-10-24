/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

var window;

var generatorsConfig;

if( !window ) {
  // Case NodeJS
} else {
  // Case Browser
}

class BlockGenerator {
  constructor() {
    this.template = '';
    this.tagLen = 2;
    this.blockExp = new RegExp( /\[#(.+)#\]/g );
    this.data = {};
    this.output = '';
  }
  setTemplate( template ) {
    this.template = template;
  }
  getOutput() {
    return( this.output.split( '\n' ) );
  }
  getOutputStr() {
    return( this.output );
  }
  process( data, dataReader ) {
    this.data = data;
    let lastIndex = 0;

    if( this.template ) {
      const matchList = this.template.matchAll( this.blockExp );
      if( matchList ) {
        for( const match of matchList ) {
          // Get index where match is found in template
          const index = match.index;
          // Get column of template match
          const indent = this._getColumn( this.template, index );
          // Get name of the token found (used with data)
          const name = match[1];
          // Get data value for current match
          const value = this._getKeyValue( dataReader, name );
          // Set indentation to zero
          const flatValue = this._reIndent( value, 0 );
          // Set new indentation
          const newValue = this._reIndent( flatValue, indent );
          // Update output
          this.output = this.output+
                        this.template.substring( lastIndex, index )+
                        newValue;
          // Compute the index for the rest of the template to be copied
          lastIndex = index+match[0].length;
        }
        // Add to output left content of template
        this.output = this.output+this.template.substring( lastIndex );
      }
    }
  }
  _getColumn( str, index ) {
    // Get the colum of the line at position index
    let result = index;
    if( str ) {
      let pos = index;
      while( pos >= 0 ) {
        if( str[pos] == '\n' ) {
          break;
        } else {
          --pos;
        }
      }
      if( str[pos] == '\n' ) {
        result = index-pos-1;
      } else {
        result = index;   
      }
    }
    return( result );
  }
  _reIndent( str, indent ) {
    // Get current indentation (min # of spaces for all lines)
    const currIndent = this._getIndent( str, null, true );
    // Check adjustment
    if( currIndent > indent ) {
      // Reduce indentation by the diff
      const diff = currIndent-indent;
      const diffStr = ' '.repeat( diff );
      const newStr = str.replaceAll( '\n'+diffStr, '\n' );
      return( newStr.substring( diff ) );
    } else if( currIndent < indent ) {
      // Increase indentation by the diff
      const diff = indent-currIndent;
      const diffStr = ' '.repeat( diff );
      const newStr = str.replaceAll( '\n', '\n'+diffStr );
      return( newStr )
    } else {
      // Keep indentation
      return( str );   
    }
  }
  _getIndent( str, index, isFull ) {
    // If isFull => get minumum spaces for all lines
    // otherwise => get minumum spaces for current line at index
    isFull = ( isFull? true: false );
    // If index is [0, len] => keep
    // othwerwise set it to string len
    if ( index == -1 || index == null || index == undefined ) {
      index = str.length-1;
    }
    // Current indentation value
    let result = 0;
    // Minimum indentation in case of isFull
    let minIndent = Infinity;

    if( str ) {
      let prevCh = '';
      while( index >= 0 ) {
        // If new-line => compute indentation
        const ch = str[index];
        if( ch == '\n' ) {
          // Skip empty line if prevCh == ch
          if( prevCh != ch ) { // prevCh == \n and ch == \n => empty line
            if( isFull ) {
              if( result < minIndent ) {
                minIndent = result;
                result = 0;
                // If we get one indentation to 0 => this is the minimum
                if( minIndent == 0 ) {
                  break;
                }
              }
            } else {
              result = index;
              break; 
            }
          }
        } else if( ch == ' ' ) {
          // In case of space add 1 indentation
          ++result;
        } else if( ch == '\t' ) {
          // In case of tab add 2 indentations
          result += 2;
        } else {
          // In case of no space, reset indentation
          result = 0;
        }
        prevCh = ch;
        --index;
      }
    }
    if( isFull ) {
      // If isFull => compute last indentation value
      if( minIndent == Infinity ) {
        minIndent = result;
      } else if( result < minIndent ) {
        minIndent = result;
      }
      result = minIndent;
    }
    return( result );
  }
  _getKeyValue( dataReader, name ) {
    // Function to get key->value replacement
    if( dataReader ) {
      return( dataReader( this.data, name ) );
    } else if ( name in this.data ) {
      return( this.data[name] );
    } else {
      return( '' );
    }
  }
}

if( !window ) {
  module.exports = BlockGenerator;
}