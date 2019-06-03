from django.urls import path
from apps.mainPage.views import index, user_view
from django.conf.urls import url


urlpatterns = [
    url(r'', index, name='index'),
]
