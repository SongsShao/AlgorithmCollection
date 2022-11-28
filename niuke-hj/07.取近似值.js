/**
 * 描述
写出一个程序，接受一个正浮点数值，输出该数值的近似整数值。如果小数点后数值大于等于 0.5 ,向上取整；小于 0.5 ，则向下取整。

数据范围：保证输入的数字在 32 位浮点数范围内
输入描述：
输入一个正浮点数值

输出描述：
输出该数值的近似整数值

示例1
输入：
5.5

输出：
6

说明：
0.5>=0.5，所以5.5需要向上取整为6   
示例2
输入：
2.499

输出：
2

说明：
0.499<0.5，2.499向下取整为2   
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  let line = await readline();
  let numArr = line.split(".");
  if (numArr.length === 2) {
    let num = parseFloat("0." + numArr[1]);
    if (num < 0.5) {
      console.log(parseInt(numArr[0]));
    } else {
      console.log(parseInt(numArr[0]) + 1);
    }
  }
})();
