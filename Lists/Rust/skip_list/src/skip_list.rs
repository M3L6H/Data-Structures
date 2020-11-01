pub struct SkipList<T, F> where F: Fn(&T, &T) -> i32 {
  root_list: Vec<Node<T>>,
  size: u32,
  height: u32,
  comp: F
}

impl<T, F> SkipList<T, F> where F: Fn(&T, &T) -> i32 {
  pub fn new(comp: F) -> Self {
    SkipList {
      root_list: Vec::new(),
      size: 0,
      height: 0,
      comp
    }
  }

  pub fn insert(self: &mut Self, value: T) {
    if self.size == 0 {
      self.root_list.push(Node::new(value));

      self.size += 1;
      self.height = 1;
      return;
    }
  }

  pub fn size(self: &Self) -> u32 {
    self.size
  }

  pub fn height(self: &Self) -> u32 {
    self.height
  }
}

struct Node<T> {
  next_list: Vec<Node<T>>,
  value: T
}

impl<T> Node<T> {
  fn new(value: T) -> Self {
    Node {
      next_list: Vec::new(),
      value
    }
  }

  fn next_list(self: &Self) -> &Vec<Node<T>> {
    &self.next_list
  }

  fn value(self: &Self) -> &T {
    &self.value
  }
}