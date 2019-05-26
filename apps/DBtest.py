from django.test import TestCase
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'plants_settings.settings'
from apps.DBmanager import *


class DBTests(TestCase):

    def test_ingresarUsuario(self):
        createUser('Tsunami', 'tsu12345', 'tusunami@gmail.com')
        self.assertEqual(Usuario.objects.count(), 1)
        self.assertRaises(AttributeError, createUser, 'Tsunami', 'TSUNAMI1234', 'tsunami@yahoo.com')

    def test_eliminarUsuario(self):
        deleteUser('Tsunami')
        self.assertEqual(Usuario.objects.count(), 0)
