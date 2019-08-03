window.onload = function () {
    //document.write('hola mundo');
    console.log('hola mundo, version con refresco');
    document.getElementById('volver').onclick = function () {//esto es para que al apretar el boton 'Volver a pagina del administrador'
        window.location.href = "admin.html"//se redirija a la pagina del admin
    };

    document.getElementById("agregar").onclick = function () {//esto es para que al apretar el boton 'agregar tipo de planta'
        //window.location.href = "admin_new_type.html"//se redirija a la pagina del admin
        //window.location.reload(true);
    };
    //------------------------------------------------------------------------------------------------
    //Esto es para que la tablita muestre los tipos de planta disponibles

    var tabla = document.getElementById('tablita');//crea la referencia a la tablita
    //var row0 = tabla.insertRow(0);//insertale una fila
    //var cell1 = row0.insertCell(0);//insertale una columna a esa fila
    //cell1.innerHTML = "Tipo de planta:";//asignale nombre a la casilla 0,0


    let plant_types = firebase.database().ref().child("Types");//obten de la base de datos la referencia a la rama types, que contiene los tipos de plantas
    var index = 1;
    plant_types.on("value", function (type) {
        type.forEach(function (t) {
            var row = tabla.insertRow(index);//crea una fila
            var cell0 = row.insertCell(0);//insertale una columna, creando asi una celda
            cell0.innerHTML = t.child("type_name").val();//a la celda escribele el nombre del tipo de planta, ejemplo, 'Rosa'

            //Agregar el boton de Ver datos de un tipo de planta
            var cell1 = row.insertCell(1);//crea otra fila
            var data_btn = document.createElement("input");//crea un puntero de boton
            data_btn.type = 'button';//especifica que es un boton
            data_btn.className = "btn";
            data_btn.value = "Ver parametros";//especifica lo que se muestra en el boton
            data_btn.onclick = function () {//al hacer click, ejecuta esta funcion
                window.location.href = "admin.html"//dirige a la pagina "admin_type_data.html"
            };
            cell1.appendChild(data_btn);//muestra el boton en la pagina

            //Agregar el boton de Editar parametros de una planta, misma estructura que el anterior
            var cell2 = row.insertCell(2);
            var edit_btn = document.createElement("input");
            edit_btn.type = 'button';
            edit_btn.className = "btn";
            edit_btn.value = "Editar";
            edit_btn.onclick = function () {
                window.location.href = "admin_type_edit.html"
            };
            cell2.appendChild(edit_btn);

            //Agregar el boton Para eliminar el tipo de planta
            var cell3 = row.insertCell(3);
            var delete_btn = document.createElement("input");
            delete_btn.type = 'button';
            delete_btn.className = "btn";
            delete_btn.value = "Eliminar";
            delete_btn.onclick = function () {
                //Eliminar planta
                t.ref.remove();
                  window.location.href = "admin_type_data.html";
                console.log('la pagina se recargo, si presenta problemas borrar el window de la linea superior que dice:window.location.reload(true); deberia quedar: location.reload(true);')//
            };
            cell2.appendChild(delete_btn);

        })
    })

};
