<h1 align="center">Data Structures</h1>

This is a repository containing my implementations of various data structures in
a number of idfferent languages.

- [Trees](#trees)
  - [Binary Trees](#binary-trees)
    - [Red Black Trees](#red-black-trees)

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
