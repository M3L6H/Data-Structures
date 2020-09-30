template <class T> class AVLTree {
  public:
    explicit AVLTree();
    explicit AVLTree(int comp (const T&, const T&));

  private:
    class Node {
      public:
        explicit Node(const T& value);

        inline const T value() const {
          return value;
        }
        
        Node* left_;
        Node* right_;

      private:
        int height_;
        T value_;
    };

    Node* root_;
};
