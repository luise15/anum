window.onload = function(){
    document.getElementById('volver').onclick = go_back;
    document.getElementById('registrar').onclick = registrar_planta;
};


function registrar_planta() {
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
        create_plant(id.value, name.value, tipo.value);
        go_back();
    }
}


function go_back() {
    window.history.back();
}

function isEmpty(field) {
    var fieldData = field.value;
    return fieldData.length === 0 || fieldData === "";
}


function create_plant(plant_id, plant_name, plant_type) {
    const userId = firebase.auth().currentUser.uid;
    let userRef = firebase.database().ref('/users/' + userId).child('plants').push();
    userRef.set({
        "plant_id" : plant_id,
        "plant_name" : plant_name,
        "plant_type" : {
            "type_name" : plant_type,
        }
    });
}