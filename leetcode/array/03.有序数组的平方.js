/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  let newNums = [];
  let len = nums.length - 1;
  for (let i = 0, j = nums.length - 1; i <= j; ) {
    if (nums[i] * nums[i] > nums[j] * nums[j]) {
      newNums[len--] = nums[i] * nums[i];
      i++;
    } else {
      newNums[len--] = nums[j] * nums[j];
      j--;
    }
  }
  return newNums;
};

console.log(sortedSquares([-4, -1, 0, 3, 10]));

// 时间复杂度O(n)
