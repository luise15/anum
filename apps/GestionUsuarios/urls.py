from django.urls import path
from apps.mainPage.views import index
from django.conf.urls import url


urlpatterns = [
    url(r'', index),
]
