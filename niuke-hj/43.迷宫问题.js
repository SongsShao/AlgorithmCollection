/**
 * 描述
 * 定义一个二维数组 N*M ，如 5 × 5 数组下所示：
 *
 *
 * int maze[5][5] = {
 * 0, 1, 0, 0, 0,
 * 0, 1, 1, 1, 0,
 * 0, 0, 0, 0, 0,
 * 0, 1, 1, 1, 0,
 * 0, 0, 0, 1, 0,
 * };
 *
 *
 * 它表示一个迷宫，其中的1表示墙壁，0表示可以走的路，只能横着走或竖着走，不能斜着走，要求编程序找出从左上角到右下角的路线。入口点为[0,0],既第一格是可以走的路。
 *
 *
 * 数据范围： 2≤n,m≤10  ， 输入的内容只包含 0≤val≤1
 *
 * 输入描述：
 * 输入两个整数，分别表示二维数组的行数，列数。再输入相应的数组，其中的1表示墙壁，0表示可以走的路。数据保证有唯一解,不考虑有多解的情况，即迷宫只有一条通道。
 *
 * 输出描述：
 * 左上角到右下角的最短路径，格式如样例所示。
 *
 * 示例1
 * 输入：
 * 5 5
 * 0 1 0 0 0
 * 0 1 1 1 0
 * 0 0 0 0 0
 * 0 1 1 1 0
 * 0 0 0 1 0
 * 复制
 * 输出：
 * (0,0)
 * (1,0)
 * (2,0)
 * (2,1)
 * (2,2)
 * (2,3)
 * (2,4)
 * (3,4)
 * (4,4)
 * 示例2
 * 输入：
 * 5 5
 * 0 1 0 0 0
 * 0 1 0 1 0
 * 0 0 0 0 1
 * 0 1 1 1 0
 * 0 0 0 0 0
 * 输出：
 * (0,0)
 * (1,0)
 * (2,0)
 * (3,0)
 * (4,0)
 * (4,1)
 * (4,2)
 * (4,3)
 * (4,4)
 *
 * 说明：
 * 注意：不能斜着走！！
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
let test;
let arr = [];
let target = [];
let N = 0;
let M = 0;
let dx = [1, 0, -1, 0];
let dy = [0, 1, 0, -1];
void (async function() {
  while ((line = await readline())) {
    let tokens = line.split(" ");
    N = parseInt(tokens[0]);
    M = parseInt(tokens[1]);
    test = Array(N)
      .fill(0)
      .map((x) => Array(M).fill(0));

    for (let i = 0; i < N; i++) {
      let mLine = await readline();
      let mLineArr = mLine.split(" ");
      arr.push(mLineArr.map((item) => parseInt(item)));
    }

    dfs(0, 0, [{ x: 0, y: 0 }]);
    target.forEach((element) => {
      console.log(`(${element.y},${element.x})`);
    });
  }
})();

/**
 * dfs 算法广度优先算法
 * @param {*} x
 * @param {*} y
 * @param {*} points
 * @returns
 */
function dfs(x, y, points) {
  points = JSON.parse(JSON.stringify(points));
  // 判断节点
  if (x === M - 1 && y === N - 1) {
    return (target = points);
  }

  //   循环4个位置
  for (let key = 0; key <= 3; key++) {
    // 获取下一个节点
    let pointX = x + dx[key];
    let pointY = y + dy[key];
    // 临界值判断
    if (pointX >= 0 && pointX < M && pointY >= 0 && pointY < N) {
      // 判断当前节点是否可通过 并且当前节点是否被使用
      if (arr[pointY][pointX] === 0 && test[pointY][pointX] === 0) {
        // 重置当前节点是否使用
        test[pointY][pointX] = 1;
        // 存储当前节点
        points.push({ x: pointX, y: pointY });
        // 查询下一个节点
        dfs(pointX, pointY, points);

        points.pop();
        test[pointY][pointX] = 0;
      }
    }
  }
  return;
}
