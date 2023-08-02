let myDiagram;
var $ = go.GraphObject.make;  // for conciseness in defining templates
let defaultLayout;

function init() {

  myDiagram = $(go.Diagram, "myDiagram",  // create a Diagram for the DIV HTML element
                {
                  initialContentAlignment: go.Spot.Center,  // center the content
                  "undoManager.isEnabled": true,  // enable undo & redo
                });

  defaultLayout = myDiagram.layout;
  // define a simple Node template
  myDiagram.nodeTemplate =
    $(go.Node, "Auto",  // the Shape will go around the TextBlock
      $(go.Shape, "RoundedRectangle",
        // Shape.fill is bound to Node.data.color
        new go.Binding("fill", "color")),
      $(go.TextBlock,
        { margin: 3 },  // some room around the text
        // TextBlock.text is bound to Node.data.key
        new go.Binding("text", "key"))
    );

  // but use the default Link template, by not setting Diagram.linkTemplate
}
function load(htmlId) {
  switch( htmlId ) {
    case 'mySavedModel1':
      myDiagram.layout = $(go.TreeLayout, { nodeSpacing: 3 });
    break;
    case 'mySavedModel2':
      myDiagram.layout = new go.Layout();
    break;
  }
  const jsonModel = document.getElementById(htmlId).value;
  myDiagram.model = go.Model.fromJson(jsonModel);
}
init();