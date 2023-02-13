/**
 * 55. 跳跃游戏
 * @type 贪心算法
 *
 * 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 判断你是否能够到达最后一个下标。
 *
 * 示例 1：
 * 输入：nums = [2,3,1,1,4]
 * 输出：true
 * 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
 *
 * 示例 2：
 * 输入：nums = [3,2,1,0,4]
 * 输出：false
 * 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 *
 * 提示：
 * 1 <= nums.length <= 3 * 104
 * 0 <= nums[i] <= 105
 */

/**
 * 结题思路
 * [2, 3, 1, 1, 4]
 *  -------
 *     ----------
 * 不需要考虑如何去跳跃，只需要考虑调到什么位置即可。
 * 引入cover 记录当前跳跃至的位置。
 *
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  let cover = 0;
  if (nums.length === 1) return true;
  for (let i = 0; i <= cover; i++) {
    // i + nums[i] 确定当前跳跃的距离
    cover = Math.max(i + nums[i], cover);
    if (cover >= nums.length - 1) return true;
  }
  return false;
};

console.log(canJump([2, 3, 1, 1, 4]));
console.log(canJump([3, 2, 1, 0, 4]));
