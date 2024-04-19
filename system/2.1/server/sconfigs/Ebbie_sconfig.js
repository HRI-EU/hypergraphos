function userSetup( config ) {
  if( config.host.username == "iebubech" ) {
    config.server.dataRoot = '../../../../../../Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../Dropbox/DevAll/MDDToolsTempRoot';
    config.client.host.name = 'Ebbie';
    config.client.host.statusURL = '/fileServer/Users/Ebbie_status.json';
    config.client.graph.allowDeleteKey = false;
  }
}
module.exports = userSetup;