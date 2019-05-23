from apps.GestionUsuarios.models import *
from apps.GestionDatos.models import *

# https://docs.djangoproject.com/en/2.2/topics/db/queries/

def createUser(username, password, mail):
    user = Usuario(Username=username,
                   Password=password,
                   Mail=mail)
    user.save()


def newMeasure(user, temperature, pressure, humidity, plant_type):
    Mediciones.objects.create(User=user,
                              Temperature=temperature,
                              Pressure=pressure,
                              Humidity=humidity,
                              Plant_type=plant_type)
    measure = Mediciones(User=user,
                         Temperature=temperature,
                         Pressure=pressure,
                         Humidity=humidity,
                         Plant_type=plant_type)


def getPassword(username):
    usuario = Usuario.objects.filter(Username=username).get(pk=1)
    return usuario.Password


def getMail(username):
    usuario = Usuario.objects.filter(Username=username).get(pk=1)
    return usuario.Mail


def deleteUser(username):
    Usuario.objects.filter(Username=username).delete()


def updatePassword(username, new_password):
    Usuario.objects.filter(Username=username).get(pk=1).Password = new_password


def updateMail(username, new_mail):
    Usuario.objects.filter(Username=username).get(pk=1).Mail = new_mail


def updateUsername(old_username, new_username):
    Usuario.objects.filter(Username=old_username).get(pk=1).Username = new_username