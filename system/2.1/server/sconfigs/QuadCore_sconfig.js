const userConfigFunction = require( './Christophe_sconfig.js' );

const defaultUserConfigFunction = ( config )=> {
  if( userConfigFunction ) {
    userConfigFunction( config );
  }
}

module.exports = defaultUserConfigFunction;