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

class ExploreEditorWrapper {
  constructor( editorDivId ) {
    this.editorDivId = editorDivId;
    // We should not instantiate an editor at start.
    // Editor should be initialized in the setEditorSource
    this.editorDiv = document.getElementById( this.editorDivId );
    this.editorDiv.style.backgroundColor = '#f6f0e4';

    // Instantiate Editor
    const editorParams = this._getEditorParams();
    this.explorerEditor = ExploreEditor.create( this.editorDiv, editorParams );
    this.isReadOnly = false;

    // Change handler
    this.onSourceChangedCallback = null;
  }
  isReadOnly() {
    return( this.isReadOnly );
  }
  setReadOnly( status ) {
    this.isReadOnly = status;
    if( this.isReadOnly ) {
      this.explorerEditor.disabled();
    } else {
      this.explorerEditor.enabled();
    }
    // Check how to set read only
  }
  setEditorSource( source ) {
    this.explorerEditor.setContents( source );
  }
  getEditorSource( callback ) {
    return( this.explorerEditor.getContents() );
  }
  getEditorSourceNumLines() {
    // TODO: to be implemented
    return( 0 ); //this.htmlEditor.session.getLength() );
  }
  getCurrentLine() {
    // TODO: to be implemented
    const currline = ''; //this.htmlEditor.getSelectionRange().start.row
    return( currline );
  }
  getCurrentSelectionLines() {
    // TODO: to be implemented
    //const currSelStartLine = this.htmlEditor.getSelectionRange().start.row;
    //const currSelEndLine = this.htmlEditor.getSelectionRange().end.row;
    //return( { start: currSelStartLine, end: currSelEndLine } );
    return( { start: 0, end: 0 } );
  }
  getCurrentLineText() {
    // TODO: to be implemented
    //const currline = this.htmlEditor.getSelectionRange().start.row;
    let lineText = ''; //this.htmlEditor.session.getLine( currline );
    return( lineText );
  }
  getLineTextAt( lineIndex ) {
    // TODO: to be implemented
    let lineText = ''; //this.htmlEditor.session.getLine( lineIndex );
    return( lineText );
  }
  onSourceChanged( onSourceChangedCallback ) {
    this.explorerEditor.onChange = onSourceChangedCallback;
  }
  onEvent( eventName, callback ) {
    // TODO: to be implemented
    //this.htmlEditor.on( eventName, callback );
  }
  _getEditorParams() {
    return({
      width: 'auto',
      height: 'auto',
      mode: 'inline',
      //lang: ExploreEditor_LANG['en'],
      //plugins: plugins,
      katex: katex,
      toolbarItem: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 
         'superscript', 'fontColor', 'hiliteColor'],
        ['outdent', 'indent', 'align', 'list', 'horizontalRule'],
        ['link', 'table', 'image', 'audio', 'video'],
        //'/', // Line break
        ['lineHeight', 'paragraphStyle', 'textStyle'],
        ['showBlocks', 'codeView'],
        ['math'],
        ['preview', 'print', 'fullScreen'],
        ['save', 'template'],
        ['removeFormat']
      ],
      templates: [
        {
        name: 'Template-1',
        html: '<p>HTML source1</p>'
        },
        {
        name: 'Template-2',
        html: '<p>HTML source2</p>'
        },
      ],
      charCounter: true,
    });
  }
}
