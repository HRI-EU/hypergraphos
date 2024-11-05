#!/bin/bash
#
# <docker>
#
# Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH
# This file is part of HyperGraphOS.
# This source code is licensed under the MIT License found in the
# LICENSE file in the root directory of this source tree.
#
#

set -euo pipefail

docker compose up -d

if [ -n "$1" ]; then
    docker compose logs -f
fi
