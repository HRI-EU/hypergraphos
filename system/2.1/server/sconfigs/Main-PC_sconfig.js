const userConfigFunction = require( './Frank_sconfig.js' );

const defaultUserConfigFunction = ( config )=> {
  if( userConfigFunction ) {
    userConfigFunction( config );
  }
}

module.exports = defaultUserConfigFunction;