#ifndef AVL_TREE_H_
#define AVL_TREE_H_

#include <string>
#include <utility>

// Generic implementation of an AVL tree
// Allows specifying a comparison function
// The default comparison function uses < and == operators, so if not providing
// a comparison function, ensure that < and == are defined on T
// Example:
//    AVLTree<int>* tree = new AVLTree<int>();
//    tree->Insert(5);
//    tree->Insert(3);
//    tree->Insert(10);
//    tree->InOrderTraversal(); // 3 5 10
template <class T> class AVLTree {
  public:
    typedef int Comp (const T&, const T&);

    // Default constructor. Does not require any parameters
    explicit AVLTree() : root_(nullptr), size_(0) {
      // Initialize default comparison function
      comp_ = [](const T& a, const T& b) {
        if (a < b) {
          return -1;
        } else if (a == b) {
          return 0;
        }
        
        return 1;
      };
    }

    // Constructor providing a comparison function
    // Useful in cases where the type T to be inserted in the tree uses some
    // form of non-standard comparison
    // Can also be used to reverse the ordering of the tree
    // Example:
    //    AVLTree<int>* tree = newAVLTree<int>([](const int& a, const int& b) {
    //      if (b < a) {
    //        return -1;
    //      } else if (a == b) {
    //        return 0;
    //      }
    //
    //      return 1;
    //    });
    //
    //    tree->Insert(5);
    //    tree->Insert(2);
    //    tree->Insert(7);
    //    tree->InOrderTraversal(); // 7 5 2
    explicit AVLTree(Comp comp) : root_(nullptr), size_(0), comp_(comp) {}

    // Check whether the tree contains the given value
    bool Contains(const T& value) const;

    // Insert an element into the tree
    // Returns true if the insertion was successful (i.e. the tree did not
    // already contain value)
    bool Insert(const T& value) {
      if (root_ == nullptr) {
        root_ = CreateNode(value);
        root_->height = 1;
        return true;
      }
    }

    // Delete an element from the tree
    // Returns true if the deletion was successful (i.e. the tree contained the
    // given value)
    bool Delete(const T& value);

    // Returns the number of elements currently in the tree
    inline int size() const {
      return size_;
    }

    // Returns the pre-order traversal of the tree as a string
    // Allows the specification of an optional pair of delimeter characters to
    // further separate the tree
    std::string PreOrderTraversal() const;
    std::string PreOrderTraversal(const std::pair<char, char>& delimiter,
                                  bool show_nulls=false) const;

    // Returns the in-order traversal of the tree as a string
    std::string InOrderTraversal() const;

    // Returns the post-order traversal of the tree as a string
    std::string PostOrderTraversal() const;

  private:
    // Internal node struct used to maintain tree structure
    struct Node {
      explicit Node(T value, bool is_left_child, Node* parent)
          : value(value),
            is_left_child(is_left_child),
            parent(parent),
            left(nullptr),
            right(nullptr),
            height(0) {}
      
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
    Node* CreateNode(const T& value, bool is_left_child=false,
                     Node* parent=nullptr) {
      ++size_;
      return new Node(value, is_left_child, parent);
    }

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
    Comp* comp_;
};

#endif // AVL_TREE_H_
