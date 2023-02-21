/**
 * 描述
 * 题目描述
 * 若两个正整数的和为素数，则这两个正整数称之为“素数伴侣”，如2和5、6和13，它们能应用于通信加密。
 * 现在密码学会请你设计一个程序，从已有的 N （ N 为偶数）个正整数中挑选出若干对组成“素数伴侣”，
 * 挑选方案多种多样，例如有4个正整数：2，5，6，13，如果将5和6分为一组中只能得到一组“素数伴侣”，
 * 而将2和5、6和13编组将得到两组“素数伴侣”，能组成“素数伴侣”最多的方案称为“最佳方案”，
 * 当然密码学会希望你寻找出“最佳方案”。
 * 输入:
 * 有一个正偶数 n ，表示待挑选的自然数的个数。后面给出 n 个具体的数字。
 * 输出:
 * 输出一个整数 K ，表示你求得的“最佳方案”组成“素数伴侣”的对数。
 * 数据范围： 1≤n≤100  ，输入的数据大小满足 2≤val≤30000
 * 输入描述：
 * 输入说明
 * 1 输入一个正偶数 n
 * 2 输入 n 个整数
 *
 * 输出描述：
 * 求得的“最佳方案”组成“素数伴侣”的对数。
 *
 * 示例1
 * 输入：
 * 4
 *   2 5 6 13
 * 2 0 1 1 1
 * 5 0 0 2 2
 * 6 0 0 0 3
 *
 * 输出：
 * 2
 *
 * 示例2
 * 输入：
 * 2
 * 3 6
 * 输出：
 * 0
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

let odds = []; // 奇数
let evens = []; //偶数
let v = new Array(); // 用来记录当前的奇数循环中是否被使用过
let match = new Array(); // 用来记录当前循环中偶数位配对的奇数是谁。

void (async function() {
  let count = await readline();
  let line = await readline();
  let arrly = line.split(" ");
  selectSusu(arrly, Number(count));
})();

function selectSusu(list, len) {
  if (list.length <= 1 || len <= 1 || len % 2) {
    console.log(0);
    return 0;
  }
  //   将奇数偶数分离
  for (let item of list) {
    if (Number(item) % 2 === 0) {
      evens.push(Number(item));
    } else {
      odds.push(Number(item));
    }
  }
  let count = 0;
  for (let odd of odds) {
    v = new Array(evens.length);
    if (find(odd)) {
      count++;
    }
  }
  console.log(count);
}
// 匈牙利算法实现
function find(odd) {
  for (let i = 0; i < evens.length; i++) {
    let sum = odd + evens[i];
    // 处理数据是否相加为奇数而且未被使用过
    if (isPrime(sum) && !v[i]) {
      v[i] = true;
      //   如果对应的偶数位没有对应的奇数   或者 被使用的奇数从新去查询有没有和他匹配的数据。
      if (!match[i] || find(match[i])) {
        match[i] = odd;
        return true;
      }
    }
  }
  return false;
}

//判断是否为质数
function isPrime(num) {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i * i <= num; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
}
