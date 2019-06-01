from django.shortcuts import render, redirect
from apps.mainPage.forms import PlantForm


# Create your views here.
def index(request):
    return render(request, 'index.html')


def user_view(request):
    if request.method == 'POST':
        form = PlantForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('index2')
    else:
        form = PlantForm()

    return render(request, 'registrar.html', {'form': form})