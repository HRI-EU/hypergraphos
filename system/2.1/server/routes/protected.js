/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authMiddleware');
const GETFileStatus = require('../utils/get-file-status');
const ExecuteScript = require('../utils/execute-script');
const GETStatus = require('../utils/get-status');
const POSTServer = require('../utils/post-server');
const GetFileHistory = require('../utils/getFileHistory');
const GetLastUpdate = require('../utils/getLastUpdate');
const RevertToRevision = require('../utils/revertToRevision');
const ShareFiles = require('../utils/shareFiles');
const config = require('../Running_config');
const GetFileRevision = require('../utils/getFileRevision');
const { getFileWithParams } = require('../utils/getFileWithParams');



const onGet = function (request, response, next) {
  console.log('Loading file: ' + request.url);
  next();

}

///////////////////////////////////
// NOTE: orders of the next lines 
// must be kept as it is
///////////////////////////////////

// Serve libraries files
router.use('/library', verifyToken, (req, res) => express.static(config.server.libPath), onGet);
// Save files to dataRoot
router.post('/fileServer', verifyToken, (req, res) => new POSTServer(config.server.dataRoot).serve(req, res));
// Execute server script
router.get('/executeScript', verifyToken, (req, res) => new ExecuteScript(config.server.scriptPath).serve(req, res), onGet);
// Status logger
router.get('/status', verifyToken, (req, res) => new GETStatus.serve(req, res));
// Status of files (date, size, ...)
router.get('/fileStatus', verifyToken, (req, res) => new GETFileStatus(config.server.dataRoot).serve(req, res));
//Get file history from git
router.post('/fileServer/history', verifyToken, (req, res) => new GetFileHistory(config.server.dataRoot).serve(req, res));
//Get file history from git
router.post('/fileServer/share', verifyToken, (req, res) => new ShareFiles(config.server.dataRoot).serve(req, res));
//Get file history from git
router.post('/fileServer/last-update', verifyToken, (req, res) => new GetLastUpdate(config.server.dataRoot).serve(req, res));
//Get file history from git
router.post('/fileServer/history/revision', verifyToken, (req, res) => new GetFileRevision(config.server.dataRoot).serve(req, res));
//reverts to the provided hash
router.post('/fileServer/history/revert', verifyToken, (req, res) => new RevertToRevision(config.server.dataRoot).serve(req, res));
// Load files from dataRoot, gets the latest version of a file
router.use('/fileServer', [verifyToken, getFileWithParams(config.server.dataRoot)], express.static(config.server.dataRoot), onGet);


module.exports = router;