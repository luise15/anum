window.onload = function(){
    let params = new URLSearchParams(location.search);
    var username = localStorage.getItem('username');
    document.getElementById("nombreUsuario").innerHTML = "Bienvenido a ANUM "+ username;
    document.getElementById('logout').onclick = sign_out;
    document.getElementById('regist_planta').onclick = register_plant;
    document.getElementById('home').onclick = go_home;


    var tblRef = document.getElementById('tablita');
    var row0 = tblRef.insertRow(0);
    var cell0 = row0.insertCell(0);
    cell0.innerHTML = "ID";
    var cell1 = row0.insertCell(1);
    cell1.innerHTML = "Nombre";
    var cell2 = row0.insertCell(2);
    cell2.innerHTML = "Tipo";

    var userId = localStorage.getItem('id');
    var plantsRef = firebase.database().ref('/users/' + userId).child('plants');
    var index = 1;
    plantsRef.once('value', function (plants) {
        plants.forEach(function (chil) {
            var row = tblRef.insertRow(index);
            cell0 = row.insertCell(0);
            cell0.innerHTML = chil.child('plant_id').val();
            cell1 = row.insertCell(1);
            cell1.innerHTML = chil.child('plant_name').val();
            cell2 = row.insertCell(2);
            cell2.innerHTML = chil.child('plant_type/type_name').val();
            let cell3 = row.insertCell(3);
            let btn = document.createElement('input');
            btn.type = 'button';
            btn.className = "btn";
            btn.value = "Ver estado";
            btn.onclick = (function () {
                localStorage.setItem('plant_id', chil.child('plant_id').val());
                localStorage.setItem('plant_name', chil.child('plant_name').val());
                localStorage.setItem('type_name', chil.child('plant_type/type_name').val());
                localStorage.setItem('plant', chil.ref.toString());
                window.location.href = 'plant.html'
            });
            cell3.appendChild(btn);
            let cell4 = row.insertCell(3);
            let btn2 = document.createElement('input');
            btn2.type = 'button';
            btn2.className = "btn";
            btn2.value = "Editar";
            btn2.onclick = (function () {
                localStorage.setItem('plant_id', chil.child('plant_id').val());
                localStorage.setItem('plant_name', chil.child('plant_name').val());
                localStorage.setItem('type_name', chil.child('plant_type/type_name').val());
                localStorage.setItem('plant', chil.ref.toString());
                window.location.href = 'plant_data.html'
            });
            cell4.appendChild(btn2);
            index += 1;
        });
    });

};




function sign_out() {
    return firebase.auth().signOut().then(function () {
        window.location.href = "bot.html";
    }).then(function () {
        localStorage.clear();
    }).catch(function (error) {
        alert('Hubo un error al cerrar la sesión.');
    });
}

function register_plant() {
    window.location.href = "/new_plant.html";
}

function go_home() {
    window.location.href = "index.html";
}