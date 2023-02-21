/**
 * 描述
 * 原理：ip地址的每段可以看成是一个0-255的整数，把每段拆分成一个二进制形式组合起来，然后把这个二进制数转变成
 * 一个长整数。
 * 举例：一个ip地址为10.0.3.193
 * 每段数字             相对应的二进制数
 * 10                   00001010
 * 0                    00000000
 * 3                    00000011
 * 193                  11000001
 *
 * 组合起来即为：00001010 00000000 00000011 11000001,转换为10进制数就是：167773121，即该IP地址转换后的数字就是它了。
 *
 * 数据范围：保证输入的是合法的 IP 序列
 *
 * 输入描述：
 * 输入
 * 1 输入IP地址
 * 2 输入10进制型的IP地址
 *
 * 输出描述：
 * 输出
 * 1 输出转换成10进制的IP地址
 * 2 输出转换后的IP地址
 *
 * 示例1
 * 输入：
 * 10.0.3.193
 * 167969729
 * 输出：
 * 167773121
 * 10.3.3.193
 */

/**
 * 结题思路
 * 1. ip转整型
 *    先将ip以‘.’分割；
 *    再将数字转化为二进制；
 *    然后将所有二进制数据连接，转为十进制即可。
 * 2.整型转ip
 *    先将整数转为32位二进制；
 *    再将32位二进制以八位分割；
 *    再将二进制转为十进制。
 */

function twoFromTen(num) {
  if (typeof num !== "number") {
    num = Number(num);
  }
  let arr = "";
  if (num <= 1) {
    return num;
  }
  while (num > 1) {
    arr = (num % 2) + arr;
    num = parseInt(num / 2);
  }
  return num + arr;
}

function tenFromTwo(num) {
  let intNum = 0;
  for (let i = 0; i < num.length; i++) {
    intNum = intNum + Number(num[i]) * Math.pow(2, num.length - 1 - i);
  }
  return intNum;
}

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  let inputStr = [];
  // Write your code here
  while ((line = await readline())) {
    inputStr.push(line);
  }
  inputStr.forEach((value) => {
    let arrList = value.split(".");
    if (arrList.length === 4) {
      arrList.forEach((item, index) => {
        // 再将数字转化为二进制；
        let twoStr = twoFromTen(Number(item));
        twoStr = twoStr.padStart(8, "0");
        arrList[index] = twoStr;
      });
      console.log(tenFromTwo(arrList.join("")));
    } else {
      let twoStr = twoFromTen(Number(value));
      twoStr = twoStr.padStart(32, "0");
      let arr = [];
      for (let i = 0; i < twoStr.length / 8; i++) {
        arr.push(tenFromTwo(twoStr.substr(8 * i, 8)));
      }
      console.log(arr.join("."));
    }
  });
})();
