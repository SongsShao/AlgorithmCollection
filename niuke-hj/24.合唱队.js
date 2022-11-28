/**
 * 描述
N 位同学站成一排，音乐老师要请最少的同学出列，使得剩下的 K 位同学排成合唱队形。

设KK位同学从左到右依次编号为 1，2…，K ，他们的身高分别为T_1,T_2,…,T_K，
若存在i(1≤i≤K) 使得T_1<T_2<......<T_{i-1}<T_i且 T_i>T_{i+1}>......>T_K，
则称这KK名同学排成了合唱队形。
通俗来说，能找到一个同学，他的两边的同学身高都依次严格降低的队形就是合唱队形。
例子：
123 124 125 123 121 是一个合唱队形
123 123 124 122不是合唱队形，因为前两名同学身高相等，不符合要求
123 122 121 122不是合唱队形，因为找不到一个同学，他的两侧同学身高递减。

你的任务是，已知所有N位同学的身高，计算最少需要几位同学出列，可以使得剩下的同学排成合唱队形。

注意：不允许改变队列元素的先后顺序 且 不要求最高同学左右人数必须相等

数据范围： 1≤n≤3000 

输入描述：
用例两行数据，第一行是同学的总数 N ，第二行是 N 位同学的身高，以空格隔开

输出描述：
最少需要几位同学出列

示例1
输入：
8
186 186 150 200 160 130 197 200
输出：
4

说明：
由于不允许改变队列元素的先后顺序，所以最终剩下的队列应该为186 200 160 130或150 200 160 130 
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  let num = parseInt(await readline());
  let left = new Array(num);
  let right = new Array(num);
  let line = await readline();
  let lineArray = line.split(" ");

  // 从左到右依次找出最大序列
  for (let i = 0; i < num; i++) {
    left[i] = 0;
    for (let j = 0; j < i; j++) {
      if (parseInt(lineArray[i]) > parseInt(lineArray[j])) {
        left[i] = Math.max(left[i], left[j] + 1);
      }
    }
  }
  // 从右到左依次找出最大序列
  for (let i = lineArray.length - 1; i >= 0; i--) {
    right[i] = 0;
    for (let j = lineArray.length - 1; j > i; j--) {
      if (parseInt(lineArray[i]) > parseInt(lineArray[j])) {
        right[i] = Math.max(right[i], right[j] + 1);
      }
    }
  }

  let max = 0;
  for (let i = 0; i < num; i++) {
    max = Math.max(max, left[i] + right[i] + 1);
  }
  console.log(num - max);
})();
