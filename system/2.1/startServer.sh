#!/bin/bash
# Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH
# 
# This file is part of HyperGraphOS.
# 
# This source code is licensed under the MIT License found in the
# LICENSE file in the root directory of this source tree.

#
# <StartServer>
#

set -euo pipefail

cd server
if [[ ! -d "../node_modules" ]]; then
    echo "Installing node modules..."
    npm install
fi

node server "$@" & echo kill -9 $!  > ../stopServer.sh
