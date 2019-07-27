window.onload = function () {
    document.getElementById('volver').onclick = function () {
        window.location.href = "admin.html"
    };

    document.getElementById("agregar").onclick = function () {
        window.location.href = "admin_new_type.html"
    };


    let tabla = document.getElementById('tablita');

    let plant_types = firebase.database().ref().child("Types");
    var index = 1;
    plant_types.on("value", function (type) {
        type.forEach(function (t) {
            var row = tabla.insertRow(index);
            var cell0 = row.insertCell(0);
            cell0.innerHTML = t.child("type_name").val();

            var cell1 = row.insertCell(1);
            var data_btn = document.createElement("input");
            data_btn.type = 'button';
            data_btn.className = "btn";
            data_btn.value = "Ver datos";
            data_btn.onclick = function () {
                window.location.href = "admin_type_data.html"
            };
            cell1.appendChild(data_btn);

            var cell2 = row.insertCell(2);
            var edit_btn = document.createElement("input");
            edit_btn.type = 'button';
            edit_btn.className = "btn";
            edit_btn.value = "Editar";
            edit_btn.onclick = function () {
                window.location.href = "admin_type_edit.html"
            };
            cell2.appendChild(edit_btn);

            var cell3 = row.insertCell(3);
            var delete_btn = document.createElement("input");
            delete_btn.type = 'button';
            delete_btn.className = "btn";
            delete_btn.value = "Eliminar";
            delete_btn.onclick = function () {
                //Eliminar planta
                t.ref.remove();
            };
            cell2.appendChild(delete_btn);

        })
    })

};
