from django.db import models


# Create your models here.
class TipoPlanta(models.Model):
    nombre = models.CharField(max_length=30, primary_key=True)
    t_max = models.SmallIntegerField()
    t_min = models.SmallIntegerField()
    p_max = models.PositiveSmallIntegerField()
    p_min = models.PositiveSmallIntegerField()
    h_max = models.PositiveIntegerField()
    h_min = models.PositiveIntegerField()

    def __str__(self):
        return self.nombre
