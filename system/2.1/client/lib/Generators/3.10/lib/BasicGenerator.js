/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

var window;

var generatorsConfig;

if( !window ) {
  // Case NodeJS
} else {
  // Case Browser
}


class BasicGenerator {
  constructor() {
    this.template = '';
    this.tagLen = 2;
    this.blockExp = new RegExp( /\[(#.+#)\]/g );
    this.data = {};
    this.output = '';
  }
  setTemplate( template ) {
    this.template = template;
  }
  getOutput() {
    return( this.output.split( '\n' ) );
  }
  getOutputStr() {
    return( this.output );
  }
  process( data, dataReader ) {
    this.data = data;

    if( this.template ) {
      this.output = this.template.replace( this.blockExp, this._getKeyValue.bind(this, dataReader) );
    }
  }
  _getKeyValue( dataReader, matchStr ) {
    // Function to get key->value replacement
    const name = matchStr.substring( this.tagLen, matchStr.length-this.tagLen );
    if( dataReader ) {
      return( dataReader( this.data, name ) );
    } else if ( name in this.data ) {
      return( this.data[name] );
    } else {
      return( '' );
    }
  }
}

if( !window ) {
  module.exports = BasicGenerator;
}