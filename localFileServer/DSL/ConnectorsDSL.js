/*
   DSL for general conectors
*/
function ConnectorsDSL_includeList() {
  return(['/fileServer/System/Includes/DSLInclude.js']);
}
function ConnectorsDSL_getDSL( g ) {
    let diagram = (g.diagram? g.diagram: g.nodePalette);
  
  //-----------------------
  // Define specific shapes
  //-----------------------
  
  //-----------------------
  // Define specific menus
  //-----------------------   
  
  //-----------------------
  // Define specific maps
  //-----------------------   
  
  //-----------------------
  // Define node templates
  //-----------------------
  
  //-----------------------
  // Define link templates
  //-----------------------
  
  //-----------------------
  // Define event handler
  //-----------------------

  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    templateNodeList: [],
    dataNodeList: [],
    templateLinkList: [
      { category: 'Connectors_LinkType1', template: dsl_BasicLink, param: {toArrow: "Standard"} },
      { category: 'Connectors_LinkType2', template: dsl_BasicLink, param: {toArrow: "Standard", strokeDashArray: [5, 5]} },
      { category: 'Connectors_LinkType3', template: dsl_BasicLink, param: {toArrow: "Standard", strokeDashArray: [10, 5], strokeWidth: 6, toScale: 2} },
    ],
    dataLinkList: [
      {
        text: 'Reference',
        color: 'red', 
        category: 'Connectors_LinkType1',
      },
      { 
        text: 'Data',
        color: 'black', 
        category: 'Connectors_LinkType1',
      },
      { 
        text: 'Use',
        color: 'green', 
        category: 'Connectors_LinkType1',
      },
      { 
        text: 'Need',
        color: 'yellow', 
        category: 'Connectors_LinkType1',
      },
      { 
        text: 'Require',
        color: 'lightblue', 
        category: 'Connectors_LinkType1',
      },
      { 
        text: 'Provvide',
        color: 'orange', 
        category: 'Connectors_LinkType1',
      },
      { 
        text: 'Generate',
        color: 'lightgreen', 
        category: 'Connectors_LinkType1',
      },
      { 
        text: 'Consume',
        color: 'black', 
        category: 'Connectors_LinkType2',
      },
      { 
        text: 'Consume',
        color: 'black', 
        category: 'Connectors_LinkType3',
      },
    ],
  };

  return( dsl );
}