/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

const { pushfetchLatestVersion, pushGetFileRevisionToGit } = require('../service/queue-service');
const { recomputeURL } = require('./utils');
const virtualPath = '/fileServer/';
const config = require('../Running_config');
const db = require("../utils/database");

getUserFilePermissions = function (userId, path) {
  const selectSql = "select * from file_permissions where user_id = ? and file_path = ?";
  return new Promise((resolve, reject) => {
    db.get(selectSql, [userId, path], (err, row) => {
      if (!config.server.usePermissions) {
        resolve({ read: 1 });
      }
      if (!err) {
        resolve(row);
      } else {
        reject(err);
      }
    })
  });
}

exports.getFileWithParams = (dataRoot) => {
  return (req, res, next) => {
    const filePathName = recomputeURL(req.baseUrl + req.url.split('?').shift(), virtualPath, dataRoot);
    getUserFilePermissions(req.userId, filePathName).then(result => {
      if (config.server.usePermissions && (!result || (result.read === 0 && result.owner === 0))) {
        res.status(403).end();
        return;
      }
      if (req.query.hash) {
        pushGetFileRevisionToGit({ commitHash: req.query.hash }, res, filePathName)
      } else {
        pushfetchLatestVersion(next);
      }
    });

  }
}