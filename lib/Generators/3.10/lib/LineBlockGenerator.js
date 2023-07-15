var window;

if( !window ) {
  // Case NodeJS
  const tdir = './';
  generatorsConfig = require( `${tdir}/generatorsConfig.js` );
} else {
  // Case Browser
}

class LineBlockGenerator {
  constructor() {
    this.template = '';
    this.data = {};
    this.output = [];

    this.conf = {
      beginTag:     '# Begin ',
      endTag:       '# End ',
      insertTag:    '# Insert ',
    };

    // Set default language (JavaScript)
    generatorsConfig( '', this.conf );
    // Keep block on undefined data from model
    this.property = {
      language: 'JavaScript',
    };
  }
  setLanguage( language ) {
    this.property.language = language;
    generatorsConfig( language, this.conf );
  }
  setTemplate( template ) {

    if( !Array.isArray( template ) ) {
      this.template = template.split( '\n' );
    } else {
      this.template = template;
    }
    // Clear output
    this.output = [];
  }
  getOutput() {
    return( this.output );
  }
  getOutputStr() {
    return( this.output.join( '\n' ) );
  }
  process( data, dataReader ) {
    this.data = data;
    let idx = 0;
    let templateLen = this.template.length;

    while( idx < templateLen ) {
      // Get next line
      const line = this.template[idx++];
      // Search for tags like: //[# Begin Block #]
      const lineMatch = line.match( this.conf.blockLineExp );
      if( lineMatch && lineMatch[1] ) {
        // Get matched part
        const startBlockName = lineMatch[1];
        // Get indentation
        const indent = this._getLineIndentation( line );

        // Get model's function name related to found tag
        if( startBlockName.startsWith( this.conf.beginTag ) ) {
          const startName = startBlockName.substring( this.conf.beginTag.length, 
                                                 startBlockName.length-1 ).trim();
          // Take only defined names in data (e.g. 'out' should not be touched)
          if( data[startName] != undefined ) {
            while( idx < templateLen ) {
              // Get next line
              const line = this.template[idx++];
              // Search for tags like: //[# Begin Block #]
              const lineMatch = line.match( this.conf.blockLineExp );
              if( lineMatch && lineMatch[1] ) {
                // Get matched part
                const blockName = lineMatch[1];
                if( blockName.startsWith( this.conf.endTag ) ) {
                  const endName = blockName.substring( this.conf.endTag.length,
                                                       blockName.length-1 ).trim();
                  if( startName == endName ) {
                    this._appendToOutput( startName, indent, dataReader );
                    break;
                  }
                }
              }
            }
          } else {
            this.output.push( line );
          }
        } else if( startBlockName.startsWith( this.conf.insertTag ) ) {
          const name = startBlockName.substring( this.conf.insertTag.length, 
                                                 startBlockName.length-1 ).trim();
          this._appendToOutput( name, indent, dataReader );
        } else {
          this.output.push( line );
        }
      } else {
        this.output.push( line );
      }
    }
  }
  extractLineBlock( trimIndentation, name ) {
    let idx = 0;
    let outputLen = this.output.length;
    let result = [];
    let isBlockFound = false;

    while( idx < outputLen ) {
      // Get next line
      const line = this.output[idx++];
      // Search for tags like: //[# Begin Block #]
      const lineMatch = line.match( this.conf.blockLineExp );
      if( lineMatch && lineMatch[1] ) {
        // Get matched part
        const startBlockName = lineMatch[1];

        // Get model's function name related to found tag
        if( startBlockName.startsWith( this.conf.beginTag ) ) {
          const startName = startBlockName.substring( this.conf.beginTag.length, 
                                                 startBlockName.length-1 ).trim();
          if( startName == name ) {
            while( idx < outputLen ) {
              // Get next line
              const line = this.output[idx++];
              // Search for tags like: //[# Begin Block #]
              const lineMatch = line.match( this.conf.blockLineExp );
              if( lineMatch && lineMatch[1] ) {
                // Get matched part
                const blockName = lineMatch[1];
                if( blockName.startsWith( this.conf.endTag ) ) {
                  const endName = blockName.substring( this.conf.endTag.length,
                                                       blockName.length-1 ).trim();
                  if( startName == endName ) {   
                    isBlockFound = true;
                    break;
                  } else {
                    result.push( line );
                  }
                } else {
                  result.push( line );
                }
              } else {
                result.push( line );
              }
            }
          }
        }
      }
      if( isBlockFound ) {
        break;
      }
    }
    if( trimIndentation ) {
      this._reIndent( result, 0 );
    }
    return( result );
  }
  _appendToOutput( name, indent, dataReader ) {
    // Get data value for current match
    let value = this._getKeyValue( dataReader, name );
    // Make sure its an array
    if( !Array.isArray( value ) ) {
      value = value.split( '\n' );
    }
    // Set indentation to zero
    this._reIndent( value, 0 );
    // Set new indentation
    this._reIndent( value, indent );
    this.output.push( ...value );
  }
  _getKeyValue( dataReader, name ) {
    // Function to get key->value replacement
    if( dataReader ) {
      return( dataReader( this.data, name ) );
    } else if ( name in this.data ) {
      return( this.data[name] );
    } else {
      return( [] );
    }
  }
  _reIndent( value, indent ) {
    // Get current indentation (min # of spaces for all lines)
    const currIndent = this._getIndent( value );
    const newIndent = indent-currIndent;
    // Check adjustment
    let indentStr = ( newIndent > 0? ' '.repeat( newIndent ): '' );
    
    // Apply indent if necessary
    if( ( newIndent != 0 ) && value ) {
      for( let i = 0; i < value.length; ++i ) {
        const line = value[i];
        if( line.trim() ) { // Skip empty lines
          if( newIndent > 0 ) {
            value[i] = indentStr+value[i];
          } else {
            value[i] = value[i].substring( -newIndent );
          }
        }
      }
    }
  }
  _getIndent( value ) {
    let result = 0;
    let minIndent = Infinity;
    if( value ) {
      for( let i = 0; i < value.length; ++i ) {
        const line = value[i];
        if( line.trim() ) {
          const lineIndent = this._getLineIndentation( line );
          if( lineIndent < minIndent ) {
            minIndent = lineIndent;
            // If we get one indentation to 0 => this is the minimum
            if( minIndent == 0 ) {
              break;
            }
          }
        }
      }
      if( minIndent != Infinity ) {
        result = minIndent;
      }
    }
    return( result );
  }
  _getLineIndentation( line ) {
    if( !line ) { 
      return( 0 );
    } else { 
      return( line.search(/\S/) );
    }
  }
}

if( !window ) {
  module.exports = LineBlockGenerator;
}