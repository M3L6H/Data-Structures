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


if __name__ == "__main__":
  unittest.main()
