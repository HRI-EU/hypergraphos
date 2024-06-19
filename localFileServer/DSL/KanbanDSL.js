/*
   DSL for Creating Kanban Boards
    - Created 02-11-2022
    - By Frankonello
*/
function KanbanDSL_includeList() {
  //return(['/fileServer/System/Includes/DSLInclude.js']);
  return([]);
}
function KanbanDSL_setupDSL( g ) {
}
function KanbanDSL_getDSL( g ) {

  // Ticket Colors:
  const noteColors = ['#009CCC', '#CC293D', '#FFD700', '#8BAD0D', 
                      '#C386F1', '#D4896A', '#85937A', '#80FF00',
                      '#666666', '#FFFF00', '#000080', '#FF0000'];
  function getNoteColor(num) {
    return noteColors[Math.min(num, noteColors.length - 1)];
  }
  const dsl_KanbanCard = ()=> {
    return( $(go.Node, "Horizontal",
      new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, "Rectangle", 
        {
          fill: getNoteColor(0),
          strokeWidth: 1,
          stroke: getNoteColor(0),
          width: 6,
          stretch: go.GraphObject.Vertical,
          alignment: go.Spot.Left,
          // if a user clicks the colored portion of a node, cycle through colors
          click: (e, obj) => {
            const diagram = g.diagram;
            if( diagram ) {
              diagram.startTransaction("Update node color");
              let newColor = parseInt(obj.part.data.color) + 1;
              if (newColor > noteColors.length - 1) newColor = 0;
              diagram.model.setDataProperty(obj.part.data, "color", newColor);
              diagram.commitTransaction("Update node color");
            }
          }
        },
        new go.Binding("fill", "color", getNoteColor),
        new go.Binding("stroke", "color", getNoteColor)
      ),
      $(go.Panel, "Auto",
        $(go.Shape, "Rectangle", { fill: "white", stroke: '#CCCCCC' }),
        $(go.Panel, "Table",
          { 
            width: 135,
            minSize: new go.Size(NaN, 50)
          },
          $(go.TextBlock,
            {
              name: 'TEXT',
              margin: new go.Margin( 6, 3, 6, 3 ),//6,
              font: '6px Lato, sans-serif', 
              editable: true,
              stroke: "#000", 
              maxSize: new go.Size(130, NaN),
              formatting: go.TextBlock.FormatNone,
              alignment: go.Spot.TopLeft
            },
            new go.Binding("text", "label").makeTwoWay())
        )
      )
    ));
  }

  // While dragging, highlight the dragged-over group
  function highlightGroup(grp, show) {
    if (show) {
      //const part = g.diagram.toolManager.draggingTool.currentPart;
      //if (part.containingGroup === grp) {
        grp.isHighlighted = true;
        return;
      //}
    }
    grp.isHighlighted = false;
  }
   // this is called after nodes have been moved
   function relayoutDiagram() {
    g.diagram.selection.each(n => n.invalidateLayout());
    g.diagram.layoutDiagram();
  }
  // compute the minimum length of the whole diagram needed to hold all of the Lane Groups
  function computeMinPoolLength() {
    let len = this.MINLENGTH;
    g.diagram.findTopLevelGroups().each(lane => {
      const holder = lane.placeholder;
      if (holder !== null) {
        const sz = holder.actualBounds;
        len = Math.max(len, sz.height);
      }
    });
    return len;
  }
  // compute the minimum size for a particular Lane Group
  function computeLaneSize(lane) {
    const MINLENGTH = 200;  // this controls the minimum length of any swimlane
    const MINBREADTH = 100;  // this controls the minimum breadth of any non-collapsed swimlane
    // assert(lane instanceof go.Group);
    const sz = new go.Size(lane.isSubGraphExpanded ? MINBREADTH : 1, MINLENGTH);
    if (lane.isSubGraphExpanded) {
      const holder = lane.placeholder;
      if (holder !== null) {
        const hsz = holder.actualBounds;
        sz.width = Math.max(sz.width, hsz.width);
      }
    }
    // minimum breadth needs to be big enough to hold the header
    const hdr = lane.findObject("HEADER");
    if (hdr !== null) sz.width = Math.max(sz.width, hdr.actualBounds.width);
    return sz;
  }
  const dsl_KanbanBoardGroup = ()=> {
    return $(go.Group, "Vertical",
      {
        selectable: true,
        selectionObjectName: "SHAPE", // even though its not selectable, this is used in the layout
        layerName: "Background",  // all lanes are always behind all nodes and links
        layout: $(go.GridLayout,  // automatically lay out the lane's subgraph
          {
            wrappingColumn: 1,
            cellSize: new go.Size(1, 1),
            spacing: new go.Size(5, 5),
            alignment: go.GridLayout.Position,
            comparer: (a, b) => {  // can re-order tasks within a lane
              const ay = a.location.y;
              const by = b.location.y;
              if (isNaN(ay) || isNaN(by)) return 0;
              if (ay < by) return -1;
              if (ay > by) return 1;
              return 0;
            }
          }),
        click: (e, grp) => {  // allow simple click on group to clear selection
          if (!e.shift && !e.control && !e.meta) e.diagram.clearSelection();
        },
        computesBoundsAfterDrag: true,  // needed to prevent recomputing Group.placeholder bounds too soon
        handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
        mouseDragEnter: (e, grp, prev) => highlightGroup(grp, true),
        mouseDragLeave: (e, grp, next) => highlightGroup(grp, false),
        mouseDrop: (e, grp) => {  // dropping a copy of some Nodes and Links onto this Group adds them to this Group
          // don't allow drag-and-dropping a mix of regular Nodes and Groups
          if (e.diagram.selection.all(n => !(n instanceof go.Group))) {
            const ok = grp.addMembers(grp.diagram.selection, true);
            if (!ok) grp.diagram.currentTool.doCancel();
            const shape = grp.selectionObject;
            const minlen = computeMinPoolLength();
            relayoutDiagram();

            setInterval( ()=> {
              if (shape !== null) {  // change the desiredSize to be big enough in both directions
                const sz = computeLaneSize(grp);
                shape.width = (!isNaN(shape.width)) ? Math.max(shape.width, sz.width) : sz.width;
                // if you want the height of all of the lanes to shrink as the maximum needed height decreases:
                shape.height = minlen;
                // if you want the height of all of the lanes to remain at the maximum height ever needed:
                // shape.height = (isNaN(shape.height) ? minlen : Math.max(shape.height, minlen));
                const cell = grp.resizeCellSize;
                if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) shape.width = Math.ceil(shape.width / cell.width) * cell.width;
                if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) shape.height = Math.ceil(shape.height / cell.height) * cell.height;
              }
            }, 3000 );
          }
        },
        subGraphExpandedChanged: grp => {
          const shp = grp.selectionObject;
          if (grp.diagram.undoManager.isUndoingRedoing) return;
          if (grp.isSubGraphExpanded) {
            shp.width = grp.data.savedBreadth;
          } else {  // remember the original width
            if(!isNaN(shp.width)) 
              grp.diagram.model.set(grp.data, "savedBreadth", shp.width);
            shp.width = NaN;
          }
        }
      },
      new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("isSubGraphExpanded", "expanded").makeTwoWay(),
      // the lane header consisting of a TextBlock and an expander button
      $(go.Panel, "Horizontal",
        { name: "HEADER", alignment: go.Spot.Left },
        $("SubGraphExpanderButton", { margin: 5 }),  // this remains always visible
        $(go.TextBlock,  // the lane label
          { font: "15px Lato, sans-serif", editable: true, margin: new go.Margin(2, 0, 0, 0) },
          // this is hidden when the swimlane is collapsed
          new go.Binding("visible", "isSubGraphExpanded").ofObject(),
          new go.Binding("text", "label").makeTwoWay())
      ),  // end Horizontal Panel
      $(go.Panel, "Auto",  // the lane consisting of a background Shape and a Placeholder representing the subgraph
        $(go.Shape, "Rectangle",  // this is the resized object
          { name: "SHAPE", fill: "#F1F1F1", stroke: null, strokeWidth: 4 },  // strokeWidth controls space between lanes
          new go.Binding("fill", "isHighlighted", h => h ? "#D6D6D6" : "#F1F1F1").ofObject(),
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)
        ),
        $(go.Placeholder,
          { padding: 12, alignment: go.Spot.TopLeft }),
        $(go.TextBlock,  // this TextBlock is only seen when the swimlane is collapsed
          {
            name: "LABEL", font: "15px Lato, sans-serif", editable: true,
            angle: 90, alignment: go.Spot.TopLeft, margin: new go.Margin(4, 0, 0, 2)
          },
          new go.Binding("visible", "isSubGraphExpanded", e => !e).ofObject(),
          new go.Binding("text", "label").makeTwoWay())
      )  // end Auto Panel
    );  // end Group);
  }

  //-----------------------
  // Define event handler
  //-----------------------

 
  //-----------------------
  // Define palette
  //-----------------------
  
  const dsl = {
    templateNodeList: [
      { category: 'KanbanDSL_KanbanCard',            template: dsl_KanbanCard, param: {} },
    ],
    dataNodeList: [
      { 
        category: 'KanbanDSL_KanbanCard',
        label: 'Task Description', 
        color: 1, 
      },
    ],
    templateLinkList: [],
    dataLinkList: [],
    templateGroupList: [
      { category: 'KanbanDSL_KanbanBoard',            template: dsl_KanbanBoardGroup, param: {} },
    ],
    dataGroupList: [
      {
        label: 'Kanban Board',
        category: 'KanbanDSL_KanbanBoard',
        isGroup: true,
        size: '160 100',
      },
    ],
  };

  return( dsl );
}