function userSetup( config ) {
  if( config.host.username == "RE900575" ) {
    config.server.dataRoot = '../../../../../../Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../Dropbox/DevAll/MDDToolsTempRoot';
    config.client.host.name = 'Bram';
    config.client.host.statusURL = '/fileServer/Users/Bram_status.json';
    config.client.graph.allowDeleteKey = false;
  }
}
module.exports = userSetup;