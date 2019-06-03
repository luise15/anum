from django.test import TestCase
from apps.DBmanager import *
from django.core.exceptions import ObjectDoesNotExist


class DBTests(TestCase):

    def setUp(self):
        create_user('Tsunami', 'tsu12345', 'tusunami@gmail.com')
        create_plant_type('Cannabis', 30, 10, 10, 100, 50, 95)
        create_plant('Tsunami', 'maria juana', '172.16.254.1', 'Cannabis')

    def test_create_user(self):
        self.assertEqual(User.objects.count(), 1)
        self.assertRaises(AttributeError, create_user, 'Tsunami', 'TSUNAMI1234', 'tsunami@yahoo.com')

    def test_new_measure(self):
        self.assertRaises(ObjectDoesNotExist, new_measure, '110.18.327.2', 20, 50, 80)
        new_measure('172.16.254.1', 20, 50, 80)
        planta = Plantas.objects.filter(plant_ip='172.16.254.1').get()
        medicion = Mediciones.objects.filter(plant=planta).get()
        self.assertEqual(medicion.Temperature, 20)
        self.assertEqual(medicion.Pressure, 50)
        self.assertEqual(medicion.Humidity, 80)
        self.assertRaises(ValueError, new_measure, '172.16.254.1', 20, 't', 80)

    def test_get_password(self):
        self.assertEqual('tsu12345', get_password('Tsunami'))

    def test_get_mail(self):
        self.assertEqual('tusunami@gmail.com', get_mail('Tsunami'))

    def test_update_password(self):
        update_password('Tsunami', 't0912')
        self.assertEqual('t0912', get_password('Tsunami'))

    def test_update_mail(self):
        update_mail('Tsunami', 'dummyMail@yahoo.com')
        self.assertEqual('dummyMail@yahoo.com', get_mail('Tsunami'))

    def test_update_username(self):
        update_username('Tsunami', 'tusunami')
        self.assertEqual('tsu12345', get_password('tusunami'))
        self.assertEqual('tusunami@gmail.com', get_mail('tusunami'))
        self.assertEqual(User.objects.filter(username='Tsunami').count(), 0)

    def test_delete_user(self):
        self.assertEqual(User.objects.count(), 1)
        delete_user('Tsunami')
        self.assertEqual(User.objects.count(), 0)

    def test_get_plant_name(self):
        name = get_plant_name('172.16.254.1')
        self.assertEqual(name, 'maria juana')

    def test_get_plant_type(self):
        cannabis_type = TipoPlanta.objects.filter(nombre='Cannabis').get()
        plant_type = get_plant_type('172.16.254.1')
        self.assertEqual(cannabis_type, plant_type)

    def test_get_plant_users(self):
        user = get_plant_users('172.16.254.1')
        real_user = User.objects.filter(username='Tsunami').get()
        self.assertEqual(user, real_user)

    def test_get_user_plants(self):
        user = User.objects.filter(username='Tsunami').get()
        plant = Plantas.objects.filter(User=user).get()
        user_plant = get_user_plants('Tsunami').get()
        self.assertEqual(plant, user_plant)

    def test_update_plant_name(self):
        update_plant_name('172.16.254.1', 'planty')
        planta = Plantas.objects.filter(plant_ip='172.16.254.1').get()
        self.assertEqual(planta.plant_name, 'planty')

    def test_update_plant_type(self):
        p_type = TipoPlanta(nombre='Rosa',
                          t_max=50,
                          t_min=20,
                          p_max=600,
                          p_min=100,
                          h_min=20,
                          h_max=30)
        p_type.save()
        update_plant_type('172.16.254.1', p_type)
        plant = Plantas.objects.filter(plant_ip='172.16.254.1').get()
        self.assertEqual(plant.plant_type, p_type)

    def test_get_plant_limits(self):
        l = get_plant_limits('Cannabis')
        self.assertEqual(l['t_max'], 30)
        self.assertEqual(l['t_min'], 10)
        self.assertEqual(l['p_max'], 10)
        self.assertEqual(l['p_min'], 100)
        self.assertEqual(l['h_max'], 50)
        self.assertEqual(l['h_min'], 95)

    def test_exits_user(self):
        self.assertTrue(exist_user('Tsunami'))
        self.assertFalse(exist_user('Marepoto'))

    def test_login(self):
        self.assertTrue(log_in('Tsunami', 'tsu12345'))
        self.assertFalse(log_in('Marepoto', 'tsu12345'))
        self.assertFalse(log_in('Tsunami', '123456asgewq'))

    def test_get_user(self):
        user = User.objects.get(username='Tsunami')
        self.assertEqual(get_user('Tsunami'), user)