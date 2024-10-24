/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

const Queue = require('queue');
const fs = require('fs');
const { simpleGit } = require('simple-git');
const { getFileAtRevision, discardFileChanges, fetchLatestVersion, getFileHistory, getLastUpdateDateTime, revertToCommit } = require('../service/git-service');

const q = new Queue({ results: [], autostart: true });

q.on('success', function (result, job) {
  console.log('job finished processing:', job.toString().replace(/\n/g, ''))
  console.log('The result is:', result)
})

exports.pushGetFileRevisionToGit = function (body, response, filePathName) {
  q.push(cb => {
    const result = 'Processing get file revision for ' + filePathName;

    getFileAtRevision(body, filePathName).then(res => {

      let file = fs.readFileSync(filePathName);
      // response.sendFile(path.join(__dirname, '../' + filePathName));
      discardFileChanges(filePathName).then(res => {
        response.send(file);
        cb(null, result);
      });

    });
  });
}

exports.pushGetFileHistory = function (body, response, filePathName) {
  q.push(cb => {
    getFileHistory(body, filePathName).then(res => {
      response.status(200).json(res)
    }, err => response.status(500));
  });
}

exports.pushRevertToRevision = function (body, response, filePathName, name, email) {
  q.push(cb => {
    revertToCommit(body.commitHash, filePathName, name, email).then(res => {
      response.status(200).json(res)
    }, err => {
      console.log(err);
      response.status(500).json('Error while reverting to commit')
    });
  });
}

exports.pushGetLastUpdateDateTime = function (response, filePathName) {
  q.push(cb => {
    getLastUpdateDateTime(filePathName).then(res => {
      response.status(200).json({ lastUpdate: res })
    }, err => response.status(500));
  });
}

exports.pushfetchLatestVersion = function (next) {
  q.push(cb => {
    fetchLatestVersion().then(result => {
      cb(null);
      next();
    });
  });


}
