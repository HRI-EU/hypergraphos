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

class BlockCodeEditor {
  constructor( editorDivId ) {
    this.editorDivId = editorDivId;
    // We should not instantiate an editor at start.
    // Editor should be initialized in the setEditorSource
    this.editorDiv = document.getElementById( this.editorDivId );
    this.editorDiv.style.backgroundColor = '#f6f0e4';

    // Change handler
    this.onSourceChangedCallback = null;
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
      source = `{"blocks": [{"type": "paragraph","data": {"text": "Type document content here..."}}]}`;
    }
    try {
      const objSource = JSON.parse( source );
      this.editorDiv.innerHTML = '';
      const editorParam = this._getEditorParams();
      editorParam.data = objSource;
      this.htmlEditor = new EditorJS( editorParam );
    } catch ( error ) {
      // Nothing to do, no source loaded in this case
      console.log( 'Error: could not load EditorJS source' );
    }
  }
  getEditorSource( callback ) {
    if( callback ) {
      //this.htmlEditor.save().then(( objSource )=> console.log( source ) );
      this.htmlEditor.save().then( callback );
    }
    return( null );
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
  _getEditorParams() {
    return({
      /**
       * Enable/Disable the read only mode
       */
        readOnly: false,
      /**
       * Id of Element that should contain Editor instance
       */
      holder: this.editorDivId,
      /**
       * Tools list
       */
        tools: {
        /**
         * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
         */
        header: {
          class: Header,
          inlineToolbar: ['link'],
          config: {
            placeholder: 'Header'
          },
          shortcut: 'CMD+SHIFT+H'
        },

        /**
         * Or pass class directly without any configuration
         */
        image: {
          class: SimpleImage,
          inlineToolbar: ['link'],
        },

        list: {
          class: List,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L'
        },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },

        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
          shortcut: 'CMD+SHIFT+O'
        },

        warning: Warning,

        marker: {
          class:  Marker,
          shortcut: 'CMD+SHIFT+M'
        },

        code: {
          class:  CodeTool,
          shortcut: 'CMD+SHIFT+C'
        },

        delimiter: Delimiter,

        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C'
        },

        linkTool: LinkTool,

        embed: Embed,

        table: {
          class: Table,
          inlineToolbar: true,
          shortcut: 'CMD+ALT+T'
        },

      },
      data: {  // Source of an empty document
        blocks: [],
      }, 
      onChange: ( api, event )=> {
        if( this.onSourceChangedCallback ) {
          this.onSourceChangedCallback();
        }
        //console.log( 'something changed', event );
      },
    });
  }
}
