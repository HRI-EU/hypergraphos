/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

function userSetup( config ) {
  if( ( config.host.hostname == 'Main-PC' ) &&
            ( config.host.username == 'Frank Joublin' ) ) {
            // C:\Users\frank\Dropbox\DevAll\MDDToolsDataRoot
    config.isDebugOn = true;
    config.server.dataRoot = '../../../../../../Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../Dropbox/DevAll/MDDToolsTempRoot';
    config.client.host.name = 'Frank';
    config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
    config.client.graph.allowDeleteKey = false;
    // List of remote host
    config.client.remoteHost['NUC'] = '192.168.178.25:7575';
  } else if( config.host.hostname == 'hyper-graph' ) {
    // config.client.host.name = 'hyper-graph';
    // config.client.host.statusURL = '/fileServer/Users/hyper-graph_status.json';
    config.isDebugOn = true;
    config.client.host.name = 'Frank';
    config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
    config.client.graph.allowDeleteKey = true;
    // config.server.dataRoot = '../../fileSystem/MDDToolsDataRoot';
    // config.server.tempRoot = '../../fileSystem/MDDToolsTempRoot';
    config.server.dataRoot = '../../../../DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../DevAll/MDDToolsTempRoot';
  } else if( config.host.username == "RE900106" ) {
    config.isDebugOn = true;
    config.server.dataRoot = '../../../../../../Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../Dropbox/DevAll/MDDToolsTempRoot';
    config.client.host.name = 'Frank';
    config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
    config.client.graph.allowDeleteKey = false;
  } else if( config.host.username == "HGMigration" ) {
    config.isDebugOn = true;
    config.server.dataRoot = '../../../../../../DevAll//MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../DevAll//MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../DevAll//MDDToolsTempRoot';
    config.client.host.name = 'Frank';
    config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
    config.client.graph.allowDeleteKey = true;
  }
}
module.exports = userSetup;