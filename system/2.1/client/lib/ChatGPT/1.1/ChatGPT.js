/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
=============================================================================
Module: OpenAI ChatGPT REST API class
Date: 30.05.2023
=============================================================================
*/

// curl --proxy hri-proxy.honda-ri.de:3128 https://api.openai.com/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer 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" \
//   -d '{ "model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Hello!"}] }'

class ChatGPT {
    /**
     * Get a new instance of a ChatGPT class
     * 
     * new ChatGPT( proxyInfo )
     * @param {*} proxyInfo is {host: String, port: Number; [protocol: String]}
     * 
     * Example:
     *   c = new ChatGPT({ 
     *     protocol: 'https',
     *     host: 'hri-proxy.honda-ri.de',
     *     port: 3128
     *    })
     */
    constructor( proxyInfo ) {
      const params = {};

      if( proxyInfo ) {
        params.proxy = proxyInfo;
      }
      this.ajax = new XMLHttpRequest( params );
      this.paramNameList = [ 'model', 'max_tokens', 'temperature', 'top_p', 'stream' ];
      this.params = {
        model: "gpt-3.5-turbo", // "text-davinci-003",
        //max_tokens: 1000,
        //temperature: 0,
        //top_p: 1,
        stream: false,
      };
      this.url = 'https://api.openai.com/v1/chat/completions';
    }
    setParamList( paramList ) {
      if( paramList ) {
        for( const pname in paramList ) {
          const pvalue = paramList[pname];
          if( pname != undefined ) {
            this.setParam( pname, pvalue );
          }
        }
      }
      // for( const param of paramList ) {
      //   if( param && ( param.length > 1 ) ) {
      //     this.setParam( param[0], param[1] );
      //   }
      // }
    }
    setParam( name, value ) {
      if( name && this.paramNameList.includes( name ) ) {
        if( value == 'true' ) {
          value = true;
        } else if( value == 'false' ) {
          value = false;
        } else if( parseInt( value ) == value ) {
          value = parseInt( value );
        }
        this.params[name] = value;
      }
    }
    getResponse( promptOrMsg, callback ) {
      const url = this.url;
      this.ajax.open( 'POST', url );

      this.ajax.setRequestHeader( 'Authorization', 'Bearer OPENAIKEY' ); 
      this.ajax.setRequestHeader( 'Content-Type', 'application/json' );
  
      const messages = ( typeof( promptOrMsg ) == 'object'? promptOrMsg: [
        {
          role: 'user',
          content: promptOrMsg,
        },
      ]);

      // Create a new request
      const request = { messages };
      // Assign current params value to the request
      const chatRequest = Object.assign( request, this.params );
  
      this.ajax.onload = ()=> { if( callback ) callback( this._getResponse() ); };
      try {
        console.log( chatRequest );
        this.ajax.send( JSON.stringify( chatRequest ) );
      } catch( e ) {
        console.log( e );
      }
    }
    _getResponse() {
      let result = '';
      const responseObj = JSON.parse( this.ajax.response );
      if( responseObj ) {
        if( responseObj.error ) {
          console.log( responseObj.error );
        } else {
          console.log( responseObj );
        }
        const c = responseObj.choices;
        if( c && c.length > 0 ) {
          if( c[0].message && c[0].message.content ) {
            result = c[0].message.content.trim();
          }
        }
      }
      return( result );
    }
  }
  
