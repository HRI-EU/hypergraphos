#!/bin/bash
npm install
node ./Server.js & echo kill -9 $!  > ./stopServer.sh
chmod a+x ./stopServer.sh
