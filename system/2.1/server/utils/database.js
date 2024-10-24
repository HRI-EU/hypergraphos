/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcrypt');

const DBSOURCE = "smile.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
            (err) => {
                if (err) {
                    console.log(err);
                }

            });

        db.run(`CREATE TABLE IF NOT EXISTS "file_permissions" (
	            "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
                "user_id"	INTEGER NOT NULL,
                "file_path"	TEXT NOT NULL,
	            "read"	INTEGER DEFAULT 0,
	            "write"	INTEGER DEFAULT 0,
	            "del"	INTEGER DEFAULT 0,
	            "owner"	INTEGER DEFAULT 0,
	            
	            FOREIGN KEY("user_id") REFERENCES user(id),
                UNIQUE(user_id, file_path) ON CONFLICT REPLACE
            );`,
            (err) => {
                if (err) {
                    console.log(err);
                }

            });
    }

});

module.exports = db;