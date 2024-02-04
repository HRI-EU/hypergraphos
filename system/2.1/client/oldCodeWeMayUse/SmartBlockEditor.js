/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools EditorJS Interface
Date: 10.10.2020
=============================================================================
*/

// Used to create unique div Id names
// This variable must be global to ensure a unique index for all 
// opened SmartBlock instances
let SmartBlockEditor_divIndex = 0;

class SmartBlockEditor {
  constructor( editorDivId ) {
    this.originalEditorDivId = editorDivId;
    this.editorDivId = editorDivId;

    // We should not instantiate an editor at start.
    // Editor should be initialized in the setEditorSource
    this.editorDiv = document.getElementById( this.editorDivId );
    this.editorDiv.style.backgroundColor = '#f2f2f4';

    // Default document source for blank documents
    this.defaultSource = '<h2>Title Here</h2>'+
                         '<p>Type document content here...</p>';

    // Add Custom Block to SmartBlock extensions
    const cbInfo = {
      tagName: 'div',
      className: 'acms-alert',
      customName: 'alert',
      icon: '!',
    };
    const cb = new SmartBlock.CustomBlock( cbInfo );
    SmartBlock.Extensions.push( cb );
  
    // Change handler
    this.onSourceChangedCallback = null;
    this.currentSource = this.defaultSource;
  }
  isReadOnly() {
    return( false );
  }
  setReadOnly( status ) {
    // Check how to set read only
  }
  setEditorSource( source ) {
    if( !source ) {
      // Default document content
      source = this.defaultSource;
    }
    try {
      // Clean div content
      //this.editorDiv.remove();
      // Create a new div for connecting the SmartBlock editor
      //this.editorDivId = this.originalEditorDivId+(SmartBlockEditor_divIndex++);
      //const newDiv = document.createElement( 'div' );
      //newDiv.id = this.editorDivId;
      //newDiv.className = 'editorDiv';
      //const parentDiv = this.editorDiv.parentElement;
      //parentDiv.appendChild = newDiv;

      // Create the SmartBlock editor
      const sbInfo = {
        html: source,
        extensions: SmartBlock.Extensions,
        onChange: this._onChangeCallback.bind(this),
      };
      SmartBlock.Editor( `#${this.editorDivId}`, sbInfo );

      this.currentSource = source;
    } catch ( error ) {
      // Nothing to do, no source loaded in this case
      console.log( 'Error: could not load EditorJS source' );
    }
  }
  getEditorSource( callback ) {
    return( this.currentSource );
  }
  getEditorSourceNumLines() {
    return( 10 ); //this.htmlEditor.session.getLength() );
  }
  getCurrentLine() {
    const currline = ''; //this.htmlEditor.getSelectionRange().start.row
    return( currline );
  }
  getCurrentSelectionLines() {
    //const currSelStartLine = this.htmlEditor.getSelectionRange().start.row;
    //const currSelEndLine = this.htmlEditor.getSelectionRange().end.row;
    //return( { start: currSelStartLine, end: currSelEndLine } );
    return( { start: 0, end: 0 } );
  }
  getCurrentLineText() {
    //const currline = this.htmlEditor.getSelectionRange().start.row;
    let lineText = ''; //this.htmlEditor.session.getLine( currline );
    return( lineText );
  }
  getLineTextAt( lineIndex ) {
    let lineText = ''; //this.htmlEditor.session.getLine( lineIndex );
    return( lineText );
  }
  onSourceChanged( onSourceChangedCallback ) {
    this.onSourceChangedCallback = onSourceChangedCallback;
  }
  onEvent( eventName, callback ) {
    //this.htmlEditor.on( eventName, callback );
  }
  _onChangeCallback( result ) {
    // Update current source
    //console.log(result.json, result.html);
    this.currentSource = result.html;

    // Trigger change event
    if( this.onSourceChangedCallback ) {
      this.onSourceChangedCallback();
    }
  }
}
