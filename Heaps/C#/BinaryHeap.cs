// Implemented as a max-heap (i.e. if comp returns -1 for a and b where a is the
// parent, they will be swapped)
public class BinaryHeap<T> {
  public delegate int Comp(T a, T b);

  // Properties
  public bool Empty => _size == 0;
  public T Max => _size == 0 ? null : _elts[0];
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
      T temp = _elts[parent];
      _elts[parent] = _elts[index];
      _elts[index] = temp;

      // We just swapped, so continue bubbling up from the new position
      BubbleUp(parent);
    }
  }

  // Resize the array when we run out of size
  private void Resize() {
    T[] temp = _elts;
    _elts = new T[_elts.length * 2];

    // Copy all the elements over
    for (int i = 0; i < temp.Length; i++) {
      _elts[i] = temp[i];
    }
  }
}