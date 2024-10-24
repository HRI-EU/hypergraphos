/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

function userSetup( config ) {
  // User Configuration
  if( ( config.host.hostname == 'Antonellos-Mini' ) ||
      ( config.host.hostname == 'Antonellos-Mac-mini.local' ) ) {
    config.isDebugOn = true;
    config.server.dataRoot = '../../../../../../Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../Dropbox/DevAll/MDDToolsTempRoot';
    config.client.host.name = 'Antonello';
    config.client.graph.colorSchema = 'dark';
    config.client.graph.zoomFactor = 1.05;
    config.server.scriptPlatform = 'linux';
    config.client.host.statusURL = '/fileServer/Users/Antonello_status.json';
    // List of remote host
    config.client.remoteHost['NUC'] = '192.168.1.11:7575';

  } else if( config.host.username == "RE900104" ) {
    config.isDebugOn = true;
    config.server.dataRoot = '../../../../../../../HyperGraph/Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../../HyperGraph/Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../../HyperGraph/Dropbox/DevAll/MDDToolsTempRoot';
    // config.server.dataRoot = '../../../../../../../HyperGraph/Dropbox/DevAll/MDDToolsDataRoot';
    // config.server.deployRoot = '../../../../../../../HyperGraph/Dropbox/DevAll/MDDToolsDeployRoot';
    // config.server.tempRoot = '../../../../../../../HyperGraph/Dropbox/DevAll/MDDToolsTempRoot';
    config.client.host.name = 'Antonello';
    config.client.graph.colorSchema = 'dark';
    config.client.host.statusURL = '/fileServer/Users/Antonello_status.json';
    config.client.graph.allowDeleteKey = false;
  }
}
module.exports = userSetup;