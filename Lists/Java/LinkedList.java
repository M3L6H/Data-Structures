// Singly-linked list implementation in Java

public class LinkedList<T> {
  private Node<T> root;
  
  public LinkedList() {
    this.root = null;
  }

  public void append(T value) {
    if (root == null) {
      this.root = new Node<T>(value);
    } else {
      this.appendRec(value, this.root);
    }
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