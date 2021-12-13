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
          menuElement.id = menuData.name;
          parent.appendChild( menuElement );
          
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
          cxElement.classList.add( "show-mdd-menu" );
          cxElement.style.visibility = 'visible';
          // we don't bother overriding positionContextMenu, we just do it here:
          const mousePt = diagram.lastInput.viewPoint;
          this._computeMouseClickXY( mousePt, cxElement );
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
        cxElement.classList.remove( "show-mdd-menu" );
        cxElement.style.visibility = 'hidden';
        // Optional: Use a `window` click listener with event capture to
        //           remove the context menu if the user clicks elsewhere on the page
        window.removeEventListener( "click", this.hideCX, true );
      };
      return( hideCM );
    }
    _show( name, obj ) {
      const menuData = this.get( name );
      let isMenuItemVisible = false;
      
      const d = {
        diagram: this.diagram,
        tool: this.diagram.currentTool,
        cmd: this.diagram.commandHandler,
        cmt: this.diagram.toolManager.contextMenuTool,
      }
      
      const showMenu = ( menuData, isVisible )=> {
        for( const item of menuData.data.itemList ) {
          const o = {
            item,
            obj,
            d,
          };
          if( item.if == undefined || item.if( o ) ) {
            item.element.style.display = 'inline-flex';
            //if( isVisible ) {
              item.element.style.visibility = 'visible';
            //}
            isMenuItemVisible = true;
            if( item.itemList ) {
              const subMenuData = {
                data: item,
              };
              showMenu( subMenuData, false );
            }
          } else {
            item.element.style.display = 'none';
            item.element.style.visibility = 'hidden';
          }
        }
      }
      showMenu( menuData, true );
      return( isMenuItemVisible );
    }
    _createDOMMenu( menuData ) {
      const d = {
        diagram: this.diagram,
        tool: this.diagram.currentTool,
        cmd: this.diagram.commandHandler,
        cmt: this.diagram.toolManager.contextMenuTool,
      }
      const createMenu = ( menu )=> {
        let m = null;
        if( menu.layout ) {
          m = document.createElement( 'ul' );
          m.style.visibility = 'hidden';
          m.classList.add( 'mdd-menu' ); 
          m.classList.add( menu.layout ); 
          menu.element = m;
          if( menu.itemList ) {
            let isMenuItemCreated = true;
            for( const item of menu.itemList ) {
              const mi = createMenuItem( item );
              if( mi ) {
                m.appendChild( mi );
              } else {
                isMenuItemCreated = false;
              }
              if( item.itemList ) {
                const sm = createMenu( item );
                if( !isMenuItemCreated ) {
                  sm.classList.remove( 'mdd-menu' );
                  sm.classList.add( 'mdd-menu-inline' ); 
                }
                const parent = ( mi? mi: m );
                parent.appendChild( sm );
              } else if( !isMenuItemCreated ) {
                console.warn( 'Warning: no valid menu item found '+JSON.stringify( item ) );
              }
            }
          }
        }
        return( m );
      }
      const createMenuItem = ( menuItem )=> {
        let mi = null;
        const clickParam = {
          item: menuItem,
          d,
        };
        const setElementChildVisibility = ( element, status, deepthSkip, depthApply )=> {
          // This function will set visibility for a sub tree of element
          // it will:
          //   First: skip subtree nodes untile deepthSkip become 0
          //   Then apply visibility untill deepthApply become 0
          if( element.childElementCount ) {
            const childList = element.children;
            for( const el of childList ) {
              if( deepthSkip == 0 ) {  // If  Skip is over -> apply visibility
                el.style.visibility = status;
              }
              if( deepthSkip > 0 ) {  // If need to skip more -> go next level
                setElementChildVisibility( el, status, deepthSkip-1 ,depthApply )
              } else {
                if( depthApply > 0 ) {  // If need to apply more -> go next level
                  setElementChildVisibility( el, status, 0, depthApply-1 )
                }
              }
            }
          }
        }
        const onClick = ( event )=> {
          clickParam.event = event;
          if( menuItem.do )
            menuItem.do( clickParam ) 
        };
        const onMouseOver = ( event )=> {
          const el = event.target;
          const siblingList = el.parentElement.children;
          for( const sibling of siblingList ) {
            if( sibling.classList.contains( 'mdd-menu-inline' ) ) {
              setElementChildVisibility( sibling, 'hidden', 1, 2 );
            } else {
              setElementChildVisibility( sibling, 'hidden', 0, 2 );
            }
          }
          setElementChildVisibility( el, 'visible', 0, 2 );
        }
        //const subMenuIcon = ( menuItem.itemList? '<b>&#9656</b>': '' );
        const subMenuIcon = ( menuItem.itemList? '...': '' );

        if( menuItem.fontIcon ) {
          mi = document.createElement( 'span' );
          mi.classList.add( 'oi', 'mdd-menu-fontIcon' );
          mi.setAttribute( 'data-glyph', menuItem.fontIcon );
          mi.title = ( menuItem.hint? menuItem.hint: '' );
          mi.setAttribute( 'aria-hidden', 'true' );
          //mi.innerHTML = subMenuIcon;
          menuItem.element = mi;
          mi.onclick = onClick;
          mi.onmouseover = onMouseOver;
        } else if( menuItem.separator ) {
          mi = document.createElement( 'hr' );
          mi.className = 'mdd-menu-separator';
          menuItem.element = mi;
        } else if( menuItem.label ) {
          mi = document.createElement( 'li' );
          mi.id = menuItem.label;
          mi.className = 'mdd-menu-label';
          mi.innerHTML = menuItem.label+subMenuIcon;
          menuItem.element = mi;
          mi.onclick = onClick;
          mi.onmouseover = onMouseOver;
        }
        //if( mi ) {
          //mi.style.visibility = 'hidden';
        //}
        
        return( mi );
      }

      let ul = null;
      if( menuData.data ) {
        ul = createMenu( menuData.data, menuData.name );
      }
      return( ul );
    }
    _computeMouseClickXY( mousePoint, element ) {
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