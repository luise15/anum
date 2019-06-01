from django import forms
from apps.GestionUsuarios.models import Usuario


class PlantForm(forms.ModelForm):

    class Meta:
        model = Usuario

        fields = \
            [
                'Username',
                "Password",
                "Mail"
            ]
        labels = {
            "Username": "Nombre Usuario",
            "Password": "Contraseña",
            "Mail": "Mail"
        }
        widgets = {
            "Username": forms.TextInput(attrs={'class': 'form-control'}),
            "Password": forms.PasswordInput(),
            "Mail": forms.EmailInput()
        }