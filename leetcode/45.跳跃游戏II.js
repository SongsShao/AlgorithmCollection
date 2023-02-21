/**
 * 45. 跳跃游戏 II
 * 给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。
 *
 * 每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。
 * 换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:
 *
 * 0 <= j <= nums[i]
 * i + j < n
 * 返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。
 *
 * 示例 1:
 * 输入: nums = [2,3,1,1,4]
 * 输出: 2
 * 解释: 跳到最后一个位置的最小跳跃数是 2。
 *      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 *
 * 示例 2:
 * 输入: nums = [2,3,0,1,4]
 * 输出: 2
 *
 *
 * 提示:
 * 1 <= nums.length <= 104
 * 0 <= nums[i] <= 1000
 * 题目保证可以到达 nums[n-1]
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
  let curDistance = 0; // 当前覆盖最远距离下标
  let ans = 0; // 当前跳跃次数
  let nextDistance = 0; // 下一步覆盖最远距离下标
  for (let i = 0; i < nums.length - 1; i++) {
    // 注意这里是小于nums.size() - 1，这是关键所在
    nextDistance = Math.max(nums[i] + i, nextDistance); // 更新下一步覆盖的最远距离下标
    if (i === curDistance) {
      //  遇到当前覆盖的最远距离下标
      curDistance = nextDistance; //更新当前覆盖的最远距离下标
      ans++;
    }
  }
  return ans;
};

console.log(jump([2, 3, 1, 1, 4]));
console.log(jump([2, 3, 0, 1, 4]));
