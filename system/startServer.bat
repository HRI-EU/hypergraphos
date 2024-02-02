@echo off
REM
REM =============================================================================
REM Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
REM (C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
REM France Government Users Restricted Rights - Use, duplication or disclosure
REM restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
REM =============================================================================
REM Module: MDDTools Server Startup File
REM Date: 10.07.2020
REM =============================================================================
REM

cd server
IF NOT exist ..\node_modules\ npm install

node server.js %*
cd ..
