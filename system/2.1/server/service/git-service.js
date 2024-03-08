const { simpleGit, pathspec } = require('simple-git');
const express = require('express');
const config = require('../Running_config');
const HistoryRequest = require('../models/historyRequest');

let isLatestVersion = false;


exports.fetchLatestVersion = function () {
  return new Promise((resolve) => {
    if (!isLatestVersion) {
      simpleGit().pull((err, update) => {
        if (err) {
          console.log(err);
        }
        isLatestVersion = true;
        resolve();
        //if (update && update.summary.changes) {
        //  express.static(config.server.dataRoot);
        //}
      });
    } else {
      resolve();
    }
  });

}


exports.pushPathToGit = function (paths, name, email) {
  let commitMessage = paths.map(path => path.existing ? "Updated " + path.path : "Added " + path.path + '\n').toString();
  return simpleGit().add(paths.map(path => path.path))
    .commit(`${commitMessage}`, { '--author': `${name} <${email}>` })
    .push(['origin', 'main'], () => {
      isLatestVersion = false;
      console.log('Pushed changes to Git');
    });

}


exports.getFileHistory = function (request, filePathName) {
  const historyRequest = new HistoryRequest(request);
  let startDate = new Date();
  let formattedDate;

  const resultFormat = {
    hash: '%h',
    authorEmail: '%ae',
    authorName: '%an',
    date: '%ai'
  };
  if (historyRequest.since) {
    if (historyRequest.since.slice(-1) === 'h') {
      startDate.setHours(startDate.getHours() - historyRequest.since.substring(0, historyRequest.since.indexOf('h')));
    } else if (historyRequest.since.slice(-1) === 'd') {
      startDate.setDate(startDate.getDate() - historyRequest.since.substring(0, historyRequest.since.indexOf('d')));
    }
    formattedDate = startDate.getMonth() + 1 + '-' + startDate.getDate() + '-' + startDate.getFullYear() + ' ' + startDate.getHours() + ':' + startDate.getMinutes() + ':' + startDate.getSeconds();
    return simpleGit().log({ '--since': formattedDate, format: resultFormat, file: filePathName });

    //return simpleGit().log(['--since=' + formattedDate, filePathName]);

  }
  return simpleGit().log([filePathName]);
}

exports.getLastUpdateDateTime = function (filePathName) {

  return simpleGit().raw('log', '-1', '--pretty="%ci"', filePathName);
}

exports.getFileAtRevision = function (request, filePathName) {
  isLatestVersion = false;
  return simpleGit().checkout(request.commitHash, [filePathName]);
}

exports.discardFileChanges = function (filePathName) {
  return simpleGit().raw('restore', '--staged', '--worktree', filePathName);
}


exports.revertToCommit = function (commitHash, filePathName, name, email) {
  isLatestVersion = false;
  return simpleGit().checkout(commitHash, [filePathName])
    .add(filePathName)
    .commit(`Reverted ${filePathName} to ${commitHash}`, { '--author': `${name} <${email}>` })
    .push(['origin', 'main'], () => console.log('Pushed reverted commit to Git'));
}
