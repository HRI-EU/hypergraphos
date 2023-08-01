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

  // TODO: implement group using this https://gojs.net/latest/samples/regrouping.html
  const dsl_BasicGroup = ( param )=> {
    return $(go.Group, "Vertical",
      { defaultStretch: go.GraphObject.Horizontal,
        ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
        mouseDrop: (e)=> { g._onFinishDrop( e, null ); },
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
        )
      ),
      $(go.Panel, "Auto",
        { 
          pickable: false,
        },
        $(go.Shape, { fill: "rgba(128,128,128,0.2)" }),
        $(go.Placeholder, { padding: 20 }),
      ),
      { // this tooltip Adornment is shared by all groups
        toolTip: g.newGroupToolTip(),
        // the same context menu Adornment is shared by all groups
        //contextMenu: this.nodeContextMenu
      }
    );
  };
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
      { category: 'Hierarchy_FolderContent',  template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,100), figure: "Folder",     fill: "white", 			isFromLinkable: true,  isToLinkable: true, labelStroke: "black", hasImage: "content", labelVerticalAlignment: "below", labelHorizontalAlignment: "right", } },
      { category: 'Hierarchy_FolderImage',    template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,100), figure: "Folder",     fill: "white", 			isFromLinkable: true,  isToLinkable: true, labelStroke: "black", hasImage: "user", labelVerticalAlignment: "below", labelHorizontalAlignment: "right", } },
      { category: 'Hierarchy_Folder',         template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,60),  figure: "Folder",     fill: "white", 			isFromLinkable: true,  isToLinkable: true, labelStroke: "black", labelVerticalAlignment: "below", labelHorizontalAlignment: "right", } },
      { category: 'Hierarchy_Project',        template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,60),  figure: "Project",    fill: "mediumaquamarine", isFromLinkable: true,  isToLinkable: true, labelStroke: "black" } },
      { category: 'Hierarchy_DataInFile',     template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,40),  figure: "File",       fill: "lightseagreen",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Hierarchy_DataInGraph',    template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,40),  figure: "FileCircle", fill: "lightseagreen",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
      { category: 'Hierarchy_CodeInFile',     template: dsl_BasicNode, param: {hasTag: false,  hasType:true,    type: '@fileTypeName', isTypeEditable: false, minSize: new go.Size(150,40),   figure: "File",       fill: "lightseagreen",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black", typeMenu: fileTypeContextMenu} },
      { category: 'Hierarchy_CodeInGraph',    template: dsl_BasicNode, param: {hasTag: false,  hasType:true,    type: '@fileTypeName', isTypeEditable: false, minSize: new go.Size(150,40),   figure: "FileCircle", fill: "lightseagreen",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black", typeMenu: fileTypeContextMenu} },
      { category: 'Hierarchy_Model',          template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,60),  figure: "Project",    fill: "PaleGoldenrod",    isFromLinkable: true,  isToLinkable: true, labelStroke: "black", isLabelEditable: false} },
      { category: 'Hierarchy_Selection',      template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,60),  figure: "Project",    fill: "Lavender",         isFromLinkable: true,  isToLinkable: true, labelStroke: "black", isLabelEditable: false} },
      { category: 'Hierarchy_DSL',            template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,60),  figure: "File",       fill: "Plum",             isFromLinkable: true,  isToLinkable: true, labelStroke: "black"} },
    ],
    dataNodeList: [
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
        label: 'Include Script in File',
        color: 'pink',
        size: '180 35',
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
        size: '180 35',
        category: 'Hierarchy_CodeInGraph',
        "isIncludeScript": true,
        'isFile': true,
        'fileContent': '',
        'fileTypeName': 'Javascript',
        'fileType': 'text/javascript',
      },
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
      },
      {
        label: 'Chat',
        "size": "150 100",
        color: 'yellow',
        category: 'Hierarchy_Project',
        'fileType': 'application/html',
        'isFile': true,
        'fileURL': './MultiChatUI2.html',
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
      { category: 'Group_BasicGroup', template: dsl_BasicGroup },
    ],
    dataGroupList: [
      {
        label: 'Group New',
        category: 'Group_BasicGroup',
        isGroup: true,
        //color: 'gray',
      },
    ],
  };

  return( dsl );
}