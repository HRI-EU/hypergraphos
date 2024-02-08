/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: Authentication Tools
Date: 10.07.2020
=============================================================================
*/

const User = require( '../models/user' );
const express = require( 'express' );
const router = express.Router();
const bcrypt = require( 'bcrypt' );
const db = require( '../utils/database.js' )
const jwt = require( 'jsonwebtoken' );
const config = require( '../Running_config' );

// User login
router.post( '/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    var sql = 'select * from user where email = ?';

    let user;
    db.get( sql, email, (err, row)=> {
      if( !err ) {
        if( !row ) {
          return res.status(401).json({ error: 'Authentication failed' });
        }
        user = new User( row.name, row.email, row.password );

        bcrypt.compare( password, user.password ).then( result => {
          if( !result ) {
            return( res.status(401).json({ error: 'Authentication failed' }) );
          }
          const token = jwt.sign( { userId: row.id }, 
                                  config.server.jwtSecretKey, 
                                  { expiresIn: '30m' } );
          res.cookie( 'access-token', token, {
            maxAge: 60 * 60 * 24 * 30 * 1000, //30 days
            secure: false,
            httpOnly: true
          }).status(200).json({ token });
      })
      // const passwordMatch = await bcrypt.compare(password, user.password);
    }
  });
  } catch( error ) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// User registration
router.post( '/register', async (req, res)=> {
  try {
    const { name, password, email } = req.body;
    const hashedPassword = await bcrypt.hash( password, 10 );
    const user = new User( name, email, hashedPassword );

    var errors = []
    if( !user.password ) {
      errors.push( 'No password specified' );
    }
    if( !user.email ) {
      errors.push( 'No email specified' );
    }
    if( !user.name ) {
      errors.push( 'No name specified' );
    }
    if( errors.length ) {
      res.status(400).json({ 'error': errors.join( ',' ) });
      return;
    }
    const insertSql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
    const selectSql = 'select * from user where email = ?';
    var params = [ user.name, user.email, user.password ];

    db.get( selectSql, user.email, (err, row)=> {
      if( !err ) {
        if( row ) {
          return( res.status(400).json({ error: 'User already exists!' }) );
        }
        db.run( insertSql, params, function(err, result) {
          if( err ) {
            res.status(400).json({ 'error': err.message });
            return;
          }
          res.status(201).json({
            'message': 'success',
            // "data": data,
            'id': this.lastID,
          });
        });
      }
    });
    // res.status(201).json({ message: 'User registered successfully' });
  } catch( error ) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

//User logout
router.get( '/logout', async (req, res)=> {
  try {
    res.clearCookie( 'access-token' ).status(204).end();
  } catch( error ) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;