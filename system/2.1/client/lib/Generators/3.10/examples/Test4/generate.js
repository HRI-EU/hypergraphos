/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

// Load Template Libraries
const tdir = '../../lib';
const BasicGenerator = require( `${tdir}/BasicGenerator` );

const bg = new BasicGenerator();
let data;

// Example with dataReader
data = {
  'template': { value: 'simple Template' },
};
const dataReader = ( d, n )=> ( d[n]? d[n].value: '' );
bg.setTemplate( 'This is a [#template#] with a single value' );
bg.process( data, dataReader );
console.log( bg.getOutputStr() );

// Example with simple data
data = {
  'template': 'very simple template',
};
bg.setTemplate( 'This is a [#template#] with a single value' );
bg.process( data );
console.log( bg.getOutputStr() );

// Example with entry not in data
data = {};
bg.setTemplate( 'This is a [#test#] with a single value' );
bg.process( data );
console.log( bg.getOutputStr() );