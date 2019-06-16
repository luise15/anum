let params = new URLSearchParams(location.search);
var contract = params.get('usr');
document.getElementById("nombreUsuario").innerHTML = "Bienvenido a ANUM "+contract;
