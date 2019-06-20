window.onload = function () {

    let ID_input = document.getElementById('id');
    let diff_t_input = document.getElementById('dif_t');
    let t_max_input = document.getElementById('t_max');
    let t_min_input = document.getElementById('t_min');
    let h_max_input = document.getElementById('h_max');
    let h_min_input = document.getElementById('h_min');
    let l_max_input = document.getElementById('l_max');
    let l_min_input = document.getElementById('l_min');
    
    let checkbox = document.getElementById('checkbox');

    document.getElementById('parag').innerText = "Streaming detenido";

    checkbox.onclick = function () {
        if (checkbox.checked === true && (isEmpty(ID_input) || isEmpty(diff_t_input) ||
            isEmpty(t_max_input) || isEmpty(t_min_input) || isEmpty(h_max_input) ||
            isEmpty(h_min_input) || isEmpty(l_max_input) || isEmpty(l_min_input) ||
            t_max_input.value<t_min_input.value || h_max_input.value<h_min_input.value || l_max_input.value<l_min_input.value)){
            alert('Rellena todos los parámetros en Streaming de datos');
        }
        else if(checkbox.checked === false){
            document.getElementById('parag').innerText = "Streaming detenido";
        }
        while (checkbox.checked === true && !isEmpty(ID_input) && !isEmpty(diff_t_input) &&
            !isEmpty(t_max_input) && !isEmpty(t_min_input) && !isEmpty(h_max_input) &&
            !isEmpty(h_min_input) && !isEmpty(l_max_input) && !isEmpty(l_min_input)){
            document.getElementById('parag').innerText = "Enviando Datos";

            generate_values(ID_input.value,
                t_max_input.value, t_min_input.value,
                h_max_input.value, h_min_input.value,
                l_max_input.value, l_min_input.value,
                diff_t_input.value);
        }
    };


    let id2 = document.getElementById('id2');
    let temperature = document.getElementById('temp');
    let humidity = document.getElementById('humid');
    let lumen = document.getElementById('lumen');
    document.getElementById('confirmar').onclick = function () {
        if(!isEmpty(id2) && !isEmpty(temperature) && !isEmpty(humidity) && !isEmpty(lumen)){
            let values = send_data(id2.value, temperature.value, humidity.value, lumen.value);
        }
        else{
            alert('Rellena todos los parámetros en enviar dato');
            alert("Datos enviados")
        }
    };

};

function sleep(milliseconds) {
    var start = new Date().getTime();
    var i = 0;
    while ((new Date().getTime() - start) < milliseconds) {
        if(i>1000){
            i = 0;
        }
        i++;
    }
}


function generate_values(ID, t_max, t_min, h_max, h_min, l_max, l_min, diff_t) {
    let t = Math.random()*(t_max - t_min) + t_min;
    let h = Math.random()*(h_max - h_min) + h_min;
    let l = Math.random()*(l_max - l_min) + l_min;
    console.log("t: "+t+" | h: "+h+" | l: "+l);
    send_data(ID, t, h, l);
    sleep(diff_t * 10000);
}

function send_data(ID, t, h, l) {
    let today = new Date();
    let date = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    let userRef = firebase.database().ref('/users/');
    userRef.once('value', function (users) {
        users.forEach(function (user) {
            let plantRef = user.child('plants').ref;
            plantRef.once('value', function (plants) {
                plants.forEach(function (plant) {
                    if(plant.child('plant_id').val() === ID){
                        //console.log(plant.child('plant_name').value());
                        let medicionRef = plant.child('medicion').ref.push();
                        let data = {
                            "Fecha": date,
                            "Hora": time,
                            "Temp": t,
                            "Humed": h,
                            "Ilum": l
                        };
                        medicionRef.set(data)
                    }
                })
            })
        })
    });
}

function isEmpty(field) {
    let fieldData = field.value;
    return fieldData.length === 0 || fieldData === "";
}


