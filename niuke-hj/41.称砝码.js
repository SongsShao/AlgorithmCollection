/**
 * 描述
 * 现有n种砝码，重量互不相等，分别为 m1,m2,m3…mn ；
 * 每种砝码对应的数量为 x1,x2,x3...xn 。现在要用这些砝码去称物体的重量(放在同一侧)，问能称出多少种不同的重量。
 *
 * 注：
 * 称重重量包括 0
 *
 * 数据范围：每组输入数据满足 1≤n≤10,1≤mi≤2000, 1≤xi≤10
 * 输入描述：
 * 对于每组测试数据：
 * 第一行：n --- 砝码的种数(范围[1,10])
 * 第二行：m1 m2 m3 ... mn --- 每种砝码的重量(范围[1,2000])
 * 第三行：x1 x2 x3 .... xn --- 每种砝码对应的数量(范围[1,10])
 * 输出描述：
 * 利用给定的砝码可以称出的不同的重量数
 *
 * 示例1
 * 输入：2
 *      1 2
 *      2 1
 * 输出：
 *      5
 * 说明：
 * 可以表示出0，1，2，3，4五种重量。
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  while ((n = await readline())) {
    let weight = await readline();
    weight = weight.split(" ").map((item) => Number(item));
    let num = await readline();
    num = num.split(" ").map((item) => Number(item));
    let fama = [];
    // 将砝码重量和个数转化成数组 [1, 1, 2]
    for (let i = 0; i < weight.length; i++) {
      for (let j = 0; j < num[i]; j++) {
        fama.push(weight[i]);
      }
    }
    // 通过set去重的方式将所有的组合进行排列。
    let set = new Set();
    set.add(0);
    // [1, 1, 2]
    for (let i = 0; i < fama.length; i++) {
      // i = 0 {0 + 1} 插入后 {0, 1}
      // i = 1 {0 + 1, 1 + 1} 插入后 {0, 1, 2}
      // i = 2 {0 + 2, 1 + 2, 2 + 2}, 插入后 {0, 1, 2, 3, 4}
      let arr = Array.from(set);
      for (let sum of arr) {
        set.add(sum + fama[i]);
      }
    }
    console.log(set.size);
  }
})();
