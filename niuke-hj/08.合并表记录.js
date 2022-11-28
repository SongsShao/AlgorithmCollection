/**
 * 描述
 * 数据表记录包含表索引index和数值value（int范围的正整数），请对表索引相同的记录进行合并，即将相同索引的数值进行求和运算，输出按照index值升序进行输出。
 *
 *
 * 提示:
 * 0 <= index <= 11111111
 * 1 <= value <= 100000
 *
 * 输入描述：
 * 先输入键值对的个数n（1 <= n <= 500）
 * 接下来n行每行输入成对的index和value值，以空格隔开
 *
 * 输出描述：
 * 输出合并后的键值对（多行）
 *
 * 示例1
 * 输入：
 * 4
 * 0 1
 * 0 2
 * 1 2
 * 3 4
 *
 * 输出：
 * 0 3
 * 1 2
 * 3 4
 * 示例2
 * 输入：
 * 3
 * 0 1
 * 0 2
 * 8 9
 * 输出：
 * 0 3
 * 8 9
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  let count = await readline();
  let mapNum = new Map();
  let keyArray = [];
  for (let i = 0; i < parseInt(count); i++) {
    let line = await readline();
    let inputArray = line.split(" ");
    let key = parseInt(inputArray[0]);
    let isMap = mapNum.get(key);
    if (isMap !== undefined) {
      mapNum.set(key, isMap + parseInt(inputArray[1]));
    } else {
      mapNum.set(key, parseInt(inputArray[1]));
      keyArray.push(key);
    }
  }

  keyArray = quicksort(keyArray);

  keyArray.map((item) => {
    console.log(item + " " + mapNum.get(item));
  });
})();

function quicksort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let median = Math.floor(arr.length / 2);
  let medianNum = arr.splice(median, 1)[0];

  let arrLeft = [];
  let arrRight = [];

  arr.map((item) => {
    item > medianNum ? arrRight.push(item) : arrLeft.push(item);
  });

  return quicksort(arrLeft).concat(medianNum, quicksort(arrRight));
}
