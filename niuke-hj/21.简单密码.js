/**
 * 描述
现在有一种密码变换算法。
九键手机键盘上的数字与字母的对应： 1--1， abc--2, def--3, ghi--4, jkl--5, mno--6, pqrs--7, tuv--8 wxyz--9, 0--0，把密码中出现的小写字母都变成九键键盘对应的数字，如：a 变成 2，x 变成 9.
而密码中出现的大写字母则变成小写之后往后移一位，如：X ，先变成小写，再往后移一位，变成了 y ，例外：Z 往后移是 a 。
数字和其它的符号都不做变换。
数据范围： 输入的字符串长度满足 1≤n≤100 
输入描述：
输入一组密码，长度不超过100个字符。

输出描述：
输出密码变换后的字符串

示例1
输入：
YUANzhi1987
输出：
zvbo9441987
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  let line = await readline();
  let result = "";
  for (let i = 0; i < line.length; i++) {
    result += isChangeNum(line[i]);
  }
  console.log(result);
})();

function isChangeNum(code) {
  if (code === "1" || code === "0") {
    return code;
  }
  if (code >= "a" && code <= "c") {
    return "2";
  }
  if (code >= "d" && code <= "f") {
    return "3";
  }
  if (code >= "g" && code <= "i") {
    return "4";
  }
  if (code >= "j" && code <= "l") {
    return "5";
  }
  if (code >= "m" && code <= "o") {
    return "6";
  }
  if (code >= "p" && code <= "s") {
    return "7";
  }
  if (code >= "t" && code <= "v") {
    return "8";
  }
  if (code >= "w" && code <= "z") {
    return "9";
  }

  if (code >= "A" && code <= "Z") {
    let a = code.toLocaleLowerCase();
    let chatAt = a.charCodeAt();
    if (code === "Z") {
      return "a";
    } else {
      return String.fromCharCode(chatAt + 1);
    }
  }
  if (code > "1" && code <= "9") return code;
}
