/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

function userSetup( config ) {
  // if( config.host.username == "MyUserName" ) {
  //   config.server.dataRoot = '../../../../../../DevAll/MDDToolsDataRoot';
  //   config.server.deployRoot = '../../../../../../DevAll/MDDToolsDeployRoot';
  //   config.server.tempRoot = '../../../../../../DevAll/MDDToolsTempRoot';
  //   config.client.host.name = 'MyUserName';
  //   config.client.graph.colorSchema = 'dark';
  //   config.client.host.statusURL = '/fileServer/Users/MyUserName_status.json';
  //   config.client.graph.allowDeleteKey = false;
  // }
  config.server.dataRoot = '../../../localFileServer/MDDToolsDataRoot';
  config.server.deployRoot = '../../../localFileServer/MDDToolsDeployRoot';
  config.server.tempRoot = '../../../localFileServer/MDDToolsTempRoot';
  config.client.host.name = 'NoHostName';
  config.client.graph.colorSchema = 'light';
  config.client.host.statusURL = '/fileServer/Users/NoName_status.json';
  config.client.graph.allowDeleteKey = false;
}
module.exports = userSetup;