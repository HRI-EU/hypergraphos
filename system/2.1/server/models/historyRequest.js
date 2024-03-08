class HistoryRequest {
  // constructor(fileUrl, since, size, page) {
  //   this.fileUrl = fileUrl;
  //   this.since = since;
  //   this.size = size;
  //   this.page = page;
  // }

  constructor(obj) {
    obj && Object.assign(this, obj);
  }
}

module.exports = HistoryRequest;