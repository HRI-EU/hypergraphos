const http = require('http');
const { exec } = require('child_process');
const url = require('url');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Parse the request URL to extract the target URL from the query parameter
  const parsedUrl = url.parse(req.url, true);
  const targetUrl = parsedUrl.query.target;

  if (!targetUrl) {
    res.writeHead(400);
    res.end('Missing target URL parameter');
    return;
  }

  // Use wget to fetch the specified target URL
  const wgetCommand = `wget -O - "${targetUrl}"`;

  exec(wgetCommand, (error, stdout, stderr) => {
    console.log( `request: ${targetUrl}` );
    if (error) {
      console.error(`Error executing wget: ${error}`);
      res.writeHead(500);
      res.end('Internal Server Error');
    } else {
      // Replace URLs in the response with the proxy URL
      const translatedResponse = stdout.replaceAll(
        new RegExp(/http\:\/\//, 'g'),
        `http://localhost:3000/?target=http://`
      ).replaceAll(
        new RegExp(/https\:\/\//, 'g'),
        `http://localhost:3000/?target=https://`
      );
      console.log( translatedResponse );

      // Forward the translated response to the client
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(translatedResponse);
    }
  });
});

// Listen on a port
const port = 3000; // Change this to your desired port
server.listen(port, () => {
  console.log(`Proxy server is listening on port ${port}`);
});
