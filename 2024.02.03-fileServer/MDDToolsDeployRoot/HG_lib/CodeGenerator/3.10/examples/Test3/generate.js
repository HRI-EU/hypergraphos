// Load Template Libraries
const tdir = '../../lib';
const ftg = require( `${tdir}/FileTemplateGenerator` );

// Start Template Generator
const cdir = __dirname;
const tg = ftg.getGenerator( `${cdir}/Index.html`, `${cdir}/out.html` );
tg.setLanguage( 'html' );
ftg.processAll( null, null );