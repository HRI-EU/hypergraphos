const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authMiddleware');
const GETFileStatus = require('../utils/get-file-status');
const ExecuteScript = require('../utils/execute-script');
const GETStatus = require('../utils/get-status');
const POSTServer = require('../utils/post-server');
const config = require('../Running_config');

const onGet = function( request, response, next ) {
  console.log( 'Loading file: '+request.url );
  next();  
}

// Serve libraries files
router.use('/library', verifyToken,  (req, res) => express.static(config.server.libPath), onGet);
// Load files from dataRoot, gets the latest version of a file
router.use('/fileServer', verifyToken, express.static(config.server.dataRoot), onGet);
// Execute server script
router.get('/executeScript', verifyToken, (req, res) => new ExecuteScript(config.server.scriptPath).serve(req, res), onGet);
// Serve client files
// router.get('/', (req, res) => express.static(config.server.clientPath));
// Status logger
router.get('/status', (req, res) => new GETStatus.serve(req, res));
// Status of files (date, size, ...)
router.use('/fileStatus', verifyToken, (req, res) => new GETFileStatus(config.server.dataRoot).serve(req, res));
// Save files to dataRoot
router.post('/fileServer', (req, res) => new POSTServer(config.server.dataRoot).serve(req, res));


module.exports = router;