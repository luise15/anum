window.onload = function () {
    let threshold = 0.5;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            document.getElementById('volver').onclick = function () {
                localStorage.removeItem('plant_id');
                localStorage.removeItem('plant_name');
                localStorage.removeItem('type_name');
                localStorage.removeItem('plant');
                window.location.href = 'userView.html?usr=' + user.displayName;
            };

            let type_name = localStorage.getItem('type_name');
            let plant_name = localStorage.getItem('plant_name');
            let plant_URL = localStorage.getItem('plant');
            let plant = firebase.database().refFromURL(plant_URL);
            let last_measure = plant.child('medicion').orderByKey().limitToLast(1).on('child_added', function (childSnapshot) {
                var last_h = childSnapshot.child('Humed').val();
                var last_t = childSnapshot.child('Temp').val();
                var last_l = childSnapshot.child('Ilum').val();


                let types = firebase.database().ref().child('Types');
                types.once('value', function (type) {
                    type.forEach(function (child) {
                        if(child.child('type_name').val() === type_name){
                            let happiness = compute_happiness(child, last_t, last_h, last_l);
                            if(happiness>threshold){
                                document.getElementById('soyfeliz').innerText = plant_name+' está feliz';
                            }
                            else{
                                document.getElementById('soyfeliz').innerText = plant_name+' necesita cuidados';
                            }
                            document.getElementById('felicidad').innerText = 'Índice de felicidad: '+happiness;
                        }
                    })
                })
            });


        } else {
            // No user is signed in.
            window.location.href = 'index.html'
        }
    });


};



function compute_happiness(type, actual_t, actual_h, actual_l) {
    let h_min1 = type.child('h_min1').val();
    let h_min2 = type.child('h_min2').val();
    let h_max1 = type.child('h_max1').val();
    let h_max2 = type.child('h_max2').val();

    let t_min1 = type.child('t_min1').val();
    let t_min2 = type.child('t_min2').val();
    let t_max1 = type.child('t_max1').val();
    let t_max2 = type.child('t_max2').val();

    let l_min1 = type.child('l_min1').val();
    let l_min2 = type.child('l_min2').val();
    let l_max1 = type.child('l_max1').val();
    let l_max2 = type.child('l_max2').val();

    let happiness_t = compute(actual_t, t_min1, t_min2, t_max1, t_max2);
    let happiness_h = compute(actual_h, h_min1, h_min2, h_max1, h_max2);
    let happiness_l = compute(actual_l, l_min1, l_min2, l_max1, l_max2);

    return Math.pow(happiness_t* happiness_h * happiness_l, 1/3);

}

function compute(actual_value, thresh_min1, thresh_min2, thresh_max1, thresh_max2){
    if(actual_value<=thresh_min1 || actual_value>=thresh_max2){
        return 0;
    }
    else if(actual_value>thresh_min1 && actual_value<=thresh_min2){
        return (actual_value - thresh_min1)/(thresh_min2 - thresh_min1);
    }
    else if(actual_value>thresh_min2 && actual_value<=thresh_max1){
        return 1;
    }
    else{
        return (thresh_max2 - actual_value)/(thresh_max2 - thresh_max1)
    }
}