class RadixTree:
  def __init__(self):
    self.root = self.Node(False)

  def insert(self, value):
    # We don't permit inserting blank values
    if len(value) == 0:
      return False

    # Start at the root
    curr_node = self.root
    curr_index = 0

    # As long as we have not reached the end of our value, continue
    while curr_index < len(value):
      # Track whether our current index changed
      # i.e. whether we found a matching prefix
      change = 0
      
      # Look through all the edges in our current node
      for edge in curr_node.edges:
        # Calculate the prefix
        pref = self.is_prefix(edge.value, value[curr_index:])

        # Prefix greater than 0 means there was a match up to pref
        if pref > 0:
          # If pref is as long as edge.value, it means that edge.value was a
          # perfect prefix (i.e. it fit completely)
          if pref == len(edge.value):          
            # So we update our flag and current node and break out of this
            # inner loop, since there can be at most one matching prefix
            change = pref
            curr_node = edge.node
            break
          # Otherwise there was a mismatch at some point, but at least one
          # character matched
          else:
            # So we split the edge at the trouble point, inserting the new
            # value in the process
            edge.split(pref, value[(curr_index + pref):])
            return True
        # If pref is negative, it means there was an over-match. In other words
        # the value we are trying to insert is itself a prefix of edge.value
        # So we split the offending edge and insert a blank edge for our new
        # value
        elif pref < 0:
          edge.split(len(edge.value) + pref)
          return True

      # Adjust the current index by our change
      curr_index += change

      # If we did not change at all, it means that no matching prefix was found
      # in the last iteration of this loop, so we should break and insert a new
      # edge
      if change == 0 or curr_index == len(value):
        break

    # The value is already in the tree
    if curr_index == len(value):
      if curr_node.leaf:
        return False
      else:
        curr_node.set_leaf(True)
    else:
      # Insert a new edge with any remaining characters in our value
      curr_node.add_edge(self.Edge(value[curr_index:], self.Node()))


    return True

  def contains(self, value):
    return self.find_helper(value) != None

  def delete(self, value):
    res = self.find_helper(value)

    if res == None:
      return False

    parent, node = res

    node.set_leaf(False)

    if len(node.edges) == 0:
      if parent == None:
        return False
      else:
        parent.delete_child(node)
    elif len(node.edges) == 1:
      parent.get_edge(node).join(node.edges[0])

    return True

  def find_helper(self, value):
    if len(value) == 0:
      return None

    parent = None
    curr_node = self.root
    curr_index = 0

    while curr_index < len(value):
      change = 0

      for edge in curr_node.edges:
        pref = self.is_prefix(edge.value, value[curr_index:])

        if pref > 0:
          if pref == len(edge.value):
            change = pref
            parent = curr_node
            curr_node = edge.node
          else:
            return None
        elif pref < 0:
          return None

      curr_index += change

      if change == 0:
        break

    if curr_node.leaf and curr_index == len(value):
      return (parent, curr_node)
    else:
      return None

  def is_prefix(self, a, b):
    idx = 0

    for ch in a:
      if idx >= 0 and idx < len(b) and ch != b[idx]:
        return idx
      elif idx == len(b):
        idx = -1
      elif idx < 0:
        idx -= 1
      else:
        idx += 1

    return idx

  class Node:
    def __init__(self, leaf=True):
      self.leaf = leaf
      self.edges = []

    def add_edge(self, edge):
      self.edges.append(edge)

    def set_leaf(self, value):
      self.leaf = value

    def delete_child(self, node):
      for i in range(len(self.edges)):
        if self.edges[i].node == node:
          del self.edges[i]
          return True

      return False

    def get_edge(self, node):
      for edge in self.edges:
        if edge.node == node:
          return edge

      return None

  class Edge:
    def __init__(self, value, node):
      self.value = value
      self.node = node

    def join(self, other):
      self.value += other.value
      self.node = other.node

    def split(self, index, new_prefix=""):
      if index >= len(self.value) or index == 0:
        raise IndexError(f"Index { index } is out of bounds of 1-{ len(self.value) }")

      # Create new edges
      next_edge = RadixTree.Edge(self.value[index:], self.node)
      leaf_node = RadixTree.Node()

      # Create branch node
      branch_node = RadixTree.Node(False)
      branch_node.add_edge(next_edge)

      if len(new_prefix) > 0:
        branch_edge = RadixTree.Edge(new_prefix, leaf_node)
        branch_node.add_edge(branch_edge)
      else:
        branch_node.set_leaf(True)

      # Update current edge
      self.value = self.value[0:index]
      self.node = branch_node