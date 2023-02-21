/**
 * 描述
 * 给定 n 个字符串，请对 n 个字符串按照字典序排列。
 *
 * 数据范围： 1≤n≤1000  ，字符串长度满足 1≤len≤100
 * 输入描述：
 * 输入第一行为一个正整数n(1≤n≤1000),下面n行为n个字符串(字符串长度≤100),字符串中只含有大小写字母。
 * 输出描述：
 * 数据输出n行，输出结果为按照字典序排列的字符串。
 * 示例1
 * 输入：
 *     9
 *     cap
 *     to
 *     cat
 *     card
 *     two
 *     too
 *     up
 *     boat
 *     boot
 *
 * 输出：
 *     boat
 *     boot
 *     cap
 *     card
 *     cat
 *     to
 *     too
 *     two
 *     up
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  let count = await readline();
  let array = [];
  for (let i = 0; i < parseInt(count); i++) {
    let line = await readline();
    array.push(line);
  }

  console.log(array.sort((a, b) => (a > b ? 1 : -1)).join("\n"));
})();
