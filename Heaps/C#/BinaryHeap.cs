// Implemented as a max-heap (i.e. if comp returns -1 for a and b where a is the
// parent, they will be swapped)
public class BinaryHeap<T> {
  public delegate int Comp(T a, T b);

  public bool Empty => _size == 0;
  public T Max => _size == 0 ? null : _elts[0];
  public int Size => _size;

  private Comp _comp;
  private T[] _elts;
  private int _size;
  
  public BinaryHeap(Comp comp) {
    _comp = comp;
    _elts = new T[8];
    _size = 0;
  }

  public void Insert(T value) {
    if (_size == _elts.Length) {
      Resize();
    }

    _elts[_size] = value;
    BubbleUp(_size);
    _size++;
  }

  private void BubbleUp(int index) {
    if (index == 0) {
      return;
    }

    int parent = (index - 1) / 2;

    if (_comp(_elts[parent], _elts[index]) == -1) {
      T temp = _elts[parent];
      _elts[parent] = _elts[index];
      _elts[index] = temp;

      BubbleUp(parent);
    }
  }

  private void Resize() {
    T[] temp = _elts;
    _elts = new T[_elts.length * 2];

    for (int i = 0; i < temp.Length; i++) {
      _elts[i] = temp[i];
    }
  }
}