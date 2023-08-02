@echo off
REM Start and stop the server
REM
REM  Example:
REM   serverManager.bat start
REM   serverManager.bat stop

set scriptPath=%2
for /f "usebackq delims=" %%a in (`node .\getConfigValue.js config.server.deployRoot`) do set deployRoot=%%a
set "winPath=%deployRoot:/=\%\%scriptPath:/=\%"
IF NOT "%scriptPath%" == "" set scriptPath=script\%winPath%
IF "%scriptPath%" == "" set scriptPath=.

REM I go back one directory only if I don't have %2
for /f "usebackq delims=" %%a in (`cd`) do set currDir=%%a
cd ..
IF NOT "%2" == "" cd %scriptPath%
REM IF "%1" == "start" powershell -ExecutionPolicy Bypass -File .\startServer.ps1
IF "%1" == "start" powershell -ExecutionPolicy Bypass -File .\startServer.ps1
REM IF "%1" == "stop" powershell -ExecutionPolicy Bypass -File .\stopServer.ps1
IF "%1" == "stop" powershell -ExecutionPolicy Bypass -File .\stopServer.ps1
REM echo scriptPath = %scriptPath%
REM cd script
cd %currDir%
