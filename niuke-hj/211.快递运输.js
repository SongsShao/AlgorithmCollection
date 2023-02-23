/**
 * 211.快递运输
 * 一辆运送快递的货车，运送的快递均放在大小不等的长方体快递盒中，为了能够装载更多的快递，
 * 同时不能让货车超载，需要计算最多能装多少个快递。
 * 注：快递的体积不受限制，快递数最多1000个，货车载重最大50000。
 *
 *
 * 输入描述:
 * 第一行输入每个快递的重量，用英文逗号分隔，如：5,10,2,11
 * 第二行输入货车的载重量，如：20
 * 不需要考虑异常输入。
 * 输出描述:
 * 输出最多能装多少个快递，如：3
 *
 * 示例1：
 * 输入
 * 5,10,2,11
 * 20
 * 输出
 * 3
 * 说明
 * 货车的载重量为20，最多只能放三个快递5、10、2，因此输出3
 */

function maxExpress(exp, weight) {
  let max = 0;
  for (let i = 0; i < exp.length; i++) {
    let sum = exp[i];
    for (j = i + 1; j < exp.length; j++) {
      sum += exp[j];
      if (sum > weight) {
        break;
      }
      max = Math.max(j - i + 1, max);
    }
  }
  return max;
}

console.log(maxExpress([5, 10, 2, 11], 20));
console.log(maxExpress([11, 10, 2, 5], 20));
