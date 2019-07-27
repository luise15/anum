//Cuando en el html se escribe src= public/static/bot.js, se llama a la ejecucion a este objeto:
//luego lo primero que la pagina hace es el siguiete
window.onload = function () {//crea el objeto ventana del navegadaros, es decir, un elemento que tiene contiene
                            // y muestra los textos, botones y formularios

    //Este bloque de codigo controla el modo 1 de funcionamiento: Streaming de datos con cantidad de planta y datos que se generan
    //automaticamente con minimas y maximas predefinidas.
    let n_usuarios = document.getElementById('n_usuarios');
    let n_plantas_por_usuario = document.getElementById('n_plantas_por_usuario');

    let checkbox_modo1 = document.getElementById('checkbox_modo1');
    document.getElementById('bot_status_modo1').innerText = "Streaming modo 1 detenido";

    var block_modo1 = false;//Esta variable controla el estado del streamin, block_modo1 = FALSE es no bloqueado = se envian datos

    checkbox_modo1.onclick = function () {
        if ( checkbox_modo1.checked && (isEmpty(n_usuarios) || isEmpty(n_plantas_por_usuario)) ){   // Esto dice que si el checkbox 'Comenzar streaming'
            block_modo1 = false;
            alert('Porfavor, rellena todos los 2 parámetros para el modo 1');
        }
        else if(!checkbox_modo1.checked){//si el checkbox no tiene el check:
            block_modo1 = false;//se detiene el envio de datos
            document.getElementById('bot_status_modo1').innerText = "Streaming modo1 detenido";//se muestra una linea que dice "Streaming detenido",
                                                    //esta se ubica en el html con un id que se invoca en el js con el id='para'
        }
        if ( checkbox_modo1.checked && !block_modo1 && !isEmpty(n_usuarios) && !isEmpty(n_plantas_por_usuario) ){//si el checkbox esta con un check
            block_modo1 = true;            // y los campos no estan vacios realiza esto:
            console.log("block_modo1 =",block_modo1);
            document.getElementById('bot_status_modo1').innerText = "Enviando Datos";//escribe en la pagina que se estan mandando datos
            generate_values(5431205,  //id de la planta //genera los datos a mandar la funcion generate_values internamente llama a send_data lo que envia los datos
                60, 1, // temperatura
                100, 1, // humedad
                50,10,//luminosidad
                30);// manda mediciones cada 5 minutos
            block_modo1 = false;
            console.log("block_modo1 =",block_modo1);
        }
    };

    //--------------------------------------------------------------------------------------------------------------------------------------------
    //Este bloque de codigo controla el modo 2 de funcionamiento: Streaming de datos con máximo y mínimo
    //50% es copia del bloque de arriba
    //Crea variables que reciben los contenidos de esos cuadros rellenables de texto
    let ID_input = document.getElementById('id');
    let diff_t_input = document.getElementById('dif_t');
    let t_max_input = document.getElementById('t_max');
    let t_min_input = document.getElementById('t_min');
    let h_max_input = document.getElementById('h_max');
    let h_min_input = document.getElementById('h_min');
    let l_max_input = document.getElementById('l_max');
    let l_min_input = document.getElementById('l_min');

    let checkbox = document.getElementById('checkbox');

    document.getElementById('bot_status').innerText = "Streaming modo 2 detenido";

    var block = false;//Esta variable controla el estado del streamin, block = FALSE es no bloqueado = se envian datos

    checkbox.onclick = function () {
        if ( checkbox.checked && (isEmpty(ID_input) || isEmpty(diff_t_input) ||    // Esto dice que si el checkbox 'Comenzar streaming'
            isEmpty(t_max_input) || isEmpty(t_min_input) || isEmpty(h_max_input) ||// los compos estan vacios y si la temperatura máxima
            isEmpty(h_min_input) || isEmpty(l_max_input) || isEmpty(l_min_input) ||// (y la humedad y luminocidad)es mayor que la minima
            t_max_input.value<t_min_input.value || h_max_input.value<h_min_input.value ||// muestra una alerta que pida corregirlos
             l_max_input.value<l_min_input.value) ){
            block = false;
            alert('Rellena todos los parámetros para el Streaming de datos, recuerda que la temperatura, humedad y luminocidad maxima deben ser mayores que sus minimas');
        }
        else if(!checkbox.checked){//si el checkbox no tiene el check:
            block = false;//se detiene el envio de datos
            document.getElementById('bot_status').innerText = "Streaming modo 2 detenido";//se muestra una linea que dice "Streaming detenido",
                                                    //esta se ubica en el html con un id que se invoca en el js con el id='para'
        }
        if ( checkbox.checked && !block && !isEmpty(ID_input) && !isEmpty(diff_t_input) &&//si el checkbox esta con un check
            !isEmpty(t_max_input) && !isEmpty(t_min_input) && !isEmpty(h_max_input) &&    // y los campos no estan vacios
            !isEmpty(h_min_input) && !isEmpty(l_max_input) && !isEmpty(l_min_input) ){ //
            block = true;
            document.getElementById('bot_status').innerText = "Enviando Datos";//escribe en la pagina que se estan mandando datos
            generate_values(ID_input.value,           //genera los datos a mandar
                t_max_input.value, t_min_input.value, //la funcion generate_values internamente llama a
                h_max_input.value, h_min_input.value, // send_data lo que envia los datos
                l_max_input.value, l_min_input.value,
                diff_t_input.value);
            block = false;

        }
    };
    //---------------------------------------------------------------------------------------------------------------------------------------------
    //Este bloque de codigo controla el modo 3 de funcionamiento: Enviar dato
    let id2 = document.getElementById('id2'); // crea variables para atrapar lo que el usuario ingresa
    let temperature = document.getElementById('temp');//en los cuadros de texto
    let humidity = document.getElementById('humid');
    let lumen = document.getElementById('lumen');

    document.getElementById('confirmar').onclick = function () {
        if( !isEmpty(id2) && !isEmpty(temperature) && !isEmpty(humidity) && !isEmpty(lumen) ){//si los campos no estan vacios
            let values = send_data(id2.value, temperature.value, humidity.value, lumen.value);//llama a la funcion send_data que invia los datos
            alert("1 medicion de datos ha sido enviada :D")
        }
        else{//si algun campo esta vacio, mustra una alerta
            alert('Porfavor rellenar todos los parámetros para enviar dato.');
        }
    };

};
//todas esas funciones que se ejecutan cuando se carga la pagina tienen que estar dentro
//del objeto window.onload, para que la pagina web las ejecute al cargar la pagina, la parte
//de arriba es como la funcion main (pensado en terminos de java)

//---------------------------------------------------------------------------------------------

//estas son funciones que son llamadas desde las funciones que primeramente, son como las
//funciones que llama la funcion main(pensando en terminos de java)

// La funcion sleep sirve para dar un retardo en milisegundo entre la ejecucion de funciones
function sleep(milliseconds) {
    var start = new Date().getTime();//del objeto Date(que es del DOM de html, esta por defecto) obten la fecha y hora
    var i = 0;
    while ( (new Date().getTime() - start) < milliseconds ) {
        if(i>1000){
            i = 0;
        }
        i++;
    }
}

//La funcion generate_values:recibe los limites de h,t,l; genera valores de h,l,t entre los min y max y llama a la funcion que los manda al firebase server
async function generate_values(ID, t_max, t_min, h_max, h_min, l_max, l_min, diff_t) {
    let t = Math.random()*(t_max - t_min) + t_min;//Math.random() genera un numero entre 0 y 1(sin tocar el 1)
    let h = Math.random()*(h_max - h_min) + h_min;
    let l = Math.random()*(l_max - l_min) + l_min;
    console.log("t: "+t+" | h: "+h+" | l: "+l);//muestra en la consola el (t,h,l) que esta mandano
    send_data(ID, t, h, l);//manda los datos llamando a la funcion send_data
    //sleep(diff_t * 1000);
    console.log('Esperando que pase el tiempo entre llamado y llamado de la funcion de envio de datos');
    await sleep(diff_t * 1000);
}

//La funcion send_data: recibe h,t,l a enviar y el ID de la planta, crea los string timeStamp(la marca de en que tiempo estan siendo mandado),
//crea el objeto a mandar  a la Real Time Firebase y se los manda
async function send_data(ID, t, h, l) {
    let today = new Date();
    let date = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();//creacion del timeStamp
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();//creacion del timeStamp

    let userRef = firebase.database().ref('/users/');
    userRef.once('value', function (users) {//-------------------------------------------------------------
        users.forEach(function (user) {//                Esta parte busca entre los usuarios de la RealTime
            let plantRef = user.child('plants').ref;//   database el id de la planta que coincide
            plantRef.once('value', function (plants) {// con el id de la planta que se le
                plants.forEach(function (plant) {//      entrego a la funcion.
                    if(plant.child('plant_id').val() === ID){//--------------------------------------
                        //console.log(plant.child('plant_name').value());
                        let medicionRef = plant.child('medicion').ref.push();//crea la rama medicion en el diagrama de arbol que representa
                                                                            //la realtime database,si no estaba creada)
                        let data = {//crea el objeto a ser enviado
                            "Fecha": date,
                            "Hora": time,
                            "Temp": t,
                            "Humed": h,
                            "Ilum": l
                        };
                        medicionRef.set(data) //envia el objeto, set es como escribelo en la databse
                    }
                })
            })
        })
    });
}

//La funcion isEmpty recibe una variable de js(puede ser un var, un let o un const)
//retorna True si el campo es una variable 0 un strin vacion, es decir,"".
function isEmpty(field) {
    let fieldData = field.value;
    return fieldData.length === 0 || fieldData === "";
}
