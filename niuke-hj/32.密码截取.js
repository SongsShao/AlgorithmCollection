/**
 * 描述
 * Catcher是MCA国的情报员，他工作时发现敌国会用一些对称的密码进行通信，比如像这些ABBA，ABA，A，123321，但是他们有时会在开始或结束时加入一些无关的字符以防止别国破解。比如进行下列变化 ABBA->12ABBA,ABA->ABAKK,123321->51233214　。因为截获的串太长了，而且存在多种可能的情况（abaaab可看作是aba,或baaab的加密形式），Cathcer的工作量实在是太大了，他只能向电脑高手求助，你能帮Catcher找出最长的有效密码串吗？
 *
 * 数据范围：字符串长度满足 1≤n≤2500
 * 输入描述：
 * 输入一个字符串（字符串的长度不超过2500）
 *
 * 输出描述：
 * 返回有效密码串的最大长度
 *
 * 示例1
 * 输入：ABBA
 * 输出：4
 * 示例2
 * 输入：ABBBA
 * 输出：5
 *
 * 示例3
 * 输入：12HHHHA
 * 输出：4
 */

/**
 * 解题思路：使用回文字符串可以获取
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  let line = await readline();
  let inputArr = [...line];
  let length = 0;
  for (let i = 0; i < inputArr.length; i++) {
    let danLen = getMaxStrPalindromes(inputArr, i, i);
    if (length < danLen) {
      length = danLen;
    }
    let doubleLen = getMaxStrPalindromes(inputArr, i, i + 1);
    if (length < doubleLen) {
      length = doubleLen;
    }
  }
  console.log(length);
})();

// 获取以下边为left到right为区间下的回文字符串长度
function getMaxStrPalindromes(list, left, right) {
  while (left >= 0 && right < list.length && list[left] === list[right]) {
    left--;
    right++;
  }
  console.log(list.slice(left + 1, right));
  return list.slice(left + 1, right).length;
}
