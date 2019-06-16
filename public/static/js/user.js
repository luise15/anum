window.onload = function(){
    let params = new URLSearchParams(location.search);
    var contract = params.get('usr');
    document.getElementById("nombreUsuario").innerHTML = "Bienvenido a ANUM "+contract;
    document.getElementById('logout').onclick = sign_out;
    document.getElementById('regist_planta').onclick = register_plant;
    document.getElementById('home').onclick = go_home;
};




function sign_out() {
    return firebase.auth().signOut().then(function () {
        window.location.href = "index.html";
    }).catch(function (error) {
        alert('Hubo un error al cerrar la sesión.');
    });
}

function register_plant() {
    window.location.href = "/new_plant.html"
}

function go_home() {
    window.location.href = "index.html"
}