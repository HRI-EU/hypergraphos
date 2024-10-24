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

class ChatGPT {
  constructor() {
    this.ajax = new XMLHttpRequest();
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
      this.params.name = value;
    }
  }
  getResponse( prompt, callback ) {
    this.ajax.open( 'POST', 'https://api.openai.com/v1/chat/completions' );
    this.ajax.setRequestHeader( 'Authorization', 'Bearer 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' );
    this.ajax.setRequestHeader( 'Content-Type', 'application/json' );

    // Create a new request
    const request = {
      //prompt,
      messages: [
        // {
        //   role: 'system',
        //   content: 'You are an expert assistant for any request',
        // },
        {
          role: 'user',
          content: prompt,
        },
      ],
    };
    // Assign current params value to the request
    const chatRequest = Object.assign( request, this.params );

    this.ajax.onload = ()=> { if( callback ) callback( this._getResponse() ); };
    try {
      this.ajax.send( JSON.stringify( chatRequest ) );
    } catch( e ) {
      console.log( e );
    }
  }
  _getResponse() {
    let result = '';
    const responseObj = JSON.parse( this.ajax.response );
    if( responseObj ) {
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
