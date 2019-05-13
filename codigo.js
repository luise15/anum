console.log("mensaje para dev, arreglar regiones donde la planta no tiene estado");
    var nombrePlanta='planti';
    var usuario = prompt("Nombre de usuario");
    var password = prompt("contraseña");
    
    var humedad = prompt("Humedad, en % del 0 a 100");
    var temperatura = prompt("temperatura en grados celcius");

    if (humedad>50 && temperatura>20){
      document.write(nombrePlanta + " esta feliz \n");
      }
    if (humedad<50){
      document.write(nombrePlanta + " tiene sed\n");
     }

    if (humedad<20 && temperatura>20){ 
      document.write("y " + nombrePlanta + " necesita hablar con tigo y \n");
     }
    if (humedad>50 && temperatura<20){ 
      document.write("y " + "a " + nombrePlanta + " le gustaria salir a tomar el sol y \n");
     }
     if (humedad>80 && temperatura<10){ 
      document.write("y " + nombrePlanta + " se siente un poco triste :(  y\n");
     }
    