function fourSum(nums: number[], target: number): number[][] {
  let result: number[][] = [];
  let left: number;
  let right: number;
  nums.sort((a, b) => a - b);
  let len = nums.length;
  for (let first = 0; first < len; first++) {
    if (target > 0 && nums[first] > 0 && nums[first] > target) break;

    // 去重
    if (first > 0 && nums[first] === nums[first - 1]) continue;
    for (let second = first + 1; second < len; second++) {
      let temp = nums[first] + nums[second];

      if (target > 0 && temp > 0 && temp > target) break;

      // 去重
      if (second - first > 1 && nums[second] === nums[second - 1]) continue;
      left = second + 1;
      right = len - 1;
      while (right > left) {
        let sum = temp + nums[left] + nums[right];
        if (sum === target) {
          result.push([nums[first], nums[second], nums[left], nums[right]]);
          left++;
          right--;
          while (nums[right] === nums[right + 1]) right--;
          while (nums[left] === nums[left - 1]) left++;
        } else if (sum > target) {
          right--;
        } else {
          left++;
        }
      }
    }
  }
  return result;
}
