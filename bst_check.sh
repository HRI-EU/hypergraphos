#!/bin/bash
#
# <Code Quality Checker>
#
#
# Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH
# This file is part of HyperGraphOS.
# This source code is licensed under the MIT License found in the
# LICENSE file in the root directory of this source tree.
#
#

set -euo pipefail

source /hri/sit/latest/DevelopmentTools/ToolBOSCore/4.3/BashSrc

BST.py -q

#EOF
