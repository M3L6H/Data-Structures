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
  expect(rbt.root.color).toEqual(0);
});
