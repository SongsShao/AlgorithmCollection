/**
 * 题目描述
 * 给定一个N行M列的二维矩阵，矩阵中每个位置的数字取值为0或1。矩阵示例如：
 * 1100
 * 0001
 * 0011
 * 1111
 * 现需要将矩阵中所有的1进行反转为0，规则如下：
 * 1） 当点击一个1时，该1便被反转为0，同时相邻的上、下、左、右，以及左上、左下、右上、右下8 个方向的1（如果存在1）均会自动反转为0；
 * 2）进一步地，一个位置上的1被反转为0时，与其相邻的8个方向的1（如果存在1）均会自动反转为0；
 *
 * 按照上述规则示例中的矩阵只最少需要点击2次后，所有值均为0。请问，给定一个矩阵，最少需要点击几次后，所有数字均为0？
 *
 * 输入描述
 * 第一行输入两个数字N，M，分别表示二维矩阵的行数、列数，并用空格隔开
 *
 * 之后输入N行，每行M个数字，并用空格隔开
 *
 * 输出描述
 * 最少需要点击几次后，矩阵中所有数字均为0
 *
 * 用例
 * 输入
 * 4 4
 * 1 1 0 0
 * 0 0 0 1
 * 0 0 1 1
 * 1 1 1 1
 *
 * 输出	2
 * 说明	无
 * 题目解析
 * 用例图示如下
 *
 * 可以发现，只要是连接在一起的1（八个方向都算连接），点击任意1个，都会蔓延到相连的其他1。
 * 因此，本题重点不在于点击哪个1，而是有多少块连在一起的1。
 * 即孤岛问题，求解不连通的岛屿数量。孤岛问题可以使用并差集求解。
 */

// 本题为考试单行多行输入输出规范示例，无需提交，不计分。
const rl = require("readline").createInterface({ input: process.stdin });

const lines = [];
let n, m;
rl.on("line", (line) => {
  lines.push(line);
  if (lines.length === 1) {
    [n, m] = lines[0].split(" ").map(Number);
  }
  if (n && lines.length === n + 1) {
    lines.shift();
    const matrix = lines.map((item) => item.split(" "));
    // console.log(matrix);
    console.log(getResoult(matrix, n, m));
    lines.length = 0;
  }
});

function getResoult(matrix, n, m) {
  const ufs = new UnionFindSet(n * m);
  // 八个方向的偏移量
  const offset = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] !== "1") {
        ufs.conut--;
        continue;
      }
      for (let k = 0; k < offset.length; k++) {
        const [offsetX, offsetY] = offset[k];
        const newI = i + offsetX;
        const newJ = j + offsetY;
        if (
          newI >= 0 &&
          newI < n &&
          newJ >= 0 &&
          newJ < m &&
          matrix[newI][newJ] === "1"
        ) {
          ufs.union(i * m + j, newI * m + newJ);
        }
      }
    }
  }
  return ufs.conut;
}

class UnionFindSet {
  constructor(n) {
    this.fa = new Array(n).fill(0).map((_, i) => i);
    this.conut = n;
  }
  find(x) {
    if (x !== this.fa[x]) {
      return (this.fa[x] = this.find(this.fa[x]));
    }
    return x;
  }
  union(x, y) {
    const x_fa = this.find(x);
    const y_fa = this.find(y);
    if (x_fa !== y_fa) {
      this.fa[y_fa] = x_fa;
      this.conut--;
    }
  }
}
