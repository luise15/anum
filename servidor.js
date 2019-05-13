var express = require("express");
var aplicacion = express();

aplicacion.get("/", home);
aplicacion.get("/foro", foro);

aplicacion.get("/2", home2);

aplicacion.use(express.static('anum'))

function home(peticion, resultado)
{
  resultado.send("Este es el <strong>home, aqui ira la pagina diseñada</strong> genial!!");
}

function home2(peticion, resultado)
{
 resultado.sendFile('home.html');
}

function foro(peticion, resultado)
{
  resultado.send("Esto es el foro <strong>foro</strong>");
}

aplicacion.listen(8989);

//http://127.0.0.1:8989