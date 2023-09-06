class _em1_ {
  constructor() {
      this.eventList = {}, this.call = {}
  }
  add(t, e, i) {
      t && !this.eventList[t] && (this.eventList[t] = {
          help: e = e || "",
          params: i = i || {},
          callbackList: []
      }, this.call[t] = (...e) => this.fire(t, ...e))
  }
  addList(e) {
      if (e)
          for (const i in e) {
              var t = e[i];
              this.add(i, t.help, t.params)
          }
  }
  register(e, t) {
      e && this.eventList[e] && t && this.eventList[e].callbackList.push(t)
  }
  registerList(e) {
      if (e)
          for (const i in e) {
              var t = e[i];
              this.register(i, t)
          }
  }
  unregister(e, t) {
      e && this.eventList[e] && (null == t ? this.eventList[e] = {
          paramInfo: paramInfo,
          callbackList: []
      } : -1 < (t = this.eventList[e].callbackList.indexOf(t)) && this.eventList[e].callbackList.splice(t, 1))
  }
  fire(e, ...t) {
      if (e && this.eventList[e] && this.eventList[e].callbackList.length)
          for (const i of this.eventList[e].callbackList) i(...t)
  }
}
class _ecm2_ {
  constructor(e) {
      this.isPauseChage = !1, this.changeCount = 0, this.saveTimer = null, this.saveTimeOut = 1e3 * e, this.onDoSaveCallback = null, this.onNeedSaveCallback = null
  }
  _spc19_(e) {
      this.isPauseChage = e
  }
  _shc20_() {
      this.isPauseChage || (null == _ecm2_.unsavedEditor[this.id] && (_ecm2_.unsavedEditor[this.id] = 0), ++_ecm2_.unsavedEditor[this.id], _ecm2_.onGlobalNeedSaveCallback && _ecm2_.onGlobalNeedSaveCallback(), ++this.changeCount, this.isEditorSaved = !0, this._sst25_(), Object.keys(_ecm2_.unsavedEditor))
  }
  _ins21_() {
      return null != _ecm2_.unsavedEditor[this.id]
  }
  onDoSave(e) {
      this.onDoSaveCallback = e
  }
  onNeedSave(e) {
      this.onNeedSaveCallback = e
  }
  _es22_() {
      this._cs24_(), delete _ecm2_.unsavedEditor[this.id], 0 == Object.keys(_ecm2_.unsavedEditor).length && _ecm2_.onGlobalIsSavedCallback && _ecm2_.onGlobalIsSavedCallback()
  }
  _sts23_() {
      this.saveTimer && (this._cst26_(), this._sts27_())
  }
  _cs24_() {
      this.saveTimer && (this._cst26_(), this.isChanged = !1, this.changeCount = 0)
  }
  _sst25_() {
      this._cst26_(), 0 < this.saveTimeOut && (this.saveTimer = setTimeout(this._sts27_.bind(this), this.saveTimeOut), this.onNeedSaveCallback) && this.onNeedSaveCallback()
  }
  _cst26_() {
      this.saveTimer && (clearTimeout(this.saveTimer), this.saveTimer = null)
  }
  _sts27_() {
      this.onDoSaveCallback && this.onDoSaveCallback()
  }
}
_ecm2_.unsavedEditor = {}, _ecm2_.onGlobalNeedSaveCallback = null, _ecm2_.onGlobalIsSavedCallback = null, _ecm2_.onGlobalNeedSave = function(e) {
  _ecm2_.onGlobalNeedSaveCallback = e
}, _ecm2_.onGlobalIsSaved = function(e) {
  _ecm2_.onGlobalIsSavedCallback = e
};
class _eb3_ extends _ecm2_ {
  constructor() {
      super(10), this.nodeData = null, this.title = "", this.parentGraph = null, this.mtime = null
  }
  _st28_(e) {
      e = null != e ? e : this.title;
      var t = document.querySelector(`#${this.id} .title`);
      t && (t.innerHTML = e)
  }
  _spg29_(e) {
      this.parentGraph = e
  }
  getParentGraph() {
      return this.parentGraph
  }
  _swp30_() {
      this.id != config.htmlDiv.graphDiv && m.e.getEditorInfo(this.id) && m.e._swp52_(this.id, this.nodeData, this.isPin())
  }
  setPinOn() {
      m.e.pinEditor(this.id, !0)
  }
  isPin() {
      var e = getStatus("pinnedWindow")[this.nodeData.fileURL];
      return null != e && e.key == this.nodeData.key
  }
  onClosing() {}
  _ssb31_(e) {
      e = null == e || e, document.querySelector(`#${this.id} .editorDivBSave`).style.visibility = e ? "visible" : "hidden"
  }
  _gsl32_() {
      return this.mtime
  }
  _ssl33_(e) {
      this.mtime = e
  }
  _dll34_(t, i) {
      getNodeInfoFromServer(t, e => {
          e.mtime && this._ssl33_(e.mtime), i && i(t)
      })
  }
  _dll34_(o, a) {
      getNodeInfoFromServer(o, e => {
          let t = !1;
          var i = this._gsl32_();
          e.mtime && i && new Date(i).getTime() < new Date(e.mtime).getTime() && (i = o.label, e = confirm(i + " in the server is newer than current graph. Do you want to overwrite?"), t = !e), a && a(t)
      })
  }
}
let _sbe4__divIndex = 0;
class _sbe4_ {
  constructor(e) {
      this.originalEditorDivId = e, this.editorDivId = e, this.editorDiv = document.getElementById(this.editorDivId), this.editorDiv.style.backgroundColor = "#f2f2f4", this.defaultSource = "<h2>Title Here</h2><p>Type document content here...</p>";
      e = new SmartBlock.CustomBlock({
          tagName: "div",
          className: "acms-alert",
          customName: "alert",
          icon: "!"
      });
      SmartBlock.Extensions.push(e), this.onSourceChangedCallback = null, this.currentSource = this.defaultSource
  }
  isReadOnly() {
      return !1
  }
  setReadOnly(e) {}
  setEditorSource(e) {
      e = e || this.defaultSource;
      try {
          var t = {
              html: e,
              extensions: SmartBlock.Extensions,
              onChange: this._onChangeCallback.bind(this)
          };
          SmartBlock.Editor("#" + this.editorDivId, t), this.currentSource = e
      } catch (e) {}
  }
  getEditorSource(e) {
      return this.currentSource
  }
  getEditorSourceNumLines() {
      return 10
  }
  getCurrentLine() {
      return ""
  }
  getCurrentSelectionLines() {
      return {
          start: 0,
          end: 0
      }
  }
  getCurrentLineText() {
      return ""
  }
  getLineTextAt(e) {
      return ""
  }
  onSourceChanged(e) {
      this.onSourceChangedCallback = e
  }
  onEvent(e, t) {}
  _onChangeCallback(e) {
      this.currentSource = e.html, this.onSourceChangedCallback && this.onSourceChangedCallback()
  }
}
const appData = {};
let graphData = {};
const codeFileType = {
  JavaScript: {
      color: "orange",
      fileType: "text/javascript",
      ext: "js"
  },
  Text: {
      color: "yellow",
      fileType: "text/text",
      ext: "txt"
  },
  JSON: {
      color: "orange",
      fileType: "text/json",
      ext: "json"
  },
  XML: {
      color: "orange",
      fileType: "text/xml",
      ext: "xml"
  },
  HTML: {
      color: "lightsalmon",
      fileType: "text/html",
      ext: "html"
  },
  "Web Page": {
      color: "lightsalmon",
      fileType: "application/html",
      ext: "html"
  },
  CSS: {
      color: "peachpuff",
      fileType: "text/css",
      ext: "css"
  },
  Python: {
      color: "firebrick",
      fileType: "text/python",
      ext: "py"
  },
  C: {
      color: "palegreen",
      fileType: "text/c_cpp",
      ext: "c"
  },
  H: {
      color: "palegreen",
      fileType: "text/c_cpp",
      ext: "h"
  },
  "C++": {
      color: "mediumseagreen",
      fileType: "text/c_cpp",
      ext: "cpp"
  },
  "H++": {
      color: "mediumseagreen",
      fileType: "text/c_cpp",
      ext: "hpp"
  },
  "C#": {
      color: "seagreen",
      fileType: "text/c_cpp",
      ext: "cs"
  },
  Binary: {
      color: "white",
      fileType: "application/octet-stream",
      ext: "bin"
  },
  Shell: {
      color: "gray",
      fileType: "application/x-shellscript",
      ext: "sh"
  },
  "Rich Text": {
      color: "aquamarine",
      fileType: "application/explore",
      ext: "html"
  },
  JPEG: {
      color: "lavender",
      fileType: "image/jpeg",
      ext: "jpeg"
  },
  PNG: {
      color: "lavender",
      fileType: "image/png",
      ext: "png"
  },
  GIF: {
      color: "lavender",
      fileType: "image/gif",
      ext: "gif"
  },
  SVG: {
      color: "lavender",
      fileType: "image/svg",
      ext: "svg"
  }
};
let urlParams = {
  name: "DefaultUser"
};

function loadSystem() {
  const urlStrParams = decodeURI(document.location.search.substring(1));
  urlParams = {}, eval(`urlParams = {${urlStrParams}}`), urlParams.name ? document.cookie = JSON.stringify({
      name: urlParams.name
  }) : (cookie = JSON.parse(document.cookie), urlParams.name = cookie.name), scriptList = [`./configs/${urlParams.name}_config.js`, "./ModelExplorer.js"], loadScriptList(scriptList, () => {}, !1)
}

function getFileTypeInfoByName(e) {
  return codeFileType[e] || codeFileType.Binary
}

function getExtByFileType(e) {
  let t = "bin";
  for (const o of Object.keys(codeFileType)) {
      var i = codeFileType[o];
      i.fileType == e && (t = i.ext)
  }
  return t
}

function getNewFileServerURL(e) {
  e = e || "bin";
  let t = m.fileInfo.fileServer,
      i = !1;
  t.currFile >= t.maxFileIndex ? (i = !0, t.currFile = 0) : ++t.currFile;
  e = (t.currFile < 10 ? "0" + t.currFile : t.currFile) + "." + e;
  i && t.currPath++;
  let o = t.currPath.toString();
  var a = o.length,
      a = function(t) {
          let i = "";
          for (let e = 0; e < t.length; e += 2) i = i + "/" + t.substring(e, e + 2);
          return i
      }(o = a % 2 == 1 ? o.substring(0, a - 1) + "0" + o.substring(a - 1) : o),
      a = (setFileIndexStatus(e => e.fileServer = t), document.location.origin, "" + config.host.fileServerURL + a + "/" + e);
  return _saveFile(config.host.fileServerSystemURL + "/fileIndex.json", JSON.stringify(m.fileInfo)), a
}

function loadScriptList(e, t, i) {
  if (Array.isArray(e)) {
      const o = [...e];
      e = o.shift();
      e ? loadScript(e, () => {
          loadScriptList(o, t, i)
      }, i) : t && t()
  } else t && t()
}

function loadScript(e, t, i) {
  i = null == i || i;
  var o = document.getElementById(e),
      o = (o && document.head.removeChild(o), document.createElement("script"));
  o.id = e, o.type = "text/javascript", o.onload = () => {
      t && t()
  }, o.onerror = () => {};
  let a = "";
  i && (i = (new Date).getTime(), a = "?_=" + i), o.src = e + a, document.head.append(o)
}

function loadNodeContent(e, t) {
  var i;
  e.isModel ? (i = e.fileContent, t && t(i)) : null != e.fileURL ? _openFile(e.fileURL, t) : null != e.fileContent ? (i = e.fileContent, t && t(i)) : t && t("")
}

function saveNodeContent(e, t) {
  var i, o;
  e.isModel ? (m.e.getEditor(config.htmlDiv.graphDiv).setJSONModel(e.fileContent), t && t()) : null != e.fileURL ? (i = e.fileEncoding || "utf8", o = e.fileContent, _saveFile(e.fileURL, o, t, i)) : (null != e.fileContent && (o = e.fileContent, setNodeDataField(e.key, "fileContent", o)), t && t())
}

function getNodeInfoFromServer(t, i) {
  if (null != t.fileURL) {
      let e = t.fileURL;
      e.startsWith(config.host.fileServerURL) ? _openFile(e = e.replace(config.host.fileServerURL, config.host.fileStatusURL), e => {
          e = JSON.parse(e);
          i && i(e)
      }, !0) : i && i({})
  } else i && i({})
}

function executeScript(e, t) {
  _openFile("/executeScript/" + e, t, !0)
}

function _openFile(e, t, i) {
  i = null != i && i;
  let o = "";
  const a = new XMLHttpRequest;
  i || (i = (new Date).getTime(), e = e + "?_=" + i), a.open("GET", e, !0), a.onerror = e => {
      winAlert("Server not responding"), setTimeout(setSystemError, 2500), t && t("")
  };
  try {
      a.send("")
  } catch (e) {
      t && t("")
  }
  a.onreadystatechange = function() {
      var e;
      4 === a.readyState && ((0 === (e = a.status) || 200 <= e && e < 400) && 1 !== a.getResponseHeader("Content-Type").indexOf("text") && (o = a.responseText), t) && t(o)
  }
}

function _saveFile(e, t, i, o) {
  if (m.status.isReadOnly) i && i();
  else {
      var a = new XMLHttpRequest,
          e = (a.open("POST", "/fileServer"), a.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), a.onerror = e => {
              winAlert("Server not responding"), setTimeout(setSystemError, 2500), i && i()
          }, a.addEventListener("loadend", () => {
              i && i()
          }), {
              url: e,
              source: t,
              sourceEncoding: o
          });
      try {
          a.send(JSON.stringify(e))
      } catch (e) {
          i && i()
      }
  }
}

function saveRemoteFile(e, t, i, o) {
  if (m.status.isReadOnly) o && o();
  else {
      var a = new XMLHttpRequest,
          n = (a.open("POST", "/remoteFileServer"), a.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), a.onerror = e => {
              winAlert("Server not responding"), setTimeout(setSystemError, 2500), o && o()
          }, a.addEventListener("loadend", () => {
              o && o()
          }), e.substring(0, e.lastIndexOf(":"))),
          n = {
              remoteHost: n,
              remotePort: e.substring(e.lastIndexOf(":") + 1),
              url: t,
              source: i
          };
      try {
          a.send(JSON.stringify(n))
      } catch (e) {
          o && o()
      }
  }
}
var $ = go.GraphObject.make;
class Graph {
  constructor(e) {
      e = e || {}, this.diagram = null, this.fullPaletteId = null, this.nodePalette = null, this.groupPalette = null, this.linkPalette = null, this.lastNodeKey = null, this.dslNameList = [], this.isReadOnly = !1, this.graphPath = "", e.fullPaletteId && (this.fullPaletteId = e.fullPaletteId), e.nodePaletteId && (this.nodePalette = this.newNodePalette(e.nodePaletteId)), e.groupPaletteId && (this.groupPalette = this.newGroupPalette(e.groupPaletteId)), e.linkPaletteId && (this.linkPalette = this.newLinkPalette(e.linkPaletteId)), e.graphId ? this.diagram = this.newDiagram(e.graphId) : this.diagram = this.newDiagram(), this.em = new _em1_, this.em.addList({
          onSelection: {
              help: "Inofrm that the selection has changed in the graph",
              params: {
                  dataList: "List of selected node-data"
              }
          },
          onGraphChanged: {
              help: "Inofrm that graph has changed"
          },
          onFirstLayoutCompleted: {
              help: "Inofrm that graph has completed the first layout after load"
          },
          onLoadGraph: {
              help: "Load a new graph in canvas",
              params: {
                  nodeData: "node-data of the the graph to load"
              }
          },
          onLoadFile: {
              help: "Open dialog with a file in a new editor",
              params: {
                  nodeData: "node-data of the the file to load",
                  x: "last x mouse click position",
                  y: "last y mouse click position"
              }
          },
          onClone: {
              help: "Clone the duplicated node",
              params: {
                  nodeData: "data of the target clone"
              }
          },
          onShowRootGraph: {
              help: "Load system root graph"
          },
          onSetReadOnly: {
              help: "Set read-only navigation (never save changes to server)",
              params: {
                  status: "true/false"
              }
          },
          onShowParentGraph: {
              help: "Load parent graph in canvas"
          },
          onShowPreviousGraph: {
              help: "Load previous graph in canvas"
          },
          onShowFindDialog: {
              help: "Open dialog for searching in the current graph",
              params: {
                  x: "last x mouse click position",
                  y: "last y mouse click position"
              }
          },
          onShowAnimatorEditor: {
              help: "Open dialog for animating nodes in current graph",
              params: {
                  x: "last x mouse click position",
                  y: "last y mouse click position"
              }
          },
          onShowDSLListDialog: {
              help: "Open dialog for adding/removing DSL",
              params: {
                  x: "last x mouse click position",
                  y: "last y mouse click position"
              }
          },
          onShowGraphTemplateDialog: {
              help: "Open dialog for selecting a graph template",
              params: {
                  x: "last x mouse click position",
                  y: "last y mouse click position"
              }
          },
          onShowSysMonitorDialog: {
              help: "Open dialog for monitoring system information",
              params: {
                  x: "last x mouse click position",
                  y: "last y mouse click position"
              }
          }
      }), this.contextMenu = new HTMLMenu("contextMenuContainer"), this.contextMenu.addParams("gojs", {
          diagram: this.diagram,
          tool: this.diagram.currentTool,
          cmd: this.diagram.commandHandler,
          cmt: this.diagram.toolManager.contextMenuTool
      }), this.contextMenu.add({
          diagramContextMenu: {
              layout: "vertical",
              itemList: [{
                  label: "Properties",
                  do: e => winAlert(this.getDiagramInfo(this.diagram.model), !1)
              }, {
                  label: "View",
                  layout: "vertical",
                  subMenu: [{
                      label: "Zoom to Fit",
                      do: this.doZoomToFit.bind(this)
                  }, {
                      separator: "-"
                  }, {
                      label: "Show View 1",
                      do: e => {
                          e.event.shiftKey ? this.setCurrentViewToBookmark(1) : this.setToBookmarkView(1)
                      }
                  }, {
                      label: "Show View 2",
                      do: e => {
                          e.event.shiftKey ? this.setCurrentViewToBookmark(2) : this.setToBookmarkView(2)
                      }
                  }, {
                      label: "Show View 3",
                      do: e => {
                          e.event.shiftKey ? this.setCurrentViewToBookmark(3) : this.setToBookmarkView(3)
                      }
                  }, {
                      label: "Show View 4",
                      do: e => {
                          e.event.shiftKey ? this.this.setCurrentViewToBookmark(4) : this.setToBookmarkView(4)
                      }
                  }, {
                      label: "Show Prev View",
                      do: this.setCurrentViewToPreviousView.bind(this)
                  }]
              }, {
                  separator: "-",
                  if: e => e.d.cmd.canPasteSelection(location)
              }, {
                  label: "Paste",
                  if: e => e.d.cmd.canPasteSelection(location),
                  do: e => {
                      var t = e.d.cmt.mouseDownPoint;
                      e.d.cmd.pasteSelection(t)
                  }
              }, {
                  separator: "-"
              }, {
                  label: "Find",
                  do: e => {
                      var t = this.diagram.lastInput.viewPoint;
                      this.em.call.onShowFindDialog(t.x, t.y)
                  }
              }, {
                  separator: "-"
              }, {
                  label: "Tools",
                  layout: "vertical",
                  subMenu: [{
                      label: "Toggle Visible Palette",
                      if: e => !!this.fullPaletteId,
                      do: e => {
                          var t = document.querySelector("#" + this.fullPaletteId),
                              i = t.style.visibility,
                              i = (t.style.visibility = "visible" == i ? "hidden" : "visible", window.innerWidth),
                              o = window.innerHeight;
                          t.style.left = Math.min(i - 100, Math.max(0, t.offsetLeft)), t.style.top = Math.min(o - 100, Math.max(0, t.offsetTop))
                      }
                  }, {
                      label: "Toggle Visible Grid",
                      do: e => this.diagram.grid.visible = !this.diagram.grid.visible
                  }, {
                      separator: "-"
                  }, {
                      label: "Show DSL List",
                      do: e => {
                          var t = this.diagram.lastInput.viewPoint;
                          this.em.call.onShowDSLListDialog(t.x, t.y)
                      }
                  }, {
                      label: "Show Graph Template",
                      do: e => {
                          var t = this.diagram.lastInput.viewPoint;
                          this.em.call.onShowGraphTemplateDialog(t.x, t.y)
                      }
                  }, {
                      label: "Show System Monitor",
                      do: e => {
                          var t = this.diagram.lastInput.viewPoint;
                          this.em.call.onShowSysMonitorDialog(t.x, t.y)
                      }
                  }, {
                      label: "Show Animator",
                      do: e => {
                          var t = this.diagram.lastInput.viewPoint;
                          this.em.call.onShowAnimatorEditor(t.x, t.y)
                      }
                  }]
              }, {
                  label: "Navigate",
                  layout: "vertical",
                  subMenu: [{
                      label: "Go To Parent Graph",
                      if: e => !this.isRootGraph,
                      do: e => {
                          this.isRootGraph || this.em.call.onShowParentGraph()
                      }
                  }, {
                      label: "Back To Previous Graph",
                      if: e => !this.isHistoryEmpty,
                      do: e => {
                          this.isHistoryEmpty || this.em.call.onShowPreviousGraph()
                      }
                  }, {
                      label: "Go To Root Graph",
                      if: e => !this.isRootGraph,
                      do: e => this.em.call.onShowRootGraph()
                  }]
              }, {
                  separator: "-"
              }, {
                  label: "Set Read-only Mode",
                  if: e => !this.isReadOnly,
                  do: e => {
                      this.isReadOnly = !0, this.em.call.onSetReadOnly(!0)
                  }
              }, {
                  label: "Unset Read-only Mode",
                  if: e => this.isReadOnly,
                  do: e => {
                      this.isReadOnly = !1, this.em.call.onSetReadOnly(!1)
                  }
              }, {
                  separator: "-",
                  if: e => e.d.cmd.canUndo() || e.d.cmd.canRedo()
              }, {
                  layout: "horizontal",
                  itemList: [{
                      fontIcon: "action-undo",
                      hint: "Undo (CTRL-Z)",
                      if: e => e.d.cmd.canUndo(),
                      do: e => e.d.cmd.undo()
                  }, {
                      fontIcon: "action-redo",
                      hint: "Undo (CTRL-Z)",
                      if: e => e.d.cmd.canRedo(),
                      do: e => e.d.cmd.redo()
                  }]
              }]
          },
          nodeContextMenu: {
              layout: "vertical",
              itemList: [{
                  label: "Zoom it",
                  do: this.doZoomToFitSlectedNode.bind(this, 5)
              }, {
                  separator: "-"
              }, {
                  label: "Duplicate",
                  if: e => {
                      e.d.cmt.mouseDownPoint;
                      return e.d.cmd.canCopySelection()
                  },
                  do: e => {
                      var t = e.d.cmt.mouseDownPoint;
                      e.d.cmd.copySelection(), e.d.cmd.pasteSelection(t)
                  }
              }, {
                  label: "Clone",
                  if: e => this.canEditClone(),
                  do: e => this.doEditClone()
              }, {
                  label: "Cut",
                  if: e => e.d.cmd.canCutSelection(),
                  do: e => e.d.cmd.cutSelection()
              }, {
                  label: "Copy",
                  if: e => e.d.cmd.canCopySelection(),
                  do: e => e.d.cmd.copySelection()
              }, {
                  label: "Paste",
                  if: e => {
                      e.d.cmd.canPasteSelection(location)
                  },
                  do: e => {
                      var t = e.d.cmt.mouseDownPoint;
                      e.d.cmd.pasteSelection(t)
                  }
              }, {
                  label: "Delete",
                  if: e => e.d.cmd.canDeleteSelection(),
                  do: e => e.d.cmd.deleteSelection()
              }, {
                  separator: "-"
              }, {
                  label: "Set From Palette",
                  do: e => this._reSetSelectionFromPalette()
              }, {
                  separator: "-"
              }, {
                  label: "Group",
                  if: e => e.d.cmd.canGroupSelection(),
                  do: e => e.d.cmd.groupSelection()
              }, {
                  label: "Ungroup",
                  if: e => e.d.cmd.canUngroupSelection(),
                  do: e => e.d.cmd.ungroupSelection()
              }, {
                  label: "Ungroup Nodes",
                  if: e => !e.d.cmd.canUngroupSelection() && this.canUngroupSelectedNodes(),
                  do: e => this.doUngroupSelectedNodes()
              }, {
                  separator: "-",
                  if: e => this._canOpenFile() || this._canOpenSubGraph()
              }, {
                  label: "Open File",
                  if: e => this._canOpenFile(),
                  do: e => {
                      var t, i = this.getFirstSelectedNodeData();
                      i && (t = this.diagram.lastInput.viewPoint, this.em.call.onLoadFile(i, t.x, t.y))
                  }
              }, {
                  label: "Open Sub-Graph",
                  if: e => this._canOpenSubGraph(),
                  do: e => {
                      var t = this.getFirstSelectedNodeData();
                      t && this.em.call.onLoadGraph(t)
                  }
              }, {
                  separator: "-",
                  if: e => e.d.cmd.canUndo() || e.d.cmd.canRedo()
              }, {
                  label: "Undo",
                  if: e => e.d.cmd.canUndo(),
                  do: e => e.d.cmd.undo()
              }, {
                  label: "Redo",
                  if: e => e.d.cmd.canRedo(),
                  do: e => e.d.cmd.redo()
              }]
          }
      }), this.shortcutList = [{
          key: "2",
          control: !0,
          do: this.doZoomToFitSlectedNode.bind(this, 2)
      }, {
          key: "3",
          control: !0,
          do: this.doZoomToFitSlectedNode.bind(this, 3)
      }, {
          key: "4",
          control: !0,
          do: this.doZoomToFitSlectedNode.bind(this, 4)
      }, {
          key: "5",
          control: !0,
          do: this.doZoomToFitSlectedNode.bind(this, 5)
      }, {
          key: "1",
          do: this.doZoomToFit.bind(this)
      }, {
          key: "2",
          do: this.doZoomToFactor.bind(this, 2)
      }, {
          key: "3",
          do: this.doZoomToFactor.bind(this, 3)
      }, {
          key: "4",
          do: this.doZoomToFactor.bind(this, 4)
      }, {
          key: "5",
          do: this.doZoomToFactor.bind(this, 4)
      }, {
          key: "C",
          do: this.setViewCenteredOnSelectedNode.bind(this)
      }], this.diagram.contextMenu = this.contextMenu.getMenu("diagramContextMenu"), this.nodeContextMenu = this.contextMenu.getMenu("nodeContextMenu"), this.clearInstance(), this.isDeleteEnabled = !1, this.isDoubleClickCreateNodeEnabled = !0, this.isRootGraph = !0, this.isHistoryEmpty = !0, this.viewBookmark = new Array(2), this.systemNodeDataFieldList = ["text", "location", "size", "key", "group"], this.systemLinkDataFieldList = ["from", "to", "points"], this.dslNodeFieldNameList = new Set(["key"])
  }
  registerEvent(e, t) {
      this.em.register(e, t)
  }
  registerEventList(e) {
      this.em.registerList(e)
  }
  setDSL(e) {
      this._setNodeDSL(e), this._setLinkDSL(e), this._setGroupDSL(e)
  }
  addDSL(e, t) {
      t.templateNodeList && t.dataNodeList && (e.templateNodeList || (e.templateNodeList = []), e.dataNodeList || (e.dataNodeList = []), e.templateNodeList = e.templateNodeList.concat(t.templateNodeList), e.dataNodeList = e.dataNodeList.concat(t.dataNodeList)), t.templateLinkList && t.dataLinkList && (e.templateLinkList || (e.templateLinkList = []), e.dataLinkList || (e.dataLinkList = []), e.templateLinkList = e.templateLinkList.concat(t.templateLinkList), e.dataLinkList = e.dataLinkList.concat(t.dataLinkList)), t.templateGroupList && t.dataGroupList && (e.templateGroupList || (e.templateGroupList = []), e.dataGroupList || (e.dataGroupList = []), e.templateGroupList = e.templateGroupList.concat(t.templateGroupList), e.dataGroupList = e.dataGroupList.concat(t.dataGroupList))
  }
  setDSLNameList(e) {
      this.dslNameList = e
  }
  getDSLNameList() {
      return this.dslNameList
  }
  getDSLFieldNameList() {
      return Array.from(this.dslNodeFieldNameList)
  }
  isDataValidField(e) {
      return this.dslNodeFieldNameList.has(e)
  }
  loadDSLList(o, a) {
      let n = null;
      this.dslNodeFieldNameList = new Set;
      loadDSLScriptList(o, () => {
          var e;
          for (const t of o) window[t + "_getDSL"] && (e = window[t + "_getDSL"](this), this._storeDSLNodeFieldNameList(e), n ? this.addDSL(n, e) : n = e);
          if (n) {
              this.setDSL(n);
              for (const i of o) window[i + "_setupDSL"] && window[i + "_setupDSL"](this)
          }
          a && a()
      }), this.setDSLNameList(o)
  }
  getPaletteInfo() {
      var e = document.querySelector("#" + this.fullPaletteId),
          t = "visible" == e.style.visibility;
      return {
          key: "DSL Palette",
          isFile: !0,
          fileType: "input/fields",
          fileURL: "#systemPalette#",
          editorPosition: [parseInt(e.style.left), parseInt(e.style.top), parseInt(e.style.width), parseInt(e.style.height)],
          isVisible: t
      }
  }
  restorePalette(e) {
      var t, i, o, a = document.querySelector("#" + this.fullPaletteId);
      e.editorPosition && (t = e.editorPosition, i = window.innerWidth, o = window.innerHeight, t && t[0] && (a.style.left = Math.min(i - 100, Math.max(0, t[0])) + "px"), t && t[1] && (a.style.top = Math.min(o - 100, Math.max(0, t[1])) + "px"), t && t[2] && (a.style.width = t[2] + "px"), t) && t[3] && (a.style.height = t[3] + "px"), e.isVisible && (a.style.visibility = e.isVisible ? "visible" : "hidden")
  }
  clearNodePalette() {
      this.nodePalette && (this.nodePalette.model = this.newEmptyModel())
  }
  clearLinkPalette() {
      this.linkPalette && (this.linkPalette.model = this.newEmptyModel())
  }
  setGraphPath(e) {
      this.graphPath = e
  }
  getGraphPath() {
      return this.graphPath
  }
  setAllowDeleteKey(e) {
      this.isDeleteEnabled = e, this.diagram.isDeleteEnabled = e
  }
  setAllowDoubleCliceCreateNode(e) {
      this.isDoubleClickCreateNodeEnabled = e = null == e || e, this.isDoubleClickCreateNodeEnabled || (this.diagram.toolManager.clickCreatingTool = null)
  }
  getGraphImage() {
      let e = null;
      return e = this.diagram ? this.diagram.makeImageData({
          returnType: "string",
          size: new go.Size(800, 532),
          padding: new go.Margin(50, 10, 10, 10)
      }) : e
  }
  getRootNodes() {
      return this.diagram.nodes
  }
  setModel(e) {
      this.diagram && (this.clearInstance(), this.diagram.model = e, this.diagram.model.copiesKey = !1, this.diagram.model.makeUniqueKeyFunction = this.newUniqueKey.bind(this), this.diagram.model.undoManager.isEnabled = !0, this.diagram.model.addChangedListener(this._onGraphChangedFilter.bind(this)), this.diagram.model.copiesArrays = !0, this.diagram.model.copiesArrayObjects = !0, this.diagram.model.linkKeyProperty = "key", this.diagram.model.linkFromPortIdProperty = "fromPort", this.diagram.model.linkToPortIdProperty = "toPort", this.lastNodeKey = null, this.diagram.zoomToFit())
  }
  setJSONModel(t) {
      var i = this.diagram.scale,
          o = this.diagram.position.x,
          a = this.diagram.position.y;
      if (this.diagram) {
          let e = null;
          e = t ? go.Model.fromJson(t) : this.newEmptyModel(), this.setModel(e), this.diagram.scale = i, this.diagram.initialPosition = new go.Point(o, a)
      }
  }
  getJSONModel() {
      let e = "";
      return e = this.diagram && 0 < this.diagram.model.nodeDataArray.length ? this.diagram.model.toJson() : e
  }
  getEditorSource() {
      var e = this.diagram.position,
          t = this.getJSONModel(),
          e = (0 == this.dslNameList.length && (this.dslNameList = config.graph.defaultDSL), {
              dslNameList: this.dslNameList,
              view: {
                  scale: this.diagram.scale,
                  position: [e.x, e.y],
                  isGridOn: this.diagram.grid.visible
              },
              model: t
          });
      return JSON.stringify(e)
  }
  setEditorSource(e, i) {
      let o = null;
      var t = () => {
          var e, t;
          this.setJSONModel(o.model), o.view && (null != o.view.scale && (this.diagram.scale = o.view.scale), null != o.view.position && (e = null != (t = o.view.position)[0] ? t[0] : 0, t = null != t[1] ? t[1] : 0, this.diagram.initialPosition = new go.Point(e, t)), null != o.view.isGridOn) && (this.diagram.grid.visible = o.view.isGridOn), graphData = {}, i && i()
      };
      (o = e ? JSON.parse(e) : {
          view: null,
          dslNameList: null,
          model: null
      }).dslNameList ? this.loadDSLList(o.dslNameList, t) : t()
  }
  setIsRootGraph(e) {
      this.isRootGraph = e
  }
  setIsHistoryEmpty(e) {
      this.isHistoryEmpty = e
  }
  getSelection() {
      let e = null;
      return e = this.diagram ? this.diagram.selection : e
  }
  getSelectionCount() {
      let e = 0;
      var t = this.getSelection();
      return e = t ? t.count : e
  }
  getJSONSelection() {
      var e = this._getFilteredSelection(4);
      return JSON.stringify(e, null, 2)
  }
  setJSONSelection(e) {
      var t = JSON.parse(e),
          i = t.originalKey;
      if (i)
          for (let e = 0; e < i.length; ++e) {
              var o, a = i[e],
                  n = t[e];
              for (const s of Object.keys(n)) "key" != s && (o = n[s], setNodeDataField(a, s, o))
          }
  }
  selectNodeByKey(e) {
      this.diagram.select(this.diagram.findPartForKey(e))
  }
  selectAllNodeByKey(e) {
      var t = [];
      for (const i of e) t.push(this.diagram.findPartForKey(i));
      this.diagram.selectCollection(t)
  }
  getCurrentView() {
      var e = this.diagram.position,
          t = this.diagram.scale,
          i = this.diagram.grid.visible;
      return {
          position: {
              x: e.x,
              y: e.y
          },
          scale: t,
          isGridOn: i
      }
  }
  setCurrentView(e) {
      e.scale && (this.diagram.scale = e.scale), e.position && (this.diagram.position = new go.Point(e.position.x, e.position.y)), "boolean" == typeof e.isGridOn && (this.diagram.grid.visible = e.isGridOn)
  }
  setCurrentViewToBookmark(e) {
      this.viewBookmark[e] = this.getCurrentView()
  }
  setCurrentViewToPreviousView() {
      null != this.viewBookmark[0] && this.setCurrentView(this.viewBookmark[0])
  }
  setToBookmarkView(e) {
      null != this.viewBookmark[e] && (this.viewBookmark[0] = this.getCurrentView(), this.setCurrentView(this.viewBookmark[e]))
  }
  setViewFromNode(e, t, i) {
      let o = !1;
      return e && (t = e.position.x + t, e = e.position.y + i, this.setCurrentView({
          position: {
              x: t,
              y: e
          }
      }), o = !0), o
  }
  setViewCenteredOnSelectedNode() {
      var e, t, i, o = this.getSelection().first(),
          a = null != o;
      return a && (e = o.actualBounds.x, o = o.actualBounds.y, t = this.diagram.viewportBounds.width, i = this.diagram.viewportBounds.height, this.diagram.position = new go.Point(e - t / 2, o - i / 2)), a
  }
  doZoomToFitSlectedNode(e) {
      this.doZoomToFit(), this.setViewCenteredOnSelectedNode() && this.doZoomToFactor(e)
  }
  doZoomToFit() {
      this.viewBookmark[4] = this.getCurrentView(), this.diagram.zoomToFit()
  }
  doZoomToFactor(e) {
      this.diagram.scale = this.diagram.scale * e
  }
  doEditCut() {
      var e = this.diagram.commandHandler;
      e.canCutSelection() && e.cutSelection()
  }
  doEditCopy() {
      var e = this.diagram.commandHandler;
      e.canCopySelection() && e.copySelection()
  }
  doEditPaste(e) {
      var t = this.diagram.commandHandler;
      t.canPasteSelection() && t.pasteSelection(e)
  }
  doEditDuplicate(e) {
      var t = this.diagram.commandHandler;
      t.canCopySelection() && (t.copySelection(), t.pasteSelection(e))
  }
  canEditClone() {
      var e = this.getSelectionCount(),
          t = this.getFirstSelectedNodeData();
      return t && (t.isFile || t.isDir) && t.fileURL && 1 == e
  }
  doEditClone() {
      var e = this.diagram.commandHandler;
      e.canCopySelection() && (e.copySelection(), e.pasteSelection(), e = this.getFirstSelectedNodeData()) && this.em.call.onClone(e)
  }
  doEditDelete() {
      var e = this.diagram.commandHandler;
      e.canDeleteSelection() && e.deleteSelection()
  }
  canUngroupSelectedNodes() {
      let e = !1;
      for (var t = this.getSelection().iterator; t.next();)
          if (void 0 !== t.value.data.group) {
              e = !0;
              break
          } return e
  }
  doUngroupSelectedNodes() {
      this.getSelection().each(e => {
          e = e.data;
          void 0 !== e.group && setNodeDataField(e, "group", null)
      })
  }
  centerGraphToNodeKey(e) {
      e = this.diagram.findNodeForKey(e);
      this.diagram.centerRect(e.actualBounds)
  }
  findAllNodeDataIf(conditionBodyFunc) {
      let result = [];
      const fieldNameList = Array.from(this.dslNodeFieldNameList);
      let templateNode = {};
      const templateNodeStr = "templateNode = {" + fieldNameList.join(':"",') + ':""}';
      eval(templateNodeStr);
      let conditionFn = null,
          isInternalFunction = !1;
      if ("string" == typeof conditionBodyFunc) {
          const conditionBodyTrim = conditionBodyFunc.trim();
          if ((conditionBodyTrim.startsWith("==") || conditionBodyTrim.startsWith("'") || conditionBodyTrim.startsWith('"')) && (conditionBodyTrim.endsWith("'") || conditionBodyTrim.endsWith('"'))) {
              isInternalFunction = !0;
              const stringLen = conditionBodyTrim.length,
                  stringQuote = conditionBodyTrim[stringLen - 1],
                  stringBegin = conditionBodyTrim.indexOf(stringQuote) + 1,
                  searchValue = conditionBodyTrim.substring(stringBegin, stringLen - 1);
              conditionFn = conditionBodyTrim.startsWith("==") ? e => {
                  for (const i of Object.keys(e)) {
                      var t = e[i];
                      if (t && t == searchValue) return !0
                  }
                  return !1
              } : e => {
                  for (const i of Object.keys(e)) {
                      var t = e[i] + "";
                      if (t && t.includes(searchValue)) return !0
                  }
                  return !1
              }
          } else isInternalFunction = !1, conditionBodyFunc.trim() && (conditionFn = new Function("d", `return( ${conditionBodyFunc} )`))
      } else "function" == typeof conditionBodyFunc && (isInternalFunction = !1, conditionFn = conditionBodyFunc);
      const nodeIterator = this.diagram.nodes;
      if (nodeIterator.reset(), conditionFn)
          for (; nodeIterator.next();) {
              const d = nodeIterator.value.data;
              let dataClean = {};
              dataClean = isInternalFunction ? this._getDataCopy(d) : this._getDataCopy(d, templateNode);
              try {
                  conditionFn(dataClean) && result.push(dataClean)
              } catch (error) {}
          }
      return result
  }
  findAllNodeData(e, t, i, o) {
      i = null != i && i, o = null != o && o;
      var a = [],
          n = this.diagram.nodes;
      for (n.reset(); n.next();) {
          n.value;
          var s = n.value.data,
              r = s[e];
          if (null != r) {
              let e = !1;
              if (e = o ? r == t : (r + "").includes(t)) {
                  r = this._getDataCopy(s);
                  if (a.push(r), i) break
              }
          }
      }
      return a
  }
  findNodeData(e, t, i) {
      let o = null;
      e = this.findAllNodeData(e, t, !0, i);
      return o = e && e[0] ? e[0] : o
  }
  getFirstSelectedNodeData() {
      let e = null;
      var t;
      return e = this.diagram && this.diagram.selection.count && (t = this.diagram.selection.first()) ? t.data : e
  }
  getNodeData(e, t) {
      let i = null;
      var o, e = this.diagram.model.findNodeDataForKey(e);
      return i = e ? e.isSystem ? (o = this._getDataCopy(e), this.updateSystemNode(o)) : t ? this._getDataCopy(e) : e : i
  }
  setNodeDataField(e, t, i) {
      let o = e;
      if (o = "object" != typeof e ? this.diagram.model.findNodeDataForKey(e) : o) {
          if (o.isSystem && "fileContent" == t) switch (o.isSystem) {
              case "$GraphModel$":
                  this.setJSONModel(i), this._callOnNodeModelChanged(), this._callOnNodeGraphSelectionChanged();
                  break;
              case "$GraphSelection$":
                  this.setJSONSelection(i), this._callOnNodeModelChanged(), this._callOnNodeGraphSelectionChanged()
          } else o.isSystem && o.fileContent && delete o.fileContent, this.diagram.startTransaction("Set Data Propery"), this.diagram.model.setDataProperty(o, t, i), this.diagram.commitTransaction("Set Data Propery");
          this.em.call.onGraphChanged()
      }
  }
  getLinkData(e, t) {
      let i = null;
      e = this.diagram.model.findLinkDataForKey(e);
      return i = e ? t ? this._getDataCopy(e) : e : i
  }
  setLinkDataField(e, t, i) {
      e = this.diagram.model.findLinkDataForKey(e);
      e && (this.diagram.startTransaction("Set Data Propery"), this.diagram.model.setDataProperty(e, t, i), this.diagram.commitTransaction("Set Data Propery"), this.em.call.onGraphChanged())
  }
  moveSelectionRel(e, t) {
      if (this.diagram.selection) {
          this.diagram.startTransaction("Move Selection Relative");
          for (const o of this.diagram.selection.toArray()) {
              var i = o.position;
              o.moveTo(i.x + e, i.y + t)
          }
          this.diagram.commitTransaction("Move Selection Relative")
      }
  }
  updateSystemNode(t) {
      switch (t.isSystem && t.fileURL && delete t.fileURL, t.isSystem) {
          case "$GraphModel$":
              var e = this.getJSONModel(),
                  e = JSON.parse(e);
              t.fileContent = JSON.stringify(e, null, 2), t.onNodeChanged = e => {
                  this.onNodeGraphModelChanged = {
                      nodeData: t,
                      callback: e
                  }
              };
              break;
          case "$GraphSelection$":
              t.fileContent = this.getJSONSelection(), t.onNodeChanged = e => {
                  this.onNodeGraphSelectionChanged = {
                      nodeData: t,
                      callback: e
                  }
              }
      }
      return t
  }
  filterObjectData(e, t) {
      t = null != t ? t : 2;
      var i, o, a = {};
      if (2 < ((o = e) ? o.constructor.name : "").length)
          for (const n in e) n.startsWith("_") || (i = e[n], Array.isArray(i) ? a[n] = this.filterArrayData(i, t - 1) : a[n] = "object" == typeof i ? this.filterObjectData(i, t - 1) : i);
      return a
  }
  filterArrayData(e, t) {
      var i = [];
      if (0 < (t = null != t ? t : 2))
          for (const o of e) Array.isArray(o) ? i.push(this.filterArrayData(o, t - 1)) : "object" == typeof o ? i.push(this.filterObjectData(o, t - 1)) : i.push(o);
      return i
  }
  doSetReadOnly(e) {
      this.isReadOnly = e, this.em.call.onSetReadOnly(!1)
  }
  _setNodeDSL(e) {
      if (e.templateNodeList && e.dataNodeList) {
          var t = new go.Map,
              i = new go.Map;
          for (const s of e.templateNodeList) {
              var o = s.category,
                  a = s.param || void 0,
                  n = s.template(a),
                  n = (n.contextMenu = this.nodeContextMenu, n.toolTip = this.newNodeToolTip(), n.locationSpot = go.Spot.Left, t.add(o, n), s.template(a));
              n.locationSpot = go.Spot.Center, i.add(o, n)
          }
          this.diagram && (this.diagram.nodeTemplateMap = t), this.nodePalette && (this.nodePalette.nodeTemplateMap = i, this._setPaletteDataNodeList(e.dataNodeList), this.nodePalette.scale = .7)
      }
  }
  _setLinkDSL(e) {
      if (e.templateLinkList && e.dataLinkList) {
          var t = new go.Map,
              i = new go.Map;
          for (const s of e.templateLinkList) {
              var o = s.category,
                  a = s.param || void 0,
                  n = s.template(a),
                  n = (n.contextMenu = this.nodeContextMenu, n.toolTip = this.newLinkToolTip(), n.adjusting = go.Link.End, t.add(o, n), s.template(a));
              n.selectable = !1, i.add(o, n)
          }
          this.diagram && (this.diagram.linkTemplateMap = t), this.linkPalette && (this.linkPalette.linkTemplateMap = i, this._setPaletteDataLinkList(e.dataLinkList), this.linkPalette.scale = .7)
      }
  }
  _setGroupDSL(e) {
      if (e.templateGroupList && e.dataGroupList) {
          var t = new go.Map,
              i = new go.Map;
          for (const s of e.templateGroupList) {
              var o = s.category,
                  a = s.param || void 0,
                  n = s.template(a),
                  n = (n.contextMenu = this.nodeContextMenu, n.toolTip = this.newGroupToolTip(), n.locationSpot = go.Spot.Left, t.add(o, n), s.template(a));
              n.locationSpot = go.Spot.Center, i.add(o, n)
          }
          this.diagram && (this.diagram.groupTemplateMap = t), this.groupPalette && (this.groupPalette.groupTemplateMap = i, this._setPaletteDataGroupList(e.dataGroupList), this.groupPalette.scale = .7)
      }
  }
  _setPaletteDataNodeList(t) {
      if (this.nodePalette) {
          for (let e = 0; e < t.length; ++e) t[e].key = e + 1;
          this.nodePalette.model.nodeDataArray = t, this.nodePalette.toolManager.dragSelectingTool.isEnabled = !1, this.nodePalette.maxSelectionCount = 1, this.nodePalette.lastSelectedNode = null, this.nodePalette.addDiagramListener("LayoutCompleted", e => {
              this.nodePalette.scroll("pixel", "up", 50)
          }), this.diagram && this.nodePalette.addDiagramListener("ChangedSelection", () => {
              var e = this.nodePalette.selection.first();
              e && this.diagram.toolManager.clickCreatingTool ? (e = (this.nodePalette.lastSelectedNode = e).data, this.diagram.toolManager.clickCreatingTool.archetypeNodeData = e) : this.nodePalette.select(this.nodePalette.lastSelectedNode)
          });
          var e = this.nodePalette.findNodeForKey(1);
          e && this.nodePalette.select(e)
      }
  }
  _setPaletteDataLinkList(t) {
      if (this.linkPalette) {
          var i = [];
          let e = 1;
          for (const n of t) {
              i.push({
                  key: e,
                  category: "LinkSource"
              });
              var o = n.text || n.category;
              i.push({
                  key: e + 1,
                  text: o,
                  category: "LinkDestination"
              }), n.from = e, n.to = e + 1, e += 2
          }
          var a = new go.Map,
              a = (a.add("LinkSource", $(go.Node)), a.add("LinkDestination", $(go.Node, "Auto", {
                  locationSpot: go.Spot.Left
              }, $(go.TextBlock, {
                  margin: 4
              }, new go.Binding("text", "text")))), this.linkPalette.model.nodeDataArray = i, this.linkPalette.nodeTemplateMap = a, this.linkPalette.model.linkDataArray = t, this.linkPalette.toolManager.dragSelectingTool.isEnabled = !1, this.linkPalette.maxSelectionCount = 1, this.linkPalette.lastSelectedLink = null, this.linkPalette.addDiagramListener("LayoutCompleted", e => {
                  this.linkPalette.scroll("pixel", "up", 50)
              }), this.diagram && this.linkPalette.addDiagramListener("ChangedSelection", () => {
                  var e = this.linkPalette.selection.first();
                  e ? (e = (this.linkPalette.lastSelectedNode = e).findLinksInto().first().data, this.diagram.toolManager.linkingTool.archetypeLinkData = e) : this.linkPalette.select(this.linkPalette.lastSelectedNode)
              }), this.linkPalette.findNodeForKey(2));
          a && this.linkPalette.select(a)
      }
  }
  _setPaletteDataGroupList(t) {
      if (this.groupPalette) {
          for (let e = 0; e < t.length; ++e) t[e].key = e + 1;
          this.groupPalette.model.nodeDataArray = t, this.groupPalette.toolManager.dragSelectingTool.isEnabled = !1, this.groupPalette.maxSelectionCount = 1, this.groupPalette.lastSelectedNode = null, this.groupPalette.addDiagramListener("LayoutCompleted", e => {
              this.groupPalette.scroll("pixel", "up", 50)
          }), this.diagram && this.groupPalette.addDiagramListener("ChangedSelection", () => {
              var e = this.groupPalette.selection.first();
              e && this.diagram.commandHandler ? (e = (this.groupPalette.lastSelectedNode = e).data, this.diagram.commandHandler.archetypeGroupData = e) : this.groupPalette.select(this.groupPalette.lastSelectedNode)
          });
          var e = this.groupPalette.findNodeForKey(1);
          e && this.groupPalette.select(e)
      }
  }
  _onGraphChangedFilter(e) {
      e.isTransactionFinished && (e.object, this._callOnNodeModelChanged(), this._callOnNodeGraphSelectionChanged(), this.em.call.onGraphChanged())
  }
  newEmptyModel() {
      return new go.GraphLinksModel([], [])
  }
  newUniqueKey(e, t) {
      let i = this.lastNodeKey ? this.lastNodeKey + 1 : e.nodeDataArray.length;
      for (; null != e.findNodeDataForKey(i);) ++i;
      return this.lastNodeKey = i
  }
  newNodePalette(e) {
      return $(go.Palette, e, {
          layout: $(go.GridLayout, {
              alignment: go.GridLayout.Location,
              wrappingColumn: 1
          })
      })
  }
  newGroupPalette(e) {
      return $(go.Palette, e, {
          layout: $(go.GridLayout, {
              alignment: go.GridLayout.Location,
              wrappingColumn: 1
          })
      })
  }
  newLinkPalette(e) {
      return $(go.Palette, e, {
          layout: $(go.GridLayout, {
              alignment: go.GridLayout.Location,
              spacing: go.Size.parse("40 10"),
              wrappingColumn: 2
          })
      })
  }
  newDiagram(e) {
      const s = this;
      let r = null;
      (r = e ? $(go.Diagram, e) : $(go.Diagram)).clickCreatingTool = new InGroupClickCreatingTool, r.animationManager.isInitial = !1, r.mouseDrop = e => this._onFinishDrop(e, null), r.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom, r.toolManager.linkingTool.portGravity = 0, r.undoManager.isEnabled = !0;
      var e = {
              dark: {
                  backgroundColor: "rgb(60, 60, 60)",
                  lineColor1: "rgb(70, 70, 70)",
                  lineColor2: "rgb(80, 80, 80)"
              },
              light: {
                  backgroundColor: "AliceBlue",
                  lineColor1: "rgb(220, 220, 220)",
                  lineColor2: "rgb(200, 200, 200)"
              }
          },
          t = config.graph.colorSchema,
          e = (r.grid = $(go.Panel, "Grid", {
              name: "GRID",
              visible: !1,
              gridCellSize: new go.Size(10, 10),
              gridOrigin: new go.Point(0, 0)
          }, $(go.Shape, "LineH", {
              stroke: e[t].lineColor1,
              strokeWidth: .5,
              interval: 1
          }), $(go.Shape, "LineH", {
              stroke: e[t].lineColor2,
              strokeWidth: .5,
              interval: 5
          }), $(go.Shape, "LineH", {
              stroke: e[t].lineColor2,
              strokeWidth: 1,
              interval: 10
          }), $(go.Shape, "LineV", {
              stroke: e[t].lineColor1,
              strokeWidth: .5,
              interval: 1
          }), $(go.Shape, "LineV", {
              stroke: e[t].lineColor2,
              strokeWidth: .5,
              interval: 5
          }), $(go.Shape, "LineV", {
              stroke: e[t].lineColor2,
              strokeWidth: 1,
              interval: 10
          })), r.grid.visible = !1, r.div.style.background = e[t].backgroundColor, r.toolManager.draggingTool.gridSnapCellSize = new go.Size(10, 10), r.toolManager.draggingTool.isGridSnapEnabled = !0, r.toolManager.resizingTool.isGridSnapEnabled = !0, r.commandHandler.zoomFactor = config.graph.zoomFactor || 1.25, r.scrollMode = go.Diagram.InfiniteScroll, r.toolManager.panningTool.canStart = function() {
              return !!this.isEnabled && null !== r && !(!r.allowHorizontalScroll && !r.allowVerticalScroll || !r.lastInput.right || r.currentTool !== this && !this.isBeyondDragSize())
          }, new PolylineLinkingTool),
          t = (r.toolManager.linkingTool = e, new SnapLinkReshapingTool);
      return r.toolManager.linkReshapingTool = t, r.addDiagramListener("LinkDrawn", e => {
          e.subject;
          let t = e.subject.fromNode,
              i = t.position.x,
              o = t.position.y;
          setTimeout(() => {
              t.moveTo(i, o + .1), t.moveTo(i, o - .1)
          }, 1)
      }), r.commandHandler.doKeyDown = function() {
          var e = r.lastInput.key;
          if (!r.isDeleteEnabled)
              if ("Del" === e || "Backspace" === e) return;
          go.CommandHandler.prototype.doKeyDown.call(this)
      }, r.commandHandler.doKeyUp = function() {
          var e = r.lastInput,
              t = e.control || e.meta,
              i = e.alt,
              o = e.shift,
              a = e.key;
          for (const n of s.shortcutList)
              if (n.key == a && !(null == n.control && t || null != n.control && !t || null == n.alt && i || null != n.alt && !i || null == n.shift && o || null != n.shift && !o)) {
                  n.do();
                  break
              } go.CommandHandler.prototype.doKeyUp.call(this)
      }, r.addDiagramListener("ClipboardPasted", e => {
          e.subject.each(e => {
              var t = e.location;
              t.x += 10, t.y += 10, e.location = t
          })
      }), r.addDiagramListener("BackgroundSingleClicked", () => {
          r.lastInput.alt && this.em.call.onShowParentGraph()
      }), r.addDiagramListener("ObjectSingleClicked", () => {
          var e, t;
          r.lastInput.alt && ((e = this.getFirstSelectedNodeData()) && 1 == e.isDir ? this.em.call.onLoadGraph(e) : (t = this.diagram.lastInput.viewPoint, this.em.call.onLoadFile(e, t.x, t.y)))
      }), r.addDiagramListener("InitialLayoutCompleted", e => {
          this.em.call.onFirstLayoutCompleted(), this.nodePalette && this.nodePalette.scroll("pixel", "up", 20), this.linkPalette && this.linkPalette.scroll("pixel", "up", 20)
      }), r.addDiagramListener("ChangedSelection", () => {
          var e;
          this.diagram && (e = this._getFilteredSelection(), this.em.call.onSelection(e), this._callOnNodeGraphSelectionChanged())
      }), r
  }
  newNodeToolTip() {
      return $("ToolTip", $(go.TextBlock, {
          margin: 4
      }, new go.Binding("text", "", e => {
          var t = e.label || e.text || "";
          let i = "Node [" + e.key + "]: " + t + "\n";
          return e.category && (i = i + " Category: " + e.category + "\n"), e.group ? i = i + "member of " + e.group : i += "top-level node", i = e.hint ? i + "\n" + e.hint : i
      })))
  }
  newLinkToolTip() {
      return $("ToolTip", $(go.TextBlock, {
          margin: 4
      }, new go.Binding("text", "", e => {
          return "Link:\nfrom " + e.from + " to " + e.to
      })))
  }
  newGroupToolTip() {
      return $("ToolTip", $(go.TextBlock, {
          margin: 4
      }, new go.Binding("text", "", this.getGroupInfo.bind(this)).ofObject()))
  }
  getGroupInfo(e) {
      var e = e.adornedPart,
          t = e.memberParts.count,
          i = 0,
          e = (e.memberParts.each(e => {
              e instanceof go.Link && i++
          }), "Group " + e.data.key + ": " + e.data.text + "\n" + t + " members including " + i + " links");
      return e
  }
  getDiagramInfo(e) {
      return " Model: " + e.nodeDataArray.length + " nodes, " + e.linkDataArray.length + " links \n Graph URL: " + this.graphPath + " "
  }
  _canOpenFile() {
      let e = !1;
      var t = this.getFirstSelectedNodeData();
      return e = t ? 1 == t.isFile : e
  }
  _canOpenSubGraph() {
      let e = !1;
      var t = this.getFirstSelectedNodeData();
      return e = t ? 1 == t.isDir : e
  }
  _onFinishDrop(t, e) {
      let i;
      e || (e = t.documentPoint, 0 < (e = t.diagram.findPartsAt(e)).count && e.each(e => {
          e.data.isGroup && (i = e.addMembers(t.diagram.selection, !0))
      }))
  }
  _reSetSelectionFromPalette() {
      this.getSelection().each(e => {
          let t = null,
              i = null;
          if (e instanceof go.Node) {
              if (this.nodePalette) {
                  const e = this.nodePalette.selection.first();
                  e && (t = e.data)
              }
              i = this.systemNodeDataFieldList
          } else {
              var o;
              e instanceof go.Link && (this.linkPalette && (o = this.linkPalette.selection.first()) && (t = o.data), i = this.systemLinkDataFieldList)
          }
          if (t) {
              var a, n = e.data;
              for (const s of Object.keys(n)) s.startsWith("_") || -1 != i.indexOf(s) || "label" == s || t[s] && (a = t[s], this.diagram.model.setDataProperty(n, s, a));
              this.diagram.requestUpdate()
          }
      })
  }
  _getDataCopy(e, t) {
      var i = t ? Object.assign({}, t) : {};
      for (const o of Object.keys(e)) o.startsWith("_") || (i[o] = e[o]);
      return i
  }
  _getFilteredSelection() {
      var e = {};
      let t = -1;
      var i = [],
          o = this.diagram.selection;
      if (0 < o.count)
          for (var a = o.iterator; a.next();) {
              var n = a.value.data,
                  s = this.filterObjectData(n),
                  s = this._getDataCopy(s);
              e[++t] = s, i.push(n.key)
          }
      return -1 != t && (e.originalKey = i), e
  }
  clearInstance() {
      this.onNodeGraphModelChanged = null, this.onNodeGraphSelectionChanged = null
  }
  _callOnNodeGraphSelectionChanged() {
      var e;
      this.onNodeGraphSelectionChanged && (e = this.onNodeGraphSelectionChanged.nodeData, this.updateSystemNode(e), this.onNodeGraphSelectionChanged.callback(e))
  }
  _callOnNodeModelChanged() {
      var e;
      this.onNodeGraphModelChanged && (e = this.onNodeGraphModelChanged.nodeData, this.updateSystemNode(e), this.onNodeGraphModelChanged.callback(e))
  }
  _storeDSLNodeFieldNameList(e) {
      if (e.dataNodeList) {
          for (const t of e.dataNodeList)
              for (const i of Object.keys(t)) this.dslNodeFieldNameList.add(i);
          for (const o of e.dataLinkList)
              for (const a of Object.keys(o)) this.dslNodeFieldNameList.add(a)
      }
  }
}
class _ge6_ extends _eb3_ {
  constructor(e, t, i) {
      super(), this.isContentJustLoaded = !0, this.id = e, this.fileType = "text/json", this.listenerList = {
          onLoad: []
      }, this.editor = new Graph({
          graphId: e,
          fullPaletteId: config.htmlDiv.paletteDiv,
          nodePaletteId: config.htmlDiv.nodePaletteDiv,
          groupPaletteId: config.htmlDiv.groupPaletteDiv,
          linkPaletteId: config.htmlDiv.linkPaletteDiv
      }), null != config.graph.allowDeleteKey && this.editor.setAllowDeleteKey(config.graph.allowDeleteKey), null != config.graph.isDoubleClickCreateNodeEnabled && this.editor.setAllowDoubleCliceCreateNode(config.graph.isDoubleClickCreateNodeEnabled), this._spc19_(!0), this.onDoSave(() => {
          this._sec38_()
      }), this.onNeedSave(() => setSystemNeedSave());
      e = getStatus("graphHistory");
      this.editor.setIsHistoryEmpty(e.length <= 0), this.editor.setIsRootGraph(t.fileURL == config.graph.rootGraphURL);
      const o = () => {
          var e = popFromHistory(),
              t = getStatus("graphHistory");
          this.editor.setIsHistoryEmpty(t.length <= 0), this._ntg35_(e, !0)
      };
      this.editor.registerEventList({
          onGraphChanged: () => {
              this.isContentJustLoaded || this._shc20_()
          },
          onSelection: e => {
              m.e.getEditor(config.htmlDiv.graphDiv).getJSONSelection()
          },
          onLoadGraph: e => {
              e = getNodeData(e.key, !0);
              this._vf39_(e), this._ntg35_(e)
          },
          onLoadFile: (e, t, i) => {
              e = getNodeData(e.key, !0);
              this._vf39_(e), m.e._owf47_(e, t, i)
          },
          onClone: e => {
              if (e.fileURL) {
                  const o = getNodeData(e.key, !0);
                  loadNodeContent(o, e => {
                      var t = o.fileURL,
                          i = (o.fileURL = "", this._vf39_(o), o.fileURL);
                      m.e._cgw56_(t, i), o.fileContent = e, saveNodeContent(o)
                  })
              }
          },
          onShowRootGraph: () => {
              var e = config.graph.rootGraphNodeData;
              this._ntg35_(e)
          },
          onSetReadOnly: e => {
              setSystemReadOnly(e)
          },
          onShowParentGraph: () => {
              o()
          },
          onShowPreviousGraph: () => {
              o()
          },
          onShowFindDialog: (e, t) => {
              var i = {
                      key: "Find in Graph",
                      isFile: !0,
                      fileType: "input/fields"
                  },
                  o = m.e._getDOMUniqueId(i);
              m.e.openWindow(o, "FindViewer", i, [e, t, 470, 200])
          },
          onShowAnimatorEditor: (e, t) => {
              var i = {
                      key: "Animate Graph",
                      isFile: !0,
                      fileType: "input/fields",
                      fileURL: ""
                  },
                  o = m.e._getDOMUniqueId(i);
              m.e.openWindow(o, "AnimatorEditor", i, [e, t, 470, 200])
          },
          onShowDSLListDialog: (e, t) => {
              var i = {
                      key: "Show DSL List",
                      isFile: !0,
                      fileType: "input/fields"
                  },
                  o = m.e._getDOMUniqueId(i);
              m.e.openWindow(o, "DSLViewer", i, [e, t, 160, 350])
          },
          onShowGraphTemplateDialog: (e, t) => {
              var i = {
                      key: "Graph Templates",
                      isFile: !0,
                      fileType: "input/fields"
                  },
                  o = m.e._getDOMUniqueId(i);
              m.e.openWindow(o, "GraphTemplateViewer", i, [e, t, 260, 160])
          },
          onShowSysMonitorDialog: (e, t) => {
              var i = {
                      key: "System Monitor",
                      isFile: !0,
                      fileType: "system/status",
                      fileURL: "#systemMonitor#"
                  },
                  o = m.e._getDOMUniqueId(i);
              m.e.openWindow(o, "SystemMonitorViewer", i, [e, t, 540, 170])
          }
      }), this._spc19_(!1), this._lec36_(t)
  }
  addListerner(e, t) {
      this.listenerList[e] && this.listenerList[e].push(t)
  }
  _ntg35_(e, t) {
      t = null != t && t, e && this._sse37_(() => {
          t || m.e._ugh60_(), this._lec36_(e)
      })
  }
  _lec36_(i, o) {
      if ((i || i.isDir) && i.fileType == this.fileType) {
          this._spc19_(!0), this.isContentJustLoaded = !0;
          const a = () => {
                  this._pnw40_("unload"), this._pnw40_("load"), setStatus(e => e.currentGraphNode = i), m.e.reopenGraphSession(i.fileURL);
                  var e = getStatus("graphHistory"),
                      e = (this.editor.setIsHistoryEmpty(e.length <= 0), this.editor.setIsRootGraph(i.fileURL == config.graph.rootGraphURL), this._spc19_(!1), this.title = this.id, i.label ? this.title = i.label : i.text ? this.title = i.text : i.key && (e = i.key, isNaN(e)) && (this.title = i.key), setTimeout(() => this.isContentJustLoaded = !1, 50), this.listenerList.onLoad);
                  if (0 < e.length)
                      for (const t of e) t && t();
                  o && o()
              },
              t = e => {
                  var t = getStatus("graphHistory");
                  !e && t.length <= 0 ? (i = config.graph.rootGraphNodeData, this._lec36_(i, () => {
                      this._dll34_(i, a)
                  })) : (this.editor.setEditorSource(e, () => {
                      this._dll34_(i, a)
                  }), this.editor.setGraphPath(i.fileURL))
              };
          var e = () => {
              this.nodeData && (i.fileURL == config.graph.rootGraphURL ? this._spg29_(null) : this._spg29_(this.nodeData)), loadNodeContent(this.nodeData = i, t)
          };
          this.nodeData ? m.e._cae58_(e) : e()
      }
  }
  _sse37_(e) {
      this._ins21_() ? this._sec38_(e) : e && e()
  }
  _sec38_(t) {
      let a = null;
      const n = {
              fileURL: "",
              fileContent: "",
              fileEncoding: "base64"
          },
          s = () => {
              this._es22_(), t && t()
          },
          e = e => {
              var t, i, o = this.editor.getGraphImage();
              o && a && (t = a.fileURL.lastIndexOf("."), i = a.fileURL.substring(t), t) && ".json" == i && (i = o.replace(/^data:image\/\w+;base64,/, ""), n.fileURL = a.fileURL.substring(0, t) + ".png", n.fileContent = i, saveNodeContent(n, s))
          },
          i = () => {
              this._dll34_(this.nodeData, e)
          };
      this.nodeData ? this._dll34_(this.nodeData, e => {
          e ? (this._cs24_(), t && t()) : (a = this.editor._getDataCopy(this.nodeData), e = this.editor.getEditorSource(), a.fileContent = e, saveNodeContent(a, i))
      }) : i()
  }
  _vf39_(e) {
      var t;
      e.isLink || !e.isDir && !e.isFile || null != e.fileURL && "" == e.fileURL && (t = getNewFileServerURL(getExtByFileType(e.fileType)), e.fileURL = t, setNodeDataField(e.key, "fileURL", t))
  }
  _pnw40_(e) {
      if ("unload" == e)
          for (const a of document.querySelectorAll(".NodeData_IncludeScript")) a.remove();
      else {
          var t = this.editor.diagram.nodes;
          for (t.reset(); t.next();) {
              var i, o = t.value.data;
              "text/javascript" == o.fileType && o.isFile && o.isIncludeScript && "load" === e && ((i = document.createElement("script")).type = "text/javascript", i.className = "NodeData_IncludeScript", i.addClass, o.fileURL ? i.src = o.fileURL : o.fileContent && (i.innerHTML = o.fileContent), document.head.append(i))
          }
      }
  }
}
class _te7_ extends _eb3_ {
  constructor(e, t, i) {
      super(), this.isJustStarted = !0, this.id = e, this.fileType = "", this.fileType = t.fileType || "text/text", this.editorDivId = m.e._wdw48_(e, this.title, config.htmlDiv.mainDiv, this._swp30_.bind(this), i), this.editor = new _asce18_(this.editorDivId);
      e = this.fileType.substring(5);
      this.editor.setEditorMode("ace/mode/" + e);
      this.editor.aceEditor.commands.addCommand({
          name: "toogleWrapMode",
          bindKey: {
              win: "Alt-Z",
              mac: "Option-Z"
          },
          exec: function(e) {
              var t = e.getOption("wrap");
              e.setOption("wrap", "off" == t)
          }
      }), t.editorTheme ? this.editor.setEditorTheme(t.editorTheme) : document.getElementById(this.editorDivId).style.background = "#1d1f21", this._spc19_(!0), this.editor.onSourceChanged(() => {
          this.isJustStarted || this._shc20_(), this.isJustStarted = !1
      }), this.onDoSave(() => {
          this._sec38_()
      }), this._spc19_(!1), this._lec36_(t)
  }
  _lec36_(t) {
      this._spc19_(!0), this.fileType = t.fileType || this.fileType, this.nodeData = t, this.title = (t.label || t.key) + ` [${this.fileType}]`, this._st28_(this.title), t.fileURL && m.e.showWindowPin(this.id, "visible"), loadNodeContent(t, e => {
          this.editor.setEditorSource(e), this._dll34_(t, () => {
              this._spc19_(!1)
          })
      }), t.onNodeChanged && t.onNodeChanged(this._lec36_.bind(this))
  }
  _sec38_(i) {
      const o = () => {
          this._es22_(), i && i()
      };
      this.nodeData ? this._dll34_(this.nodeData, e => {
          var t;
          e ? (this._cs24_(), i && i()) : (e = this.editor.getEditorSource(), (t = m.e.getEditor(config.htmlDiv.graphDiv)._getDataCopy(this.nodeData)).fileContent = e, saveNodeContent(t, o))
      }) : o()
  }
}
class _hee8_ extends _eb3_ {
  constructor(e, t, i) {
      super(), this.isJustStarted = !0, this.id = e, this.fileType = "", this.editorDiv = null, this.fileType = t.fileType || "application/explore", this.editorDivId = m.e._wdw48_(e, this.title, config.htmlDiv.mainDiv, this._swp30_.bind(this), i);
      e = document.getElementById(this.editorDivId);
      this.editor = ExploreEditor.create(e, {
          width: "auto",
          height: "auto",
          mode: "inline",
          katex: katex,
          toolbarItem: [
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ["bold", "underline", "italic", "strike", "subscript", "superscript", "fontColor", "hiliteColor"],
              ["outdent", "indent", "align", "list", "horizontalRule"],
              ["link", "table", "image", "audio", "video"],
              ["lineHeight", "paragraphStyle", "textStyle"],
              ["showBlocks", "codeView"],
              ["math"],
              ["preview", "print", "fullScreen"],
              ["save", "template"],
              ["removeFormat"]
          ],
          templates: [{
              name: "Template-1",
              html: "<p>HTML source1</p>"
          }, {
              name: "Template-2",
              html: "<p>HTML source2</p>"
          }],
          charCounter: !0
      }), this._spc19_(!0), this.editor.onChange = () => {
          this.isJustStarted || this._shc20_(), this.isJustStarted = !1
      }, this.onDoSave(() => {
          this._sec38_()
      }), this._spc19_(!1), this._lec36_(t)
  }
  _lec36_(t) {
      this._spc19_(!0), this.fileType = t.fileType || this.fileType, this.nodeData = t, this.title = (t.label || t.key) + ` [${this.fileType}]`, this._st28_(this.title), t.fileURL && m.e.showWindowPin(this.id), loadNodeContent(t, e => {
          this.editor.setContents(e), this._dll34_(t, () => {
              this._spc19_(!1)
          })
      }), t.onNodeChanged && t.onNodeChanged(this._lec36_.bind(this))
  }
  _sec38_(i) {
      const o = () => {
          this._es22_(), i && i()
      };
      this.nodeData ? this._dll34_(this.nodeData, e => {
          var t;
          e ? (this._cs24_(), i && i()) : (e = this.editor.getContents(), (t = m.e.getEditor(config.htmlDiv.graphDiv)._getDataCopy(this.nodeData)).fileContent = e, saveNodeContent(t, o))
      }) : o()
  }
}
class _ie9_ extends _eb3_ {
  constructor(e, t, i) {
      super(), this.id = e, this.editor = null, this.editorDivId = m.e._wdw48_(e, this.title, config.htmlDiv.mainDiv, this._swp30_.bind(this), i), document.getElementById(this.editorDivId).style.background = "#1d1f21", this._lec36_(t)
  }
  _lec36_(e) {
      var t;
      this.nodeData = e, this.title = (e.label || e.key) + ` [${e.fileType}]`, this._st28_(this.title), e.fileURL && m.e.showWindowPin(this.id), e.fileURL && (t = document.getElementById(this.editorDivId), e = e.fileURL || "", t.style.backgroundImage = `url("${e}")`, t.style.backgroundSize = "cover")
  }
  _sec38_(e) {
      e && e()
  }
}
class _wv10_ extends _eb3_ {
  constructor(e, t, i) {
      super(), this.id = e, this.editor = null, this.editorDivId = m.e._wdw48_(e, this.title, config.htmlDiv.mainDiv, this._swp30_.bind(this), i), this._lec36_(t)
  }
  _lec36_(nodeData) {
      if (this.nodeData = nodeData, this.title = (nodeData.label || nodeData.key) + ` [${nodeData.fileType}]`, this._st28_(this.title), nodeData.fileURL && m.e.showWindowPin(this.id), nodeData.isLocalDiv && null != nodeData.fileContent) {
          const element = document.getElementById(this.editorDivId),
              divID = this.id + "_frame";
          let html = '<h2 style="color:white">Default Div Content</h2>';
          eval(nodeData.fileContent), element.innerHTML = `<div id='${divID}' class='webViewer'>${html}</div>`
      } else if (nodeData.fileURL) {
          const element = document.getElementById(this.editorDivId),
              fileURL = nodeData.fileURL || "";
          element.innerHTML = `<iframe id='${this.id}_frame' class='webViewer' src="${fileURL}?_=${Date.now()}"></iframe>`
      } else if (null != nodeData.fileContent) {
          const element = document.getElementById(this.editorDivId),
              frameId = this.id + "_frame",
              frameElement = (element.innerHTML = `<iframe id='${frameId}' name="${Date.now()}" class='webViewer' src='about:blank'></frame>`, document.getElementById(frameId));
          frameElement.contentDocument.open(), frameElement.contentDocument.write(nodeData.fileContent), frameElement.contentDocument.close()
      }
  }
  _sec38_(e) {
      e && e()
  }
}
class _fv11_ extends _eb3_ {
  constructor(e, t, i) {
      super(), this.id = e, this.editor = null, this.foundInfo = {
          lastItemSelected: -1,
          foundList: [],
          elementList: []
      }, this.editorDivId = m.e._wdw48_(e, this.title, config.htmlDiv.mainDiv, this._swp30_.bind(this), i), document.getElementById(this.editorDivId).style.background = "#1d1f21", this._lec36_(t)
  }
  _lec36_(e) {
      const u = m.e.getEditor(config.htmlDiv.graphDiv);
      var t = 'Examples:&#013;     d.field == "1"&#013;     == "1"&#013;     "1"&#013;Field names are:&#013;' + ("    " + u.getDSLFieldNameList().join("&#013;    "));
      this.nodeData = e, this.title = (e.label || e.key) + ` [${e.fileType}]`, this._st28_(this.title), document.getElementById(this.editorDivId).innerHTML = `<div class="search" style="width:100%;position:absolute;background-color:inherit">
                        Search :&nbsp<input id='searchField' list='searchEntries' style='width:85%' title='${t}'>
                        <datalist id='searchEntries'>
                          <option value="d.key == '3'">
                          <option value="d.key >= '3'">
                        </datalist>
                      </div>
                      <div id='searchResult' style="margin-top: 25px;" ></div>`;
      const g = document.querySelector("#searchField"),
          p = document.querySelector("#searchResult"),
          f = (e, t) => {
              if ("PageDown" == e) {
                  if (!(t.lastItemSelected < t.foundList.length - 1)) return;
                  ++t.lastItemSelected
              } else if ("PageUp" == e) {
                  if (!(0 < t.lastItemSelected)) return;
                  --t.lastItemSelected
              }
              t.elementList[t.lastItemSelected] && t.elementList[t.lastItemSelected].onclick()
          },
          y = (e, t) => {
              m.e.selectAndCenterNodeInGraph(e), this.lastItemSelected = t
          };
      g.onkeyup = o => {
          if ("PageUp" != o.key && "PageDown" != o.key || f(o.key, this.foundInfo), "Enter" == o.key || 13 === o.keyCode) {
              var a, n = o.currentTarget.value,
                  o = document.getElementById("searchEntries");
              let e = !1;
              for (const d of o.children)
                  if (d.value == n) {
                      e = !0;
                      break
                  } e || ((a = document.createElement("option")).value = n, o.appendChild(a)), this.foundInfo.foundList = u.findAllNodeDataIf(g.value), this.foundInfo.lastItemSelected = -1;
              let t = "",
                  i = 0;
              for (const h of this.foundInfo.foundList) {
                  var s = h.key;
                  let e = "";
                  var r = `[${s}]&nbsp;` + (e = !(e = !(e = h.label ? h.label : e) && h.text ? h.text : e) && h.category ? h.category : e);
                  t += `<div class="findResult" onclick='${`m.e.selectAndCenterNodeInGraph("${s}")`}'>${r}</div>`, ++i
              }
              p.innerHTML = "" + t, this.foundInfo.elementList = document.querySelectorAll(".findResult");
              for (let e = 0; e < this.foundInfo.elementList.length; ++e) {
                  var l = this.foundInfo.elementList[e];
                  const c = this.foundInfo.foundList[e].key;
                  l.onclick = () => y(c, e)
              }
              1 == this.foundInfo.foundList.length && f("PageDown", this.foundInfo)
          }
      }
  }
  _sec38_(e) {
      e && e()
  }
}
class _dv12_ extends _eb3_ {
  constructor(e, t, i) {
      super(), this.id = e, this.editor = null, this.editorDivId = m.e._wdw48_(e, this.title, config.htmlDiv.mainDiv, this._swp30_.bind(this), i), document.getElementById(this.editorDivId).style.background = "#1d1f21", this._lec36_(t)
  }
  _lec36_(e) {
      this.nodeData = e, this.title = (e.label || e.key) + ` [${e.fileType}]`, this._st28_(this.title);
      const i = m.e.getEditorInfo(config.htmlDiv.graphDiv).editor;
      var t = i.getDSLNameList(),
          e = Object.keys(m.dslNameList),
          o = document.getElementById(this.editorDivId);
      let a = "";
      for (const n of e) - 1 != t.indexOf(n) ? a += `<input class="dslItem" type="checkbox" id="${n}" name="${n}" checked>
                        <label class="findResult" for="${n}">${n}</label><br>` : a += `<input class="dslItem" type="checkbox" id="${n}" name="${n}" onclick="">
                        <label class="findResult" for="${n}">${n}</label><br>`;
      o.innerHTML = `<button class="setDSLButton" type="button" style="width=100%">Set DSL for current graph</button>
                       <div class="searchResult">
                       ${a}
                       </div>`, document.querySelector(".setDSLButton").onclick = () => {
          var e = [];
          for (const t of document.querySelectorAll('input[class="dslItem"]')) t.checked && e.push(t.name);
          i.loadDSLList(e)
      }
  }
  _sec38_(e) {
      e && e()
  }
}
class _gtv13_ extends _eb3_ {
  constructor(e, t, i) {
      super(), this.id = e, this.editor = null, this.editorDivId = m.e._wdw48_(e, this.title, config.htmlDiv.mainDiv, this._swp30_.bind(this), i), document.getElementById(this.editorDivId).style.background = "#1d1f21", this._lec36_(t)
  }
  _lec36_(e) {
      m.e.getEditor(config.htmlDiv.graphDiv);
      this.nodeData = e, this.title = (e.label || e.key) + ` [${e.fileType}]`, this._st28_(this.title);
      let a = {};
      document.getElementById(this.editorDivId).innerHTML = "<div id='searchResult' ></div>";
      const t = e => {
          a = JSON.parse(e);
          let t = "";
          for (const i of Object.keys(a)) {
              a[i];
              t += `<div class="findResult graphTemplateItem">${i}</div>`
          }
          searchResult.innerHTML = t;
          for (const o of document.querySelectorAll(".graphTemplateItem")) o.onclick = () => {
              var e;
              e = o.textContent, a[e] && _openFile(a[e], e => {
                  m.e.getEditor(config.htmlDiv.graphDiv).setJSONModel(e)
              })
          }
      };
      _openFile(config.host.fileServerSystemURL + "/graphTemplateList.json", e => {
          t(e)
      })
  }
  _sec38_(e) {
      e && e()
  }
}
class _smv14_ extends _eb3_ {
  constructor(e, t, i) {
      super(), this.id = e, this.editor = null, m.e.getEditorInfo(config.htmlDiv.graphDiv).addListerner("onLoad", () => this._lec36_(t)), this.editorDivId = m.e._wdw48_(e, this.title, config.htmlDiv.mainDiv, this._swp30_.bind(this), i), document.getElementById(this.editorDivId).style.background = "#1d1f21", this._lec36_(t), setInterval(() => this._lec36_(this.nodeData), 3e4)
  }
  _lec36_(e) {
      this.nodeData = e, this.title = (e.label || e.key) + ` [${e.fileType}]`, this._st28_(this.title), e.fileURL && m.e.showWindowPin(this.id), document.getElementById(this.editorDivId).innerHTML = `<div style="width=100%;height = 100%">
                          <button type='button' style="width=100%" onclick='_sae65_()'>Save All</button>
                          <button id='sysMonitorRefresh' type='button' style="width=100%">Update</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <button id='browserReload' type='button' style="width=100%">Browser Reload</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <button type='button' style="width=100%" onclick='m.e._osw45_()'>Show Selection Editor</button>
                          <button type='button' style="width=100%" onclick='m.e._omw46_()'>Show Model Editor</button>&nbsp;&nbsp;&nbsp;
                          <button type='button' style="width=100%" onclick='m.e._maw59_( +1 )'>&lt;-Window</button>
                          <button type='button' style="width=100%" onclick='m.e._maw59_( +0.5 )'>&lt;-|</button>
                          <button type='button' style="width=100%" onclick='m.e._maw59_( +0.05 )'>&lt;</button>
                          <button type='button' style="width=100%" onclick='m.e._maw59_( -0.05 )'>&gt;</button>
                          <button type='button' style="width=100%" onclick='m.e._maw59_( -0.5 )'>!-&gt;</button>
                          <button type='button' style="width=100%" onclick='m.e._maw59_( -1 )'>Window-&gt;</button>
                        </div>
                        <div id='windowList'></div>`, document.querySelector("#sysMonitorRefresh").onclick = () => this._lec36_(e);
      document.querySelector("#browserReload").onclick = () => window.location.reload(!0);
      var t = document.querySelector("#windowList");
      let i = '<table style="color: aquamarine;font-size: smaller;">';
      for (const a of m.e._ge43_()) {
          var o = m.e._geb44_(a);
          let e = o.screenDirection;
          0 != o.screenIndex && (e += `[${Math.abs(o.screenIndex)}]`);
          o = `<tr><td>[${o.id}]<td>${o.title}<td>URL: ${o.url}<td>${e}</tr>`;
          i += o
      }
      t.innerHTML = i, this._es22_(this.id)
  }
  _sec38_(e) {
      this._es22_(), e && e()
  }
}
class _ae15_ extends _eb3_ {
  constructor(e, t, i) {
      super(), this.id = e, this.editor = null, this.title = "Animator Editor", this.editorDivId = m.e._wdw48_(e, this.title, config.htmlDiv.mainDiv, this._swp30_.bind(this), i), this.editor = new _asce18_(this.editorDivId);
      this.editor.setEditorMode("ace/mode/text"), this.editor.setEditorSource('// Put here animation info, like: {"key":10}'), this.editor.onEvent("changeSelection", this._oes41_.bind(this)), this.graphEditor = m.e.getEditor(config.htmlDiv.graphDiv), this._lec36_(t)
  }
  animateNode(e) {
      let t = "",
          i = (t = null == e ? this.editor.getCurrentLineText() : this.editor.getLineTextAt(e), this._sjl42_(t));
      if (i && null == i.key)
          for (const o of Object.keys(lineInfo))
              if (this.graphEditor.isDataValidField(o) && (i = this.graphEditor.findNodeData(o, lineInfo[o], !0))) break;
      i && i.key && m.e.selectAndCenterNodeInGraph(i.key)
  }
  _lec36_(e) {
      this.nodeData = e
  }
  _sec38_(e) {
      e && e()
  }
  _oes41_() {
      let e = this.editor.getCurrentSelectionLines();
      e.start == e.end ? this.animateNode() : (e.currLine = e.start, setTimeout(() => this._playAnimation(e), 1e3))
  }
  _playAnimation(e) {
      this.animateNode(e.currLine++), e.currLine <= e.end && setTimeout(() => this._playAnimation(e), 1e3)
  }
  _sjl42_(e) {
      let t = null;
      if (e.startsWith("{") && (e = e.endsWith("},") ? e.substring(0, e.length - 1) : e).endsWith("}")) try {
          t = JSON.parse(e)
      } catch (e) {}
      return t
  }
}
class _em16_ extends _ecm2_ {
  constructor() {
      super(.5), this.id = "Session", this.registeredEditorList = [{
          name: "WebViewer",
          fileType: e => "application/html" == e,
          classRef: _wv10_
      }, {
          name: "HTMLExploreEditor",
          fileType: e => "application/explore" == e,
          classRef: _hee8_
      }, {
          name: "TextEditor",
          fileType: e => e.startsWith("text/"),
          classRef: _te7_
      }, {
          name: "TextEditor",
          fileType: e => "application/x-shellscript" == e,
          classRef: _te7_
      }, {
          name: "ImageEditor",
          fileType: e => e.startsWith("image/"),
          classRef: _ie9_
      }, {
          name: "GraphEditor",
          fileType: e => "text/json" == e,
          classRef: _ge6_
      }, {
          name: "FindViewer",
          fileType: e => "input/fields" == e,
          classRef: _fv11_
      }, {
          name: "DSLViewer",
          fileType: e => "input/fields" == e,
          classRef: _dv12_
      }, {
          name: "GraphTemplateViewer",
          fileType: e => "input/fields" == e,
          classRef: _gtv13_
      }, {
          name: "SystemMonitorViewer",
          fileType: e => "system/status" == e,
          classRef: _smv14_
      }, {
          name: "AnimatorEditor",
          fileType: e => "input/fields" == e,
          classRef: _ae15_
      }], this.editorList = {}, this.domUniqueId = 0, this.isStatusOnUpdate = !1, this.isMoveAllWindowRunning = !1, this.onDoSave(() => {
          _ss64_()
      })
  }
  _ge43_() {
      return Object.keys(this.editorList)
  }
  isEditorOpen(e, t) {
      var i = getStatus("pinnedWindow"),
          e = null != this.editorList[e],
          i = t.isFile && i[t.isFile];
      return e || i
  }
  getEditor(e) {
      let t = null,
          i = e;
      return "object" == typeof e && (i = m.e._getDOMUniqueId(e)), t = this.editorList[i] ? this.editorList[i].editor : t
  }
  getEditorInfo(e) {
      let t = e,
          i = ("object" == typeof e && (t = m.e._getDOMUniqueId(e)), this.editorList[t]);
      return i = t == this.id ? this : i
  }
  _geb44_(e) {
      let t = e;
      "object" == typeof e && (t = m.e._getDOMUniqueId(e));
      var e = m.e.getEditorInfo(t),
          i = e.title,
          e = e.nodeData.fileURL || "",
          o = document.getElementById(t),
          o = parseInt(o.style.left),
          a = window.innerWidth;
      let n = "Center",
          s = 0,
          r = 1;
      return o < 0 ? (s = Math.ceil(Math.abs(o / a)), n = "Left", r = s) : a < o && (s = Math.floor(Math.abs(o / a)), n = "Right", r = -s), {
          id: t,
          title: i,
          url: e,
          screenDirection: n,
          screenIndex: s,
          screenFactor: r
      }
  }
  getWindowDiv(e) {
      let t = e;
      return "object" == typeof e && (t = m.e._getDOMUniqueId(e)), document.getElementById(t)
  }
  getAllWindowDiv() {
      return document.getElementById("mainDiv").children
  }
  _osw45_() {
      var e = this.getEditor(config.htmlDiv.graphDiv),
          t = e.findNodeData("isSystem", "$GraphSelection$");
      t && (e.updateSystemNode(t), e = getNodeData(t.key, !0), this._owf47_(e), e = this.getWindowDiv(t)) && e.classList.add(t.isSystem.slice(1, -1))
  }
  _omw46_() {
      var e = this.getEditor(config.htmlDiv.graphDiv),
          t = e.findNodeData("isSystem", "$GraphModel$");
      t && (e.updateSystemNode(t), e = getNodeData(t.key, !0), this._owf47_(e), e = this.getWindowDiv(t)) && e.classList.add(t.isSystem.slice(1, -1))
  }
  _owf47_(e, t, i) {
      t = null != t && null != i ? [t, i, 400, 350] : void 0, i = m.e._getDOMUniqueId(e);
      m.e.openWindow(i, null, e, t), e.isSystem && m.e.getEditorInfo(i)._ssb31_()
  }
  openWindow(t, i, o, a, n) {
      var s, r, l;
      if (a = null == a ? [100, 100, 400, 350] : a, n = null != n && n, this.isEditorOpen(t, o)) 0 != (s = this._geb44_(t)).screenIndex && this._maw59_(s.screenFactor), this._pwo50_(t);
      else if (o.isFile || o.isDir) {
          let e = null;
          if (i) {
              for (const h of this.registeredEditorList)
                  if (h.name == i) {
                      e = h;
                      break
                  }
          } else {
              var d = o.fileType || "text/text";
              for (const c of this.registeredEditorList)
                  if (c.fileType(d)) {
                      e = c;
                      break
                  }
          }
          e && (r = (s = getStatus("currentGraphNode")).fileURL, (l = getStatus("openWindowList"))[r] && l[r][o.key] && (a = l[r][o.key]), e = new e.classRef(t, o, a), (this.editorList[t] = e)._spg29_(s), this._pwo50_(t), n && e.setPinOn(), e._swp30_(), this._sts23_())
      }
  }
  _wdw48_(e, t, i, o, a) {
      var n = e + "Editor",
          s = document.createElement("div"),
          r = (s.id = e, s.className = "editorMainDiv", window.innerWidth, window.innerHeight);
      a && a[0] && (s.style.left = a[0] + "px"), a && a[1] && (s.style.top = Math.min(r - 100, Math.max(0, a[1])) + "px"), a && a[2] && (s.style.width = a[2] + "px"), a && a[3] && (s.style.height = a[3] + "px"), s.innerHTML = `<div class='editorMainDivChild' >
                      <div class='resizerObj'>
                        <div class='resizerHeader' onmousedown="m.e._pwo50_('${e}')">
                          <button class='editorDivBClose' type="button" 
                                  onclick="m.e._ce57_( true, '${e}')">&#x2715
                          </button>
                          <!--button class='editorDivBCollapse' type="button"
                                  onclick="m.e._tcw49_('${e}')">-
                          </button-->
                          <button class='editorDivBPin' type="button"
                                  onclick="m.e.pinEditor('${e}')">📎
                          </button>
                          <button class='editorDivBSave' type="button"
                                  onclick="m.e._se51_('${e}')">Save
                          </button>
                          <div class='title' ondblclick="selectNodeOfWindow('${e}')">${t}</div>
                        </div>
                        <div class='editorDiv' id='${n}'></div>
                        <div class='resizer top-left'></div>
                        <div class='resizer bottom-right'></div>
                      </div>
                    </div>`, document.getElementById(i).appendChild(s);
      return setDivAsResizable("#" + e, "px", () => {
          o && o(), _resizeWindow()
      }), n
  }
  _tcw49_(e) {
      var t = document.querySelector(`#${e} .editorDiv`),
          i = document.querySelector(`#${e} .top-left`),
          e = document.querySelector(`#${e} .bottom-right`),
          o = "hidden" == t.style.visibility ? "visible" : "hidden";
      t.style.visibility = o, i.style.visibility = o, e.style.visibility = o
  }
  showWindowPin(e, t) {
      t = null == t ? "visible" : t;
      var i = document.querySelector(`#${e} .editorDivBPin`);
      if (i) switch (t) {
          case "pinned":
              i.innerText = "📌";
              break;
          case "unpinned":
              i.innerText = "📎";
              break;
          default:
              i.style.visibility = t
      }
  }
  _pwo50_(e) {
      var t = this.getEditorInfo(config.htmlDiv.graphDiv),
          i = t.nodeData.fileURL,
          e = (t.editor, document.getElementById(e)),
          o = e.style.zIndex,
          a = (parseInt(o || 10), []),
          o = getStatus("openWindowList");
      let n = 10;
      if (o[i])
          for (const f of Object.keys(o[i])) {
              var s, r = getNodeData(f),
                  r = m.e._getDOMUniqueId(r),
                  l = document.getElementById(r);
              l && (s = l.style.zIndex, s = parseInt(s || n++), a.push({
                  wId: r,
                  we: l,
                  wz: s
              }))
          }
      var d = getStatus("pinnedWindow");
      if (d)
          for (const y of Object.keys(d)) {
              var h, c = d[y],
                  c = m.e._getDOMUniqueId(c),
                  u = document.getElementById(c);
              u && (h = u.style.zIndex, h = parseInt(h || n++), a.push({
                  wId: c,
                  we: u,
                  wz: h
              }))
          }
      a.sort((e, t) => e.wz < t.wz ? -1 : e.wz > t.wz ? 1 : 0), document.getElementById(t.id).style.zIndex = 9;
      for (let e = 0; e < a.length; ++e) {
          var g = a[e];
          g.we.style.zIndex = 10 + e;
          const p = g.we.getElementsByClassName("resizerHeader")[0];
          p && (p.style.background = "DimGray")
      }
      e.style.zIndex = 10 + a.length + 1;
      const p = e.getElementsByClassName("resizerHeader")[0];
      p && (p.style.background = "Indigo")
  }
  _se51_(e, t) {
      e = this.getEditorInfo(e);
      e._cs24_(), e._sec38_(t)
  }
  _sec38_(e) {
      _ss64_(() => {
          this._es22_(), e && e()
      })
  }
  _swp52_(e, t, i) {
      if (e && t && !this.isStatusOnUpdate) {
          this.getEditorInfo(config.htmlDiv.graphDiv);
          var o = this._gep61_(e);
          if (t.editorPosition = o, i) {
              const a = getStatus("pinnedWindow");
              a[t.fileURL] = t, setStatus(e => e.pinnedWindow = a)
          } else {
              i = this.getEditorInfo(e).getParentGraph();
              if (i) {
                  e = i.fileURL;
                  const n = getStatus("openWindowList");
                  n[e] || (n[e] = {}), n[e][t.key] = o, setStatus(e => e.openWindowList = n)
              }
          }
          this._shc20_()
      }
  }
  pinEditor(e, t) {
      var i = this.getEditorInfo(e),
          o = i.nodeData;
      if (this._tpn53_(o, t), this.isURLPinned(o.fileURL)) {
          var t = getStatus("openWindowList"),
              a = i.getParentGraph();
          a && (t[a = a.fileURL] && t[a][o.key] && delete t[a][o.key], this.showWindowPin(e, "pinned"), this._shc20_())
      } else {
          const n = getStatus("openWindowList");
          t = i.getParentGraph();
          t && (a = t.fileURL, n[a] && n[a][o.key] || (n[a] || (n[a] = {}), i = this._gep61_(e), n[a][o.key] = i, setStatus(e => e.openWindowList = n), this.showWindowPin(e, "unpinned")))
      }
  }
  _tpn53_(e, t) {
      t = null != t && t;
      let i = getStatus("pinnedWindow");
      !(i = i || {})[e.fileURL] || t ? (e && e.fileURL && (i[e.fileURL] = {
          key: e.key,
          isFile: e.isFile,
          fileURL: e.fileURL,
          fileType: e.fileType,
          editorPosition: e.editorPosition
      }, null != e.isVisible && (i[e.fileURL].isVisible = e.isVisible), t = this.getWindowDiv(e)) && t.classList.add("pinned"), setStatus(e => e.pinnedWindow = i)) : (delete i[e.fileURL], this.isStatusOnUpdate || setStatus(e => e.pinnedWindow = i), (t = this.getWindowDiv(e)) && t.classList.remove("pinned"))
  }
  isURLPinned(e) {
      return !!getStatus("pinnedWindow")[e]
  }
  _uss54_() {
      var e = this.getEditor(config.htmlDiv.graphDiv).getPaletteInfo();
      e && this._tpn53_(e, !0)
  }
  _rss55_() {
      var e = getStatus("pinnedWindow");
      if (e)
          for (const a of Object.keys(e)) {
              var t, i, o = e[a];
              "#systemPalette#" != a ? (t = this._getDOMUniqueId(o), i = o.editorPosition, this.openWindow(t, null, o, i, !0), this.showWindowPin(t, "hidden"), o.isSystem && m.e.getEditorInfo(t)._ssb31_()) : this.getEditor(config.htmlDiv.graphDiv).restorePalette(o)
          }
  }
  reopenGraphSession(e) {
      this.isStatusOnUpdate = !0;
      var t = getStatus("openWindowList"),
          i = this.getEditor(config.htmlDiv.graphDiv);
      if (i && t && e && t[e])
          for (const s of Object.keys(t[e])) {
              var o, a, n = getNodeData(s);
              n ? (a = t[e][s], n && (o = this._getDOMUniqueId(n), this.openWindow(o, null, n, a), n.isSystem) && (m.e.getEditorInfo(o)._ssb31_(), a = this.getWindowDiv(n)) && a.classList.add(n.isSystem.slice(1, -1))) : (delete t[e][s], this._shc20_())
          }
      this.isStatusOnUpdate = !1
  }
  _cgw56_(e, t) {
      this.isStatusOnUpdate = !0;
      var i = getStatus("openWindowList");
      if (i && i[e]) {
          i[t] = {};
          for (const o of Object.keys(i[e])) i[t][o] = [...i[e][o]]
      }
      this.isStatusOnUpdate = !1
  }
  _ce57_(a, n, s) {
      if (null == n) this._cae58_(s);
      else if (n == config.htmlDiv.graphDiv) s && s();
      else {
          const r = this.getEditorInfo(n);
          a || !r.isPin() ? (r.onClosing(), this._se51_(n, () => {
              if (a) {
                  const i = getStatus("pinnedWindow");
                  i && (e = r.nodeData.fileURL, i[e]) && (delete i[e], this.isStatusOnUpdate || setStatus(e => e.pinnedWindow = i));
                  var e = r.nodeData;
                  if (e) {
                      var t = r.getParentGraph();
                      if (t) {
                          t = t.fileURL;
                          const o = getStatus("openWindowList");
                          o[t][e.key] && delete o[t][e.key], this.isStatusOnUpdate || setStatus(e => e.openWindowList = o)
                      }
                  }
              }
              delete this.editorList[n];
              t = document.getElementById(n);
              t.parentNode.removeChild(t), s && s(), this._shc20_()
          })) : s && s()
      }
  }
  _cae58_(e) {
      this.isStatusOnUpdate = !0;
      var t = Object.keys(this.editorList);
      this._closeIdListEditor(t, () => {
          e && (this.isStatusOnUpdate = !1, e())
      })
  }
  _maw59_(l) {
      if (!this.isMoveAllWindowRunning) {
          this.isMoveAllWindowRunning = !0;
          const d = window.innerWidth,
              h = d * l,
              c = this.getAllWindowDiv();
          let s = 5,
              r = 0;
          const u = h / 100,
              m = {},
              g = () => {
                  if (Math.abs(r) < Math.abs(h)) {
                      for (const a of c) a.classList.contains("pinned") || a.classList.contains("GraphSelection") || a.classList.contains("GraphModel") || "_systemMonitor__System_Monitor" == a.id || (0 == r && (m[a.id] = parseInt(a.style.left)), a.style.left = parseInt(a.style.left) + u + "px");
                      r += u, setTimeout(g, s)
                  } else {
                      for (const n of c) {
                          var e, t, i, o;
                          n.classList.contains("pinned") || n.classList.contains("GraphSelection") || n.classList.contains("GraphModel") || "_systemMonitor__System_Monitor" == n.id || (e = m[n.id] + l * d, n.style.left = e + "px", -1 != (t = this._getWindowKey(n.id)) && (o = getMainGraphURL(), i = getStatus("openWindowList")) && (i = i[o]) && (o = i[t]) && (o[0] = e))
                      }
                      this._shc20_(), this.isMoveAllWindowRunning = !1
                  }
              };
          setTimeout(g, s)
      }
  }
  _ugh60_() {
      const t = getStatus("currentGraphNode");
      t && (setStatus(e => {
          e.graphHistory.push(t), e.graphHistory.length > config.graph.maxHistoryLength && e.graphHistory.shift()
      }), this._shc20_())
  }
  _gep61_(e) {
      let t = [0, 0];
      e = document.getElementById(e);
      return t = e ? [parseInt(e.style.left), parseInt(e.style.top), parseInt(e.style.width), parseInt(e.style.height)] : t
  }
  selectNodeInGraph(e) {
      this.getEditor(config.htmlDiv.graphDiv).selectNodeByKey(e)
  }
  centerGraphToNodeKey(e) {
      this.getEditor(config.htmlDiv.graphDiv).centerGraphToNodeKey(e)
  }
  selectAndCenterNodeInGraph(e) {
      this.selectNodeInGraph(e), this.centerGraphToNodeKey(e)
  }
  findNodeInGraph(e, t) {
      return this.getEditor(config.htmlDiv.graphDiv).findAllNodeData(e, t)
  }
  _getDOMUniqueId(e) {
      return e ? ((e.fileURL || "emptyURL") + "_" + e.key).replaceAll(/[^A-Za-z0-9]/g, "_") : "noId"
  }
  _getWindowKey(e) {
      let t = -1;
      var i = e.lastIndexOf("_");
      return -1 != i && (e = e.substring(i + 1), t = parseInt(e)), t
  }
  _closeIdListEditor(e, t) {
      if (Array.isArray(e)) {
          const i = [...e];
          e = i.pop();
          e ? this._ce57_(!1, e, () => {
              this._closeIdListEditor(i, t)
          }) : t && t()
      } else t && t()
  }
  _sez62_(e, t) {
      e = document.getElementById(e);
      e && (e.style.zIndex = t)
  }
}

function _resizeWindow() {
  var e = document.createEvent("UIEvents");
  e.initUIEvent("resize", !0, !1, window, 0), window.dispatchEvent(e)
}
class _bce17_ {
  constructor(e) {
      this.editorDivId = e, this.editorDiv = document.getElementById(this.editorDivId), this.editorDiv.style.backgroundColor = "#f6f0e4", this.onSourceChangedCallback = null
  }
  isReadOnly() {
      return !1
  }
  setReadOnly(e) {}
  setEditorSource(e) {
      e = e || '{"blocks": [{"type": "paragraph","data": {"text": "Type document content here..."}}]}';
      try {
          var t = JSON.parse(e),
              i = (this.editorDiv.innerHTML = "", this._getEditorParams());
          i.data = t, this.htmlEditor = new EditorJS(i)
      } catch (e) {}
  }
  getEditorSource(e) {
      return e && this.htmlEditor.save().then(e), null
  }
  getEditorSourceNumLines() {
      return 10
  }
  getCurrentLine() {
      return ""
  }
  getCurrentSelectionLines() {
      return {
          start: 0,
          end: 0
      }
  }
  getCurrentLineText() {
      return ""
  }
  getLineTextAt(e) {
      return ""
  }
  onSourceChanged(e) {
      this.onSourceChangedCallback = e
  }
  onEvent(e, t) {}
  _getEditorParams() {
      return {
          readOnly: !1,
          holder: this.editorDivId,
          tools: {
              header: {
                  class: Header,
                  inlineToolbar: ["link"],
                  config: {
                      placeholder: "Header"
                  },
                  shortcut: "CMD+SHIFT+H"
              },
              image: {
                  class: SimpleImage,
                  inlineToolbar: ["link"]
              },
              list: {
                  class: List,
                  inlineToolbar: !0,
                  shortcut: "CMD+SHIFT+L"
              },
              checklist: {
                  class: Checklist,
                  inlineToolbar: !0
              },
              quote: {
                  class: Quote,
                  inlineToolbar: !0,
                  config: {
                      quotePlaceholder: "Enter a quote",
                      captionPlaceholder: "Quote's author"
                  },
                  shortcut: "CMD+SHIFT+O"
              },
              warning: Warning,
              marker: {
                  class: Marker,
                  shortcut: "CMD+SHIFT+M"
              },
              code: {
                  class: CodeTool,
                  shortcut: "CMD+SHIFT+C"
              },
              delimiter: Delimiter,
              inlineCode: {
                  class: InlineCode,
                  shortcut: "CMD+SHIFT+C"
              },
              linkTool: LinkTool,
              embed: Embed,
              table: {
                  class: Table,
                  inlineToolbar: !0,
                  shortcut: "CMD+ALT+T"
              }
          },
          data: {
              blocks: []
          },
          onChange: (e, t) => {
              this.onSourceChangedCallback && this.onSourceChangedCallback()
          }
      }
  }
}
class _asce18_ {
  constructor(e) {
      this.aceEditor = ace.edit(e), this.setEditorTheme("tomorrow_night"), this.aceEditor.getSession().setMode("ace/mode/javascript"), this.aceEditor.getSession().setUseSoftTabs(!0), this.aceEditor.getSession().setTabSize(2)
  }
  isReadOnly() {}
  setReadOnly(e) {}
  setEditorTheme(e) {
      this.aceEditor.setTheme("ace/theme/" + e)
  }
  setEditorSource(e) {
      this.aceEditor.setValue(e, -1)
  }
  getEditorSource() {
      return this.aceEditor.getValue()
  }
  getEditorSourceNumLines() {
      return this.aceEditor.session.getLength()
  }
  getCurrentLine() {
      return this.aceEditor.getSelectionRange().start.row
  }
  getCurrentSelectionLines() {
      return {
          start: this.aceEditor.getSelectionRange().start.row,
          end: this.aceEditor.getSelectionRange().end.row
      }
  }
  getCurrentLineText() {
      var e = this.aceEditor.getSelectionRange().start.row;
      return this.aceEditor.session.getLine(e)
  }
  getLineTextAt(e) {
      return this.aceEditor.session.getLine(e)
  }
  onSourceChanged(e) {
      this.aceEditor.getSession().on("change", e)
  }
  onEvent(e, t) {
      this.aceEditor.on(e, t)
  }
  setEditorMode(e) {
      this.aceEditor.getSession().setMode(e)
  }
  getEditorMode(e) {
      var t = null != e ? e.toLowerCase() : e;
      switch (t) {
          case "":
          case void 0:
          case "text":
          case "txt":
              return "ace/mode/text";
          case "html":
              return "ace/mode/html";
          case "css":
              return "ace/mode/css";
          case "scss":
              return "ace/mode/scss";
          case "js":
          case "javascript":
          case "jscript":
              return "ace/mode/javascript";
          case "php":
              return "ace/mode/php";
          case "py":
          case "python":
              return "ace/mode/python";
          case "c":
          case "h":
              return "ace/mode/c_cpp";
          case "hpp":
          case "h++":
              return "ace/mode/c_cpp";
          case "cpp":
          case "c++":
              return "ace/mode/c_cpp";
          case "java":
              return "ace/mode/java";
          default:
              return "ace/mode/" + t
      }
  }
}
const m = {
  isJustStarted: !0,
  e: null,
  fileInfo: {},
  dslNameList: {},
  status: {}
};

function winAlert(e, t) {
  t = null == t || t, new WinBox("Alert", {
      modal: !0,
      autosize: !0,
      background: "Crimson",
      html: '<div style="margine: 0px;">' + `<pre style="${t?"text-align: center;":""}">` + e + "</pre></div>"
  })
}

function _init() {
  m.mddStatus = document.getElementById("mdd-status"), setDivAsResizable("#palette", "px", () => {
      _resizeWindow(), m.e._uss54_()
  }), _lfs66_(), _lcs67_(urlParams)
}

function popFromHistory() {
  return getStatus("graphHistory").pop()
}

function setSystemReadOnly(e) {
  e = null == e || e, m.status.isReadOnly = e, m.mddStatus.style["border-style"] = e ? "dashed" : "solid"
}

function setSystemError(e) {
  m.mddStatus.className = "error"
}

function setSystemNeedSave() {
  m.status.isReadOnly || (m.mddStatus.className = "warning")
}

function setSystemSaved() {
  m.status.isReadOnly || (m.mddStatus.className = "saved")
}

function setFileIndexStatus(e) {
  e && (e(m), m.isJustStarted || m.e._shc20_(m.e.id))
}

function setStatus(e) {
  e && (e(m.status), m.isJustStarted || m.e._shc20_(m.e.id))
}

function getStatus(e) {
  return m.status[e]
}

function getMainGraph() {
  return m.e.getEditor(config.htmlDiv.graphDiv)
}

function getMainGraphURL() {
  return getMainGraph().graphPath
}

function getNodeData(e, t) {
  var i, o = getMainGraph();
  let a = o.getNodeData(e, t);
  return a && null != a.linkToKey ? (null != (i = o.getNodeData(a.linkToKey)).fileURL && (a.fileURL = i.fileURL), null != i.fileContent && (a.fileContent = i.fileContent)) : a = o.getNodeData(e, t), a
}

function setNodeDataField(e, t, i) {
  var o = getMainGraph(),
      a = o.getNodeData(e, !0);
  a && null != a.linkToKey ? (o.setNodeDataField(e, t, i), "fileURL" != t && "fileContent" != t || o.setNodeDataField(a.linkToKey, t, i)) : o.setNodeDataField(e, t, i)
}

function getLinkData(e, t) {
  return getMainGraph().getLinkData(e, t)
}

function setLinkDataField(e, t, i) {
  getMainGraph().setLinkDataField(e, t, i)
}

function setViewFromLabel(e, t, i) {
  var o = getMainGraph(),
      e = o.diagram.findNodesByExample({
          label: e
      }),
      a = e && 0 < e.count;
  return a && o.setViewFromNode(e.first(), t, i), a
}

function setViewFromKey(e, t, i) {
  var o = getMainGraph(),
      e = o.diagram.findNodeForKey(e),
      a = null != e;
  return a && o.setViewFromNode(e, t, i), a
}

function selectNodesByKey(e) {
  getMainGraph().selectAllNodeByKey(e)
}

function centerNodeByKey(e) {
  selectNodesByKey([e]), getMainGraph().setViewCenteredOnSelectedNode()
}

function centerNodeOfWindow(e) {
  centerNodeByKey(m.e._getWindowKey(e))
}

function selectNodeOfWindow(e) {
  selectNodesByKey([m.e._getWindowKey(e)])
}

function getNodeDataOutPortContent(e, t) {
  let i = "";
  var e = me.getNodeListFanOutByNodeKey(modelId, e.key, t);
  return e && e.length && (e[0].fileURL, t = m.e._getDOMUniqueId(e[0]), e = m.e.getEditor(t), i = e.getEditorSource()), i
}

function _ss64_(e) {
  var t = config.host.statusURL;
  m.e._uss54_(), _saveFile(t, JSON.stringify(m.status, null, 2), () => {
      m.e._es22_(m.e.id), e && e()
  })
}

function _sae65_() {
  for (const e of Object.keys(_ecm2_.unsavedEditor)) m.e.getEditorInfo(e)._sec38_()
}

function _lfs66_() {
  _openFile(config.host.fileServerSystemURL + "/dslList.json", e => {
      m.dslNameList = JSON.parse(e)
  }), _openFile(config.host.fileServerSystemURL + "/fileIndex.json", e => {
      m.fileInfo = JSON.parse(e)
  })
}

function _lcs67_(i) {
  _openFile(config.host.statusURL, e => {
      m.status = JSON.parse(e), m.status.fileServer && delete m.status.fileServer, m.e = new _em16_(m.status);
      e = config.htmlDiv.graphDiv;
      let t = m.status.currentGraphNode;
      (t = i.url && i.url.startsWith(config.host.fileServerURL) && i.url.endsWith(".json") ? {
          key: "URLParams Graph",
          isDir: !0,
          fileURL: i.url,
          fileType: "text/json"
      } : t).fileURL || (t = config.graph.rootGraphNodeData), m.e.openWindow(e, "GraphEditor", t), m.e._rss55_(), setTimeout(() => m.isJustStarted = !1, 500), _ecm2_.onGlobalNeedSave(setSystemNeedSave), _ecm2_.onGlobalIsSaved(setSystemSaved)
  })
}

function loadDSLScriptList(e, t) {
  if (Array.isArray(e)) {
      const i = [...e];
      e = i.shift();
      e ? loadDSLScript(e, () => {
          loadDSLScriptList(i, t)
      }) : t && t()
  } else t && t()
}

function loadDSLScript(e, t) {
  m.dslNameList[e] ? loadScript(m.dslNameList[e], () => {
      window[e + "_includeList"] ? loadScriptList(window[e + "_includeList"](), t) : t && t()
  }) : t && t()
}

alert = winAlert;