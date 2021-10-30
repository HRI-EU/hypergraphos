/*
 * Graph2.js
 *
 * Date: 10.07.2020
 */

// New comment 

var $ = go.GraphObject.make;  // for conciseness in defining templates

class Graph {
	constructor( param ) {
		// fullPaletteId, nodePaletteId, linkPaletteId, graphId
		param = ( param? param: {} );

		// Graphical Canvas
		this.diagram = null;
		this.fullPaletteId = null;
		this.nodePalette = null;
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
		if( param.linkPaletteId ) {
			this.linkPalette = this.newLinkPalette( param.linkPaletteId );
		}
		if( param.graphId ) {
			this.diagram = this.newDiagram( param.graphId );
		} else {
			// Case of no DIV diagram (no visual part)
			//this.diagram = this.newDiagram( '' );
		}

		this.nodeContextMenu = this.newNodeContextMenu();

		// Graph Evetns
		this.onSaveGraphCallback = null;
		this.onLoadGraphCallback = null;
		this.onLoadFileCallback = null;
		this.onShowRootGraphCallback = null;
		this.onSetReadOnlyCallback = null;
		this.onShowParentGraphCallback = null;
		this.onShowPreviousGraphCallback = null;
		this.onShowFindDialogCallback = null;
		this.onShowDSLListDialogCallback = null;
		this.onShowGraphTemplateDialogCallback = null;
		this.onGraphChangedCallback = null;
		this.onFirstLayoutCompletedCallback = null;
		this.onSelectionCallback = null;

		// Initialize instance variables
		this.clearInstance();

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
		this.dslNodeFieldNameList = [];
	}
	setDSL( dsl ) {
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
			this.setPaletteDataNodeList( dsl.dataNodeList );
			this.nodePalette.scale = 0.7;
		}

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
			this.setPaletteDataLinkList( dsl.dataLinkList );
			this.linkPalette.scale = 0.7;
		}
	}
	addDSL( dslDest, dslSrc ) {
		dslDest.templateNodeList = dslDest.templateNodeList.concat( dslSrc.templateNodeList );
		dslDest.dataNodeList = dslDest.dataNodeList.concat( dslSrc.dataNodeList );
		dslDest.templateLinkList = dslDest.templateLinkList.concat( dslSrc.templateLinkList );
		dslDest.dataLinkList = dslDest.dataLinkList.concat( dslSrc.dataLinkList );
	}
	setDSLNameList( dslNameList ) {
		this.dslNameList = dslNameList;
	}
	getDSLNameList() {
		return( this.dslNameList );
	}
	setPaletteDataNodeList( dataNodeList ) {
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
					if( node ) {
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
	setPaletteDataLinkList( dataLinkList ) {
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
	getGraphPath( path ) {
		return( this.graphPath );
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
			if( onDone ) {
				onDone();
			}
		};
		// Here, if there are DSL to load
		// - then we load all DSL and only after we load the model/window (by finalizeLoading)
		// - otherwise we just load model/window (by finalizeLoading)
		// Set DSL
		if( objModel.dslNameList ) {
			let allDSL = null;
			this.dslNodeFieldNameList = [];
			const onAllDSLLoaded = ()=> {
				let dsl = null;
				for( const dslName of objModel.dslNameList ) {
					if( window[dslName+'_getDSL'] ) {
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
				}
				finalizeLoading();
			};
			loadDSLList( objModel.dslNameList, onAllDSLLoaded );
			this.setDSLNameList( objModel.dslNameList );
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
	selectNodeByKey(key) {
		this.diagram.select( this.diagram.findPartForKey( key ) );
	}
	centerGraphToNodeKey( key ) {
		const node = this.diagram.findNodeForKey( key );
		this.diagram.centerRect( node.actualBounds );
	}
	getJSONSelection() {
		const list = this._getFilteredSelection( 4 );
		const jsonSelection = JSON.stringify( list, null, 2 );
		return( jsonSelection );
	}
	findAllNodeDataFn( conditionBody ) {
		let result = [];
		const it = this.diagram.nodes;
		let conditionFn = null;
		const params = '{'+this.dslNodeFieldNameList.join( ',' )+'}';
		it.reset();
		while ( it.next() ) {
			const n = it.value;
			const d = it.value.data;
			const dataClean = this._getNodeDataCopy( d );
			if( !conditionFn ) {
				conditionFn = Function( params, `return( ${conditionBody} )` );
			}
			if( conditionFn(dataClean)) {
				result.push( dataClean );
			}
		}
		return( result );
	}
	findAllNodeData( field, searchValue ) {
		let result = [];
		const it = this.diagram.nodes;
		it.reset();
		while ( it.next() ) {
			const n = it.value;
			const d = it.value.data;
			const value = d[field];
			if( value != undefined ) {
				const typeOfValue = typeof( value );
				switch( typeOfValue ) {
					case 'string':
						if( value.indexOf( searchValue ) != -1 ) {
							result.push( d );
						}
						break;
					case 'boolean':
					case 'number':
						if( value == searchValue ) {
							result.push( d );
						}
						break;
				}
			}
		}
		return( result );
	}
	getNodeData( key, isCopy ) {
		// Get node data for the given key
		const data = this.diagram.model.findNodeDataForKey( key );
		if( data ) {
			if( data.isSystem ) {
				// If is system node => we give a copy of it
				const nodeData = this._getNodeDataCopy( data );
				return( this.updateSystemNode( nodeData ) );
			} else {
				// If isCopy => return a shallow copy of the data
				if( isCopy ) {
					return( this._getNodeDataCopy( data ) );
				} else {
					// If not system node => we give a pointer to it
					return( data );
				}
			}
		} else {
			return( null );
		}
	}
	setNodeDataField( key, field, value ) {
		// Get node data for the given key
		const data = this.diagram.model.findNodeDataForKey( key );
		if( data ) {
			if( data.isSystem && ( field == 'fileContent' ) ) {
				switch( data.isSystem ) {
					case '$GraphModel$':
						this.setJSONModel( value );
						break;
					case '$GraphSelection$':
						// TODO: here we could implement the possibilityu
						//       to change node in selection individually
						break;
				}
			} else {
				this.diagram.model.setDataProperty( data, field, value );
			}
			if( this.onGraphChangedCallback ) {
				this.onGraphChangedCallback();
			}
		}
	}
	updateSystemNode( data ) {
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
	};
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
	onLoadGraph( onLoadGraphCallback ) {
		this.onLoadGraphCallback = onLoadGraphCallback;
	}
	onLoadFile( onLoadFileCallback ) {
		this.onLoadFileCallback = onLoadFileCallback;
	}
	onShowRootGraph( onShowRootGraphCallback ) {
		this.onShowRootGraphCallback = onShowRootGraphCallback;
	}
	onSetReadOnly( onSetReadOnlyCallback ) {
		this.onSetReadOnlyCallback = onSetReadOnlyCallback;
	}
	onShowParentGraph( onShowParentGraphCallback ) {
		this.onShowParentGraphCallback = onShowParentGraphCallback;
	}
	onShowPreviousGraph( onShowPeviousGraphCallback ) {
		this.onShowPeviousGraphCallback = onShowPeviousGraphCallback;
	}
	onShowFindDialog( onShowFindDialogCallback ) {
		this.onShowFindDialogCallback = onShowFindDialogCallback;
	}
	onShowDSLListDialog( onShowDSLListDialogCallback ) {
		this.onShowDSLListDialogCallback = onShowDSLListDialogCallback;
	}
	onShowGraphTemplateDialog( onShowGraphTemplateDialogCallback ) {
		this.onShowGraphTemplateDialogCallback = onShowGraphTemplateDialogCallback;
	}
	onGraphChanged( onGraphChangedCallback ) {
		this.onGraphChangedCallback = onGraphChangedCallback;
	}
	onFirstLayoutCompleted( onFirstLayoutCompletedCallback ) {
		this.onFirstLayoutCompletedCallback = onFirstLayoutCompletedCallback;
	}
	onSelection( onSelectionCallback ) {
		this.onSelectionCallback = onSelectionCallback;
	}
	//------------------------------------------
	// Private Functions
	//------------------------------------------
	doLoadGraph() {
		if( this.onLoadGraphCallback ) {
			this.onLoadGraphCallback();
		}
	}
	doLoadFile() {
		if( this.onLoadFileCallback ) {
			this.onLoadFileCallback();
		}
	}
	doShowRootGraph() {
		if( this.onShowRootGraphCallback ) {
			this.onShowRootGraphCallback();
		}
	}
	doSetReadOnly( status ) {
		this.isReadOnly = status;
		if( this.onSetReadOnlyCallback ) {
			this.onSetReadOnlyCallback( status );
		}
	}
	doShowParentGraph() {
		if( !this.isRootGraph && this.onShowParentGraphCallback ) {
			this.onShowParentGraphCallback();
		}
	}
	doShowPreviousGraph() {
		if( !this.isHistoryEmpty && this.onShowPeviousGraphCallback ) {
			this.onShowPeviousGraphCallback();
		}
	}
	doShowFindDialog( x, y ) {
		if( this.onShowFindDialogCallback ) {
			this.onShowFindDialogCallback( x, y );
		}
	}
	doShowDSLListDialog( x, y ) {
		if( this.onShowDSLListDialogCallback ) {
			this.onShowDSLListDialogCallback( x, y );
		}
	}
	doShowGraphTemplateDialog( x, y ) {
		if( this.onShowGraphTemplateDialogCallback ) {
			this.onShowGraphTemplateDialogCallback( x, y );
		}
	}
	_onGraphChangedFilter( e ) {
		// Ignore unimportant Transaction events
		if ( e.isTransactionFinished ) {
			var txn = e.object;  // a Transaction
			// Call callback only if there is a model change
			if( txn !== null  ) {
				if( this.onGraphChangedCallback ) {
					this.onGraphChangedCallback();
				}
				if( this.onNodeGraphModelChanged ) {
					const nodeData = this.onNodeGraphModelChanged.nodeData;
					this.updateSystemNode( nodeData );
					this.onNodeGraphModelChanged.callback( nodeData );
				}
			}
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
		const diagram = $( go.Diagram, divId, 
			{
				clickCreatingTool: new InGroupClickCreatingTool(),

				'animationManager.isInitial': false,
				// what to do when a drag-drop occurs in the Diagram's background
				mouseDrop: (e)=> { this._onFinishDrop( e, null ); },

				"toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
				"linkingTool.portGravity": 0,
				// allow Ctrl-G to call groupSelection()
				"commandHandler.archetypeGroupData": {
					text: "Group",
					isGroup: true,
					color: "blue"
				},
				// enable undo & redo
				"undoManager.isEnabled": true,
			},
		);
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
		const schema = config.graph.colorSkema;
		diagram.grid =
		  $(go.Panel, "Grid",
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

		diagram.grid.visible = false;
		diagram.div.style.background = mainColor[schema].backgroundColor;

		// Force positioning of nodes according to grid
		diagram.toolManager.draggingTool.gridSnapCellSize = new go.Size( 10, 10 );
		diagram.toolManager.draggingTool.isGridSnapEnabled = true;
		diagram.toolManager.resizingTool.isGridSnapEnabled = true;
		
		diagram.scrollMode = go.Diagram.InfiniteScroll;
		diagram.contextMenu = this.newDiagramContextMenu();
		diagram.groupTemplate = this.newGroupTemplate();

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
				this.doShowParentGraph();
			}
		});
		// Allow to navigate into a sub graph of a node (Alt+click)
		diagram.addDiagramListener( 'ObjectSingleClicked', ()=> {
			if( diagram.lastInput.alt ) {
				this.doLoadGraph();
			}
		});

		diagram.addDiagramListener( 'InitialLayoutCompleted', (diagramEvent)=> {
			if( this.onFirstLayoutCompletedCallback ) {
				this.onFirstLayoutCompletedCallback();
				// Scroll a bit up to show first node well
			this.nodePalette.scroll( 'pixel', 'up', 20 );
			// Scroll a bit up to show first link well
			this.linkPalette.scroll( 'pixel', 'up', 20 );
			}
		});

		diagram.addDiagramListener( 'ChangedSelection', ()=> {
			if( this.diagram ) {
				const dataList = this._getFilteredSelection();
				if( this.onSelectionCallback ) {
					this.onSelectionCallback( dataList );
				}
				if( this.onNodeGraphSelectionChanged ) {
					const nodeData = this.onNodeGraphSelectionChanged.nodeData;
					this.updateSystemNode( nodeData );
					this.onNodeGraphSelectionChanged.callback( nodeData );
				}
			}
		});
		
		return( diagram );
	}
	newNodeToolTip() {
		// this tooltip Adornment is shared by all nodes
		return $("ToolTip",
			$(go.TextBlock, { margin: 4 },  // the tooltip shows the result of calling nodeInfo(data)
				new go.Binding("text", "", ( d )=> {
					// Tooltip info for a node data object
					var info = "Node [" + d.key + "]: " + d.label + "\n";
					if ( d.group )
						info += "member of " + d.group;
					else
						info += "top-level node";
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
	newGroupTemplate() {
		// Define the appearance and behavior for Groups:
		// Groups consist of a title in the color given by the group node data
		// above a translucent gray rectangle surrounding the member parts
		const groupTemplate = $(go.Group, "Vertical",
			{
				selectionObjectName: "PANEL",  // selection handle goes around shape, not label
				ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
				defaultAlignment: go.Spot.Left,

				mouseDrop: (e)=> { this._onFinishDrop( e, null ); },
				mouseDragEnter: ( e, grp, prev )=> { 
					if( e.control ) {
						// This code ungroup the current dragged selection
						const selection = e.diagram.selection;
						e.diagram.commandHandler.addTopLevelParts( selection );
						// NOTE: this do not work in this case: this.diagram.commandHandler.ungroupSelection();
					}
				},
			},
			$(go.Panel, "Horizontal",
				$("SubGraphExpanderButton"), // Button to expand/collapse the group
				$(go.TextBlock,
					{
						//alignment: go.Spot.Right,
						font: "bold 19px sans-serif",
						isMultiline: false,  // don't allow newlines in text
						editable: true  // allow in-place editing by user
					},
					new go.Binding("text", "text").makeTwoWay(),
					new go.Binding("stroke", "color")
				),
			),
			$(go.Panel, "Auto",
				{ 
					name: "PANEL",
					contextMenu: this.nodeContextMenu,
				},
				$(go.Shape, "Rectangle",  // the rectangular shape around the members
					{
						fill: "rgba(128,128,128,0.2)", 
						stroke: "gray", 
						strokeWidth: 3,
						portId: "", 
						cursor: "pointer",  // the Shape is the port, not the whole Node
						// allow all kinds of links from this port
						fromLinkable: true, 
						fromLinkableSelfNode: true, 
						fromLinkableDuplicates: true,
						// allow all kinds of links to this port
						toLinkable: true, 
						toLinkableSelfNode: true, 
						toLinkableDuplicates: true,
					}),
				$(go.Placeholder, { margin: 10, background: "transparent" })  // represents where the members are
			),
			{ // this tooltip Adornment is shared by all groups
				toolTip:
					$("ToolTip",
						$(go.TextBlock, { margin: 4 },
							// bind to tooltip, not to Group.data, to allow access to Group properties
							new go.Binding("text", "", this.getGroupInfo.bind(this)).ofObject()
						)
					),
				// the same context menu Adornment is shared by all groups
				//contextMenu: this.nodeContextMenu
			}
		);
		return( groupTemplate );
	}
  newMenuItem( text, action, visiblePredicate ) {
		// Define the appearance and behavior for Nodes:
		// First, define the shared context menu for all Nodes, Links, and Groups.
		// To simplify this code we define a function for creating a context menu button:
		let vPredicate;
		if( visiblePredicate ) {
			const eventCallback = (o, e) => {
				return( o.diagram? visiblePredicate( o, e ): false );
			}
			vPredicate = new go.Binding( "visible", "", eventCallback ).ofObject();
		} else {
			// don't bother with binding GraphObject.visible if there's no predicate
			vPredicate = {};
		}
		const menuEntry = $( "ContextMenuButton", 
			$(go.TextBlock, text), 
			{ click: action }, 
			vPredicate
		);
		return( menuEntry );
	}
	newDiagramContextMenu() {
		// provide a context menu for the background of the Diagram, when not over any Part
		const contextMenu = $("ContextMenu",
			this.newMenuItem("Properties",
				(e, obj) => {  // OBJ is this Button
					alert( this.getDiagramInfo( this.diagram.model ) );
				}),
			this.newMenuItem("Center Graph",
				(e, obj) => {  // OBJ is this Button
					this.diagram.zoomToFit();
				}),
			this.newMenuItem("Paste",
				(e, obj) => { 
											const location = e.diagram.toolManager.contextMenuTool.mouseDownPoint;
											e.diagram.commandHandler.pasteSelection( location ); 
										},
				(o) => { 
								 const location = e.diagram.toolManager.contextMenuTool.mouseDownPoint;
								 return o.diagram.commandHandler.canPasteSelection( location ); 
							 }
			),
			this.newMenuItem("Undo",
				(e, obj) => { e.diagram.commandHandler.undo(); },
				(o) => { return o.diagram.commandHandler.canUndo(); }
			),
			this.newMenuItem("Redo",
				(e, obj) => { e.diagram.commandHandler.redo(); },
				(o) => { return o.diagram.commandHandler.canRedo(); }
			),
			this.newMenuItem("Find",
				(e, obj) => { 
					const mousePos = this.diagram.lastInput.viewPoint;
					console.log( mousePos.x, mousePos.y );
					this.doShowFindDialog( mousePos.x, mousePos.y );
				},
			),
			this.newMenuItem("Show DSL List",
				(e, obj) => { 
					const mousePos = this.diagram.lastInput.viewPoint;
					console.log( mousePos.x, mousePos.y );
					this.doShowDSLListDialog( mousePos.x, mousePos.y );
				},
			),
			this.newMenuItem("Select Graph Template",
				(e, obj) => { 
					const mousePos = this.diagram.lastInput.viewPoint;
					console.log( mousePos.x, mousePos.y );
					this.doShowGraphTemplateDialog( mousePos.x, mousePos.y );
				},
			),
			this.newMenuItem( "Show Parent Graph", 
				(e, obj) => { this.doShowParentGraph(); },
				(o) => { return !this.isRootGraph; }
			),
			this.newMenuItem( "Back to Previous Graph", 
				(e, obj) => { this.doShowPreviousGraph(); },
				(o) => { return !this.isHistoryEmpty; }
			),
			this.newMenuItem( "Show Root Graph",
				(e, obj) => { this.doShowRootGraph(); },
				(o) => { return !this.isRootGraph; }
			),
			this.newMenuItem( "Set Read-only Mode",
				(e, obj) => { this.doSetReadOnly( true ); },
				(o) => { return !this.isReadOnly; }
			),
			this.newMenuItem( "Unset Read-only Mode",
				(e, obj) => { this.doSetReadOnly( false ); },
				(o) => { return this.isReadOnly; }
			),
			this.newMenuItem( "Toogle Visible Grid", 
				(e, obj) => { this.diagram.grid.visible = !this.diagram.grid.visible; },
				(o) => { return true }
			),
			this.newMenuItem( "Toogle Visible Palette", 
				(e, obj) => { 
					const htmlObj = document.querySelector( `#${this.fullPaletteId}`);
					const v = htmlObj.style.visibility;
					htmlObj.style.visibility = ( v == 'visible'? 'hidden': 'visible' );
				},
				(o) => { return (this.fullPaletteId? true: false) }
			)
		);
		return( contextMenu );
	}
	newNodeContextMenu() {
		// a context menu is an Adornment with a bunch of buttons in them
		const menuEntry = $("ContextMenu",
			this.newMenuItem("Cut",
				(e, obj) => { e.diagram.commandHandler.cutSelection(); },
				(o) => { return o.diagram.commandHandler.canCutSelection(); }),
			this.newMenuItem("Duplicate",
				(e, obj) => { 
											const location = e.diagram.toolManager.contextMenuTool.mouseDownPoint;
											e.diagram.commandHandler.copySelection();
											e.diagram.commandHandler.pasteSelection( location );
				            },
				(o) => { 
								 const location = o.diagram.toolManager.contextMenuTool.mouseDownPoint;
					       return( o.diagram.commandHandler.canCopySelection() ); 
							 }),
			this.newMenuItem("Copy",
				(e, obj) => { e.diagram.commandHandler.copySelection(); },
				(o) => { return o.diagram.commandHandler.canCopySelection(); }),
			this.newMenuItem("Paste",
				(e, obj) => {
											const location = e.diagram.toolManager.contextMenuTool.mouseDownPoint;
											e.diagram.commandHandler.pasteSelection( location ); 
										},
				(o) => { return o.diagram.commandHandler.canPasteSelection( location ); }),
			this.newMenuItem("Delete",
				(e, obj) => { e.diagram.commandHandler.deleteSelection(); },
				(o) => { return o.diagram.commandHandler.canDeleteSelection(); }),
			this.newMenuItem( "Set From Palette", 
				(e, obj) => { this._reSetSelectionFromPalette( e, obj ); },
				(o) => { return true; } // TODO: check if node is SubGraph
			),
			this.newMenuItem("Undo",
				(e, obj) => { e.diagram.commandHandler.undo(); },
				(o) => { return o.diagram.commandHandler.canUndo(); }),
			this.newMenuItem("Redo",
				(e, obj) => { e.diagram.commandHandler.redo(); },
				(o) => { return o.diagram.commandHandler.canRedo(); }),
			this.newMenuItem("Group",
				(e, obj) => { e.diagram.commandHandler.groupSelection(); },
				(o) => { return o.diagram.commandHandler.canGroupSelection(); }),
			this.newMenuItem("Ungroup",
				(e, obj) => { e.diagram.commandHandler.ungroupSelection(); },
				(o) => { return o.diagram.commandHandler.canUngroupSelection(); }),
			this.newMenuItem("Open File",
				(e, obj) => { this.doLoadFile(); },
				(o) => { return ( o.data.isFile? true: false ); }),
			this.newMenuItem( "Open Sub-Graph", 
				(e, obj) => { this.doLoadGraph(); },
				(o) => { return ( o.data.isDir? true: false ); } // TODO: check if node is SubGraph
			)
		);
		return( menuEntry );
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
		const info = "Model:\n" + model.nodeDataArray.length + " nodes, " + model.linkDataArray.length + " links";
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
	_reSetSelectionFromPalette( e, obj ) {
		const selection = this.getSelection();
		selection.each( (node) => {
			let templateData = null;
			let systemFieldList = null;
			if( node instanceof go.Node ) {
				templateData = this.diagram.toolManager.clickCreatingTool.archetypeNodeData;
				systemFieldList = this.systemNodeDataFieldList;
			} else if( node instanceof go.Link ) {
				templateData = this.diagram.toolManager.linkingTool.archetypeLinkData;
				systemFieldList = this.systemLinkDataFieldList;
			}
			if( templateData ) {
				const dataNode = node.data;
				const dataNodeFieldList = Object.keys( dataNode );
				for( const field of dataNodeFieldList ) {
					// If the field does not start with '_' and is not a system field
					if( !field.startsWith('_') && ( systemFieldList.indexOf( field ) == -1 ) ) {
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
	_getNodeDataCopy( nodeData ) {
		let result = {};
		const fieldList = Object.keys( nodeData );
		for( const field of fieldList ) {
			if( !field.startsWith( '_' ) ) {
				result[field] = nodeData[field];
			}
		}
		return( result );
	}
	_getFilteredSelection() {
		let dataList = [];
		const s = this.diagram.selection;
		if( s.count > 0 ) {
			const it = s.iterator;
			while( it.next() ) {
				// Strip out any GoJS internal data field
				const dataNode = it.value.data;
				const dataNodeFieldList = Object.keys( dataNode );
				let stripData = {};
				for( const field of dataNodeFieldList ) {
					// If the field does not start with '_' and is not a system field
					if( !field.startsWith('_') ) {
						stripData[field] = dataNode[field];
					}
				}
				// Push stripped data object
				dataList.push( stripData );
			}
		}
		return( dataList );
	}
	clearInstance() {
		// Node Events
		this.onNodeGraphModelChanged = null;
		this.onNodeGraphSelectionChanged = null;
	}
	_storeDSLNodeFieldNameList( dsl ) {
		let paramNameTemp = {};
		if( dsl.dataNodeList ) {
			for( const dataNode of dsl.dataNodeList ) {
				const fieldNameList = Object.keys( dataNode );
				for( const fieldName of fieldNameList ) {
					paramNameTemp[fieldName] = null;
				}
			}
			for( const dataNode of dsl.dataLinkList ) {
				const fieldNameList = Object.keys( dataNode );
				for( const fieldName of fieldNameList ) {
					paramNameTemp[fieldName] = null;
				}
			}
			this.dslNodeFieldNameList = Object.keys( paramNameTemp );
		}
	}
}
