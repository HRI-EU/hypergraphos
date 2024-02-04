// Allow ClickCreatingTool to work when (double)clicking on nodes, including groups:

function InGroupClickCreatingTool() {
	go.ClickCreatingTool.call(this);
}
go.Diagram.inherit(InGroupClickCreatingTool, go.ClickCreatingTool);

InGroupClickCreatingTool.prototype.canStart = function() {
	if (!this.isEnabled) return false;

	// gotta have some node data that can be copied
	if (this.archetypeNodeData === null) return false;

	var diagram = this.diagram;

	// heed IsReadOnly & AllowInsert
	if (diagram === null || diagram.isReadOnly || diagram.isModelReadOnly) return false;
	if (!diagram.allowInsert) return false;

	// only works with the left button
	if (!diagram.lastInput.left) return false;

	// the mouse down point needs to be near the mouse up point
	if (this.isBeyondDragSize()) return false;

	// maybe requires double-click; otherwise avoid accidental double-create
	if (this.isDoubleClick) {
		if (diagram.lastInput.clickCount === 1) this._firstPoint = diagram.lastInput.viewPoint.copy();
		if (diagram.lastInput.clickCount !== 2) return false;
		if (this.isBeyondDragSize(this._firstPoint)) return false;
	} else {
		if (diagram.lastInput.clickCount !== 1) return false;
	}

	//// don't include the following check when this tool is running modally
	//if (diagram.currentTool !== this) {
	//  // only operates in the background, not on some Part
	//  var part = diagram.findPartAt(diagram.lastInput.documentPoint, true);
	//  if (part !== null) return false;
	//}

	return true;
};

InGroupClickCreatingTool.prototype.insertPart = function(loc) {
	var model = this.diagram.model;  // assume it's a GraphLinksModel
	var oldcopies = model.copiesGroupKeyOfNodeData;
	// did the user (double?)click on a Group or on a Part that is a member of a Group?
	var part = this.diagram.findPartAt(loc, false);
	if (part !== null && !(part instanceof go.Group)) {
		part = part.containingGroup;
	}
	var newnode = go.ClickCreatingTool.prototype.insertPart.call(this, loc);
	if (part instanceof go.Group) {
		const list = new go.List();
		list.add( newnode );
		part.addMembers( list, true );
	}
	return newnode;
};
// end InGroupClickCreatingTool