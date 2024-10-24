/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

class GETStatus {
  serve(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(`<html><body>
        <h1>MDDFileServer Running!</h1><br>
        <h2> Configuration</h2>
        <pre>${configurationStr}</pre>
        </body></html>` );
  }
}

module.exports = GETStatus;