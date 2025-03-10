/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
=============================================================================
Module: HyperGraphOS Ace Editor Interface
Date: 10.07.2020
=============================================================================
*/

class HChatWrapper {
  constructor( editorDivId ) {
    // Create editor instance
    this.hchatEditor = new HChat( editorDivId, '100%', '100%' );
  }
  isReadOnly() {
    return( false );
  }
  setReadOnly( status ) {
    // TODO
  }
  setEditorTheme( name ) {
    // TODO
  }
  setEditorSource( source ) {
    let msgData = source;
    if( typeof( source ) == 'string' ) {
      try {
        msgData = JSON.parse( source );
      } catch( error ) {}
    }
    if( msgData.userInfoList ) {
      msgData.userInfoList.forEach( ui=> {
        const url = ui.imageURL.replace( '~', HChat.path );
        this.hchatEditor.addUser( ui.userName, url, ui.userColor,
                                  ui.isSender, ui.isReceiver)
      });
    }
    if( msgData.history ) {
      this.hchatEditor.setHistory( msgData.history );
    }
  }
  getEditorSource() {
    const result = { userInfoList: [], history: [] };
    const userInfoList = this.hchatEditor.getUserInfoList();
    result.history = this.hchatEditor.getHistory( true );
    return( result );
  }
  getEditorSourceNumLines() {
    return( this.hchatEditor.getHistoryLength() );
  }
  getCurrentLine() {
    return( this.hchatEditor.getLastMessage() );
  }
  getCurrentSelectionLines() {
    return( { start: 0, end: 0 } );
  }
  getCurrentLineText() {
    const m = this.hchatEditor.getLastMessage();
    return( `[${m.sender} -> ${m.receiver}] ${m.text}` );
  }
  getLineTextAt( lineIndex ) {
    let msg = this.hchatEditor.getMessageAt( lineIndex );
    return( lineText );
  }
  onSourceChanged( onSourceChangedCallback ) {
    this.hchatEditor.registerEvent( 'onSend', onSourceChangedCallback );
  }
  onEvent( eventName, callback ) {
    this.hchatEditor.registerEvent( 'onSend', callback );
  }
  setEditorMode( mode ) {
    // TODO
  }
}
