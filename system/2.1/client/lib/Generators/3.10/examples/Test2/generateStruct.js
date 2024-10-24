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
const tg = ftg.getGenerator( `${cdir}/getRuleList_Receptionist.js`, `${cdir}/out.js` );
const s = tg.getTemplateStructure();
console.log( '----- Show TEMPLATE STRUCTURE ------');
console.log( JSON.stringify( s, null, 2 ) );
const RootModel = ftg.getModel();
const m = new RootModel();
const d = tg.testModel( s, m );
console.log( '----- Test DATA MODEL ------');
console.log( JSON.stringify( d, null, 2 ) );
