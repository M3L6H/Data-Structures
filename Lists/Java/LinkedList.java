import java.util.*;

// Singly-linked list implementation in Java
public class LinkedList<T> {
  private ListNode<T> root;
  private int size;
  
  public LinkedList() {
    this.root = null;
    this.size = 0;
  }

  public int size() {
    return this.size;
  }

  public void append(T value) {
    if (root == null) {
      this.root = new ListNode<T>(value);
    } else {
      this.appendRec(value, this.root);
    }

    this.size += 1;
  }

  public T get(int index) {
    if (index >= this.size) {
      return null;
    }

    return this.findNode(index).get(1).value();
  }

  public void delete(int index) {
    if (index >= this.size) {
      return;
    }
    
    ArrayList<ListNode<T>> nodes = this.findNode(index);
    ListNode<T> prev = nodes.get(0);
    ListNode<T> node = nodes.get(1);

    if (prev == null) {
      this.root = node.next;
    } else {
      prev.next = node.next;
    }

    node.next = null;
  }

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

  private void appendRec(T value, ListNode<T> node) {
    if (node.next == null) {
      node.next = new ListNode<T>(value);
    } else {
      this.appendRec(value, node.next);
    }
  }
}

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