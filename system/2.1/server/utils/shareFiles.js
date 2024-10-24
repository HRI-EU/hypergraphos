/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

const { recomputeURL, getPathInfo } = require('./utils');
const fs = require('fs');
const config = require('../Running_config');
const db = require("../utils/database");
const { getUserFilePermissions, addPermission } = require("./permissions");

class ShareFiles {
  constructor(realPath) {
    this.virtualPath = '/fileServer/';
    this.virtualPathRel = 'fileServer/';
    this.realPath = realPath;
  }
  serve(request, response, body) {
    try {
      getUserFilePermissions(request.userId).then(filePermissions => {
        const permissionPromises = [];
        const userPromises = [];
        request.body.forEach(element => {
          let filePathName = recomputeURL(element.url, this.virtualPath, this.realPath);
          let permission = filePermissions.filter(el => el.file_path == filePathName);
          if (!permission || permission[0]?.owner === 0) {
            response.status(403).json({ error: 'No owner access for ' + element.url }); 
          }

          element.users.forEach(user => {
            userPromises.push(getUserByEmail(user?.email))
          });


          Promise.all(userPromises).then(users => {
            users.forEach(user => {
              let requestUser = element.users.filter(res => res.email == user.email)[0];
              permissionPromises.push(addPermission(filePathName, user.id,
                requestUser?.permissions?.owner === 'true',
                requestUser?.permissions?.read === 'true',
                requestUser?.permissions?.write === 'true',
                requestUser?.permissions?.delete === 'true'));
            });
            Promise.all(permissionPromises).then(results => {
              response.status(200).end();
            }).catch(err => {
              response.status(500);
            })
          })
        });

      });


    } catch (e) {
      console.warn('Error in receiving/managing POST request body');
      console.log(body);
      response.status(500);
    }

  }
}


getUserByEmail = function (email) {
  const selectSql = "select * from user where email = ?";
  return new Promise((resolve, reject) => {
    db.get(selectSql, email, (err, row) => {
      if (!err) {
        resolve(row);
      } else {
        reject(err);
      }
    })
  });
}

module.exports = ShareFiles;