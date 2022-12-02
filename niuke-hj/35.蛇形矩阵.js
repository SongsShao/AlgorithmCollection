/**
 * 描述
 * 蛇形矩阵是由1开始的自然数依次排列成的一个矩阵上三角形。
 *
 * 例如，当输入5时，应该输出的三角形为：
 *
 * 1 3 6 10 15
 * 2 5 9 14
 * 4 8 13
 * 7 12
 * 11
 *
 *
 * 输入描述：
 * 输入正整数N（N不大于100）
 *
 * 输出描述：
 * 输出一个N行的蛇形矩阵。
 *
 * 示例1
 * 输入：
 * 4
 * 输出：
 * 1 3 6 10
 * 2 5 9
 * 4 8
 * 7
 */

/**
 * 
 * 数组 arr[N][N]
 * j  i    0            1          2          3           4           i === 0 && j === 0 a[i][j] = 1;
 * 0       1            1+2 = 3    3+3 = 6    6+4 = 10    10+5 = 15   j >= 1 a[i][j] = itemArr[j - 1] + j + i + 1;

   1       1 + 1 = 2    2+3 = 5 9 14                                  i > 0 && j === 0 a[i - 1][j] + i; 
        
   2       2 + 2 = 4 8 13
        
   3       4 + 3 = 7 12
        
   4       7 + 4 = 11
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  while ((line = await readline())) {
    serpentineMatrix(Number(line));
  }
})();

function serpentineMatrix(num) {
  let a = [new Int8Array(num)];
  for (let i = 0; i < num; i++) {
    let itemArr = [];
    for (let j = 0; j < num - i; j++) {
      if (i === 0 && j === 0) {
        itemArr[j] = 1;
        continue;
      }
      if (i > 0 && j === 0) {
        // console.log(i - 1, j, a[i - 1][j]);
        itemArr[j] = a[i - 1][j] + i;
        continue;
      }
      if (j >= 1) {
        itemArr[j] = itemArr[j - 1] + j + i + 1;
        continue;
      }
    }
    console.log(itemArr.join(" "));
    a[i] = itemArr;
  }
}
