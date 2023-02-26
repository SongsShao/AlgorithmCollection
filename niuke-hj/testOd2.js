const rl = require("readline").createInterface({ input: process.stdin });

/**
 * 3 2 5
 * 3
 * 100
 * 200
 * 400
 */
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

function data(lines) {
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

  //   console.log(anth);

  for (let i = 0; i < m; i++) {
    const stack = [];
    // console.log(stack[-1] || 0);
    for (let j = 0; j < n; j++) {
      while (stack.length && anth[i][j] > stack.at(-1)) {
        ret[i][j]++;
        stack.pop();
      }

      if (stack.length) {
        if (anth[i][j] === stack.at(-1)) {
          ret[i][j]++;
          stack.pop();
        } else {
          ret[i][j]++;
        }
      }
      stack.push(anth[i][j]);
    }
  }
  for (let j = 0; j < n; j++) {
    const stack = [];
    for (let i = 0; i < m; i++) {
      while (stack.length && anth[i][j] > stack.at(-1)) {
        ret[i][j]++;
        stack.pop();
      }

      if (stack.length) {
        if (anth[i][j] === stack.at(-1)) {
          ret[i][j]++;
          stack.pop();
        } else {
          ret[i][j]++;
        }
      }
      stack.push(anth[i][j]);
    }
  }

  return `${m} ${n}\n${ret
    .toString()
    .split(",")
    .join(" ")}`;
}

console.log(data(["1 6", "2 4 1 5 3 3"]));
