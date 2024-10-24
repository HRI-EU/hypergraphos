/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
=============================================================================
Module: HyperGraphOS Manager of Change Status and Saving Process for Editors
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
  editorHasChanged( isAllowChange ) {
    const isSystemReadOnly = getSystemReadOnly();
    const isGlobalReadOnly = getGlobalReadOnly();
    // We allow changes to be triggered if:
    // - We are not in PauseChange
    // - We are not in a global read only (where either graph or system are readOnly)
    // - or we are asked to allow change by isAllowChange and system is not readOnly
    if( ( !this.isPauseChage && !isGlobalReadOnly ) ||
        ( isAllowChange && !isSystemReadOnly ) ) {
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
    setSystemSaved();
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
