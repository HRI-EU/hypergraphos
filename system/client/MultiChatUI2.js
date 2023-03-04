
var mcu; // MultiChat User Interface

function simChat() {
  function getImg( id ) {
    return( `https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_${id}.jpg` );
  }
  // Simulation responses
  const simChatMsg = [
    'Hi Vincent, how are you? How is the project coming along?',
    '',
    'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?',
    'Actually everything was fine. I\'m very excited to show this to our team.',
  ];
  const simMessageResponses = [
    'Why did the web developer leave the restaurant? Because of the table layout.',
    'How do you comfort a JavaScript bug? You console it.',
    'An SQL query enters a bar, approaches two tables and asks: "May I join you?"',
    'What is the most used language in programming? Profanity.',
    '',
    'What is the object-oriented way to become wealthy? Inheritance.',
    'An SEO expert walks into a bar, bars, pub, tavern, public house, Irish pub, drinks, beer, alcohol'
  ];
  function getRandomItem( arr ) {
    return( arr[Math.floor(Math.random()*arr.length)] );
  }

  // Add contacts
  mcu.addContact( 'Vincent Porter', getImg( '01' ), 'online' );
  mcu.addContact( 'Aiden Chavez',   getImg( '02' ) );
  mcu.addContact( 'Mike Thomas', getImg( '03' ), 'online' );
  mcu.addContact( 'Erica Hughes', getImg( '04' ), 'online' );
  mcu.addContact( 'Ginger Johnston', getImg( '05' ), 'online' );
  mcu.addContact( 'Tracy Carpenter', getImg( '06' ) );
  mcu.addContact( 'Christian Kelly', getImg( '07' ) );
  mcu.addContact( 'Monica Ward', getImg( '08' ), 'online' );
  mcu.addContact( 'Dean Henry', getImg( '09' ) );
  mcu.addContact( 'Peyton Mckinney', getImg( '10' ) );

  // Simulate messages
  const simChatMessage = ( idx )=> {
    idx = idx || 1;
    if( idx <= simChatMsg.length ) {
      mcu.addMessage( 'Vincent Porter', simChatMsg[idx-1] );
      setTimeout(()=> {
        mcu.addMessage( 'Erica Hughes', getRandomItem( simMessageResponses ) );
      }, 1300);
  
      setTimeout( ()=> simChatMessage( idx+1 ), 2000 );
    }
  };
  simChatMessage();
}

class EventManager {
  constructor() {
    // Event list callback register
    this.eventList = {};      // Callback are fired every time event occurs
    this.eventOnceList = {};  // Callback are fired one time when event occurs, then they are removed
  }
  setEventList( eventNameList ) {
    for( const eventName of eventNameList ) {
      this.eventList[eventName] = [];
      this.eventOnceList[eventName] = [];
    }
  }
  addEventListener( eventName, callback, isOnce ) {
    if( this.eventList[eventName] ) {
      if( isOnce ) {
        this.eventOnceList[eventName].push( callback );
      } else {
        this.eventList[eventName].push( callback );
      }
    } else {
      console.error( `Event not found: ${eventName}` );
    }
  }
  clearEventListerner( eventName ) {
    if( this.eventList[eventName] ) {
      this.eventList[eventName] = [];
    }
  }
  fireEventListener( event, eventInfo ) {
    if( this.eventList[event] ) {
      for( const callback of this.eventList[event] ) {
        if( typeof( callback ) == 'function' ) {
          callback( eventInfo );
        }
      }
      if( this.eventOnceList[event].length ) {
        for( const callback of this.eventOnceList[event] ) {
          if( typeof( callback ) == 'function' ) {
            callback( eventInfo );
          }
        }
        this.eventOnceList[event] = [];
      }
    }
  }
}

function start() {
  mcu = new MultiChatUI();

//mcu.addContact( 'God', '../actors/God.jpg', 'online' );
//// Implement: mcu.removeContact( name )
//
//// Listen to chat commands that needs to be sent to the simulator engine
//mcu.addEventListener( 'onCommandSend',          sendCommand );
//// Register to get messages from the simulator engine
//window.addEventListener( 'message', (e)=> receiveCommand( e.data ) );

  simChat();  // Uncomment html include of SimChat.js
}
function receiveCommand( command ) {
  if( command.startsWith( '&' ) ) {
    eval( command.substring( 1 ) );
  }
}
function sendCommand( command ) {
  // Check if is a javascript command
  if( command.startsWith( '&' ) ) {
    // This is a JS command to execute
  } else {
    // Remove 'I' if found at start
    if( command.startsWith( 'I' ) ) {
      command = command.substring( 1 ).trim();
    }
    // Put current contact name at beginning of command
    const name = mcu.getCurrentContactName();
    command = `${name} ${command}`;
  }
  // Send command
  window.opener.postMessage( command, '*' );
}

class MultiChatUI extends EventManager {
  constructor() {
    super();

    // Cache DOM
    this.chatHistory = document.getElementById( 'chat-history' );
    this.send = document.getElementById( 'send' );
    this.textarea = document.getElementById( 'message-to-send' );
    this.chatHistoryList = document.getElementById( 'chat-history-list' );
    this.contactList = document.getElementById( 'contactList' );
    this.chatHeader = document.getElementById( 'chat-header' );
    this.chatHeaderImage = document.getElementById( 'chat-header-image' );
    this.chatHeaderWith = document.getElementById( 'chat-with' );
    this.chatHeaderMsg = document.getElementById( 'chat-num-messages' );
    
    // Bind events
    this.send.onclick = this._pushMessage.bind(this);
    this.textarea.onkeyup = this._pushMessageEnter.bind(this);

    // Sender container
    this.contactInfoList = [];
    this.currentContactInfo = null;
    this.chatOwner = '';

    // Initialize events
    this.setEventList([
      'onCommandSend',
    ]);
  }
  addContact( name, image, status ) {
    status = status || 'offline';
    const history = [];
    const ctInfo = { name, image, status, history };

    const ctTemplate = document.getElementById( 'contact-template' );
    const template = Handlebars.compile( ctTemplate.innerHTML );
    this.contactList.insertAdjacentHTML( 'beforeend', template( ctInfo ) );

    ctInfo.el = this.contactList.children[this.contactList.childElementCount-1];

    this.contactInfoList.push( ctInfo );

    this._updateSearch();

    if( !this.currentContactInfo ) {
      this.currentContactInfo = ctInfo;
      this.setChat( ctInfo.name );
    }
  }
  getCurrentContactName() {
    const name = ( this.currentContactInfo? this.currentContactInfo.name: '' );
    return( name );
  }
  setChat( name ) {
    for( const ctInfo of this.contactInfoList ) {
      if( ctInfo.name == name ) {
        this.chatHeaderImage.src = ctInfo.image;
        this.chatHeaderWith.innerText = `Chat with ${name}`;
        this.chatHeaderMsg.innerText = `already ${Math.floor(Math.random()*1000)} messages`;

        this.currentContactInfo = ctInfo;
      }
    }
  }
  setStatus( name, status ) {
    status = status || 'offline';
    for( const ctInfo of this.contactInfoList ) {
      if( ctInfo.name == name ) {
        const elStatus = ctInfo.el.getElementsByClassName('status');
        elStatus[0].innerHTML =  `<i class="fa fa-circle ${status}"></i> ${status}`;
      }
    }
    
    if( name == this.currentContactInfo.name ) {
      const elStatus = this.chatHeader.getElementsByClassName('status');
      elStatus[0].innerHTML =  `<i class="fa fa-circle ${status}"></i> ${status}`;
    }
  }
  addMessage( sender, message ) {
    this._render( message, sender );
  }
  scrollToBottom() {
    const firstChild = ( this.chatHistory.children[0]? this.chatHistory.children[0]: {scrollHeight: 0} );
    const scroll = firstChild.scrollHeight;
    this.chatHistory.scrollTop = scroll;
  }
  _pushMessage() {
    this._render( this.textarea.value.trim() );
  }
  _pushMessageEnter( event ) {
    // enter was pressed
    if( event.keyCode === 13 ) {
      this._pushMessage();
      return( false );
    }
  }
  _render( message, sender ) {
    // Default is current contact
    sender = sender || this.currentContactInfo.name;
    message = message || '';

    if( !this.chatOwner ) {
      this.chatOwner = sender;
    }

    this.scrollToBottom();
    
    if( sender == this.chatOwner ) {
      // Render message template
      const templateName = 'message-response-template'+( message.trim() == ''? '-nomsg': '' );
      const msgTemplate = document.getElementById( templateName );
      const template = Handlebars.compile( msgTemplate.innerHTML );
      const context = {
        name: this.currentContactInfo.name,
        response: message,
        time: this._getCurrentTime()
      };

      this.chatHistoryList.insertAdjacentHTML( 'beforeend', template( context ) );
    } else {
      // Render responses template
      const templateName = 'message-template'+( message.trim() == ''? '-nomsg': '' );
      const rspTemplate = document.getElementById( templateName );
      const templateResponse = Handlebars.compile( rspTemplate.innerHTML );
      const contextResponse = {
        name: sender,
        messageOutput: message,
        time: this._getCurrentTime()
      };

      this.chatHistoryList.insertAdjacentHTML( 'beforeend', templateResponse( contextResponse ) );
    }

    this.fireEventListener( 'onCommandSend', message );

    this.textarea.value = '';
    this.scrollToBottom();
  }
  _getCurrentTime() {
    return( new Date().toLocaleTimeString().
            replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3") );
  }
  _updateSearch() {
    this.options = { valueNames: ['name'] };
    const userList = new List( 'people-list', this.options );
    const noItems = document.createElement( 'li' );
    noItems.id = 'no-items-found';
    noItems.innerText = 'No items found';
    
    userList.on( 'updated', (list)=> {
      if( list.matchingItems.length === 0 ) {
        const el = list.list;
        el.insertAdjacentElement( 'beforeend', noItems );
      } else {
        if( noItems.parentElement ) {
          noItems.parentElement.removeChild( noItems );
        }
      }
    });
  }
}
