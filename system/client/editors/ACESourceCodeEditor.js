/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Ace Editor Interface
Date: 10.07.2020
=============================================================================
*/

class ACESourceCodeEditor {
  constructor( editorDivId ) {
    // Create editor instance
    this.aceEditor = ace.edit( editorDivId );
    this.setEditorTheme( 'tomorrow_night' );

    // Set shortcut
    const tww = {
      name: 'toogleWrapMode', 
      bindKey: { win: 'Alt-Z', mac: 'Option-Z' }, 
      exec: function(ed) {
              const wrapMode = ed.getOption( 'wrap' );
              ed.setOption( 'wrap', ( wrapMode == 'off'? true: false ) );
            }
    };
    this.aceEditor.commands.addCommand( tww ); 

    // Set default mode to javascript
    this.aceEditor.getSession().setMode( 'ace/mode/javascript' );

    // Set soft tab to 2 spaces
    this.aceEditor.getSession().setUseSoftTabs(true);
    this.aceEditor.getSession().setTabSize(2);
  }
  isReadOnly() {
    return( this.aceEditor.getReadOnly() );
  }
  setReadOnly( status ) {
    this.aceEditor.setReadOnly( status );
  }
  setEditorTheme( name ) {
    // Set editor theme
    this.aceEditor.setTheme( 'ace/theme/'+name );
  }
  setEditorSource( source ) {
    // Get current folding status
    const currFold = this.aceEditor.session.getAllFolds().map( fold => fold.range );
    // Get current cursor position
    const cursorPos = this.aceEditor.getCursorPosition();
    // Set editor source
    this.aceEditor.setValue( source, cursorPos, -1 );
    // Restore current folding status
    currFold.forEach( range => this.aceEditor.session.addFold( '...', range ) );
    // Restore current cursor position
    this.aceEditor.moveCursorTo( cursorPos.row, cursorPos.column );
    this.aceEditor.clearSelection();
  }
  getEditorSource() {
    return( this.aceEditor.getValue() );
  }
  getEditorSourceNumLines() {
    return( this.aceEditor.session.getLength() );
  }
  getCurrentLine() {
    const currline = this.aceEditor.getSelectionRange().start.row
    return( currline );
  }
  getCurrentSelectionLines() {
    const currSelStartLine = this.aceEditor.getSelectionRange().start.row;
    const currSelEndLine = this.aceEditor.getSelectionRange().end.row;
    return( { start: currSelStartLine, end: currSelEndLine } );
  }
  getCurrentLineText() {
    const currline = this.aceEditor.getSelectionRange().start.row;
    let lineText = this.aceEditor.session.getLine( currline );
    return( lineText );
  }
  getLineTextAt( lineIndex ) {
    let lineText = this.aceEditor.session.getLine( lineIndex );
    return( lineText );
  }
  onSourceChanged( onSourceChangedCallback ) {
    this.aceEditor.getSession().on( 'change', onSourceChangedCallback );
  }
  onEvent( eventName, callback ) {
    this.aceEditor.on( eventName, callback );
  }
  setEditorMode( mode ) {
    this.aceEditor.getSession().setMode( mode );
  }
  getEditorMode( codeType )
  {
    const t = ( codeType != undefined? codeType.toLowerCase(): codeType );
    switch( t ) {
      case '':
      case undefined:
      case 'text':
      case 'txt':
        return 'ace/mode/text';
        //  break;
      case 'html':
        return 'ace/mode/html';
      //  break;
      case 'css':
        return 'ace/mode/css';
      //  break;
      case 'scss':
        return 'ace/mode/scss';
      //  break;
      case 'js':
      case 'javascript':
      case 'jscript':
        return 'ace/mode/javascript';
      //  break;
      case 'php':
        return 'ace/mode/php';
      //  break;
      case 'py':
      case 'python':
        return 'ace/mode/python';
      //  break;
      case 'c':
        return 'ace/mode/c_cpp';
      //  break;
      case 'h':
        return 'ace/mode/c_cpp';
      //  break;
      case 'hpp':
      case 'h++':
        return 'ace/mode/c_cpp';
      //  break;
      case 'cpp':
      case 'c++':
        return 'ace/mode/c_cpp';
      //  break;
      case 'java':
        return 'ace/mode/java';
      //  break;
      default:
        return 'ace/mode/'+t ;
    }
  }
}