// In this implementation of a red-black tree, color is represented by the
// numbers 0 and 1. 0 represents black while 1 represents red.

export default class RedBlackTree {
  constructor(comp=null) {
    this.comp = comp || ((a, b) => a < b);
    this.root = null;
  }

  // Although I could have defined a class for the tree nodes, I decided they
  // were primitive enough that a POJO served the purpose just as well
  _createNode(value) {
    return {
      value,
      left: null,
      right: null,
      color: 1
    };
  }

  insert(value, root=this.root) {
    if (this.root === null) {
      this.root = this._createNode(value);
    } else {
      
    }
  }
}
