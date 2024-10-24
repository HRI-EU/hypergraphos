/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
============================================================================
Module: Espresso Route Web Server
Date: 22.05.2020
=============================================================================
*/

/*
   NOTE:
   Adding GET/POST route can be done with any order.
   The list of virutal path is always sorted automatically.
 */

const staticFileServer = require( 'node-static' );
const { request } = require('http');

class Espresso {
  constructor() {
    this.dispatchHandler = {
      'GET': [],
      'POST': [],
    };
  }
  static( realPath ) {
    return( new staticFileServer.Server( realPath ) );
  }
  addGET( virtualPath, fileServer, onGet ) {
    const method = 'GET';
    const getRequestHandler = (req, resp) => {
      req.addListener( 'end', ()=>{ 
        if( onGet ) {
          onGet( req, resp );
        }
        fileServer.serve( req, resp );
      }).resume();
    };
    const handler = {
      method,
      virtualPath,
      reqHandler: getRequestHandler,
    };
    this.dispatchHandler[method].push( handler );
    this._sortHandlers( method );
  }
  addPOST( virtualPath, fileServer ) {
    const method = 'POST';
    const getRequestHandler = (req, resp) => {
      let body = '';
      req.addListener( 'data', (data)=>{
         body = body+data 
      }).resume();
      req.addListener( 'end', ()=>{
         fileServer.serve( req, resp, body ) 
        }).resume();
    };
    const handler = {
      method,
      virtualPath,
      reqHandler: getRequestHandler,
    };
    this.dispatchHandler[method].push( handler );
    this._sortHandlers( method );
  }
  getRequestHandler() {
    return( (req, resp)=> this._handleRequest(req,resp) );
  }
  _handleRequest( request, response ) {
    try {
      switch( request.method ) {
        case 'GET': 
          this._methodGETHandler( request, response );
          break;
        case 'POST':
          this._methodPOSTHandler( request, response );
          break;
      }
    } catch( error ) {
      console.log( error );
    }
  }
  _methodGETHandler( request, response ) {
    const method = 'GET';
    const url = request.url;
    console.log( `Received ${method} request on ${url}` );
    for( const handler of this.dispatchHandler[method] ) {
      if( url.startsWith( handler.virtualPath ) ) {
        if( handler.virtualPath != '/' ) {
          request.url = url.substring( handler.virtualPath.length );
        }
        handler.reqHandler( request, response );
        break;
      }
    }
  }
  _methodPOSTHandler( request, response ) {
    const method = 'POST';
    const url = request.url;
    console.log( `Received ${method} request on ${url}` );
    for( const handler of this.dispatchHandler[method] ) {
      if( url.startsWith( handler.virtualPath ) ) {
        request.url = request.url.substring( handler.virtualPath.length );
        handler.reqHandler( request, response );
      }
      break;
    }
  }
  _sortHandlers( method ) {
    // Sort the array in reverse order (from Z to A)
    // This is 
    this.dispatchHandler[method].sort( (a,b) => {
      if( a.virtualPath < b.virtualPath ) {
        return 1;
      } else if( a.virtualPath > b.virtualPath ) {
        return -1
      } else {
        return 0;
      }
    });
  }
}

module.exports = new Espresso();