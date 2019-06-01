from django.db import models
from apps.GestionPlantas.models import Plantas

# Create your models here.
class Mediciones(models.Model):
    plant = models.ForeignKey(Plantas, null=True, blank=True, on_delete=models.CASCADE)
    Temperature = models.SmallIntegerField()
    Pressure = models.PositiveSmallIntegerField()
    Humidity = models.PositiveSmallIntegerField()
    Time = models.TimeField(auto_now_add=True)
    Date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        cadena = '{0} => {1}, {2}'
        return cadena.format(self.plant, self.Date, self.Time)
