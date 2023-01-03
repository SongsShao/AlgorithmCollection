/**
 * 描述
 * 给定一个字符串描述的算术表达式，计算出结果值。
 *
 * 输入字符串长度不超过 100 ，合法的字符包括 ”+, -, *, /, (, )” ， ”0-9” 。
 *
 * 数据范围：运算过程中和最终结果均满足 ∣val∣≤2^31−1 ，即只进行整型运算，确保输入的表达式合法
 * 输入描述：
 * 输入算术表达式
 *
 * 输出描述：
 * 计算出结果值
 *
 * 示例1
 * 输入：
 *      400+5
 * 输出：
 *      405
 */

/**
 * 四则运算解析
 * 1. 首先根据定位符号( 开始；
 * 2. 以符号) 结束；
 * 3. 遍历数字,后增加判断运算符优先级判断flog；
 * 4. 如果优先级低于后已符号位继续压栈；
 * 5. 重复3操作，遇到符号) 结束，出栈。
 */

let operand = [],
  operator = [];

/**
 *
 * @param {any[]} operand
 * @param {any[]} operator
 */

function calc(operand, operator) {
  let m = operand.pop();
  let n = operand.pop();
  let op = operator.pop();
  switch (op) {
    case "+":
      operand.push(n + m);
      break;
    case "-":
      operand.push(n - m);
      break;
    case "*":
      operand.push(n * m);
      break;
    case "/":
      operand.push(n / m);
      break;
    default:
      operand.push(0);
      break;
  }
}

function isPriority(op1, op2) {
  if (op1 === "(") return false;
  if ((op1 === "+" || op1 === "-") && (op2 === "*" || op2 === "/"))
    return false;
  return true;
}

function createStack(str) {
  operand = [];
  operator = [];
  let flog = false;
  operator.push("(");
  str += ")";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      operator.push(str[i]);
    } else if (str[i] === ")") {
      while (operator[operator.length - 1] !== "(") {
        calc(operand, operator);
      }
      operator.pop();
    } else if (flog) {
      while (isPriority(operator[operator.length - 1], str[i])) {
        calc(operand, operator);
      }
      operator.push(str[i]);
      flog = false;
    } else {
      let j = i;
      if (str[j] === "-" || str[j] === "+") {
        i++;
      }
      if (str[i] - "0" >= 0 && str[i] - "0" <= 9) {
        i++;
      }
      let num = Number(str.substr(j, i - j));
      operand.push(num);
      i--;
      flog = true;
    }
  }
  console.log(operand.pop());
}

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // Write your code here
  while ((line = await readline())) {
    operand = [];
    operator = [];
    createStack(line);
  }
})();
