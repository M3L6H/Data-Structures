//! An implementation of a skip list in Rust.
//! Supports O(log n) insertion and search while maintaining a list-like structure.

pub struct SkipList<'a, T, F> where F: Fn(&T, &T) -> i32 {
  root_list: Vec<&'a Node<'a, &'a T>>,
  size: u32,
  height: u32,
  comp: F
}

impl<'a, T, F> SkipList<'a, T, F> where F: Fn(&T, &T) -> i32 {
  fn new(comp: F) -> Self {
    SkipList {
      root_list: Vec::new(),
      size: 0,
      height: 0,
      comp
    }
  }
}

struct Node<'a, T> {
  next_list: Vec<&'a Node<'a, T>>,
  value: &'a T
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
