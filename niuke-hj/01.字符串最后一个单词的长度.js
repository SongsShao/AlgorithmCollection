/**
 * 描述
 * 计算字符串最后一个单词的长度，单词以空格隔开，字符串长度小于5000。（注：字符串末尾不以空格为结尾）
 * 输入描述：
 * 输入一行，代表要计算的字符串，非空，长度小于5000。

 * 输出描述：
 * 输出一个整数，表示输入字符串最后一个单词的长度。

 * 示例1
 * 输入：
 * hello nowcoder
 * 
 * 输出：
 * 8
 * 
 * 说明：
 * 最后一个单词为nowcoder，长度为8 *  
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  while ((line = await readline())) {
    let tokens = line.split(" ");
    let string = tokens[tokens.length - 1];
    console.log(string.length);
  }
})();
