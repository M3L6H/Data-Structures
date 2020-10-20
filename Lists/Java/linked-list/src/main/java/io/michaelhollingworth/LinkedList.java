package io.michaelhollingworth;

import java.util.*;

// Singly-linked list implementation in Java
public class LinkedList<T> {
  private ListNode<T> root;
  private int size;
  
  // Constructor
  public LinkedList() {
    this.root = null;
    this.size = 0;
  }

  // Size getter
  public int size() {
    return this.size;
  }

  // Append to the list
  public void append(T value) {
    // If we do not have a root, create it
    if (root == null) {
      this.root = new ListNode<T>(value);
    // Otherwise, delegate to the recursive helper
    } else {
      this.appendRec(value, this.root);
    }

    // Appending never fails, so we can increase our size without concern
    this.size += 1;
  }

  // Retrieves the element at the given index
  public T get(int index) {
    // Returns null if the index is out of bounds
    // Could consider throwing an exception instead
    if (index >= this.size || index < 0) {
      return null;
    }

    // Use our findNode helper
    return this.findNode(index).get(1).value();
  }

  // Delete a node from the list
  public void delete(int index) {
    // Ignore invalid indices. Consider throwing an exception instead
    if (index >= this.size || index < 0) {
      return;
    }
    
    // Retrieve the relevant nodes
    ArrayList<ListNode<T>> nodes = this.findNode(index);
    ListNode<T> prev = nodes.get(0);
    ListNode<T> node = nodes.get(1);

    // If our previous node is null, that means we are removing the root
    if (prev == null) {
      this.root = node.next;
    // Otherwise we snip our node out of the list by skipping it
    } else {
      prev.next = node.next;
    }

    // Not strictly necessary, but good practice
    node.next = null;

    // Decrement our size
    this.size -= 1;
  }

  // Retrieves the node at the given index and its parent
  // Returns an array list of two nodes where the first node is the parent/prev
  // node and the second is the node at the given index
  private ArrayList<ListNode<T>> findNode(int index) {
    ListNode<T> node = this.root;
    ListNode<T> prev = null;

    for (int i = 0; i < index; i++) {
      prev = node;
      node = node.next;
    }

    ArrayList<ListNode<T>> nodes = new ArrayList<ListNode<T>>();

    nodes.add(prev);
    nodes.add(node);

    return  nodes;
  }

  // Recursive append helper
  private void appendRec(T value, ListNode<T> node) {
    // Base case: We found the end of the list
    if (node.next == null) {
      node.next = new ListNode<T>(value);
    // Keep traversing the list looking for the end of it
    } else {
      this.appendRec(value, node.next);
    }
  }
}

// Simple list node class
class ListNode<T> {
  private T value;
  public ListNode<T> next;
  
  public ListNode(T value) {
    this.value = value;
    this.next = null;
  }

  public T value() {
    return value;
  }
}
