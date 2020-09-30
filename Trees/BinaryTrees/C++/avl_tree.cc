#include "avl_tree.h";

template <class T>
AVLTree<T>::AVLTree() : root_(nullptr), size(0) {
  comp_ = [](T a, T b) {
    if (a < b) {
      return -1;
    } else if (a == b) {
      return 0;
    }
    
    return 1;
  };
}
