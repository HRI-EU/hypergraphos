/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
   DSL for projects definition with:
    - Project, module, library, ...
*/
function HierarchyDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}
function HierarchyDSL_getDSL( g ) {

  const cm = g.contextMenu;
  cm.add( menuDSL, 'fileTypeMenu' );
  const fileTypeContextMenu = cm.getMenu( 'fileTypeMenu' );
  
  //-----------------------
  // Define event handler
  //-----------------------
  function makeLayout(horiz) {  // a Binding conversion function
    if (horiz) {
      return new go.GridLayout(
        {
          wrappingWidth: Infinity, alignment: go.GridLayout.Position,
          cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
        });
    } else {
      return new go.GridLayout(
        {
          wrappingColumn: 1, alignment: go.GridLayout.Position,
          cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
        });
    }
  }

  function defaultColor(horiz) {  // a Binding conversion function
    return horiz ? "rgba(255, 221, 51, 0.55)" : "rgba(51,211,229, 0.5)";
  }

  function defaultFont(horiz) {  // a Binding conversion function
    return horiz ? "bold 20px sans-serif" : "bold 16px sans-serif";
  }

  // this function is used to highlight a Group that the selection may be dropped into
  function highlightGroup(e, grp, show) {
    if (!grp) return;
    e.handled = true;
    if (show) {
      // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
      // instead depend on the DraggingTool.draggedParts or .copiedParts
      var tool = grp.diagram.toolManager.draggingTool;
      var map = tool.draggedParts || tool.copiedParts;  // this is a Map
      let hasExternalParts = false;
      e.diagram.selection.each(function(part) {
        if (part.containingGroup !== grp) {
          hasExternalParts = true;
          return true;
        }
        return false;
      });
      // now we can check to see if the Group will accept membership of the dragged Parts
      if (hasExternalParts && grp.canAddMembers(map.toKeySet())) {
        e.diagram.highlight(grp);
        return;
      }
    }
    e.diagram.clearHighlighteds();
  }
  // Upon a drop onto a Group, we try to add the selection as members of the Group.
  // Upon a drop onto the background, or onto a top-level Node, make selection top-level.
  // If this is OK, we're done; otherwise we cancel the operation to rollback everything.
  function finishDrop(e, grp) {
    var ok = (grp !== null
      ? grp.addMembers(grp.diagram.selection, true)
      : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
    if (!ok) e.diagram.currentTool.doCancel();
  }
  //g.diagram.mouseDrop = (e)=> finishDrop(e, null);


  // TODO: implement group using this https://gojs.net/latest/samples/regrouping.html
  const dsl_BasicGroup = ( param )=> {
    return $(go.Group, "Vertical",
      { 
        defaultStretch: go.GraphObject.Horizontal,
        ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
        
        computesBoundsAfterDrag: true,
        computesBoundsIncludingLocation: true,
        handlesDragDropForMembers: true,
        
        mouseDragEnter: function(e, grp, prev) { 
          highlightGroup(e, grp, true);
        },
        mouseDragLeave: function(e, grp, next) { 
          highlightGroup(e, grp, false);
        },
        mouseDrop: function(e, grp) {
          if (grp instanceof go.Group) {
            var ok = grp.addMembers(grp.diagram.selection, true);
            if (!ok) e.diagram.currentTool.doCancel();
          }
        }
      },
      new go.Binding("location", "location", function( location ) {
        const values = location.split( ' ' );
        // TODO, the 10 comes from the grid size --> move this constant into a config file
        const x = Math.round( parseFloat( values[0]/10 )*10 );
        const y = Math.round( parseFloat( values[1]/10 )*10 );
        return( new go.Point( x, y ) );
      }).makeTwoWay( function( point ) {
        const x = Math.round( point.x/10 )*10;
        const y = Math.round( point.y/10 )*10;
        return( `${x} ${y}` );
      }),
      $(go.Panel, "Auto",
        {
          pickable: true,
        },
        $(go.Shape, "Rectangle",
          { //fill: "gray",
            portId: "", 
            cursor: "pointer",  // the Shape is the port, not the whole Node
            // allow all kinds of links from this port
            fromLinkable: true, 
            fromLinkableSelfNode: false, 
            fromLinkableDuplicates: true,
            // allow all kinds of links to this port
            toLinkable: true, 
            toLinkableSelfNode: false, 
            toLinkableDuplicates: true,
          },
          new go.Binding("fill", "color").makeTwoWay()
        ),
        $(go.TextBlock,
          { margin: new go.Margin(2, 2, 0, 2), 
            textAlign: "center",
            stroke: "lightgray",
            font: "bold 40px sans-serif",
            isMultiline: true,
            editable: true
          },
          new go.Binding("text", "label").makeTwoWay(),
          new go.Binding("font", "font").makeTwoWay(),
        )
      ),
      $(go.Panel, "Auto",
        { 
          pickable: true,
          background: "transparent"
        },
        $(go.Shape, { fill: "rgba(128,128,128,0.2)" }),
        $(go.Placeholder, { 
          padding: 20,
          pickable: true,
          background: "transparent" 
        }),
        new go.Binding("background", "isHighlighted", h => h ? "rgba(0,0,0,0.2)" : "transparent").ofObject()
      ),
      { // this tooltip Adornment is shared by all groups
        toolTip: g.newGroupToolTip(),
        // the same context menu Adornment is shared by all groups
        //contextMenu: this.nodeContextMenu
      }
    );
  };

  const dsl_LayoutGroup = ( param )=> {
    param = ( param? param: {} );
    param.g = ( param.g !== undefined? param.g: null );
    // GROUP SHAPE
    return $( go.Group, "Auto",
      {
        background: "blue",
        ungroupable: true,
        // highlight when dragging into the Group
        mouseDragEnter: (e, grp, prev) => highlightGroup(e, grp, true),
        mouseDragLeave: (e, grp, next) => highlightGroup(e, grp, false),
        computesBoundsAfterDrag: true,
        computesBoundsIncludingLocation: true,
        // when the selection is dropped into a Group, add the selected Parts into that Group;
        // if it fails, cancel the tool, rolling back any changes
        mouseDrop: finishDrop,
        handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
        // Groups containing Groups layout their members horizontally
        layout: makeLayout(false)
      },
      new go.Binding("location", "location",go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("layout", "horiz", makeLayout),
      new go.Binding("background", "isHighlighted", h => h ? "rgba(255,0,0,0.2)" : "transparent").ofObject(),
      $(go.Shape, "RoundedRectangle",
        { 
          fill: null, 
          stroke: defaultColor(false), 
          fill: defaultColor(false), 
          strokeWidth: 2 
        },
        new go.Binding("stroke", "horiz", defaultColor),
        new go.Binding("fill", "horiz", defaultColor)
      ),
      $( go.Panel, "Vertical", // title above Placeholder
        // $( go.Panel, "Horizontal", // button next to TextBlock
        //   { 
        //     stretch: go.GraphObject.Horizontal, 
        //     background: defaultColor(false) 
        //   },
        //   new go.Binding("background", "horiz", defaultColor),
          $( go.TextBlock,
            {
              alignment: go.Spot.Left,
              editable: true,
              margin: 5,
              font: defaultFont(false),
              opacity: 0.95,  // allow some color to show through
              stroke: "#404040"
            },
            new go.Binding("font", "horiz", defaultFont),
            new go.Binding("text", "label").makeTwoWay(),
          ),
       // ), // end Horizontal Panel
        $( go.Placeholder,
          { 
            padding: 5, 
            alignment: go.Spot.TopLeft 
          }
        )
      )
    )
  }
  // Define the appearance and behavior for Groups:
		// Groups consist of a title in the color given by the group node data
		// above a translucent gray rectangle surrounding the member parts
/*		const groupTemplate = $(go.Group, "Vertical",
			{
				name: "PANEL",
				selectionObjectName: "PANEL",  // selection handle goes around shape, not label
				defaultAlignment: go.Spot.Left,

				ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
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
			$(go.Panel, "auto", 
				{
					stretch: go.GraphObject.Horizontal, 
				},
				//$("SubGraphExpanderButton"), // Button to expand/collapse the group
				$(go.TextBlock,
					{
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
					pickable: false,
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
		);*/

    /**********************
     * Original group used directly in Graph.js
     **********************
	newGroupTemplate() { // TODO: Put in DSL
		const groupTemplate = $(go.Group, "Vertical",
			{ defaultStretch: go.GraphObject.Horizontal,
				ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
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
			$(go.Panel, "Auto",
				{
				},
				$(go.Shape, "Rectangle",
					{ fill: "gray",
						portId: "", 
						cursor: "pointer",  // the Shape is the port, not the whole Node
						// allow all kinds of links from this port
						fromLinkable: true, 
						fromLinkableSelfNode: false, 
						fromLinkableDuplicates: true,
						// allow all kinds of links to this port
						toLinkable: true, 
						toLinkableSelfNode: false, 
						toLinkableDuplicates: true,
					},
					new go.Binding("fill", "color")
				),
				$(go.TextBlock,
					{ margin: new go.Margin(2, 2, 0, 2), 
						textAlign: "center",
						stroke: "lightgray",
						font: "bold 40px sans-serif",
						isMultiline: true,
						editable: true
					},
					new go.Binding("text", "label").makeTwoWay(),
				)
			),
			$(go.Panel, "Auto",
				{ 
					pickable: false,
					//contextMenu: this.nodeContextMenu,
				},
				$(go.Shape, { fill: "rgba(128,128,128,0.2)" }),
				$(go.Placeholder, { padding: 20 }),
			),
			{ // this tooltip Adornment is shared by all groups
				toolTip: this.newGroupToolTip(),
				// the same context menu Adornment is shared by all groups
				//contextMenu: this.nodeContextMenu
			}
		);
		// Define the appearance and behavior for Groups:
		// Groups consist of a title in the color given by the group node data
		// above a translucent gray rectangle surrounding the member parts
/*		const groupTemplate = $(go.Group, "Vertical",
			{
				name: "PANEL",
				selectionObjectName: "PANEL",  // selection handle goes around shape, not label
				defaultAlignment: go.Spot.Left,

				ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
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
			$(go.Panel, "auto", 
				{
					stretch: go.GraphObject.Horizontal, 
				},
				//$("SubGraphExpanderButton"), // Button to expand/collapse the group
				$(go.TextBlock,
					{
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
					pickable: false,
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
		);*-/
		return( groupTemplate );
	}
	*/
  
  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    templateNodeList: [
      { category: 'Hierarchy_GraphInfo',      template: dsl_Component, param: { g, hasInputs: false, hasOutputs: false, hasFunctionButtons: false, hasTag: false, hasType: false, hasValue: true,  hasUnit: false,  figure: "File", fill: "SkyBlue", canAddProperties: false, hasIcon: true, iconURL: '/fileServer/pictures/Graph_Info.png', iconWidth: 50, iconHeight: 50, minSize: new go.Size(180, 80), isFromLinkable: false, isToLinkable: false,} },
      { category: 'Hierarchy_FolderContent',  template: dsl_BasicNode, param: { g, hasTag: false,  hasType:false,   minSize: new go.Size(150,100), figure: "Folder",     fill: "white", 			isFromLinkable: true,  isToLinkable: true, labelStroke: "black", hasImage: "content", labelVerticalAlignment: "below", labelHorizontalAlignment: "right", } },
      { category: 'Hierarchy_FolderImage',    template: dsl_BasicNode, param: { g, hasTag: false,  hasType:false,   minSize: new go.Size(150,100), figure: "Folder",     fill: "white", 			isFromLinkable: true,  isToLinkable: true, labelStroke: "black", hasImage: "user", labelVerticalAlignment: "below", labelHorizontalAlignment: "right", } },
      { category: 'Hierarchy_Folder',         template: dsl_BasicNode, param: { g, hasTag: false,  hasType:false,   minSize: new go.Size(150,60),  figure: "Folder",     fill: "white", 			isFromLinkable: true,  isToLinkable: true, labelStroke: "black", labelVerticalAlignment: "below", labelHorizontalAlignment: "right", } },
      { category: 'Hierarchy_Project',        template: dsl_BasicNode, param: { g, hasTag: false,  hasType:false,   minSize: new go.Size(150,60),  figure: "Project",    fill: "mediumaquamarine", isFromLinkable: true,  isToLinkable: true, labelStroke: "black" } },
      { category: 'Hierarchy_DataInFile',     template: dsl_BasicNode, param: { g, hasTag: false,  hasType:false,   minSize: new go.Size(150,40),  figure: "File",       fill: "lightseagreen",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black" } },
      { category: 'Hierarchy_DataInGraph',    template: dsl_BasicNode, param: { g, hasTag: false,  hasType:false,   minSize: new go.Size(150,40),  figure: "FileCircle", fill: "lightseagreen",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Hierarchy_CodeInFile',     template: dsl_BasicNode, param: { g, hasTag: false,  hasType:true,    type: '@fileTypeName', isTypeEditable: false, minSize: new go.Size(150,40),   figure: "File",       fill: "lightseagreen",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black", typeMenu: fileTypeContextMenu} },
      { category: 'Hierarchy_CodeInGraph',    template: dsl_BasicNode, param: { g, hasTag: false,  hasType:true,    type: '@fileTypeName', isTypeEditable: false, minSize: new go.Size(40,40),   figure: "FileCircle", fill: "lightseagreen",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black", typeMenu: fileTypeContextMenu} },
      { category: 'Hierarchy_Model',          template: dsl_BasicNode, param: { g, hasTag: false,  hasType:false,   minSize: new go.Size(150,60),  figure: "Project",    fill: "Lavender",         isFromLinkable: true,  isToLinkable: true, labelStroke: "black", isLabelEditable: false} },
      { category: 'Hierarchy_Selection',      template: dsl_BasicNode, param: { g, hasTag: false,  hasType:false,   minSize: new go.Size(150,60),  figure: "Project",    fill: "Lavender",         isFromLinkable: true,  isToLinkable: true, labelStroke: "black", isLabelEditable: false} },
      { category: 'Hierarchy_GraphSource',    template: dsl_BasicNode, param: { g, hasTag: false,  hasType:false,   minSize: new go.Size(150,60),  figure: "Project",    fill: "Lavender",         isFromLinkable: true,  isToLinkable: true, labelStroke: "black", isLabelEditable: false} },
      { category: 'Hierarchy_DSL',            template: dsl_BasicNode, param: { g, hasTag: false,  hasType:false,   minSize: new go.Size(150,60),  figure: "File",       fill: "Plum",             isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
    ],
    dataNodeList: [
      {
        label: 'Graph Info',
        category: 'Hierarchy_GraphInfo',
        size: '180 80',
        props_: [
          { name: 'Name', value: 'use: label@key' },
          { name: 'Type', value: 'WorkSpace' },
          { name: 'Version', value: '1.0' },
          { name: 'Date', value: 'date@system' },
          { name: 'Path', value: 'graphPath@system' },
          { name: 'Authors', value: 'userName@system' },
        ],
      },
      {
        label: 'File',
        size: '180 35',
        category: 'Hierarchy_DataInFile',
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
        'fileURL': '',
      },
      {
        label: 'File in Graph',
        size: '180 35',
        category: 'Hierarchy_DataInGraph',
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
        'fileContent': '',
      },
      {
        label: 'File in Graph URL',
        size: '180 35',
        category: 'Hierarchy_DataInGraph',
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
        'fileURL': 'graph://fileServer/',
      },
      {
        label: 'Code in File',
        color: 'orange',
        size: '180 35',
        category: 'Hierarchy_CodeInFile',
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
        'fileURL': '',
      },
      {
        label: 'Code in Graph',
        color: 'orange',
        size: '180 35',
        category: 'Hierarchy_CodeInGraph',
        'isFile': true,
        'fileContent': '',
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Code in Graph URL',
        color: 'orange',
        size: '180 35',
        category: 'Hierarchy_CodeInGraph',
        'isFile': true,
        'fileURL': 'graph://fileServer/',
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Include Script in File',
        color: 'pink',
        size: '220 35',
        category: 'Hierarchy_CodeInFile',
        "isIncludeScript": true,
        'isFile': true,
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
        'fileURL': '',
      },
      {
        label: 'Include Script in Graph',
        color: 'plum',
        size: '220 35',
        category: 'Hierarchy_CodeInGraph',
        "isIncludeScript": true,
        'isFile': true,
        'fileContent': '',
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Include Script in Graph URL',
        color: 'plum',
        size: '220 35',
        category: 'Hierarchy_CodeInGraph',
        "isIncludeScript": true,
        'isFile': true,
        'fileURL': 'graph://fileServer/',
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
      {
        label: 'Chat',
        "size": "150 100",
        color: 'yellow',
        category: 'Hierarchy_Project',
        'fileType': 'application/html',
        'isFile': true,
        'fileURL': 'lib/multiChatHG/2.0/MultiChatUI2.html',
      },
      {
        label: 'Project',
        "size": "150 100",
        category: 'Hierarchy_Project',
        'fileType': 'text/json',
        'isDir': true,
        'fileURL': '',
      },
      {
        label: 'Model',
        size: '180 60',
        category: 'Hierarchy_Model',
        'isFile': true,
        'fileType': 'text/json',
        'isSystem': '$GraphModel$',
      },
      {
        label: 'Selection',
        size: '180 60',
        category: 'Hierarchy_Selection',
        'isFile': true,
        'fileType': 'text/json',
        'isSystem': '$GraphSelection$',
      },
      {
        label: 'Graph Source',
        size: '180 60',
        category: 'Hierarchy_GraphSource',
        'isFile': true,
        'fileType': 'text/json',
        'isSystem': '$GraphSource$',
      },
      {
        label: 'DSL name',
        size: '180 60',
        category: 'Hierarchy_DSL',
        'isFile': true,
        'fileType': 'text/json',
        'isSystem': '$GraphDSL$',
      },
    ],
    templateLinkList: [],
    dataLinkList: [],
    templateGroupList: [
      { category: 'Group_BasicGroup', template: dsl_BasicGroup, param: { g, } },
      { category: 'Group_HorizontalGroup', template: dsl_LayoutGroup, param: { g, isLayoutHorizontal: true} },
    ],
    dataGroupList: [
      {
        label: 'Group New',
        category: 'Group_BasicGroup',
        isGroup: true,
        //color: 'gray',
      },
      {
        label: 'Horizontal',
        category: 'Group_HorizontalGroup',
        isGroup: true,
        horiz: false,
        //color: 'gray',
      },
    ],
  };

  // Folders can not be used in local mode (file:///...)
  if( !config.isLocalMode ) {
    dsl.dataNodeList.push(
    {
      label: 'Folder Content',
      "size": "150 100",
      category: 'Hierarchy_FolderContent',
      'fileType': 'text/json',
      'isDir': true,
      'fileURL': '',
    },
    {
      label: 'Folder Image',
      "size": "150 100",
      category: 'Hierarchy_FolderImage',
      'fileType': 'text/json',
      'isDir': true,
      'fileURL': '',
      'imageURL': '',
    },      
    {
      label: 'Folder',
      "size": "150 100",
      category: 'Hierarchy_Folder',
      'fileType': 'text/json',
      'isDir': true,
      'fileURL': '',
    });
  }

  return( dsl );
}