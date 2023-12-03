/* 
  NOTE: this config is used only when HyperGraph is loaded
  in localMode, by opening in the browser: file:///indexLocal.html
*/
const config = {
  "isLocalMode": true,
  "host": {
    "name": "User",
    "fileServerURL": "./localFileServer",
    "fileServerSystemURL": "./localFileServer/System",
    "fileStatusURL": "/fileStatus",
    "statusURL": "./localFileServer/Users/User_status.json"
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
    "rootGraphURL": "../../localFileServer/graphRoot.json",
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
    "DefaultDSL": "/fileServer/DSL/DefaultDSL.js",
    "HierarchyDSL": "/fileServer/DSL/HierarchyDSL.js",
    "ThinkingDSL": "/fileServer/DSL/ThinkingDSL.js",
    "TextLabelsDSL": "/fileServer/DSL/TextLabelsDSL.js",
    "PropertyDSL": "/fileServer/DSL/PropertyDSL.js",
    "CodeFlowDSL": "/fileServer/DSL/CodeFlowDSL.js",
    "DialogDSL": "/fileServer/DSL/DialogDSL.js",
    "TestFlowDSL": "/fileServer/DSL/TestFlowDSL.js",
    "ConnectorsDSL": "/fileServer/DSL/ConnectorsDSL.js",
    "ButtonDSL": "/fileServer/DSL/ButtonDSL.js",
    "PicturesDSL": "/fileServer/DSL/PicturesDSL.js",
    "NoteDSL": "/fileServer/DSL/NoteDSL.js",
    "TreeDSL": "/fileServer/DSL/TreeDSL.js",
    "KanbanDSL": "/fileServer/DSL/KanbanDSL.js",
    "DSLConfigDSL": "/fileServer/DSL/DSLConfigDSL.js",
    "DataFlowDSL": "/fileServer/DSL/DataFlowDSL.js"
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
    "scale": 0.6221170752329994,
    "position": [
      -4048.83598230119,
      -5315.038136414172
    ],
    "isGridOn": false
  },
  "graphFileServer": [],
  "model": "{ \"class\": \"GraphLinksModel\",\n  \"copiesArrays\": true,\n  \"copiesArrayObjects\": true,\n  \"copiesKey\": false,\n  \"linkKeyProperty\": \"key\",\n  \"linkFromPortIdProperty\": \"fromPort\",\n  \"linkToPortIdProperty\": \"toPort\",\n  \"nodeDataArray\": [\n{\"label\":\"Welcome To HyperGraph\",\"category\":\"TextLabels_Size6\",\"alignment\":\"0 0.5 0 0\",\"alignmentFocus\":\"0 0.5 0 0\",\"size\":\"3054 240\",\"key\":0,\"location\":\"-2280 -4360\"},\n{\"label\":\"Graph Info\",\"category\":\"Hierarchy_GraphInfo\",\"size\":\"180 80\",\"props_\":[{\"name\":\"Name\",\"value\":\"use: label@key\"},{\"name\":\"Version\",\"value\":\"1.0\"},{\"name\":\"Date\",\"value\":\"date@system\"},{\"name\":\"Path\",\"value\":\"graphPath@system\"},{\"name\":\"Authors\",\"value\":\"Frankonello\"}],\"key\":2,\"location\":\"-2670 -4410\"}\n],\n  \"linkDataArray\": []}"
}
///////////////////////////
);
}
