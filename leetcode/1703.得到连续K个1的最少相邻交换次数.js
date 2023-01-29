/**
 * 给你一个整数数组 nums 和一个整数 k 。 nums 仅包含 0 和 1 。每一次移动，你可以选择 相邻 两个数字并将它们交换。
 * 请你返回使 nums 中包含 k 个 连续 1 的 最少 交换次数。
 *
 * 示例 1：
 * 输入：nums = [1,0,0,1,0,1], k = 2
 * 输出：1
 * 解释：在第一次操作时，nums 可以变成 [1,0,0,0,1,1] 得到连续两个 1 。
 *
 * 示例 2：
 * 输入：nums = [1,0,0,0,0,0,1,1], k = 3
 * 输出：5
 * 解释：通过 5 次操作，最左边的 1 可以移到右边直到 nums 变为 [0,0,0,0,0,1,1,1] 。
 *
 * 示例 3：
 * 输入：nums = [1,1,0,1], k = 2
 * 输出：0
 * 解释：nums 已经有连续 2 个 1 了。
 *
 * 提示：
 * 1 <= nums.length <= 105
 * nums[i] 要么是 0 ，要么是 1 。
 * 1 <= k <= sum(nums)
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/minimum-adjacent-swaps-for-k-consecutive-ones
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 *
 * nums = [1,0,0,1,0,1], k = 2
 *
 */

function minMoves(nums, k) {
  let p = [];
  //   p = [0, 3, 5]
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      p.push(i);
    }
  }
  //   滑动窗口求一个移动位置和当前节点减去中位节点。
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += Math.abs(p[i] - p[Math.floor(k / 2)]);
  }
  let ret = sum;
  for (let i = 0; i + k < p.length; i++) {
    let mid = i + Math.floor(k / 2);
    // 减去第一个位置移动的差值
    sum -= Math.abs(p[mid] - p[i]);
    // 加上中位数后面补位数字移动位置差
    sum += Math.abs(p[k + i] - p[mid + 1]);
    // 加上中位数前面的差值
    sum += Math.floor(k / 2) * (p[mid + 1] - p[mid]);
    // 减去中位数后面的个数k - 1 - Math.floor(k / 2) 的差值
    sum -= (k - 1 - Math.floor(k / 2)) * (p[mid + 1] - p[mid]);
    ret = Math.min(ret, sum);
  }
  let offset = 0;
  //   统一减去中位数附近移动位置的偏移量
  for (let i = 0; i < k; i++) {
    offset += Math.abs(i - Math.floor(k / 2));
  }
  return ret - offset;
}

/**
 * @author shaosong
 * @description
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  while ((line = await readline())) {
    let tokens = line.split(" ");
    let k = await readline();
    console.log(minMoves(tokens.map((item) => Number(item))), Number(k));
  }
})();
