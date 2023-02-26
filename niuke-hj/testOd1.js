const rl = require("readline").createInterface({ input: process.stdin });

/**
 * 3 2 5
 * 3
 * 100
 * 200
 * 400
 */
const lines = [];
// 满减m、打折n、无门槛k, 人数x
let m, n, k, x;
rl.on("line", (line) => {
  lines.push(line);
  if (lines.length === 1) {
    [m, n, k] = lines[0].split(" ").map(Number);
  }
  if (lines.length === 2) {
    x = parseInt(lines[1]);
  }
  if (x && lines.length === x + 2) {
    lines.shift();
    lines.shift();
    const arr = lines.map(Number);
    getResult(arr, m, n, k);
    lines.length = 0;
  }
});

function getResult(arr, m, n, k) {
  //   console.log(arr, m, n, k);
  for (let i = 0; i < arr.length; i++) {
    let price = arr[i];
    const ans = [];

    // 减免
    const resM = M(price, m);
    // 减免+折扣
    const resMN_N = N(resM[0], n);
    ans.push([resMN_N[0], m + n - (resM[1] + resMN_N[1])]);

    // 减免+无门槛
    const resMK_K = K(resM[0], k);
    ans.push([resMK_K[0], m + k - (resM[1] + resMK_K[1])]);

    // 打折
    const resN = N(price, n);
    // 打折满减
    const resNM_M = M(resN[0], m);
    ans.push([resNM_M[0], m + n - (resN[1] + resNM_M[1])]);

    // 打折无门槛
    const resNK_K = K(resN[0], k);
    ans.push([resNK_K[0], n + k - (resN[1] + resMK_K[1])]);
    // console.log(ans);

    ans.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
    console.log(ans[0].join(" "));
  }
}

//减免 100 - 10;
function M(price, m) {
  let maxM = parseInt(price / 100);
  while (price >= 100 && m > 0) {
    if (maxM < m) {
      //   console.log(maxM);
      if (maxM === 0) {
        return [price, m];
      }
    }
    price -= 10;
    m--;
    maxM--;
    // console.log([price, m, maxM]);
  }
  return [price, m];
}

// console.log(M(200, 3));

/**
 * 9.2 折
 * @param {*} price
 * @param {*} n
 */
function N(price, n) {
  if (n >= 1) {
    price = Math.floor(price * 0.92);
    n--;
  }
  return [price, n];
}

/**
 * 无门槛不需要 5 元
 * @param {*} price
 * @param {*} k
 */
function K(price, k) {
  while (price > 0 && k > 0) {
    price -= 5;
    price = Math.max(price, 0);
    k--;
  }
  return [price, k];
}
