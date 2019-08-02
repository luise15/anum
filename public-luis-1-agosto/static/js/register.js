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
    //else if(!email.value.includes('@')){
    //    alert('Ingresa un email correcto')
    //}
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
    else{
        create_user(email.value, pass1.value, username.value);
    }
}


function isEmpty(field) {
    var fieldData = field.value;

    return fieldData.length === 0 || fieldData === "";
}


function caracterRaro(field) {
    let letras_normales= ^[a-z]*$
    let numeros_norales= ^[0-9]*$

    var str = "The best things in life are free";
    var patt = new RegExp("e");
    var res = patt.test(str);

    return true
}


function create_user(email, password, username){
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){//crea el usuario y te logea, el usuario que crea parte con nombre de usuario nan, luego lo cmabia
        let userCredentialPromise = firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {//logearse para poder obtener el usuario
            console.log(error);//cuando ejecuto un script en html y sucede un error, la pagina se caeria. entonces al poner catch
        });//el html genera el error, con catch yo lo capturo y especifico que la ejecucion de la pagina siga y con console.log(error) lo mustro en la consola del navegador
        let user = firebase.auth().currentUser;//captar las credenciales del usuario actual
        user.updateProfile({
            displayName: username//actualizar en la base de datos de firebase el nombre de usuario
        }).catch(function (error) {
            alert('Hubo un error en crear nombre de usuario')
        });
        firebase.auth().signOut().catch(function (error) {//en como 'cerrar sesion'
            console.log(error);//el catch esta por si la pagina se desconecta de firebase
        });
        alert('Usuario creado, se te redigira a pagina de inicio')
        window.location.href = "index.html";//luego redirige a la pagina de inicio
    })
        .catch(function(error) {//esto es un catch del metodo createUserWithEmailAndPassword
            // Handle Errors here.
            var errorCode = error.code;//captura el atributo 'code' del objeto error generado por el DOM del html
            var errorMessage = error.message;//captura el atributo 'message' del objeto error generado por el DOM del html
            if (errorCode === 'auth/weak-password') {//si la contraseña es debil, usando para esto una funcion predefinida por firebase
                alert('Contraseña débil. Tiene que contener 8 caracteres. Al menos una mayuscula, una minuscula y un numero');
            } else if (errorCode === 'auth/email-already-in-use') {//si el email ya esta repetido, usando unas validaciones/funciones internas de firebase
                alert('El email ingresado ya esta en uso.');
            } else if (errorCode === 'auth/invalid-email') {
                alert('Email inválido.');
            } else {
                alert(errorMessage);//si no es ninguno de los anteriores, muestra el mensaje de error en un cuadro pop-up
            }
            console.log(error);//tambien muestralo en la consola
            window.location.href = "register.html";//y vuelve a cargar la pagina
        });
}
