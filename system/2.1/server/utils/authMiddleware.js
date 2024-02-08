/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: Authentication Middleware
Date: 10.07.2020
=============================================================================
*/

const jwt = require( 'jsonwebtoken' );
const config = require( '../Running_config' );

function verifyToken(req, res, next) {
  const token = req.header( 'Cookie' )?.substr( req.header( 'Cookie' ).indexOf( '=' )+1 );
  if ( !token ) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify( token, config.server.jwtSecretKey );
    req.userId = decoded.userId;
    next();
  } catch( error ) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;
