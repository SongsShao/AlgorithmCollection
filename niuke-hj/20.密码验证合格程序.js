/**
 * 描述
密码要求:

1.长度超过8位

2.包括大小写字母.数字.其它符号,以上四种至少三种

3.不能有长度大于2的包含公共元素的子串重复 （注：其他符号不含空格或换行）

数据范围：输入的字符串长度满足 1 \le n \le 100 \1≤n≤100 
输入描述：
一组字符串。

输出描述：
如果符合要求输出：OK，否则输出NG

示例1
输入：
021Abc9000
021Abc9Abc1
021ABC9000
021$bc9000

输出：
OK
NG
NG
OK
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  let result = [];
  let inputStr = [];
  // Write your code here
  while ((line = await readline())) {
    inputStr.push(line);
  }
  inputStr.map((item) => {
    let isOk = checkPassword(item);
    result.push(isOk);
  });
  result.map((item) => {
    console.log(item);
  });
})();

function checkPassword(pwd) {
  let { num, lowercase, upLowercase, other } = {
    num: 0,
    lowercase: 0,
    upLowercase: 0,
    other: 0,
  };
  let isOk = "OK";
  if (pwd.length < 8) {
    return "NG";
  }
  for (let i = 0; i < pwd.length; i++) {
    let isType = charCodeIsEques(String(pwd[i]).charCodeAt());
    switch (isType) {
      case 0:
        other += 1;
        break;
      case 1:
        num += 1;
        break;
      case 2:
        lowercase += 1;
        break;
      case 3:
        upLowercase += 2;
        break;
    }
  }
  let count = 0;
  if (num === 0) count++;
  if (lowercase === 0) count++;
  if (upLowercase === 0) count++;
  if (other === 0) count++;
  if (count > 1) {
    isOk = "NG";
  }
  for (let i = 0; i < pwd.length - 3; i++) {
    let newStr = pwd.slice(i, i + 3);
    newStr1 = pwd.slice(i + 3);
    if (newStr1.includes(newStr)) {
      isOk = "NG";
      break;
    }
  }
  return isOk;
}

function charCodeIsEques(code) {
  let isType = 0;
  if (code >= 48 && code <= 57) return 1;
  if (code >= 65 && code <= 90) return 2;
  if (code >= 97 && code <= 122) return 3;
  return 0;

  return isType;
}
