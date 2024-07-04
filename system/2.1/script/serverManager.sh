#!/bin/sh
#
# <Start and stop the server>
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
scriptPath=$2
deployRoot=`node ./getConfigValue.js config.server.deployRoot | tail -1`

if [ -z "$scriptPath" ]; then
  scriptPath=.
else
  scriptPath=script/$deployRoot/$scriptPath/
fi

currDir=`pwd`
cd ..
if [ -n "$2" ]; then
  cd $scriptPath
fi

if [[ $1 == start ]]; then
  ./startServer.sh
fi
if [[ $1 == stop ]]; then
  ./stopServer.sh
fi
#cd script
cd $currDir