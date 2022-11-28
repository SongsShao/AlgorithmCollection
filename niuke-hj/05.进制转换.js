/**
 * 描述
写出一个程序，接受一个十六进制的数，输出该数值的十进制表示。

数据范围：保证结果在 1 \le n \le 2^{31}-1 \1≤n≤2 
31
 −1 
输入描述：
输入一个十六进制的数值字符串。

输出描述：
输出该数值的十进制字符串。不同组的测试用例用\n隔开。

示例1
输入：
0xAA
输出：
170
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

let scale16 = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

void (async function() {
  let inputNum = [];
  // Write your code here
  while ((line = await readline())) {
    inputNum.push(line.replace("0x", ""));
  }
  let inputNum10 = [];
  inputNum.map((item) => {
    let sum = 0;
    for (let i = 0; i < item.length; i++) {
      sum += scale16[item[i]] * Math.pow("16", item.length - 1 - i);
    }
    console.log(sum);
  });
})();
