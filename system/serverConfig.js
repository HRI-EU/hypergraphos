/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
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
      name: 'NoName',
      fileServerURL: '/fileServer',
      fileServerSystemURL: '/fileServer/System',
      fileStatusURL: '/fileStatus',
      statusURL: '/fileServer/Users/NoName_status.json',
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
    deployRoot:        '../../MDDToolsDeployRoot',
    tempRoot:          '../../MDDToolsTempRoot',
    clientPath:        '../client',
    libPath:           '../../lib',
    scriptPath:        '../script',
    testPath:          '../test',
    scriptPlatform:    'win32',  // 'win32' | 'linux' ( not available 'winBash' | 'powershell'  )
    webServerProtocol: 'http',
    webServerName:     'localhost',
    webServerPort:     80,
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
config.host['platform'] = os.platform();
switch( config.host['platform'] ) {
  case 'darwin':
    config.host['platformOS'] = 'MacOS';
    config.host['platformType'] = 'linux';
    break;
  case 'linux':
    config.host['platformOS'] = 'Linux';
    config.host['platformType'] = 'linux';
    break;
  case 'win32':
  case 'win64':
    config.host['platformOS'] = 'Windows';
    config.host['platformType'] = 'windows';
    break;
}

// Execute virtual Environment
const fs = require( 'fs' );
if( fs.existsSync( '../virtualEnv.js' ) ) {
  virtualEnv = require( './virtualEnv.js' );
  virtualEnv( config );
}

// Definition of dynamic values
config.server.webSocketURL = `ws://${config.server.webServerName}`;

// User Configuration
if( ( config.host.hostname == 'Antonellos-Mini' ) ||
    ( config.host.hostname == 'Antonellos-Mac-mini.local' ) ) {
  config.server.dataRoot = '../../../../../Dropbox/DevAll/MDDToolsDataRoot';
  config.server.deployRoot = '../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
  config.server.tempRoot = '../../../../../Dropbox/DevAll/MDDToolsTempRoot';
  config.client.host.name = 'Antonello';
  config.client.graph.colorSkema = 'dark';
  config.server.scriptPlatform = 'linux';
  config.client.host.statusURL = '/fileServer/Users/Antonello_status.json';
  // List of remote host
  config.client.remoteHost['NUC'] = '192.168.1.11:7575';

} else if( ( config.host.hostname == 'Main-PC' ) && 
           ( config.host.username == 'Frank Joublin' ) ) {
           // C:\Users\frank\Dropbox\DevAll\MDDToolsDataRoot
  config.server.dataRoot = '../../../../../Dropbox/DevAll/MDDToolsDataRoot';
  config.server.deployRoot = '../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
  config.server.tempRoot = '../../../../../Dropbox/DevAll/MDDToolsTempRoot';
  config.client.host.name = 'Frank';
  config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
  config.client.graph.allowDeleteKey = false;
  config.client.graph.isDoubleClickCreateNodeEnabled = false;
  // List of remote host
  config.client.remoteHost['NUC'] = '192.168.178.25:7575';
} else if( ( config.host.hostname == 'QuadCore' ) && 
            ( config.host.username == 'Christophe' ) ) {
  config.client.host.name = 'Christophe';
  config.client.host.statusURL = '/fileServer/Users/Christophe_status.json';
  config.client.graph.allowDeleteKey = true;
  config.client.graph.isDoubleClickCreateNodeEnabled = false;
  // List of remote host
  config.client.remoteHost['NUC'] = '192.168.0.25:7575';
} else if( config.host.hostname == 'hyper-graph' ) {
  // config.client.host.name = 'hyper-graph';
  // config.client.host.statusURL = '/fileServer/Users/hyper-graph_status.json';
  config.client.host.name = 'Frank';
  config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
  config.client.graph.allowDeleteKey = true;
  config.client.graph.isDoubleClickCreateNodeEnabled = false;
  // config.server.dataRoot = '../../fileSystem/MDDToolsDataRoot';
  // config.server.tempRoot = '../../fileSystem/MDDToolsTempRoot';
  config.server.dataRoot = '../../../DevAll/MDDToolsDataRoot';
  config.server.deployRoot = '../../../DevAll/MDDToolsDeployRoot';
  config.server.tempRoot = '../../../DevAll/MDDToolsTempRoot';
} else if( config.host.username == "RE900106" ) {
  config.server.dataRoot = '../../../../../Dropbox/DevAll/MDDToolsDataRoot';
  config.server.deployRoot = '../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
  config.server.tempRoot = '../../../../../Dropbox/DevAll/MDDToolsTempRoot';
  config.client.host.name = 'Frank';
  config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
  config.client.graph.allowDeleteKey = true;
  config.client.graph.isDoubleClickCreateNodeEnabled = false;
} else if( config.host.username == "RE900104" ) {
  config.server.dataRoot = '../../../../../Dropbox/DevAll/MDDToolsDataRoot';
  config.server.deployRoot = '../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
  config.server.tempRoot = '../../../../../Dropbox/DevAll/MDDToolsTempRoot';
  config.client.host.name = 'Antonello';
  config.client.graph.colorSkema = 'dark';
  config.client.host.statusURL = '/fileServer/Users/Antonello_status.json';
  config.client.graph.allowDeleteKey = false;
  config.client.graph.isDoubleClickCreateNodeEnabled = false;
} else if( config.host.username == "HGMigration" ) {
  config.server.dataRoot = '../../../../../DevAll//MDDToolsDataRoot';
  config.server.deployRoot = '../../../../../DevAll//MDDToolsDeployRoot';
  config.server.tempRoot = '../../../../../DevAll//MDDToolsTempRoot';
  config.client.host.name = 'Frank';
  config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
  config.client.graph.allowDeleteKey = true;
  config.client.graph.isDoubleClickCreateNodeEnabled = false;
}
module.exports = config;
