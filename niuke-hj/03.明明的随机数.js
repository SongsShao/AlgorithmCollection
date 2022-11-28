/**
 * 描述
明明生成了NN个1到500之间的随机整数。请你删去其中重复的数字，即相同的数字只保留一个，把其余相同的数去掉，然后再把这些数从小到大排序，按照排好的顺序输出。

数据范围： 1 \le n \le 1000 \1≤n≤1000  ，输入的数字大小满足 1 \le val \le 500 \1≤val≤500 
输入描述：
第一行先输入随机整数的个数 N 。 接下来的 N 行每行输入一个整数，代表明明生成的随机数。 具体格式可以参考下面的"示例"。
输出描述：
输出多行，表示输入数据处理后的结果

示例1
输入：
3
2
2
1

输出：
1
2

说明：
输入解释：
第一个数字是3，也即这个小样例的N=3，说明用计算机生成了3个1到500之间的随机整数，接下来每行一个随机数字，共3行，也即这3个随机数字为：
2
2
1
所以样例的输出为：
1
2     
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // 随机数长度
  let count = parseInt(readline());
  let array = [];
  // Write your code here
  while ((line = await readline())) {
    let a = parseInt(line);
    array.push(a);
  }

  array = removeDub(array);
  array = quickSort(array);
  array.map((item) => {
    console.log(item);
  });
})();

function quickSort(array) {
  // 1.定义一个函数，传入参数，判断这个参数的长度，如果长度是1，直接ruturn出去，如果是进入下一步。
  if (array.length <= 1) {
    return array;
  }
  // 2.将这个数组从中间截取，取出这个数组的中位数，定义两个新的数组arrleft,arrright,
  // 然后让原数组中剩余的数与这个中位数比较，比中位数小的的放到arrleft数组，
  // 比中位数大的放到arrright,然后再对这两个数组进行递归。
  let median = Math.floor(array.length / 2);
  let medianNum = array.splice(median, 1)[0];
  let arrLeft = [];
  let arrRight = [];
  array.map((item) => {
    item > medianNum ? arrRight.push(item) : arrLeft.push(item);
  });

  // 3.最后将arrleft,中位数，arrright拼接。
  return quickSort(arrLeft).concat(medianNum, quickSort(arrRight));
}

function removeDub(array) {
  let set = new Set();
  array.map((item) => {
    set.add(item);
  });
  return Array.from(set);
}
