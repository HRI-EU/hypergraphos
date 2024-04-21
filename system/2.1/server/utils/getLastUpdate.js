const HistoryRequest = require('../models/historyRequest');
const { pushGetLastUpdateDateTime } = require('../service/queue-service');
const { recomputeURL } = require('./utils');
const fs = require('fs');
class GetLastUpdate {

  constructor(realPath) {
    this.virtualPath = '/fileServer/';
    this.virtualPathRel = 'fileServer/';
    this.realPath = realPath;
  }

  serve(request, response) {
    const fileInfo = request.body;
    if (fileInfo && fileInfo.url) {
      if (fileInfo.url.startsWith(this.virtualPathRel)) {
        fileInfo.url = '/' + fileInfo.url;
      }
      if (fileInfo.url.startsWith(this.virtualPath)) {
        // Get updated url
        const filePathName = recomputeURL(fileInfo.url, this.virtualPath, this.realPath);
        if (fs.existsSync(filePathName)) {
          pushGetLastUpdateDateTime(response, filePathName);
        }
        else {
          response.status(404).json('File not found');
        }
      }
    }
    else {
      response.status(400).json('No file url specified');
    }


  }
}

module.exports = GetLastUpdate;