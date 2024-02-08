/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: Serer Status Reporting Utility
Date: 10.07.2020
=============================================================================
*/

class GETStatus {
  serve( request, response ) {
    response.writeHead( 200, { 'Content-Type': 'text/html' } );
    response.end( `<html><body>
        <h1>MDDFileServer Running!</h1><br>
        <h2> Configuration</h2>
        <pre>${configurationStr}</pre>
        </body></html>` );
  }
}

module.exports = GETStatus;