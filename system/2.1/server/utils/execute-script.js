const { recomputeURL } = require( './utils' );
class ExecuteScript {
  constructor(realPath) {
    this.virtualPath = '/executeScript/';
    this.virtualPathRel = 'executeScript/';
    this.realPath = realPath;
  }
  serve(request, response) {
    const execScript = (scriptFilePathName) => {
      //const output = execSync( scriptFilePathName, { encoding: 'utf-8' } );
      //response.writeHead( 200, {'Content-Type': 'text/text' } );
      //response.end( output );
      exec(scriptFilePathName, (error, stdout, stderr) => {
        if (stdout) {
          response.writeHead(200, { 'Content-Type': 'text/text' });
          response.end(stdout);
        } else if (error) {
          response.writeHead(400, { 'Content-Type': 'text/text' });
          response.end('Error: ' + error.message);
        }
      });
    };
    let path = recomputeURL(request.url, this.virtualPath, this.realPath);
    //path = this.realPath+path;
    console.log('Received path-------------:' + path);
    console.log('**********config path:' + config.server.scriptPath);

    var paramsShell = '';
    var params = '';
    const paramIdx = path.indexOf('?');
    if (paramIdx != -1) {
      const paramStr = decodeURI(path.substring(paramIdx + 1));
      path = path.substring(0, paramIdx);

      if (paramStr) { // If we have params after ?
        // Translate parama in a JSON string
        const paramList = paramStr.split('&');
        const paramLen = paramList.length;
        paramsShell = '';
        params = '';
        let isKeyValue = true;
        // TODO: review this code so to make sure that all params are
        // either key,value or just key,key...
        for (let i = 0; i < paramLen; ++i) {
          const param = paramList[i];
          const idx = param.indexOf('=');
          if (idx > 0) {
            const name = param.substring(0, idx);
            const value = param.substring(idx + 1);
            paramsShell = `${paramsShell}\\"${name}\\":\\"${value}\\"${i != paramLen - 1 ? ',' : ''}`;
            params = `${params}"${name}":"${value}"${i != paramLen - 1 ? ',' : ''}`;
          } else {
            isKeyValue = false;
            params = `${params} ${param}`;
            paramsShell = params;
          }
        }
        if (isKeyValue) {
          paramsShell = `{${paramsShell}}`;
          params = `{${params}}`;
        }
      }
    }

    const pathInfo = getPathInfo(path);
    console.log(JSON.stringify(pathInfo));
    console.log('---- path:' + path);

    // Execute script
    if (pathInfo.extension == 'js') {  // As javascript function in the server
      console.log('Loading script: ' + this.realPath + path);
      // const source = fs.readFileSync( this.realPath+path );
      // const script = source.toString();
      // eval( script );
      const startScript = require(this.realPath + path);
      let output = '';
      let outCode = 200;
      try {
        output = startScript(params);
      } catch (e) {
        let outCode = 400;
        output = 'Error, could not start ', this.realPath + path;
        console.log(output);
      }
      response.writeHead(outCode, { 'Content-Type': 'text/text' });
      response.end(output);
    } else {                            // As shell command
      const scriptExt = (config.server.scriptPlatform == 'win32' ? '.bat' : '.sh');
      // Adapt path separators
      if (config.server.scriptPlatform == 'win32') {
        path = path.replaceAll('/', '\\');
      }
      const scriptCmd = path + scriptExt;

      // In case the path do not exist -> create it
      const fullScriptFilePath = this.realPath + scriptCmd;
      if (fs.existsSync(fullScriptFilePath)) {
        console.log('Execute script ' + fullScriptFilePath + paramsShell);
        const command = `cd ${this.realPath} && .${scriptCmd} ${paramsShell}`
        console.log('Command to run:\n' + command);
        execScript(command);
      } else {
        const output = 'Script not exist ' + fullScriptFilePath;
        console.log(output);
        response.writeHead(200, { 'Content-Type': 'text/text' });
        response.end(output);
      }
    }
  }
}

module.exports = ExecuteScript;