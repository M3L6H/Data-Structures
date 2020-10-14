// Singly-linked list implementation in Java

public class LinkedList<T> {
  private Node<T> root;
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
      this.root = new Node<T>(value);
    } else {
      this.appendRec(value, this.root);
    }

    this.size += 1;
  }

  public T get(int index) {
    if (index >= this.size) {
      return null;
    }

    return this.findNode(index)[1].value;
  }

  public void delete(int index) {
    if (index >= this.size) {
      return;
    }
    
    Node<T>[] nodes = this.findNode(index);
    Node<T> prev = nodes[0];
    Node<T> node = nodes[1];

    if (prev == null) {
      this.root = node.next;
    } else {
      prev.next = node.next;
    }

    node.next = null;
  }

  private Node<T>[] findNode(int index) {
    Node<T> node = this.root;
    Node<T> prev = null;

    for (int i = 0; i < index; i++) {
      prev = node;
      node = node.next;
    }

    return { prev, node };
  }

  private void appendRec(T value, Node<T> node) {
    if (node.next == null) {
      node.next = new Node<T>(value);
    } else {
      this.appendRec(value, node.next);
    }
  }

  class Node<T> {
    private T value;
    public Node<T> next;
    
    public Node(T value) {
      this.value = value;
      this.next = null;
    }
  }
}