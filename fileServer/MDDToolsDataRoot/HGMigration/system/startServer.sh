#
# =============================================================================
# Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
# (C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
# France Government Users Restricted Rights - Use, duplication or disclosure
# restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
# =============================================================================
# Module: MDDTools Configuration File
# Date: 10.07.2020
# =============================================================================
#


cd server
if [[ ! -d "../node_modules" ]]; then
    echo "Installing node modules..."
    npm install
fi
node server
