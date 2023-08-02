/*
 * TestLoader.js
 *
 * Date: 23.07.2020
 * This is a test
 */

// New comment 

var $ = go.GraphObject.make;  // for conciseness in defining templates

addDSL( dslDest, dslSrc ) {
	dslDest.templateNodeList = dslDest.templateNodeList.concat( dslSrc.templateNodeList );
	dslDest.dataNodeList = dslDest.dataNodeList.concat( dslSrc.dataNodeList );
	dslDest.templateLinkList = dslDest.templateLinkList.concat( dslSrc.templateLinkList );
	dslDest.dataLinkList = dslDest.dataLinkList.concat( dslSrc.dataLinkList );
}
setDSLNameList( dslNameList ) {
	this.dslNameList = dslNameList;
}
getDSLNameList() {
	return( this.dslNameList );
}
