/* 
  NOTE: this config is auto generated by server process
  DO NOT MODIFY THIS FILE
*/
const config = {
  "host": {
    "name": "Antonello",
    "fileServerURL": "/fileServer",
    "statusURL": "/fileServer/Antonello_status.json"
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
    "colorSkema": "dark",
    "defaultDSL": "DefaultDSL",
    "rootGraphURL": "/fileServer/graphRoot.json",
    "rootGraphNodeData": {
      "key": "Root Graph",
      "isDir": true,
      "fileURL": "/fileServer/graphRoot.json",
      "fileType": "text/json"
    },
    "maxHistoryLength": 30
  },
  "server": {
    "ip": "192.168.1.14"
  }
};