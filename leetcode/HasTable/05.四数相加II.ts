function fourSumCount(
  nums1: number[],
  nums2: number[],
  nums3: number[],
  nums4: number[]
): number {
  let map: Map<number, number> = new Map();
  for (let a of nums1) {
    for (let b of nums2) {
      map.set(a + b, (map.get(a + b) || 0) + 1);
    }
  }
  let count: number = 0;
  for (let c of nums3) {
    for (let d of nums4) {
      let target = map.get(0 - (c + d));
      if (!!target) {
        count += target;
      }
    }
  }
  return count;
}
