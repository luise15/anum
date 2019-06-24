LO unico que cambia es el archivo register. js 
le intente agregar esto:

    firebase.auth().sendSignInLinkToEmail(email.value)//esto es lo que envia el mail

links de referencia:
https://firebase.google.com/docs/auth/web/email-link-auth
https://www.youtube.com/watch?v=Vj96piq6WGk
