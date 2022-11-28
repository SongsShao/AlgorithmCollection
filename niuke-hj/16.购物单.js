/**
 * 描述
    王强决定把年终奖用于购物，他把想买的物品分为两类：主件与附件，附件是从属于某个主件的，下表就是一些主件与附件的例子：
    主件	附件
    电脑	打印机，扫描仪
    书柜	图书
    书桌	台灯，文具
    工作椅	无
    如果要买归类为附件的物品，必须先买该附件所属的主件，且每件物品只能购买一次。
    每个主件可以有 0 个、 1 个或 2 个附件。附件不再有从属于自己的附件。
    王强查到了每件物品的价格（都是 10 元的整数倍），而他只有 N 元的预算。除此之外，他给每件物品规定了一个重要度，用整数 1 ~ 5 表示。他希望在花费不超过 N 元的前提下，使自己的满意度达到最大。
    满意度是指所购买的每件物品的价格与重要度的乘积的总和，假设设第ii件物品的价格为v[i]v[i]，重要度为w[i]w[i]，共选中了kk件物品，编号依次为j_1,j_2,...,j_k，则满意度为：v[j_1]*w[j_1]+v[j_2]*w[j_2]+ … +v[j_k]*w[j_k]v[j_k]。（其中 * 为乘号）
    请你帮助王强计算可获得的最大的满意度。

    输入描述：
    输入的第 1 行，为两个正整数N，m，用一个空格隔开：
    （其中 N （ N<32000 ）表示总钱数， m （m <60 ）为可购买的物品的个数。）
    从第 2 行到第 m+1 行，第 j 行给出了编号为 j-1 的物品的基本数据，每行有 3 个非负整数 v p q
    （其中 v 表示该物品的价格（ v<10000 ）， p 表示该物品的重要度（ 1 ~ 5 ）， q 表示该物品是主件还是附件。如果 q=0 ，表示该物品为主件，如果 q>0 ，表示该物品为附件， q 是所属主件的编号）

    输出描述：
    输出一个正整数，为张强可以获得的最大的满意度。
    示例1
    输入：
    1000 5
    800 2 0
    400 5 1
    300 5 1
    400 3 0
    500 2 0

    输出：
    2200

    示例2
    输入：
    50 5
    20 3 5
    20 3 5
    10 3 0
    10 2 0
    10 1 0

    输出：
    130

    说明：
    由第1行可知总钱数N为50以及希望购买的物品个数m为5；
    第2和第3行的q为5，说明它们都是编号为5的物品的附件；
    第4~6行的q都为0，说明它们都是主件，它们的编号依次为3~5；
    所以物品的价格与重要度乘积的总和的最大值为10*1+20*3+20*3=130       
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  //Write your code here
  let firstString = await readline();
  let firstArr = firstString.split(" ");
  // 价格数组
  let prices = [[]];
  // 满意度数组
  let satisfaction = [[]];
  if (firstArr.length === 2) {
    // 总钱数
    let N = parseInt(firstArr[0]) / 10;
    // 购买物品数
    let m = parseInt(firstArr[1]);
    for (let i = 1; i <= m; i++) {
      let line = await readline();
      let itemArray = line.split(" ");

      if (itemArray.length === 3) {
        let v = parseInt(itemArray[0]) / 10;
        let p = parseInt(itemArray[1]);
        let q = parseInt(itemArray[2]);
        // 初始化数组
        if (!prices[i]) {
          prices[i] = [];
          satisfaction[i] = [];
        }
        if (q != 0) {
          let qIndex = q;
          // 初始化数组
          if (!prices[qIndex]) {
            prices[qIndex] = [];
            satisfaction[qIndex] = [];
          }
          // 更新附件
          if (!prices[qIndex][1]) {
            prices[qIndex][1] = v;
            satisfaction[qIndex][1] = v * p;
          } else {
            prices[qIndex][2] = v;
            satisfaction[qIndex][2] = v * p;
          }
        } else {
          prices[i][0] = v;
          satisfaction[i][0] = v * p;
        }
      }
    }

    // 动态规划数组
    let dp = [[0]];
    // 循环物品
    for (let i = 0; i <= N; i++) {
      dp[0][i] = 0;
    }
    // 循环物品
    for (let i = 1; i <= m; i++) {
      if (!dp[i]) {
        dp[i] = [0];
      }
      // 循环奖金
      for (let j = 1; j <= N; j++) {
        // 主件
        let a = prices[i][0] || 0;
        let b = satisfaction[i][0] || 0;
        // 附件1
        let c = prices[i][1] || 0;
        let d = satisfaction[i][1] || 0;
        // 附件2
        let e = prices[i][2] || 0;
        let f = satisfaction[i][2] || 0;
        dp[i][j] =
          j >= a
            ? Math.max(dp[i - 1][j - a] + b, dp[i - 1][j])
            : dp[i - 1][j] || 0;
        dp[i][j] =
          j >= a + c
            ? Math.max(dp[i - 1][j - a - c] + b + d, dp[i][j])
            : dp[i][j];
        dp[i][j] =
          j >= a + e
            ? Math.max(dp[i - 1][j - a - e] + b + f, dp[i][j])
            : dp[i][j];
        dp[i][j] =
          j >= a + c + e
            ? Math.max(dp[i - 1][j - a - c - e] + b + d + f, dp[i][j])
            : dp[i][j];
      }
    }
    console.log(dp[m][N] * 10);
  }
})();
