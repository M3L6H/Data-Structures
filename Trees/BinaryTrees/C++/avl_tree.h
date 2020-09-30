#ifndef AVL_TREE_H_
#define AVL_TREE_H_

template <class T> class AVLTree {
  public:
    explicit AVLTree();
    explicit AVLTree(int comp (const T&, const T&));

  private:
    class Node {
      public:
        explicit Node(const T& value);

        const T value() const;
        
        Node* left_;
        Node* right_;

      private:
        int height_;
        T value_;
    };

    Node* root_;
};

#endif // AVL_TREE_H_
