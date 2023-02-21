/**
 * 179.最大数
 * 给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。
 * 注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。
 *
 * 示例 1：
 * 输入：nums = [10,2]
 * 输出："210"
 *
 * 示例 2：
 * 输入：nums = [3,30,34,5,9]
 * 输出："9534330"
 *
 * 提示：
 * 1 <= nums.length <= 100
 * 0 <= nums[i] <= 109
 *
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/largest-number
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 进行自定义排序
 * sx = 10, sy = 10;
 * x = 34
 * y = 6
 * sx <= x sx = 100;
 * sy <= y sy = 10;
 * '' + (sx * y + x) - ('' + (sy * x + y));
 * '' + (100 * 6 + 34) - ('' + (10 * 34 + 6))
 * '' + 634 - ('' + 346)
 */

var largetNumber = function(nums) {
  nums.sort((x, y) => {
    let sx = 10,
      sy = 10;
    // 计算前置位数乘的正数
    while (sx <= x) {
      sx *= 10;
    }
    while (sy <= y) {
      sy *= 10;
    }
    // 计算两个数子进行组合后的大小进行排序
    return "" + (sx * y + x) - ("" + (sy * x + y));
  });
  if (nums[0] === 0) {
    return "0";
  }
  return nums.join("");
};
console.log(largetNumber([3, 30, 34, 5, 9]));
console.log(largetNumber([10, 2]));
