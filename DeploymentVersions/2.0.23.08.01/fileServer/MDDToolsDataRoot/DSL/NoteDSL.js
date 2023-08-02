/*
   DSL for projects definition with:
    - Project, module, library, ...
*/

function NoteDSL_getDSL( g ) {

  // Define node graphics
  const dsl_Note_NodeType1 = ()=> {
    return $(go.Node, "Auto",
      {
        resizable: true,
      },
      // example Node binding sets Node.location to the value of Node.data.loc
      new go.Binding("location", "location",go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
      $(go.Shape, "RoundedRectangle",
        {
          fill: "white", // the default fill, if there is no data bound value
          portId: "", 
          cursor: "pointer",  // the Shape is the port, not the whole Node
          // allow all kinds of links from this port
          fromLinkable: true, 
          fromLinkableSelfNode: true, 
          fromLinkableDuplicates: true,
          // allow all kinds of links to this port
          toLinkable: true, 
          toLinkableSelfNode: true,
          toLinkableDuplicates: true
        },
        new go.Binding("figure", "figure"),
        new go.Binding("fill", "color"),
      ),
      $(go.TextBlock,
        {
          font: "bold 14px sans-serif",
          stroke: '#333',
          margin: 6,  // make some extra space for the shape around the text
          isMultiline: true,  // don't allow newlines in text
          editable: true,  // allow in-place editing by user
          //textValidation: this.isNewNodeTextValid.bind(this),
        },
        new go.Binding("text", "text").makeTwoWay()  // the label shows the node data's text
      )
    );
  };

  const dsl = {
    templateNodeList: [
      { category: 'Note_NodeType1', template: dsl_Note_NodeType1, },
    ],
    dataNodeList: [
      {
        text: 'TODO1',
        color: 'yellowgreen',
        figure: 'Diamond',
        category: 'Note_NodeType1',
        size: '125 60',
      },
      {
        text: 'TODO2',
        color: 'gold',
        figure: 'Diamond',
        category: 'Note_NodeType1',
        size: '125 60',
      },
      {
        text: 'TODO3',
        color: 'plum',
        figure: 'Diamond',
        category: 'Note_NodeType1',
        size: '125 60',
      },
      {
        text: 'DONE',
        color: 'PaleGreen',
        figure: 'Ellipse',
        category: 'Note_NodeType1',
        size: '125 40',
      },
      {
        text: 'FAILED',
        color: 'PaleVioletRed',
        figure: 'Ellipse',
        category: 'Note_NodeType1',
        size: '125 40',
      },
      {
        text: 'Note1',
        color: 'yellow',
        figure: 'Rectangle',
        category: 'Note_NodeType1',
        size: '125 28',
      },
      {
        text: 'Note2',
        color: 'Khaki',
        figure: 'Rectangle',
        category: 'Note_NodeType1',
        size: '125 28',
      },
      {
        text: 'Note3',
        color: 'GreenYellow',
        figure: 'Rectangle',
        category: 'Note_NodeType1',
        size: '125 28',
      },
      {
        text: 'High Priority',
        color: 'red',
        figure: 'RoundRectangle',
        category: 'Note_NodeType1',
        size: '125 35',
      },
      {
        text: 'Medium Priority',
        color: 'orange',
        figure: 'RoundRectangle',
        category: 'Note_NodeType1',
        size: '125 35',
      },
      {
        text: 'Low Priority',
        color: 'green',
        figure: 'RoundRectangle',
        category: 'Note_NodeType1',
        size: '125 35',
      },
      {
        text: 'Nice To Have',
        color: 'pink',
        figure: 'RoundRectangle',
        category: 'Note_NodeType1',
        size: '125 35',
      },
      {
        text: 'Back Log',
        color: 'lightgreen',
        figure: 'RoundRectangle',
        category: 'Note_NodeType1',
        size: '125 35',
      },
    ],
    templateLinkList: [],
    dataLinkList: [],
  };

  return( dsl );
}