#!/bin/bash
#
# <StartServer>
#
# Copyright (C)
# Honda Research Institute Europe GmbH
# Carl-Legien-Str. 30
# 63073 Offenbach/Main
# Germany
#
# UNPUBLISHED PROPRIETARY MATERIAL.
# ALL RIGHTS RESERVED.
#
#

set -euo pipefail

cd server
if [[ ! -d "../node_modules" ]]; then
    echo "Installing node modules..."
    npm install
fi

node server "$@" & echo kill -9 $!  > ../stopServer.sh
