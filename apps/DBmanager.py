from apps.GestionDatos.models import *
from apps.GestionUsuarios.models import *


# https://docs.djangoproject.com/en/2.2/topics/db/queries/

def createUser(username, password, mail):
    if Usuario.objects.filter(Username=username).count() == 1:
        raise AttributeError('Ya esta ocupado el nombre de usuario')
    else:
        user = Usuario(Username=username,
                       Password=password,
                       Mail=mail)
        user.save()


def newMeasure(username, temperature, pressure, humidity, plant_type):
    user = Usuario.objects.filter(Username=username).get()
    measure = Mediciones(User=user,
                         Temperature=temperature,
                         Pressure=pressure,
                         Humidity=humidity,
                         Plant_type=plant_type)
    measure.save()


def getPassword(username):
    usuario = Usuario.objects.filter(Username=username).get()
    return usuario.Password


def getMail(username):
    usuario = Usuario.objects.filter(Username=username).get()
    return usuario.Mail


def deleteUser(username):
    Usuario.objects.filter(Username=username).delete()


def updatePassword(username, new_password):
    user = Usuario.objects.filter(Username=username).get()
    user.Password = new_password
    user.save()


def updateMail(username, new_mail):
    user = Usuario.objects.filter(Username=username).get()
    user.Mail = new_mail
    user.save()


def updateUsername(old_username, new_username):
    user = Usuario.objects.filter(Username=old_username).get()
    user.Username = new_username
    user.save()
    Usuario.objects.filter(Username=old_username).delete()