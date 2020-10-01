#ifndef AVL_TREE_H_
#define AVL_TREE_H_

#include <algorithm>
#include <assert.h>
#include <sstream>
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
    //    AVLTree<int>* tree = new AVLTree<int>([](const int& a, const int& b) {
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

    ~AVLTree() {
      DeleteNode(root_);
      root_ = nullptr;
    }

    // Check whether the tree contains the given value
    bool Contains(const T& value) const {
      Node* node = FindClosest(value);

      // If find closest returned null, the tree is empty
      if (node == nullptr) return false;

      // It is possible that the node found by find closest is not the actual
      // value we need
      return comp_(value, node->value) == 0;
    }

    // Insert an element into the tree
    // Returns true if the insertion was successful (i.e. the tree did not
    // already contain value)
    bool Insert(const T& value) {
      if (root_ == nullptr) {
        root_ = CreateNode(value);
        return true;
      }

      Node* parent = FindClosest(value);

      // We have already inserted this value into the tree
      if (comp_(value, parent->value) == 0) return false;

      if (comp_(value, parent->value) == -1) {
        parent->left = CreateNode(value, parent);
      } else {
        parent->right = CreateNode(value, parent);
      }

      CorrectImbalance(parent);
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
    std::string PreOrderTraversal() const {
      return PreOrderTraversal(std::pair<char, char>(' ', '\0'));
    }
    std::string PreOrderTraversal(const std::pair<char, char>& delimiter,
                                  bool show_nulls=false) const {
      return PreOrderTraversal(delimiter, show_nulls, root_);
    }

    // Returns the in-order traversal of the tree as a string
    std::string InOrderTraversal() const;

    // Returns the post-order traversal of the tree as a string
    std::string PostOrderTraversal() const;

  private:
    // Internal node struct used to maintain tree structure
    struct Node {
      explicit Node(T value, Node* parent)
          : value(value),
            parent(parent),
            left(nullptr),
            right(nullptr),
            height(1) {}
      
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
    };

    // Creates a new blank node with the given value and increments size
    // accordingly
    Node* CreateNode(const T& value, Node* parent=nullptr) {
      ++size_;
      return new Node(value, parent);
    }

    // Deletes the given node and all its children
    void DeleteNode(Node* node) {
      if (node == nullptr) return;
      DeleteNode(node->left);
      DeleteNode(node->right);
      delete node;
    }

    // Finds the node with the closest value to value
    // Will always return a non-null pointer except when the tree is empty
    Node* FindClosest(const T& value) const {
      if (root_ == nullptr) return nullptr;
      return FindClosest(value, root_);
    }

    Node* FindClosest(const T& value, Node* node) const {
      int res = comp_(value, node->value);

      switch (res) {
        case -1: {
          if (node->left == nullptr) {
            return node;
          } else {
            return FindClosest(value, node->left);
          }
        }
        case 0: {
          return node;
        }
        case 1: {
          if (node->right == nullptr) {
            return node;
          } else {
            return FindClosest(value, node->right);
          }
        }
        default: {
          assert(false);
        }
      }
    }

    // Returns the heights of node's left and right subtrees
    std::pair<int, int> GetHeights(Node* node) const {
      int left_height = node->left == nullptr ? 0 : node->left->height;
      int right_height = node->right == nullptr ? 0 : node->right->height;

      return std::pair<int, int>(left_height, right_height);
    }
    
    // Calculates the appropriate height for the node based on its children
    int CalculateHeight(Node* node) const {
      std::pair<int, int> heights = GetHeights(node);
      return std::max(heights.first, heights.second) + 1;
    }

    // Returns the in-order successor of the given node
    Node* InOrderSuccessor(Node* node) const {
      Node* successor = node->right;

      if (successor != nullptr) {
        while (successor->left != nullptr) successor = successor->left;
      }

      return successor;
    }

    // Performs post rotation cleanup
    void RotationCleanup(Node* parent, Node* child) {
      // Update heights
      parent->height = CalculateHeight(parent);
      child->height = CalculateHeight(child);

      // Update grandparent pointer
      Node* gp = parent->parent;

      if (gp == nullptr) {
        root_ = child;
      } else {
        if (gp->left == parent) {
          gp->left = child;
        } else {
          gp->right = child;
        }
      }

      // Update parent pointers
      child->parent = gp;
      parent->parent = child;
    }

    // Rotates the given nodes to the right
    void RotateRight(Node* parent, Node* child) {
      parent->left = child->right;
      child->right = parent;

      RotationCleanup(parent, child);
    }

    // Rotates the given nodes to the left
    void RotateLeft(Node* parent, Node* child) {
      parent->right = child->left;
      child->left = parent;

      RotationCleanup(parent, child);
    }

    // Corrects imbalances
    void CorrectImbalance(Node* node) {
      // Base case
      if (node == nullptr) return;
      
      // Update node height
      std::pair<int, int> heights = GetHeights(node);
      node->height = std::max(heights.first, heights.second) + 1;

      // The next node to correct. Is not necessary the current node's parent if
      // we end up performing rotations
      Node* next_node = node->parent;

      // Compare for imbalance
      if (heights.first > heights.second + 1) {
        Node* child = node->left;
        std::pair<int, int> child_heights = GetHeights(child);

        // Check the balance factor of our child to determine rotation
        if (child_heights.first > child_heights.second) {
          RotateRight(node, child);
          next_node = child;
        } else {
          RotateLeft(child, child->right);
          next_node = node->left;
          RotateRight(node, node->left);
        }
      } else if (heights.second > heights.first + 1) {
        Node* child = node->right;
        std::pair<int, int> child_heights = GetHeights(child);

        if (child_heights.second > child_heights.first) {
          RotateLeft(node, child);
          next_node = child;
        } else {
          RotateRight(child, child->left);
          next_node = node->right;
          RotateLeft(node, node->right);
        }
      }
      
      CorrectImbalance(next_node);
    }

    std::string PreOrderTraversal(const std::pair<char, char>& delimiter,
                                  bool show_nulls,
                                  Node* node) const {
      if (node == nullptr) return show_nulls ? "*" : "";
      std::string left = PreOrderTraversal(delimiter, show_nulls, node->left);
      std::string right = PreOrderTraversal(delimiter, show_nulls, node->right);

      std::stringstream ss;
      ss << node->value;
      ss << delimiter.first;
      ss << left;
      ss << (left != "" ? " " : "");
      ss << right;
      ss << delimiter.second;

      return ss.str();
    }

    int size_;

    Node* root_;
    Comp* comp_;
};

#endif // AVL_TREE_H_
