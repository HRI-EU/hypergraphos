/*
   DSL for Graph Thinking
    - Created 08-07-2021
    - By Frankonello
*/
function TextLabelsDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}
function TextLabelsDSL_getDSL( g ) {

  //-----------------------
  // Define event handler
  //-----------------------

  
  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    templateNodeList: [
      { category: 'TextLabels_Size0', template: dsl_BasicNode, param: {hasTag: false, hasType:false,  minSize: new go.Size(30,30), labelTextAlign: "center", fromSpot: go.Spot.Center, toSpot: go.Spot.Center, stroke: "transparent", fill: "transparent", labelFont: "13px sans-serif" } },
      { category: 'TextLabels_Size1', template: dsl_BasicNode, param: {hasTag: false, hasType:false,  minSize: new go.Size(30,30), labelTextAlign: "center", fromSpot: go.Spot.Center, toSpot: go.Spot.Center, stroke: "transparent", fill: "transparent", labelFont: "22px sans-serif" } },
      { category: 'TextLabels_Size2', template: dsl_BasicNode, param: {hasTag: false, hasType:false,  minSize: new go.Size(30,30), labelTextAlign: "center", fromSpot: go.Spot.Center, toSpot: go.Spot.Center, stroke: "transparent", fill: "transparent", labelFont: "35px sans-serif" } },
      { category: 'TextLabels_Size3', template: dsl_BasicNode, param: {hasTag: false, hasType:false,  minSize: new go.Size(30,30), labelTextAlign: "center", fromSpot: go.Spot.Center, toSpot: go.Spot.Center, stroke: "transparent", fill: "transparent", labelFont: "45px sans-serif" } },
      { category: 'TextLabels_Size4', template: dsl_BasicNode, param: {hasTag: false, hasType:false,  minSize: new go.Size(30,30), labelTextAlign: "center", fromSpot: go.Spot.Center, toSpot: go.Spot.Center, stroke: "transparent", fill: "transparent", labelFont: "75px sans-serif" } },
      { category: 'TextLabels_Size5', template: dsl_BasicNode, param: {hasTag: false, hasType:false,  minSize: new go.Size(30,30), labelTextAlign: "center", fromSpot: go.Spot.Center, toSpot: go.Spot.Center, stroke: "transparent", fill: "transparent", labelFont: "125px sans-serif" } },
    ],
    dataNodeList: [
      {
        label: 'Label',
        category: 'TextLabels_Size0',
        size: "100 30",
      },
      {
        label: 'Label',
        category: 'TextLabels_Size1',
        size: "150 30",
     },
      {
        label: 'Label',
        category: 'TextLabels_Size2',
        size: "150 30",
      },
      {
        label: 'Label',
        category: 'TextLabels_Size3',
        size: "150 30",
      },
      {
        label: 'Label',
        category: 'TextLabels_Size4',
        size: "250 30",
      },
      {
        label: 'Label',
        category: 'TextLabels_Size5',
        size: "350 30",
      },
    ],
    templateLinkList: [],
    dataLinkList: [],
  };

  return( dsl );
}