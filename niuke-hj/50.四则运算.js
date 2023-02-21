/**
 * 描述
 * 输入一个表达式（用字符串表示），求这个表达式的值。
 * 保证字符串中的有效字符包括[‘0’-‘9’],‘+’,‘-’, ‘*’,‘/’ ,‘(’， ‘)’,‘[’, ‘]’,‘{’ ,‘}’。且表达式一定合法。
 *
 * 数据范围：表达式计算结果和过程中满足 ∣val∣≤1000  ，字符串长度满足 1≤n≤1000
 *
 * 输入描述：
 * 输入一个算术表达式
 *
 * 输出描述：
 * 得到计算结果
 *
 * 示例1
 * 输入：
 *     3+2*{1+2*[-4/(8-6)+7]}
 * 输出：
 *     25
 */

/**
 * 四则运算解析
 * 1. 首先根据定位符号(、[、{ 开始；
 * 2. 以符号)、]、} 结束；
 * 3. 遍历数字,后增加判断运算符优先级判断flog；
 * 4. 如果优先级低于后已符号位继续压栈；
 * 5. 重复3操作，遇到符号)、]、} 结束，出栈。
 */

let operand = [],
  operator = [];
/**
 * 计算当前数据
 * @param {any[]} operand
 * @param {any[]} operator
 * @returns
 */
function calc(operand, operator) {
  let n = operand.pop();
  let m = operand.pop();
  let symbol = operator.pop();
  switch (symbol) {
    case "+":
      return operand.push(m + n);
    case "-":
      return operand.push(m - n);
    case "*":
      return operand.push(m * n);
    case "/":
      return operand.push(m / n);
    default:
      return operand.push(0);
  }
}

/**
 * 判断优先级
 * @param {string} op1
 * @param {string} op2
 * @returns boolean
 */
function isPriority(op1, op2) {
  // 栈顶为左括号直接退出
  if (op1 === "(") return false;
  //   如果栈顶为符号位比当前符号位优先级低也退出
  else if ((op1 === "+" || op1 === "-") && (op2 === "*" || op2 === "/"))
    return false;
  return true;
}

/**
 * 出入栈
 * @param {string} str
 */
function accessStack(str) {
  // 如果为flog为ture进行优先级判断
  let flog = false;
  operator.push("(");
  str += ")";
  for (let i = 0; i < str.length; i++) {
    // 遇到左括号时入栈
    if (str[i] === "(" || str[i] === "[" || str[i] === "{") {
      operator.push("(");
    }
    // 遇到右括号是出栈并计算，在出栈符号位
    else if (str[i] === ")" || str[i] === "]" || str[i] === "}") {
      while (operator[operator.length - 1] !== "(") {
        calc(operand, operator);
      }
      operator.pop();
    }
    // 进行当前运算优先级计算
    else if (flog) {
      // 如果满足条件计算
      while (isPriority(operator[operator.length - 1], str[i])) {
        calc(operand, operator);
      }
      //   将后面符号位压栈
      operator.push(str[i]);
      flog = false;
    } else {
      // 存储当前遍历节点
      let j = i;
      // 处理正负数
      if (str[j] === "-" || str[j] === "+") {
        i++;
      }
      //   判断数字位数
      while (str[i] - "0" >= 0 && str[i] - "0" <= 9) {
        i++;
      }
      let temp = str.substr(j, i - j);
      operand.push(Number(temp));
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
    accessStack(line);
  }
})();
