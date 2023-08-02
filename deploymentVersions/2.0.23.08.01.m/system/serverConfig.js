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
      statusURL: '/fileServer/Users/User_status.json',
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
      zoomFactor: 1.25,
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
    dataRoot:          '../../fileServer/MDDToolsDataRoot',
    deployRoot:        '../../fileServer/MDDToolsDeployRoot',
    tempRoot:          '../../fileServer/MDDToolsTempRoot',
    clientPath:        '../client',
    libPath:           '../../lib',
    scriptPath:        '../script',
    testPath:          '../test',
    scriptPlatform:    'win32',  // 'win32' | 'linux' ( not available 'winBash' | 'powershell'  )
    webServerProtocol: 'http',
    webServerName:     'localhost',
    webServerPort:     8081,
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

module.exports = config;
