/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
  let start = 0,
    end = 0;
  let min = Infinity;
  let sum = 0;
  while (end < nums.length) {
    sum += nums[end];
    while (sum >= target) {
      min = min > end - start + 1 ? end - start + 1 : min;
      sum -= nums[start];
      start++;
    }
    end++;
  }
  return min === Infinity ? 0 : min;
};

// 时间复杂度O(n)
// 空间复杂度O(1)
