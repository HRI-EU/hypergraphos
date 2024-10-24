#!/bin/bash
# Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH
# 
# This file is part of HyperGraphOS.
# 
# This source code is licensed under the MIT License found in the
# LICENSE file in the root directory of this source tree.
#  

#
# <Start and stop the server>
#

set -euo pipefail

scriptPath="$2"
deployRoot=$( node ./getConfigValue.js config.server.deployRoot | tail -1 )

if [ -z "${scriptPath}" ]; then
  scriptPath=.
else
  scriptPath="script/${deployRoot}/${scriptPath}/"
fi

currDir=$( pwd )
cd ..
if [ -n "$2" ]; then
  cd "${scriptPath}"
fi

if [[ "$1" == start ]]; then
  ./startServer.sh
fi
if [[ "$1" == stop ]]; then
  ./stopServer.sh
fi
#cd script
cd "${currDir}"
