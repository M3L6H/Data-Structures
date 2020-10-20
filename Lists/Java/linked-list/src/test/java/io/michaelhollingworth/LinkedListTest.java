package io.michaelhollingworth;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class LinkedListTest {
  @Test
  void testAppend() {
    LinkedList<Character> list = new LinkedList<Character>();

    // Expect list to start empty
    assertEquals(0, list.size());

    // Expect list to contain one item after appending
    list.append('A');
    assertEquals(1, list.size());

    // Expect list to contain 26 items after appending more items
    for (char ch: "BCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray()) {
      list.append(ch);
    }
    assertEquals(26, list.size());

    // Tests using .get
    assertEquals('A', list.get(0));
    assertEquals('Z', list.get(25));
  }

  @Test
  void testGet() {
    LinkedList<Integer> list = new LinkedList<Integer>();

    // Empty list should return null
    assertEquals(null, list.get(0));

    // Get should return the element at the given index
    int[] nums = new int[] { 1, 2, 3 };

    for (int n: nums) {
      list.append(n);
    }

    assertEquals(nums[0], list.get(0));
    assertEquals(nums[1], list.get(1));
    assertEquals(nums[2], list.get(2));
    
    // Test out-of-bound indices
    assertEquals(null, list.get(-1));
    assertEquals(null, list.get(1000));
  }
}
