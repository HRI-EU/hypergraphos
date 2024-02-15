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
    config.server.dataRoot = '../../../../../../Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../Dropbox/DevAll/MDDToolsTempRoot';
    config.client.host.name = 'Antonello';
    config.client.graph.colorSchema = 'dark';
    config.client.host.statusURL = '/fileServer/Users/Antonello_status.json';
    config.client.graph.allowDeleteKey = false;
  }
}
module.exports = userSetup;