/**
 * 描述
 *                               1                            1     -1
 *                          1    1    1                       2     -1
 *                     1    2    3    2    1                  3     2       3 % 4 = 1
 *                 1   3    6    7    6    3    1             4     3       4 % 4 = 0
 *             1   4   10   16   19   16   10   4   1         5     2       5 % 4 = 1
 *         1   5   15  20   45   51   45   10   15  5   1     6     4       6 % 4 = 2
 *     1   6   21  40                                         7     2
 *  1  7   28                                                 8     3
 * 以上三角形的数阵，第一行只有一个数1，以下每行的每个数，是恰好是它上面的数、
 * 左上角数和右上角的数，3个数之和（如果不存在某个数，认为该数就是0）。
 *
 * 求第n行第一个偶数出现的位置。如果没有偶数，则输出-1。例如输入3,则输出2，输入4则输出3，输入2则输出-1。
 *
 * 数据范围： 1≤n≤10^9
 * 输入描述：
 * 输入一个int整数
 *
 * 输出描述：
 * 输出返回的int值
 *
 * 示例1
 * 输入：
 *      4
 * 输出：
 *      3
 */

/**
 * 解析：
 * 1 2 为-1
 * 在往下你就会发现一个规律 出现的位置为2、3、2、4循环，所以可以针对这个规律对于每个输入行数取余4即可得到对于出现位置。
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  while ((line = await readline())) {
    const num = Number(line);
    if (num === 1 || num === 2) {
      console.log(-1);
    } else {
      switch (num % 4) {
        case 1:
          console.log(2);
          break;
        case 3:
          console.log(2);
          break;
        case 2:
          console.log(4);
          break;
        case 0:
          console.log(3);
          break;
      }
    }
  }
})();
