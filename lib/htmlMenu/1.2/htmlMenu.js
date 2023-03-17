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
    'nodeMenu':
      {	layout: 'vertical', itemList: [
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
                                layout: 'vertical',	subMenu: [
              { label: 'red',   if: (o)=> o.backgroundColor = '#f38181' },
              { label: 'blue',  if: (o)=> o.backgroundColor = '#f38181' },
                                ]}
      ]},
    ],
    'diagramMenu':
      {	layout: 'vertical', itemList: [
        { label: 'Open',        if: (o)=> ...,
                                do: (o)=> ... },
        { label: '---',         if: (o)=> ... },
        { label: 'Close',       if: (o)=> ...,
                                do: (o)=> ... },
      ]},
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

  /*
const menu = {
  type: 'container',
  element,
  layout,
  itemList: [
    {
      type: 'item',
      element, 
      label,
      subMenu: {}
    },
    {
      type: 'item',
      element,
      separator,
    },
    {
      type: 'container'
      layout,
      itemList: [
        {
          type: 'item',
          element,
          icon,
        },
        {
          type: 'item',
          element,
          icon,
        }
      ]
    },
    {
      type: 'item',
      element, 
      label,
      subMenu: {
        type: 'container',
        element,
        layout,
        itemList: [
          {
            type: 'item',
            element,
            label,
          },
          {
            type: 'item',
            element,
            label,
          }
        ]
      }
    },
    {
      type: 'item',
      element,
      label,
    }
  ]
}
*/

class HTMLMenu {
  constructor( parentId,) {
    // HTML element id of the container of all menu
    this.parentId = parentId;
    this.defaultLayout = 'horizontal';

    // Store here all available menu
    this.menuList = {};       // List of all root menu
    // Store parameters with context name
    this.contextName = 'gojs';
    this.menuItemParamContextList = {};
    this.menuItemParamD = null; // Paramenter 'd' of the 'do' event of menu items

    // Get HTML elements
    this.parentEl = document.getElementById( this.parentId );
  }
  add( menuInfoList, menuName ) {
    // Add the menu
    if( menuInfoList ) {
      if( menuName ) {
        // Add a single menu
        this._addMenu( menuInfoList, menuName );
      } else {
        // Add all available menu
        for( const name in menuInfoList ) {
          this._addMenu( menuInfoList, name );
        }
      }
    }
  }
  get( name ) {
    return( this.menuList[name] );
  }
  addParams( contextName, params ) {
    // Add a new context with item parameters
    this.menuItemParamContextList[contextName] = {
      menuItemParams: params
    };
    // Switch to the new context
    this.switcheParams( contextName );
  }
  switcheParams( contextName ) {
    // Set context
    this.contextName = contextName;
    // Get params
    const params = this.menuItemParamContextList[contextName];
    // Switch to context
    this.menuItemParamD = params.menuItemParams;
  }
  getMenu( name, contextName ) {
    let contextMenu = null;
    // Handle default context
    contextName = ( contextName? contextName: 'gojs' );
    // Select menu getter function from context
    switch( contextName ) {
      case 'gojs':
        // Get GoJS diagram
        const paramInfo = this.menuItemParamContextList['gojs'];
        // Get GoJS diagram
        const diagram = paramInfo.menuItemParams.diagram;
        // Define function to get click x,y
        paramInfo.getMenuClick = ()=> diagram.lastInput.viewPoint,
        // Define function to hide menu
        paramInfo.hideContextMenu = ()=> {
          // If we are visualizing a context menu -> we hide it
          if ( diagram.currentTool instanceof go.ContextMenuTool) {
            diagram.currentTool.doCancel();
          }
        }
        // Create GoJS context menu wrapper object
        contextMenu = $(go.HTMLInfo, {
          show: this._getShowMenuCallback( name, paramInfo ),
          hide: this._getHideMenuCallback( name, paramInfo ),
        });
        break;
    }
    // Return GoJS wrapper object
    return( contextMenu );
  }
  /*--------------------
   * Private Members
   *--------------------*/
  _addMenu( menuInfoList, name ) {
    const menuInfo = menuInfoList[name];
    if( menuInfo ) {
      // Create a new root menu
      this._newRootMenu( menuInfo, name );
    }
  }
  _newRootMenu( menuInfo, name ) {
    if( menuInfo.itemList ) {
      // Get menu parent HTML element
      const parentEl = this.parentEl;
      // Create full menu
      this._createMenu( menuInfo, parentEl, null, name );
      // Add menu to class instance
      this.menuList[name] = menuInfo;
    }
  }
  _createMenu( menuItem, parentEl, parent, name ) {
    // Create HTML menu container
    this._createMenuContainer( menuItem, parentEl, parent, name );
    // Create menu items
    this._createMenuItems( menuItem.itemList, menuItem.element, menuItem );
  }
  _createMenuItems( menuItemList, parentEl, parent ) {
    // Add all items in the menu
    for( const menuItem of menuItemList ) {
      // Create HTML item element
      if( menuItem.fontIcon ) {
        this._createItemFontIcon( menuItem, parentEl, parent );
      } else if( menuItem.svgIcon ) {
        this._createItemSVGIcon( menuItem, parentEl, parent );  
      } else if( menuItem.label ) {
        this._createItemLabel( menuItem, parentEl, parent );
      } else if( menuItem.separator ) {
        this._createItemSeparator( menuItem, parentEl, parent );
      }
      // Create item event handler
      if( !menuItem.separator ) {
        if( menuItem.do ) { // If we have a 'do' we can click
          menuItem.element.onclick = this._getMenuItemOnClick( menuItem );
        }
        if( menuItem.element ) {
          // Assign sub menu event
          menuItem.element.onmouseover = this._getMouseItemOnMouseOver( menuItem );
        }
      }
      // Check if a new item container is necessary
      if( menuItem.itemList ) {
        // Create full menu
        this._createMenu( menuItem, parentEl, parent );
        const el = menuItem.element;
        // Set element properties
        el.classList.remove( 'mdd-menu' );
        el.classList.add( 'mdd-menu-inline' );
      } else if( menuItem.subMenu ) {
        // Store menu item subMenu property
        const subMenuItems = menuItem.subMenu;
        // Overwrite item subMenu with a new container object
        menuItem.subMenu = {
          layout: menuItem.layout,
          itemList: subMenuItems,
        };
        const subMenuItem = menuItem.subMenu;
        // Create sub menu
        this._createMenu( subMenuItem, menuItem.element, menuItem );
      }
    }
  }
  _getMenuItemOnClick =  ( menuItem )=> {
    // Prepare click function
    const onClick = ( event )=> {
      const clickParam = {
        item: menuItem,         // Current selected item
        event: event,           // HTML event info
        d: this.menuItemParamD, // Application specific info (e.g. GoJS info)
      };
      // Call menuItem event
      menuItem.do( clickParam );
    };
    // Return event handler function
    return( onClick );
  }
  _getMouseItemOnMouseOver( menuItem ) {
    const onMouseOver = ( event )=> {
      // Get HTML element
      const el = event.target;
      // Clean all sub menu of our siblings
      const parent = menuItem.parent;
      for( const menuItem of parent.itemList ) {
        if( menuItem.subMenu ) {
          this._cleanFullMenu( menuItem.subMenu );
        }
      }
      if( menuItem.subMenu ) {
        // Get sub menu
        const subMenuItem = menuItem.subMenu;
        // Get paramInfo of current context name
        const paramInfo = this.menuItemParamContextList[this.contextName];
        // Make sub menu visible
        this._makeMenuVisible( subMenuItem, subMenuItem.element, el, paramInfo );
      }
    };
    return( onMouseOver );
  }
  _createMenuContainer( menuItem, parentEl, parent, name ) {
    // Handle default value for layout
    menuItem.layout = ( menuItem.layout? menuItem.layout: this.defaultLayout );
    // Store parent menu item/container
    menuItem.parent = parent;
    // Set menuItem type
    menuItem.type = 'container';
    // Create HTML element
    const el = document.createElement( 'ul' );
    // Set element properties
    el.classList.add( 'mdd-menu' ); 
    el.classList.add( menuItem.layout ); 
    // Set id in case name is defined (root menu needs it)
    if( name ) {
      el.id = name;
    }
    // Add element to parent
    parentEl.appendChild( el );
    menuItem.element = el;
  }
  _createItemFontIcon( menuItem, parentEl, parent ) {
    // Store parent menu item/container
    menuItem.parent = parent;
    // Set menuItem type
    menuItem.type = 'item';
    // Create HTML element
    const el = document.createElement( 'span' );
    // Set element properties
    el.id = menuItem.fontIcon;
    el.classList.add( 'oi', 'mdd-menu-fontIcon' );
    el.setAttribute( 'data-glyph', menuItem.fontIcon );
    el.title = ( menuItem.hint? menuItem.hint: '' );
    el.setAttribute( 'aria-hidden', 'true' );
    // Add element to parent
    parentEl.appendChild( el );
    menuItem.element = el;
  }
  _createItemSVGIcon( menuItem, parentEl, parent ) {
    // Store parent menu item/container
    menuItem.parent = parent;
    // Set menuItem type
    menuItem.type = 'item';
    // Create HTML element
    const el = document.createElement( 'span' );
    // Set element properties
    el.id = menuItem.svgIcon;
    el.classList.add( 'mdd-menu-svgIcon' );
    el.title = ( menuItem.hint? menuItem.hint: '' );
    // Add element to parent
    parentEl.appendChild( el );
    menuItem.element = el;
  }
  _createItemLabel( menuItem, parentEl, parent ) {
    //const subMenuIcon = ( menuItem.itemList? '<b>&#9656</b>': '' );
    const subMenuIcon = ( menuItem.subMenu? '...': '' );
    // Store parent menu item/container
    menuItem.parent = parent;
    // Set menuItem type
    menuItem.type = 'item';
    // Create HTML element
    const el = document.createElement( 'li' );
    // Set element properties
    el.id = menuItem.label;
    el.className = 'mdd-menu-label';
    el.innerHTML = menuItem.label+subMenuIcon;
    // Add element to parent
    parentEl.appendChild( el );
    menuItem.element = el;
  }
  _createItemSeparator( menuItem , parentEl, parent ) {
    // Store parent menu item/container
    menuItem.parent = parent;
    // Set menuItem type
    menuItem.type = 'item';
    // Create HTML element
    const el = document.createElement( 'hr' );
    // Set element properties
    el.className = 'mdd-menu-separator';
    // Add element to parent
    parentEl.appendChild( el );
    menuItem.element = el;
  }
  _getShowMenuCallback( name, paramInfo ) {
    // Get context menu
    const menuInfo = this.get( name );
    // Get constext menu HTML element
    const el = menuInfo.element;
    // Flag to know if at least one item is visible in the menu
    let isMenuItemVisible = false;

    // Define show menu handler
    const _showMenu = ( obj )=> {
      // Make menu visible
      isMenuItemVisible = this._makeMenuVisible( menuInfo, el, obj, paramInfo );
      // Check if at least one item is visible
      if( isMenuItemVisible ) {
        // Add clicked GoJS object in paramInfo
        paramInfo.menuItemParams['obj'] = obj;
        // Compute menu position
        const mouseXY = paramInfo.getMenuClick();
        this._computeRootMenuMouseClickXY( mouseXY, el );
        // Set menu position
        el.style.left = mouseXY.x + 5 + "px";
        el.style.top = mouseXY.y + "px";
        // Optional: Use a `window` click listener with event capture to
        //           remove the context menu if the user clicks elsewhere on the page
        window.addEventListener( 'click', paramInfo.hideContextMenu, true );
      }
    }
    return( _showMenu );
  }
  _makeMenuVisible( menuInfo, parentEl, obj, paramInfo ) {
    // Flag to know if at least one item is visible in the menu
    let isMenuItemVisible = false;
    // Parameter for 'if' menu item condition
    const o = {
      item: null,
      obj,
      d: paramInfo.menuItemParams,
    }
    // Compute visibility for all items
    const computeItemVisibility = ( menuInfo )=> {
      for( const menuItem of menuInfo.itemList ) {
        // Update menu item in o parameter
        o.item = menuItem;
        // Test visibility condition
        if( !menuItem.if || menuItem.if( o ) ) {
          // Set that at least an item is visible
          isMenuItemVisible = true;
        } else {
          // Make the menu item invisible
          menuItem.element.classList.add( 'hide-mdd-menu' );
          // Remove GoJS object (added in _getShowMenuCallback)
          delete paramInfo.menuItemParams.obj;
        }
        if( menuItem.itemList ) {
          // Compute visibility for contained items
          computeItemVisibility( menuItem );
        }
      }
    };

    // Compute menu item visibility (only the current level)
    computeItemVisibility( menuInfo );
    // Show the menu only if at least one item is visible
    if( isMenuItemVisible ) {
      // Make context menu visible (container)
      parentEl.classList.add( 'show-mdd-menu' );
    }
    return( isMenuItemVisible );
  }
  _getHideMenuCallback( name, paramInfo ) {
    // Get context menu
    const menuInfo = this.get( name );
    // Get constext menu HTML element
    const el = menuInfo.element;

    const _hideMenu = ()=> {
      this._makeMenuHidden( menuInfo, el );

      // Optional: Use a `window` click listener with event capture to
      //           remove the context menu if the user clicks elsewhere on the page
      window.removeEventListener( 'click', paramInfo.hideContextMenu, true );
    }
    return( _hideMenu );
  }
  _makeMenuHidden( menuInfo, parentEl ) {
    // Clear full context menu
    this._cleanFullMenu( menuInfo );
    // Hide parent menu container
    parentEl.classList.remove( 'show-mdd-menu' );
  }
  _cleanFullMenu( menuInfo ) {
    for( const menuItem of menuInfo.itemList ) {
      if( menuItem.type == 'item' ) {
        menuItem.element.classList.remove( 'hide-mdd-menu' );
      }
      if( menuItem.itemList ){
        this._cleanFullMenu( menuItem );
      } else if( menuItem.subMenu ) {
        this._cleanFullMenu( menuItem.subMenu );
      }
    }
    if( menuInfo.type == 'container' ) {
      menuInfo.element.classList.remove( 'show-mdd-menu' );
    }
  }
  _computeRootMenuMouseClickXY( mousePoint, el ) {
    // Correct x,y so that the element is fully visible
    // in the browser (does not go bellow the browser height/width)
    const style = getComputedStyle( el );
    // Get width and height (remove 'px')
    const sw = parseInt( style.width );
    const sh = parseInt( style.height );
    // Get browser width and height
    const bw = window.innerWidth;
    const bh = window.innerHeight;
    // Recompute x,y mouse click position
    mousePoint.x = ( bw-(mousePoint.x+100) < sw? bw-sw-50: mousePoint.x );
    mousePoint.y = ( bh-(mousePoint.y+100) < sh? bh-sh-50: mousePoint.y );
  }
}