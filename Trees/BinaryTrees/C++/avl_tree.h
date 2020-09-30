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

    // Check whether the tree contains the given value
    bool Contains(const T& value) const;

    // Insert an element into the tree
    // Returns true if the insertion was successful (i.e. the tree did not
    // already contain value)
    bool Insert(const T& value);

    // Delete an element from the tree
    // Returns true if the deletion was successful (i.e. the tree contained the
    // given value)
    bool Delete(const T& value);

    // Returns the number of elements currently in the tree
    int size() const;

  private:
    // Internal node struct used to maintain tree structure
    struct Node {
      Node* parent;
      T value;
      Node* left;
      Node* right;
      int height;
      bool is_left_node;
    };

    // Creates a new blank node with the given value and increments size
    // accordingly
    Node* CreateNode(const T& value, bool is_left_node, Node* parent=nullptr);

    // Finds the node with the closest value to value
    // Will always return a non-null pointer except when the tree is empty
    Node* FindClosest(const T& value) const;

    // Returns the in-order successor of the given node
    Node* InOrderSuccessor(Node* node) const;

    // Rotates the given nodes to the right
    void RotateRight(Node* parent, Node* child);

    // Rotates the given nodes to the left
    void RotateLeft(Node* parent, Node* child);

    int size_;

    Node* root_;
    Comp comp_;
};

#endif // AVL_TREE_H_
