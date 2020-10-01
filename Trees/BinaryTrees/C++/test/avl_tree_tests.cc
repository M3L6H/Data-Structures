#include "../avl_tree.h"

#include <cmath>
#include <string>
#include <utility>

#include <gtest/gtest.h>

class AVLTreeTests : public ::testing::Test {
  protected:
    void SetUp() override {
      simple_tree = new AVLTree<int>();
      abs_tree = new AVLTree<int>([](const int& a, const int& b) {
        if (std::abs(a) < std::abs(b)) {
          return -1;
        } else if (std::abs(a) == std::abs(b)) {
          return 0;
        }

        return 1;
      });
    }

    void TearDown() override {
      delete simple_tree;
      delete abs_tree;
    }

    template <class T>
    std::string PrintTree(AVLTree<T>* tree) {
      return tree->PreOrderTraversal(std::pair<char, char>('[', ']'), true);
    }

    AVLTree<int>* simple_tree;
    AVLTree<int>* abs_tree;
};

TEST_F(AVLTreeTests, TreeStartsEmpty) {
  EXPECT_EQ(0, simple_tree->size());
}

TEST_F(AVLTreeTests, TreeInsertsOneElementCorrectly) {
  EXPECT_EQ(true, simple_tree->Insert(5));
  EXPECT_EQ(1, simple_tree->size());
}

TEST_F(AVLTreeTests, ContainsShouldCheckIfValueIsInTree) {
  EXPECT_EQ(false, simple_tree->Contains(10));
  simple_tree->Insert(10);
  EXPECT_EQ(true, simple_tree->Contains(10));
}

TEST_F(AVLTreeTests, TreeShouldMaintainBalance) {
  simple_tree->Insert(5);
  EXPECT_EQ("5[* *]", PrintTree<int>(simple_tree));

  simple_tree->Insert(8);
  EXPECT_EQ("5[* 8[* *]]", PrintTree<int>(simple_tree));

  simple_tree->Insert(15);
  EXPECT_EQ("8[5[* *] 15[* *]]", PrintTree<int>(simple_tree));

  simple_tree->Insert(3);
  EXPECT_EQ("8[5[3[* *] *] 15[* *]]", PrintTree<int>(simple_tree));

  simple_tree->Insert(1);
  EXPECT_EQ("8[3[1[* *] 5[* *]] 15[* *]]", PrintTree<int>(simple_tree));
}
