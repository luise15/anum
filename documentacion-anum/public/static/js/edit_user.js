window.onload = function () {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            document.getElementById('volver').onclick = function(){
                window.location.href = 'userView.html?usr=' + user.displayName;
            };
            document.getElementById('username').innerText = user.displayName;
            document.getElementById('mail').innerText = user.email;
            document.getElementById('phone').innerText = user.phoneNumber;

            if (user.photoURL) {
                document.getElementById('photo').src = user.photoURL;
                document.getElementById('photo').height = "300";
                document.getElementById('photo').width = "200";
            }

            let username_btn_cell = document.getElementById('username_btn');
            var username_cell = document.getElementById('username_cell');
            let username_input = document.createElement('input');
            username_input.type = "text";
            let username_label = document.createElement('h3');
            username_label.innerText = user.displayName;
            let editar_btn = document.createElement('input');
            editar_btn.type = 'button';
            editar_btn.value = 'Editar';
            editar_btn.onclick = function () {
                document.getElementById('username_label').innerText = 'Nuevo nombre: ';
                username_cell.removeChild(username_cell.firstChild);

                username_cell.appendChild(username_input);
                username_btn_cell.removeChild(editar_btn);
                username_btn_cell.appendChild(confirmar_btn);
            };
            document.getElementById('username_btn').appendChild(editar_btn);

            let confirmar_btn = document.createElement('input');
            confirmar_btn.type = 'button';
            confirmar_btn.value = 'Confirmar';
            confirmar_btn.onclick = function () {
                document.getElementById('username_label').innerText = 'Nombre de usuario: ';
                username_cell.removeChild(username_cell.firstChild);
                username_cell.appendChild(username_label);
                if(!isEmpty(username_input)){
                    user.updateProfile({
                        displayName: username_input.value
                    }).then(function () {
                        alert('Nombre de usuario cambiado');
                        username_label.innerText = user.displayName;
                    }).catch(function (error) {
                        alert('Hubo un problema al cambiar el nombre.')
                    });
                }
                username_btn_cell.removeChild(confirmar_btn);
                username_btn_cell.appendChild(editar_btn);
            };
            var table = document.getElementById('upload_photo');
            var photo_btn = document.createElement('input');
            photo_btn.type = "button";
            photo_btn.value = "Cambiar foto";
            table.appendChild(photo_btn);
            photo_btn.onclick = function () {
                var uploader = document.createElement('progress');
                uploader.value = 0;
                uploader.max = 100;
                uploader.text = "0%";
                table.appendChild(uploader);
                var fileButton = document.createElement('input');
                fileButton.type = 'file';
                //fileButton.value = 'upload';
                table.appendChild(fileButton);
                table.removeChild(photo_btn);
                fileButton.addEventListener('change', function (e) {
                    var file = e.target.files[0];

                    var storageRef = firebase.storage().ref('images/'+user.uid+'/profile/' +file.name);
                    var task = storageRef.put(file);
                    task.on('state_changed', function progress(snapshot) {
                            uploader.value = 100 * snapshot.bytesTransferred / snapshot.totalBytes;
                        },
                        function error(err) {

                        },
                        function complete() {
                            storageRef.getDownloadURL().then(function (url) {
                                user.updateProfile({
                                    photoURL: url
                                })
                            });
                            table.removeChild(uploader);
                            table.removeChild(fileButton);
                            table.appendChild(photo_btn);
                            document.getElementById('photo').src = user.photoURL;
                            document.getElementById('photo').height = "300";
                            document.getElementById('photo').width = "200";
                        });
                });

            }


        } else {
            // No user is signed in.
            window.location.href = 'index.html'
        }
    });
};

function update_photo(user, photo_URL) {
    user.updateProfile({
        photoURL: photo_URL
    }).then(function () {
        alert('Se cambió la foto de perfil')
    }).catch(function (error) {
        alert('Hubo un problema al cambiar foto de perfil.')
    })
}

function isEmpty(field) {
    var fieldData = field.value;
    return fieldData.length === 0 || fieldData === "";
}