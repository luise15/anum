window.onload = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var nav_img = document.getElementById('nav_img');
            nav_img.src = user.photoURL;
            document.getElementById('nav_title').innerText = user.displayName;
            document.getElementById('nav_subtitle').innerText = "";

            document.getElementById('logout').onclick = sign_out;
            document.getElementById('regist_planta').onclick = function () {
                window.location.href = "new_plant.html";
            };
            document.getElementById('detalle').onclick = function () {
                window.location.href = 'edit_user.html'
            };




            var tblRef = document.getElementById('tablita');
            var row0 = tblRef.insertRow(0);
            var cell1 = row0.insertCell(0);
            cell1.innerHTML = "Nombre";
            var cell2 = row0.insertCell(1);
            cell2.innerHTML = "Tipo";

            let userId = user.uid;
            var plantsRef = firebase.database().ref('/users/' + userId).child('plants');
            var index = 1;
            plantsRef.once('value', function (plants) {
                plants.forEach(function (chil) {
                    var row = tblRef.insertRow(index);
                    cell1 = row.insertCell(0);
                    cell1.innerHTML = chil.child('plant_name').val();
                    cell2 = row.insertCell(1);
                    cell2.innerHTML = chil.child('plant_type/type_name').val();
                    let cell3 = row.insertCell(2);
                    let btn = document.createElement('input');
                    btn.type = 'button';
                    btn.className = "btn";
                    btn.value = "Ver estado";
                    btn.onclick = (function () {
                        localStorage.setItem('plant_id', chil.child('plant_id').val());
                        localStorage.setItem('plant_name', chil.child('plant_name').val());
                        localStorage.setItem('type_name', chil.child('plant_type/type_name').val());
                        localStorage.setItem('plant_photo', chil.child('plant_photo').val());
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
                        localStorage.setItem('plant_photo', chil.child('plant_photo').val());
                        localStorage.setItem('plant', chil.ref.toString());
                        window.location.href = 'edit_plant.html'
                    });
                    cell4.appendChild(btn2);
                    index += 1;
                });
            });



        } else {
            // No user is signed in.
            window.location.href = 'index.html';
        }
    });




};




function sign_out() {
    return firebase.auth().signOut().then(function () {
        window.location.href = "login.html";
    }).then(function () {
        localStorage.clear();
    }).catch(function (error) {
        alert('Hubo un error al cerrar la sesión.');
    });
}

