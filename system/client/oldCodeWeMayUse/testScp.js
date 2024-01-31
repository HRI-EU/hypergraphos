//let scpc = require( 'scp2' );

const destination = {
  host: '192.168.1.11', // Antonello NUC
  username: 'avatar',
  password: 'avatar',
  path: '/home/avatar/'
};
//scpc.scp( './testServer.js', destination, (err)=> console.log( 'ERROR: '+err ) );

const execSync = require( 'child_process' ).execSync;
const output = execSync( 'scp ./testServer.js avatar:avatar@192.168.1.11:/home/avatar/',
                         { encoding: 'utf-8' } );
console.log( 'OUTPUT------------' );
console.log( output );
console.log( 'OUTPUT------------' );