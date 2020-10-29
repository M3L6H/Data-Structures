//! An implementation of a skip list in Rust.
//! Supports O(log n) insertion and search while maintaining a list-like structure.

pub struct SkipList<'a, T, F> where F: Fn(&T, &T) -> i32 {
  root_list: Vec<&'a Node<'a, &'a T>>,
  size: u32,
  height: u32,
  comp: F
}

struct Node<'a, T> {
  next_list: Vec<&'a Node<'a, T>>,
  value: &'a T
}

#[cfg(test)]
mod tests {
  #[test]
  fn it_works() {
    assert_eq!(2 + 2, 4);
  }
}
