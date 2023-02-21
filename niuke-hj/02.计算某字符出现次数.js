/**
 * 描述
 * 写出一个程序，接受一个由字母、数字和空格组成的字符串，和一个字符，然后输出输入字符串中该字符的出现次数。（不区分大小写字母）

 * 数据范围： 1≤n≤1000 
 * 输入描述：
 * 第一行输入一个由字母和数字以及空格组成的字符串，第二行输入一个字符。

 * 输出描述：
 * 输出输入字符串中含有该字符的个数。（不区分大小写字母）

 * 示例1
 * 输入：
 *  ABCabc
 *  A
 * 输出：
 *  2
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  let string = await readline();
  let okString = await readline();
  let stringLower = string.toLocaleLowerCase();
  let reg = stringLower.replace(
    new RegExp(okString.toLocaleLowerCase(), "g"),
    ""
  );
  let count = stringLower.length - reg.length;
  console.log(count);
})();
