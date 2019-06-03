from django.db import models
from apps.TiposPlantas.models import TipoPlanta
from django.contrib.auth.models import User

# Create your models here.
class Plantas(models.Model):
    User = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    plant_ip = models.GenericIPAddressField(primary_key=True)
    plant_name = models.CharField(max_length=20)
    plant_type = models.ForeignKey(TipoPlanta, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        cadena = '{0} => {1}, {2}'
        return cadena.format(self.User, self.plant_name, self.plant_type)