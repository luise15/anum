from django.db import models
from apps.GestionUsuarios.models import Usuario

# Create your models here.
class Mediciones(models.Model):
    User = models.ForeignKey(Usuario, null=True, blank=True, on_delete=models.CASCADE)
    Temperature = models.PositiveSmallIntegerField()
    Pressure = models.PositiveSmallIntegerField()
    Humidity = models.PositiveSmallIntegerField()
    Time = models.TimeField(auto_now_add=True)
    Date = models.DateTimeField(auto_now_add=True)
    Plant_type = models.CharField(max_length=50)

    def __str__(self):
        cadena = '{0} => {1}'
        return cadena.format(self.User, self.Plant_type)
