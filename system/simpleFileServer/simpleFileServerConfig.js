/*
=============================================================================
Licensed Materials - Property of LorinWare Prod.
(C) Copyright Christophe LORIN 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Christophe LORIN.
=============================================================================
Module: MDDTools Simple File Server Configuration File
Date: 10.07.2020
=============================================================================
*/

// System configuration
const config = {
  // Server Configuration Info
  server: {
    debugOnFileContentOn: true,
    dataRoot:          './Data',
    tempRoot:          './Data',
    webServerProtocol: 'http',
    webServerName:     'localhost',
    webServerPort:     8585,
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
    "username": "userNameValue",
    "homedir":  "/Users/userNameValue",
    "shell":    "/bin/zsh",
    "hostname": "NameOfHost",
    */
  },
};

// Get Host Info
const os = require('os');
config.host = os.userInfo();
config.host['hostname'] = os.hostname();

// User Configuration
if( config.host.hostname == 'User1' ) {
  //config.server.dataRoot = ...;
} else if( config.host.hostname == 'Host2' ) {
  //config.server.key... = ...;
}

module.exports = config;