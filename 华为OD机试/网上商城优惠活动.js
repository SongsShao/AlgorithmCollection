/**
 * 题目描述
 * 某网上商场举办优惠活动，发布了满减、打折、无门槛3种优惠券，分别为：
 *
 * 每满100元优惠10元，无使用数限制，如100~199元可以使用1张减10元，200~299可使用2张减20元，以此类推；
 * 92折券，1次限使用1张，如100元，则优惠后为92元；
 * 无门槛5元优惠券，无使用数限制，直接减5元。
 * 优惠券使用限制
 *
 * 每次最多使用2种优惠券，2种优惠可以叠加（优惠叠加时以优惠后的价格计算），以购物200元为例，
 * 可以先用92折券优惠到184元，再用1张满减券优惠10元，最终价格是174元，
 * 也可以用满减券2张优惠20元为180元，再使用92折券优惠到165（165.6向下取整），
 * 不同使用顺序的优惠价格不同，以最优惠价格为准。
 * 在一次购物种，同一类型优惠券使用多张时必须一次性使用，
 * 不能分多次拆开使用（不允许先使用1张满减券，再用打折券，再使用一张满减券）。
 * 问题
 *
 * 请设计实现一种解决方法，帮助购物者以最少的优惠券获得最优的优惠价格。
 * 优惠后价格越低越好，同等优惠价格，使用的优惠券越少越好，可以允许某次购物不使用优惠券。
 * 约定
 *
 * 优惠活动每人只能参加一次，每个人的优惠券种类和数量是一样的。
 * 输入描述
 *    第一行：每个人拥有的优惠券数量（数量取值范围为[0,10]），按满减、打折、无门槛的顺序输入
 *    第二行：表示购物的人数n（1 ≤ n ≤ 10000）
 *    最后n行：每一行表示某个人优惠前的购物总价格（价格取值范围(0, 1000] ，都为整数）。
 * 约定：输入都是符合题目设定的要求的。
 *    输出描述
 *    每行输出每个人每次购物优惠后的最低价格以及使用的优惠券总数量
 *    每行的输出顺序和输入的顺序保持一致
 * 备注
 *    优惠券数量都为整数，取值范围为[0, 10]
 *    购物人数为整数，取值范围为[1, 10000]
 *    优惠券的购物总价为整数，取值范围为 (0, 1000]
 *    优惠后价格如果是小数，则向下取整，输出都为整数。
 * 用例
 * 输入
 *    3 2 5
 *    3
 *    100
 *    200
 *    400
 * 输出
 *    65 6
 *    155 7
 *    338 4
 * 说明
 * 输入：
 *
 *  第一行：3种优惠券数量分别为：满减券3张，打折券2张，无门槛5张
 *  第二行：总共3个人购物
 *  第三行：第一个人购物优惠前价格为100元
 *  第四行：第二个人购物优惠前价格为200元
 *  第五行：第三个人购物优惠前价格为400元
 *  输入3个人，输出3行结果，同输入的顺序，对应每个人的优惠结果，如下：
 *
 *  第一行输出：先使用1张满减券优惠到90元，再使用5张无门槛券优惠到25元，最终价格是65元，总共使用6张优惠券。
 *  第二行输出：先使用2张满减券优惠到180元，再使用5张无门槛券优惠到25元，
 *  最终价格是155元，总共使用7张优惠券。
 *  第三行输出：先使用1张92折券优惠到368元，再使用3张满减券优惠到30元，最终价格是338元，总共使用4张优惠券。
 *
 */

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
