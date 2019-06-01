from apps.GestionDatos.models import *
from apps.GestionUsuarios.models import *
from apps.GestionPlantas.models import *
from apps.TiposPlantas.models import *


# https://docs.djangoproject.com/en/2.2/topics/db/queries/

def create_user(username, password, mail):
    if Usuario.objects.filter(Username=username).count() == 1:
        raise AttributeError('Ya esta ocupado el nombre de usuario')
    else:
        user = Usuario(Username=username,
                       Password=password,
                       Mail=mail)
        user.save()


def new_measure(ip, temperature, pressure, humidity):
    plant = Plantas.objects.filter(plant_ip=ip).get()
    measure = Mediciones(plant=plant,
                         Temperature=temperature,
                         Pressure=pressure,
                         Humidity=humidity)
    measure.save()


def get_password(username):
    usuario = Usuario.objects.filter(Username=username).get()
    return usuario.Password


def get_mail(username):
    usuario = Usuario.objects.filter(Username=username).get()
    return usuario.Mail


def delete_user(username):
    Usuario.objects.filter(Username=username).delete()


def update_password(username, new_password):
    user = Usuario.objects.filter(Username=username).get()
    user.Password = new_password
    user.save()


def update_mail(username, new_mail):
    user = Usuario.objects.filter(Username=username).get()
    user.Mail = new_mail
    user.save()


def update_username(old_username, new_username):
    user = Usuario.objects.filter(Username=old_username).get()
    user.Username = new_username
    user.save()
    Usuario.objects.filter(Username=old_username).delete()


def create_plant(username, plant_name, plant_ip, plant_type_name):
    user = Usuario.objects.filter(Username=username).get()
    plant_type = TipoPlanta.objects.filter(nombre=plant_type_name).get()
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


def get_plant_users(ip):
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


def create_plant_type(name, t_max, t_min, p_max, p_min, h_max, h_min):
    plant_type = TipoPlanta(nombre=name,
                            t_max=t_max,
                            t_min=t_min,
                            p_max=p_max,
                            p_min=p_min,
                            h_max=h_max,
                            h_min=h_min)
    plant_type.save()


def get_plant_limits(type_name):
    plant_type = TipoPlanta.objects.filter(nombre=type_name).get()
    limits = {"t_max": plant_type.t_max,
              "t_min": plant_type.t_min,
              "p_max": plant_type.p_max,
              "p_min": plant_type.p_min,
              "h_max": plant_type.h_max,
              "h_min": plant_type.h_min, }
    return limits


def exist_user(username):
    count = Usuario.objects.filter(Username=username).count()
    if count > 0:
        return True
    return False


def log_in(username, password):
    if exist_user(username):
        p = Usuario.objects.filter(Username=username).get()
        if p.Password == password:
            return True
    return False
