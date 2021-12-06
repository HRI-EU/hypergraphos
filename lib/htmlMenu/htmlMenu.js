/*
=============================================================================
Licensed Materials - Property of LorinWare Prod.
(C) Copyright Christophe LORIN 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Christophe LORIN.
=============================================================================
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
      { label: 'cut',         if: ( o )=> o.d.cmd.canCutSelection(),
                              do: ( o )=> o.d.cmd.cutSelection() },
      { label: 'copy',        if: ( o )=> o.d.cmd.canCopySelection(),
                              do: ( o )=> o.d.cmd.copySelection() },
      { label: 'paste',       if: ( o )=> o.d.cmd.canPasteSelection( o.d.cmt.mouseDownPoint ),
                              do: ( o )=> o.d.cmd.pasteSelection( o.d.cmt.mouseDownPoint ) },
      { label: 'delete',      if: ( o )=> o.d.cmd.canDeleteSelection(),
                              do: ( o )=> o.d.cmd.deleteSelection() },
    ],
    'diagramMenu': [
      { label: 'Open',        if: ( o )=> ...,
                              do: ( o )=> ... },
      { label: 'Close',       if: ( o )=> ...,
                              do: ( o )=> ... },
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
          if( item.if( o ) ) {
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
        // Create ul element 
        const ul = document.createElement( 'ul' );
        ul.id = menuData.name;
        ul.className = 'menu';
        menuData.parent.appendChild( ul );
        
        // Create li elements
        for( const item of menuData.data ) {
          // We create the element first
          const li = document.createElement( 'li' );
          li.id = item.label;
          li.className = 'menu-item';
          li.innerHTML = item.label;
          item.element = li;
          
          let clickParam = {
            item,
            d,
          };
          li.onclick = ( event )=> { clickParam.event = event; if( item.do ) item.do( clickParam ) };
          ul.appendChild( li );
          
          if( item.sub ) {
            const subMenuData = {
              parent: li,
              name: '',
              data: item.sub,
              d,
            };
            createMenu( subMenuData );
          }
        }
        return( ul );
      }
      
      const ul = createMenu( menuData );
      return( ul );
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