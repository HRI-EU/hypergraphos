var express = require('express');
var fs = require('fs');
var httpolyglot = require('httpolyglot');
var app = express();
app.use( express.static( './' ) );
const port = 4040;
const options = {
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.cert")
};

httpolyglot.createServer(options, app).listen(port);