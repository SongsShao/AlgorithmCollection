/**
 * 描述
 * 任意一个偶数（大于2）都可以由2个素数组成，组成偶数的2个素数有很多种情况，本题目要求输出组成指定偶数的两个素数差值最小的素数对。
 *
 * 数据范围：输入的数据满足 4≤n≤1000
 * 输入描述：
 * 输入一个大于2的偶数
 *
 * 输出描述：
 * 从小到大输出两个素数
 *
 * 示例1
 * 输入：
 *      20
 * 输出：
 *      7
 *      13
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  while ((line = await readline())) {
    getNum(Number(line));
  }
})();
/**
 *
 * @param {Number} num
 */
function getNum(num) {
  for (let i = Math.floor(num / 2); i < num; i++) {
    let j = num - i;
    if (isPrime(i) && isPrime(j)) {
      console.log(j + "\n" + i);
      break;
    }
  }
}
/**
 * 判断是否素数
 * @param {Number} num
 * @returns boolean
 */
function isPrime(num) {
  if (num <= 3) {
    return true;
  }
  for (let i = 2; i < Math.floor(num / 2); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
