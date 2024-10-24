/*
=============================================================================
Module: Client Scripts for Login
Date: 10.07.2020
=============================================================================
*/

var formLogin = document.getElementById( 'login-form' );
var formRegister = document.getElementById( 'register-form' );

var formEmail = document.getElementById( 'email' );
var formPassword = document.getElementById( 'password' );

var formNameRegister = document.getElementById( 'register-name' );
var formEmailRegister = document.getElementById( 'register-email' );
var formPasswordRegister = document.getElementById( 'register-password' );

var tabRegister = document.getElementById( 'tabRegister' );
var tabLogin = document.getElementById( 'tabLogin' );

tabRegister.addEventListener( 'click', function(e) {
  e.preventDefault();
  hide( formLogin );
  show( formRegister );
});

tabLogin.addEventListener( 'click', function(e) {
  e.preventDefault();
  show( formLogin );
  hide( formRegister );
});

formLogin.addEventListener( 'submit', async(e)=> doLogin( e ) );
formRegister.addEventListener( 'submit', async(e)=> doRegister( e ) );

async function doLogin( e ) {
  e.preventDefault();
  const email = formEmail.value;
  const password = formPassword.value;

  let response = await sendLoginPayload({ email: email, password: password });
  let jsonResponse = await response.json();

  if( response.status == 200 ){
    //localStorage.setItem('token', jsonResponse.token);
    window.location.replace( '/indexHG.html' );
  } else {
    let errorsContainer = document.getElementsByClassName( 'errors' )[0];
    errorText.innerHTML = jsonResponse.error;

    errorsContainer.classList.remove( 'form--hidden' );
    setTimeout( ()=> errorsContainer.classList.add( 'form--hidden' ), 2*1000 );
  }
}
async function doRegister( e ) {
  e.preventDefault();
  const name = formNameRegister.value;
  const email = formEmailRegister.value;
  const password = formPasswordRegister.value;

  let response = await sendRegisterPayload({ email: email, password: password, name: name });
  let jsonResponse = await response.json();

  if( ( response.status == 200 ) || ( response.status == 201 ) ) {
    show( formLogin );
    hide( formRegister );
  } else {
    let errorsContainer = document.getElementsByClassName( 'errors' )[0];
    errorText.innerHTML = jsonResponse.error;

    errorsContainer.classList.remove( 'form--hidden' );
    setTimeout(()=> errorsContainer.classList.add( 'form--hidden' ), 2*1000 );
  }

}
async function sendLoginPayload( data ) {
  try {
    const response = await fetch( '/auth/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( data ),
    });

    return( response );
    //return result;
  } catch( error ) {
    console.error( 'Error: ', error );
  }
}
async function sendRegisterPayload( data ) {
  try {
    const response = await fetch( '/auth/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( data ),
    });

    return response;
    //return result;
  } catch( error ) {
    console.error( 'Error: ', error );
  }
}
function hide( elem ) {
  elem.classList.add( 'form--hidden' );
  elem.classList.remove( 'form--unhidden' );
}  
function show( elem ) {
  elem.classList.add( 'form--unhidden' );
  elem.classList.remove( 'form--hidden' );
}