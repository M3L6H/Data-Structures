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
  
  expect(rbt.insert(4)).toEqual(true);
  expect(rbt.insert(2)).toEqual(true);
  expect(rbt.insert(6)).toEqual(true);
  expect(rbt.insert(1)).toEqual(true);
  expect(rbt.insert(3)).toEqual(true);
  expect(rbt.insert(5)).toEqual(true);
  expect(rbt.insert(7)).toEqual(true);

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
});
