using Xunit;

namespace BinaryHeap {
  public class BinaryHeapTest {
    [Fact]
    public void TestInsert() {
      BinaryHeap<int> heap = new BinaryHeap<int>((int a, int b) => {
        if (a == b) {
          return 0;
        } else if (a > b) {
          return -1;
        } else {
          return 1;
        }
      });

      Assert.Equal(0, heap.Size);
      Assert.Equal(0, heap.Max);

      heap.Insert(5);

      Assert.Equal(1, heap.Size);
      Assert.Equal(5, heap.Max);

      heap.Insert(2);

      Assert.Equal(2, heap.Size);
      Assert.Equal(5, heap.Max);

      heap.Insert(7);

      Assert.Equal(3, heap.Size);
      Assert.Equal(7, heap.Max);
    }

    [Fact]
    public void TestRemoveMax() {
      BinaryHeap<int> heap = new BinaryHeap<int>((int a, int b) => {
        if (System.Math.Abs(a) == System.Math.Abs(b)) {
          return 0;
        } else if (System.Math.Abs(a) > System.Math.Abs(b)) {
          return -1;
        } else {
          return 1;
        }
      });

      heap.Insert(10);
      heap.Insert(-15);
      heap.Insert(20);
      heap.Insert(-2);
      heap.Insert(12);

      Assert.Equal(20, heap.RemoveMax());
      Assert.Equal(4, heap.Size);

      Assert.Equal(-15, heap.RemoveMax());
      Assert.Equal(12, heap.RemoveMax());
      Assert.Equal(10, heap.RemoveMax());
      Assert.Equal(-2, heap.RemoveMax());

      Assert.Equal(0, heap.Size);
      Assert.Equal(0, heap.RemoveMax());
    }
  }
}
