/**
 * 描述
 * 功能:输入一个正整数，按照从小到大的顺序输出它的所有质因子（重复的也要列举）（如180的质因子为2 2 3 3 5 ）
 * 数据范围： 1≤n≤2×10^9+14
 * 输入描述：
 * 输入一个整数
 *
 * 输出描述：
 * 按照从小到大的顺序输出它的所有质数的因子，以空格隔开。
 *
 * 示例1
 * 输入：
 * 180
 * 输出：
 * 2 2 3 3 5
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  let line = await readline();
  let result = [];
  for (let i = 2; i < line && i * i <= line; i++) {
    if (line % i === 0) {
      line = line / i;
      result.push(i);
      i = 1;
    }
  }
  if (line !== 1) result.push(line);
  console.log(result.join(" "));
})();
