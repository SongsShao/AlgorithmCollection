function intersection(nums1: number[], nums2: number[]): number[] {
  if (
    (nums1 !== null && nums1.length === 0) ||
    (nums2 !== null && nums2.length === 0)
  )
    return [];
  if (nums1?.length < nums2.length) {
    let _ = nums1;
    nums1 = nums2;
    nums2 = _;
  }
  let num1Set: Set<number> = new Set(nums1);
  let retSet: Set<number> = new Set();
  for (let i = nums2.length - 1; i >= 0; i--) {
    num1Set.has(nums2[i]) && retSet.add(nums2[i]);
  }
  return Array.from(retSet);
}

function intersection1(nums1: number[], nums2: number[]): number[] {
  return Array.from(new Set(nums1.filter((item) => nums2.includes(item))));
}
