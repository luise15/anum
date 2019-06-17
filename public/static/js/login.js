//var user = prompt("Cual es tu nombre?");
//alert("Bienvenido " + user);

//var d = document.getElementById("grafos");
//var lienzo = d.getContext("2d");

//lienzo.beginPath();
//lienzo.moveTo(100, 100);
//lienzo.lineTo(200, 200);
//lienzo.stroke();
//lienzo.closePath();

window.onload = function(){
  document.getElementById('boton_entrar').onclick = entrar;
  document.getElementById('boton_registrar').onclick = registrar;
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
        let username = firebase.auth().currentUser.displayName;
        let email = firebase.auth().currentUser.email;
        let userid = firebase.auth().currentUser.uid;
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
        localStorage.setItem('id', userid);
        localStorage.setItem('auth', auth);
        localStorage.setItem('currentUser', firebase.auth().currentUser);
        window.location.href = "userView.html?usr="+username;
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