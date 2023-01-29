/**
 * 描述
 * 把m个同样的苹果放在n个同样的盘子里，允许有的盘子空着不放，问共有多少种不同的分法？
 * 注意：如果有7个苹果和3个盘子，（5，1，1）和（1，5，1）被视为是同一种分法。
 *
 * 数据范围：0≤m≤10，1≤n≤10 。
 *
 * 输入描述：
 * 输入两个int整数
 *
 * 输出描述：
 * 输出结果，int型
 *
 * 示例1
 *  输入：
 *      7 3
 *  输出：
 *      8
 */

function pushApple(m, n) {
  let dp = new Array(m + 1).fill([]);
  // 0个盘子和一个盘子时，只有一种方法
  for (let i = 0; i <= m; i++) {
    let arr = [0, 1];
    dp[i] = arr;
  }
  // 0个苹果
  for (let i = 0; i <= n; i++) {
    dp[0][i] = 1;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (i < j) {
        dp[i][j] = dp[i][i];
      } else {
        dp[i][j] = dp[i - j][j] + dp[i][j - 1];
      }
    }
  }
  console.log(dp[m][n]);
}

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  while ((line = await readline())) {
    let tokens = line.split(" ");
    let a = parseInt(tokens[0]);
    let b = parseInt(tokens[1]);
    pushApple(a, b);
  }
})();
