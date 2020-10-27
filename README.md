<h1 align="center">Data Structures</h1>

This is a repository containing my implementations of various data structures in
a number of dfferent languages.

- [Heaps](#heaps)
  - [Binary Heaps](#binary-heaps)
- [Lists](#lists)
  - [Linked Lists](#linked-lists)
- [Trees](#trees)
  - [Binary Trees](#binary-trees)
    - [AVL Trees](#avl-trees)
    - [Red-Black Trees](#red-black-trees)
  - [Radix Tree](#radix-tree)

## Heaps

Heaps are a data structure that supports efficient insertion/removal of a max or
min element. They are frequently used as the underlying data structure of a
priority queue for example.

### Binary Heaps

- [C#](https://github.com/M3L6H/Data-Structures/blob/master/Heaps/C%23/BinaryHeap/BinaryHeapTest.cs)

A binary heap is a particular implementation of a heap. This features a binary
tree which holds to the following invariant:

1. A parent node is always greater than its children (in a max-heap).

This invariant means the root will always be the maximal element. This then
supports O(1) lookup. Under the hood, an array is typically used to represent
the binary heap. This has several advantages.

Children of a node can always be calculated via the formula 2i + 1 and 2i + 2
where i is the index of the parent. Likewise, a node's parent can easily be
retrieved via the formula (i - 1) / 2 where i is the index of the child and
floor division is used.

The biggest advantage of using an array like this is that insertion follows the
simple strategy of appending to the end of the array. The element is then
compared against its parent. If its parent is null (i.e. it is the root node) or
its parent is greater than it, nothing happens. However, if its parent is lesser
than it, they are swapped, and the process is repeated.

Similarly, max removal happens by swapping the root node with the most recently
inserted node, then swapping that node down the tree, each time exchanging it
with its greatest child. This process is repeated until the children of the node
are smaller than it.

## Lists

As one of the most basic data structures, lists are handy when a little more
functionality is needed over a primitive array.

### Linked Lists

- [Java](https://github.com/M3L6H/Data-Structures/blob/master/Lists/Java/linked-list/src/main/java/io/michaelhollingworth/LinkedList.java)

Linked lists are one of the simplest forms of lists. They are comprised of
individual nodes, each with a next pointer. The root node is stored by the data
structure, and the end of the list is denoted by a node whose next pointer is
null.

Appending to the list is as simple as traversing from the root pointer
until the end is found, at which point a new node can be added with the value to
be appended.

Likewise, lookup at a particular index involves traversing the list until the
given index is reached.

Deletion is also relatively simplistic. When the node to be deleted has been
located, the next pointer in its parent node is then reassigned to the node's
next pointer. This effectively cuts the node out of the list. In a language like
C++ where memory management is manual, the node can then be deleted.

Benefits of linked lists are that they are dynamic and can be declared without a
size at runtime. If a pointer to the end of the list is maintained, appending
can be done in O(1) time. Prepending can also happen in constant time. Likewise,
shifting and popping can happen in O(1), the latter also depending on a pointer
to the end of the list. This means that a LinkedList can be used to implement a
queue or a stack.

The downside to a linked list when compared to an array is that lookup at index
i happpens in O(n) time.

## Trees

Trees are a very common data structure in programming, useful for modeling
hierarchical data. They are frequently used for optimized search algorithms
among other things.

### Binary Trees

One of the most common forms of trees is the binary search tree. When balanced,
it is useful because of its guaranteed O(log n) search time. There are many
different implementations of such trees.

#### AVL Trees

- [C++](https://github.com/M3L6H/Data-Structures/blob/master/Trees/BinaryTrees/C%2B%2B/avl_tree.h)

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

- [JavaScript](https://github.com/M3L6H/Data-Structures/blob/master/Trees/BinaryTrees/JavaScript/redBlackTree.js)

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

### Radix Tree

- [Python](https://github.com/M3L6H/Data-Structures/blob/master/Trees/Python/radix_tree.py)

A radix tree is a modified version of a regular trie. A typical trie designed
for storing string information results in a node for each character in the
string. This creates redundant information. For example, inserting
"abracadabra" into a trie results in the creation of 11 nodes. In a radix tree,
rather than storing such information in the nodes, edges instead hold the
string values. This means that inserting "abracadabra" into a radix tree
results in two nodes with an edge between them holding the value "abracadabra".

There are several possible cases when inserting in a radix tree. The simple
case occurs when the tree is empty, or when the string being inserted has a
completely unrelated prefix.

A more advanced case is when the full prefix already exists as an edge or series
of edges in the tree. For example, suppose "a" and "app" have been inserted into
the tree. The structure will then be something like the following:

```
 o
 | "a"
 O
 | "pp"
 O
```

Note the use of "O" to signify nodes that terminate a string. When inserting
"apple," the tree finds that "a" and "pp" already exists in the tree, so it
appends to it "le".

A more complicated case is when the word to be inserted is a prefix of an
already existing tree. Suppose that a tree contains the word "harmony". We now
want to insert the word "harm". The following would be incorrect:

```
        o
 "harm" |\ "harmony"
        O O
```

since there is a common prefix between the two edges. But "harmony" already
exists as a complete edge, so it must be split at the point of the common
prefix, resulting in:

```
 o
 | "harm"
 O
 | "ony"
 O
```

Finally, there is a case where the string to be inserted shares a common prefix
with an edge that is not the entirety of the edge. An example being the edge
"card". Suppose we then want to insert "cab". Both these strings have the prefix
"ca", so we split the edge at that point, resulting in a common ancestor of "ca"
and descendents "rd" and "b".

Lookup is a simple traversal of the tree, matching prefixes until either a
mismatch is found, or the final node is not marked as a word.

Deletion is a little more sophisticated but fundamentally quite simple. First a
lookup is performed. If the node exists, there is nothing more to do. If it does
exist, it must first be marked as not a word. Then there are three cases
depending on the number of its children.

If the node has no children, it can be safely removed from the tree. If it has
one child, the node's edge should be joined with its parent edge, removing the
redundant node itself in the process. Lastly, if it has two or more children,
nothing more should be done to the node at that time.
