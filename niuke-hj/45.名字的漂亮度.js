/**
 * 描述
 * 给出一个字符串，该字符串仅由小写字母组成，定义这个字符串的“漂亮度”是其所有字母“漂亮度”的总和。
 * 每个字母都有一个“漂亮度”，范围在1到26之间。没有任何两个不同字母拥有相同的“漂亮度”。字母忽略大小写。
 *
 * 给出多个字符串，计算每个字符串最大可能的“漂亮度”。
 *
 * 本题含有多组数据。
 *
 * 数据范围：输入的名字长度满足 1≤n≤10000
 *
 * 输入描述：
 * 第一行一个整数N，接下来N行每行一个字符串
 *
 * 输出描述：
 * 每个字符串可能的最大漂亮程度
 *
 * 示例1
 * 输入：
 *     2
 *     zhangsan
 *     lisi
 * 复制
 * 输出：
 *     192
 *     101
 * 说明：
 * 对于样例lisi，让i的漂亮度为26，l的漂亮度为25，s的漂亮度为24，lisi的漂亮度为25+26+24+26=101.
 */

function beauty(str) {
  // 将输入字符串转化为数组并排序
  let arr = str.toLowerCase().split("");
  // 初始化字母漂亮度
  let array = new Array(26).fill(0);
  let res = 0;
  //   确定每个字母出现次数
  arr.forEach((element) => {
    array[element.charCodeAt(0) - 97]++;
  });
  //   然后按从大到小排序
  array.sort((a, b) => b - a);
  for (let i = 0; i < 26; i++) {
    res += array[i] * (26 - i);
  }
  console.log(res);
}

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  while ((line = await readline())) {
    for (let i = 0; i < Number(line); i++) {
      let str = await readline();
      beauty(str);
    }
  }
})();
