/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
  //[# Begin Header #][Replace]
  //:JSTestClass -()-> m.className
  //:this class is a test class in JavaScript -()-> m.comment
  JSTestClass.js

  Description: this class is a test class in JavaScript
  //[# End Header #]
*/

//[# Define Packages #]
//:const %b = require( '%b' );
const dir = require( 'dir' );

//[# Definite Class #][Replace]
//:JSTestClass -()-> m.className
class JSTestClass {
  constructor() {
    this.date = new Date();
  }
  // Public Methods
  //[# Loop Begin Public Method #]
  //[# Define Signature #]
  //:%b(§%i, %i§) { // %e
  aPublicMethod( Param1, Param2 ) { // Method description
    console.log( 'Running aPublicMethod' );
  }
  //[# Loop End Public Method #]
  // Private Methods
  //[# Loop Begin Private Method #]
  //[# Begin Signature #][ArrayPattern]
  //:%b(§%t%i,     %t// %i: %t%i
  //:%f  %t%i§) {  %t// %i: %t%i
  _aPrivateMethodIO( anInputParam1,      // INPUT:  description
                     anInputParam2,      // INPUT:  description
                     anOutputParam2 ) {  // OUTPUT: description
    //[# End Signature #]
    console.log( 'Running _aPrivateMethodIO' );
  }
  //[# Loop End Private Method #]
  //[# Begin Skip #]
  _aPrivateMethodI( anInputParam1,      // INPUT: Param description
                    anInputParam2,      // INPUT: Param description
                    anInputParam3 ) {   // INPUT: Param description
    console.log( 'Running _aPrivateMethodI' );
  }
  _aPrivateMethodO( anOutputParam1,     // OUTPUT: Param description
                    anOutputParam2,     // OUTPUT: Param description
                    anInputParam3 ) {   // OUTPUT: Param description
    console.log( 'Running _aPrivateMethodO' );
  }
  //[# End Skip #]
}