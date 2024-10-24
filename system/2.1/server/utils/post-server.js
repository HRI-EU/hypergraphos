/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

const { recomputeURL, getPathInfo } = require('./utils');
const fs = require('fs');
const config = require('../Running_config');
const { pushPathToGit } = require('../service/git-service');
const { getUserFilePermissions, setPathsOwner } = require('./permissions');
const db = require("../utils/database");


class POSTServer {
  constructor(realPath) {
    this.virtualPath = '/fileServer/';
    this.virtualPathRel = 'fileServer/';
    this.realPath = realPath;
  }
  serve(request, response, body) {
    try {
      let files = request.body.files ? request.body.files : [];
      if (files.length == 0) {
        if (request.body.url) {
          files.push({ url: request.body.url, sourceEncoding: request.body.sourceEncoding, source: request.body.source });
        }
        if (request.body.imageSource) {
          let imagePathName = request.body.url.substring(0, request.body.url.lastIndexOf('.')) || request.body.url;
          files.push({ url: request.body.url + '.png', sourceEncoding: request.body.sourceEncoding, source: request.body.imageSource });
        }
      }
      let paths = [];
      // Save files
      getUserFilePermissions(request.userId).then(permissions => {
        if (config.server.usePermissions) {
          let filesWithNoPermissions = files.filter(file => {
            let filePathName = recomputeURL(file.url, this.virtualPath, this.realPath);
            let existing = fs.existsSync(filePathName);
            const filePermission = permissions.filter(permission => permission.file_path === filePathName);
            if (existing && (!filePermission[0] || (filePermission[0].owner === 0 && filePermission[0].write === 0))) {   
              return true;
            }
            return false;
          });
          if (filesWithNoPermissions.length > 0) {
            response.status(403).json({ error: 'No write access for ' + filesWithNoPermissions.map(file => file.url).toString() });
            return;
          }
        }

        files.forEach(file => {
          if (file.url) {
            // If relative url => make it absolute
            if (file.url.startsWith(this.virtualPathRel)) {
              file.url = '/' + file.url;
            }
            if (file.url.startsWith(this.virtualPath)) {
              // Get updated url
              let filePathName = recomputeURL(file.url, this.virtualPath, this.realPath);
              let existing = fs.existsSync(filePathName);
              let pathInfo = getPathInfo(filePathName);
              // In case the path do not exist -> create it
              if (!fs.existsSync(pathInfo.pathName)) {
                existing = false;
                fs.mkdirSync(pathInfo.pathName, { recursive: true });
                //console.log( `mkdirSync( ${pathInfo.pathName} )` );
              } 
              console.log("Saving file: " + filePathName);
              let source = file.source;
              if (config.server.debugOnFileContentOn && pathInfo.extension == 'json') {
                try {
                  const obj = JSON.parse(source);
                  source = JSON.stringify(obj, null, 2);
                } catch (e) {
                  console.warn('Error parsing json file content: ');
                  console.log(source);
                }
              }
              if (file.sourceEncoding == 'base64') {
                var sourceBuffer = Buffer.from(source, 'base64');
                fs.writeFileSync(filePathName, sourceBuffer);
              } else {
                fs.writeFileSync(filePathName, source, 'utf8');
              }
              paths.push({ path: filePathName, existing: existing });
            }
          }
        });
        if (paths.length > 0) {
          const selectSql = "select * from user where id = ?";
          db.get(selectSql, request.userId, (err, row) => {
            if (!err) {
              if (row) {
                setPathsOwner(paths, row.id);
                pushPathToGit(paths, row.name, row.email).then(result => {
                  response.json({ commitHash: result.update?.hash?.to });
                });
              } else {
                return res.status(404).json({ error: 'User not found!' });
              }
            }
          });
        }
      })


    } catch (e) {
      console.warn('Error in receiving/managing POST request body');
      console.log(body);
      response.status(500);
    }

  }
}




module.exports = POSTServer;