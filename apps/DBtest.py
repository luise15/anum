from django.test import TestCase
from apps.DBmanager import *
from django.core.exceptions import ObjectDoesNotExist


class DBTests(TestCase):

    def setUp(self):
        createUser('Tsunami', 'tsu12345', 'tusunami@gmail.com')
        newPlant('Tsunami', 'maria juana', '172.16.254.1', 'Cannabis')

    def test_createUser(self):
        self.assertEqual(Usuario.objects.count(), 1)
        self.assertRaises(AttributeError, createUser, 'Tsunami', 'TSUNAMI1234', 'tsunami@yahoo.com')

    def test_newMeasure(self):
        self.assertRaises(ObjectDoesNotExist, newMeasure, '110.18.327.2', 20, 50, 80)
        newMeasure('172.16.254.1', 20, 50, 80)
        planta = Plantas.objects.filter(plant_ip='172.16.254.1').get()
        medicion = Mediciones.objects.filter(plant=planta).get()
        self.assertEqual(medicion.Temperature, 20)
        self.assertEqual(medicion.Pressure, 50)
        self.assertEqual(medicion.Humidity, 80)
        self.assertRaises(ValueError, newMeasure, '172.16.254.1', 20, 't', 80)

    def test_getPassword(self):
        self.assertEqual('tsu12345', getPassword('Tsunami'))

    def test_getMail(self):
        self.assertEqual('tusunami@gmail.com', getMail('Tsunami'))

    def test_updatePassword(self):
        updatePassword('Tsunami', 't0912')
        self.assertEqual('t0912', getPassword('Tsunami'))

    def test_updateMail(self):
        updateMail('Tsunami', 'dummyMail@yahoo.com')
        self.assertEqual('dummyMail@yahoo.com', getMail('Tsunami'))

    def test_updateUsername(self):
        updateUsername('Tsunami', 'tusunami')
        self.assertEqual('tsu12345', getPassword('tusunami'))
        self.assertEqual('tusunami@gmail.com', getMail('tusunami'))
        self.assertEqual(Usuario.objects.filter(Username='Tsunami').count(), 0)

    def test_deleteUser(self):
        self.assertEqual(Usuario.objects.count(), 1)
        deleteUser('Tsunami')
        self.assertEqual(Usuario.objects.count(), 0)
