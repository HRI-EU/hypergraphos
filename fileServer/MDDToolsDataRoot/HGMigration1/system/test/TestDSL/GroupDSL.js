/*
   DSL for groups definition
  */
function GroupDSL_includeList() {
  return(['/fileServer/DSLInclude.js']);
}
function GroupDSL_getDSL( g ) {
  
  //-----------------------
  // Define event handler
  //-----------------------

  const dsl_BasicGroup = ()=> {
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
  
  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    templateGroupList: [
      { category: 'Group_BasicGroup', template: dsl_BasicGroup },
    ],
    dataGroupList: [
      {
        label: 'Group New',
        category: 'Group_BasicGroup',
        isGroup: true,
        color: 'gray',
      },
    ],
  };

  return( dsl );
}