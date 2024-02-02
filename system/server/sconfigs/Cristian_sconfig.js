function userSetup( config ) {
  if( config.host.username == 'cristian' ) {
    config.server.dataRoot = '../../../../../Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../Dropbox/DevAll/MDDToolsTempRoot';
    config.server.webServerPort = 8080;
    config.client.host.name = 'Cristian';
    config.client.host.statusURL = '/fileServer/Users/Cristian_status.json';
    config.client.graph.allowDeleteKey = true;
    config.client.graph.isDoubleClickCreateNodeEnabled = false;
  }
}
module.exports = userSetup;