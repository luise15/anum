from django import forms
from apps.GestionPlantas.models import Plantas

class PlantForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('User', None)
        super(PlantForm, self).__init__(*args, **kwargs)
        self.fields["User"].initial = user


    class Meta:
        model = Plantas

        fields = [
            "plant_name",
            "plant_ip",
            "User",
            "plant_type",
        ]

        labels = {
            "plant_name": 'Nombre',
            "plant_ip": 'IP',
            "User": 'Dueño',
            "plant_type": 'Tipo',
        }

        widgets = {
            "plant_name": forms.TextInput(attrs={'class': 'form-control'}),
            "plant_ip": forms.TextInput(attrs={'class': 'form-control'}),
            "User": forms.HiddenInput()
            # "plant_type": forms.Select(attrs={'class': 'form-control'})
        }
