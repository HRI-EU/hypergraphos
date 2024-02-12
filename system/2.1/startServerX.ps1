#
# =============================================================================
# Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
# (C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
# France Government Users Restricted Rights - Use, duplication or disclosure
# restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
# =============================================================================
# Module: MDDTools Server Startup File
# Date: 10.07.2020
# =============================================================================
#

cd server
$process = Start-Process -FilePath "c:\Program Files\nodejs\node.exe" -ArgumentList "server-express.js" $Args[1] -PassThru
$procid = $process.Id
Write-Output "Stop-Process -Id $procid" > ..\stopServer.ps1
cd ..