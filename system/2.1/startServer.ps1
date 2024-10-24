#
# =============================================================================
# Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH
#
# This file is part of HyperGraphOS.
#
# This source code is licensed under the MIT License found in the
# LICENSE file in the root directory of this source tree.
# =============================================================================
# Module: HyperGraphOS Server Startup File
# Date: 10.07.2020
# =============================================================================
#

cd server
$process = Start-Process -FilePath "c:\Program Files\nodejs\node.exe" -ArgumentList "server.js" $Args[1] -PassThru
$procid = $process.Id
Write-Output "Stop-Process -Id $procid" > ..\stopServer.ps1
cd ..