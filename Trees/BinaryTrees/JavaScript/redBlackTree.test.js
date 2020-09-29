const RedBlackTree = require("./redBlackTree.js");

test("accepts optional comparison function", () => {
  expect(new RedBlackTree()).not.toBeNull();
  expect(new RedBlackTree((a, b) => Math.sign(a - b))).not.toBeNull();
});

// This does violate the principles of unit testing, since it directly looks at
// the implementation of the red black tree. However, we want to ensure we have
// a valid red black tree, so I believe this test is justified
test("root is colored black", () => {
  const rbt = new RedBlackTree();
  rbt.insert(1);
  expect(rbt.root.red).toEqual(false);
});

test("follows the principles of bst insertion", () => {
  const rbt = new RedBlackTree();
  
  expect(rbt.insert(4)).toBeTruthy();
  expect(rbt.insert(2)).toBeTruthy();
  expect(rbt.insert(6)).toBeTruthy();
  expect(rbt.insert(1)).toBeTruthy();
  expect(rbt.insert(3)).toBeTruthy();
  expect(rbt.insert(5)).toBeTruthy();
  expect(rbt.insert(7)).toBeTruthy();

  expect(rbt.root).toBeTruthy();
  expect(rbt.root.value).toEqual(4);

  expect(rbt.root.left).toBeTruthy();
  expect(rbt.root.left.value).toEqual(2);

  expect(rbt.root.right).toBeTruthy();
  expect(rbt.root.right.value).toEqual(6);

  expect(rbt.root.left.left).toBeTruthy();
  expect(rbt.root.left.left.value).toEqual(1);

  expect(rbt.root.left.right).toBeTruthy();
  expect(rbt.root.left.right.value).toEqual(3);

  expect(rbt.root.right.left).toBeTruthy();
  expect(rbt.root.right.left.value).toEqual(5);

  expect(rbt.root.right.right).toBeTruthy();
  expect(rbt.root.right.right.value).toEqual(7);

  expect(rbt.size).toEqual(7);
});

test("rejects duplicates", () => {
  const rbt = new RedBlackTree();

  expect(rbt.insert(10)).toBeTruthy();
  expect(rbt.insert(15)).toBeTruthy();
  expect(rbt.insert(13)).toBeTruthy();
  expect(rbt.insert(5)).toBeTruthy();
  expect(rbt.insert(10)).toBeFalsy();
  expect(rbt.insert(15)).toBeFalsy();
  expect(rbt.insert(13)).toBeFalsy();
  expect(rbt.insert(5)).toBeFalsy();

  expect(rbt.size).toEqual(4);
});

test("correctly performs color flips", () => {
  let rbt = new RedBlackTree();

  rbt.insert(20);
  rbt.insert(10);
  rbt.insert(28);

  expect(rbt.root.red).toEqual(false);
  expect(rbt.root.left.red).toEqual(true);
  expect(rbt.root.right.red).toEqual(true);

  rbt.insert(30);

  expect(rbt.root.value).toEqual(20);
  expect(rbt.root.red).toEqual(false);

  expect(rbt.root.left.value).toEqual(10);
  expect(rbt.root.left.red).toEqual(false);

  expect(rbt.root.right.value).toEqual(28);
  expect(rbt.root.right.red).toEqual(false);

  expect(rbt.root.right.right.value).toEqual(30);
  expect(rbt.root.right.right.red).toEqual(true);

  rbt = new RedBlackTree();

  rbt.insert(100);
  rbt.insert(150);
  rbt.insert(10);
  rbt.insert(30);

  expect(rbt.root.value).toEqual(100);
  expect(rbt.root.red).toEqual(false);

  expect(rbt.root.left.value).toEqual(10);
  expect(rbt.root.left.red).toEqual(false);

  expect(rbt.root.right.value).toEqual(150);
  expect(rbt.root.right.red).toEqual(false);

  expect(rbt.root.left.right.value).toEqual(30);
  expect(rbt.root.left.right.red).toEqual(true);
});

test("correctly rotates", () => {
  const rbt = new RedBlackTree();

  rbt.insert(3);

  expect(rbt.root).toBeTruthy();
  expect(rbt.root.value).toEqual(3);
  expect(rbt.root.red).toEqual(false);

  rbt.insert(1);

  expect(rbt.root.value).toEqual(3);
  expect(rbt.root.red).toEqual(false);

  expect(rbt.root.left).toBeTruthy();
  expect(rbt.root.left.value).toEqual(1);
  expect(rbt.root.left.red).toEqual(true);

  rbt.insert(5);

  expect(rbt.root.value).toEqual(3);
  expect(rbt.root.red).toEqual(false);

  expect(rbt.root.left.value).toEqual(1);
  expect(rbt.root.left.red).toEqual(true);

  expect(rbt.root.right).toBeTruthy();
  expect(rbt.root.right.value).toEqual(5);
  expect(rbt.root.right.red).toEqual(true);

  rbt.insert(7);

  expect(rbt.root.value).toEqual(3);
  expect(rbt.root.red).toEqual(false);

  expect(rbt.root.left.value).toEqual(1);
  expect(rbt.root.left.red).toEqual(false);

  expect(rbt.root.right.value).toEqual(5);
  expect(rbt.root.right.red).toEqual(false);

  expect(rbt.root.right.right).toBeTruthy();
  expect(rbt.root.right.right.value).toEqual(7);
  expect(rbt.root.right.right.red).toEqual(true);

  // RL Rotation happens after this insertion
  rbt.insert(6);

  expect(rbt.root.value).toEqual(3);
  expect(rbt.root.red).toEqual(false);

  expect(rbt.root.left.value).toEqual(1);
  expect(rbt.root.left.red).toEqual(false);

  expect(rbt.root.right.value).toEqual(6);
  expect(rbt.root.right.red).toEqual(false);

  expect(rbt.root.right.left.value).toEqual(5);
  expect(rbt.root.right.left.red).toEqual(true);

  expect(rbt.root.right.right.value).toEqual(7);
  expect(rbt.root.right.right.red).toEqual(true);

  rbt.insert(8);

  expect(rbt.root.value).toEqual(3);
  expect(rbt.root.red).toEqual(false);

  expect(rbt.root.left.value).toEqual(1);
  expect(rbt.root.left.red).toEqual(false);

  expect(rbt.root.right.value).toEqual(6);
  expect(rbt.root.right.red).toEqual(true);

  expect(rbt.root.right.left.value).toEqual(5);
  expect(rbt.root.right.left.red).toEqual(false);

  expect(rbt.root.right.right.value).toEqual(7);
  expect(rbt.root.right.right.red).toEqual(false);

  expect(rbt.root.right.right.right.value).toEqual(8);
  expect(rbt.root.right.right.right.red).toEqual(true);

  rbt.insert(9);

  expect(rbt.root.value).toEqual(3);
  expect(rbt.root.red).toEqual(false);

  expect(rbt.root.left.value).toEqual(1);
  expect(rbt.root.left.red).toEqual(false);

  expect(rbt.root.right.value).toEqual(6);
  expect(rbt.root.right.red).toEqual(true);

  expect(rbt.root.right.left.value).toEqual(5);
  expect(rbt.root.right.left.red).toEqual(false);

  expect(rbt.root.right.right.value).toEqual(8);
  expect(rbt.root.right.right.red).toEqual(false);

  expect(rbt.root.right.right.left.value).toEqual(7);
  expect(rbt.root.right.right.left.red).toEqual(true);

  expect(rbt.root.right.right.right.value).toEqual(9);
  expect(rbt.root.right.right.right.red).toEqual(true);

  rbt.insert(10);

  expect(rbt.root.value).toEqual(6);
  expect(rbt.root.red).toEqual(false);

  expect(rbt.root.left.value).toEqual(3);
  expect(rbt.root.left.red).toEqual(true);

  expect(rbt.root.left.left.value).toEqual(1);
  expect(rbt.root.left.left.red).toEqual(false);

  expect(rbt.root.left.right.value).toEqual(5);
  expect(rbt.root.left.right.red).toEqual(false);

  expect(rbt.root.right.value).toEqual(8);
  expect(rbt.root.right.red).toEqual(true);

  expect(rbt.root.right.left.value).toEqual(7);
  expect(rbt.root.right.left.red).toEqual(false);

  expect(rbt.root.right.right.value).toEqual(9);
  expect(rbt.root.right.right.red).toEqual(false);

  expect(rbt.root.right.right.right.value).toEqual(10);
  expect(rbt.root.right.right.right.red).toEqual(true);
});

test("correctly maintains red black tree invariants across insertions", () => {
  const rbt = new RedBlackTree();

  rbt.insert(10);
  expect(rbt.inOrderTraversal()).toEqual("10(B)[* *]");

  rbt.insert(3);
  expect(rbt.inOrderTraversal()).toEqual("10(B)[3(R)[* *] *]");

  rbt.insert(8);
  expect(rbt.inOrderTraversal()).toEqual("8(B)[3(R)[* *] 10(R)[* *]]");

  rbt.insert(9);
  expect(rbt.inOrderTraversal()).toEqual("8(B)[3(B)[* *] 10(B)[9(R)[* *] *]]");

  rbt.insert(7);
  expect(rbt.inOrderTraversal()).toEqual("8(B)[3(B)[* 7(R)[* *]] 10(B)[9(R)[* *] *]]");

  rbt.insert(5);
  expect(rbt.inOrderTraversal()).toEqual("8(B)[5(B)[3(R)[* *] 7(R)[* *]] 10(B)[9(R)[* *] *]]");

  rbt.insert(90);
  expect(rbt.inOrderTraversal()).toEqual("8(B)[5(B)[3(R)[* *] 7(R)[* *]] 10(B)[9(R)[* *] 90(R)[* *]]]");

  rbt.insert(89);
  expect(rbt.inOrderTraversal()).toEqual("8(B)[5(B)[3(R)[* *] 7(R)[* *]] 10(R)[9(B)[* *] 90(B)[89(R)[* *] *]]]");

  rbt.insert(88);
  expect(rbt.inOrderTraversal()).toEqual("8(B)[5(B)[3(R)[* *] 7(R)[* *]] 10(R)[9(B)[* *] 89(B)[88(R)[* *] 90(R)[* *]]]]");

  rbt.insert(87);
  expect(rbt.inOrderTraversal()).toEqual("10(B)[8(R)[5(B)[3(R)[* *] 7(R)[* *]] 9(B)[* *]] 89(R)[88(B)[87(R)[* *] *] 90(B)[* *]]]");
});

test("does not delete nodes that do not exist", () => {
  const rbt = new RedBlackTree();

  rbt.insert(5);
  rbt.insert(3);
  rbt.insert(1);
  rbt.insert(7);
  rbt.insert(11);
  rbt.insert(9);

  expect(rbt.size).toEqual(6);
  expect(rbt.delete(2)).toBeFalsy();
  expect(rbt.delete(10)).toBeFalsy();
  expect(rbt.delete(100)).toBeFalsy();
  expect(rbt.delete(-3)).toBeFalsy();
  expect(rbt.size).toEqual(6);
});

test("correctly maintains red black tree invariants across deletions", () => {
  const rbt = new RedBlackTree();

  // To test the code with a particular tree, we use the internal implementation
  // to create our own tree
  rbt.root = rbt._createNode(50, null, false);

  // Create left subtree
  rbt.root.left = rbt._createNode(30, rbt.root, false);
  rbt.root.left.left = rbt._createNode(15, rbt.root.left, false);
  rbt.root.left.right = rbt._createNode(35, rbt.root.left, false);
  
  // Create right subtree
  rbt.root.right = rbt._createNode(65, rbt.root, false);
  rbt.root.right.left = rbt._createNode(55, rbt.root.right, false);
  rbt.root.right.right = rbt._createNode(70, rbt.root.right, true);
  rbt.root.right.right.left = rbt._createNode(68, rbt.root.right.right, false);
  rbt.root.right.right.right = rbt._createNode(80, rbt.root.right.right, false);
  rbt.root.right.right.right.right = rbt._createNode(90, rbt.root.right.right.right, true);

  // Check the size of the tree
  expect(rbt.size).toEqual(10);

  expect(rbt.delete(55)).toBeTruthy();
  expect(rbt.inOrderTraversal()).toEqual("50(B)[30(B)[15(B)[* *] 35(B)[* *]] 70(B)[65(B)[* 68(R)[* *]] 80(B)[* 90(R)[* *]]]]");
  expect(rbt.size).toEqual(9);
  
  expect(rbt.delete(30)).toBeTruthy();
  expect(rbt.inOrderTraversal()).toEqual("50(B)[35(B)[15(R)[* *] *] 70(R)[65(B)[* 68(R)[* *]] 80(B)[* 90(R)[* *]]]]");
  expect(rbt.size).toEqual(8);

  expect(rbt.delete(90)).toBeTruthy();
  expect(rbt.inOrderTraversal()).toEqual("50(B)[35(B)[15(R)[* *] *] 70(R)[65(B)[* 68(R)[* *]] 80(B)[* *]]]");
  expect(rbt.size).toEqual(7);
  
  expect(rbt.delete(80)).toBeTruthy();
  expect(rbt.inOrderTraversal()).toEqual("50(B)[35(B)[15(R)[* *] *] 68(R)[65(B)[* *] 70(B)[* *]]]");
  expect(rbt.size).toEqual(6);

  expect(rbt.delete(50)).toBeTruthy();
  expect(rbt.inOrderTraversal()).toEqual("65(B)[35(B)[15(R)[* *] *] 68(B)[* 70(R)[* *]]]");
  expect(rbt.size).toEqual(5);

  expect(rbt.delete(35)).toBeTruthy();
  expect(rbt.inOrderTraversal()).toEqual("65(B)[15(B)[* *] 68(B)[* 70(R)[* *]]]");
  expect(rbt.size).toEqual(4);

  expect(rbt.delete(15)).toBeTruthy();
  expect(rbt.inOrderTraversal()).toEqual("68(B)[65(B)[* *] 70(B)[* *]]");
  expect(rbt.size).toEqual(3);
});
