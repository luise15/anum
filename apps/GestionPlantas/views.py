from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from apps.DBmanager import get_user_plants, get_user
from apps.GestionPlantas.forms import PlantForm
from apps.GestionPlantas.models import Plantas


# Create your views here.
def plants_list(request):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    plants = get_user_plants(username)
    contexto = {'plants': plants}
    return render(request, 'myplants.html', contexto)

def plant_view(request):
    user = get_user(username=request.user.username)
    if request.method == 'POST':
        args = {'User': user}
        form = PlantForm(request.POST, args)
        if form.is_valid():
            form.save()
        return redirect('myplants')
    else:
        form = PlantForm({'User': user})
    return render(request, 'plantform.html', {'form': form})

'''
def plant_edit(request, ip_plant):
    plants = get_plant(ip_plant)
    if request.method == 'GET':
        form = plan
'''