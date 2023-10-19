/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
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
      this.params = {
        model: "gpt-3.5-turbo", // "text-davinci-003",
        //max_tokens: 1000,
        //temperature: 0,
        //top_p: 1,
      };
    }
    setParamList( paramList ) {
      for( const param of paramList ) {
        if( param && ( param.length > 1 ) ) {
          this.setParam( param[0], param[1] );
        }
      }
    }
    setParam( name, value ) {
      if( name ) {
        this.params[name] = value;
      }
    }
    getResponse( promptOrMsg, callback ) {
      this.ajax.open( 'POST', 'https://api.openai.com/v1/chat/completions' );
      this.ajax.setRequestHeader( 'Authorization', 'Bearer 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' ); // Antonello
      //this.ajax.setRequestHeader( 'Authorization', 'Bearer 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' ); // Jorg
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
  