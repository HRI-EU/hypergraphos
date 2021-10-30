/*
   DSL for projects definition with:
    - Project, module, library, ...
*/
function HierarchyDSL_includeList() {
  return(['/fileServer/DSLInclude.js']);
}
function HierarchyDSL_getDSL( g ) {


  //-----------------------
  // Define event handler
  //-----------------------

  
  //-----------------------
  // Define palette
  //-----------------------

  const dsl = {
    templateNodeList: [
      { category: 'Hierarchy_Folder',         template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,60), figure: "Folder",     fill: "mediumaquamarine", textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Hierarchy_Project',        template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,60), figure: "Project",    fill: "mediumaquamarine", textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Hierarchy_DataInFile',     template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,40), figure: "File",       fill: "lightseagreen",    textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Hierarchy_DataInGraph',    template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,40), figure: "FileCircle", fill: "lightseagreen",    textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
      { category: 'Hierarchy_CodeInFile',     template: dsl_BasicNode, param: {hasTag: false,  hasType:true,    type: '@fileTypeName', editableType: false, minSize: new go.Size(150,40),   figure: "File",       fill: "lightseagreen",    textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black", typeMenu: fileTypeMenuTemplate} },
      { category: 'Hierarchy_CodeInGraph',    template: dsl_BasicNode, param: {hasTag: false,  hasType:true,    type: '@fileTypeName', editableType: false, minSize: new go.Size(150,40),   figure: "FileCircle", fill: "lightseagreen",    textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black", typeMenu: fileTypeMenuTemplate} },
      { category: 'Hierarchy_Model',          template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,60), figure: "Project",    fill: "PaleGoldenrod",    textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black", editable: false} },
      { category: 'Hierarchy_Selection',      template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,60), figure: "Project",    fill: "Lavender",         textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black", editable: false} },
      { category: 'Hierarchy_DSL',            template: dsl_BasicNode, param: {hasTag: false,  hasType:false,   minSize: new go.Size(150,60), figure: "File",       fill: "Plum",             textAlign: "center",  fromLinkable: true,  toLinkable: true, labelStroke: "black"} },
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
        label: 'Folder',
        size: '180 60',
		'fileType': 'text/json',
        category: 'Hierarchy_Folder',
        'isDir': true,
        'fileURL': '',
      },
      {
        label: 'Project',
        size: '180 60',
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
  };

  return( dsl );
}