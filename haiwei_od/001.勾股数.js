/**
 * 勾股数
 * 题目描述
 * 如果三个正整数A、B、C ，A² + B² = C² 则为勾股数，
 * 如果ABC之间两两互质，即A与B，A与C，B与C均互质没有公约数，则称其为勾股数元组。
 * 请求出给定 n ~ m 范围内所有的勾股数元组。
 *
 * 输入描述
 * 起始范围
 * 1 < n < 10000
 * n < m < 10000
 *
 * 输出描述
 * ABC保证A < B < C
 * 输出格式A B C
 * 多组勾股数元组，按照A B C升序的排序方式输出。
 * 若给定范围内，找不到勾股数元组时，输出Na。
 *
 * 示例一
 * 输入
 * 1
 * 20
 * 输出
 * 3 4 5
 * 5 12 13
 * 8 15 17
 * 示例二
 * 输入
 * 5
 * 10
 * 输出
 * Na
 */

/**
 * @author shaosong
 * @description
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  while ((line = await readline())) {
    let tokens = line.split(" ");
    solution(parseInt(tokens[0]), parseInt(tokens[1]));
  }
})();

function solution(n, m) {
  let count = 0;
  for (let a = n; a <= m; a++) {
    for (let b = a + 1; b <= m; b++) {
      for (let c = b + 1; c <= m; c++) {
        if (
          relativelyPrime(a, b) &&
          relativelyPrime(a, c) &&
          relativelyPrime(b, c)
        ) {
          if (a * a + b * b === c * c) {
            count++;
            console.log(`${a} ${b} ${c}`);
          }
        }
      }
    }
  }
  if (!count) {
    console.log("Na");
  }
}

function relativelyPrime(x, y) {
  if (x === y && y === 1) {
    return false;
  }
  let min = Math.min(x, y);
  for (let i = 2; i <= min; i++) {
    if (x % i === 0 && y % i === 0) {
      return false;
    }
  }
  return true;
}
