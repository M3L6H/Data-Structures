class RadixTree:
  def __initialize__(self):
    root = None

  def is_prefix(self, a, b):
    idx = 0

    for ch in a:
      if not (ch == b[0])  :
        return idx

      idx += 1

    return idx