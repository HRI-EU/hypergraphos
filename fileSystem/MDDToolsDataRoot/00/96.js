   // If node is not file or dir => nothing to do
    if( !nodeData.isFile && !nodeData.isDir ) {
      return;
    }
    // Find an editor for name or type
    let editorInfo = null;
    if( name ) {
      // Search for name
      for( const editor of this.registeredEditorList ) {
        if( editor.name == name ) {
          editorInfo = editor;
          break;
        }
      }
    } else {
      // Serarch for type
      const fileType = ( nodeData.fileType? nodeData.fileType: 'text/text' );
      for( const editor of this.registeredEditorList ) {
        if( editor.fileType( fileType ) ) {
          editorInfo = editor;
          break;
        }
      }
    }