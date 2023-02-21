/**
 * 描述
 * 输入一行字符，分别统计出包含英文字母、空格、数字和其它字符的个数。
 *
 * 数据范围：输入的字符串长度满足 1≤n≤1000
 *
 * 输入描述：
 * 输入一行字符串，可以有空格
 *
 * 输出描述：
 * 统计其中英文字符，空格字符，数字字符，其他字符的个数
 *
 * 示例1
 * 输入：
 * 1qazxsw23 edcvfr45tgbn hy67uj m,ki89ol.\\/;p0-=\\][
 * 复制
 * 输出：
 * 26
 * 3
 * 10
 * 12
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  while ((line = await readline())) {
    let map = new Map();
    [...line].forEach((item) => {
      let isType1 = isType(item);
      map.set(isType1 + "abc", (map.get(isType1 + "abc") || 0) + 1);
    });
    console.log(
      `${map.get("0abc") || 0}\n${map.get("1abc") || 0}\n${map.get("2abc") ||
        0}\n${map.get("3abc") || 0}`
    );
  }
})();

function isType(num) {
  if ((num >= "a" && num <= "z") || (num >= "A" && num <= "Z")) return 0;
  else if (num >= "0" && num <= "9") return 2;
  else if (num === " ") return 1;
  else return 3;
}
