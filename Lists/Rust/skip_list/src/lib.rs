//! An implementation of a skip list in Rust.
//! Supports O(log n) insertion and search while maintaining a list-like structure.

pub mod skip_list;

#[cfg(test)]
mod tests {
  use super::skip_list::SkipList;
  
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
    
    assert_eq!(0, list.size());
    assert_eq!(0, list.height());
  }
}
