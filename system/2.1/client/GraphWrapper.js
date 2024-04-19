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

class GraphWrapper {
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

		// Property saved in graph source json file
		this.dslNameList = [];
		this.graphFileServerURLPrefix = 'graph://fileServer/';
		this.graphFileServer = [];

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
			onShowMessages:  					  { help: 	'Open messages dialog' },
			onNewMessage:  					    { help: 	'Open new messages dialog' },
			onShowBookmarks:  					{ help: 	'Open bookmark dialog' },
			onAddBookmark:							{ help: 	'Store the current view and graph path into a bookmark list',
																		params: { bookmarkInfo: 'graph path/nodeData/current view' } },
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
			onLogOut:                   { help:   'Log out from HyperGraph' },
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
					{ label: 'Space Property',			 			do: (o)=> winAlert( this.getDiagramInfo( this.diagram.model ), false )},
					{ label: 'View',       layout: 'vertical',	subMenu: [
						{ label: 'Zoom to Fit (1)',	   			do: this.doZoomToFit.bind(this) },
						{ label: 'Zoom In (2)',	       			do: this.doZoomToFactor.bind(this,2) },
						{ label: 'Zoom Out (3)',	     			do: this.doZoomToFactor.bind(this,0.5) },
						{ label: 'Center Space on Selection (X)',do: this.setViewCenteredOnSelectedNode.bind(this) },
						{ separator: '-' },
						{ label: 'Toggle Show Palette (P)',	if: (o)=> ( this.fullPaletteId? true: false ),
																					 			do: this.doShowPalette.bind(this) },
						{ label: 'Toggle Show Grid (G)',		do: this.doShowGrid.bind(this) },
						{ label: 'Toggle Show Editors (^+Click)',	do: m.e.toogleShowWindows },
						{ separator: '-' },
						{ label: 'Add Bookmark (ALT+B)',	  do: this.addBookmark.bind(this) },
					]},
					// { separator: '-',               		if: (o)=> { // NOTE: if we define a location, paste do not showup in the popup menu
					// 																								//const location = o.d.cmt.mouseDownPoint;
					// 																								return( o.d.cmd.canPasteSelection( location ) ); }},
					{ separator: '-' },
					{ label: 'Edit',       layout: 'vertical', subMenu: [
						{ label: 'Paste',      							if: (o)=> { // NOTE: if we define a location, paste do not showup in the popup menu
																														const location = o.d.cmt.mouseDownPoint;
																														return( o.d.cmd.canPasteSelection( location ) ); },
																								do: (o)=> { const location = o.d.cmt.mouseDownPoint;
																														o.d.cmd.pasteSelection( location ); }},
						{ separator: '-',         					if: (o)=> o.d.cmd.canUndo() || o.d.cmd.canRedo() },
						{ label: 'Undo',      							if: (o)=> o.d.cmd.canUndo(),
																								do: (o)=> o.d.cmd.undo() },
						{ label: 'Redo',      							if: (o)=> o.d.cmd.canRedo(),
																								do: (o)=> o.d.cmd.redo() },
						// { layout: 'horizontal', itemList: [
						// 	{ fontIcon: 'action-undo', hint: 'Undo (CTRL-Z)',     if: (o)=> o.d.cmd.canUndo(),
						// 																												do: (o)=> o.d.cmd.undo() },
						// 	{ fontIcon: 'action-redo', hint: 'Redo (CTRL-SHIFT-Z)',     if: (o)=> o.d.cmd.canRedo(),
						// 																												do: (o)=> o.d.cmd.redo() },
						// ]},
					]},
					{ separator: '-' },
					{ label: 'Find (F)',   					  		do: this.doShowFind.bind(this) },
					{ label: 'Bookmarks (B)',  			  		do: this.doShowBookmarks.bind(this) },
					{ separator: '-' },
					{ label: 'Tools',       layout: 'vertical', subMenu: [
						{ label: 'Show Messages (E)',	 		  do: this.doShowMessages.bind(this) },
						{ label: 'New Message (N)',	 		    do: this.doNewMessage.bind(this) },
						{ label: 'Show DSL List (D)',	  		do: this.doShowDSLList.bind(this) },
						{ label: 'Show Space Template (T)',	do: this.doShowSpaceTemplate.bind(this) },
						{ label: 'Show System Monitor (M)',	do: this.doShowSystemMonitor.bind(this) },
						{ label: 'Show Animator (A)',	 		  do: this.doShowAnimator.bind(this) },
					]},
					{ label: 'Navigate', layout: 'vertical', if: (o)=> !config.isLocalMode, subMenu: [
						{ label: 'Back To Prev. Space',	if: (o)=> !this.isHistoryEmpty,
																						do: (o)=> { if( !this.isHistoryEmpty ) this.em.fire.onShowPreviousGraph(); } },
						{ separator: '-',               if: (o)=> !this.isRootGraph },
						{ label: 'Go To Root Space',		if: (o)=> !this.isRootGraph,
																						do: (o)=> this.em.fire.onShowRootGraph() },
					]},
					{ separator: '-', if: (o)=> !config.isLocalMode },
					{ label: 'Toggle Read-Only',	if: (o)=> !config.isLocalMode,
																		    do: this.doToggleleReadOnly.bind(this) },
					// { label: 'Set Read-only Mode',    if: (o)=> !config.isLocalMode && !this.isGraphReadOnly(),
					// 																	do: (o)=> { this.doSetGraphReadOnly( true );
					// 																							this.em.fire.onSetReadOnly( true ); } },
					// { label: 'Unset Read-only Mode',  if: (o)=> !config.isLocalMode && this.isGraphReadOnly(),
					// 																	do: (o)=> { this.doSetGraphReadOnly( false );
					// 																							this.em.fire.onSetReadOnly( false ); } },
					{ separator: '-' },
					{ label: 'Log Out',		  do: this.em.fire.onLogOut },
				]},
			'nodeContextMenu':
				{ layout: 'vertical', itemList: [
					{ label: 'Open Content',	if: (o)=> this.canOpenFile(),
																		do: this.doOpenContent.bind(this) },
					{ label: 'Open Space',		if: (o)=> this.canOpenSubGraph(),
																		do: this.doOpenSpace.bind(this) },
					{ separator: '-',       	if: (o)=> this.canOpenFile() || this.canOpenSubGraph() },
					{ label: 'Zoom it',     	do: this.doZoomToFitSlectedNode.bind(this,5) },
					{ separator: '-' },
					{ label: 'Edit',       layout: 'vertical', subMenu: [
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
						{ separator: '-',       if: (o)=> !this.isSelectionEmpty() },
						{ label: 'Copy Position/Size',if: (o)=> !this.isSelectionEmpty(),
																		do: (o)=> this.doCopyPositionSize() },
						{ label: 'Paste X', 		if: (o)=> this.copiedPosition && !this.isSelectionEmpty(),
																		do: (o)=> this.doPasteX() },
						{ label: 'Paste Y',			if: (o)=> this.copiedPosition && !this.isSelectionEmpty(),
																		do: (o)=> this.doPasteY() },
						{ label: 'Paste Size',  if: (o)=> this.copiedSize && !this.isSelectionEmpty(),
																		do: (o)=> this.doPasteSize() },
						{ label: 'Paste Widht', if: (o)=> this.copiedSize && !this.isSelectionEmpty(),
																		do: (o)=> this.doPasteWidth() },
						{ label: 'Paste Height',if: (o)=> this.copiedSize && !this.isSelectionEmpty(),
																		do: (o)=> this.doPasteHeight() },
						{ separator: '-',       if: (o)=> o.d.cmd.canUndo() || o.d.cmd.canRedo() },
						{ label: 'Undo',        if: (o)=> o.d.cmd.canUndo(),
																		do: (o)=> o.d.cmd.undo() },
						{ label: 'Redo',        if: (o)=> o.d.cmd.canRedo(),
																		do: (o)=> o.d.cmd.redo() },

				  ]},
					{ separator: '-' },
					{ label: 'Content',       layout: 'vertical', subMenu: [
						{ label: 'Append Interface Code', if: this.canGenerateNodeContent.bind(this),
																							do: this.doGenerateNodeContent.bind(this) },
						{ label: 'AI Assistant (GPT-4)',  if: this.canGenerateNodeContent.bind(this),
																							do: this.doAIGenerator.bind(this,1) },
						{ label: 'AI Assistand (GPT-3.5)',if: this.canGenerateNodeContent.bind(this),
																							do: this.doAIGenerator.bind(this,2) },
					]},
					{ separator: '-' },
					{ label: 'Set From Palette',	if: (o)=> !this.isSelectionEmpty(),
																				do: this._resetSelectionFromPalette.bind(this) },
					{ label: 'Prompt URL',				if: this.canPromptURL.bind(this),
																				do: this.doPromptURL.bind(this) },
					{ separator: '-' },
					{ label: 'Group',       if: (o)=> o.d.cmd.canGroupSelection(),
																	do: (o)=> o.d.cmd.groupSelection() },
					{ label: 'Remove Group',if: (o)=> o.d.cmd.canUngroupSelection(),
																	do: (o)=> o.d.cmd.ungroupSelection() },
					{ label: 'Ungroup Nodes',if: (o)=> !o.d.cmd.canUngroupSelection() && this.canUngroupSelectedNodes(),
																	do: this.doUngroupSelectedNodes.bind(this) },
				]},
		});
		this.shortcutList = [
			// Zoom to Fit
			{ key: '1', do: this.doZoomToFit.bind(this) },
			// Zoom to Factor
			{ key: '2', do: this.doZoomToFactor.bind(this,2) },
			{ key: '3', do: this.doZoomToFactor.bind(this,0.5) },
			// Grid
			{ key: 'G', do: this.doShowGrid.bind(this) },
			// Toogle View
			{ key: 'X', do: this.setViewCenteredOnSelectedNode.bind(this) },
			{ key: 'P', do: this.doShowPalette.bind(this) },
			// Messages
			{ key: 'E', do: this.doShowMessages.bind(this) },
			{ key: 'N', do: this.doNewMessage.bind(this) },
			// Bookmarks
			{ key: 'B', do: this.doShowBookmarks.bind(this) },
			{ key: 'B', alt:true, do: this.addBookmark.bind(this) },
			// Find & Tools
			{ key: 'F', do: this.doShowFind.bind(this) },
			{ key: 'D', do: this.doShowDSLList.bind(this) },
			{ key: 'T', do: this.doShowSpaceTemplate.bind(this) },
			{ key: 'M', do: this.doShowSystemMonitor.bind(this) },
			{ key: 'A', do: this.doShowAnimator.bind(this) },
		];

		this.diagram.contextMenu = this.contextMenu.getMenu( 'diagramContextMenu' );
		this.nodeContextMenu = this.contextMenu.getMenu( 'nodeContextMenu' );

		// Initialize instance variables
		this.clearInstance();

		this.copiedPosition = null;
		this.copiedSize = null;
		this.isDeleteEnabled = false;
		this.isRootGraph = true;
		this.isHistoryEmpty = true;
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
	resetFileURL( url ) {
		if( url.startsWith( this.graphFileServerURLPrefix ) ) {
			return( this.graphFileServerURLPrefix );
		} else {
			return( '' );
		}
	}
	_getGraphFileURLIndex( url ) {
		let result = -1;
		if( url.startsWith( this.graphFileServerURLPrefix ) ) {
			// Get graph file index
			const preIdx = this.graphFileServerURLPrefix.length;
			const postIdx = url.indexOf( '.' );
			if( postIdx >= 0 ) {
				result = url.substring( preIdx, postIdx );
			}
		}
		return( result );
	}
	getNextGraphFileServerURL( extension ) {
		extension = extension || 'txt';
		const idx = this.graphFileServer.length;
		// Allocate the new graph file
		this.graphFileServer[idx] = '';
		return( `${this.graphFileServerURLPrefix}${idx}.${extension}` );
	}
	cloneGraphFile( url ) {
		let newURL = '';
		if( url.startsWith( this.graphFileServerURLPrefix ) ) {
			const source = this.openFile( url );
			const extIdx = url.lastIndexOf( '.' );
			let extension = 'txt';
			if( extIdx > 0 ) {
				extension = url.substring( extIdx+1 );
			}
			newURL = this.getNextGraphFileServerURL( extension );
			this.saveFile( newURL, source );
		}
		return( newURL );
	}
	openFile( url ) {
		let result = '';
		const idx = this._getGraphFileURLIndex( url );
		if( idx >= 0 ) {
			// Get graph file content
			const value = this.graphFileServer[idx];
			if( value ) {
				result = value;
			}
		}
		return( result );
	}
	saveFile( url, source, sourceEncoding ) {
		const idx = this._getGraphFileURLIndex( url );
		if( idx >= 0 ) {
			// TODO: check for the sourceEncoding
			this.graphFileServer[idx] = source;
			this.em.fire.onGraphChanged();
		}
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
	getDependencyList() {
		const result = {
			files: {},
			dsl: {
				NoDSL: { name: 'NoDSL', node: 0, link: 0 },
			},
		};

		// Update DSL info
		this.dslNameList.forEach( (d) => result.dsl[d] = { name: d, node: 0, link: 0 } );

		// Update Node info
		const nodeList = this.diagram.model.nodeDataArray;
		nodeList.forEach( (n)=> {
			if( n.category != undefined ) {
				const idx = n.category.indexOf( '_' );
				const dslName = n.category.substring( 0, idx )+'DSL';
				if( result.dsl[dslName] ) {
					result.dsl[dslName].node++;
				}
			} else {
				result.dsl.NoDSL.node++;
			}
			if( n.fileURL ) { 
				result.files[n.key] = n.fileURL;
			}
		});
		const linkList = this.diagram.model.linkDataArray;
		linkList.forEach( (l)=> { 
			if( l.category != undefined ) {
				const idx = l.category.indexOf( '_' );
				const dslName = l.category.substring( 0, idx )+'DSL';
				if( result.dsl[dslName] ) {
					result.dsl[dslName].link++;
				}
			} else {
				result.dsl.NoDSL.link++;
			}
		});

		return( result );
	}
	isModelEmpty() {
		return( this.diagram.model.nodeDataArray.length+
						this.diagram.model.linkDataArray.length == 0 );
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
	getEditorSource( isIndented ) {
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
			graphFileServer: this.graphFileServer,
			model: jsonModel,
		};
		const source = ( isIndented? JSON.stringify( sourceInfo, null, 2 ):
		 														 JSON.stringify( sourceInfo ) );
		return( source );
	}
	setEditorSource( source, onDone ) {
		// Get an object from the extended model
		let objModel = null;
		if( source ) {
			if( typeof( source ) == 'string' ) {
				objModel = MainScript_JSONParse( source, 'Error setting graph source' );
			} else {
				// In this case we expect an object
				objModel = source;
			}
		} else {
			objModel = {
				view: null,
				dslNameList: null,
				graphFileServer: null,
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
			if( objModel.graphFileServer ) {
			  this.graphFileServer = objModel.graphFileServer;
			} else {
				this.graphFileServer = [];
			}

			if( onDone ) {
				onDone();
			}
		};

		// Set graphData (defined in ServerManager.js)
		graphData = {};

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
	isSelectionEmpty() {
		return( this.getSelectionCount() == 0 );
	}
	getJSONSelection() {
		const list = this._getFilteredSelection( 4 );
		let jsonSelection = MainScript_JSONStringify( list, null, 2, 'Error in get selection' );
		return( jsonSelection != null? jsonSelection: '' );
	}
	setJSONSelection( jsonSelection ) {
		const objSelection = MainScript_JSONParse( jsonSelection, 'Error in set selection' );
		if( objSelection != null ) {
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
		}
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
	addBookmark() {
		// Store bookmark
		const graphPath = this.getGraphPath();
		const viewInfo = this.getCurrentView();
		const bookmarkInfo = { graphPath, view: viewInfo };
		this.em.fire.onAddBookmark( bookmarkInfo );
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
		const seleciton = this.getSelection();
		const node = seleciton.first();
		if( node ) {
			this.diagram.zoomToRect( node.actualBounds, go.Diagram.Uniform );
			this.diagram.scale = this.diagram.scale/4;
		}
	}
	doZoomToFit() {
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
				this.em.fire.onClone( data );
			}
		}
	}
	doEditDelete() {
		const cmd = this.diagram.commandHandler;
		if( cmd.canDeleteSelection() ) {
			cmd.deleteSelection();
		}
	}
	doCopyPositionSize() {
		// If a single node is selected => copy size
		const data = this.getFirstSelectedNodeData();
		if( data ) {
			this.copiedPosition = data.location;
			this.copiedSize = data.size;
		}
	}
	doPasteX() {
		if( this.copiedPosition ) {
			const selection = this.getSelection();
			selection.each( (node) => { 
				const data = node.data;
				const [copyX, copyY] = this.copiedPosition.split( ' ' );
				const [currX, currY] = data.location.split( ' ' );
				const newLocation = `${copyX} ${currY}`;
				setNodeDataField( data, 'location', newLocation );
			});
		}
	}
	doPasteY() {
		if( this.copiedPosition ) {
			const selection = this.getSelection();
			selection.each( (node) => { 
				const data = node.data;
				const [copyX, copyY] = this.copiedPosition.split( ' ' );
				const [currX, currY] = data.location.split( ' ' );
				const newLocation = `${currX} ${copyY}`;
				setNodeDataField( data, 'location', newLocation );
			});
		}
	}
	doPasteSize() {
		if( this.copiedSize ) {
			const selection = this.getSelection();
			selection.each( (node) => { 
				const data = node.data;
				setNodeDataField( data, 'size', this.copiedSize );
			});
		}
	}
	doPasteWidth() {
		if( this.copiedSize ) {
			const selection = this.getSelection();
			selection.each( (node) => { 
				const data = node.data;
				const [copydWidth, copyHeight] = this.copiedSize.split( ' ' );
				const [currWidth, currHeight] = data.size.split( ' ' );
				const newSize = `${copydWidth} ${currHeight}`;
				setNodeDataField( data, 'size', newSize );
			});
		}
	}
	doPasteHeight() {
		if( this.copiedSize ) {
			const selection = this.getSelection();
			selection.each( (node) => { 
				const data = node.data;
				const [copydWidth, copyHeight] = this.copiedSize.split( ' ' );
				const [currWidth, currHeight] = data.size.split( ' ' );
				const newSize = `${currWidth} ${copyHeight}`;
				setNodeDataField( data, 'size', newSize );
			});
		}
	}
	doShowGrid() {
		this.diagram.grid.visible = !this.diagram.grid.visible;
	}
	doShowBookmarks() {
		const mousePos = this.diagram.lastInput.viewPoint;
		this.em.fire.onShowBookmarks( mousePos.x, mousePos.y );
	}
	doShowMessages() {
		this.em.fire.onShowMessages();
	}
	doNewMessage() {
		this.em.fire.onNewMessage();
	}
	doShowFind() {
		const mousePos = this.diagram.lastInput.viewPoint;
		this.em.fire.onShowFindDialog( mousePos.x, mousePos.y );
	}
	doShowDSLList() {
		const mousePos = this.diagram.lastInput.viewPoint;
		this.em.fire.onShowDSLListDialog( mousePos.x, mousePos.y );
	}
	doShowSpaceTemplate() {
		const mousePos = this.diagram.lastInput.viewPoint;
		this.em.fire.onShowGraphTemplateDialog( mousePos.x, mousePos.y );
	}
	doShowSystemMonitor() {
		const mousePos = this.diagram.lastInput.viewPoint;
		this.em.fire.onShowSysMonitorDialog( mousePos.x, mousePos.y );
	}
	doShowAnimator() {
		const mousePos = this.diagram.lastInput.viewPoint;
		this.em.fire.onShowAnimatorEditor( mousePos.x, mousePos.y );
	}
	doOpenContent() {
		const data = this.getFirstSelectedNodeData();
		if( data ) {
			const mousePos = this.diagram.lastInput.viewPoint;
			this.em.fire.onLoadFile( data, mousePos.x, mousePos.y );
		}
	}
	doOpenSpace() {
		const data = this.getFirstSelectedNodeData();
		if( data ) {
			this.em.fire.onLoadGraph( data );
		}
	}
	canPromptURL() {
		const data = this.getFirstSelectedNodeData();
		return( data && data.fileURL != undefined );
	}
	doPromptURL() {
		// If a single node is selected => prompt for URL
		const data = this.getFirstSelectedNodeData();
		if( data && data.fileURL != undefined ) {
			const setURL = ( newURL )=> {
				if( newURL != null ) {
					setNodeDataField( data, 'fileURL', newURL );
				}
			};
			winPrompt( 'URL', data.fileURL, setURL );
		}
	}
	doShowPalette() {
		if( this.fullPaletteId ) {
			const htmlObj = document.querySelector( `#${this.fullPaletteId}` );
			const v = htmlObj.style.visibility;
			htmlObj.style.visibility = ( v == 'visible'? 'hidden': 'visible' ); 
			// Position palette in browser view
			const browserWidth = window.innerWidth;
			const browserHeight = window.innerHeight;
			htmlObj.style.left = Math.min( browserWidth-100, Math.max( 0, htmlObj.offsetLeft ) );
			htmlObj.style.top = Math.min( browserHeight-100, Math.max( 0, htmlObj.offsetTop ) );
		}
	}
	canGenerateNodeContent() {
		const data = this.getFirstSelectedNodeData();
		return( NCG_canGenerateNodeContent( data ) );
	}
	doGenerateNodeContent() {
		const data = this.getFirstSelectedNodeData();
		if( data && data.isFile ) {
			const outData = this._getDataCopy( data );
			NCG_doGenerateNodeContent( outData );
		}
	}
	doAIGenerator( modelIndex ) {
		const data = this.getFirstSelectedNodeData();
		if( data && data.isFile ) {
			const model = ['gpt-4-turbo-preview','gpt-3.5-turbo-0125'];

			const outData = this._getDataCopy( data );
			NCG_doAIGenerator( outData, model[modelIndex] );
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
	canOpenFile() {
		let result = false;
		const data = this.getFirstSelectedNodeData();
		if( data ) {
			result = ( ( data.isFile == true ) || 
			           ( ( data.isDir == undefined ) && 
					   ( ( data.label != undefined ) && ( data.isLabelEditable ) ) ) );
		}
		return( result );
	}
	canOpenSubGraph() {
		let result = false;
		const data = this.getFirstSelectedNodeData();
		if( data ) {
			result = ( data.isDir == true );
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
		MainScript_Eval( templateNodeStr, 'Error in search expression\n' );

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
					try {
						conditionFn = new Function( 'd', `return( ${conditionBodyFunc} )` );
					} catch (e) {
						if( !isNaN( conditionBodyFunc ) ) {
							conditionFn = new Function( 'd', `return( d.key == ${conditionBodyFunc} )` );
						} else {
							// TODO: In this case I can search if the string is included in any
							// field of the node
							//conditionFn = new Function( 'd', `return( ... )` );
						}
					}
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
					if( config.isDebugOn ) {
						throw( e );
					}
					alert( 'Error in evaluating condition function' );
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
		if( ( typeof( keyOrData ) == 'object' ) && ( keyOrData.key != undefined ) ) {
		  // In this case data is a data object of a node
		  data = this.diagram.model.findNodeDataForKey( keyOrData.key );
		} else if( !isNaN( keyOrData ) ) {
		  // In this case data is a number, the key of a node
		  data = this.diagram.model.findNodeDataForKey( keyOrData );
		} // In any other case it can be a data object of an item array
		// for instance an item property of a node, or a row of an array
		// therefore we sould keep data like it is

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
					const strValue = MainScript_JSONStringify( value );
					if( strValue ) {
						value = strValue;
					}
				}
				this.diagram.model.setDataProperty( data, field, value );
				this.diagram.commitTransaction( 'Set Data Propery' );
				this._callOnNodeGraphSelectionChanged();
			}
			this.em.fire.onGraphChanged();
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
			this.em.fire.onGraphChanged();
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
				const objModel = MainScript_JSONParse( strModel, 'Error parsing graph model' );
				if( objModel ) {
					const strModel = MainScript_JSONStringify( objModel, null, 2, 'Error in stringify graph model' );
					if( strModel ) {
						data.fileContent = strModel;
						data.onNodeChanged = (f)=> { 
							this.onNodeGraphModelChanged = { nodeData: data, callback: f };
						};
					}
				}
				break;
			case '$GraphSelection$':
				data.fileContent = this.getJSONSelection();
				data.onNodeChanged = (f)=> { 
					this.onNodeGraphSelectionChanged = { nodeData: data, callback: f };
				};
				break;
			case '$GraphSource$':
				const source = this.getEditorSource( true );
				data.fileContent = source;
				break;
		}
		return( data );
	}
	filterObjectData( d, level ) {
		level = ( level != undefined? level: 4 );
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
	doSetGraphReadOnly( status ) {
		this.diagram.isReadOnly = status;
	}
	isGraphReadOnly() {
	  return( this.diagram.isReadOnly );
	}
	doToggleleReadOnly() {
		const status = !this.isGraphReadOnly();
		this.doSetGraphReadOnly( status );
		this.em.fire.onSetReadOnly( status );
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
				//this.em.fire.onGraphChanged();
			}
			//console.log( 'GoJS say graph is changed' );
			this._callOnNodeModelChanged();
			this._callOnNodeGraphSelectionChanged();
			this.em.fire.onGraphChanged();
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
				}),
				"panningTool.isEnabled": false,  // disable panning
				"allowHorizontalScroll": false,  // no horizontal scroll
				//"allowVerticalScroll": false,  // no vertical scroll
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
		go.Diagram.licenseKey = "28f846ebb66458c511d35a25403c7efb0fa42d35ce804df3590717a0ed0d6012269ffa6856dbd892d2fa1df84e79c2dbddc13a7a921f0c38e333d5da41e781acb03e24b71009138fa70a21c590aa22f2f92a21a6c6b565b2dc2ddcf4ebfa939d4ef8f0d54bc811bb2a670631";

		let diagram = null;
		if( divId ) {
			diagram = $( go.Diagram, divId ); // Create visual diagram
		} else {
			diagram = $( go.Diagram ); // Create batch diagram
		}


		// Store Graph pointer to retrieve this class
		diagram['__graphThis'] = graphThis;

		diagram.clickCreatingTool = new InGroupClickCreatingTool();
		// Avoid that the diagram comes slowly from the bottom in an animation
		diagram.animationManager.isInitial = false;
		// what to do when a drag-drop occurs in the Diagram's background
		diagram.mouseDrop = (e)=> this._onFinishDrop( e, null );
		// Use mouse wheel for zoom
		diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom;
		// Disable port gravity (snap to port)
		diagram.toolManager.linkingTool.portGravity = 0;
		// Enable undo & redo
		diagram.undoManager.isEnabled = true;
		// Disable creation of nodes on double click
		diagram.toolManager.clickCreatingTool = null

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
		
		// // Allow to navigate out from a graph and go to parent graph (Alt+click)
		// diagram.addDiagramListener( 'BackgroundSingleClicked', ()=> {
		// 	if( diagram.lastInput.alt ) {
		// 		this.em.fire.onShowPreviousGraph();
		// 	}
		// });
		diagram.addDiagramListener( 'BackgroundDoubleClicked', ()=> {
			this.em.fire.onShowPreviousGraph();
		});
		// Allow to hide/show all windows
		diagram.addDiagramListener( 'BackgroundSingleClicked', ()=> {
			// Get last input
			const e = diagram.lastInput;
			// The meta (Command) key substitutes for "control" for Mac commands
		  const control = e.control || e.meta;
			const alt = e.alt;
			const shift = e.shift;
			// TODO: not nice that in graph I access m.e.
			// I should generate an event that is handled
			// in Editor
			if( shift ) {
				m.e.toogleShowWindows();
			}
		});
		diagram.addDiagramListener( 'ObjectDoubleClicked', ()=> {
			const data = this.getFirstSelectedNodeData();
			if( data ) {
				if ( data.isDir == true ) {
					this.em.fire.onLoadGraph( data );
				} else if( !data.fromPort && !data.toPort ) { // Exclude links
					const mousePos = this.diagram.lastInput.viewPoint;
					this.em.fire.onLoadFile( data, mousePos.x, mousePos.y );
				}
			}
		});
		// // Allow to navigate into a sub graph of a node (Alt+click)
		// diagram.addDiagramListener( 'ObjectSingleClicked', ()=> {
		// 	if( diagram.lastInput.alt ) {
		// 		const data = this.getFirstSelectedNodeData();
		// 		if( data && ( data.isDir == true ) ) {
		// 			this.em.fire.onLoadGraph( data );
		// 		} else {
		// 			const mousePos = this.diagram.lastInput.viewPoint;
		// 			this.em.fire.onLoadFile( data, mousePos.x, mousePos.y );
		// 		}
		// 	}
		// });

		diagram.addDiagramListener( 'InitialLayoutCompleted', (diagramEvent)=> {
			this.em.fire.onFirstLayoutCompleted();
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
				this.em.fire.onSelection( dataList );
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
		const dependencyInfo = this.getDependencyList();
		const depList = [];
		for( const key in dependencyInfo.files ) {
			depList.push( ` Node[${key}] ${dependencyInfo.files[key]}` );
		}
		const dslList = [];
		for( const key in dependencyInfo.dsl ) {
			const nc = dependencyInfo.dsl[key].node;
			const lc = dependencyInfo.dsl[key].link;
			dslList.push( ` ${key} used by ${nc} nodes, ${lc} links` );
		}
		// Tooltip info for the diagram's model
		const info = " Model: "+model.nodeDataArray.length + " nodes, "+ 
		                         model.linkDataArray.length + " links \n"+
								 " Graph URL: "+this.graphPath+" \n"+
								 "--- Dependencies ---------------\n"+
								 depList.join( '\n' )+
								 "\n--- DSL ---------------\n"+
								 dslList.join( '\n' );
		return( info );
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
					const linkLabel = it.first();
					if( linkLabel ) {
						// Selection is on the text label
						// We need to take the incoming link to it
						const linkNode = linkLabel.findLinksInto();
						if( linkNode ) {
							const link = linkNode.first();
							if( link ) {
								templateData = link.data;
							}
						}
					}
				}
				systemFieldList = this.systemLinkDataFieldList;
			}
			if( templateData ) {
				const dataNode = node.data;
				const dataNodeFieldList = Object.keys( templateData );
				this.diagram.startTransaction( 'Set From Palette' );
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
				this.diagram.commitTransaction( 'Set From Palette' );
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
