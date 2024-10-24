/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/


const { timeStamp } = require('console');
const fs = require( 'fs' );
const TemplateGenerator = require( __dirname+'/TemplateGenerator' );

class FileTemplateGenerator {
  getGenerator( inputFileName, outputFileName ) {
    this.inputFileName = inputFileName;
    this.outputFileName = outputFileName;

    this.model = null;

    // Input template
    if( !fs.existsSync( inputFileName ) ) {
      console.error( `ERROR: could not find template file ${inputFileName}` );
      return;
    }

    const text = fs.readFileSync( inputFileName, 'utf-8' );
    const templateSource = text.split( '\n' );
    
    this.tg = new TemplateGenerator( templateSource );

    return( this.tg );
  }
  getModel() {
    if( !this.model ) {
      // Load model if it exist
      if( fs.existsSync( `${this.inputFileName}.model.js` ) ) {
        this.model = require( `${this.inputFileName}.model` );
      }
    }

    return( this.model );
  }
  setModel( model ) {
    this.model = model;
  }
  process( graph, nodeRoot ) {
    const RootModel = this.getModel();
    const m = new RootModel( graph, nodeRoot );
    this.tg.process( m );
  }
  processAll( graph, nodeRoot ) {
    this.process( graph, nodeRoot );
    this.closeGeneration();
  }
  closeGeneration() {
    // Output file    
    const outFD = fs.openSync( this.outputFileName, 'w', 511 ); // 0777 full permission

    // End of templateGenerator main program
    const outText = this.tg.getOutputStr();
    fs.writeSync( outFD, outText );
    fs.closeSync( outFD );
  }
}

module.exports = new FileTemplateGenerator();