/**
 * 描述
 * 假设一个球从任意高度自由落下，每次落地后反跳回原高度的一半; 再落下, 求它在第5次落地时，共经历多少米?第5次反弹多高？
 *
 *
 * 数据范围：输入的小球初始高度满足 1 \le n \le 1000 \1≤n≤1000  ，且保证是一个整数
 *
 * 输入描述：
 * 输入起始高度，int型
 *
 * 输出描述：
 * 分别输出第5次落地时，共经过多少米以及第5次反弹多高。
 * 注意：你可以认为你输出保留六位或以上小数的结果可以通过此题。
 * 示例1
 * 输入：1
 * 输出：2.875
 * 0.03125
 */
/**
 * |
 * |
 * |
 * | | |
 * | | | | |
 * | | | | | | | | |
 *  1   2   3   4   5
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  while ((line = await readline())) {
    getHeight(Number(line));
  }
})();

function getHeight(num) {
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    if (i !== 4) {
      sum = num + num / 2 + sum;
    } else {
      sum = num + sum;
    }
    num = num / 2;
  }
  console.log(sum);
  console.log(num);
}
