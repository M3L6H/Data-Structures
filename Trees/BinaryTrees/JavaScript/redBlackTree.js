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
  _createNode(value, parent=null) {
    ++this.size;

    return {
      parent,
      value,
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
      if (gp.left === parent) {
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
      if (gp.left === parent) {
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
    switch (this.comp(value, parent.value)) {
      case -1:
        if (parent.left) {
          return this._insertChild(value, parent.left);
        } else {
          parent.left = this._createNode(value, parent);;
          return parent.left;
        }
      case 0:
        return false;
      case 1:
        if (parent.right) {
          return this._insertChild(value, parent.right);
        } else {
          parent.right = this._createNode(value, parent);
          return parent.right;
        }
    }
  }

  _correctViolations(child) {
    let parent = child.parent;

    // Correct violations
    while (parent) {
      // There is a violation
      if (parent.red && child.red) {
        const gp = parent.parent;
        const uncle = gp.left === parent ? gp.right : gp.left;

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
          if (gp.right === parent && parent.right === child) {
            this._rotateLeft(gp, parent);
  
          // Perform a right rotation
          } else if (gp.left === parent && parent.left === child) {
            this._rotateRight(gp, parent);
  
          // Need to perform a RL rotation
          } else if (gp.right === parent && parent.left === child) {
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

          // Update parent so we advance up the tree correctly
          parent = newRoot;
        }
      }

      // Advance up the tree
      child = parent;
      parent = child.parent;
    }
  }

  // Returns the node if it is found in the tree and null otherwise
  _find(value, node=this.root) {
    if (node === null) return null;
    if (value === node.val) return node;
    return value < node.val ? this._find(value, node.left) : this._find(value, node.right);
  }

  _deleteNode(node) {
    if (node.left && node.right) {

    } else if (node.left) {

    } else if (node.right) {

    } else {
      const parent = node.parent;
      node.parent = null;

      if (parent.left === node) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      
      --this.size;
    }
  }

  // Returns true on successful insertion and false otherwise
  insert(value) {
    if (this.root === null) {
      this.root = this._createNode(value);
      this.root.red = false;
      return true;
    }
    
    let child = this._insertChild(value);

    if (!child) return false;

    this._correctViolations(child);

    // Ensure that the root node's color is black
    this.root.red = false;

    return true;
  }

  // Returns the value on a successful deletion and null otherwise
  delete(value) {
    const node = _find(value);
    if (node === null) return null;
    _deleteNode(node);
    return value;
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
