/**
 * 描述
 * 输入n个整数，找出其中最小的k个整数并按升序输出
 *
 * 本题有多组输入样例
 *
 * 数据范围：1≤n≤1000,输入的整数满足 1≤val≤10000
 * 输入描述：
 * 第一行输入两个整数n和k
 * 第二行输入一个整数数组
 *
 * 输出描述：
 * 从小到大输出最小的k个整数，用空格分开。
 *
 * 示例1
 * 输入：
 *      5 2
 *      1 3 5 7 2
 * 输出：
 *      1 2
 */

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let median = Math.floor(arr.length / 2);
  let medianNum = arr.splice(median, 1)[0];
  let arrLeft = [],
    arrRight = [];
  arr.forEach((item) => {
    item > medianNum ? arrRight.push(item) : arrLeft.push(item);
  });
  return quickSort(arrLeft).concat(medianNum, quickSort(arrRight));
}

function sortMinK(arr, k) {
  let newArr = quickSort(arr);
  console.log(newArr.slice(0, k).join(" "));
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
    let strLine = await readline();
    sortMinK(
      strLine.split(" ").map((item) => Number(item)),
      b
    );
  }
})();
