function userSetup( config ) {
  if( config.host.username == "982979" ) {
    config.server.dataRoot = '../../../../../../Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../Dropbox/DevAll/MDDToolsTempRoot';
    config.client.host.name = 'Johane';
    config.client.graph.colorSchema = 'dark';
    config.client.host.statusURL = '/fileServer/Users/Johane_status.json';
    config.client.graph.allowDeleteKey = false;
    config.client.graph.isDoubleClickCreateNodeEnabled = false;
  }
}
module.exports = userSetup;