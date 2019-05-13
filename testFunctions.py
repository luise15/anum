import unittest
from files.functions import Functions

class testFunctions(unittest.TestCase):
    
    def testHelloWorld(self):
        output = 'Hello World'
        p_output = Functions().helloWorld()
        self.assertEqual(p_output, output)
        
if __name__ == '__main__':
    unittest.main()
