using Xunit;

namespace BinaryHeap
{
  public class BinaryHeapTest
  {
    [Fact]
    public void TestInsert()
    {
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
  }
}
