let config = {};

// Get Host Info
const os = require('os');
config.host = os.userInfo();
config.host['hostname'] = os.hostname();
config.host['platform'] = os.platform();
switch( config.host['platform'] ) {
  case 'darwin':
    config.host['platformOS'] = 'MacOS';
    config.host['platformType'] = 'linux';
    break;
  case 'linux':
    config.host['platformOS'] = 'Linux';
    config.host['platformType'] = 'linux';
    break;
  case 'win32':
  case 'win64':
    config.host['platformOS'] = 'Windows';
    config.host['platformType'] = 'windows';
    break;
}

console.log( JSON.stringify( config, null, 2 ) );