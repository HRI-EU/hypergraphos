function userSetup( config ) {
  if( ( config.host.hostname == 'QuadCore' ) &&
              ( config.host.username == 'Christophe' ) ) {
    config.client.host.name = 'Christophe';
    config.client.host.statusURL = '/fileServer/Users/Christophe_status.json';
    config.client.graph.allowDeleteKey = true;
    config.client.graph.isDoubleClickCreateNodeEnabled = false;
    // List of remote host
    config.client.remoteHost['NUC'] = '192.168.0.25:7575';
  }
}
module.exports = userSetup;