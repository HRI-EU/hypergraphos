/* 
  NOTE: this config is used only when HyperGraph is loaded
  in localMode, by opening in the browser: file:///indexLocal.html
*/
const config = {
  "isLocalMode": true,
  "host": {
    "name": "UserLocalSMILE",
    "fileServerURL": "../../localFileServer",
    "fileServerSystemURL": "../../localFileServer/System",
    "fileStatusURL": "/fileStatus",
    "statusURL": "../../localFileServer/Users/User_status.json",
    "libraryURL": "lib/"
  },
  "remoteHost": {
    "NUC": "192.168.1.11:7575"
  },
  "htmlDiv": {
    "mainDiv": "mainDiv",
    "graphDiv": "diagram",
    "paletteDiv": "palette",
    "nodePaletteDiv": "nodePalette",
    "groupPaletteDiv": "groupPalette",
    "linkPaletteDiv": "linkPalette"
  },
  "graph": {
    "isDoubleClickCreateNodeEnabled": true,
    "allowDeleteKey": false,
    "colorSchema": "dark",
    "zoomFactor": 1.05,
    "defaultDSL": "DefaultDSL",
    "rootGraphURL": "noURL",
    "rootGraphNodeData": {
      "key": "Current Graph",
      "isDir": true,
      "fileURL": "noURL",
      "fileType": "text/json"
    },
    "maxHistoryLength": 30
  },
  "server": {
    "ip": "192.168.1.11"
  }
};

function setLocalStatus() {
  m.status.graphHistory = [
    {
      key: 'Current Graph',
      isDir: true,
      fileURL: 'noURL',
      fileType: 'text/json',
    }
  ];
  m.status.openWindowList = {};
  m.status.pinnedWindow = {};
  m.status.isReadOnly = true;
}

function setLocalDSL() {
  m.dslNameList = 
///////////////////////////
  {
    "HierarchyDSL": "/fileServer/DSL/HierarchyDSL.js",
    "TextLabelsDSL": "/fileServer/DSL/TextLabelsDSL.js",
  }
///////////////////////////  
  ;
}


function getCurrentLocalGraph() {
  return(
///////////////////////////
{
  "dslNameList": [
    "DefaultDSL",
    "HierarchyDSL",
    "TextLabelsDSL",
    "PicturesDSL"
  ],
  "view": {
    "scale": 0.7561871931774311,
    "position": [
      -2973.442627142084,
      -4929.754896594657
    ],
    "isGridOn": false
  },
  "graphFileServer": [],
  "model": "{ \"class\": \"GraphLinksModel\",\n  \"copiesArrays\": true,\n  \"copiesArrayObjects\": true,\n  \"copiesKey\": false,\n  \"linkKeyProperty\": \"key\",\n  \"linkFromPortIdProperty\": \"fromPort\",\n  \"linkToPortIdProperty\": \"toPort\",\n  \"nodeDataArray\": [\n{\"label\":\"Welcome To HyperGraph\",\"category\":\"TextLabels_Size6\",\"alignment\":\"0 0.5 0 0\",\"alignmentFocus\":\"0 0.5 0 0\",\"size\":\"3054 240\",\"key\":0,\"location\":\"-2270 -4360\"},\n{\"label\":\"Graph Info\",\"category\":\"Hierarchy_GraphInfo\",\"size\":\"231 82\",\"props_\":[{\"name\":\"Name\",\"value\":\"Example Local Graph\"},{\"name\":\"Version\",\"value\":\"1.0\"},{\"name\":\"Date\",\"value\":\"03/12/2023\"},{\"name\":\"Path\",\"value\":\"/fileServer/02/31.json\"},{\"name\":\"Authors\",\"value\":\"Frankonello\"}],\"key\":2,\"location\":\"-2670 -4409\"},\n{\"label\":\"This is your home graph\",\"category\":\"TextLabels_Size4\",\"alignment\":\"0 0.5 0 0\",\"alignmentFocus\":\"0 0.5 0 0\",\"size\":\"1042 30\",\"key\":3,\"location\":\"-2030 -4030\"},\n{\"label\":\"You can start creating new graph from here...\\nHave fun :-)\",\"category\":\"TextLabels_Size2\",\"alignment\":\"0 0.5 0 0\",\"alignmentFocus\":\"0 0.5 0 0\",\"size\":\"888 100\",\"key\":4,\"location\":\"-2150 -3840\"}\n],\n  \"linkDataArray\": []}"
}
///////////////////////////
);
}
