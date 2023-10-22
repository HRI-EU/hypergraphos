const http = require('http');
const { exec } = require('child_process');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the target URL you want to proxy
  const targetUrl = 'https://www.google.com'; // Replace with your desired URL

  // Use wget to fetch the target URL
  const wgetCommand = `wget -O - "${targetUrl}"`;

  exec(wgetCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing wget: ${error}`);
      res.writeHead(500);
      res.end('Internal Server Error');
    } else {
      // Forward the wget response to the client
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(stdout);
    }
  });
});

// Listen on a port
const port = 3000; // Change this to your desired port
server.listen(port, () => {
  console.log(`Proxy server is listening on port ${port}`);
});
