/**
 *  3 2 5
3
100
200
400
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
