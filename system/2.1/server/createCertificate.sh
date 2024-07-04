#!/bin/bash
#
# <SSL>
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

openssl req -nodes -new -x509 -days 70360  -keyout server.key -out server.cert
