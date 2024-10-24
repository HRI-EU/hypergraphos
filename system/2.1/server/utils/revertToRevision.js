/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

const { revertToCommit } = require('../service/git-service');
const { pushRevertToRevision } = require('../service/queue-service');
const { recomputeURL } = require('./utils');
const fs = require('fs');
const db = require("../utils/database");

class RevertToRevision {

  constructor(realPath) {
    this.virtualPath = '/fileServer/';
    this.virtualPathRel = 'fileServer/';
    this.realPath = realPath;
  }

  serve(request, response) {
    let revertRequest = request.body;
    if (revertRequest && revertRequest.url && revertRequest.commitHash) {
      if (revertRequest.url.startsWith(this.virtualPathRel)) {
        revertRequest.url = '/' + revertRequest.url;
      }
      if (revertRequest.url.startsWith(this.virtualPath)) {
        // Get updated url
        const filePathName = recomputeURL(revertRequest.url, this.virtualPath, this.realPath);
        if (fs.existsSync(filePathName)) {
          const selectSql = "select * from user where id = ?";
          db.get(selectSql, request.userId, (err, row) => {
            if (!err) {
              if (row) {
                pushRevertToRevision(revertRequest, response, filePathName, row.name, row.email);
              } else {
                return res.status(404).json({ error: 'User not found!' });
              }
            }
          });

        } else {
          response.status(404).json('File not found');
        }
      }
    }
    else {
      response.status(400).json('File url and commit hash must be provided');
    }
  }
}

module.exports = RevertToRevision;