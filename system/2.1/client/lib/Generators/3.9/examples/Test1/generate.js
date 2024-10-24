/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

// Load Template Libraries
const tdir = '../../lib';
const ftg = require( `${tdir}/FileTemplateGenerator` );

// Start Template Generator
const cdir = __dirname;
ftg.getGenerator( `${cdir}/TestClass.js`, `${cdir}/out.js` );
ftg.processAll();