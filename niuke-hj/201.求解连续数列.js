/**
 * 题目：求解连续数列
已知连续正整数数列{K}=K1,K2,K3...Ki的各个数相加之和为S，i=N (0<S<100000, 0<N<100000), 求此数列K。

输入描述:
输入包含两个参数，1）连续正整数数列和S，2）数列里数的个数N。

输出描述:
如果有解输出数列K，如果无解输出-1

示例1

输入

525 6

输出

85 86 87 88 89 90

示例2

输入

3 5

输出

-1
 */

function lineNumArr(S, N) {
  if ((S * 2) % N !== 0) {
    return -1;
  } else if (((S * 2) / N - N) % 2 === 0) {
    return -1;
  } else {
    let a1 = 1;
    // 计算最小正整数
    a1 = ((S * 2) / N + 1 - N) / 2;
    let arr = [];
    for (let i = 0; i < N; i++) {
      arr.push(a1 + i);
    }
    return arr.join(" ");
  }
}

console.log(lineNumArr(525, 6));
console.log(lineNumArr(3, 5));
console.log(lineNumArr(4, 3));
