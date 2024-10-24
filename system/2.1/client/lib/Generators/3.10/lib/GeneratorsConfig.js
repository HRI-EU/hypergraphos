/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

var window;

if( !window ) {
  // Case NodeJS
} else {
  // Case Browser
}

function generatorsConfig( language, config ) {
  // Set default language to JavaScript
  language = ( language? language: 'JavaScript' );

  // Set language block tags
  switch( language.toLowerCase() ) {
    case 'c':
    case 'h':
    case 'c++':
    case 'h++':
    case 'cpp':
    case 'hpp':
    case 'java':
    case 'javascript':
      // Template Block definition
      // Format: //[# Begin NewBlock #]
      // Focus:  ----------------------
      config.blockLineExp = new RegExp( /\s*\/\/\[(#.+#)\]/ );
      // Parameter block definition
      // Format: //[# Begin NewBlock #][LinePattern,$]
      // Focus:                       ----------------
      config.blockParamExp = new RegExp( /.*\]\[(.+)\]/ );
      // Template arguments begin string
      // Format: //:This text -()-> m.text
      // Focus:  ---
      config.blockTArgBeginExp = '//:';
      break;
    case 'html':
      // Template Block definition
      // Format: <!--[# Begin NewBlock #]-->
      // Focus:      --------------------
      config.blockLineExp = new RegExp( /\s*\[(#.+#)\]/ );
      // Parameter block definition
      // Format: <!--[# Begin NewBlock #][LinePattern,$]-->
      // Focus:                         ----------------
      config.blockParamExp = new RegExp( /.*\]\[(.+)\]/ );
      // Template arguments begin string
      // Format: <!--//:This text -()-> m.text-->
      // Focus:      ---
      config.blockTArgBeginExp = '//:';
      // Template arguments end string (optional in template)
      // Format: <!--//:This text -()-> m.text-->
      // Focus:                               ---
      config.blockTArgEndExp = '-->';
      break;
    case 'css':
    case 'scss':
      // Template Block definition
      // Format: /*[# Begin NewBlock #]*/
      // Focus:  ------------------------
      config.blockLineExp = new RegExp( /\s*\/\*\[(#.+#)\]/ );
      // Parameter block definition
      // Format: /*[# Begin NewBlock #][LinePattern,$]-*/
      // Focus:                       ----------------
      config.blockParamExp = new RegExp( /.*\]\[(.+)\]/ );
      // Template arguments begin string
      // Format: /*:This text -()-> m.text*/
      // Focus:  ---
      config.blockTArgBeginExp = '/*:';
      // Template arguments end string (optional in template)
      // Format: /*:This text -()-> m.text*/
      // Focus:                           --
      config.blockTArgEndExp = '*/';
    case 'text':
      config.blockLineExp = new RegExp( /\s*\[(#.+#)\]/ );
      // Template Block definition
      // Format [# Begin NewBlock #]
      // Focus: ----------------------
      config.blockLineExp = new RegExp( /\s*\[(#.+#)\]/ );
      // Parameter block definition
      // Format: [# Begin NewBlock #][LinePattern,$]
      // Focus:                       ----------------
      config.blockParamExp = new RegExp( /.*\]\[(.+)\]/ );
      // Template arguments begin string
      // Format: :This text -()-> m.text
      // Focus:  ---
      config.blockTArgBeginExp = ':';
      break;
    default:
      // Default language is JavaScript
      generatorsConfig( 'JavaScript', config );
      break;
  };
}

if( !window ) {
  module.exports = generatorsConfig;
}