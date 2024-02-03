
let rg;
let apg;
let lpg;

if( !window ) {
  const tdir = './';
  rg = require( `${tdir}/ReplaceGenerator` );
  const mod = require( `${tdir}/ArrayPatternGenerator` );
  apg = mod.apg;
  lpg = mod.lpg;
} else {
  rg = new ReplaceGenerator();
  apg = new ArrayPatternGenerator();
  lpg = new LinePatternGenerator();
}

const generatorList = {
  'Replace': rg,
  'LinePattern': lpg,
  'ArrayPattern': apg,
};

class TemplateGenerator {
  constructor( template, parentGenerator ) {
    this.parentGenerator = parentGenerator;
    this.setTemplate( template );
    this.clearOutput();
    this.parameterList = [];

    this.replaceList = [];
    this.foundReplace = [];
  }
  setParameterList( parameterList ) {
    this.parameterList = ( parameterList? parameterList: [] );
  }
  // Set the template on which the template generator will operate
  setTemplate( template ) {
    if( typeof( template ) == 'string' ) {
      template = template.split( '\n' );
    }

    // Store original template
    this.originalTemplate = template;

    this._setBuffer( template );
  }
  getTemplate() {
    return( this.originalTemplate );
  }
  getTemplateStr() {
    return( this.originalTemplate.join( '\n' ) );
  }
  isTemplateEmpty() {
    return( this.bufferInfo.templateLen == 0 );
  }
  // Get current output as string array (from all output generation done)
  getOutput() {
    return( this.output );
  }
  // Get current output as string (from all output generation done)
  getOutputStr() {
    return( this.output.join( '\n' ) );
  }
  // Clean generated output
  clearOutput() {
    this.output = [];
  }
  clearParameterList() {
    this.parameterList = [];
  }
  clearParent() {
    this.parentGenerator = null;
  }
  addGenerator( name, instance ) {
    generatorList[name] = instance;
  }

  /* ---- Generation functions ---- */
  process( m ) {
    const beginTag = '# Begin ';
    const endTag = '# End ';
    const defineTag = '# Define ';
    const loopBeginTag = '# Loop Begin ';
    const loopEndTag = '# Loop End ';

    while( !this.bufferInfo.isEOT ) {
      // Load the next line, looking for Template Tags
      let line = this._getNextBufferLineStr();
      if( !this.bufferInfo.isEOT ) {
        // Search for tags like: //[# Begin Block #]
        const blockLineExp = new RegExp( /\s*\/\/\[(#.+#)\]/ );
        const lineMatch = line.match( blockLineExp );
        if( lineMatch && lineMatch[1] ) {
          const startBlockName = lineMatch[1];
          // Search for tags parameters: //[# Begin Block #][Param,%]
          const blockParamExp = new RegExp( /.*\]\[(.+)\]$/ );
          let patternGenerator = generatorList['LinePattern'];
          const paramMatch = line.match( blockParamExp );
          patternGenerator.setDefaultParams();
          if( paramMatch && paramMatch[1] ) {
            const param = paramMatch[1];
            const commaIdx = param.indexOf( ',' );
            if( commaIdx != -1 ) {
              const genName = param.substring( 0, commaIdx );
              patternGenerator = generatorList[ genName ];
              const paramStr = param.substring( commaIdx+1 );
              patternGenerator.setParams( paramStr );
            } else {
              patternGenerator = generatorList[ param ];
              patternGenerator.setDefaultParams();
            }
          }

          const funcName = startBlockName.substring( 2, startBlockName.length-2 ).replaceAll( ' ', '_' );
          if( startBlockName.startsWith( defineTag ) ) {
            const b = this.extractNextLine();
            if( m[funcName] ) {
              const data = m[funcName]();
              patternGenerator.doReplace( b, data );
              b.generate();
            }
          } else if( startBlockName.startsWith( beginTag ) ) {
            const endBlockName = endTag+startBlockName.substring( beginTag.length );
            const b = this.extractNextLineBlock( '', endBlockName );
            if( m[funcName] ) {
              const data = m[funcName]();
              patternGenerator.doReplace( b, data );
              b.generate();
            }
          } else if( startBlockName.startsWith( loopBeginTag ) ) {
            const endBlockName = loopEndTag+startBlockName.substring( loopBeginTag.length );
            const b = this.extractNextLineBlock( '', endBlockName );
            if( m[funcName] ) {
              const data = m[funcName]();
              for( const item of data ) {
                b.process( item );
                b.generate();
              }
            }
          } else {
            this.output.push( line );
          }
        } else {
          this.output.push( line );
        }
      }
    }
  }
  // Generate output and restart buffer from template
  generate( lineBlock ) {
    if( lineBlock ) {
      this.output = this.output.concat( lineBlock );
    } else {
      while( !this.bufferInfo.isEOT ) {
        let line = this._getNextBufferLineStr();
        if( !this.bufferInfo.isEOT ) {
          this.output.push( line );
        }
      }

      if( this.parentGenerator ) {
        this.parentGenerator.generate( this.output );
        this.clearOutput();
      }

      // Reset template buffer to original template
      this.setTemplate( this.originalTemplate );
    }
  }

  /* ---- Template navigation and extraction ---- */
  // Extract the next available line that contains searchStr
  extractNextLine( searchStr, isExcludeMatch ) {
    isExcludeMatch = ( isExcludeMatch === undefined? true: isExcludeMatch );
    let blockInfo = { paramList: [], lineList: [] };
    let line = null;
    if( searchStr ) {
      line = this._getStartLine( searchStr );
    }
    if( !this.bufferInfo.isEOT ) { // If we did not reached EOT, we found the endStr
      if( isExcludeMatch || line == null ) {
        line = this._getEndLine( null, blockInfo );
        if( this.bufferInfo.isEOT ) {
          line = null;
        }
      }
      if( line != null ) {
        blockInfo.lineList.push( line );
      }
    }
    const result = new TemplateGenerator( blockInfo.lineList, this );
    result.setParameterList( blockInfo.paramList );
    return( result );
  }
  // Extract the next available lines that are between startStr and endStr
  extractNextLineBlock( startStr, endStr, isExcludeMatch ) {
    isExcludeMatch = ( isExcludeMatch === undefined? true: isExcludeMatch );
    let blockInfo = { paramList: [], lineList: [] };
    let line = null;
    if( startStr ) {
      line = this._getStartLine( startStr );
    }
    if( !this.bufferInfo.isEOT ) { // If we did not reached EOT, we found the startStr
      if( !isExcludeMatch && line != null ) {
        blockInfo.lineList.push( line );
      }
      if( line == null || ( endStr && ( line.indexOf( endStr ) == -1 ) ) ) { // If the endStr is not in the same line we search the next lines
        line = this._getEndLine( endStr, blockInfo );
        if( !this.bufferInfo.isEOT ) { // If we did not reached EOT, we found the endStr
          if( !isExcludeMatch ) {
            blockInfo.lineList.push( line );
          }
        } else {
          this.output = this.output.concat( blockInfo.lineList );
          blockInfo.lineList = [];
        }
      }
    }
    const result = new TemplateGenerator( blockInfo.lineList, this );
    result.setParameterList( blockInfo.paramList );
    return( result );
  }
  // Extract the next available block between startStr and endStr and push back the line with matching delimiters
  extractNextBlock( startStr, endStr, placeholder ) {
    let blockInfo = { paramList: [], lineList: [] };
    let line = this._getStartLine( startStr );
    if( !this.bufferInfo.isEOT ) { // If we did not reached EOT, we found the startStr
      const startStrIndex = this.bufferInfo.index;
      let i = line.indexOf( startStr );
      let newLine = line.substring( 0, i );
      blockInfo.lineList.push( line.substring( i ) );

      if( endStr && ( line.indexOf( endStr ) == -1 ) ) { // If the endStr is not in the same line we search the next lines
        line = this._getEndLine( endStr, blockInfo );
        if( !this.bufferInfo.isEOT ) { // If we did not reached EOT, we found the endStr
          const endStrIndex = this.bufferInfo.index;
          i = line.indexOf( endStr )+endStr.length;
          newLine = newLine+placeholder+line.substring( i );
          blockInfo.lineList.push( line.substring( 0, i ) );
          this.bufferInfo.template.splice( startStrIndex, endStrIndex-startStrIndex+1, newLine );
          this.bufferInfo.templateLen = this.bufferInfo.template.length;
          this.bufferInfo.index = startStrIndex-1;
        } else {
          this.output = this.output.concat( lineBlock );
          lineBlock = [];
        }
      }
    }
    for( let i = 0; i < blockInfo.lineList.length; ++i ) {
      blockInfo.lineList[i] = blockInfo.lineList[i].trimStart();
    }
    const result = new TemplateGenerator( blockInfo.lineList, this );
    result.setParameterList( blockInfo.paramList );
    return( result );
  }

  /* ---- Private funcions ---- */
  _setBuffer( template ) {
    // If no template passed, then an empty template is created
    if( !template ) {
      template = [];
    }

    // Initialize buffer info from template
    this.bufferInfo = {
      template: template.slice( 0 ),
      templateLen: template.length,
      index: -1,
      isEOT: (template.length == 0),
    };
  }
  _getStartLine( searchStr ) {
    let result = '';
    if( !this.bufferInfo.isEOT ) {
      while( !this.bufferInfo.isEOT ) {
        const line = this._getNextBufferLineStr();
        if( ( searchStr && ( line.indexOf( searchStr ) !== -1 ) ) ||
              !searchStr ) {
          result = line;
          break;
        } else {
          this.output.push( line );
        }
      }
    }
    return( result );
  }
  _getEndLine( searchStr, blockInfo ) {
    let result = '';
    let isFirstLine = true;
    if( !this.bufferInfo.isEOT ) {
      while( !this.bufferInfo.isEOT ) {
        const line = this._getNextBufferLineStr();
        const trimline = line.trim();
        // '//:' have to be detected on the fisrt after a '// label'
        // in order be considered for this 'label' generator scope only
        if( isFirstLine && trimline.startsWith( '//:' ) ) {
          if( blockInfo ) {
            const idx = line.indexOf( '//:' );
            const indentation = ' '.repeat( idx );  // Preserve indentation
            const paramLine = line.substring( idx+3 ); // 3 is length of '//>'
            blockInfo.paramList.push( indentation+paramLine );
          }
        } else if( ( searchStr && ( line.indexOf( searchStr ) !== -1 ) ) ||
                   !searchStr ) {
          result = line;
          break;
        } else {
          if( blockInfo ) {
            blockInfo.lineList.push( line );
          }
          isFirstLine = false;
        }
      }
    }
    return( result );
  }
  // This function get the next line from the buffer
  _getNextBufferLineStr() {
    let result = '';
    if( !this.bufferInfo.isEOT ) {
      const i = ++this.bufferInfo.index;
      if( i <= this.bufferInfo.templateLen-1 ) {
        result = this.bufferInfo.template[i];
      } else {
        this.bufferInfo.isEOT = true;
      }
    }
    return( result );
  }
}  

if( !window ) {
  module.exports = TemplateGenerator;
}