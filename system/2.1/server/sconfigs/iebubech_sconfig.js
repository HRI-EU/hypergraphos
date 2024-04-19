const userConfigFunction = require( './Ebbie_sconfig.js' );

const defaultUserConfigFunction = ( config )=> {
  if( userConfigFunction ) {
    userConfigFunction( config );
  }
}

module.exports = defaultUserConfigFunction;