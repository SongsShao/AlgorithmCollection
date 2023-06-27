function twoSum(nums: number[], target: number): number[] {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let reduceNum = target - nums[i];
    if (map.has(reduceNum)) {
      return [i, map.get(reduceNum)];
    } else {
      map.set(nums[i], i);
    }
  }
  return [];
}
