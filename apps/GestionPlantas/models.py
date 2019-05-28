from django.db import models
from apps.GestionUsuarios.models import Usuario

# Create your models here.
class Plantas(models.Model):
    User = models.ForeignKey(Usuario, null=True, blank=True, on_delete=models.CASCADE)
    plant_name = models.CharField(max_length=20)
    plant_ip = models.GenericIPAddressField(primary_key=True)
    types = (('Rosa', 'Rosa'),
             ('Lilium', 'Lilium'),
             ('Cactus', 'Cactus'),
             ('Cannabis', 'Cannabis'),
             ('Arbol generico', 'Arbol generico'),
             ('Otro', 'Otro')
             )
    plant_type = models.CharField(max_length=20, choices=types, default='Otro')

    def __str__(self):
        cadena = '{0} => {1}, {2}'
        return cadena.format(self.User, self.plant_name, self.plant_type)