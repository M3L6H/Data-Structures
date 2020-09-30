#include "avl_tree.h";

template <class T>
inline const T AVLTree<T>::Node::value() const {
  return value_;
}
