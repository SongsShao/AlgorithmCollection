/**
 * 描述
编写一个程序，将输入字符串中的字符按如下规则排序。

规则 1 ：英文字母从 A 到 Z 排列，不区分大小写。

如，输入： Type 输出： epTy

规则 2 ：同一个英文字母的大小写同时存在时，按照输入顺序排列。

如，输入： BabA 输出： aABb

规则 3 ：非英文字母的其它字符保持原来的位置。


如，输入： By?e 输出： Be?y

数据范围：输入的字符串长度满足 1 \le n \le 1000 \1≤n≤1000 

输入描述：
输入字符串
输出描述：
输出字符串
示例1
输入：
A Famous Saying: Much Ado About Nothing (2012/8).

输出：
A aaAAbc dFgghh: iimM nNn oooos Sttuuuy (2012/8).
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  let line = await readline();
  sort(line);
  // handle(line);
})();

function sort(line) {
  let lineLetterArr = [...line.replace(/[^A-Za-z]/g, "")];
  // lineLetterArr.sort((a, b) => a.toUpperCase().charCodeAt() - b.toUpperCase().charCodeAt());
  for (let i = 0; i < lineLetterArr.length; i++) {
    for (let j = 0; j < lineLetterArr.length - 1; j++) {
      if (
        String(lineLetterArr[j]).toUpperCase() >
        String(lineLetterArr[j + 1]).toUpperCase()
      ) {
        let temp = lineLetterArr[j];
        lineLetterArr[j] = lineLetterArr[j + 1];
        lineLetterArr[j + 1] = temp;
      }
    }
  }
  [...line].map(
    (item, index) => !isLetter(item) && lineLetterArr.splice(index, 0, item)
  );
  console.log(lineLetterArr.join(""));
}

function isLetter(value) {
  if ((value >= "a" && value <= "z") || (value >= "A" && value <= "Z")) {
    return true;
  }
  return false;
}
