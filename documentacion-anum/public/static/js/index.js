window.onload = function () {
        firebase.auth().onAuthStateChanged(function(user) {
            var iniciar_sesion = document.getElementById('iniciar_sesion');
            if (user) {
                // User is signed in.
                iniciar_sesion.innerText = 'Cerrar sesión';
                iniciar_sesion.onclick = sign_out;

                var nav_img = document.getElementById('nav_img');
                nav_img.src = user.photoURL;
                document.getElementById('nav_title').innerText = "Bienvenido "+user.displayName;
                document.getElementById('nav_subtitle').innerText = "";

                var myplants = document.getElementById('myplants');
                var plants_btn = document.createElement('a');
                plants_btn.innerText = "Mis plantas";
                plants_btn.href = "userView.html?usr=" + user.displayName;
                myplants.appendChild(plants_btn);

            }
            else{
                // No user is signed in.

            }
        })



};


function sign_out() {
    return firebase.auth().signOut().then(function () {
        localStorage.clear();
        window.location.href = "index.html";
    }).catch(function (error) {
        alert('Hubo un error al cerrar la sesión.');
    });
}