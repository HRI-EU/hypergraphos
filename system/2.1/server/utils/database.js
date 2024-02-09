/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: Database Management
Date: 10.07.2020
=============================================================================
*/

const sqlite3 = require( 'sqlite3' ).verbose();
const bcrypt = require( 'bcrypt' );

const DBSOURCE = 'HGUsers.db';

let db = new sqlite3.Database( DBSOURCE, (err)=> {
  if( err ) {
    // Cannot open database
    console.error( err.message );
    throw err;
  } else {
    console.log( 'Connected to the SQLite database.' );
    db.run(
      `CREATE TABLE user (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name text, 
       email text UNIQUE, 
       password text, 
       CONSTRAINT email_unique UNIQUE (email) )`,
      (err)=> {
        if (err) {
          // Table already created
        } 
        // else {
        //     // Table just created, creating some rows
        //     var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
        //     bcrypt.hash("user123456", 10).then(res => {
        //         db.run(insert, ["user", "user@example.com", res])
        //     })

        // }
      }
    );
  }
});

module.exports = db;