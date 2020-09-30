cmake_minimum_required(VERSION 3.18)

set(This BinaryTrees)

project(${This} C CXX)

set(CMAKE_C_STANDARD 99)
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

enable_testing()

add_subdirectory(googletest)

set(Headers
  avl_tree.h
)

set(Sources
  avl_tree.cc
)

add_library(${This} STATIC ${Sources} ${Headers})

add_subdirectory(test)
