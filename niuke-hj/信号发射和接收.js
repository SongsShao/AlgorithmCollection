/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 2) {
    const [m, n] = lines[0].split(" ").map(Number);
    const arr = lines[1].split(" ").map(Number);
    console.log(getResult(arr, m, n));
    lines.length = 0;
  }
});

function data(lines){
    const [m, n] = lines[0].split(" ").map(Number);
    const arr = lines[1].split(" ").map(Number);
    console.log(getResult(arr, m, n));
    lines.length = 0;
}
 
function getResult(arr, m, n) {
  const anth = new Array(m).fill(0).map(() => new Array(n));
 
  for (let i = 0; i < m * n; i++) {
    const r = Math.floor(i / n);
    const c = i % n;
    anth[r][c] = arr[i];
  }
 
  const ret = new Array(m).fill(0).map(() => new Array(n).fill(0));
 
  // 先处理水平方向，即先进行每行的东向发射处理
  for (let i = 0; i < m; i++) {
    const stack = [];
    for (let j = 0; j < n; j++) {
      // 如果栈顶天线比anth[i][j]，则anth[i][j]必然能接收到栈顶天线的信号，并且还能继续接收栈顶前面一个天线的信号（递减栈，栈顶前面天线高度必然大于栈顶天线高度）
      while (stack.length && anth[i][j] > stack.at(-1)) {
        ret[i][j]++;
        stack.pop();
      }
 
      // 走到此步，如果stack还有值，那么由于是递减栈，因此此时栈顶天线高度必然 >= anth[i][j]
      if (stack.length) {
        // 如果栈顶天线高度 == anth[i][j]，那么此时anth[i][j]可以接收栈顶天线的信号，比如5 3 2 3，最后一个3可以接收到前面等高3的信号，但是无法继续接收前面5的信号，因此这里anth[i][j]结束处理
        if (anth[i][j] == stack.at(-1)) {
          ret[i][j]++;
          stack.pop(); // 维护严格递减栈
        }
        // 此情况必然是：anth[i][j] < stack.at(-1)，那么此时anth[i][j]可以接收栈顶天线的信号，比如6 5 2 3，最后一个3可以接收到前面5的信号，但是无法继续接收更前面6的信号，因此这里anth[i][j]结束处理
        else {
          ret[i][j]++;
        }
      }
 
      stack.push(anth[i][j]);
    }
  }
 
  // 再处理垂直方向，即每列的南向发射处理，和上面同理
  for (let j = 0; j < n; j++) {
    const stack = [];
    for (let i = 0; i < m; i++) {
      // 如果栈顶天线比anth[i][j]，则anth[i][j]必然能接收到栈顶天线的信号，并且还能继续接收栈顶前面一个天线的信号（递减栈，栈顶前面天线高度必然大于栈顶天线高度）
      while (stack.length && anth[i][j] > stack.at(-1)) {
        ret[i][j]++;
        stack.pop();
      }
 
      // 走到此步，如果stack还有值，那么由于是递减栈，因此此时栈顶天线高度必然 >= anth[i][j]
      if (stack.length) {
        // 如果栈顶天线高度 == anth[i][j]，那么此时anth[i][j]可以接收栈顶天线的信号，比如5 3 2 3，最后一个3可以接收到前面等高3的信号，但是无法继续接收前面5的信号，因此这里anth[i][j]结束处理
        if (anth[i][j] == stack.at(-1)) {
          ret[i][j]++;
          stack.pop(); // 维护严格递减栈
        }
        // 此情况必然是：anth[i][j] < stack.at(-1)，那么此时anth[i][j]可以接收栈顶天线的信号，比如6 5 2 3，最后一个3可以接收到前面5的信号，但是无法继续接收更前面6的信号，因此这里anth[i][j]结束处理
        else {
          ret[i][j]++;
        }
      }
      stack.push(anth[i][j]);
    }
  }
 
  return `${m} ${n}\n${ret.toString().split(",").join(" ")}`;
}

console.log(data(['1 6', '2 4 1 5 3 3']))