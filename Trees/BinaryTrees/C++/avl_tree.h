#ifndef AVL_TREE_H_
#define AVL_TREE_H_

#include <string>
#include <utility>

// Generic implementation of an AVL tree
// Allows specifying a comparison function
// The default comparison function uses < and == operators, so if not providing
// a comparison function, ensure that < and == are defined on T
// Example:
//    AVLTree* tree = new AVLTree();
//    tree->Insert(5);
//    tree->Insert(3);
//    tree->Insert(10);
//    tree->InOrderTraversal(); // 3 5 10
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

    // Returns the pre-order traversal of the tree as a string
    // Allows the specification of an optional pair of delimeter characters to
    // further separate the tree
    std::string PreOrderTraversal() const;
    std::string PreOrderTraversal(const std::pair<char, char>& delimiter,
                                  bool show_nulls=false) const;

    // Returns the in-order traversal of the tree as a string
    std::string InOrderTraversal() const;

    // Returns the post-order traversal of the tree as a string
    std::string PreOrderTraversal() const;

  private:
    // Internal node struct used to maintain tree structure
    struct Node {
      // Pointer to the parent of this node. Null if this is the root node
      Node* parent;

      // Pointers to the left and right children of this node
      // Null if this is a leaf node
      Node* left;
      Node* right;

      T value;

      // The height of this node
      // 1 if this is a leaf node
      // Will always be one less than the height of its parent
      int height;

      // Flag for whether this is a left or right child
      // Meaningless in the case of the root node
      bool is_left_child;
    };

    // Creates a new blank node with the given value and increments size
    // accordingly
    Node* CreateNode(const T& value, bool is_left_child, Node* parent=nullptr);

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
