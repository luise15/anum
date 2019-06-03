from django import forms
from django.contrib.auth.models import User


class PlantForm(forms.ModelForm):

    class Meta:
        model = User

        fields = \
            [
                'username',
                "email",
                "password"
            ]
        labels = {
            "username": "Nombre Usuario",
            "email": "Mail",
            "password": "Contraseña"
        }
        widgets = {
            "username": forms.TextInput(attrs={'class': 'form-control'}),
            "email": forms.EmailInput(),
            "password": forms.PasswordInput()
        }