// Implemented as a max-heap (i.e. if comp returns -1 for a and b where a is the
// parent, they will be swapped)
// Can of course be converted into a min-heap by reversing the comparison
// function

namespace BinaryHeap {
  public class BinaryHeap<T> {
    public delegate int Comp(T a, T b);

    // Properties
    public bool Empty => _size == 0;
    public T Max => _size == 0 ? default(T) : _elts[0];
    public int Size => _size;

    private Comp _comp;
    private T[] _elts;
    private int _size;
    
    // Constructor
    public BinaryHeap(Comp comp) {
      _comp = comp;
      _elts = new T[8];
      _size = 0;
    }

    // Inserts an element into the heap
    public void Insert(T value) {
      // If we're trying to insert into the heap and don't have space, we need to
      // expand
      if (_size == _elts.Length) {
        Resize();
      }

      // Insert the element at the end of the internal array then bubble it up
      _elts[_size] = value;
      BubbleUp(_size);

      // Increment the size pointer
      _size++;
    }

    // Removes the maximal item
    public T RemoveMax() {
      if (Empty) {
        return default(T);
      }

      T max = _elts[0];

      // Decrement the size
      _size--;
      
      // Move the last added element to the head of our internal array
      _elts[0] = _elts[_size];
      _elts[_size] = default(T);

      BubbleDown();

      return max;
    }

    // Helper method to bubble up a newly inserted element
    private void BubbleUp(int index) {
      // We are bubbling up at the root so there is nothing left to do
      if (index == 0) {
        return;
      }

      // Calculate the index of our parent
      int parent = (index - 1) / 2;

      // Perform the comparison to see if we need to swap
      if (_comp(_elts[parent], _elts[index]) == -1) {
        Swap(parent, index);

        // We just swapped, so continue bubbling up from the new position
        BubbleUp(parent);
      }
    }

    // Helper method to bubble down after removal
    private void BubbleDown(int index = 0) {
      if (index >= _size) {
        return;
      }

      // Calculate the indices of our children
      int left = index * 2 + 1;
      int right = index * 2 + 2;

      // The index of the larger child
      int maxIndex = _comp(_elts[left], _elts[right]) == -1 ? right : left;

      // Parent is smaller than the child, so swap
      if (_comp(_elts[index], _elts[maxIndex]) == -1) {
        Swap(index, maxIndex);

        BubbleDown(maxIndex);
      }
    }

    // Swap the elements at the two given indices
    private void Swap(int a, int b) {
      T temp = _elts[a];
      _elts[a] = _elts[b];
      _elts[b] = temp;
    }

    // Resize the array when we run out of size
    private void Resize() {
      T[] temp = _elts;
      _elts = new T[_elts.Length * 2];

      // Copy all the elements over
      for (int i = 0; i < temp.Length; i++) {
        _elts[i] = temp[i];
      }
    }
  }

  public class BinaryHeapEmptyException : System.Exception {
    public BinaryHeapEmptyException() {}

    public BinaryHeapEmptyException(string message) : base(message) {}

    public BinaryHeapEmptyException(string message, System.Exception inner)
      : base(message, inner) {}
  }
}
