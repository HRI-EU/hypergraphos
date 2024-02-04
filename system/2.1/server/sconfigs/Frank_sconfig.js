function userSetup( config ) {
  if( ( config.host.hostname == 'Main-PC' ) &&
            ( config.host.username == 'Frank Joublin' ) ) {
            // C:\Users\frank\Dropbox\DevAll\MDDToolsDataRoot
    config.server.dataRoot = '../../../../../../Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../Dropbox/DevAll/MDDToolsTempRoot';
    config.client.host.name = 'Frank';
    config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
    config.client.graph.allowDeleteKey = false;
    config.client.graph.isDoubleClickCreateNodeEnabled = false;
    // List of remote host
    config.client.remoteHost['NUC'] = '192.168.178.25:7575';
  } else if( config.host.hostname == 'hyper-graph' ) {
    // config.client.host.name = 'hyper-graph';
    // config.client.host.statusURL = '/fileServer/Users/hyper-graph_status.json';
    config.client.host.name = 'Frank';
    config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
    config.client.graph.allowDeleteKey = true;
    config.client.graph.isDoubleClickCreateNodeEnabled = false;
    // config.server.dataRoot = '../../fileSystem/MDDToolsDataRoot';
    // config.server.tempRoot = '../../fileSystem/MDDToolsTempRoot';
    config.server.dataRoot = '../../../../DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../DevAll/MDDToolsTempRoot';
  } else if( config.host.username == "RE900106" ) {
    config.server.dataRoot = '../../../../../../Dropbox/DevAll/MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../Dropbox/DevAll/MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../Dropbox/DevAll/MDDToolsTempRoot';
    config.client.host.name = 'Frank';
    config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
    config.client.graph.allowDeleteKey = false;
    config.client.graph.isDoubleClickCreateNodeEnabled = false;
  } else if( config.host.username == "HGMigration" ) {
    config.server.dataRoot = '../../../../../../DevAll//MDDToolsDataRoot';
    config.server.deployRoot = '../../../../../../DevAll//MDDToolsDeployRoot';
    config.server.tempRoot = '../../../../../../DevAll//MDDToolsTempRoot';
    config.client.host.name = 'Frank';
    config.client.host.statusURL = '/fileServer/Users/Frank_status.json';
    config.client.graph.allowDeleteKey = true;
    config.client.graph.isDoubleClickCreateNodeEnabled = false;
  }
}
module.exports = userSetup;