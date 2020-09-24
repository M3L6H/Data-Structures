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
  }

  // Although I could have defined a class for the tree nodes, I decided they
  // were primitive enough that a POJO served the purpose just as well
  _createNode(value) {
    return {
      value,
      left: null,
      right: null,
      red: true
    };
  }

  _insertChild(value, parent=this.root) {
    switch (this.comp(value, parent.value)) {
      case -1:
        if (parent.left) {
          return this._insertChild(value, parent.left);
        } else {
          this.parent.left = this._createNode(value);
          break;
        }
      case 0:
        return false;
      case 1:
        if (parent.right) {
          return this._insertChild(value, parent.right);
        } else {
          this.parent.right = this._createNode(value);
          break;
        }
    }

    return true;
  }

  // Returns true on successful insertion and false otherwise
  insert(value) {
    if (this.root === null) {
      this.root = this._createNode(value);
      this.root.red = false;
      return true;
    }
    
    return this._insertChild(value);
  }
}

module.exports = RedBlackTree;
