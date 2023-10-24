class HChat {
  constructor( divId, width, height ) {
    this.divId = divId;
    this.divEl = document.getElementById( divId );
    this.divEl.classList.add( 'hchat-div' );
    this._initChat();
    this.userList = {};
    this.resize( width, height );
    // Create chat skeleton
    this.inputMessage = this._getElementById( 'hchat-input-message' );
    // Cache divs
    this.messageAreaEl = this._getElementById('hchat-area');
    this.senderDropDownEl = this._getElementById('hchat-sender-dropdown');
    this.selectedSenderEl = this._getElementById('hchat-sender_selection');
    this.selectedSenderEl.onclick = this._setSenderDropdown.bind( this, true );
    
    this.receiverDropDownEl = this._getElementById('hchat-receiver-dropdown');
    this.selectedReceiverEl = this._getElementById('hchat-receiver-selection');
    this.selectedReceiverEl.onclick = this._setReceiverDropdown.bind( this, true );

    this._getElementById('hchat-input-message').addEventListener('keydown', (event)=> {
      if (event.keyCode === 13) { // 13 is the key code for the Enter key
        let messageText = this._getElementById('hchat-input-message').value.trim();
        this._addChatMessage( messageText );
        this._fireOnSend( messageText );
      }
    });
    this._getElementById('hchat-send-button').addEventListener("click", ()=> {
      this._hideAllDropdown();
      let messageText = this._getElementById('hchat-input-message').value.trim();
      this._addChatMessage( messageText );
      this._fireOnSend( messageText );
    });

    this.messageAreaEl.addEventListener( 'click', this._hideAllDropdown.bind( this ) );
    this.inputMessage.addEventListener( 'focus', this._hideAllDropdown.bind( this ) );
    document.addEventListener( 'click', (e)=> {
      if( e.target && !e.target.className.startsWith( 'hchat-' ) ) {
        this._hideAllDropdown();
      }
    });
    
    this.onSend = null;
  }
  registerEvent( eventName, callback ) {
    switch( eventName.toLowerCase() ) {
      case 'onsend':
        this.onSend = callback;
        break;
    }
  }
  resize( width, height ) {
    if( width ) {
      this.divEl.style.width = width+( parseInt( width ) == width? 'px': '');
    }
    if( height ) {
      this.divEl.style.height = height+( parseInt( height ) == height? 'px': '');
    }
  }
  getHistory() {
    const result = [];
    for( const m of document.querySelectorAll(`#${this.divId} .hchat-text`) ) {
      const sender = m.getAttribute( 'sender' );
      const receiver = m.getAttribute( 'receiver' );
      result.push( { text: m.innerText, sender, receiver } );
    }
    return( result );
  }
  setHistory( history ) {
    for( const item of history ) {
      this.addMessage( item.serder, item.receiver, item.text );
    }
  }
  addUser( userName, imageURL, isSender, isReceiver ) {
    isSender = ( isSender == undefined? true: isSender );
    isReceiver = ( isReceiver == undefined? true: isReceiver );
    const color = this._generateRandomColor();
    this.userList[userName] = { imageURL, isSender, isReceiver, color };

    // Populate dropdown
    if( isSender ) {
      const itemEl = document.createElement( 'div' );
      itemEl.className = 'hchat-image-option';
      itemEl.onclick = this._selectSenderImage.bind( this, userName );
      itemEl.innerHTML = `<img src="${imageURL}" class="hchat-user-img">${userName}`;
      this.senderDropDownEl.append( itemEl );

      if( this.senderDropDownEl.childElementCount == 1 ) {
        this.selectedSenderEl.innerHTML = `
          <img src="${imageURL}" id="hchat-sender_selection-img" class="hchat-user-img">
          <span id="hchat-sender_selection-name">${userName}</span>
          <div class="hchat-arrow">▼</div>
        `;
        this.senderSelectedImg = this._getElementById('hchat-sender_selection-img');
        this.senderSelectedName = this._getElementById('hchat-sender_selection-name');
      }
    }
    if( isReceiver ) {
      const itemEl = document.createElement( 'div' );
      itemEl.className = 'hchat-image-option';
      itemEl.onclick = this._selectReceiverImage.bind( this, userName );
      itemEl.innerHTML = `<img src="${imageURL}" class="hchat-user-img">${userName}`;
      this.receiverDropDownEl.append( itemEl );

      if( this.receiverDropDownEl.childElementCount == 1 ) {
        this.selectedReceiverEl.innerHTML = `
          <img src="${imageURL}" id="hchat-receiver-selection-img" class="hchat-user-img">
          <span id="hchat-receiver-selection-name">${userName}</span>
          <div class="hchat-arrow">▼</div>
        `;
        this.receiverSelectedImg = this._getElementById('hchat-receiver-selection-img');
        this.receiverSelectedName = this._getElementById('hchat-receiver-selection-name');
      }
    }
  }
  addMessage( sender, receiver, messageText ) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("hchat-message");
    const senderImgSrc =  this.userList[sender].imageURL; 
    const receiverImgSrc =  this.userList[receiver].imageURL; 
    const senderColor = this.userList[sender].color
    newMessage.innerHTML = `
      <img src="${senderImgSrc}" alt="Sender Icon" class="hchat-user-img">
      <div class="hchat-text" style="background-color: ${senderColor}" sender="${sender}" receiver="${receiver}">${messageText}</div>
      <img src="${receiverImgSrc}" alt="Receiver Icon" class="hchat-user-img">
    `;
    const messageList = this._getElementById('hchat-area');
    messageList.append(newMessage);
    messageList.scrollTop = messageList.scrollHeight;
    this._getElementById('hchat-input-message').value = "";
  }
  clear() {
    this.messageAreaEl.innerHTML = '';
  }
  _addChatMessage( messageText ) {
    if(messageText) {
      const sender = this._getCurrentSender();
      const receiver = this._getCurrentReceiver();
      this.addMessage( sender, receiver, messageText );
    }
  }
  _getCurrentSender() {
    const selectedName = this._getElementById('hchat-sender_selection-name');
    return( selectedName.innerText );
  }
  _getCurrentReceiver() {
    const selectedName = this._getElementById('hchat-receiver-selection-name');
    return( selectedName.innerText );
  }
  _setSenderDropdown( isVisible ) {
    if( this.receiverDropDownEl.style.display == 'block' ) {
      this._setReceiverDropdown( false );
    }
    this.senderDropDownEl.style.display = !isVisible ? 'none' : 'block';
  }
  _setReceiverDropdown( isVisible ) {
    if( this.senderDropDownEl.style.display == 'block' ) {
      this._setSenderDropdown( false );
    }
    this.receiverDropDownEl.style.display = !isVisible ? 'none' : 'block';
  }
  _hideAllDropdown() {
    this._setSenderDropdown( false );
    this._setReceiverDropdown( false );
  }
  _selectSenderImage(userName) {
    this.senderSelectedImg.src = this.userList[userName].imageURL;
    this.senderSelectedName.innerText = userName;
    this._setSenderDropdown( false );
  }
  _selectReceiverImage(userName) {
    this.receiverSelectedImg.src = this.userList[userName].imageURL;
    this.receiverSelectedName.innerText = userName;
    this._setReceiverDropdown( false );
  }
  _generateRandomColor(saturation = 80, lightness = 80) {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  }
  _fireOnSend( messageText ) {
    if( this.onSend ) {
      const messageInfo = {
        sender: this._getCurrentSender(),
        receiver: this._getCurrentReceiver(),
        text: messageText,
      }
      this.onSend( messageInfo );
    }
  }
  _initChat() {
    this.divEl.innerHTML = `
      <div id="hchat-area-header"></div>
      <div id="hchat-area" class="hchat-container">
      </div>
      <div id="hchat-area-footer"></div>
      <!-- Input Area -->
      <div id="hchat-input-area" class="hchat-container">
        <div class="hchat-sender-dropdown hchat-custom-dropdown">
          <div id="hchat-sender_selection" class="hchat-selected-image">
          </div>
          <div class="hchat-dropdown-content" id="hchat-sender-dropdown">
          </div>
        </div>

        <input type="text" id="hchat-input-message" placeholder="Type your message..."> 
        <img  id="hchat-send-button" src="${HChat.path}/SendButton.png">
        
        <div class="hchat-receiver-dropdown hchat-custom-dropdown">
          <div id="hchat-receiver-selection" class="hchat-selected-image">
          </div>
          <div class="hchat-dropdown-content" id="hchat-receiver-dropdown">
          </div>
        </div>
      </div>`;
  }
  _getElementById( id ) {
    return( document.querySelector( `#${this.divId} #${id}` ) );
  }
}

HChat.url = new URL( document.currentScript.src );
HChat.path = HChat.url.pathname.replace( /\/[^/]+$/, '');