
// Initialize Firebase
import * as firebase from "firebase";

var config = {
    apiKey: "<API_KEY>",
    authDomain: "anum-b36a3.firebaseapp.com",
    databaseURL: "https://anum-b36a3.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
};

// Initialize the default app
var defaultApp = firebase.initializeApp(config);

console.log(defaultApp.name);  // "[DEFAULT]"

// You can retrieve services via the defaultApp variable...
var defaultStorage = defaultApp.storage();
var defaultDatabase = defaultApp.database();


function read_user_data(){
    var userId = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        // ...
    });
}


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