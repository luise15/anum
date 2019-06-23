window.onload = function(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            document.getElementById('volver').onclick = go_back;

            var selector = document.getElementById('type');
            let plant_types = firebase.database().ref().child('Types');
            plant_types.once('value', function (type) {
                type.forEach(function (t) {
                    var option = document.createElement('option');
                    option.value = t.child('type_name').val();
                    option.innerText = t.child('type_name').val();
                    selector.appendChild(option);
                })
            });

            document.getElementById('registrar').onclick = function () {
                let tipo = document.getElementById('type');
                let id = document.getElementById('id');
                let name = document.getElementById('p_name');
                if (isEmpty(name)){
                    alert('Dale un nombre a tu planta')
                }
                else if (isEmpty(id)){
                    alert('Aún no has rellenado el campo ID')
                }
                else{
                    create_plant(id.value, name.value, tipo.value, user);
                    alert('Planta creada.')
                    //let username = localStorage.getItem('username');
                    //window.location.href = "userView.html?usr="+username;
                }
            };



        } else {
            // No user is signed in.
            window.location.href = 'index.html';
        }
    });


};

function go_back() {
    window.history.back();
}

function isEmpty(field) {
    var fieldData = field.value;
    return fieldData.length === 0 || fieldData === "";
}


function create_plant(plant_id, plant_name, plant_type, user) {
    const userId = user.uid;
    let userRef = firebase.database().ref('/users/' + userId).child('plants').push();
    userRef.set({
        "plant_id" : plant_id,
        "plant_name" : plant_name,
        "plant_type" : {
            "type_name" : plant_type,
        },
        "mediciones": {

        },
        "plant_photo": ""
    });
}