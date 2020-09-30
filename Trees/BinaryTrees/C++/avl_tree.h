#ifndef AVL_TREE_H_
#define AVL_TREE_H_

// Generic implementation of an AVL tree
// Allows specifying a comparison function
// The default comparison function uses < and == operators, so if not providing
// a comparison function, ensure that < and == are defined on T
template <class T> class AVLTree {
  public:
    typdef int Comp (const T&, const T&);
  
    explicit AVLTree();
    explicit AVLTree(Comp comp);

  private:
    // Internal node struct used to maintain tree structure
    struct Node {
      T value;
      Node* left;
      Node* right;
      int height;
    };

    Node* root_;
    Comp comp_;
};

#endif // AVL_TREE_H_
