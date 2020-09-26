// In this implementation of a red-black tree, color is represented by the
// boolean flag red.

// It also accepts an optional comparator function. The comparator function
// should be a binary function that returns -1, 0, and 1, representing the
// concept of "less than", "equal", and "greater than" respectively. The default
// comparator uses Math.sign, which works for numbers, but does not work for
// strings or other objects.

class RedBlackTree {
  constructor(comp=null) {
    this.comp = comp || ((a, b) => Math.sign(a - b));
    this.root = null;
    this.size = 0;
  }

  // Although I could have defined a class for the tree nodes, I decided they
  // were primitive enough that a POJO served the purpose just as well
  _createNode(value, isLeftChild, parent=null) {
    ++this.size;

    return {
      parent,
      value,
      isLeftChild,
      left: null,
      right: null,
      red: true
    };
  }

  _rotateLeft(parent, child) {
    const gp = parent.parent;
    parent.right = child.left;
    child.left = parent;

    if (gp) {
      if (parent.isLeftChild) {
        gp.left = child;
      } else {
        gp.right = child;
      }
    } else {
      this.root = child;
    }

    child.parent = gp;
    parent.parent = child;
  }

  _rotateRight(parent, child) {
    const gp = parent.parent;
    parent.left = child.right;
    child.right = parent;

    if (gp) {
      if (parent.isLeftChild) {
        gp.left = child;
      } else {
        gp.right = child;
      }
    } else {
      this.root = child;
    }

    child.parent = gp;
    parent.parent = child;
  }

  _insertChild(value, parent=this.root) {
    let child;
    
    // Perform insertion operation here
    switch (this.comp(value, parent.value)) {
      case -1:
        if (parent.left) {
          child = this._insertChild(value, parent.left);
        } else {
          child = this._createNode(value, true, parent);
          parent.left = child;
        }
        break;
      case 0:
        return false;
      case 1:
        if (parent.right) {
          child = this._insertChild(value, parent.right);
        } else {
          child = this._createNode(value, false, parent);
          parent.right = child;
        }
        break;
    }

    // We have already failed the insertion, so keep returning
    if (!child) return false;

    // There is a violation
    if (parent.red && child.red) {
      const gp = parent.parent;
      const uncle = parent.isLeftChild ? gp.right : gp.left;

      // Red uncle means a color change
      if (uncle && uncle.red) {
        gp.red = true;
        uncle.red = false;
        parent.red = false;

      // Otherwise we perform a rotation
      // Recall that null nodes are considered black
      } else {
        let newRoot = parent;
        
        // Perform a left rotation
        if (!parent.isLeftChild && !child.isLeftChild) {
          this._rotateLeft(gp, parent);

        // Perform a right rotation
        } else if (parent.isLeftChild && child.isLeftChild) {
          this._rotateRight(gp, parent);

        // Need to perform a RL rotation
        } else if (!parent.isLeftChild && child.isLeftChild) {
          this._rotateRight(parent, child);

          // After the right rotation, child is now parent's parent, so we
          // perform the subsequent left rotation with the gp and child pointers
          this._rotateLeft(gp, child);

          // The result of our rotations is the new root of the subtree is our
          // original child node
          newRoot = child;

        // Need to perform an LR rotation
        } else {
          this._rotateLeft(parent, child);
          this._rotateRight(gp, child);
          newRoot = child;
        }

        // Re-color
        newRoot.red = false;
        newRoot.left.red = true;
        newRoot.right.red = true;

        return newRoot;
      }
    }

    return parent;
  }

  // Returns true on successful insertion and false otherwise
  insert(value) {
    if (this.root === null) {
      this.root = this._createNode(value);
      this.root.red = false;
      return true;
    }
    
    const res = this._insertChild(value);

    // Ensure that the root node's color is black
    this.root.red = false;

    return !(!res);
  }

  preOrderTraversal(parent=this.root) {
    if (!parent) return "";
    return this.preOrderTraversal(parent.left) + `${ parent.value }(${ parent.red ? "R" : "B" }) ` + this.preOrderTraversal(parent.right);
  }

  inOrderTraversal(parent=this.root) {
    if (!parent) return "*";
    return `${ parent.value }(${ parent.red ? "R" : "B" })[` + this.inOrderTraversal(parent.left) + " " + this.inOrderTraversal(parent.right) + "]";
  }
}

module.exports = RedBlackTree;
