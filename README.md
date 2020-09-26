# Data Structures

This is a repository containing my implementations of various data structures in
a number of idfferent languages.

## Trees

Trees are a very common data structure in programming, useful for modeling many
things.

### Binary Trees

One of the most common forms of trees is the binary search tree. When balanced,
it is useful because of its guaranteed O(log n) search time. There are many
different implementations of such trees.

#### Red Black Trees

Red black trees are a particular implementation of balanced binary search trees.
They hold to the following 6 invariants:

1. Every node is either red or black
2. The root is _always_ black
3. New insertions are always red
4. The children of red nodes must always be black
5. Between any leaf node at the root, there are the same number of black nodes
6. Null nodes (i.e. leaf nodes) are considered black

The way red black trees preserve these invariants is by applying two kinds of
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
