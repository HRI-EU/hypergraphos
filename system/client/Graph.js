/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Main Graph Editor
Date: 10.07.2020
=============================================================================
*/

var $ = go.GraphObject.make;  // for conciseness in defining templates

class Graph {
	constructor( param ) {
		// fullPaletteId, nodePaletteId, linkPaletteId, graphId
		param = ( param? param: {} );

		// Graphical Canvas
		this.diagram = null;
		this.fullPaletteId = null;
		this.nodePalette = null;
		this.groupPalette = null;
		this.linkPalette = null;
		this.lastNodeKey = null;
		this.dslNameList = [];
		this.isReadOnly = false;
		// Path of the loaded graph
		this.graphPath = '';

		// Store fullPaletteId for hide/show palette
		if( param.fullPaletteId ) {
			this.fullPaletteId = param.fullPaletteId;
		}

		// create the Palette
		if( param.nodePaletteId ) {
			this.nodePalette = this.newNodePalette( param.nodePaletteId );
		}
		if( param.groupPaletteId ) {
			this.groupPalette = this.newGroupPalette( param.groupPaletteId );
		}
		if( param.linkPaletteId ) {
			this.linkPalette = this.newLinkPalette( param.linkPaletteId );
		}
		if( param.graphId ) {
			this.diagram = this.newDiagram( param.graphId );
		} else {
			// Case of no DIV diagram (no visual part)
			this.diagram = this.newDiagram(); // TODO: test this case if works well
		}

		// Graph Evetns
		this.em = new EventManager();
		this.em.addList({
			onSelection:								{ help: 	'Inform that the selection has changed in the graph',
																		params: { dataList: 'List of selected node-data' } },
			onGraphChanged:							{ help: 	'Inform that graph has changed' },
			onFirstLayoutCompleted:			{ help: 	'Inform that graph has completed the first layout after load' },
			onLoadGraph: 								{ help:   'Load a new graph in canvas', 
			  	           								params: { nodeData: 'node-data of the the graph to load' } },
		  onLoadFile:       					{ help:   'Open dialog with a file in a new editor',
																		params: { nodeData: 'node-data of the the file to load', 
																							x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
			onClone:                    { help:   'Clone the duplicated node',
		                                params: { nodeData: 'data of the target clone' } },
			onShowRootGraph: 						{ help: 	'Load system root graph' },
			onSetReadOnly:   						{ help: 	'Set read-only navigation (never save changes to server)',
																		params: { status: 'true/false' } },
			onShowParentGraph:					{ help: 	'Load parent graph in canvas' },
			onShowPreviousGraph:  			{ help: 	'Load previous graph in canvas' },
			onShowFindDialog:						{ help: 	'Open dialog for searching in the current graph',
																		params: { x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
			onShowAnimatorEditor:				{ help: 	'Open dialog for animating nodes in current graph',
																		params: { x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
			onShowDSLListDialog:				{ help: 	'Open dialog for adding/removing DSL',
																		params: { x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
			onShowGraphTemplateDialog:	{ help: 	'Open dialog for selecting a graph template',
																		params: { x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
			onShowSysMonitorDialog:			{ help: 	'Open dialog for monitoring system information',
																		params: { x: 'last x mouse click position', 
																							y: 'last y mouse click position' } },
		});

		// Create context menu object
		this.contextMenu = new HTMLMenu( 'contextMenuContainer' );
		// GoJS Parameter for each item
		this.contextMenu.addParams( 'gojs', {
			diagram: this.diagram,
			tool:    this.diagram.currentTool,
			cmd:     this.diagram.commandHandler,
			cmt:     this.diagram.toolManager.contextMenuTool,
		});
		this.contextMenu.add({
      'diagramContextMenu': 
				{	layout: 'vertical', itemList: [
					{ label: 'Properties',					do: ( o )=> winAlert( this.getDiagramInfo( this.diagram.model ), false )},
					{ label: 'View',       layout: 'vertical',	subMenu: [
						{ label: 'Zoom to Fit',			  do: this.doZoomToFit.bind(this) },
						{ separator: '-' },
						{ label: 'Show View 1',				do: (o)=> { if( o.event.shiftKey ) {
																												this.setCurrentViewToBookmark( 1 );
																											} else {
																												this.setToBookmarkView( 1 );
																											} }},
						{ label: 'Show View 2',				do: (o)=> { if( o.event.shiftKey ) {
																												this.setCurrentViewToBookmark( 2 );
																											} else {
																												this.setToBookmarkView( 2 );
																											} }},
						{ label: 'Show View 3',				do: (o)=> { if( o.event.shiftKey ) {
																												this.setCurrentViewToBookmark( 3 );
																											} else {
																												this.setToBookmarkView( 3 );
																											} }},
						{ label: 'Show View 4',				do: (o)=> { if( o.event.shiftKey ) {
																												this.this.setCurrentViewToBookmark( 4 );
																											} else {
																												this.setToBookmarkView( 4 );
																											} }},
						{ label: 'Show Prev View',		do: this.setCurrentViewToPreviousView.bind(this) },
					]},
					{ separator: '-',               if: (o)=> { // NOTE: if we define a location, paste do not showup in the popup menu
																											//const location = o.d.cmt.mouseDownPoint;
																											return( o.d.cmd.canPasteSelection( location ) ); }},
					{ label: 'Paste',      					if: (o)=> { // NOTE: if we define a location, paste do not showup in the popup menu
																											//const location = o.d.cmt.mouseDownPoint;
																											return( o.d.cmd.canPasteSelection( location ) ); },
																					do: (o)=> { const location = o.d.cmt.mouseDownPoint;
																												o.d.cmd.pasteSelection( location ); }},
					{ separator: '-' },
					{ label: 'Find',      					do: (o)=> { const mousePos = this.diagram.lastInput.viewPoint;
																											this.em.call.onShowFindDialog( mousePos.x, mousePos.y );
																										} },
					{ separator: '-' },
					{ label: 'Tools',       layout: 'vertical', subMenu: [
						{ label: 'Toggle Visible Palette', 	if: (o)=> ( this.fullPaletteId? true: false ),
																								do: (o)=> { const htmlObj = document.querySelector( `#${this.fullPaletteId}` );
																														const v = htmlObj.style.visibility;
																														htmlObj.style.visibility = ( v == 'visible'? 'hidden': 'visible' ); 
																													  // Position palette in browser view
																														const browserWidth = window.innerWidth;
																														const browserHeight = window.innerHeight;
																														htmlObj.style.left = Math.min( browserWidth-100, Math.max( 0, htmlObj.offsetLeft ) );
																														htmlObj.style.top = Math.min( browserHeight-100, Math.max( 0, htmlObj.offsetTop ) );
																													}},
						{ label: 'Toggle Visible Grid', do: (o)=> this.diagram.grid.visible = !this.diagram.grid.visible },
						{ separator: '-' },
						{ label: 'Show DSL List',			do: (o)=> { const mousePos = this.diagram.lastInput.viewPoint;
																											this.em.call.onShowDSLListDialog( mousePos.x, mousePos.y ); } },
						{ label: 'Show Graph Template',	do: (o)=> { const mousePos = this.diagram.lastInput.viewPoint;
																												this.em.call.onShowGraphTemplateDialog( mousePos.x, mousePos.y ); } },
						{ label: 'Show System Monitor',		do: (o)=> { const mousePos = this.diagram.lastInput.viewPoint;
																													this.em.call.onShowSysMonitorDialog( mousePos.x, mousePos.y ); } },
						{ label: 'Show Animator',			do: (o)=> { const mousePos = this.diagram.lastInput.viewPoint;
																											this.em.call.onShowAnimatorEditor( mousePos.x, mousePos.y ); } },
					]},
					{ label: 'Navigate',		layout: 'vertical', subMenu: [
						{ label: 'Go To Parent Graph',	if: (o)=> !this.isRootGraph,
																						do: (o)=> { if( !this.isRootGraph) this.em.call.onShowParentGraph(); } },
						{ label: 'Back To Previous Graph',	if: (o)=> !this.isHistoryEmpty,
																						do: (o)=> { if( !this.isHistoryEmpty ) this.em.call.onShowPreviousGraph(); } },
						{ label: 'Go To Root Graph',		if: (o)=> !this.isRootGraph,
																						do: (o)=> this.em.call.onShowRootGraph() },
					]},
					{ separator: '-' },
					{ label: 'Set Read-only Mode',    if: (o)=> !this.isReadOnly,
																						do: (o)=> { this.isReadOnly = true;
																												this.em.call.onSetReadOnly( true ); } },
					{ label: 'Unset Read-only Mode',  if: (o)=> this.isReadOnly,
																						do: (o)=> { this.isReadOnly = false;
																												this.em.call.onSetReadOnly( false ); } },
					{ separator: '-',         if: (o)=> o.d.cmd.canUndo() || o.d.cmd.canRedo() },
					/*{ label: 'Undo',      					if: (o)=> o.d.cmd.canUndo(),
																					do: (o)=> o.d.cmd.undo() },
					{ label: 'Redo',      					if: (o)=> o.d.cmd.canRedo(),
																					do: (o)=> o.d.cmd.redo() },*/
					{ layout: 'horizontal', itemList: [
						{ fontIcon: 'action-undo', hint: 'Undo (CTRL-Z)',     if: (o)=> o.d.cmd.canUndo(),
																																	do: (o)=> o.d.cmd.undo() },
						{ fontIcon: 'action-redo', hint: 'Undo (CTRL-Z)',     if: (o)=> o.d.cmd.canRedo(),
																																	do: (o)=> o.d.cmd.redo() },
					]},
				]},
			'nodeContextMenu':
				{ layout: 'vertical', itemList: [
					{ label: 'Zoom it',     do: this.doZoomToFitSlectedNode.bind(this,5) },
					{ separator: '-' },
					{ label: 'Duplicate',   if: (o)=> {	const location = o.d.cmt.mouseDownPoint;
																							return( o.d.cmd.canCopySelection() ); },
																	do: (o)=> { const location = o.d.cmt.mouseDownPoint;
																							o.d.cmd.copySelection();
																							o.d.cmd.pasteSelection( location ); } },
					{ label: 'Clone',       if: (o)=> this.canEditClone(),
																	do: (o)=> this.doEditClone() },
					{ label: 'Cut',         if: (o)=> o.d.cmd.canCutSelection(),
																	do: (o)=> o.d.cmd.cutSelection() },
					{ label: 'Copy',        if: (o)=> o.d.cmd.canCopySelection(),
																	do: (o)=> o.d.cmd.copySelection() },
					{ label: 'Paste',       if: (o)=> { // TODO: check, I do not define location
																							// but, it seems that with location, paste become unavailable
																							o.d.cmd.canPasteSelection( location ); },
																	do: (o)=> { const location = o.d.cmt.mouseDownPoint;
																							o.d.cmd.pasteSelection( location ); } },
					{ label: 'Delete',      if: (o)=> o.d.cmd.canDeleteSelection(),
																	do: (o)=> o.d.cmd.deleteSelection() },
					{ separator: '-' },
					{ label: 'Set From Palette',	do: (o)=> this._resetSelectionFromPalette() },
					{ separator: '-' },
					{ label: 'Group',       if: (o)=> o.d.cmd.canGroupSelection(),
																	do: (o)=> o.d.cmd.groupSelection() },
					{ label: 'Ungroup',     if: (o)=> o.d.cmd.canUngroupSelection(),
																	do: (o)=> o.d.cmd.ungroupSelection() },
					{ label: 'Ungroup Nodes',if: (o)=> !o.d.cmd.canUngroupSelection() && this.canUngroupSelectedNodes(),
																	do: (o)=> this.doUngroupSelectedNodes() },
					{ separator: '-',         if: (o)=> this._canOpenFile() || this._canOpenSubGraph() },
					{ label: 'Open File',   if: (o)=> this._canOpenFile(),
																	do: (o)=> { const data = this.getFirstSelectedNodeData();
																							if( data ) {
																								const mousePos = this.diagram.lastInput.viewPoint;
																								this.em.call.onLoadFile( data, mousePos.x, mousePos.y );
																							} }},
					{ label: 'Open Sub-Graph',	if: (o)=> this._canOpenSubGraph(),
																			do: (o)=> { const data = this.getFirstSelectedNodeData();
																									if( data ) {
																										this.em.call.onLoadGraph( data );
																									} }},
					{ separator: '-',         if: (o)=> o.d.cmd.canUndo() || o.d.cmd.canRedo() },
					{ label: 'Undo',        if: (o)=> o.d.cmd.canUndo(),
																	do: (o)=> o.d.cmd.undo() },
					{ label: 'Redo',        if: (o)=> o.d.cmd.canRedo(),
																	do: (o)=> o.d.cmd.redo() },
				]},
		});
		this.shortcutList = [
			// Save all
			{ key: 's', control:true, do: ()=> console.log( 'save all' ) },
			// Zoom to Node (NOTE: with control its not yet working)
			{ key: '2', control:true, do: this.doZoomToFitSlectedNode.bind(this,2) },
			{ key: '3', control:true, do: this.doZoomToFitSlectedNode.bind(this,3) },
			{ key: '4', control:true, do: this.doZoomToFitSlectedNode.bind(this,4) },
			{ key: '5', control:true, do: this.doZoomToFitSlectedNode.bind(this,5) },
			// Zoom to Fit
			{ key: '1', do: this.doZoomToFit.bind(this) },
			// Zoom to Factor
			{ key: '2', do: this.doZoomToFactor.bind(this,2) },
			{ key: '3', do: this.doZoomToFactor.bind(this,3) },
			{ key: '4', do: this.doZoomToFactor.bind(this,4) },
			{ key: '5', do: this.doZoomToFactor.bind(this,4) },
			// Center Graph
			{ key: 'C', do: this.setViewCenteredOnSelectedNode.bind(this) },
		];

		this.diagram.contextMenu = this.contextMenu.getMenu( 'diagramContextMenu' );
		this.nodeContextMenu = this.contextMenu.getMenu( 'nodeContextMenu' );

		// Initialize instance variables
		this.clearInstance();

		this.isDeleteEnabled = false;
		this.isDoubleClickCreateNodeEnabled = true;
		this.isRootGraph = true;
		this.isHistoryEmpty = true;
		this.viewBookmark = new Array( 2 );
		this.systemNodeDataFieldList = [
			'text',
			'location',
			'size',
			'key',
			'group',
		];
		this.systemLinkDataFieldList = [
			'from',
			'to',
			'points',
		];
		this.dslNodeFieldNameList = new Set( ['key'] );
	}
	registerEvent( name, callback ) {
		this.em.register( name, callback );
	}
	registerEventList( callbackList ) {
		this.em.registerList( callbackList );
	}
	setDSL( dsl ) {
		this._setNodeDSL( dsl );
		this._setLinkDSL( dsl );
		this._setGroupDSL( dsl );
	}
	addDSL( dslDest, dslSrc ) {
		if( dslSrc.templateNodeList && dslSrc.dataNodeList ) {
			if( !dslDest.templateNodeList ) {
				dslDest.templateNodeList = [];
			}
			if( !dslDest.dataNodeList ) {
				dslDest.dataNodeList = [];
			}
			dslDest.templateNodeList = dslDest.templateNodeList.concat( dslSrc.templateNodeList );
			dslDest.dataNodeList = dslDest.dataNodeList.concat( dslSrc.dataNodeList );
		}
		if( dslSrc.templateLinkList && dslSrc.dataLinkList ) {
			if( !dslDest.templateLinkList ) {
				dslDest.templateLinkList = [];
			}
			if( !dslDest.dataLinkList ) {
				dslDest.dataLinkList = [];
			}
			dslDest.templateLinkList = dslDest.templateLinkList.concat( dslSrc.templateLinkList );
			dslDest.dataLinkList = dslDest.dataLinkList.concat( dslSrc.dataLinkList );
		}
		if( dslSrc.templateGroupList && dslSrc.dataGroupList ) {
			if( !dslDest.templateGroupList ) {
				dslDest.templateGroupList = [];
			}
			if( !dslDest.dataGroupList ) {
				dslDest.dataGroupList = [];
			}
			dslDest.templateGroupList = dslDest.templateGroupList.concat( dslSrc.templateGroupList );
			dslDest.dataGroupList = dslDest.dataGroupList.concat( dslSrc.dataGroupList );
		}
	}
	setDSLNameList( dslNameList ) {
		this.dslNameList = dslNameList;
	}
	getDSLNameList() {
		return( this.dslNameList );
	}
	getDSLFieldNameList() {
		return( Array.from( this.dslNodeFieldNameList ) );
	}
	isDataValidField( fieldName ) {
		return( this.dslNodeFieldNameList.has( fieldName ) );
	}
	loadDSLList( dslNameList, onLoaded ) {
		let allDSL = null;
		this.dslNodeFieldNameList = new Set();
		const onAllDSLLoaded = ()=> {
			let dsl = null;
			for( const dslName of dslNameList ) {
				if( window[dslName+'_getDSL'] ) {
					// Call the DSLName_getDSL() function to get the dsl data
					dsl = window[dslName+'_getDSL']( this );
					this._storeDSLNodeFieldNameList( dsl );
					if( allDSL ) { // If we already loaded one dsl, then we add
						this.addDSL( allDSL, dsl );
					} else { // If we are loading the first dsl, we set it
						allDSL = dsl;
					}
				}
			}
			if( allDSL ) {
				this.setDSL( allDSL );
				for( const dslName of dslNameList ) {
					if( window[dslName+'_setupDSL'] ) {
						// Call the DSLName_setupDSL() function to configure nodes/links/groups
						window[dslName+'_setupDSL']( this );
					}
				}
			}
			if( onLoaded ) {
				onLoaded();
			}
		};
		loadDSLScriptList( dslNameList, onAllDSLLoaded );
		this.setDSLNameList( dslNameList );
	}
	getPaletteInfo() {
		let result = null;
		const htmlObj = document.querySelector( `#${this.fullPaletteId}` );
		let isVisible = ( htmlObj.style.visibility == 'visible' );
		const position = [ parseInt( htmlObj.style.left ),
												parseInt( htmlObj.style.top ),
												parseInt( htmlObj.style.width ),
												parseInt( htmlObj.style.height ) ];
		result = {
			key: 'DSL Palette',
			isFile: true,
			fileType: 'input/fields',
			fileURL: '#systemPalette#',
			editorPosition: position,
			isVisible: isVisible,
		};
		return( result );
	}
	restorePalette( nodeData ) {
		const htmlObj = document.querySelector( `#${this.fullPaletteId}` );
		if( nodeData.editorPosition ) {
			const position = nodeData.editorPosition;
			// Position palette
			const browserWidth = window.innerWidth;
			const browserHeight = window.innerHeight;
			if( position && position[0] ) { 
				htmlObj.style.left = Math.min( browserWidth-100, Math.max( 0, position[0] ) )+'px';
			}
			if( position && position[1] ) {
				htmlObj.style.top = Math.min( browserHeight-100, Math.max( 0, position[1] ) )+'px';
			}
			if( position && position[2] ) { htmlObj.style.width = position[2]+'px'; }
			if( position && position[3] ) { htmlObj.style.height = position[3]+'px'; }
		}
		if( nodeData.isVisible ) {
			htmlObj.style.visibility = ( nodeData.isVisible? 'visible': 'hidden' );
		}
	}
	clearNodePalette() {
		if( this.nodePalette ) {
			this.nodePalette.model = this.newEmptyModel();
		}
	}
	clearLinkPalette() {
		if( this.linkPalette ) {
			this.linkPalette.model = this.newEmptyModel();
		}
	}
	setGraphPath( path ) {
		this.graphPath = path;
	}
	getGraphPath() {
		return( this.graphPath );
	}
	setAllowDeleteKey( isDeleteEnabled ) {
		this.isDeleteEnabled = isDeleteEnabled;
		// NOTE: this is a quick fix because the evet handler 'doKeyDown'
		//       for keys have a 'this' which is not the this of Graph. 
		// newDiagram( divId ) {
		//   ...
		//   diagram.commandHandler.doKeyDown = function() {}
		// }
		//
		this.diagram.isDeleteEnabled = isDeleteEnabled;
		// End FIX
	}
	setAllowDoubleCliceCreateNode( status ) {
		status = ( status == undefined? true: status );
		this.isDoubleClickCreateNodeEnabled = status;

		// update diagram event
		if( !this.isDoubleClickCreateNodeEnabled ) {
			this.diagram.toolManager.clickCreatingTool = null
		}
	}
	getGraphImage() {
		let image = null;
		if( this.diagram ) {
			image = this.diagram.makeImageData({ 
				returnType: 'string',
				size: new go.Size( 800, 532 ),
				padding: new go.Margin( 50, 10, 10, 10 ),
			});
		}
		return( image );
	}
	getRootNodes() {
		return( this.diagram.nodes );
	}
	setModel( model ) {
		if( this.diagram ) {
			this.clearInstance();
			this.diagram.model = model;
			this.diagram.model.copiesKey = false;
			this.diagram.model.makeUniqueKeyFunction = this.newUniqueKey.bind(this);
			this.diagram.model.undoManager.isEnabled = true;
			this.diagram.model.addChangedListener( this._onGraphChangedFilter.bind(this) );
			// These two lines make sure that nodes are copied in copy/paste as deep copy
			this.diagram.model.copiesArrays = true;
			this.diagram.model.copiesArrayObjects = true;
			this.diagram.model.linkKeyProperty = 'key';
			// necessary to remember portIds 
			this.diagram.model.linkFromPortIdProperty = 'fromPort';
			this.diagram.model.linkToPortIdProperty = 'toPort';
			// Reset last key used by function newUniqueKey()
			this.lastNodeKey = null;

			// Make graph fully visible
			this.diagram.zoomToFit();
		}
	}
	setJSONModel( jsonModel ) {
		const scale = this.diagram.scale;
		const x = this.diagram.position.x;
		const y = this.diagram.position.y;
		if( this.diagram ) {
			let model = null;
			if( jsonModel ) {
				model = go.Model.fromJson( jsonModel );
			} else {
				model = this.newEmptyModel();
			}
			this.setModel( model );
			this.diagram.scale = scale;
			this.diagram.initialPosition = new go.Point( x, y );
			//this.diagram.position = new go.Point( x, y );
		}
	}
	getJSONModel() {
		let jsonModel = '';
		if( ( this.diagram ) &&  ( this.diagram.model.nodeDataArray.length > 0 ) ) {
			jsonModel = this.diagram.model.toJson();
		}
		return( jsonModel );
	}
	getEditorSource() {
		const diagramPosition = this.diagram.position;
		const jsonModel = this.getJSONModel();
		if( this.dslNameList.length == 0 ) {
			this.dslNameList = config.graph.defaultDSL;	
		}
		const sourceInfo = {
			// TODO: load all DSL used in this graph
			dslNameList: this.dslNameList,
			view: {
				scale: this.diagram.scale,
				position: [diagramPosition.x, diagramPosition.y],
				isGridOn: this.diagram.grid.visible,
			},
			model: jsonModel,
		};
		const source = JSON.stringify( sourceInfo );
		return( source );
	}
	setEditorSource( source, onDone ) {
		// Get an object from the extended model
		let objModel = null;
		if( source ) {
			objModel = JSON.parse( source );
		} else {
			objModel = {
				view: null,
				dslNameList: null,
				model: null,
			};
		}
		// This is the finalization of the graph loading
		const finalizeLoading = ()=> {
			// Set Model (null is also ok)
			this.setJSONModel( objModel.model );
			// Set last viewing settings
			if( objModel.view ) {
				if( objModel.view.scale != undefined ) {
					this.diagram.scale = objModel.view.scale;
				}
				if( objModel.view.position != undefined ) {
					const p = objModel.view.position;
					const x = ( p[0] != undefined? p[0]: 0 );
					const y = ( p[1] != undefined? p[1]: 0 );
					this.diagram.initialPosition = new go.Point( x, y );
				}
				if( objModel.view.isGridOn != undefined ) {
					this.diagram.grid.visible = objModel.view.isGridOn;
				}
			}
			// Set graphData (defined in ServerManager.js)
			graphData = {};

			if( onDone ) {
				onDone();
			}
		};
		// Here, if there are DSL to load
		// - then we load all DSL and only after we load the model/window (by finalizeLoading)
		// - otherwise we just load model/window (by finalizeLoading)
		// Set DSL
		if( objModel.dslNameList ) {
			this.loadDSLList( objModel.dslNameList, finalizeLoading );
		} else {
			finalizeLoading();
		}
	}
	setIsRootGraph( isRootGraph ) {
		this.isRootGraph = isRootGraph;
	}
	setIsHistoryEmpty( isHistoryEmpty ) {
		this.isHistoryEmpty = isHistoryEmpty;
	}
	getSelection() {
		let result = null;
		if( this.diagram ) {
			result = this.diagram.selection;
		}
		return( result );
	}
	getSelectionCount() {
		let result = 0;
		const sel = this.getSelection();
		if( sel ) {
			result = sel.count;
		}
		return( result );
	}
	getJSONSelection() {
		const list = this._getFilteredSelection( 4 );
		const jsonSelection = JSON.stringify( list, null, 2 );
		return( jsonSelection );
	}
	setJSONSelection( jsonSelection ) {
		try {
			const objSelection = JSON.parse( jsonSelection );
			const originalKeyList = objSelection.originalKey;
			if( originalKeyList ) {
				for( let i = 0; i < originalKeyList.length; ++i ) {
					const oKey = originalKeyList[i];
					const dataNode = objSelection[i];
					const fieldList = Object.keys( dataNode );
					for( const field of fieldList ) {
						if( field != 'key' ) { // Key can not be changed in a selection
							const value = dataNode[field];
							setNodeDataField( oKey, field, value );
						}
					}
				}
			}
		} catch( e ) { /* We enter here if selection have syntax errors */}
	}
	selectNodeByKey( key ) {
		this.diagram.select( this.diagram.findPartForKey( key ) );
	}
	selectAllNodeByKey( keyList ) {
		let nodeList = [];
		for( const key of keyList ) {
			nodeList.push( this.diagram.findPartForKey( key ) );
		}
		this.diagram.selectCollection( nodeList );
	}
	getCurrentView() {
		// Get current position
		const position = this.diagram.position;
		// Get current zoom scale
		const scale = this.diagram.scale;
		// Get grid visibility
		const isGridOn = this.diagram.grid.visible;
		// Define view info
		const viewInfo = {
			position: {
				x: position.x,
				y: position.y,
			},
			scale,
			isGridOn,
		};
		return( viewInfo );
	}
	setCurrentView( viewInfo ) {
		if( viewInfo.scale ) {
			// Restore first scale (must be first)
			this.diagram.scale = viewInfo.scale;
		}
		if( viewInfo.position ) {
			// Restore position
			this.diagram.position = new go.Point( viewInfo.position.x, viewInfo.position.y );
		}
		if( typeof( viewInfo.isGridOn ) == 'boolean' ) {
			// Restore grid
			this.diagram.grid.visible = viewInfo.isGridOn;
		}
	}
	setCurrentViewToBookmark( index ) {
		this.viewBookmark[index] = this.getCurrentView();
	}
	setCurrentViewToPreviousView() {
		if( this.viewBookmark[0] != undefined ) {
			this.setCurrentView( this.viewBookmark[0] );
		}
	}
	setToBookmarkView( index ) {
		if( this.viewBookmark[index] != undefined ) {
			// Store last view in ViewLast
			this.viewBookmark[0] = this.getCurrentView();
			// Go to new view
			this.setCurrentView( this.viewBookmark[index] );
		}
	}
	setViewFromNode( node, deltaX, deltaY ) {
		let result = false;
		if( node ) {
			const x = node.position.x+deltaX;
			const y = node.position.y+deltaY;
			// Define view info to jump to
			const viewInfo = {
				position: { x, y }
			};
			// Jump to slide
			this.setCurrentView( viewInfo );
			result = true;
		}
		return( result );
	}
	setViewCenteredOnSelectedNode() {
		const selection = this.getSelection();
		const node = selection.first();
		const result = ( node != null );
		if( result ) {
			// Get the center coordinates of the node
			const nodeCenterX = node.actualBounds.x;
			const nodeCenterY = node.actualBounds.y;
	
			// Get the size of the diagram's viewport
			const viewportWidth = this.diagram.viewportBounds.width;
			const viewportHeight = this.diagram.viewportBounds.height;
	
			// Calculate the desired viewport position to center the node
			const desiredViewportX = nodeCenterX - viewportWidth / 2;
			const desiredViewportY = nodeCenterY - viewportHeight / 2;
	
			// Set the diagram's viewport to the desired position
			this.diagram.position = new go.Point( desiredViewportX, desiredViewportY );
		}
		return( result );
	}
	doZoomToFitSlectedNode( factor ) {
		this.doZoomToFit();
		const isViewSet = this.setViewCenteredOnSelectedNode();
		if( isViewSet ) {
			this.doZoomToFactor( factor );
		}
	}
	doZoomToFit() {
		// Store last view in ViewLast
		this.viewBookmark[4] = this.getCurrentView();
		// Go to new view 
		this.diagram.zoomToFit();
	}
	doZoomToFactor( factor ) {
		this.diagram.scale = this.diagram.scale*factor;
	}
	doEditCut() {
		const cmd = this.diagram.commandHandler;
		if( cmd.canCutSelection() ) {
			cmd.cutSelection();
		}
	}
	doEditCopy() {
		const cmd = this.diagram.commandHandler;
		if( cmd.canCopySelection() ) {
			cmd.copySelection();
		}
	}
	doEditPaste( location ) {
		const cmd = this.diagram.commandHandler;
		if( cmd.canPasteSelection() ) {
			cmd.pasteSelection( location );
		}
	}
	doEditDuplicate( location ) {
		const cmd = this.diagram.commandHandler;
		if( cmd.canCopySelection() ) {
			cmd.copySelection();
			cmd.pasteSelection( location );
		}
	}
	canEditClone() {
		const selCount = this.getSelectionCount();
		const data = this.getFirstSelectedNodeData();
		return( data && 
						(( data.isFile || data.isDir ) && data.fileURL ) &&
						( selCount == 1 ) );
	}
	doEditClone() {
		const cmd = this.diagram.commandHandler;
		if( cmd.canCopySelection() ) {
			cmd.copySelection();
			cmd.pasteSelection();

			// If a single node is selected => clone it
			const data = this.getFirstSelectedNodeData();
			if( data ) {
				this.em.call.onClone( data );
			}
		}
	}
	doEditDelete() {
		const cmd = this.diagram.commandHandler;
		if( cmd.canDeleteSelection() ) {
			cmd.deleteSelection();
		}
	}
	canUngroupSelectedNodes() {
		let result = false;
		const selection = this.getSelection();
		const selIter = selection.iterator;
		while( selIter.next() ) {
			const node = selIter.value;
			const data = node.data;
			if( data.group !== undefined ) {
				result = true;
				break;
			}
		}
		return( result );
	}
	doUngroupSelectedNodes() {
		const selection = this.getSelection();
		selection.each( (node) => { 
			const data = node.data;
			if( data.group !== undefined ) {
				setNodeDataField( data, 'group', null );
			}
		});
	}
	centerGraphToNodeKey( key ) {
		const node = this.diagram.findNodeForKey( key );
		this.diagram.centerRect( node.actualBounds );
	}
	findAllNodeDataIf( conditionBodyFunc ) {
		// The parameter can be:
		// - a string with boolean expression like:
		//     d.key > 10
		// - a string with an exact match (tested in all fields):
		//     == 'Dialog'
		// - a string used to check if it is included in all fields:
		//     'Dialog'
		// - a pointer to a function that takes a parameter d (nodeData):
		//     ()=> {...}
		let result = [];

		// Define here a node with all possible fields available in the loaded DSL
		const fieldNameList = Array.from( this.dslNodeFieldNameList );
		let templateNode = {};
		const templateNodeStr = 'templateNode = {'+fieldNameList.join( ':"",' )+':""}';
		eval( templateNodeStr );

		// Define here the search condition
		let conditionFn = null;
		let isInternalFunction = false;
		// If conditionBody is:
		//   == "say_sentence" ==> search a perfect match
		//   "say_sentence"    ==> search a partial match
		if( typeof( conditionBodyFunc ) == 'string' ) {
			const conditionBodyTrim = conditionBodyFunc.trim();
			if( ( conditionBodyTrim.startsWith( '==' ) || 
						conditionBodyTrim.startsWith( '\'' ) || 
						conditionBodyTrim.startsWith( '"' ) ) &&
					( conditionBodyTrim.endsWith( '\'' ) ||
					conditionBodyTrim.endsWith( '"' ) ) ) {
				isInternalFunction = true;
				// Get if string is using single or double quote
				const stringLen = conditionBodyTrim.length;
				const stringQuote = conditionBodyTrim[stringLen-1];
				const stringBegin = conditionBodyTrim.indexOf( stringQuote )+1;
				// Get value of the search string, eg: say_sentence
				const searchValue = conditionBodyTrim.substring( stringBegin, stringLen-1 );
				if( conditionBodyTrim.startsWith( '==' ) ) {
					// Search perfect match
					conditionFn = (d)=> {
						const fieldList = Object.keys( d );
						for( const fieldName of fieldList ) {
							const value = d[fieldName];
							if( value && value == searchValue ) {
								return( true );
							}
						}
						return( false );
					};
				} else {
					// Search partial match
					conditionFn = (d)=> {
						const fieldList = Object.keys( d );
						for( const fieldName of fieldList ) {
							const value = d[fieldName]+'';
							if( value && value.includes( searchValue ) ) {
								return( true );
							}
						}
						return( false );
					};
				}
			} else {
				isInternalFunction = false;
				if( conditionBodyFunc.trim() ) {
					// If condition body is not just a string, we assume is in the form:
					// d.key == 1 && d.label == ""
					conditionFn = new Function( 'd', `return( ${conditionBodyFunc} )` );
				}
			}
		} else if( typeof( conditionBodyFunc ) == 'function' ) {
			isInternalFunction = false;
			// In case the parameter is a function => we use it
			conditionFn = conditionBodyFunc;
		}

		// Start loop on the node iterator
		const nodeIterator = this.diagram.nodes;
		nodeIterator.reset();
		if( conditionFn ) { // We execute the search if we have a condition function
			while ( nodeIterator.next() ) {
				//const n = nodeIterator.value;  // We don't use the GoJS node
				const d = nodeIterator.value.data;
				// We need a copy of the data (avoid to change GoHS data)
				let dataClean = {};
				if( isInternalFunction ) {
					// If it is an internal function we don't need to start from templateName
					dataClean = this._getDataCopy( d );
				} else {
					// If external function we should define all possible field so user condition 
					// will work all the time
					dataClean = this._getDataCopy( d, templateNode );
				}
				try {
					if( conditionFn( dataClean )) {
						result.push( dataClean );
					}
				} catch( error ) {
					// error in user function => skip it
				}
			}
		}
		return( result );
	}
	findAllNodeData( field, searchValue, isFirstOnly, isPerfectMatch ) {
		isFirstOnly = ( isFirstOnly == undefined? false: isFirstOnly );
		isPerfectMatch = ( isPerfectMatch == undefined? false: isPerfectMatch );
		let result = [];
		const it = this.diagram.nodes;
		it.reset();
		while ( it.next() ) {
			const n = it.value;
			const d = it.value.data;
			const value = d[field];
			if( value != undefined ) {
				let found = false;
				if( isPerfectMatch ) {
					found = ( value == searchValue );
				} else {
					const valueStr = value+'';
					found = ( valueStr.includes( searchValue ) );
				}
				if( found ) {
					const dataClean = this._getDataCopy( d );
					result.push( dataClean );
					if( isFirstOnly ) {
						break;
					}
				}
			}
		}
		return( result );
	}
	findNodeData( field, searchValue, isPerfectMatch ) {
		let result = null;
		let resultList = this.findAllNodeData( field, searchValue, true, isPerfectMatch );
		if( resultList && resultList[0] ) {
			result = resultList[0];
		} 
		return( result );
	}
	getFirstSelectedNodeData() {
		let result = null;
		if( this.diagram && this.diagram.selection.count ) {
			const node = this.diagram.selection.first();
			if( node ) {
				result = node.data;
			}
		}
		return( result );
	}
	getNodeData( key, isCopy ) {
		let result = null;
		// Get node data for the given key
		const data = this.diagram.model.findNodeDataForKey( key );
		if( data ) {
			if( data.isSystem ) {
				// If is system node => we give a copy of it
				const nodeData = this._getDataCopy( data );
				result = this.updateSystemNode( nodeData );
			} else {
				// If isCopy => return a shallow copy of the data
				if( isCopy ) {
					result = this._getDataCopy( data );
				} else {
					// If not system node => we give a pointer to it
					result = data;
				}
			}
		}
		return( result );
	}
	setNodeDataField( keyOrData, field, value ) {
		let data = keyOrData;
		if( typeof( keyOrData ) != 'object' ) {
			// Get node data for the given key
			data = this.diagram.model.findNodeDataForKey( keyOrData );
		}
		if( data ) {
			if( data.isSystem && ( field == 'fileContent' ) ) {
				switch( data.isSystem ) {
					case '$GraphModel$':
						this.setJSONModel( value );
						this._callOnNodeModelChanged();
						this._callOnNodeGraphSelectionChanged();
						break;
					case '$GraphSelection$':
						this.setJSONSelection( value );
						this._callOnNodeModelChanged();
						this._callOnNodeGraphSelectionChanged();
						break;
				}
			} else {
				if( data.isSystem && data.fileContent ) {
					delete data.fileContent;
				}
				this.diagram.startTransaction( 'Set Data Propery' );
				if( field == 'fileContent' && ( typeof( value ) != 'string' ) ) {
					// Force value to be a string in case is not (number, boolean,...)
					value = ''+value;
				}
				this.diagram.model.setDataProperty( data, field, value );
				this.diagram.commitTransaction( 'Set Data Propery' );
			}
			this.em.call.onGraphChanged();
		}
	}
	getLinkData( key, isCopy ) {
		let result = null;
		// Get link data for the given key
		const data = this.diagram.model.findLinkDataForKey( key );
		if( data ) {
			// If isCopy => return a shallow copy of the data
			if( isCopy ) {
				result = this._getDataCopy( data );
			} else {
				// If not system node => we give a pointer to it
				result = data;
			}
		}
		return( result );
	}
	setLinkDataField( key, field, value ) {
		// Get link data for the given key
		const data = this.diagram.model.findLinkDataForKey( key );
		if( data ) {
			this.diagram.startTransaction( 'Set Data Propery' );
			this.diagram.model.setDataProperty( data, field, value );
			this.diagram.commitTransaction( 'Set Data Propery' );
			this.em.call.onGraphChanged();
		}
	}
	moveSelectionRel( dx, dy ) {
		// TODO: this function do not work the second time it is called
		if( this.diagram.selection ) {
			this.diagram.startTransaction( 'Move Selection Relative' );
			for( const node of this.diagram.selection.toArray() ) {
				const p = node.position;
				node.moveTo( p.x+dx, p.y+dy );
			}
			this.diagram.commitTransaction( 'Move Selection Relative' );
		}
	}
	updateSystemNode( data ) {
		// NOTE: system node can not have a fileURL field
		if( data.isSystem ) {
			if( data.fileURL ) {
				delete data.fileURL;
			}
		}
		switch( data.isSystem ) {
			case '$GraphModel$':
				const strModel = this.getJSONModel();
				const objModel = JSON.parse( strModel );
				data.fileContent = JSON.stringify( objModel, null, 2 );
				data.onNodeChanged = (f)=> { 
					this.onNodeGraphModelChanged = { nodeData: data, callback: f };
				};
				break;
			case '$GraphSelection$':
				data.fileContent = this.getJSONSelection();
				data.onNodeChanged = (f)=> { 
					this.onNodeGraphSelectionChanged = { nodeData: data, callback: f };
				};
				break;
		}
		return( data );
	}
	filterObjectData( d, level ) {
		level = ( level != undefined? level: 2 );
		let result = {};

		const getObjectClassName = ( obj )=> {
			return( obj? obj.constructor.name: '' );
		}

		// We consider only objects with class name with more 
		// than 2 character name. GoJS define all classes with 
		// 1 or 2 char due to encryption
		if( getObjectClassName( d ).length > 2 ) {
			for( const field in d ) {
				if( !field.startsWith( '_' ) ) {
					const value = d[field];
					if( Array.isArray( value ) ) {
						result[field] = this.filterArrayData( value, level-1 );
					} else if( typeof( value ) == 'object' ) {
						result[field] = this.filterObjectData( value, level-1 );
					} else {
						result[field] = value;
					}
				}
			}
		}
		return( result );
	}
	filterArrayData( a, level ) {
		level = ( level != undefined? level: 2 );
		let result = [];
		if( level > 0 ) {
			for( const d of a ) {
				if( Array.isArray( d ) ) {
					result.push( this.filterArrayData( d, level-1 ) );
				} else if( typeof( d ) == 'object' ) {
					result.push( this.filterObjectData( d, level-1 ) );
				} else {
					result.push( d );
				}
			}
		}
		return( result );
	}
	doSetReadOnly( status ) {
		this.isReadOnly = status;
		this.em.call.onSetReadOnly( status );
	}
	//------------------------------------------
	// Private Functions
	//------------------------------------------
	_setNodeDSL( dsl ) {
		if( dsl.templateNodeList && dsl.dataNodeList ) {
			// Node TemplateMap
			let dNodeMap = new go.Map();
			let pNodeMap = new go.Map();
			for( const item of dsl.templateNodeList ) {
				const category = item.category;
				const param = ( item.param? item.param: undefined );
	
				const nInstance = item.template( param );
				nInstance.contextMenu = this.nodeContextMenu;
				nInstance.toolTip = this.newNodeToolTip();
				nInstance.locationSpot = go.Spot.Left;
				dNodeMap.add( category, nInstance );
				const pInstance = item.template( param );
				pInstance.locationSpot = go.Spot.Center;
				pNodeMap.add( category, pInstance );
			}
			if( this.diagram ) {
				this.diagram.nodeTemplateMap = dNodeMap;
			}
			if( this.nodePalette ) {
				this.nodePalette.nodeTemplateMap = pNodeMap;
				this._setPaletteDataNodeList( dsl.dataNodeList );
				this.nodePalette.scale = 0.7;
			}
		}
	}
	_setLinkDSL( dsl ) {
		if( dsl.templateLinkList && dsl.dataLinkList ) {
			// Link TemplateMap
			let dLinkMap = new go.Map();
			let pLinkMap = new go.Map();
			for( const item of dsl.templateLinkList ) {
				const category = item.category;
				const param = ( item.param? item.param: undefined );
	
				const lInstance = item.template( param );
				lInstance.contextMenu = this.nodeContextMenu;
				lInstance.toolTip = this.newLinkToolTip();
				lInstance.adjusting = go.Link.End;
				dLinkMap.add( category, lInstance );
				const plInstance = item.template( param );
				plInstance.selectable = false;
				pLinkMap.add( category, plInstance );
			}
			if( this.diagram ) {
				this.diagram.linkTemplateMap = dLinkMap;
			}
			if( this.linkPalette ) {
				this.linkPalette.linkTemplateMap = pLinkMap;
				this._setPaletteDataLinkList( dsl.dataLinkList );
				this.linkPalette.scale = 0.7;
			}
		}
	}
	_setGroupDSL( dsl ) {
		if( dsl.templateGroupList && dsl.dataGroupList ) {
			// Group TemplateMap
			let dGroupMap = new go.Map();
			let pGroupMap = new go.Map();
			for( const item of dsl.templateGroupList ) {
				const category = item.category;
				const param = ( item.param? item.param: undefined );
	
				const gInstance = item.template( param );
				gInstance.contextMenu = this.nodeContextMenu;
				gInstance.toolTip = this.newGroupToolTip();
				gInstance.locationSpot = go.Spot.Left;
				dGroupMap.add( category, gInstance );
				const pInstance = item.template( param );
				pInstance.locationSpot = go.Spot.Center;
				pGroupMap.add( category, pInstance );
			}
			if( this.diagram ) {
				this.diagram.groupTemplateMap = dGroupMap;
			}
			if( this.groupPalette ) {
				this.groupPalette.groupTemplateMap = pGroupMap;
				this._setPaletteDataGroupList( dsl.dataGroupList ); // TODO
				this.groupPalette.scale = 0.7;
			}
		}
	}
	_setPaletteDataNodeList( dataNodeList ) {
		if( this.nodePalette ) {
			for( let i = 0; i < dataNodeList.length; ++i ) {
				dataNodeList[i].key = i+1;
			}
			this.nodePalette.model.nodeDataArray = dataNodeList;
			this.nodePalette.toolManager.dragSelectingTool.isEnabled = false;
			this.nodePalette.maxSelectionCount = 1;
			this.nodePalette.lastSelectedNode = null;

			// Once the graph and palette are shown, we need to scroll a bit
			// the node/link palette to show the first entry well
			this.nodePalette.addDiagramListener( 'LayoutCompleted', (diagramEvent)=> {
				// Scroll a bit up to show first node well
				this.nodePalette.scroll( 'pixel', 'up', 50 );
			});

			if( this.diagram ) {
				const setArchetypeOnSelection = ()=> {
					const node = this.nodePalette.selection.first();
					if( node && this.diagram.toolManager.clickCreatingTool ) {
						this.nodePalette.lastSelectedNode = node;
						const dataNode = node.data;
						this.diagram.toolManager.clickCreatingTool.archetypeNodeData = dataNode;
					} else {
						this.nodePalette.select( this.nodePalette.lastSelectedNode );
					}
				};
				this.nodePalette.addDiagramListener( 'ChangedSelection', setArchetypeOnSelection );
			}

			// Select by default the first node
			const defaultNode = this.nodePalette.findNodeForKey(1);
			if( defaultNode ) {
				this.nodePalette.select( defaultNode );
			}
		}
	}
	_setPaletteDataLinkList( dataLinkList ) {
		if( this.linkPalette ) {
			const nodeDataArray = [];
			let i = 1;
			for( const dataLink of dataLinkList ) {
				nodeDataArray.push( { key: i, category: 'LinkSource' } );
				// In palette we show either the 'text' property if specified
				// in link.data or category otherwise 
				const linkText = ( dataLink.text? dataLink.text: dataLink.category );
				nodeDataArray.push({ key: i+1, text: linkText, category: 'LinkDestination' });
				dataLink.from = i;
				dataLink.to   = i+1;
				i += 2;
			}
			let pNodeMap = new go.Map();
			pNodeMap.add( 'LinkSource', $(go.Node) );
			pNodeMap.add( 'LinkDestination', $(go.Node, 'Auto',
				{ locationSpot: go.Spot.Left },
				$(go.TextBlock, 
					{ margin: 4 },  // the tooltip shows the result of calling linkInfo(data)
					new go.Binding("text", "text")
				)
			));
			this.linkPalette.model.nodeDataArray = nodeDataArray;
			this.linkPalette.nodeTemplateMap = pNodeMap;
			this.linkPalette.model.linkDataArray = dataLinkList;
			this.linkPalette.toolManager.dragSelectingTool.isEnabled = false;
			this.linkPalette.maxSelectionCount = 1;
			this.linkPalette.lastSelectedLink = null;

			// Once the graph and palette are shown, we need to scroll a bit
			// the node/link palette to show the first entry well
			this.linkPalette.addDiagramListener( 'LayoutCompleted', (diagramEvent)=> {
				// Scroll a bit up to show first link well
				this.linkPalette.scroll( 'pixel', 'up', 50 );
			});

			if( this.diagram ) {
				const setArchetypeOnSelection = ()=> {
					const node = this.linkPalette.selection.first();
					if( node ) {
						this.linkPalette.lastSelectedNode = node;
						const link = node.findLinksInto().first();
						const dataLink = link.data;
						this.diagram.toolManager.linkingTool.archetypeLinkData = dataLink;
					} else {
						this.linkPalette.select( this.linkPalette.lastSelectedNode );
					}
				};
				this.linkPalette.addDiagramListener( 'ChangedSelection', setArchetypeOnSelection );
			}

			// Select by default the second node (linked to)
			const defaultNode = this.linkPalette.findNodeForKey(2);
			if( defaultNode ) {
				this.linkPalette.select( defaultNode );
			}
		}
	}
	_setPaletteDataGroupList( dataGroupList ) {
		if( this.groupPalette ) {
			for( let i = 0; i < dataGroupList.length; ++i ) {
				dataGroupList[i].key = i+1;
			}
			this.groupPalette.model.nodeDataArray = dataGroupList;
			this.groupPalette.toolManager.dragSelectingTool.isEnabled = false;
			this.groupPalette.maxSelectionCount = 1;
			this.groupPalette.lastSelectedNode = null;

			// Once the graph and palette are shown, we need to scroll a bit
			// the node/link palette to show the first entry well
			this.groupPalette.addDiagramListener( 'LayoutCompleted', (diagramEvent)=> {
				// Scroll a bit up to show first node well
				this.groupPalette.scroll( 'pixel', 'up', 50 );
			});

			if( this.diagram ) {
				const setArchetypeOnSelection = ()=> {
					const node = this.groupPalette.selection.first();
					if( node && this.diagram.commandHandler ) {
						this.groupPalette.lastSelectedNode = node;
						const dataNode = node.data;
						this.diagram.commandHandler.archetypeGroupData = dataNode;
					} else {
						this.groupPalette.select( this.groupPalette.lastSelectedNode );
					}
				};
				this.groupPalette.addDiagramListener( 'ChangedSelection', setArchetypeOnSelection );
			}

			// Select by default the first node
			const defaultNode = this.groupPalette.findNodeForKey(1);
			if( defaultNode ) {
				this.groupPalette.select( defaultNode );
			}
		}
	}
	_onGraphChangedFilter( e ) {
		// Ignore unimportant Transaction events
		if ( e.isTransactionFinished ) {
			var txn = e.object;  // a Transaction
			// Call callback only if there is a model change
			if( txn !== null  ) {
				//this.em.call.onGraphChanged();
			}
			//console.log( 'GoJS say graph is changed' );
			this._callOnNodeModelChanged();
			this._callOnNodeGraphSelectionChanged();
			this.em.call.onGraphChanged();
		}
	}
	newEmptyModel() {
		return new go.GraphLinksModel( [], [] );
	}
	newUniqueKey( model, data ) {
		// Generate a new positive key bigger than all keys in the model
		let key = ( this.lastNodeKey? this.lastNodeKey+1: model.nodeDataArray.length );
		while( model.findNodeDataForKey( key ) != null ) {
			++key;
		}
		this.lastNodeKey = key;
		return( key );
	}
	newNodePalette( divId ) {
		const palette = $(go.Palette, divId,
			{ // customize the GridLayout to align the centers of the locationObjects
				layout: $(go.GridLayout, { 
					alignment: go.GridLayout.Location,
					wrappingColumn: 1,
				})
			}
		);
		return( palette );
	}
	newGroupPalette( divId ) {
		const palette = $(go.Palette, divId,
			{ // customize the GridLayout to align the centers of the locationObjects
				layout: $(go.GridLayout, { 
					alignment: go.GridLayout.Location,
					wrappingColumn: 1,
				})
			}
		);
		return( palette );
	}
	newLinkPalette( divId ) {
		const palette = $(go.Palette, divId,
			{ // customize the GridLayout to align the centers of the locationObjects
				layout: $(go.GridLayout, { 
					alignment: go.GridLayout.Location,
					spacing: go.Size.parse( "40 10" ),
					wrappingColumn: 2,
				})
			}
		);
		return( palette );
	}
	newDiagram( divId ) {
		// To be used in "function(){}" definitions
		const graphThis = this;

		let diagram = null;
		if( divId ) {
			diagram = $( go.Diagram, divId ); // Create visual diagram
		} else {
			diagram = $( go.Diagram ); // Create batch diagram
		}

		diagram.clickCreatingTool = new InGroupClickCreatingTool();
		// Avoid that the diagram comes slowly from the bottom in an animation
		diagram.animationManager.isInitial = false;
		// what to do when a drag-drop occurs in the Diagram's background
		diagram.mouseDrop = (e)=> this._onFinishDrop( e, null );
		// Use mouse wheel for zoom
		diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom;
		// Disable port gravity (snap to port)
		diagram.toolManager.linkingTool.portGravity = 0;
		// enable undo & redo
		diagram.undoManager.isEnabled = true;

		// Define grid
		const mainColor = {
			dark: {
				backgroundColor: 'rgb(60, 60, 60)',
				lineColor1: 'rgb(70, 70, 70)',
				lineColor2: 'rgb(80, 80, 80)',
			},
			light: {
				backgroundColor: 'AliceBlue',
				lineColor1: 'rgb(220, 220, 220)',
				lineColor2: 'rgb(200, 200, 200)',
			},
		};
		const schema = config.graph.colorSchema;
		diagram.grid = $(go.Panel, "Grid",
			{
			  name: "GRID",
			  visible: false,
			  gridCellSize: new go.Size(10, 10),
			  gridOrigin: new go.Point(0, 0)
			},
			$(go.Shape, "LineH", { stroke: mainColor[schema].lineColor1, strokeWidth: 0.5, interval: 1 }),
			$(go.Shape, "LineH", { stroke: mainColor[schema].lineColor2, strokeWidth: 0.5, interval: 5 }),
			$(go.Shape, "LineH", { stroke: mainColor[schema].lineColor2, strokeWidth: 1.0, interval: 10 }),
			$(go.Shape, "LineV", { stroke: mainColor[schema].lineColor1, strokeWidth: 0.5, interval: 1 }),
			$(go.Shape, "LineV", { stroke: mainColor[schema].lineColor2, strokeWidth: 0.5, interval: 5 }),
			$(go.Shape, "LineV", { stroke: mainColor[schema].lineColor2, strokeWidth: 1.0, interval: 10 })
		);

		// By default grid is not visible
		diagram.grid.visible = false;
		diagram.div.style.background = mainColor[schema].backgroundColor;

		// Force positioning of nodes according to grid
		diagram.toolManager.draggingTool.gridSnapCellSize = new go.Size( 10, 10 );
		diagram.toolManager.draggingTool.isGridSnapEnabled = true;
		diagram.toolManager.resizingTool.isGridSnapEnabled = true;

		// Set zoom speed
		diagram.commandHandler.zoomFactor = ( config.graph.zoomFactor?  
																					config.graph.zoomFactor: 1.25 );
		// Allow infinite canvas
		diagram.scrollMode = go.Diagram.InfiniteScroll;

		// Pan with right mouse button drag
		diagram.toolManager.panningTool.canStart = function() {
			if (!this.isEnabled) return false;
			if (diagram === null) return false;
			if (!diagram.allowHorizontalScroll && !diagram.allowVerticalScroll) return false;
			// require left button & that it has moved far enough away from the mouse down point, so it isn't a click
			if (!diagram.lastInput.right) return false;
			// don't include the following check when this tool is running modally
			if (diagram.currentTool !== this) {
				// mouse needs to have moved from the mouse-down point
				if (!this.isBeyondDragSize()) return false;
			}
			return true;
		};

		// install custom linking tool, defined in PolylineLinkingTool.js
		let tool = new PolylineLinkingTool();
		//tool.temporaryLink.routing = go.Link.Orthogonal;  // optional, but need to keep link template in sync, below
		diagram.toolManager.linkingTool = tool;
		let reshapeTool = new SnapLinkReshapingTool();
		diagram.toolManager.linkReshapingTool = reshapeTool;

		//////////////////////////////////
		// BEGIN PATCH
		// This code avoids showing a link at 0,0
		// when connecting two nodes with a straight link
		// It would be nice to find a solution instead this patch :-)
		diagram.addDiagramListener( "LinkDrawn", (e)=> {
			let link = e.subject;
			//let linkData = link.data;
			let fromNode = e.subject.fromNode;
			let x = fromNode.position.x;
			let y = fromNode.position.y;
			setTimeout( ()=> { 
				fromNode.moveTo( x, y+0.1 );
				fromNode.moveTo( x, y-0.1 );
			}, 1 );
		});
		// END PATCH
		//////////////////////////////////

		diagram.commandHandler.doKeyDown = function() {
			// Get last input
			const e = diagram.lastInput;
			const key = e.key;
			
			// Avoid to delete nodes/selection by del/backspace key
			if( !diagram.isDeleteEnabled ) {
				// Key code
				const deleteKey = 'Del';
				const backspaceKey = 'Backspace';
				if( ( key === deleteKey ) || ( key === backspaceKey ) ) return;
			}

			// call base method with no arguments (default functionality)
			go.CommandHandler.prototype.doKeyDown.call(this);
		};
		diagram.commandHandler.doKeyUp = function() {
			// Get last input
			const e = diagram.lastInput;
			// The meta (Command) key substitutes for "control" for Mac commands
		  const control = e.control || e.meta;
			const alt = e.alt;
			const shift = e.shift;
			const key = e.key;

			// Evalue keyboard shortcut
			for( const shortcut of graphThis.shortcutList ) {
				if( shortcut.key == key ) { 
					if( ( ( shortcut.control == undefined ) && control ) ||
					    ( ( shortcut.control != undefined ) && !control ) ) {
						continue;
					}
					if( ( ( shortcut.alt == undefined ) && alt ) ||
					    ( ( shortcut.alt != undefined ) && !alt ) ) {
						continue;
					}
					if( ( ( shortcut.shift == undefined ) && shift ) ||
					    ( ( shortcut.shift != undefined ) && !shift ) ) {
						continue;
					}
					shortcut.do();
					break;
				}
			}

			// call base method with no arguments (default functionality)
			go.CommandHandler.prototype.doKeyUp.call(this);
		}

		// Move the pasted selection a bit on the side from copied seleciton
		diagram.addDiagramListener( 'ClipboardPasted', (e)=> {
			e.subject.each( (o)=> { 
				const location = o.location;
				location.x += 10;
				location.y += 10;
				o.location = location;
			});
		});
		
		// Allow to navigate out from a graph and go to parent graph (Alt+click)
		diagram.addDiagramListener( 'BackgroundSingleClicked', ()=> {
			if( diagram.lastInput.alt ) {
				this.em.call.onShowParentGraph();
			}
		});
		// Allow to navigate into a sub graph of a node (Alt+click)
		diagram.addDiagramListener( 'ObjectSingleClicked', ()=> {
			if( diagram.lastInput.alt ) {
				const data = this.getFirstSelectedNodeData();
				if( data && ( data.isDir == true ) ) {
					this.em.call.onLoadGraph( data );
				} else {
					const mousePos = this.diagram.lastInput.viewPoint;
					this.em.call.onLoadFile( data, mousePos.x, mousePos.y );
				}
			}
		});

		diagram.addDiagramListener( 'InitialLayoutCompleted', (diagramEvent)=> {
			this.em.call.onFirstLayoutCompleted();
			if( this.nodePalette ) {
				// Scroll a bit up to show first node well
				this.nodePalette.scroll( 'pixel', 'up', 20 );
			}
			if( this.linkPalette ) {
				// Scroll a bit up to show first link well
				this.linkPalette.scroll( 'pixel', 'up', 20 );
			}
		});

		diagram.addDiagramListener( 'ChangedSelection', ()=> {
			if( this.diagram ) {
				const dataList = this._getFilteredSelection();
				this.em.call.onSelection( dataList );
				this._callOnNodeGraphSelectionChanged();
			}
		});

		return( diagram );
	}
	newNodeToolTip() {
		// this tooltip Adornment is shared by all nodes
		return $("ToolTip",
			$(go.TextBlock, { margin: 4 },  // the tooltip shows the result of calling nodeInfo(data)
				new go.Binding("text", "", ( d )=> {
					const label = ( d.label? d.label: (d.text? d.text: '' ) );
					// Tooltip label for a node data object (limit length to 50 charaters)
					const shortLabel = label.substring( 0, 50 )+( label.length > 50? '...': '' );
					let info = "Node [" + d.key + "]: " + shortLabel + "\n";
					if( d.category ) {
						info = info+" Category: " + d.category + "\n";
					}
					if ( d.group )
						info = info+"member of " + d.group;
					else
						info = info+"top-level node";
					if( d.hint ) {
						info = info+"\n"+d.hint;
					}
					return( info );
				})
			)
			);
	}
	newLinkToolTip() {
		// this tooltip Adornment is shared by all links
		return $("ToolTip",
			$(go.TextBlock, { margin: 4 },  // the tooltip shows the result of calling linkInfo(data)
				new go.Binding("text", "", ( d )=> {
					// Tooltip info for a link data object
					const info = "Link:\nfrom " + d.from + " to " + d.to;
					return( info );
				})
			)
		);
	}
	newGroupToolTip() {
		// this tooltip Adornment is shared by all groups
		return $("ToolTip",
			$(go.TextBlock, { margin: 4 },
				// bind to tooltip, not to Group.data, to allow access to Group properties
				new go.Binding("text", "", this.getGroupInfo.bind(this)).ofObject()
			)
		);
	}
	getGroupInfo( adornment ) {
		// takes the tooltip or context menu, not a group node data object
		var g = adornment.adornedPart;  // get the Group that the tooltip adorns
		var mems = g.memberParts.count;
		
		var links = 0;
		g.memberParts.each( (part) => { if ( part instanceof go.Link ) links++; });

		const info = "Group " + g.data.key + ": " + g.data.text + "\n" + mems + " members including " + links + " links";
		return( info );
	}
	getDiagramInfo( model ) {
		// Tooltip info for the diagram's model
		const info = " Model: "+model.nodeDataArray.length + " nodes, "+ 
		                         model.linkDataArray.length + " links \n"+
								 " Graph URL: "+this.graphPath+" ";
		return( info );
	}
	_canOpenFile() {
		let result = false;
		const data = this.getFirstSelectedNodeData();
		if( data ) {
			result = ( data.isFile == true );
		}
		return( result );
	}
	_canOpenSubGraph() {
		let result = false;
		const data = this.getFirstSelectedNodeData();
		if( data ) {
			result = ( data.isDir == true );
		}
		return( result );
	}
	_onFinishDrop( e, grp ) {
		// Upon a drop onto a Group, we try to add the selection as members of the Group.
		// Upon a drop onto the background, or onto a top-level Node, make selection top-level.
		// If this is OK, we're done; otherwise we cancel the operation to rollback everything.
		let ok = false;
		if( !grp ) {
			const location = e.documentPoint;
			const partList = e.diagram.findPartsAt( location );
			if( partList.count > 0 ) {
				partList.each( (part)=> {
					const dataPart = part.data;
					if( dataPart.isGroup ) {
						ok = part.addMembers( e.diagram.selection, true );
					}
				});
			}
		}
	}
	_resetSelectionFromPalette() {
		const selection = this.getSelection();
		selection.each( (node) => {
			let templateData = null;
			let systemFieldList = null;
			if( node instanceof go.Node ) {
				if( this.nodePalette ) {
					const it = this.nodePalette.selection;
					const node = it.first();
					if( node ) {
						templateData = node.data;
					}
				}
				systemFieldList = this.systemNodeDataFieldList;
			} else if( node instanceof go.Link ) {
				if( this.linkPalette ) {
					const it = this.linkPalette.selection;
					const link = it.first();
					if( link ) {
						templateData = link.data;
					}
				}
				systemFieldList = this.systemLinkDataFieldList;
			}
			if( templateData ) {
				const dataNode = node.data;
				const dataNodeFieldList = Object.keys( templateData );
				for( const field of dataNodeFieldList ) {
					// If the field does not start with '_' and is not a system field
					if( !field.startsWith('_') &&
					    ( systemFieldList.indexOf( field ) == -1 ) &&
						( ![ 'label', 'fileURL', 'fileContent' ].includes( field ) ) ) {
						if( templateData[field] ) {
							const value = templateData[field];
							this.diagram.model.setDataProperty( dataNode, field, value );
						}
					}
				}
				this.diagram.requestUpdate();
			}
		});
	}
	_getDataCopy( data, templateData ) {
		// If we get a template node, we set result to a clone of it (avoid reference to template)
		let result = ( templateData? Object.assign( {}, templateData ): {} );
		const fieldList = Object.keys( data );
		for( const field of fieldList ) {
			if( !field.startsWith( '_' ) ) {
				result[field] = data[field];
			}
		}
		return( result );
	}
	_getFilteredSelection() {
		let dataList = {};
		let keyIndex = -1;
		let keyList = [];
		const s = this.diagram.selection;
		if( s.count > 0 ) {
			const it = s.iterator;
			while( it.next() ) {
				// Strip out any GoJS internal data field
				const dataNode = it.value.data;
				const filterDataNode = this.filterObjectData( dataNode );
				const stripData = this._getDataCopy( filterDataNode );
				// Push stripped data object
				dataList[++keyIndex] = stripData;
				keyList.push( dataNode.key );
			}
		}
		if( keyIndex != -1 ) {
			dataList['originalKey'] = keyList;
		}
		return( dataList );
	}
	clearInstance() {
		// Node Events
		this.onNodeGraphModelChanged = null;
		this.onNodeGraphSelectionChanged = null;
	}
	_callOnNodeGraphSelectionChanged() {
		if( this.onNodeGraphSelectionChanged ) {
			const nodeData = this.onNodeGraphSelectionChanged.nodeData;
			this.updateSystemNode( nodeData );
			this.onNodeGraphSelectionChanged.callback( nodeData );
		}
	}
	_callOnNodeModelChanged() {
		if( this.onNodeGraphModelChanged ) {
			const nodeData = this.onNodeGraphModelChanged.nodeData;
			this.updateSystemNode( nodeData );
			this.onNodeGraphModelChanged.callback( nodeData );
		}
	}
	_storeDSLNodeFieldNameList( dsl ) {
		if( dsl.dataNodeList ) {
			for( const dataNode of dsl.dataNodeList ) {
				const fieldNameList = Object.keys( dataNode );
				for( const fieldName of fieldNameList ) {
					this.dslNodeFieldNameList.add( fieldName );
				}
			}
			for( const dataNode of dsl.dataLinkList ) {
				const fieldNameList = Object.keys( dataNode );
				for( const fieldName of fieldNameList ) {
					this.dslNodeFieldNameList.add( fieldName );
				}
			}
		}
	}
}
