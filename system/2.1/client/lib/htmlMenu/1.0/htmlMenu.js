/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

/*
============================================================================
Module: MDDTools Editor Manager
Date: 10.07.2020
=============================================================================
*/

/*
 * Example of definition of a context menu
 * In the JavaScript file:
 * 
  // if: ( o )=> {} where o has properties
  //  o.item    = selected menu data item
  //  o.obj     = selected node in graph
  //  o.d.diagram = diagram
  //  o.d.tool    = diagram.currentTool,
  //  o.d.cmd     = diagram.commandHandler;
  //  o.d.cmt     = diagram.toolManager.contextMenuTool
  // do: ( o )=> {} where e has properties
  //  o.item    = selected menu data item
  //  o.event   = DOM event
  //  o.d.diagram = diagram
  //  o.d.tool    = diagram.currentTool,
  //  o.d.cmd     = diagram.commandHandler;
  //  o.d.cmt     = diagram.toolManager.contextMenuTool
  const menu = {
    'nodeMenu': [
      { label: 'cut',         if: (o)=> o.d.cmd.canCutSelection(),
                              do: (o)=> o.d.cmd.cutSelection() },
      { label: 'copy',        if: (o)=> o.d.cmd.canCopySelection(),
                              do: (o)=> o.d.cmd.copySelection() },
      { label: 'paste',       if: (o)=> o.d.cmd.canPasteSelection( o.d.cmt.mouseDownPoint ),
                              do: (o)=> o.d.cmd.pasteSelection( o.d.cmt.mouseDownPoint ) },
      { label: 'delete',      if: (o)=> o.d.cmd.canDeleteSelection(),
                              do: (o)=> o.d.cmd.deleteSelection() },
      { label: '---' },
      { label: 'color',       if: (o)=> o.obj !== null, 
                              sub:[
            { label: 'red',   if: (o)=> o.backgroundColor = '#f38181' },
            { label: 'blue',  if: (o)=> o.backgroundColor = '#f38181' },
                              ]}
    ],
    'diagramMenu': [
      { label: 'Open',        if: (o)=> ...,
                              do: (o)=> ... },
      { label: '---',         if: (o)=> ... },
      { label: 'Close',       if: (o)=> ...,
                              do: (o)=> ... },
    ],
  };

  // Create context menu
  const cm = new htmlMenu( myDiagram );
  cm.add( menu, 'contextMenuContainer' );

  // an HTMLInfo object is needed to invoke the code to set up the HTML cxElement
  const nodeContextMenu = $(go.HTMLInfo, {
    show: cm.getShowCallback( 'nodeMenu' ),
    hide: cm.getHideCallback( 'nodeMenu' ),
  });

  myDiagram.nodeTemplate =
    $(go.Node, "Auto",
      {
        contextMenu: nodeContextMenu. // Here set the context menu
      },
      $(go.Shape, "RoundedRectangle",
        ...
    );
  *
  * In the HTML file:
  *
  ...
  <div id="contextMenuContainer" style="position: relative; zIndex: 10000;"></div>
  ...
 */

  class HTMLMenu {
    constructor( diagram, parentId ) {
      this.menuList = {};
      this.diagram = diagram;
      this.parentId = parentId;

      this.hideCX = ()=> {
        if ( this.diagram.currentTool instanceof go.ContextMenuTool) {
          this.diagram.currentTool.doCancel();
        }
      }
    }
    add( menuListData, itemName, divParentId ) {
      divParentId = ( !divParentId? this.parentId: divParentId );

      const addItem = (name, data)=> {
        // If we did not add already the menu => we add
        if( !this.menuList[name] ) {
          // Start creation from root
          const parent = document.getElementById( divParentId );
          // Collect menu info
          const menuData = {
            parent,
            name,
            data,
            contextMenu: null,
          };
          
          // Create context menu
          const menuElement = this._createDOMMenu( menuData );
          menuData.menuElement = menuElement;
          
          // Store the new menu
          this.menuList[name] = menuData;
          
          // We don't want the div acting as a context menu to have a (browser) context menu!
          menuElement.addEventListener( "contextmenu", function(e) {
            e.preventDefault();
            return false;
          }, false);
        }
      }

      if( itemName ) {
        // Data of the menu (items, ...)
        const data = menuListData[itemName];
        addItem( itemName, data );
      } else {
        for( const name in menuListData ) {
          // Data of the menu (items, ...)
          const data = menuListData[name];
          addItem( name, data );
        }
      }
    }
    get( name ) {
      return( this.menuList[name] );
    }
    getGoJSMenu( name ) {
      const contextMenu = $(go.HTMLInfo, {
        show: this.getShowCallback( name ),
        hide: this.getHideCallback( name ),
      });
      return( contextMenu );
    }
    getShowCallback( name ) {
      const menuData = this.get( name );
      // This is the actual HTML context menu:
      const cxElement = menuData.menuElement;
      
      const showCM = ( obj, diagram, tool )=> {
        const hasMenuItem = this._show( name, obj );
        
        // Now show the whole context menu element
        if( hasMenuItem ) {
          cxElement.classList.add( "show-menu" );
          // we don't bother overriding positionContextMenu, we just do it here:
          const mousePt = diagram.lastInput.viewPoint;
          this._computeXY( mousePt, cxElement );
          cxElement.style.left = mousePt.x + 5 + "px";
          cxElement.style.top = mousePt.y + "px";
        }
  
        // Optional: Use a `window` click listener with event capture to
        //           remove the context menu if the user clicks elsewhere on the page
        window.addEventListener( "click", this.hideCX, true );
      };
      return( showCM );
    }
    getHideCallback( name ) {
      const menuData = this.get( name );
      // This is the actual HTML context menu:
      const cxElement = menuData.menuElement;
      
      const hideCM = ()=> {
        cxElement.classList.remove( "show-menu" );
        // Optional: Use a `window` click listener with event capture to
        //           remove the context menu if the user clicks elsewhere on the page
        window.removeEventListener( "click", this.hideCX, true );
      };
      return( hideCM );
    }
    _show( name, obj ) {
      const menuData = this.get( name );
      let hasMenuItem = false;
      
      const d = {
        diagram: this.diagram,
        tool: this.diagram.currentTool,
        cmd: this.diagram.commandHandler,
        cmt: this.diagram.toolManager.contextMenuTool,
      }
      
      const showMenu = ( menuData )=> {
        for( const item of menuData.data ) {
          const o = {
            item,
            obj,
            d,
          };
          if( item.label == '---' ) {
            if( item.if == undefined || item.if( o ) ) {
              item.element.style.display = "block";
            } else {
              item.element.style.display = "none";
            }
          } else {
            if( item.if == undefined || item.if( o ) ) {
              item.element.style.display = "block";
              hasMenuItem = true;
              if( item.sub ) {
                const subMenuData = {
                  data: item.sub,
                };
                showMenu( subMenuData );
              }
            } else {
              item.element.style.display = "none";
            }
          }
        }
      }
      showMenu( menuData );
      return( hasMenuItem );
    }
    _createDOMMenu( menuData ) {
      const d = {
        diagram: this.diagram,
        tool: this.diagram.currentTool,
        cmd: this.diagram.commandHandler,
        cmt: this.diagram.toolManager.contextMenuTool,
      }
      const createMenu = ( menuData )=> {
        // Check if the menu has been already created
        let ul = menuData.parent[menuData.name];
        // if not created => create it
        if( !ul ) {
          // Create ul element 
          ul = document.createElement( 'ul' );
          ul.id = menuData.name;
          ul.className = 'menu';
          menuData.parent.appendChild( ul );
          
          // Create li elements
          for( const item of menuData.data ) {
            // Create the menu item
            if( item.icon ) { // Case of icon menu element
              this._createIconItems( item, d, ul );
            } else if( item.label == '---' ) { // Case of separator element
              this._createSeparator( item, d, ul );
            } else { // Case of text menu element
              this._createTextItem( item, d, ul );
            }
            // Create sub-menu
            if( item.sub ) {
              const subMenuData = {
                parent: item.element,
                name: '',
                data: item.sub,
                d,
              };
              createMenu( subMenuData );
            }
          }
        }
        return( ul );
      }
      
      const ul = createMenu( menuData );
      return( ul );
    }
    _createIconItems( item, d, ul ) {
      if( !Array.isArray( item.icon ) ) {
        item.icon = [ item.icon ]; // Transform icon into array
      }
      if( !Array.isArray( item.label ) ) {
        item.label = [ item.label ]; // Transform label into array
      }
      const div = document.createElement( 'div' );
      div.className = 'menu-icon-container';
      const iconLength = item.icon.length;
      /*
      if( iconLength > 1 ) {
        item.element = [];
      }*/
      for( let i = 0; i < iconLength; ++i ) {
        const icon = item.icon[i];
        const label = ( item.label[i]? item.label[i]: '' );
        const sn = document.createElement( 'span' );
        sn.classList.add( 'oi', 'menu-icon' );
        sn.setAttribute( 'data-glyph', icon );
        sn.title = label;
        sn.setAttribute( 'aria-hidden', 'true' );
        //if( iconLength > 1 ) {
        //  item.element.push( sn );
        //} else {
          item.element = sn;
        //}
        let clickParam = {
          item,
          d,
          index: i,
        };
        sn.onclick = ( event )=> { clickParam.event = event; if( item.do ) item.do( clickParam ) };
        div.appendChild( sn );
      }
      ul.appendChild( div );
    }
    _createSeparator( item, d, ul ) {
      const hr = document.createElement( 'hr' );
      hr.className = 'menu-item-separator';
      item.element = hr;
      ul.appendChild( hr );
    }
    _createTextItem( item, d, ul ) {
      // We create the element first
      const li = document.createElement( 'li' );
      li.id = item.label;
      li.className = 'menu-item';
      li.innerHTML = item.label+( item.sub? '<b>&#9656</b>': '' );
      item.element = li;
      
      let clickParam = {
        item,
        d,
      };
      li.onclick = ( event )=> { clickParam.event = event; if( item.do ) item.do( clickParam ) };
      ul.appendChild( li );
    }
    _computeXY( mousePoint, element ) {
      // Correct x,y so that the element is fully visible
      // in the browser (does not go bellow the browser height/width)
      const style = getComputedStyle( element );
      const sw = parseInt( style.width );
      const sh = parseInt( style.height );
      const bw = window.innerWidth;  // Browser width
      const bh = window.innerHeight; // Browser height

      mousePoint.x = ( bw-(mousePoint.x+100) < sw? bw-sw-50: mousePoint.x );
      mousePoint.y = ( bh-(mousePoint.y+100) < sh? bh-sh-50: mousePoint.y );
    }
  }