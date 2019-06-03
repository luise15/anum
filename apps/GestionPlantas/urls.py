from django.urls import path
from apps.GestionPlantas.views import plants_list, plant_view
from django.conf.urls import url
from django.contrib.auth.decorators import login_required

urlpatterns = [
    url(r'new_plant/', login_required(plant_view), name='newplant'),
    url(r'', login_required(plants_list), name='myplants'),
]
