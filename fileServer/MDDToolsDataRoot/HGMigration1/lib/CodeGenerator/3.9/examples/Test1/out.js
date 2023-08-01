/*
  MyClass.js

  Description: This is my class
*/

const fs = require( 'fs' );
const dir = require( 'dir' );

//[# Definite Class #][Replace]
//:JSTestClass -()-> m.className
class JSTestClass {
  constructor() {
    this.date = new Date();
  }
  // Public Methods
  add( userName, userSurname ) { // This method add a new user
    console.log( 'Running aPublicMethod' );
  }
  getUserName( userSurname ) { // This method getuser's name
    console.log( 'Running aPublicMethod' );
  }
  getUserSurname( userName ) { // This method getuser's surname
    console.log( 'Running aPublicMethod' );
  }
  save() { // This method save the data
    console.log( 'Running aPublicMethod' );
  }
  // Private Methods
  saveInTable( name,          // INPUT: Name of table
               tableType ) {  // INPUT: Type of table
    console.log( 'Running _aPrivateMethodIO' );
  }
  getTableType( tableName,     // INPUT:  Name of table
                fName,         // INPUT:  Type of the field
                tableT,        // OUTPUT: Type of table
                fieldType ) {  // OUTPUT: Type of the field
    console.log( 'Running _aPrivateMethodIO' );
  }
  geSynchronoustTableType( tableName,     // INPUT:  Name of table
                           fName,         // INPUT:  Type of the field
                           tableT,        // OUTPUT: Type of table
                           fieldType ) {  // OUTPUT: Type of the field
    console.log( 'Running _aPrivateMethodIO' );
  }
  checInTable( tableCount,     // OUTPUT: Name of table
               tableMax ) {    // OUTPUT: Type of table
    console.log( 'Running _aPrivateMethodIO' );
  }
}