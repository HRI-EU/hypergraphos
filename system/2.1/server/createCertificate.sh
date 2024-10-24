#!/bin/bash
# Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH
# 
# This file is part of HyperGraphOS.
# 
# This source code is licensed under the MIT License found in the
# LICENSE file in the root directory of this source tree.
# 


#
# <SSL>
#


set -euo pipefail

openssl req -nodes -new -x509 -days 70360  -keyout server.key -out server.cert
