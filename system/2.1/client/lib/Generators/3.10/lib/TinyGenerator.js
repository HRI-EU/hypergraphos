/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/**
 * This template generator is extremely simple. It just sabstitute
 * the tokens like [#key#] found in the template with the key/value 
 * object "values"
 * 
 *  Example template:
 *   template = 'This is a simple [#name1#] to [#verb#] its usage'
 *    values = {
 *      'name1': 'template',
 *      'verb': 'demonstrate',
 *    }
 *  
 * Once calling: processTemplate( template, values ) the result is:
 * 
 *   'This is a simple template to demonstrate its usage'
 *  
 * Tokens are keys of values surrounded with '[#' & '#]'
 * 
 * @param {*} template a string containing the 
 * @param {*} values a key/value data container
 * @returns the substitution of all tokens with 'values' content
 */
function processTemplate( template, values, isKeepUnmatchedValues ) {
  let result = '';
  // Function to get key->value replacement
  const getKeyValue = ( matchStr )=> {
    const name = matchStr.substring( 2, matchStr.length-2 );
    if ( name in values) {
      const v = values[name];
      if( typeof( v ) == 'string' ) {
        return( v );
      } else if( typeof( v.value ) == 'string' ) {
        return( v.value );
      } else {
        return( JSON.stringify( v, null, 2 ) );
      }
    } else {
      if( isKeepUnmatchedValues ) {
        return( `${matchStr}`);
      } else {
        return( '' );
      }
    }
  }
  if( template ) {
    result = template.replace( /\[#(\S*)#\]/g, getKeyValue );
  }
  return( result );
}