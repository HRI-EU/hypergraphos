/*
   DSL for Tables
*/
function TableDSL_includeList() {
  return([]);
}
function TableDSL_getDSL( g ) {
  let diagram = (g.diagram? g.diagram: g.nodePalette);

  function insertIntoTable( index, row ) {
    const node = diagram.selection.first();
    if( node != null ) {
      const data = node.data;
      
      if( index == -1 ) {
        index = data.table_.length;
      }
      
      diagram.startTransaction( "insertIntoTable" );
      diagram.model.insertArrayItem( data.table_, index, { row_: row } );
      diagram.commitTransaction( "insertIntoTable" );
    }
  }
  function addRow( index ) {
    const node = diagram.selection.first();
    if( node != null ) {
      const data = node.data;
      
      const colDef = data.columnDefinitions_;
      const row = [];
      colDef.forEach( (d)=> row.push( { attr: d.attr, text: '' } ) );
      insertIntoTable( index, row );
    }
  }
  function removeFromTable( index ) {
    const node = diagram.selection.first();
    if( node != null ) {
      const data = node.data;
      
      diagram.startTransaction( "removeFromTable" );
      // remove second item of list, at index #1
      diagram.model.removeArrayItem( data.table_, index );
      diagram.commitTransaction( "removeFromTable" );
    }
  }
  function findColumnDefinitionForName( nodedata, attrName)  {
    const columns = nodedata.columnDefinitions_;
    for( let i = 0; i < columns.length; ++i ) {
      if( columns[i].attr === attrName ) {
        return( columns[i] );
      }
    }
    return( null );
  }
  function findColumnDefinitionForColumn( nodedata, index ) {
    const columns = nodedata.columnDefinitions_;
    for( let i = 0; i < columns.length; ++i ) {
      if( columns[i].column === index ) {
        return( columns[i] );
      }
    }
    return( null );
  }
  function addColumn( attrName, attrText ) {
    const node = diagram.selection.first();
    if( node != null ) {
      const data = node.data;
      // if name is not given, find an unused column name
      if( ( attrName === undefined ) || ( attrName === "" ) ) {
        attrName = "0";
        let count = 0;
        while( findColumnDefinitionForName( data, attrName ) !== null ) {
          attrName = (count++).toString();
        }
      }
      if( !attrText ) {
        attrText = 'Col'+attrName;
      }
      // find an unused column #
      let col = 0;
      while( findColumnDefinitionForColumn( data, col ) !== null ) {
        col++;
      }
      
      diagram.startTransaction( "addColumn" );
      const model = diagram.model;
      // add a column definition for the node's whole table
      model.addArrayItem( data.columnDefinitions_, {
        attr: attrName,
        text: attrText,
        column: col
      });
      // add cell to each person in the node's table.
      const table = data.table_;
      for( let j = 0; j < table.length; ++j ) {
        const tableRow = table[j];
        model.addArrayItem( tableRow.row_, {
          attr: attrName,
          text: '',
        });
      }
      diagram.commitTransaction( "addColumn" );
    }
  }
  function removeColumn( index ) {
    const node = diagram.selection.first();
    if( node != null ) {
      const data = node.data;
      const colDef = data.columnDefinitions_[index];
      if( colDef != undefined ) {
        const attrName = colDef.attr;
        
        diagram.startTransaction( "removeColumn" );
        const model = diagram.model;
        model.removeArrayItem( data.columnDefinitions_, index );
        node.findObject( "TABLE" ).removeColumnDefinition( colDef.column );
        // update columns for each row in this table
        const table = data.table_;
        for( let j = 0; j < table.length; ++j ) {
          const tableRow = table[j];
          const cols = tableRow.row_;
          for( let k = 0; k < cols.length; ++k ) {
            const cell = cols[k];
            if( cell.attr === attrName ) {
              // get rid of this attribute cell from the tableRow.row_ Array
              model.removeArrayItem( cols, k );
              break;
            }
          }
        }
        diagram.commitTransaction( "removeColumn" );
      }
    }
  }
  function swapTwoColumns( firstColName, secondColName ) {
    diagram.startTransaction( "swapColumns" );
    const model = diagram.model;
    diagram.selection.each( node => {
      if( ( node instanceof go.Node ) ) {
        const data = node.data;
        const firstColDef = findColumnDefinitionForName( data, firstColName );
        if( firstColDef != null ) {
          const firstColumn = firstColDef.column;  // remember the column number
          const secondColDef = findColumnDefinitionForName( data, secondColName );
          if( secondColDef != null) {
            const secondColumn = secondColDef.column;  // and this one too
            model.setDataProperty( firstColDef, "column", secondColumn );
            model.setDataProperty( secondColDef, "column", firstColumn );
            model.updateTargetBindings( data );  // update all bindings, to get the cells right
          }
        }
      }
    });
    diagram.commitTransaction( "swapColumns" );
  }

  const dsl = {
    // Define DSL templates
    templateNodeList: [
      { category: 'Table_HeaderTop', template: ()=>{
        return( 
          $(go.Node, "Auto",
            {
              resizable: true,
            },
            new go.Binding( "location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            $(go.Panel, "Table",
              new go.Binding("itemArray", "table_").makeTwoWay(),
              { 
                margin: 0.5,
              },
              $(go.RowColumnDefinition,
                { row: 0, background: "LightGray" }
              ),
              $(go.RowColumnDefinition,
                { row: 1, separatorStroke: "Black" }
              ),
              // the table headers -- remains even if itemArray is empty
              $(go.Panel, "TableRow",
                {
                  isPanelMain: true,
                },
                new go.Binding( "itemArray", "columnDefinitions_" ),
                {
                  itemTemplate:  // bound to a column definition object
                    $(go.Panel,
                      new go.Binding( "column" ),
                      $(go.TextBlock,
                        {
                          margin: new go.Margin( 2, 2, 0, 2 ),
                          font: "bold 10pt sans-serif",
                        },
                        new go.Binding( "text" )
                      )
                    )
                }
              ),
              { // the rows for the table
                name: "TABLE",
                defaultAlignment: go.Spot.Left,
                defaultColumnSeparatorStroke: "black",
                itemTemplate:  // bound to a col/row data object
                  $(go.Panel, "TableRow",
                    // which in turn consists of a collection of cell objects,
                    // held by the "row_" property in an Array
                    new go.Binding( "itemArray", "row_" ).makeTwoWay(),
                    {
                      itemTemplate:  // bound to a cell object
                        $(go.Panel,  // each of which as "attr" and "text" properties
                          {
                            stretch: go.GraphObject.Fill,
                            alignment: go.Spot.TopLeft,
                          },
                          new go.Binding( "column", "attr",
                            (a, elt) => {  // ELT is this bound item/cell Panel
                              // elt.data will be the cell object
                              // elt.panel.data will be the person/row data object
                              // elt.part.data will be the node data object
                              // "columnDefinitions_" is on the node data object, so:
                              const cd = findColumnDefinitionForName( elt.part.data, a );
                              if( cd !== null ) return( cd.column );
                              throw new Error( "unknown column name: "+a );
                            }),
                          // you could also have other Bindings here for this cell
                          $(go.TextBlock,
                            { 
                              editable: true,
                              //formatting: go.TextBlock.FormatNone,
                              //alignment: go.Spot.Center,
                              //textAlign: 'center',
                              margin: new go.Margin( 2, 2, 0, 2 ),
                              wrap: go.TextBlock.None,
                            },
                            new go.Binding( "text" ).makeTwoWay()
                          )
                        )
                    }
                  )
              }
            )
          )
        );
      }},
    ],
    dataNodeList:[
      {
        category: 'Table_HeaderTop',
        columnDefinitions_: [
          { attr: 'name',   text: 'Name',   column: 0 },
          { attr: 'age',    text: 'Age',    column: 1 },
          { attr: 'mobile', text: "Mobile", column: 2 },
        ],
        table_: [
          { row_: [
            { attr: "name", text: "Alice" },
            { attr: 'age', text: "5" },
            { attr: 'mobile', text: "+49.177.052345" },
          ]},
          { row_: [
            { attr: "name", text: "Bob" }, 
            { attr: 'age', text: "10" },
            { attr: 'mobile', text: "+39.176.059876" },
          ]},
          { row_: [
            { attr: "name", text: "Carol" },
            { attr: 'age', text: "15" },
            { attr: 'mobile', text: "+29.175.051111" },
          ]},
          { row_: [
            { attr: "name", text: "Ted" },
            { attr: 'age', text: "20" },
            { attr: 'mobile', text: "+19.174.052222" },
          ]},
        ]
      },
      {
        category: 'Table_HeaderTop',
        columnDefinitions_: [
          { attr: "su", text: "Su", column: 0 },
          { attr: "mo", text: "Mo", column: 1 },
          { attr: "tu", text: "Tu", column: 2 },
          { attr: "we", text: "We", column: 3 },
          { attr: "th", text: "Th", column: 4 },
          { attr: "fr", text: "Fr", column: 5 },
          { attr: "sa", text: "Sa", column: 6 },
        ],
        table_: [
          { row_: [
            { attr: "su", text: "" },
            { attr: "mo", text: "" },
            { attr: "tu", text: "" },
            { attr: "we", text: "1" },
            { attr: "th", text: "2" },
            { attr: "fr", text: "3" },
            { attr: "sa", text: "4" },
          ]},
          { row_: [
            { attr: "su", text: "5" },
            { attr: "mo", text: "6" },
            { attr: "tu", text: "7" },
            { attr: "we", text: "8" },
            { attr: "th", text: "9" },
            { attr: "fr", text: "10" },
            { attr: "sa", text: "11" },
          ]},
          { row_: [
            { attr: "su", text: "12" },
            { attr: "mo", text: "13" },
            { attr: "tu", text: "14" },
            { attr: "we", text: "15" },
            { attr: "th", text: "16" },
            { attr: "fr", text: "17" },
            { attr: "sa", text: "18" },
          ]},
          { row_: [
            { attr: "su", text: "19" },
            { attr: "mo", text: "20" },
            { attr: "tu", text: "21" },
            { attr: "we", text: "22" },
            { attr: "th", text: "23" },
            { attr: "fr", text: "24" },
            { attr: "sa", text: "25" },
          ]},
          { row_: [
            { attr: "su", text: "26" },
            { attr: "mo", text: "27" },
            { attr: "tu", text: "28" },
            { attr: "we", text: "29" },
            { attr: "th", text: "30" },
            { attr: "fr", text: "31" },
            { attr: "sa", text: "" },
          ]},
        ]
      }
    ],
    templateLinkList:[],
    dataLinkList:[],
  };
  return( dsl );
}

/****************************
 * TableDSL access functions
 ****************************/

function TableDSL_setCell( row, col, value, nodeData ) {
  const g = getMainGraph();
  const diagram = g.diagram;
  nodeData = TableDSL_getTableData( nodeData );

  if( nodeData ) {
    const table = nodeData.table_;
    if( table && ( row < table.length ) ) {
      const tableRow = table[row];
      const cols = tableRow.row_;
      if( cols && ( col < cols.length ) ) {
        cols[col].text = value;
  
        diagram.startTransaction( "setIntoTable" );
        diagram.model.removeArrayItem( nodeData.table_, row );
        diagram.model.insertArrayItem( nodeData.table_, row, tableRow );
        diagram.commitTransaction( "setIntoTable" );
      }
    }
  }
}
function TableDSL_getCell( row, col, nodeData ) {
  let result = null;
  const g = getMainGraph();
  const diagram = g.diagram;
  nodeData = TableDSL_getTableData( nodeData );
  
  if( nodeData ) {
    const table = nodeData.table_;
    if( table && ( row < table.length ) ) {
      const tableRow = table[row];
      const cols = tableRow.row_;
      if( cols && ( col < cols.length ) ) {
        result = cols[col].text;
      }
    }
  }
  return( result );
}
function TableDSL_setRow( row, colsText, nodeData ) {
  const g = getMainGraph();
  const diagram = g.diagram;
  nodeData = TableDSL_getTableData( nodeData );

  if( nodeData ) {
    const table = nodeData.table_;
    if( table && ( row < table.length ) ) {
      const tableRow = table[row];
      const cols = tableRow.row_;
      for( let col = 0; col < cols.length; ++col ) {
        if( colsText[col] != undefined ) {
          cols[col].text = colsText[col];
        }
      }
      diagram.model.removeArrayItem( nodeData.table_, row );
      diagram.model.insertArrayItem( nodeData.table_, row, tableRow );
    }
  }
}
function TableDSL_getRow( row, nodeData ) {
  const result = [];
  const g = getMainGraph();
  const diagram = g.diagram;
  nodeData = TableDSL_getTableData( nodeData );

  if( nodeData ) {
    const table = nodeData.table_;
    if( table && ( row < table.length ) ) {
      const tableRow = table[row];
      const cols = tableRow.row_;
      for( let col = 0; col < cols.length; ++col ) {
        result[col] = cols[col].text;
      }
    }
  }
  return( result );
}
function TableDSL_getRowCount( nodeData ) {
  let result = 0;
  const g = getMainGraph();
  const diagram = g.diagram;
  nodeData = TableDSL_getTableData( nodeData );

  if( nodeData ) {
    const table = nodeData.table_;
    if( table ) {
      result = table.length;
    }
  }
  return( result );
}
function TableDSL_getColCount( nodeData ) {
  let result = 0;
  const g = getMainGraph();
  const diagram = g.diagram;
  nodeData = TableDSL_getTableData( nodeData );

  const colDef = nodeData.columnDefinitions_;
  if( colDef ) {
    result = colDef.length;
  }
  return( result );
}
function TableDSL_getTableData( nodeData ) {
  if( nodeData == undefined ) {
    // If nodeData is not defined, get first selected node
    const node = diagram.selection.first();
    if( node != null ) {
      nodeData = node.data;
    }
  } else {
    // Get original GoJS data with GoJS references
    // necessary for usage of removeArrayItem/insertArrayItem
    nodeData = getNodeData( nodeData.key );
  }

  return( nodeData );
}