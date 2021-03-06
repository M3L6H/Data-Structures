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
  _createNode(value, parent=null, red=true) {
    ++this.size;

    return {
      parent,
      value,
      left: null,
      right: null,
      red
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

  _correctInsertionViolations(child) {
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
    if (this.comp(value, node.value) === 0) return node;
    return this.comp(value, node.value) < 0 ? this._find(value, node.left) : this._find(value, node.right);
  }

  _correctDeletionViolations(child) {
    // Deleting a red node will never break the rules of a RB tree, so no
    // correction is needed
    if (child.red) return;
    
    const parent = child.parent;

    // If we are the root node there is no correction to be done
    if (!parent) return;
    
    const sibling = parent.left === child ? parent.right : parent.left;

    if (sibling.red) {
      sibling.red = parent.red;
      parent.red = true;

      if (parent.left === child) {
        this._rotateLeft(parent, sibling);
      } else {
        this._rotateRight(parent, sibling);
      }

      this._correctDeletionViolations(child);
    } else {
      // Sibling is black and both its children are black
      if ((!sibling.left || !sibling.left.red) && (!sibling.right || !sibling.right.red)) {
        sibling.red = true;
        
        // If the parent is red, we just flip it to black
        if (parent.red) {
          parent.red = false;

        // Otherwise we need to correct the parent
        } else {
          this._correctDeletionViolations(parent);
        }
      
      // Complicated as this conditional looks, it is essentially checking
      // whether the farther child of our sibling is black
      } else if ((parent.left === child && (!sibling.right || !sibling.right.red)) || 
                 (parent.right === child && (!sibling.left || !sibling.left.red))) {
        const niece = parent.left === child ? sibling.left : sibling.right;
        niece.red = false;
        sibling.red = true;

        if (parent.left === child) {
          this._rotateRight(sibling, niece);
        } else {
          this._rotateLeft(sibling, niece);
        }

        this._correctDeletionViolations(child);
      // We have established that one of the nieces is red. It is not the
      // nearer child, so that means it is now the farther child that is red
      } else {
        sibling.red = parent.red;
        parent.red = false;

        if (parent.left === child) {
          this._rotateLeft(parent, sibling);
        } else {
          this._rotateRight(parent, sibling);
        }

        const niece = parent.left === child ? sibling.right : sibling.left;
        niece.red = false;
      }
    }
  }

  _deleteNode(node) {
    // We have two children, so replace our value with that of our in order
    // successor and delete that
    if (node.left && node.right) {
      let inOrderSuccessor = node.right;
      while (inOrderSuccessor.left) inOrderSuccessor = inOrderSuccessor.left;
      node.value = inOrderSuccessor.value;
      this._deleteNode(inOrderSuccessor);

    // We have one child, so replace our value with our child's value and delete
    // the child instead
    } else if (node.left) {
      node.value = node.left.value;
      this._deleteNode(node.left);
    } else if (node.right) {
      node.value = node.right.value;
      this._deleteNode(node.right);

    // We have no children, so we delete ourselves by removing our connection
    // from the tree
    } else {
      this._correctDeletionViolations(node);
      
      const parent = node.parent;
      node.parent = null;

      // We are deleting the root node, so update our root pointer
      if (parent === null) {
        this.root = null;
      
      // We are deleting a leaf node, so update our parent node's pointer
      } else {
        if (parent.left === node) {
          parent.left = null;
        } else {
          parent.right = null;
        }
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

    this._correctInsertionViolations(child);

    // Ensure that the root node's color is black
    this.root.red = false;

    return true;
  }

  // Returns the value on a successful deletion and null otherwise
  delete(value) {
    const node = this._find(value);
    if (node === null) return null;
    this._deleteNode(node);
    return value;
  }

  inOrderTraversal(parent=this.root) {
    if (!parent) return "";
    return this.inOrderTraversal(parent.left) + `${ parent.value }(${ parent.red ? "R" : "B" }) ` + this.inOrderTraversal(parent.right);
  }

  preOrderTraversal(parent=this.root) {
    if (!parent) return "*";
    return `${ parent.value }(${ parent.red ? "R" : "B" })[` + this.preOrderTraversal(parent.left) + " " + this.preOrderTraversal(parent.right) + "]";
  }
}

module.exports = RedBlackTree;
