/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Manager of Change Status and Saving Process for Editors
Date: 10.07.2020
=============================================================================
*/

class EditorChangeManager {
  constructor( saveTimeOut ) {
    this.isPauseChage = false;
    this.changeCount = 0;
    this.saveTimer = null;
    this.saveTimeOut = saveTimeOut*1000;
    this.onDoSaveCallback = null;
    this.onNeedSaveCallback = null;
  }
  setPauseChange( status ) {
    this.isPauseChage = status;
  }
  editorHasChanged() {
    if( !this.isPauseChage ) {
      if( EditorChangeManager.unsavedEditor[this.id] == undefined ) {
        EditorChangeManager.unsavedEditor[this.id] = 0;
      }
      ++EditorChangeManager.unsavedEditor[this.id];
      if( EditorChangeManager.onGlobalNeedSaveCallback ){
        EditorChangeManager.onGlobalNeedSaveCallback();
      }
      ++this.changeCount;
      this.isEditorSaved = true;
      // Skip the first change that correspond to the
      // loading of the editor with a new content
      //if( this.changeCount > 1 ) {
        this._startSaveTimer();
      //}
      const keys =  Object.keys( EditorChangeManager.unsavedEditor );
    }
  }
  isNeedSave() {
    return( EditorChangeManager.unsavedEditor[this.id] == undefined? false: true );
  }
  onDoSave( callback ) {
    this.onDoSaveCallback = callback;
  }
  onNeedSave( callback ) {
    this.onNeedSaveCallback = callback;
  }
  editorSaved() {
    this.clearStatus();
    // TODO: count all saved/unsaved file. We can show the orange frame if all 
    // editor are saved. All!
    delete EditorChangeManager.unsavedEditor[this.id];
    const idList = Object.keys( EditorChangeManager.unsavedEditor );
    if( idList.length == 0 ) {
      if( EditorChangeManager.onGlobalIsSavedCallback ){
        EditorChangeManager.onGlobalIsSavedCallback();
      }
    }
  }
  suggestToSave() {
    if( this.saveTimer ) {
      this._clearSaveTimer();
      this._signalToSave();
    }
  }
  clearStatus() {
    if( this.saveTimer ) {
      this._clearSaveTimer();
      this.isChanged = false;
      this.changeCount = 0;
    }
  }
  _startSaveTimer() {
    this._clearSaveTimer();
    if( this.saveTimeOut > 0 ) {
      this.saveTimer = setTimeout( this._signalToSave.bind(this), this.saveTimeOut );
      if( this.onNeedSaveCallback ) {
        this.onNeedSaveCallback();
      }
    }
  }
  _clearSaveTimer() {
    if( this.saveTimer ) {
      clearTimeout( this.saveTimer );
      this.saveTimer = null;
    }
  }
  _signalToSave() {
    if( this.onDoSaveCallback ) {
      this.onDoSaveCallback();
    }
  }
}
EditorChangeManager.unsavedEditor = {};
EditorChangeManager.onGlobalNeedSaveCallback = null;
EditorChangeManager.onGlobalIsSavedCallback = null;
EditorChangeManager.onGlobalNeedSave = function( callback ) {
  EditorChangeManager.onGlobalNeedSaveCallback = callback;
};
EditorChangeManager.onGlobalIsSaved = function( callback ) {
  EditorChangeManager.onGlobalIsSavedCallback = callback;
};
