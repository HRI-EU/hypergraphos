/* 
  NOTE: this config is auto generated by server process
  DO NOT MODIFY THIS FILE
*/
const config = {
  "host": {
    "name": "Frank",
    "fileServerURL": "/fileServer",
    "fileServerSystemURL": "/fileServer/System",
    "fileStatusURL": "/fileStatus",
    "statusURL": "/fileServer/Users/Frank_status.json",
    "messageURL": "/fileServer/Messages/"
  },
  "remoteHost": {
    "NUC": "192.168.178.25:7575"
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
    "allowDeleteKey": false,
    "colorSchema": "light",
    "zoomFactor": 1.25,
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
    "ip": "192.168.178.20"
  }
};