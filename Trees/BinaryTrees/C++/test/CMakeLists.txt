include(Dart)
cmake_minimum_required(VERSION 3.18)

set(This BinaryTreesTests)

set(Sources
  avl_tree_tests.cc
)

add_executable(${This} ${Sources})
target_link_libraries(${This} PUBLIC
  gtest_main
  BinaryTrees
)

add_test(
  NAME ${This}
  COMMAND ${This}
)
