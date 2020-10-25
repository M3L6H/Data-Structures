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
    }
  }
}
