function userSetup( config ) {
  // User Configuration
  if( config.host.username == "RE901875" ) {
    config.isDebugOn = true;
    config.server.dataRoot = '../../../../../../Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../Dropbox/DevAll/MDDToolsTempRoot';
    config.client.host.name = 'Ahmet';
    config.client.graph.colorSchema = 'dark';
    config.client.host.statusURL = '/fileServer/Users/Ahmed_status.json';
    config.client.graph.allowDeleteKey = false;
  }
}
module.exports = userSetup;