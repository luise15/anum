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

function user_observer(){
    return firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            // ...
        }
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

function update_email(new_email) {
    var user = firebase.auth().currentUser;

    return user.updateEmail(new_email).then(function() {
        alert('Actualización completa.');
    }).catch(function(error) {
        alert('Hubo un error en la actualización.');
    });
}

function update_password(new_password) {
    var user = firebase.auth().currentUser;

    user.updatePassword(new_password).then(function () {
        alert('Actualización completa.');
    }).catch(function (error) {
        alert('Un error ha ocurrido.');
    })
}

function send_email_verification() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        alert('Email enviado');
    }).catch(function (error) {
        alert('Un error ha ocurrido');
    })
}

function send_password_reset_email() {
    var user = firebase.auth().currentUser;
    var emailAddress = user.email;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
        alert('Email enviado')
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/invalid-email'){
            alert('Email inválido.');
        }
        else{
            alert('Un error ha ocurrido');
        }
    });
}

function delete_user() {
    var user = firebase.auth().currentUser;

    user.delete().then(function () {
        alert('Usuario eliminado.');
    }).catch(function (error) {
        alert('Error al eliminar el usuario.');
    })
}

function reauthenticate_user(credential) {
    var user = firebase.auth().currentUser;

    user.reauthenticateWithCredential(credential).then(function () {
        alert('Usuario correctamente reautenticado.');
    }).catch(function (error) {
        alert('Error al reautenticar el usuario');
    })
}

