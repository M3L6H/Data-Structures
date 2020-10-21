// Implemented as a max-heap (i.e. if comp returns -1 for a and b where a is the
// parent, they will be swapped)
public class BinaryHeap<T>
{
  public delegate int Comp(T a, T b);

  private Comp _comp;
  private T[] _elts;
  private int _size;
  
  public BinaryHeap(Comp comp) {
    this._comp = comp;
    this._elts = new T[8];
    this._size = 0;
  }

  public void Insert(T value) {
    if (this._size == this._elts.Length) {
      this.Resize();
    }

    this._elts[this._size] = value;
    this.BubbleUp(this._size);
    this._size++;
  }

  private void BubbleUp(int index) {
    if (index == 0) {
      return;
    }

    int parent = (index - 1) / 2;

    if (this._comp(this._elts[parent], this._elts[index]) == -1) {
      T temp = this._elts[parent];
      this._elts[parent] = this._elts[index];
      this._elts[index] = temp;

      this.BubbleUp(parent);
    }
  }

  private void Resize() {
    T[] temp = _elts;
    _elts = new T[this._elts.length * 2];

    for (int i = 0; i < temp.Length; i++) {
      _elts[i] = temp[i];
    }
  }
}