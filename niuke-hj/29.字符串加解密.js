/**
 * 描述
 * 对输入的字符串进行加解密，并输出。
 *
 * 加密方法为：
 *
 * 当内容是英文字母时则用该英文字母的后一个字母替换，同时字母变换大小写,如字母a时则替换为B；字母Z时则替换为a；
 *
 * 当内容是数字时则把该数字加1，如0替换1，1替换2，9替换0；
 *
 * 其他字符不做变化。
 *
 * 解密方法为加密的逆过程。
 * 数据范围：输入的两个字符串长度满足 1≤n≤1000  ，保证输入的字符串都是只由大小写字母或者数字组成
 * 输入描述：
 * 第一行输入一串要加密的密码
 * 第二行输入一串加过密的密码
 *
 * 输出描述：
 * 第一行输出加密后的字符
 * 第二行输出解密后的字符
 *
 * 示例1
 * 输入：
 * abcdefg
 * BCDEFGH
 * 复制
 * 输出：
 * BCDEFGH
 * abcdefg
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  let inputStr = [];
  // Write your code here
  while ((line = await readline())) {
    inputStr.push(line);
  }
  inputStr.map((item, index) => {
    let arr = [];
    [...item].map((value) => {
      arr.push(index === 0 ? encrypt(value) : decrypt(value));
    });
    console.log(arr.join(""));
  });
})();

function decrypt(str) {
  if (str >= "b" && str <= "z") {
    return String.fromCharCode(str.charCodeAt() - 33);
  }
  if (str === "A") {
    return "z";
  }
  if (str === "a") {
    return "Z";
  }
  if (str >= "B" && str <= "Z") {
    return String.fromCharCode(str.charCodeAt() + 31);
  }
  if (str >= "0" && str <= "9") {
    return (10 + (Number(str) - 1)) % 10;
  }
}

// 加密
function encrypt(str) {
  if (str >= "a" && str <= "y") {
    return String.fromCharCode(str.charCodeAt() - 31);
  }
  if (str === "z") {
    return "A";
  }
  if (str === "Z") {
    return "a";
  }
  if (str >= "A" && str <= "Y") {
    return String.fromCharCode(str.charCodeAt() + 33);
  }
  if (str >= "0" && str <= "9") {
    return (Number(str) + 1) % 10;
  }
}
