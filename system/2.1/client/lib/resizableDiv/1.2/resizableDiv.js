/*
   Install control points around a div to move/resize it
 */

/* 
   Install events for resizing object
   div: div identifier (id or class, ...)
   measure: '%' or 'px'
*/
function setDivAsResizable( div, measure, onResizeDone ) {
	
	// Default value 'px'
	measure = ( measure === undefined? 'px': measure );
	
	const mainDivObj = document.querySelector( div );
	const controlDivList = document.querySelectorAll( div + ' .resizer' );
	const controlDivHeader = document.querySelectorAll( div + ' .resizerHeader' );
	
	for( const controlDiv of controlDivList ) {
		installResizeHandler( controlDiv, mainDivObj, measure, onResizeDone );
	}
	if( controlDivHeader[0] ) {
		installResizeHandler( controlDivHeader[0], mainDivObj, measure, onResizeDone );
	}
}

function installResizeHandler( controlDiv, mainDivObj, measure, onResizeDone ) {
	const status = {
		minSize: 2,
		startX: 0,
		startY: 0,
		startMouseX: 0,
		startMouseY: 0,
		startWidth: 0,
		startHeight: 0,
		isDoResizeCalled: false,
	};
	// Size converter
	const getXPxInto = (value)=> {
		const browserWidth = window.innerWidth;
		if( measure == '%' ) {
			return( ((value/browserWidth)*100) + '%' );
		} else {
			return( value + 'px' );
		}
	};
	const getYPxInto = (value)=> {
		const browserHeight = window.innerHeight;
		if( measure == '%' ) {
			return( ((value/browserHeight)*100) + '%' );
		} else {
			return( value + 'px' );
		}
	};

	const doResize = ( e )=> {
		status.isDoResizeCalled = true;

		if( controlDiv.classList.contains( 'all' ) || controlDiv.classList.contains( 'resizerHeader' ) ) {
			const left = status.startX + (e.pageX - status.startMouseX);
			if( left > status.minSize ) {
				mainDivObj.style.left = getXPxInto( left );
			}
			const top = status.startY + (e.pageY - status.startMouseY);
			if( top > status.minSize ) {
				mainDivObj.style.top = getYPxInto( top );
			}					
		} else if( controlDiv.classList.contains( 'top' ) ||
							 controlDiv.classList.contains( 'topAll' ) ) {
			const height = status.startHeight - (e.pageY - status.startMouseY);
			const top = status.startY + (e.pageY - status.startMouseY);
			if( ( height > status.minSize ) && ( top > status.minSize ) ) {
				mainDivObj.style.height = getYPxInto( height );
				mainDivObj.style.top = getYPxInto( top );
			}
		} else if( controlDiv.classList.contains( 'top-right' ) ) {
			const width = status.startWidth + (e.pageX - status.startMouseX);
			if( width > status.minSize ) {
				mainDivObj.style.width = getXPxInto( width );
			}
			const height = status.startHeight - (e.pageY - status.startMouseY);
			const top = status.startY + (e.pageY - status.startMouseY);
			if( ( height > status.minSize ) && ( top > status.minSize ) ) {
				mainDivObj.style.height = getYPxInto( height );
				mainDivObj.style.top = getYPxInto( status.startY + (e.pageY - status.startMouseY) );
			}
		} else if( controlDiv.classList.contains( 'top-left' ) ) {
			const width = status.startWidth - (e.pageX - status.startMouseX);
			const left = status.startX + (e.pageX - status.startMouseX);
			if( ( width > status.minSize ) && ( left > status.minSize ) ) {
				mainDivObj.style.width = getXPxInto( width );
				mainDivObj.style.left = getXPxInto( left );
			}
			const height = status.startHeight - (e.pageY - status.startMouseY);
			if( height > status.minSize ) {
				mainDivObj.style.height = getYPxInto( height );
				mainDivObj.style.top = getYPxInto( status.startY + (e.pageY - status.startMouseY) );
			}
		} else if( controlDiv.classList.contains( 'left' ) ||
							 controlDiv.classList.contains( 'leftAll' ) ) {
			const width = status.startWidth - (e.pageX - status.startMouseX);
			const left = status.startX + (e.pageX - status.startMouseX);
			if( ( width > status.minSize ) && ( left > status.minSize ) ) {
				mainDivObj.style.width = getXPxInto( width );
				mainDivObj.style.left = getXPxInto( left );
			}
		} else if( controlDiv.classList.contains( 'right' ) ||
							 controlDiv.classList.contains( 'rightAll' ) ) {
			const width = status.startWidth + (e.pageX - status.startMouseX);
			if( width > status.minSize ) {
				mainDivObj.style.width = getXPxInto( width );
			}
		} else if( controlDiv.classList.contains( 'bottom-right' ) ) {
			const width = status.startWidth + (e.pageX - status.startMouseX);
			if( width > status.minSize ) {
				mainDivObj.style.width = getXPxInto( width );
			}
			const height = status.startHeight + (e.pageY - status.startMouseY);
			if( height > status.minSize ) {
				mainDivObj.style.height = getYPxInto( height );
			}
		} else if( controlDiv.classList.contains( 'bottom-left' ) ) {
			const width = status.startWidth - (e.pageX - status.startMouseX);
			const left = status.startX + (e.pageX - status.startMouseX);
			if( ( width > status.minSize ) && ( left > status.minSize ) ) {
				mainDivObj.style.width = getXPxInto( width );
				mainDivObj.style.left = getXPxInto( left );
			}
			const height = status.startHeight + (e.pageY - status.startMouseY);
			if( height > status.minSize ) {
				mainDivObj.style.height = getYPxInto( height );
			}
		} else if( controlDiv.classList.contains( 'bottom' ) ||
							 controlDiv.classList.contains( 'bottomAll' ) ) {
			const height = status.startHeight + (e.pageY - status.startMouseY);
			if( height > status.minSize ) {
				mainDivObj.style.height = getYPxInto( height );
			}
		}
	};
	
	const  doStopResize = ()=> {
		window.removeEventListener( 'mousemove', doResize );
		if( onResizeDone ) {
			if( status.isDoResizeCalled ) {
				onResizeDone();
			}
			status.isDoResizeCalled = false;
		}
	};
	
	controlDiv.addEventListener( 'mousedown', (e)=> {
		e.preventDefault()
		const cStyle = getComputedStyle(mainDivObj, null);
		status.startWidth = parseFloat( cStyle.getPropertyValue( 'width' ).replace( 'px', '' ) );
		status.startHeight = parseFloat( cStyle.getPropertyValue( 'height' ).replace( 'px', '' ) );
		
		const cRect = mainDivObj.getBoundingClientRect();
		status.startX = cRect.left;
		status.startY = cRect.top;
		status.startMouseX = e.pageX;
		status.startMouseY = e.pageY;
		
		window.addEventListener( 'mousemove', doResize );
		window.addEventListener( 'mouseup',  doStopResize );
	});
}