/*
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: Event Manager
Date: 10.07.2020
=============================================================================
*/

class EventManager {
	constructor() {
		this.eventList = {};
		this.call = {};
	}
	add( name, help, params ) {
		if( name && !this.eventList[name] ) {  // Add a new event if not already there
			const callbackList = [];
			params = ( params? params: {} );
			help = ( help? help: '' )
			this.eventList[name] = { help, params, callbackList };
			this.call[name] = (...paramList)=> this.fire( name, ...paramList );
		}
	}
	addList( eventList ) {
		if( eventList ) {
			for( const name in eventList ) {
				const info = eventList[name];
				this.add( name, info.help, info.params );
			}
		}
	}
	register( name, callback ) {
		if( name && this.eventList[name] ) {
			if( callback ) { // Register the callback if defined
				this.eventList[name].callbackList.push( callback );
			}
		}
	}
	registerList( callbackList ) {
		if( callbackList ) {
			for( const name in callbackList ) {
				const callback = callbackList[name];
				this.register( name, callback );
			}
		}
	}
	unregister( name, callback ) {
		if( name && this.eventList[name] ) {
			if( callback == undefined ) { // Unregister all callback
				const callbackList = [];
				this.eventList[name] = { paramInfo, callbackList };
			} else {  // Unregister a single callback
				const index = this.eventList[name].callbackList.indexOf( callback );
				if( index > -1 ) {
					this.eventList[name].callbackList.splice( index, 1 );
				}
			}
		}
	}
	fire( name, ...paramList ) { // after name, all other parameters will be passed to the callback
		if( name && this.eventList[name] &&
			  this.eventList[name].callbackList.length ) { // Fire event if not empty
			for( const callback of this.eventList[name].callbackList ) {
				callback( ...paramList );
			}
		}
	}
}