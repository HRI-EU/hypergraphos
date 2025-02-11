/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

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