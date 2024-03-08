const { recomputeURL } = require( './utils' );
const fs = require( 'fs' );
class GETFileStatus {
  constructor(realPath) {
    this.virtualPath = '/fileServer/';
    this.realPath = realPath;
  }
  serve(request, response) {
    let filePath = recomputeURL(request.url, this.virtualPath, this.realPath);
    // Remove '?...' parameters (e.g. no-cache id)
    const idx = filePath.indexOf('?');
    if (idx != -1) {
      filePath = filePath.substring(0, idx);
    }
    filePath = this.realPath + filePath;
    console.log('Request of fileInfo for:', filePath);
    fs.stat(filePath, (err, status) => {
      response.writeHead(200, { 'Content-Type': 'text/json' });
      // Return an empty object if file do not exist, stat info otherwise
      const statInfo = {};
      if (!err) {
        statInfo['mtime'] = status['mtime'];
        statInfo['atime'] = status['atime'];
        statInfo['ctime'] = status['ctime'];
        statInfo['birthtime'] = status['birthtime'];
      }
      const strStatInfo = JSON.stringify(statInfo);
      //console.log( statInfo );
      response.end(strStatInfo);
    });
    /*
     Example:
       url: http://localhost:7575/fileStatus/00/77.json
     Result:
      status {
        dev: 16777234,
        mode: 33188,
        nlink: 1,
        uid: 501,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 15428310,
        size: 46,
        blocks: 8,
        atimeMs: 1647331446275.954,
        mtimeMs: 1636134156213.5515,
        ctimeMs: 1636134156213.5515,
        birthtimeMs: 1636134156213.3267,
        atime: 2022-03-15T08:04:06.276Z,
        mtime: 2021-11-05T17:42:36.214Z,
        ctime: 2021-11-05T17:42:36.214Z,
        birthtime: 2021-11-05T17:42:36.213Z
      }
    */
  }
}

module.exports = GETFileStatus;