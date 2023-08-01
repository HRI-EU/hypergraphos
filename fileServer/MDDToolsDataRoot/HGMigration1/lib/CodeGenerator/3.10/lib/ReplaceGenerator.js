class ReplaceGenerator {
  doReplace( templateObj, m ) {
    for( const param of templateObj.parameterList ) {
      const replaceParam = this._getReplaceParam( param );
      if( replaceParam ) {
        let value = replaceParam.valueEval;
        if( value.startsWith( 'm.' ) ) {
          value = eval( value );
        }
        if( value != undefined ) {
          this._replace( templateObj, replaceParam.searchStr, value, replaceParam.searchContext );
        }
      }
    }
  }
  setParams( params ) {
  }
  setDefaultParams() {
  }
  /* ---- Private funcions ---- */
  _getReplaceParam( line ) {
    let result = null;
    // 2 cases:
    //   //:dir -()-> m.varName
    //   //:dir -( dir = )-> m.className
    const replaceExp = new RegExp( /\s*(.*)\s+-\((.*)\)->\s+(.*)\s*/ );
    const replaceMatch = replaceExp.exec( line );
    if( replaceMatch ) {
      if( replaceMatch[1] ) {
        // Extracted Fields
        let searchStr = replaceMatch[1];
        if( searchStr.startsWith( '\'') && searchStr.endsWith( '\'' ) ) {
          searchStr = searchStr.substring( 1, searchStr.length-1 );
        }
        const searchContext = ( replaceMatch[2]? replaceMatch[2]: '' );
        let valueEval = ( replaceMatch[3]? replaceMatch[3]: '' );
        if( valueEval.startsWith( '\'') && valueEval.endsWith( '\'' ) ) {
          valueEval = valueEval.substring( 1, valueEval.length-1 );
        }
        result = { searchStr, searchContext, valueEval };
      }
    }
    return( result );
  }
  /* ---- Template manipulation functions ---- */
  _replaceEx( template, searchExpr, value, isReplaceAll ) {
    isReplaceAll = ( isReplaceAll? true: false );
    if( Array.isArray( searchExpr ) ) {
      for( const searchStrItem of searchExpr ) {
        this.replace( searchStrItem, value, isReplaceAll );
      }
    } else {
      for( let i = template.bufferInfo.index+1; i < template.bufferInfo.templateLen; ++i ) {
        const line = template.bufferInfo.template[i];
        if( line.match( searchExpr ) != -1 ) {
          if( isReplaceAll ) {
            template.bufferInfo.template[i] = line.replaceAll( new RegExp( searchExpr ) , value );
          } else {
            template.bufferInfo.template[i] = line.replace( new RegExp( searchExpr ), value );
          }
        }
      }
    }
  }
  // Replace searchStr with a value, optionaly in a search context
  _replace( template, searchStr, value, searchContext, isReplaceAll ) {
    isReplaceAll = ( isReplaceAll? true: false );
    // If we specify a context to search, then
    // - value get the value of the replaced searchStr with value
    // - searchStr get the value of searchContext
    if( Array.isArray( searchStr ) ) {
      for( const searchStrItem of searchStr ) {
        this.replace( searchStrItem, value, searchContext, isReplaceAll );
      }
    } else {
      if( searchContext ) {
        value = searchContext.replace( searchStr, value );
        searchStr = searchContext;
      }
      for( let i = template.bufferInfo.index+1; i < template.bufferInfo.templateLen; ++i ) {
        const line = template.bufferInfo.template[i];
        if( line.indexOf( searchStr ) != -1 ) {
          // TODO: search only identifiers with searchStr
          if( isReplaceAll ) {
            template.bufferInfo.template[i] = line.replaceAll( searchStr, value );
          } else {
            template.bufferInfo.template[i] = line.replace( searchStr, value );
          }
        }
      }
    }
  }
  _replaceWithLines( template, searchStr, valueList ) {
    for( let i = template.bufferInfo.index+1; i < template.bufferInfo.templateLen; ++i ) {
      const line = template.bufferInfo.template[i];
      const pos = line.indexOf( searchStr );
      if( pos != -1 ) {
        let firstLineStart = template.bufferInfo.template[i].substring( 0, pos );
        const firstLineEnd = template.bufferInfo.template[i].substring( pos+searchStr.length );
        let insertLine = i;
        if( valueList.length > 0 ) {
          const indentStr = ' '.repeat( pos );
          firstLineStart = firstLineStart+valueList[0];
          for( let j = 1; j < valueList.length; ++j ) {
            let valueLine = indentStr+valueList[j].trimStart();
            if( j == valueList.length-1 ) {
              valueLine = valueLine+firstLineEnd;
            }
            template.bufferInfo.template.splice( ++insertLine, 0, valueLine );
          }
          template.bufferInfo.templateLen += valueList.length-1;
        } else {
          firstLineStart = firstLineStart+firstLineEnd;
        }
        template.bufferInfo.template[i] = firstLineStart;
        i = insertLine;
      }
    }
  }
  _replaceAll( searchStr, value, searchContext ) {
    this.replace( searchStr, value, searchContext, true );
  }
}

var window;

if( !window ) {
  module.exports = new ReplaceGenerator();
}