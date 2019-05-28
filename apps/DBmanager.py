from apps.GestionDatos.models import *
from apps.GestionUsuarios.models import *
from apps.GestionPlantas.models import *


# https://docs.djangoproject.com/en/2.2/topics/db/queries/

def createUser(username, password, mail):
    if Usuario.objects.filter(Username=username).count() == 1:
        raise AttributeError('Ya esta ocupado el nombre de usuario')
    else:
        user = Usuario(Username=username,
                       Password=password,
                       Mail=mail)
        user.save()


def newMeasure(ip, temperature, pressure, humidity):
    plant = Plantas.objects.filter(plant_ip=ip).get()
    measure = Mediciones(plant=plant,
                         Temperature=temperature,
                         Pressure=pressure,
                         Humidity=humidity)
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


def newPlant(username, plant_name, plant_ip, plant_type):
    user = Usuario.objects.filter(Username=username).get()
    plant = Plantas(User=user,
                    plant_name=plant_name,
                    plant_ip=plant_ip,
                    plant_type=plant_type)
    plant.save()


def get_plant_name(ip):
    plant = Plantas.objects.filter(plant_ip=ip).get()
    return plant.plant_name


def get_plant_type(ip):
    plant = Plantas.objects.filter(plant_ip=ip).get()
    return plant.plant_type


def get_plant_user(ip):
    plant = Plantas.objects.filter(plant_ip=ip).get()
    return plant.User


def get_user_plants(username):
    user = Usuario.objects.filter(Username=username).get()
    plant = Plantas.objects.filter(User=user)
    return plant


def update_plant_name(ip, new_name):
    plant = Plantas.objects.filter(plant_ip=ip).get()
    plant.plant_name = new_name
    plant.save()


def update_plant_type(ip, new_type):
    plant = Plantas.objects.filter(plant_ip=ip).get()
    plant.plant_type = new_type
    plant.save()
