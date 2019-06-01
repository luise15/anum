from django import forms
from apps.GestionUsuarios.models import Usuario


class PlantForm(forms.ModelForm):

    class Meta:
        model = Usuario

        fields = \
            [
                'Username',
                "Mail",
                "Password"
            ]
        labels = {
            "Username": "Nombre Usuario",
            "Mail": "Mail",
            "Password": "Contraseña"
        }
        widgets = {
            "Username": forms.TextInput(attrs={'class': 'form-control'}),
            "Mail": forms.EmailInput(),
            "Password": forms.PasswordInput()
        }