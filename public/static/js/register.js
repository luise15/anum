window.onload = function () {
    document.getElementById('signup').onclick = registrar;
};


function registrar() {
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    var username = document.getElementById('username');
    var email = document.getElementById('email');
    var checkbox = document.getElementById('checkbox');

    
    if (isEmpty(email)){
        alert('Ingresa email')
    }
    else if(!email.value.includes('@')){
        alert('Ingresa un email correcto')
    }
    else if(isEmpty(pass1)){
        alert('Ingresa contraseña')
    }
    else if(isEmpty(pass2)){
        alert('Confirma contraseña')
    }
    else if (pass1.value !== pass2.value){
        alert('Las contraseñas ingresadas no coinciden')
    }
    else if (checkbox.checked === false){
        alert('Confirma que aceptas los términos y condiciones')
    }
    else if(scorePassword(pass1.value)<20){
        alert('Contraseña muy débil')
    }
    else{
        let user_credential = create_user(email.value, pass1.value);
        update_username(username.value, user_credential.USER);
        window.location.href = "index.html";
    }
}

function scorePassword(pass) {
    alert('configurar validacion contraseña');
    return 20;
}


function isEmpty(field) {
    var fieldData = field.value;
    return fieldData.length === 0 || fieldData === "";
}


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

function update_username(name, user) {
    if (user != null){
        user.updateProfile({
            displayName: name
        }).then(function() {}).catch(function(error) {
            alert('Hubo un error en la actualización.');
        });
    }
    else{
        console.log('no se pudo cambiar nombre de usuario');
    }
}
