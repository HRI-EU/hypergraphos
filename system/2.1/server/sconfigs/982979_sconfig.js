const userConfigFunction = require( './Johane_sconfig.js' );

const defaultUserConfigFunction = ( config )=> {
  if( userConfigFunction ) {
    userConfigFunction( config );
  }
}

module.exports = defaultUserConfigFunction;