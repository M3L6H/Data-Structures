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

  @Test
  void testDelete() {
    LinkedList<String> list = new LinkedList<String>();

    String[] strings = new String[] { "cat", "dog", "camel", "horse" };

    for (String str: strings) {
      list.append(str);
    }

    // Test starting case
    assertEquals(strings.length, list.size());

    list.delete(2);

    // Test after deletion
    assertEquals(strings.length - 1, list.size());
    assertEquals(strings[3], list.get(2));

    // Test bogus deletion
    list.delete(3);
    assertEquals(strings.length - 1, list.size());

    // Clear out the list
    for (int i = 0; i < strings.length - 1; i++) {
      list.delete(0);
    }

    assertEquals(0, list.size());
    assertEquals(null, list.get(0));

    // Ensure that repopulation works correctly
    list.append("cow");
    list.append("mongoose");
    list.append("capybara");

    assertEquals(3, list.size());
    assertEquals("cow", list.get(0));
    assertEquals("capybara", list.get(2));
  }
}
