#include "../avl_tree.h"

#include <gtest/gtest.h>

TEST(AVLTreeTests, TreeStartsEmpty) {
  AVLTree<int>* tree = new AVLTree<int>();

  EXPECT_EQ(0, tree->size());
}
