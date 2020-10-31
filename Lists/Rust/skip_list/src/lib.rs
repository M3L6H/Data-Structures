//! An implementation of a skip list in Rust.
//! Supports O(log n) insertion and search while maintaining a list-like structure.

pub struct SkipList<T, F> where F: Fn(&T, &T) -> i32 {
  root_list: Vec<Node<T>>,
  size: u32,
  height: u32,
  comp: F
}

impl<T, F> SkipList<T, F> where F: Fn(&T, &T) -> i32 {
  fn new(comp: F) -> Self {
    SkipList {
      root_list: Vec::new(),
      size: 0,
      height: 0,
      comp
    }
  }

  fn insert(self: &mut Self, value: T) {
    if self.size == 0 {
      self.root_list.push(Node::new(value));

      self.size += 1;
      self.height = 1;
      return;
    }
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
}

#[cfg(test)]
mod tests {
  use super::SkipList;
  
  #[test]
  fn it_constructs() {
    let comp = |a: &i32, b: &i32| -> i32 {
      if a < b {
        return -1;
      } else if a > b {
        return 1;
      } else {
        return 0;
      }
    };

    let list = SkipList::new(comp);
    
    assert_eq!(0, list.size);
    assert_eq!(0, list.height);
  }
}
