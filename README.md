<h1 align="center">Data Structures</h1>

This is a repository containing my implementations of various data structures in
a number of dfferent languages.

- [Trees](#trees)
  - [Binary Trees](#binary-trees)
    - [AVL Trees](#avl-trees)
    - [Red-Black Trees](#red-black-trees)

## Trees

Trees are a very common data structure in programming, useful for modeling many
things.

### Binary Trees

One of the most common forms of trees is the binary search tree. When balanced,
it is useful because of its guaranteed O(log n) search time. There are many
different implementations of such trees.

#### AVL Trees

AVL trees are the classic balanced binary search tree. They maintain the
following invariant:

1. For any node in the tree, there is at most a difference of 1 between the
heights of its left and right sub-trees

This means that AVL trees are strictly balanced. They maintain this invariant
through rotations.

There are four kinds of rotations that can be performed.

A left rotation turns

```
    C
   /
  B
 /
A
```

into

```
  B
 / \
A   C
```

Similarly, a right rotation turns

```
A
 \
  B
   \
    C
```

into

```
  B
 / \
A   C
```

Then there are two compound rotations, left-right rotations and right-left
rotations that operate on "bent cases." These are cases where the imbalance in
the child node is in a different direction than the imbalance in the parent.

For example, a left-right rotation corrects the following case

```
  C
 /
A
 \
  B
```

by first rotating AB left to create

```
    C
   /
  B
 /
A
```

where BC is then rotated right to balance the tree.

Similarly, a right-left rotation corrects the following case

```
A
 \
  C
 /
B
```

by rotating BC right, then rotating AB left.

#### Red-Black Trees

Red-black trees are a particular implementation of balanced binary search trees.
They hold to the following 6 invariants:

1. Every node is either red or black
2. The root is _always_ black
3. New insertions are always red
4. The children of red nodes must always be black
5. Between any leaf node at the root, there are the same number of black nodes
6. Null nodes (i.e. leaf nodes) are considered black

Because they have a looser set of balance constraints than AVL trees, on average
lookup in an AVL tree will be faster. However, red-black Trees do still
guarantee O(log n) lookup. Additionally, insertion and deletion in a red-black
tree is faster on average than in an AVL tree, because of the looser set of
constraints.

The way red black trees preserve their invariants is by applying two kinds of
transformations based on the situation:

1. Rotation (As in an AVL tree)
2. Color flipping

After a rotation, the following configuration of nodes should be the result:

```
  B
 / \
R   R
```

Similarly, after a color change, we expect the following configuration of nodes:

```
  R
 / \
B   B
```

The conditions for performing these operations are simple. After inserting a
node, if it has a red uncle, we perform a color flip on its grandparent. If the
inserted node has a black uncle, we instead perform a rotation. This becomes
more apparent with a bit of visualization. Consider the following situation:

```
  B
 / \
R   R
```

It doesn't matter what the values of the nodes themselves are. Now suppose we
insert another node, and it is greater than all the nodes that are currently in
our tree. Then we will have the configuration below:

```
  B
 / \
R   R
     \
      R
```

Clearly this is a rule violation. We have two red nodes in a row. The question
remains: what operation to perform? By process of elimination, it could be
established that a rotation would not solve the problem, seeing as we already
have the

```
  B
 / \
R   R
```

configuration that is the result of a rotation. Also, it is readily apparent
that our new node's uncle is red. So we apply a color change and get the
following result:

```
  R
 / \
B   B
     \
      R
```

This is still an invalid red-black tree, so we flip the color of the root node
back to black.

```
  B
 / \
B   B
     \
      R
```

Now say we insert a node that is less than our most recently inserted node, but
greater than all the rest. Said node would end up with the following structure:

```
  B
 / \
B   B
     \
      R
     /
    R
```

Again, clearly an invalid tree. It is harder to see here, but the newly inserted
node's uncle is a null (leaf) node, which by definition is black, so we must
perform a rotation. In this case, we perform a RL rotation, giving us our final
structure:

```
  B
 / \
B   R (newly inserted node)
   / \
  B   R
```

Now, we are not quite done, since we need to fix the color of our nodes. Recall
the end result of a rotation should be:

```
  B
 / \
R   R
```

meaning we need to change the color of our nodes to get the correct result:

```
  B
 / \
B   B (newly inserted node)
   / \
  R   R
```
