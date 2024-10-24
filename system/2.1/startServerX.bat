@echo off
REM
REM =============================================================================
REM Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH
REM
REM This file is part of HyperGraphOS.
REM
REM This source code is licensed under the MIT License found in the
REM LICENSE file in the root directory of this source tree.
REM =============================================================================
REM Module: HyperGraphOS Server Startup File
REM Date: 10.07.2020
REM =============================================================================
REM

cd server
IF NOT exist ..\node_modules\ npm install

node server-express.js %*
cd ..
