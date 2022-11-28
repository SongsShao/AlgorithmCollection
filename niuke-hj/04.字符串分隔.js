/**
 * 描述
•输入一个字符串，请按长度为8拆分每个输入字符串并进行输出；

•长度不是8整数倍的字符串请在后面补数字0，空字符串不处理。
输入描述：
连续输入字符串(每个字符串长度小于等于100)

输出描述：
依次输出所有分割后的长度为8的新字符串

示例1
输入：
abc
输出：
abc00000
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  let count = 8;
  let inputStr = await readline();
  if (!!inputStr) {
    let inputLen = inputStr.length;
    if (inputLen > 0) {
      let bu = count - (inputLen % count);
      inputStr += concatZeiro(bu !== count ? bu : 0);
    }
    for (let i = 0; i < inputStr.length; i += count) {
      console.log(inputStr.slice(i, i + count));
    }
  }
})();

function concatZeiro(num) {
  let str = "";
  for (let i = 0; i < num; i++) {
    str += "0";
  }
  return str;
}
