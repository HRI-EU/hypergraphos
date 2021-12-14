/*
=============================================================================
Licensed Materials - Property of LorinWare Prod.
(C) Copyright Christophe LORIN 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Christophe LORIN.
=============================================================================
Module: MDDTools Configuration File
Date: 10.07.2020
=============================================================================
*/

// URL of root graph
const rootGraphURL = '/fileServer/graphRoot.json';
// System configuration
const config = {
  // Client Configuration Info
  client: {
    host: {
      name: 'Anto01',
      fileServerURL: '/fileServer',
      statusURL: '/fileServer/status.json',
    },
    remoteHost: {},
    htmlDiv: {
      mainDiv: 'mainDiv',
      graphDiv: 'diagram',
      paletteDiv: 'palette',
      nodePaletteDiv: 'nodePalette',
      groupPaletteDiv: 'groupPalette',
      linkPaletteDiv: 'linkPalette',
    },
    graph: {
      isDoubleClickCreateNodeEnabled: true,
      allowDeleteKey: false,
      colorSkema: 'light',
      defaultDSL: 'DefaultDSL',
      rootGraphURL: rootGraphURL,
      rootGraphNodeData: {
        'key': 'Root Graph',
        'isDir': true,
        'fileURL': rootGraphURL,
        'fileType': 'text/json',
      },
      maxHistoryLength: 30,
    }
  },
  // Server Configuration Info
  server: {
    // Path relative to the server.js script location
    debugOnFileContentOn: true,
    dataRoot:          '../../MDDToolsDataRoot',
    tempRoot:          '../../MDDToolsTempRoot',
    clientPath:        '../client',
    libPath:           '../../lib',
    scriptPath:        '../script',
    testPath:          '../test', 
    webServerProtocol: 'http',
    webServerName:     'localhost',
    webServerPort:     7575,
    webSocketURL:      '', // Defined later...
    ssl: {
      enabled: false,
      key: 'server.key',
      cert: 'server.cert',
    },
  },
  // Host Info
  host: {
    /* Example:
    "uid":      501,
    "gid":      20,
    "username": "antonelloceravola",
    "homedir":  "/Users/antonelloceravola",
    "shell":    "/bin/zsh",
    "hostname": "Antonellos-Mini",
    */
  },
};

// Get Host Info
const os = require('os');
config.host = os.userInfo();
config.host['hostname'] = os.hostname();

// Definition of dynamic values
config.server.webSocketURL = `ws://${config.server.webServerName}`;

// User Configuration
if( config.host.hostname == 'Antonellos-Mac-mini.local' ) {
  config.server.dataRoot = '../../../../../../Dropbox/DevAll/MDDToolsDataRoot';
  config.server.tempRoot = '../../../../../../Dropbox/DevAll/MDDToolsTempRoot';
  config.client.host.name = 'Antonello';
  config.client.graph.colorSkema = 'dark';
  config.client.host.statusURL = '/fileServer/Antonello_status.json';
  // List of remote host
  config.client.remoteHost['NUC'] = '192.168.1.11:7575';

} else if( ( config.host.hostname == 'Main-PC' ) && 
           ( config.host.username == 'Frank Joublin' ) ) {
           // C:\Users\frank\Dropbox\DevAll\MDDToolsDataRoot
  config.server.dataRoot = '../../../../../Dropbox/DevAll/MDDToolsDataRoot';
  config.server.tempRoot = '../../../../../Dropbox/DevAll/MDDToolsTempRoot';
  config.client.host.name = 'Frank';
  config.client.host.statusURL = '/fileServer/Frank_status.json';
  config.client.graph.allowDeleteKey = true;
  config.client.graph.isDoubleClickCreateNodeEnabled = false;
  // List of remote host
  config.client.remoteHost['NUC'] = '192.168.178.25:7575';
} else if( ( config.host.hostname == 'QuadCore' ) && 
            ( config.host.username == 'Christophe' ) ) {
  config.client.host.name = 'Christophe';
  config.client.host.statusURL = '/fileServer/Christophe_status.json';
  config.client.graph.allowDeleteKey = true;
  config.client.graph.isDoubleClickCreateNodeEnabled = false;
  // List of remote host
  config.client.remoteHost['NUC'] = '192.168.0.25:7575';
} else if( ( config.host.hostname == 'work-manjaro' ) &&
            ( config.host.username == 'chris' ) ) {
  config.server.dataRoot = '../../../MDDToolsData/MDDToolsDataRoot';
  config.server.tempRoot = '../../../MDDToolsData/MDDToolsTempRoot';
  config.client.host.name = 'Cristian';
  config.client.host.statusURL = '/fileServer/Cristian_status.json';
  config.client.graph.allowDeleteKey = true;
  config.client.graph.isDoubleClickCreateNodeEnabled = false;
  // List of remote host
  //config.client.remoteHost['NUC'] = '192.168.0.25:7575';
}


module.exports = config;
