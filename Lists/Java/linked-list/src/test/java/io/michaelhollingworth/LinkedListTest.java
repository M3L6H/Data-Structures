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
  }
}
