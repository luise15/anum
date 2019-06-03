from apps.GestionDatos.models import *
from apps.GestionPlantas.models import *
from apps.TiposPlantas.models import *
from django.contrib.auth.models import User


# https://docs.djangoproject.com/en/2.2/topics/db/queries/

def create_user(username, password, mail):
    if User.objects.filter(username=username).count() == 1:
        raise AttributeError('Ya esta ocupado el nombre de usuario')
    else:
        user = User(username=username,
                    password=password,
                    email=mail)
        user.save()


def get_user(username):
    return User.objects.get(username=username)


def new_measure(ip, temperature, pressure, humidity):
    plant = Plantas.objects.filter(plant_ip=ip).get()
    measure = Mediciones(plant=plant,
                         Temperature=temperature,
                         Pressure=pressure,
                         Humidity=humidity)
    measure.save()


def get_password(username):
    usuario = User.objects.filter(username=username).get()
    return usuario.password


def get_mail(username):
    usuario = User.objects.filter(username=username).get()
    return usuario.email


def delete_user(username):
    User.objects.filter(username=username).delete()


def update_password(username, new_password):
    user = User.objects.filter(username=username).get()
    user.password = new_password
    user.save()


def update_mail(username, new_mail):
    user = User.objects.filter(username=username).get()
    user.email = new_mail
    user.save()


def update_username(old_username, new_username):
    user = User.objects.filter(username=old_username).get()
    user.username = new_username
    user.save()
    User.objects.filter(username=old_username).delete()


def create_plant(username, plant_name, plant_ip, plant_type_name):
    user = User.objects.filter(username=username).get()
    plant_type = TipoPlanta.objects.filter(nombre=plant_type_name).get()
    plant = Plantas(User=user,
                    plant_name=plant_name,
                    plant_ip=plant_ip,
                    plant_type=plant_type)
    plant.save()


def get_plant_name(ip):
    plant = Plantas.objects.filter(plant_ip=ip).get()
    return plant.plant_name


def get_plant(ip):
    return Plantas.objects.get(plant_ip=ip)


def get_plant_type(ip):
    plant = Plantas.objects.filter(plant_ip=ip).get()
    return plant.plant_type


def get_plant_users(ip):
    plant = Plantas.objects.filter(plant_ip=ip).get()
    return plant.User


def get_user_plants(username):
    user = User.objects.filter(username=username).get()
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
    count = User.objects.filter(username=username).count()
    if count > 0:
        return True
    return False


def log_in(username, password):
    if exist_user(username):
        p = User.objects.filter(username=username).get()
        if p.password == password:
            return True
    return False
