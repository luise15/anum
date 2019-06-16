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
  var usuario = document.getElementById("User");
  var contrasena = document.getElementById("Password");
  if (usuario.value === "pirita" && contrasena.value === "piritapass" )
  {
    window.location.href = "userView.html?usr="+usuario.value;
  }
  else
  {
    alert("Usuario y/o contrasena equivocados");
  }
}




function registrar()
{
    window.location.href = "register.html";
}
