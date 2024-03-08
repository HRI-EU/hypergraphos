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