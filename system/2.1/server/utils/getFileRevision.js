const { getFileAtRevision, discardFileChanges } = require('../service/git-service');
const { pushGetFileRevisionToGit } = require('../service/queue-service');
const { recomputeURL } = require('./utils');
const fs = require('fs');
const path = require('path');
const express = require('express');
class GetFileRevision {

  constructor(realPath) {
    this.virtualPath = '/fileServer/';
    this.virtualPathRel = 'fileServer/';
    this.realPath = realPath;
  }

  serve(request, response) {
    const fileInfo = request.body;
    if (fileInfo && fileInfo.url && fileInfo.commitHash) {
      if (fileInfo.url.startsWith(this.virtualPathRel)) {
        fileInfo.url = '/' + fileInfo.url;
      }
      if (fileInfo.url.startsWith(this.virtualPath)) {
        // Get updated url
        const filePathName = recomputeURL(fileInfo.url, this.virtualPath, this.realPath);
        if (fs.existsSync(filePathName)) {
          pushGetFileRevisionToGit(request.body, response, filePathName);
        }
        else {
          response.status(404).json('File not found');
        }
      }
    }
    else {
      response.status(400).json('No file url or commit hash specified');
    }


  }
}

module.exports = GetFileRevision;