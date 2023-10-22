const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');

// Load your SSL/TLS certificate and private key
const privateKey = fs.readFileSync('./server.key', 'utf8');
const certificate = fs.readFileSync('./server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create a proxy server
const proxy = httpProxy.createProxyServer();

// Create an HTTPS server
const httpsServer = https.createServer(credentials, (req, res) => {
  // Set the target URL you want to proxy
  const targetUrl = 'https://www.google.com'; // Replace with your desired URL
  console.log( 'Request for', targetUrl );

  // Proxy the request to the target URL
  proxy.web(req, res, { target: targetUrl });

  // Intercept the response and remove the X-Frame-Options header
  proxy.on('proxyRes', (proxyRes) => {
    delete proxyRes.headers['x-frame-options'];
  });
});

// Listen on a port
const port = 3001; // Default HTTPS port
httpsServer.listen(port, () => {
  console.log(`HTTPS proxy server is listening on port ${port}`);
});
