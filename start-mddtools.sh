#!/bin/bash
#
# <docker>
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

docker compose up -d

if [ -n "$1" ]; then
    docker compose logs -f
fi
