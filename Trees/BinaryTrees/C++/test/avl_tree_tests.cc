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

TEST_F(AVLTreeTests, InsertionsShouldMaintainBalance) {
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

  simple_tree->Insert(7);
  EXPECT_EQ("5[3[1[* *] *] 8[7[* *] 15[* *]]]", PrintTree<int>(simple_tree));

  simple_tree->Insert(20);
  EXPECT_EQ("5[3[1[* *] *] 8[7[* *] 15[* 20[* *]]]]", PrintTree<int>(simple_tree));

  simple_tree->Insert(17);
  EXPECT_EQ("5[3[1[* *] *] 8[7[* *] 17[15[* *] 20[* *]]]]", PrintTree<int>(simple_tree));
}

TEST_F(AVLTreeTests, ContainsShouldCheckIfValueIsInTree) {
  EXPECT_EQ(false, simple_tree->Contains(10));
  simple_tree->Insert(10);
  EXPECT_EQ(true, simple_tree->Contains(10));

  simple_tree->Insert(15);
  simple_tree->Insert(30);
  simple_tree->Insert(100);

  EXPECT_EQ(true, simple_tree->Contains(30));
  EXPECT_EQ(true, simple_tree->Contains(100));
  EXPECT_EQ(false, simple_tree->Contains(75));
  EXPECT_EQ(false, simple_tree->Contains(7));
}

TEST_F(AVLTreeTests, ContainsUsesCustomComparison) {
  EXPECT_EQ(false, abs_tree->Contains(-10));

  abs_tree->Insert(-10);
  EXPECT_EQ(true, abs_tree->Contains(-10));
  EXPECT_EQ(true, abs_tree->Contains(10));
}

TEST_F(AVLTreeTests, TreeUsesCustomComparison) {
  EXPECT_EQ(true, abs_tree->Insert(-10));
  EXPECT_EQ(false, abs_tree->Insert(10));
  EXPECT_EQ(true, abs_tree->Insert(5));
  EXPECT_EQ(true, abs_tree->Insert(-30));
  EXPECT_EQ(true, abs_tree->Insert(45));

  EXPECT_EQ("-10[5[* *] -30[* 45[* *]]]", PrintTree<int>(abs_tree));
}

TEST_F(AVLTreeTests, InOrderTraversalShouldGoInOrder) {
  int nums[] = { 1, 3, 5, 10, 12, 13 };

  for (int n : nums)
    EXPECT_EQ(true, simple_tree->Insert(n));
  
  EXPECT_EQ("1, 3, 5, 10, 12, 13", simple_tree->InOrderTraversal(", "));
}

TEST_F(AVLTreeTests, PostOrderTraversalShouldGoInPostOrder) {
  int nums[] = { -15, 10, 30, -3, 25, -40 };

  for (int n : nums) 
    EXPECT_EQ(true, abs_tree->Insert(n));

  EXPECT_EQ("-3 10 25 -40 30 -15", abs_tree->PostOrderTraversal());
}

TEST_F(AVLTreeTests, DeletionsShouldMaintainBalance) {
  int nums[] = { 7, 8, 15, 5, 3, 100, 78 };

  for (int n : nums)
    EXPECT_EQ(true, simple_tree->Insert(n));

  EXPECT_EQ("8[5[3[* *] 7[* *]] 78[15[* *] 100[* *]]]", PrintTree<int>(simple_tree));
  EXPECT_EQ(7, simple_tree->size());

  for (int n : nums)
    EXPECT_EQ(true, simple_tree->Contains(n));

  EXPECT_EQ(false, simple_tree->Delete(0));

  EXPECT_EQ(true, simple_tree->Delete(7));
  EXPECT_EQ(6, simple_tree->size());
  EXPECT_EQ(false, simple_tree->Contains(7));
  EXPECT_EQ("8[5[3[* *] *] 78[15[* *] 100[* *]]]", PrintTree<int>(simple_tree));

  EXPECT_EQ(true, simple_tree->Delete(8));
  EXPECT_EQ(5, simple_tree->size());
  EXPECT_EQ(false, simple_tree->Contains(8));
  EXPECT_EQ("15[5[3[* *] *] 78[* 100[* *]]]", PrintTree<int>(simple_tree));

  EXPECT_EQ(true, simple_tree->Delete(78));
  EXPECT_EQ(4, simple_tree->size());
  EXPECT_EQ(false, simple_tree->Contains(78));
  EXPECT_EQ("15[5[3[* *] *] 100[* *]]", PrintTree<int>(simple_tree));

  EXPECT_EQ(true, simple_tree->Delete(100));
  EXPECT_EQ(3, simple_tree->size());
  EXPECT_EQ(false, simple_tree->Contains(100));
  EXPECT_EQ("5[3[* *] 15[* *]]", PrintTree<int>(simple_tree));

  EXPECT_EQ(true, simple_tree->Delete(3));
  EXPECT_EQ(true, simple_tree->Delete(5));
  EXPECT_EQ(true, simple_tree->Delete(15));

  EXPECT_EQ(0, simple_tree->size());
  EXPECT_EQ(false, simple_tree->Delete(15));
  EXPECT_EQ("*", PrintTree<int>(simple_tree));

  for (int n : nums)
    EXPECT_EQ(true, simple_tree->Insert(n));

  EXPECT_EQ("8[5[3[* *] 7[* *]] 78[15[* *] 100[* *]]]", PrintTree<int>(simple_tree));
  EXPECT_EQ(7, simple_tree->size());
}
