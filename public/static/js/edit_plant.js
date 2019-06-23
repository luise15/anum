window.onload = function () {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            document.getElementById('title').innerText = 'Información de '+localStorage.getItem('plant_name');
            document.getElementById('volver').onclick = function () {
                window.location.href = 'userView.html?usr=' + user.displayName;
            };
            var image = document.getElementById('photo');
            if(localStorage.getItem('plant_photo')  !== ""){
                image.src = localStorage.getItem('plant_photo');
                image.height = "200";
                image.width = "200";
            }

            var plant_photo_tbl = document.getElementById('plant_photo_tbl');
            var change_photo_btn = document.createElement('input');
            change_photo_btn.type = 'button';
            change_photo_btn.value = 'Cambiar foto';
            plant_photo_tbl.appendChild(change_photo_btn);
            change_photo_btn.onclick = function(){
                plant_photo_tbl.removeChild(change_photo_btn);
                document.getElementById('name_title').innerText = 'Nuevo apodo:';
                var uploader = document.createElement('progress');
                uploader.value = 0;
                uploader.max = 100;
                uploader.text = "0%";
                plant_photo_tbl.appendChild(uploader);
                var fileButton = document.createElement('input');
                fileButton.type = 'file';
                //fileButton.value = 'upload';
                plant_photo_tbl.appendChild(fileButton);
                fileButton.addEventListener('change', function (e) {
                    var file = e.target.files[0];
                    var storageRef = firebase.storage().ref('images/'+user.uid+'/plants/' +file.name);
                    var task = storageRef.put(file);
                    task.on('state_changed', function progress(snapshot) {
                            uploader.value = 100 * snapshot.bytesTransferred / snapshot.totalBytes;
                        },
                        function error(err) {

                        },
                        function complete() {
                            storageRef.getDownloadURL().then(function (url) {
                                var plantRef = firebase.database().refFromURL(localStorage.getItem('plant'));
                                localStorage.setItem('plant_photo', url);
                                plantURL_ref = plantRef.child('plant_photo').set(url);
                            }).then(function () {
                                image.src = localStorage.getItem('plant_photo');
                                image.height = "200";
                                image.width = "200";
                            });
                            plant_photo_tbl.removeChild(uploader);
                            plant_photo_tbl.removeChild(fileButton);
                            plant_photo_tbl.appendChild(change_photo_btn);

                        });
                })



            };


            var name_td = document.getElementById('name_td');
            name_td.innerText = localStorage.getItem('plant_name');
            var name_btn_td = document.getElementById('name_btn');
            var name_btn = document.createElement('input');
            name_btn.type = 'button';
            name_btn.value = 'Editar';
            name_btn.onclick = function () {

            };
            name_btn_td.appendChild(name_btn);






            var id_td = document.getElementById('id_td');
            id_td.innerText = localStorage.getItem('plant_id');

            var type_id = document.getElementById('type_id');
            type_id.innerText = localStorage.getItem('type_name');



        }
        else{
            window.location.href = 'index.html';
        }
    })
};