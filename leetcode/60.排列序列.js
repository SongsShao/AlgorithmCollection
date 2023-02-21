/**
 * 给出集合 [1,2,3,...,n]，其所有元素共有 n! 种排列。
 * 按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
 *
 * "123"
 * "132"
 * "213"
 * "231"
 * "312"
 * "321"
 * 给定 n 和 k，返回第 k 个排列。
 *
 * 示例 1：
 * 输入：n = 3, k = 3
 * 输出："213"
 *
 * 示例 2：
 * 输入：n = 4, k = 9
 * 输出："2314"
 *
 * 示例 3：
 * 输入：n = 3, k = 1
 * 输出："123"
 *
 * 提示：
 *
 * 1 <= n <= 9
 * 1 <= k <= n!
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/permutation-sequence
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @author shaosong
 * @description
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  while ((line = await readline())) {
    let tokens = line.split(" ");
    console.log(getPermutation(Number(tokens[0]), Number(tokens[1])));
  }
})();

function getPermutation(n, k) {
  const factorial = [1];

  //   确定当前每个节点有多少种组合
  for (let i = 1; i < n; i++) {
    let data = factorial[i - 1];
    factorial[i] = data * i;
  }
  //   未被使用的数字
  let used = new Array(n + 1).fill(false);
  let path = [];

  const dfs = (index, path) => {
    if (index === n) return;

    const cnt = factorial[n - index - 1];
    console.log(index, path, cnt, k);
    for (let i = 1; i <= n; i++) {
      if (used[i]) continue;

      if (cnt < k) {
        k -= cnt;
        continue;
      }

      path.push(i);
      used[i] = true;
      dfs(index + 1, path);
      return;
    }
  };
  dfs(0, path);
  return path.join("");
}
