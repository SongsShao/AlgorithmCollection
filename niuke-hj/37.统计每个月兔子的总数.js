/**
 * 描述
 * 有一种兔子，从出生后第3个月起每个月都生一只兔子，小兔子长到第三个月后每个月又生一只兔子。
 * 例子：假设一只兔子第3个月出生，那么它第5个月开始会每个月生一只兔子。
 * 一月的时候有一只兔子，假如兔子都不死，问第n个月的兔子总数为多少？
 * 数据范围：输入满足 1 \le n \le 31 \1≤n≤31
 * 输入描述：
 * 输入一个int型整数表示第n个月
 *
 * 输出描述：
 * 输出对应的兔子总数
 *
 * 示例1
 * 输入：3
 * 输出：2
 */

/**
 * 1             1
 * 1             1
 * 1    1        2
 * 11   1        3
 * 111  11       5
 * 1111  1111    8
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  while ((line = await readline())) {
    console.log(rawRabbit(Number(line)));
  }
})();

function rawRabbit(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    if (i === 0 || i === 1) {
      arr[i] = 1;
    } else {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
  }
  return arr[arr.length - 1];
}
// 递归实现
function rawRabbitRecursive(num) {
  if (num < 3) {
    return 1;
  } else {
    return rawRabbitRecursive(num - 1) + rawRabbitRecursive(num - 2);
  }
}
