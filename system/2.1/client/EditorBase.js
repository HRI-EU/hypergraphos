/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
=============================================================================
Module: HyperGraphOS Editors and Viewers Base
Date: 10.07.2020
=============================================================================
*/

class EditorBase extends EditorChangeManager {
  constructor() {
    super( 10 ); // TODO: set to 10 // Saving timeout: 10 seconds
    this.nodeData = null;
    this.title = '';
    this.parentGraph = null;
    // Last modification time of the currently loaded graph 
		// from the server (file modification time)
		this.mtime = null;
  }
  //setTitle( title, fileType ) {
  setTitle( nodeData ) {
    const fileType = ( nodeData.fileType? nodeData.fileType: 'text/text' );
    let title = ( nodeData.label? nodeData.label: nodeData.key );
    title = ( title.length > 45? title.substring( 0, 45 )+'...': title )+
            ` [${fileType}]`;
    this.title = title;

    if( this.editor instanceof WinBox ) {
      this.editor.setTitle( title );
    } else if( this.editor && ( this.editor.opener == window ) ) {
      // Not possible
    } else {
      const element = document.querySelector( `#${this.id} .title` );
      if( element ) {
        element.innerHTML = title;
      }
    }
  }
  setParentGraph( nodeData ) {
    this.parentGraph = nodeData;
  }
  getParentGraph() {
    return( this.parentGraph );
  }
  storeWindowPosition() {
    if( this.id != config.htmlDiv.graphDiv ) {
      const ei = m.e.getEditorInfo( this.id ) ;
      if( ei ) {
        m.e.saveWindowPosition( this.id, this.nodeData, this.isPin() );
      }
    }
  }
  setPinOn() {
    m.e.pinEditor( this.id, true );
  }
  isPin() {
    const pw = getStatus( 'pinnedWindow' );
    const nodeData = pw[this.nodeData.fileURL];
    return( ( nodeData != undefined ) && ( nodeData.key == this.nodeData.key ) );
  }
  onClosing() {
    //console.log( 'Closing the Editor' );
  }
  showSaveButton( status ) {
    status = ( status == undefined? true: status );
    const element = document.querySelector( `#${this.id} .editorDivBSave` );
    element.style.visibility = ( status? 'visible': 'hidden' );
  }
  getSourceLastModificationTime() {
		return( this.mtime );
	}
	setSourceLastModificationTime( mtime ) {
		this.mtime = mtime;
	}
  doLoadLastUpdateTime( nodeData, onTimeUpdated ) {
    const onFileInfo = ( fileInfo )=> {
      // Store fileInfo last modification date if available
      if( fileInfo.mtime ) {
        this.setSourceLastModificationTime( fileInfo.mtime );
      }
      if( onTimeUpdated ) {
        onTimeUpdated( nodeData );
      }
    };
    // Get last modification time of loaded node (file) from server
    getNodeInfoFromServer( nodeData, onFileInfo );
  }
  doCheckLastUpdateTime( nodeData, onTimeChecked ) {
    const onFileInfo = ( fileInfo )=> {
      // Parameter of callback
      let doAbortSave = false;
      // Get current graph last modificatio time at loading of the graph
      const editorMTime = this.getSourceLastModificationTime();
      // If we get info
      if( fileInfo.mtime && editorMTime ) {
        const editorTime = new Date( editorMTime ).getTime();
        // Last modification time of last version of file from server
        const fInfoTime = new Date( fileInfo.mtime ).getTime();
        // If time from server is newer than current time ==> inform we may override
        if( fInfoTime > editorTime ) {
          const label = nodeData.label;
          const isDoOverwrite = confirm( `${label} in the server is newer than current graph. Do you want to overwrite?` );
          doAbortSave = !isDoOverwrite;
        }
      }
      if( onTimeChecked ) {
        onTimeChecked( doAbortSave );
      }
    };
    // Get last modification time of loaded node (file) from server
    getNodeInfoFromServer( nodeData, onFileInfo );
  }
}