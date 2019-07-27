window.onload = function(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.location.href = 'index.html';
    }
    else{
      document.getElementById('boton_entrar').onclick = entrar;
      document.getElementById('boton_registrar').onclick = registrar;
    }
  })
};



function entrar()
{
  var email = document.getElementById("Email");
  var contrasena = document.getElementById("Password");

  if(isEmpty(email)){
    alert('Ingresa Email')
  }
  else if (isEmpty(contrasena)){
    alert('Ingresa una contraseña')
  }
  else{
    sign_in(email.value, contrasena.value);
  }
}


function registrar()
{
    window.location.href = "register.html";
}

function sign_in(email, password){
  return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (auth) {
        window.location.href = "index.html";
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Contraseña incorrecta.');
        }
        else if (errorCode === 'auth/user-not-found') {
          alert('Usuario no registrado.');
        }
        else if (errorCode === 'auth/invalid-email'){
          alert('Email inválido.');
        }
        else {
          alert(errorMessage);
        }
        console.log(error);
      });
}

function isEmpty(field) {
  var fieldData = field.value;
  return fieldData.length === 0 || fieldData === "";
}