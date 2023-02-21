/**
 * 描述
 * 公元五世纪，我国古代数学家张丘建在《算经》一书中提出了“百鸡问题”：鸡翁一值钱五，鸡母一值钱三，鸡雏三值钱一。百钱买百鸡，问鸡翁、鸡母、鸡雏各几何？
 * 现要求你打印出所有花一百元买一百只鸡的方式。
 * 输入描述：
 * 输入任何一个整数，即可运行程序。
 *
 * 输出描述：
 *  输出有数行，每行三个整数，分别代表鸡翁，母鸡，鸡雏的数量
 *
 * 示例1
 * 输入：
 *      1
 * 输出：
 *      0 25 75
 *      4 18 78
 *      8 11 81
 *      12 4 84
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  while ((line = await readline())) {
    moneyByChick();
  }
})();

function moneyByChick() {
  // 计算鸡翁
  for (let a = 0; a < Number(100 / 5); a++) {
    // 计算鸡母
    for (let b = 0; b < (100 - a * 5) / 3; b++) {
      // 鸡雏
      let c = 100 - a - b;
      if (a * 5 + b * 3 + c * (1 / 3) === 100 && c % 3 === 0) {
        console.log(`${a} ${b} ${c}`);
      }
    }
  }
}
