window.onload = function () {
    document.getElementById('volver').onclick = function () {
        window.location.href = "admin_plant_types.html"
    };

    document.getElementById("guardar").onclick = function () {
        let nombre = document.getElementById("tipo");
        let t_min1 = document.getElementById("t_min1");
        let t_min2 = document.getElementById("t_min2");
        let t_max1 = document.getElementById("t_max1");
        let t_max2 = document.getElementById("t_max2");

        let h_min1 = document.getElementById("h_min1");
        let h_min2 = document.getElementById("h_min2");
        let h_max1 = document.getElementById("h_max1");
        let h_max2 = document.getElementById("h_max2");

        let l_min1 = document.getElementById("l_min1");
        let l_min2 = document.getElementById("l_min2");
        let l_max1 = document.getElementById("l_max1");
        let l_max2 = document.getElementById("l_max2");

        if(isEmpty(nombre) || isEmpty(t_min1) || isEmpty(t_min2) || isEmpty(t_max1) || isEmpty(t_max2) ||
            isEmpty(h_min1) || isEmpty(h_min2) || isEmpty(h_max1) || isEmpty(h_max2) ||
            isEmpty(l_min1) || isEmpty(l_min2) || isEmpty(l_max1) || isEmpty(l_max2) ){

            alert("Hay un campo vacío");
        }
        else if (t_min1.value<=t_min2.value && t_min2.value<=t_max1.value && t_max1.value<=t_max2.value &&
            h_min1.value<=h_min2.value && h_min2.value<=h_max1.value && h_max1.value<=h_max2.value &&
            l_min1.value<=l_min2.value && l_min2.value<=l_max1.value && l_max1.value<=l_max2.value){

            let plant_types_ref = firebase.database().ref().child('Types').push();
            plant_types_ref.set({
                "type_name": nombre.value,
                "t_min1": t_min1.value,
                "t_min2": t_min2.value,
                "t_max1": t_max1.value,
                "t_max2": t_max2.value,
                "h_min1": h_min1.value,
                "h_min2": h_min2.value,
                "h_max1": h_max1.value,
                "h_max2": h_max2.value,
                "l_min1": l_min1.value,
                "l_min2": l_min2.value,
                "l_max1": l_max1.value,
                "l_max2": l_max2.value
            });
            alert("Tipo creado");
        }
        else{
            alert("Error en el orden de los datos")
        }
    };

};


function isEmpty(field) {
    var fieldData = field.value;
    return fieldData.length === 0 || fieldData === "";
}