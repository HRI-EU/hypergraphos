/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/* 
  NOTE: this config is auto generated by server process
  DO NOT MODIFY THIS FILE
*/
const config = {
  "host": {
    "name": "Cristian",
    "fileServerURL": "/fileServer",
    "fileServerSystemURL": "/fileServer/System",
    "fileStatusURL": "/fileStatus",
    "statusURL": "/fileServer/Users/Cristian_status.json"
  },
  "remoteHost": {},
  "htmlDiv": {
    "mainDiv": "mainDiv",
    "graphDiv": "diagram",
    "paletteDiv": "palette",
    "nodePaletteDiv": "nodePalette",
    "groupPaletteDiv": "groupPalette",
    "linkPaletteDiv": "linkPalette"
  },
  "graph": {
    "allowDeleteKey": true,
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
    "ip": "192.168.0.23"
  }
};