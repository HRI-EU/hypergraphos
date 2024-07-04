#!/bin/sh
#
# <StartServerX>
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


cd server
if [[ ! -d "../node_modules" ]]; then
    echo "Installing node modules..."
    npm install
fi

#node server "$@" & echo kill -9 $!  > ../stopServer.sh
node server-express "$@" & echo kill -9 $!  > ../stopServer.sh