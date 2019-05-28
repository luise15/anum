from django.urls import path
from apps.GestionDatos.views import index
from django.conf.urls import url


urlpatterns = [
    url(r'', index),
]
