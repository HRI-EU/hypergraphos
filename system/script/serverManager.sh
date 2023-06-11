# Start and stop the server
#
#  Example:
#   serverManager.sh start
#   serverManager.sh stop

scriptPath=$2
deployRoot=`node ../getConfigValue.js config.server.dataRoot`

if [ -z "$scriptPath" ]; then
  scriptPath=.
else
  scriptPath=$deployRoot/$scriptPath/
fi

cd ..
if [[ $1 == start ]]; then
  $scriptPath/startServer.sh
fi
if [[ $1 == stop ]]; then
   $scriptPath/stopServer.sh
fi
cd script