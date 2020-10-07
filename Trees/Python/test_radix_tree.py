import unittest
from unittest import TestCase

from radix_tree import RadixTree

class TestRadixTree(TestCase):
  def setUp(self):
    self.radix_tree = RadixTree()
  
  def test_is_prefix(self):
    self.assertEqual(0, self.radix_tree.is_prefix("apple", "pear"))
    self.assertEqual(4, self.radix_tree.is_prefix("apple", "appliance"))
    self.assertEqual(5, self.radix_tree.is_prefix("cards", "cards"))
    self.assertEqual(-1, self.radix_tree.is_prefix("cards", "card"))
    self.assertEqual(-5, self.radix_tree.is_prefix("cardistry", "card"))
    self.assertEqual(0, self.radix_tree.is_prefix("", "blah"))

  def test_insert(self):
    self.assertFalse(self.radix_tree.insert(""))
    
    # O --poem-> O
    self.assertTrue(self.radix_tree.insert("poem"))
    self.assertFalse(self.radix_tree.insert("poem"))
    
    # O --poem-> O --s-> O
    #            |--> O
    self.assertTrue(self.radix_tree.insert("poems"))
    self.assertFalse(self.radix_tree.insert("poem"))
    self.assertFalse(self.radix_tree.insert("poems"))

    # O --poe-> O --m-> O --s-> O
    #           |       |--> O
    #           |--try-> O
    self.assertTrue(self.radix_tree.insert("poetry"))
    self.assertFalse(self.radix_tree.insert("poem"))
    self.assertFalse(self.radix_tree.insert("poems"))
    self.assertFalse(self.radix_tree.insert("poetry"))

    # O --poe-> O --m-> O --s-> O
    #           |       |--> O
    #           |--t-> O --ry-> O
    #                  |--s-> O
    self.assertTrue(self.radix_tree.insert("poets"))
    self.assertFalse(self.radix_tree.insert("poem"))
    self.assertFalse(self.radix_tree.insert("poems"))
    self.assertFalse(self.radix_tree.insert("poetry"))
    self.assertFalse(self.radix_tree.insert("poets"))

    # O --poe-> O --m-> O --s-> O
    # |         |       |--> O
    # |         |--t-> O --ry-> O
    # |                |--s-> O
    # |--adventure-> O
    self.assertTrue(self.radix_tree.insert("adventure"))
    self.assertFalse(self.radix_tree.insert("poem"))
    self.assertFalse(self.radix_tree.insert("poems"))
    self.assertFalse(self.radix_tree.insert("poetry"))
    self.assertFalse(self.radix_tree.insert("poets"))
    self.assertFalse(self.radix_tree.insert("adventure"))

    # O --poe-> O --m-> O --s-> O
    # |         |       |--> O
    # |         |--t-> O --ry-> O
    # |                |--s-> O
    # |--advent-> O --ure-> O
    #             |--> O
    self.assertTrue(self.radix_tree.insert("advent"))
    self.assertFalse(self.radix_tree.insert("poem"))
    self.assertFalse(self.radix_tree.insert("poems"))
    self.assertFalse(self.radix_tree.insert("poetry"))
    self.assertFalse(self.radix_tree.insert("poets"))
    self.assertFalse(self.radix_tree.insert("adventure"))
    self.assertFalse(self.radix_tree.insert("advent"))

  def test_contains(self):
    self.assertFalse(self.radix_tree.contains("bear"))
    self.radix_tree.insert("bear")
    self.assertTrue(self.radix_tree.contains("bear"))

    self.assertFalse(self.radix_tree.contains("bearing"))
    self.radix_tree.insert("bearing")
    self.assertTrue(self.radix_tree.contains("bearing"))
    self.assertTrue(self.radix_tree.contains("bear"))

    self.assertFalse(self.radix_tree.contains("bee"))
    self.radix_tree.insert("bee")
    self.assertTrue(self.radix_tree.contains("bee"))
    self.assertTrue(self.radix_tree.contains("bearing"))
    self.assertTrue(self.radix_tree.contains("bear"))

    self.assertFalse(self.radix_tree.contains("be"))
    self.radix_tree.insert("be")
    self.assertTrue(self.radix_tree.contains("be"))
    self.assertTrue(self.radix_tree.contains("bee"))
    self.assertTrue(self.radix_tree.contains("bearing"))
    self.assertTrue(self.radix_tree.contains("bear"))


if __name__ == "__main__":
  unittest.main()
