// Load Template Libraries
const tdir = '../../lib';
const ftg = require( `${tdir}/FileTemplateGenerator` );

// Start Template Generator
const cdir = __dirname;
ftg.getGenerator( `${cdir}/TestClass.js`, `${cdir}/out.js` );
ftg.processAll();