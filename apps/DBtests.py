import unittest
from apps.DBmanager import *


class DataBaseTest(unittest.TestCase):

    def ingresar_usuario_test(self):
        createUser('Tsunami', 'tsu12345', 'tusunami@gmail.com')
        self.assertEqual(Usuario.objects.count(), 1)
        self.assertRaises(Exception, createUser, 'Tsunami', 'TSUNAMI1234', 'tsunami@yahoo.com')

    def eliminar_usuario_test(self):
        deleteUser('Tsunami')
        self.assertEqual(Usuario.objects.count(), 0)


if __name__ == '__main__':
    unittest.main()