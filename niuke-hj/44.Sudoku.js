/**
 * 描述
 * 问题描述：数独（Sudoku）是一款大众喜爱的数字逻辑游戏。玩家需要根据9X9盘面上的已知数字，推算出所有剩余空格的数字，并且满足每一行、每一列、每一个3X3粗线宫内的数字均含1-9，并且不重复。
 * 例如：
 * 输入
 *     0 9 2 4 8 1 7 6 3
 *     4 1 3 7 6 2 9 8 5
 *     8 6 7 3 5 9 4 1 2
 *     6 2 4 1 9 5 3 7 8
 *     7 5 9 8 4 3 1 2 6
 *     1 3 8 6 2 7 5 9 4
 *     2 7 1 5 3 8 6 4 9
 *     3 8 6 9 1 4 2 5 7
 *     0 4 5 2 7 6 8 3 1
 * 输出
 *
 *     5 9 2 4 8 1 7 6 3
 *     4 1 3 7 6 2 9 8 5
 *     8 6 7 3 5 9 4 1 2
 *     6 2 4 1 9 5 3 7 8
 *     7 5 9 8 4 3 1 2 6
 *     1 3 8 6 2 7 5 9 4
 *     2 7 1 5 3 8 6 4 9
 *     3 8 6 9 1 4 2 5 7
 *     9 4 5 2 7 6 8 3 1
 * 数据范围：输入一个 9*9 的矩阵
 * 输入描述：
 * 包含已知数字的9X9盘面数组[空缺位以数字0表示]
 *
 * 输出描述：
 * 完整的9X9盘面数组
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
let board = [];
void (async function() {
  // Write your code here
  while ((line = await readline())) {
    let tokens = line.split(" ");
    board.push(tokens);
    for (let i = 0; i < 8; i++) {
      line = await readline();
      board.push(line.split(" "));
    }
    dfs(board, 0, 0);
    for (let i = 0; i < 9; i++) {
      console.log(board[i].join(" "));
    }
  }
})();

function dfs(board, x, y) {
  // 如果x=9时说明已近完成遍历
  if (x === 9) return true;
  // 换行
  if (y === 9) return dfs(board, x + 1, 0);
  // 前进1
  if (board[x][y] !== "0") return dfs(board, x, y + 1);

  for (let i = "1"; i <= "9"; i++) {
    // 如果不满足继续
    if (!isValid(board, x, y, i)) continue;
    board[x][y] = i;
    if (dfs(board, x, y + 1) === true) return true;
    board[x][y] = "0";
  }
  return false;
}

/**
 * 校验是否满足条件的数
 * @param {*} board
 * @param {*} x
 * @param {*} y
 * @param {*} i
 * @returns
 */
function isValid(board, x, y, i) {
  // 确定当前列唯一
  for (let row = 0; row < 9; row++) {
    if (Number(board[row][y]) === Number(i)) return false;
  }
  // 确保当前行唯一
  for (let col = 0; col < 9; col++) {
    if (Number(board[x][col]) === Number(i)) return false;
  }
  // 确保当前9宫格唯一
  let pointX = parseInt(x / 3) * 3;
  let pointY = parseInt(y / 3) * 3;
  for (let p = 0; p < 3; p++) {
    for (let q = 0; q < 3; q++) {
      if (Number(board[pointX + p][pointY + q]) === i) return false;
    }
  }
  return true;
}
