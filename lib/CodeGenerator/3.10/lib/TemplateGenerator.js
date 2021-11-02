var window;

let rg;  // ReplacePGenerator
let apg; // ArrayPGenerator
let lpg; // LinePGenerator

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

const tgGeneratorList = {
  'Replace': rg,
  'LinePattern': lpg,
  'ArrayPattern': apg,
};

const tgLanguageConfig = (language, config )=> {
  // Set default language to JavaScript
  language = ( language? language: 'JavaScript' );

  // Set language block tags
  switch( language.toLowerCase() ) {
    case 'c':
    case 'h':
    case 'c++':
    case 'h++':
    case 'cpp':
    case 'hpp':
    case 'java':
    case 'javascript':
      // Template Block definition
      // Format: //[# Begin NewBlock #]
      // Focus:  ----------------------
      config.blockLineExp = new RegExp( /\s*\/\/\[(#.+#)\]/ );
      // Parameter block definition
      // Format: //[# Begin NewBlock #][LinePattern,$]
      // Focus:                       ----------------
      config.blockParamExp = new RegExp( /.*\]\[(.+)\]/ );
      // Template arguments begin string
      // Format: //:This text -()-> m.text
      // Focus:  ---
      config.blockTArgBeginExp = '//:';
      break;
    case 'html':
      // Template Block definition
      // Format: <!--[# Begin NewBlock #]-->
      // Focus:  ------------------------
      config.blockLineExp = new RegExp( /\s*\<\!\-\-\[(#.+#)\]/ );
      // Parameter block definition
      // Format: <!--[# Begin NewBlock #][LinePattern,$]-->
      // Focus:                         ----------------
      config.blockParamExp = new RegExp( /.*\]\[(.+)\]/ );
      // Template arguments begin string
      // Format: <!--:This text -()-> m.text-->
      // Focus:  -----
      config.blockTArgBeginExp = '<!--:';
      // Template arguments end string
      // Format: <!--:This text -()-> m.text-->
      // Focus:                             ---
      config.blockTArgEndExp = '-->';
      break;
    case 'css':
    case 'scss':
      // Template Block definition
      // Format: /*[# Begin NewBlock #]*/
      // Focus:  ------------------------
      config.blockLineExp = new RegExp( /\s*\/\*\[(#.+#)\]/ );
      // Parameter block definition
      // Format: /*[# Begin NewBlock #][LinePattern,$]-*/
      // Focus:                       ----------------
      config.blockParamExp = new RegExp( /.*\]\[(.+)\]/ );
      // Template arguments begin string
      // Format: /*:This text -()-> m.text*/
      // Focus:  ---
      config.blockTArgBeginExp = '/*:';
      // Template arguments end string
      // Format: /*:This text -()-> m.text*/
      // Focus:                           --
      config.blockTArgEndExp = '*/';
    case 'text':
      // Template Block definition
      // Format $$[# Begin NewBlock #]
      // Focus: ----------------------
      config.blockLineExp = new RegExp( /\s*\$\$\[(#.+#)\]/ );
      // Parameter block definition
      // Format: $$[# Begin NewBlock #][LinePattern,$]
      // Focus:                       ----------------
      config.blockParamExp = new RegExp( /.*\]\[(.+)\]/ );
      // Template arguments begin string
      // Format: //:This text -()-> m.text
      // Focus:  ---
      config.blockTArgBeginExp = '$$:';
      break;
    default:
      // Default language is JavaScript
      tgLanguageConfig( 'JavaScript', config );
      break;
  };
}

class TemplateGenerator {
  constructor( template, parentGenerator ) {
    this.parentGenerator = parentGenerator;
    this.setTemplate( template );
    this.clearOutput();
    this.parameterList = [];

    this.replaceList = [];
    this.foundReplace = [];

    this.conf = {
      beginTag:     '# Begin ',
      endTag:       '# End ',
      defineTag:    '# Define ',
      insertTag:    '# Insert ',
      loopBeginTag: '# Loop Begin ',
      loopEndTag:   '# Loop End ',
      //blockLineExp: new RegExp( /\s*\/\/\[(#.+#)\]/ ),
      //blockParamExp: new RegExp( /.*\]\[(.+)\]\s*$/ ),
    };
    // Set default language (JavaScript)
    tgLanguageConfig( '', this.conf );
    // Keep block on undefined data from model
    this.property = {
      language: 'JavaScript',
      isKeepBlockOnNoData: false,
    };
  }
  setLanguage( language ) {
    this.property.language = language;
    tgLanguageConfig( language, this.conf );
  }
  setProperty( propertyName, value ) {
    switch( propertyName ) {
      case 'language':
        this.setLanguage( value ); break;
      default:
        this.property[propertyName] = value; break;
    }
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
    tgGeneratorList[name] = instance;
  }

  /* ---- Generation functions ---- */
  testModel( block, dataModel ) {
    let output = [];
    const blockLen = block.length;
    for( let i = 0; i < blockLen; ++i ) {
      const item = block[i];
      if( typeof( item ) == 'string' ) {
        let blockName = item;
        let data = [];
        if( item.startsWith( 'Loop_Begin_' ) ) {
          if( i < blockLen-1 ) {
            ++i;
            let subItemList = [];
            if( dataModel[blockName] ) {
              subItemList = dataModel[blockName]();
            }
            for( let j = 0; j < subItemList.length; ++j ) {
              const subItem = subItemList[j];
              data = this.testModel( block[i], subItem );
              const o = {};
              o[`${blockName}[${j}]`] = data;
              output.push( o );
            }
          }
        } else {
          if( dataModel[blockName] ) {
            data = dataModel[blockName]();
          }
          // Push output data
          const o = {};
          o[blockName] = data;
          output.push( o );
        }
      }
    }
    return( output );
  }
  getTemplateStructure( endBlockName ) {
    let result = [];
    while( !this.bufferInfo.isEOT ) {
      // Load the next line, looking for Template Tags
      let line = this._getNextBufferLineStr();
      if( !this.bufferInfo.isEOT ) {
        if( endBlockName &&
            line.indexOf( endBlockName ) != -1 ) {
          break;
        }

        // Search for tags like: //[# Begin Block #]
        const lineMatch = line.match( this.conf.blockLineExp );
        if( lineMatch && lineMatch[1] ) {
          const startBlockName = lineMatch[1];
          const funcName = startBlockName.substring( 2, startBlockName.length-2 ).replaceAll( ' ', '_' );

          result.push( funcName );
          if( startBlockName.startsWith( this.conf.defineTag ) ) { // Case of Define
            // Nothing to do
          } else if( startBlockName.startsWith( this.conf.insertTag ) ) { // Case of Insert
            // Nothing to do
          } else if( startBlockName.startsWith( this.conf.beginTag ) ) { // Case of Begin
            const subEndBlockName = this.conf.endTag+startBlockName.substring( this.conf.beginTag.length );
            const block = this.getTemplateStructure( subEndBlockName );
            if( block.length > 0 ) {
              result.push( block );
            }
          } else if( startBlockName.startsWith( this.conf.loopBeginTag ) ) { // Case of Loop Begin
            const subEndBlockName = this.conf.loopEndTag+startBlockName.substring( this.conf.loopBeginTag.length );
            const block = this.getTemplateStructure( subEndBlockName );
            if( block.length > 0 ) {
              result.push( block );
            }
          }
        }
      }
    }
    return( result );
  }
  process( m ) {
    while( !this.bufferInfo.isEOT ) {
      // Load the next line, looking for Template Tags
      let line = this._getNextBufferLineStr();
      if( !this.bufferInfo.isEOT ) {
        // Search for tags like: //[# Begin Block #]
        const lineMatch = line.match( this.conf.blockLineExp );
        if( lineMatch && lineMatch[1] ) {
          // Get matched part
          const startBlockName = lineMatch[1];
          // Get indentation
          const lineIndentCount = this._getLineIndentation( line );
          // Search for tags parameters: //[# Begin Block #][Param,%]
          let patternGenerator = tgGeneratorList['LinePattern'];
          const paramMatch = line.match( this.conf.blockParamExp );
          patternGenerator.setDefaultParams();
          if( paramMatch && paramMatch[1] ) {
            const param = paramMatch[1];
            const commaIdx = param.indexOf( ',' );
            if( commaIdx != -1 ) {
              const genName = param.substring( 0, commaIdx );
              patternGenerator = tgGeneratorList[ genName ];
              const paramStr = param.substring( commaIdx+1 );
              patternGenerator.setParams( paramStr );
            } else {
              patternGenerator = tgGeneratorList[ param ];
              patternGenerator.setDefaultParams();
            }
          }

          // Get model's function name related to found tag
          const funcName = startBlockName.substring( 2, startBlockName.length-2 ).replaceAll( ' ', '_' );
          if( startBlockName.startsWith( this.conf.defineTag ) ) {
            // Case "Define"
            const b = this.extractNextLine( false );
            if( m[funcName] ) {
              const data = m[funcName]();
              if( data != undefined ) {
                // If data is defined => we apply the pattern
                patternGenerator.doReplace( b, data );
                b.generate();
              } else if( this.property.isKeepBlockOnNoData ) {
                // In this case, we have no data and the isKeep is on
                // ==> we generate the template content
                this.generate( b.getTemplate() );
              }
            }
          } else if( startBlockName.startsWith( this.conf.insertTag ) ) {
            // Case "Insert"
            if( m[funcName] ) {
              const indentArray = (stringArr)=> {
                for( let i = 0; i < stringArr.length; ++i ) {
                  stringArr[i] = ' '.repeat( lineIndentCount )+stringArr[i];
                }
              }
              let data = m[funcName]();
              if( ( data != undefined ) && ( data.length > 0 ) ) {
                // If data is defined => we apply the pattern
                if( Array.isArray( data[0] ) ) {
                  // Case of data = [ ['line1', 'line2, ...], ['line11', 'line22', ...], ...]
                  for( const dataBlock of data ) {
                    if( lineIndentCount ) {
                      indentArray( dataBlock );
                    }
                    this.generate( dataBlock );
                  } 
                } else {
                  // Case of data = ['line1', 'line2, ...]
                  if( lineIndentCount ) {
                    indentArray( data );
                  }
                  this.generate( data );
                }
              } else if( this.property.isKeepBlockOnNoData ) {
                // In this case, we have no data and the isKeep is on
                // ==> we generate the template content
                this.generate( b.getTemplate() );
              }
            }
          } else if( startBlockName.startsWith( this.conf.beginTag ) ) {
            // Case "Begin"
            const endBlockName = this.conf.endTag+startBlockName.substring( this.conf.beginTag.length );
            const b = this.extractNextLineBlock( false, '', endBlockName );
            if( m[funcName] ) {
              const data = m[funcName]();
              if( data != undefined ) {
                patternGenerator.doReplace( b, data );
                b.generate();
              } else if( this.property.isKeepBlockOnNoData ) {
                // In this case, we have no data and the isKeep is on
                // ==> we generate the template content
                this.generate( b.getTemplate() );
              }
            }
          } else if( startBlockName.startsWith( this.conf.loopBeginTag ) ) {
            // Case "Loop"
            const endBlockName = this.conf.loopEndTag+startBlockName.substring( this.conf.loopBeginTag.length );
            const b = this.extractNextLineBlock( false, '', endBlockName );
            if( m[funcName] ) {
              const data = m[funcName]();
              if( data != undefined ) {
                for( const item of data ) {
                  b.process( item );
                  b.generate();
                }
              } else if( this.property.isKeepBlockOnNoData ) {
                // In this case, we have no data and the isKeep is on
                // ==> we generate the template content
                this.generate( b.getTemplate() );
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
  extractNextLine( trimIndentation, searchStr, isExcludeMatch ) {
    isExcludeMatch = ( isExcludeMatch === undefined? true: isExcludeMatch );
    let blockInfo = { paramList: [], lineList: [] };
    let line = null;
    let trimCount = 0;
    if( searchStr ) {
      line = this._getStartLine( searchStr );
      if( trimIndentation ) {
        trimCount = this._getLineIndentation( line );
      }
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
    if( trimCount ) {
      // If we need to trim, we trim indentation
      for( let i = 0; i < blockInfo.lineList.length; ++i ) {
        blockInfo.lineList[i] = blockInfo.lineList[i].substring( trimCount );
      }
    }
    const result = new TemplateGenerator( blockInfo.lineList, this );
    result.setParameterList( blockInfo.paramList );
    return( result );
  }
  // Extract the next available lines that are between startStr and endStr
  extractNextLineBlock( trimIndentation, startStr, endStr, isExcludeMatch ) {
    isExcludeMatch = ( isExcludeMatch === undefined? true: isExcludeMatch );
    let blockInfo = { paramList: [], lineList: [] };
    let line = null;
    let trimCount = 0;
    if( startStr ) {
      line = this._getStartLine( startStr );
      if( trimIndentation ) {
        trimCount = this._getLineIndentation( line );
      }
    }
    if( !this.bufferInfo.isEOT ) { // If we did not reached EOT, we found the startStr
      if( !isExcludeMatch && line != null ) {
        blockInfo.lineList.push( line );
      }
      if( line == null || ( endStr && ( line.indexOf( endStr ) == -1 ) ) ) {
        // If the endStr is not in the same line we search the next lines
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
    if( trimCount ) {
      // If we need to trim, we trim indentation
      for( let i = 0; i < blockInfo.lineList.length; ++i ) {
        blockInfo.lineList[i] = blockInfo.lineList[i].substring( trimCount );
      }
    }
    const result = new TemplateGenerator( blockInfo.lineList, this );
    result.setParameterList( blockInfo.paramList );
    return( result );
  }
  // Extract the next available block between startStr and endStr and push back 
  // the line with matching delimiters
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
        //if( isFirstLine && trimline.startsWith( '//:' ) ) {
        if( isFirstLine && trimline.startsWith( this.conf.blockTArgBeginExp ) ) {
          if( blockInfo ) {
            //const idx = line.indexOf( '//:' );
            const tArgBeginLen = this.conf.blockTArgBeginExp.length;
            const idx = line.indexOf( this.conf.blockTArgBeginExp );
            const indentation = ' '.repeat( idx );  // Preserve indentation

            let endIdx = line.length;
            if( this.conf.blockTArgEndExp ) {
              const tempEndIdx = line.lastIndexOf( this.conf.blockTArgEndExp );
              if( tempEndIdx != -1 ) {
                endIdx = tempEndIdx;
              }
            }
            const paramLine = line.substring( idx+tArgBeginLen, endIdx ); // tArgBeginLen is length of '//:'
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
  _getLineIndentation( line ) {
    if( !line ) { 
      return( 0 );
    } else { 
      return( line.search(/\S/) );
    }
  }
}  

if( !window ) {
  module.exports = TemplateGenerator;
}