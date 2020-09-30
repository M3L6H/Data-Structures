#include "../avl_tree.h"

#include <gtest/gtest.h>

class AVLTreeTests : public ::testing::Test {
  protected:
    void SetUp() override {
      simple_tree = new AVLTree<int>();
    }

    void TearDown() override {
      delete simple_tree;
    }

  AVLTree<int>* simple_tree;
};

TEST_F(AVLTreeTests, TreeStartsEmpty) {
  EXPECT_EQ(0, simple_tree->size());
}

TEST_F(AVLTreeTests, TreeInsertsOneElementCorrectly) {
  EXPECT_EQ(true, simple_tree->Insert(5));
  EXPECT_EQ(1, simple_tree->size());
}
