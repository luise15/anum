document.getElementById('button1').onclick = create_plant('12548', 'plantWea', 'wea', 84, 75, 95, 12, 45, 65);

function create_plant(plant_id, plant_name, plant_type, t_max, t_min, h_max, h_min, l_max, l_min) {
    var userId = firebase.auth().currentUser.uid;
    var userRef = firebase.database().ref('/users/' + userId).child('plants').push();
    userRef.set({
        "plant_id" : plant_id,
        "plant_name" : plant_name,
        "plant_type" : {
            "type_name" : plant_type,
            "t_max": t_max,
            "t_min" : t_min,
            "h_max" : h_max,
            "h_min" : h_min,
            "l_max" : l_max,
            "l_min" : l_min,
        }
    });
}