/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

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