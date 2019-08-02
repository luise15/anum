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

            var tblRef = document.getElementById('tablita');//crea la referencia a la tablita
            var row0 = tblRef.insertRow(0);//insertale una fila
            var cell1 = row0.insertCell(0);//insertale una columna a esa fila
            cell1.innerHTML = "Nombre";//asignale nombre a la casilla 0,0
            var cell2 = row0.insertCell(1);//agregale otra columna a la primera fila
            cell2.innerHTML = "Tipo";//asignale nombre a la casilla 0,1


            let userId = user.uid;//crea la referencia al ID del usuario
            var plantsRef = firebase.database().ref('/users/' + userId).child('plants');//crea la referencia  a la base de datos, a las plantas de ese usuario
            var index = 1;//crea una variable igual a 1
            plantsRef.once('value', function (plants) {//para cada referencia, para cada planta
                plants.forEach(function (chil) {
                    //Muestra una casilla con el nombre de la planta
                    var row = tblRef.insertRow(index);//crea una fila, aumentando por endice
                    cell1 = row.insertCell(0);//ponele una fila
                    cell1.innerHTML = chil.child('plant_name').val();//ponele nombre de la referencia de la planta especifica del usuario


                    //Agregar una columna vacia solo para que se vea bien
                    cellr1 = row.insertCell(1);//agrega otra fila
                    cell2.innerHTML = chil.child('    ').val();//ponele el tipo de planta

                    //Muestra una casilla con el tipo de planta
                    cell2 = row.insertCell(2);//agrega otra fila
                    cell2.innerHTML = chil.child('plant_type/type_name').val();//ponele el tipo de planta

                    //Agregar una columna vacia solo para que se vea bien
                    cellr2 = row.insertCell(3);//agrega otra fila
                    cellr2.innerHTML = chil.child('    ').val();//ponele el tipo de planta

                    //Boton para agregar el link que lleva a la pagina de la planta
                    let cell3 = row.insertCell(4);//agrega otra fila
                    let btn = document.createElement('input');//crea un elemento llamado btn que se vera en el htm
                    btn.type = 'button';//especifica que ese elemento es un boton
                    btn.className = "btn";//espeficica el claaName de ese elemento
                    btn.value = "Ver estado";//especifica que en la pagina se vera dentro del boton el texto "ver estado"
                    btn.onclick = (function () {//al hacer click en ese boton se ejecutara una funcion que abre una pagina
                        localStorage.setItem('plant_id', chil.child('plant_id').val());
                        localStorage.setItem('plant_name', chil.child('plant_name').val());//la pagina que se abrira tendra dentro estas variables
                        localStorage.setItem('type_name', chil.child('plant_type/type_name').val());
                        localStorage.setItem('plant_photo', chil.child('plant_photo').val());
                        localStorage.setItem('plant', chil.ref.toString());
                        window.location.href = 'plant.html'//has que el navegador te muestre esta pagina
                    });
                    cell3.appendChild(btn);//agrega el boton a la celda 3(casilla3)

                    //Boton para agregar el link que lleva a editar la planta
                    let cell4 = row.insertCell(4);//agrega una columna a la fila
                    let btn2 = document.createElement('input');//crea un elemento input y asignale el puntero btn2
                    btn2.type = 'button';//especifica que el puntero lleva a un elemento de clase boton
                    btn2.className = "btn";
                    btn2.value = "Editar";//especifica que lo que se muestra en pantalla dice 'editar'
                    btn2.onclick = (function () {//al apretar el boton 'editar' ejecuta esta funcion
                        localStorage.setItem('plant_id', chil.child('plant_id').val());
                        localStorage.setItem('plant_name', chil.child('plant_name').val());//creando en la nueva pagina un objeto
                        localStorage.setItem('type_name', chil.child('plant_type/type_name').val());//con estos atributos
                        localStorage.setItem('plant_photo', chil.child('plant_photo').val());
                        localStorage.setItem('plant', chil.ref.toString());
                        window.location.href = 'edit_plant.html'//que te lleva a la pagina 'edit_plant.html'
                    });
                    cell4.appendChild(btn2);//agrega el boton a la celda 4 (casilla4)

                    //aumenta el indice para para visitar la siguiente planta
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
