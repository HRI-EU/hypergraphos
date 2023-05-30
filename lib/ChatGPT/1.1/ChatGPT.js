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

class ChatGPTReal {
  constructor() {
    this.ajax = new XMLHttpRequest();
  }
  getResponse( prompt, callback ) {
    this.ajax.open( 'POST', 'https://api.openai.com/v1/chat/completions' );
    this.ajax.setRequestHeader( 'Authorization', 'Bearer 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' );
    this.ajax.setRequestHeader( 'Content-Type', 'application/json' );

    const request = {
      //prompt,
      model: "gpt-3.5-turbo", // "text-davinci-003",
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      //max_tokens: 1000,
      //temperature: 0,
      //top_p: 1,
    };
    this.ajax.onload = ()=> { if( callback ) callback( this._getResponse() ); };
    try {
      this.ajax.send( JSON.stringify( request ) );
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
        if( c[0].message.content ) {
          result = c[0].message.content.trim();
        }
      }
    }
    return( result );
  }
}
