//document.getElementById("button1").onclick = create_user('prueba2@gmail.com', 'password');
//document.getElementById("button1").onclick = sign_in('prueba2@gmail.com', 'password');
//document.getElementById("button1").onclick = sign_in('otrousuario@gmail.com', 'password');
//document.getElementById("button1").onclick = sign_out();
//document.getElementById("button1").onclick = update_user_profile('usuario', 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=750&w=1260');

function create_user(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
                alert('Contraseña débil.');
            } else if (errorCode === 'auth/email-already-in-use') {
                alert('El email ingresado ya esta en uso.');
            } else if (errorCode === 'auth/invalid-email') {
                alert('Email inválido.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

function sign_in(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password)
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

function sign_out() {
    return firebase.auth().signOut().then(function () {
        alert('Cerrada la sesión.');
    }).catch(function (error) {
        alert('Hubo un error al cerrar la sesión.');
    });
}

function update_user_profile(name, photo_url) {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
        photoURL: photo_url
    }).then(function() {
        alert('Actualización completa.');
    }).catch(function(error) {
        alert('Hubo un error en la actualización.');
    });
}