class RadixTree:
  def __initialize__(self):
    root = None

  def is_prefix(self, a, b):
    idx = 0

    for ch in a:
      if idx >= 0 and idx < len(b) and ch != b[idx]:
        return idx
      elif idx == len(b):
        idx = -1
      elif idx < 0:
        idx -= 1
      else:
        idx += 1

    return idx