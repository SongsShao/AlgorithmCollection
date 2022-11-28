/**
 * 描述
请解析IP地址和对应的掩码，进行分类识别。要求按照A/B/C/D/E类地址归类，不合法的地址和掩码单独归类。

所有的IP地址划分为 A,B,C,D,E五类

A类地址从1.0.0.0到126.255.255.255;

B类地址从128.0.0.0到191.255.255.255;

C类地址从192.0.0.0到223.255.255.255;

D类地址从224.0.0.0到239.255.255.255；

E类地址从240.0.0.0到255.255.255.255


私网IP范围是：

从10.0.0.0到10.255.255.255

从172.16.0.0到172.31.255.255

从192.168.0.0到192.168.255.255


子网掩码为二进制下前面是连续的1，然后全是0。（例如：255.255.255.32就是一个非法的掩码）
（注意二进制下全是1或者全是0均为非法子网掩码）

注意：
1. 类似于【0.*.*.*】和【127.*.*.*】的IP地址不属于上述输入的任意一类，也不属于不合法ip地址，计数时请忽略
2. 私有IP地址和A,B,C,D,E类地址是不冲突的

输入描述：
多行字符串。每行一个IP地址和掩码，用~隔开。

请参考帖子https://www.nowcoder.com/discuss/276处理循环输入的问题。
输出描述：
统计A、B、C、D、E、错误IP地址或错误掩码、私有IP的个数，之间以空格隔开。

示例1
输入：
10.70.44.68~255.254.255.0
1.0.0.1~255.0.0.0
192.168.0.2~255.255.255.0
19..0.~255.255.255.0

输出：
1 0 1 0 0 2 1

说明：
10.70.44.68~255.254.255.0的子网掩码非法，19..0.~255.255.255.0的IP地址非法，所以错误IP地址或错误掩码的计数为2；
1.0.0.1~255.0.0.0是无误的A类地址；
192.168.0.2~255.255.255.0是无误的C类地址且是私有IP；
所以最终的结果为1 0 1 0 0 2 1        
示例2
输入：
0.201.56.50~255.255.111.255
127.201.56.50~255.255.111.255

输出：
0 0 0 0 0 0 0

说明：
类似于【0.*.*.*】和【127.*.*.*】的IP地址不属于上述输入的任意一类，也不属于不合法ip地址，计数时请忽略   
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function() {
  // 结果A, B, C, D, E, error, private
  let [A, B, C, D, E, e_ip, p_ip] = [0, 0, 0, 0, 0, 0, 0];
  // Write your code here
  while ((line = await readline())) {
    let tokens = line.split("~");
    if (isIgnored(line)) {
      continue;
    } else if (isWrongIp(tokens)) {
      e_ip++;
      continue;
    } else if (isA(tokens)) {
      A++;
    } else if (isB(tokens)) {
      B++;
    } else if (isC(tokens)) {
      C++;
    } else if (isD(tokens)) {
      D++;
    } else if (isE(tokens)) {
      E++;
    }
    if (isPrivate(tokens)) {
      p_ip++;
    }
  }
  console.log(`${A} ${B} ${C} ${D} ${E} ${e_ip} ${p_ip}`);
})();

// 忽略0和127开头的IP地址
function isIgnored(line) {
  if (line.indexOf("0") === 0 || line.indexOf("127") === 0) {
    return true;
  }
  return false;
}

// 是否合法
function isWrongIp(tokens) {
  let ip = tokens[0].split(".");
  let subnetMask = tokens[1].split(".");
  if (
    ip.length !== 4 ||
    ip[0] === "" ||
    ip[1] === "" ||
    ip[2] === "" ||
    ip[3] === ""
  ) {
    return true;
  }

  if (
    subnetMask.length !== 4 ||
    subnetMask[0] === "" ||
    subnetMask[1] === "" ||
    subnetMask[2] === "" ||
    subnetMask[3] === ""
  ) {
    return true;
  }
  let b_mask = "";
  for (let m of subnetMask) {
    b_mask += parseInt(m)
      .toString(2)
      .padStart(8, "0");
  }
  // 判断开头是否全部是1
  if (!b_mask.startsWith("11111111")) {
    return true;
  }
  let i = 0;
  let j = b_mask.length - 1;
  // 确定是否全是1 i <= j
  while (i < b_mask.length) {
    if (b_mask[i] === "1") {
      i++;
      continue;
    }
    break;
  }
  // 确定是否开头是0 j === b_mask.length - 1
  while (j >= 0) {
    if (b_mask[j] === "0") {
      j--;
      continue;
    }
    break;
  }
  if (i <= j || i === 0 || j === b_mask.length - 1) {
    return true;
  }

  return false;
}

function isA(tokens) {
  let ip = tokens[0].split(".");
  let ip1 = parseInt(ip[0]);
  let ip2 = parseInt(ip[1]);
  let ip3 = parseInt(ip[2]);
  let ip4 = parseInt(ip[3]);
  if (
    ip1 >= 1 &&
    ip1 <= 126 &&
    ip2 >= 0 &&
    ip2 <= 255 &&
    ip3 >= 0 &&
    ip3 <= 255 &&
    ip4 >= 0 &&
    ip4 <= 255
  ) {
    return true;
  }
  return false;
}

function isB(tokens) {
  let ip = tokens[0].split(".");
  let ip1 = parseInt(ip[0]);
  let ip2 = parseInt(ip[1]);
  let ip3 = parseInt(ip[2]);
  let ip4 = parseInt(ip[3]);
  if (
    ip1 >= 128 &&
    ip1 <= 191 &&
    ip2 >= 0 &&
    ip2 <= 255 &&
    ip3 >= 0 &&
    ip3 <= 255 &&
    ip4 >= 0 &&
    ip4 <= 255
  ) {
    return true;
  }
  return false;
}

function isC(tokens) {
  let ip = tokens[0].split(".");
  let ip1 = parseInt(ip[0]);
  let ip2 = parseInt(ip[1]);
  let ip3 = parseInt(ip[2]);
  let ip4 = parseInt(ip[3]);
  if (
    ip1 >= 192 &&
    ip1 <= 223 &&
    ip2 >= 0 &&
    ip2 <= 255 &&
    ip3 >= 0 &&
    ip3 <= 255 &&
    ip4 >= 0 &&
    ip4 <= 255
  ) {
    return true;
  }
  return false;
}

function isD(tokens) {
  let ip = tokens[0].split(".");
  let ip1 = parseInt(ip[0]);
  let ip2 = parseInt(ip[1]);
  let ip3 = parseInt(ip[2]);
  let ip4 = parseInt(ip[3]);
  if (
    ip1 >= 224 &&
    ip1 <= 239 &&
    ip2 >= 0 &&
    ip2 <= 255 &&
    ip3 >= 0 &&
    ip3 <= 255 &&
    ip4 >= 0 &&
    ip4 <= 255
  ) {
    return true;
  }
  return false;
}

function isE(tokens) {
  let ip = tokens[0].split(".");
  let ip1 = parseInt(ip[0]);
  let ip2 = parseInt(ip[1]);
  let ip3 = parseInt(ip[2]);
  let ip4 = parseInt(ip[3]);
  if (
    ip1 >= 240 &&
    ip1 <= 255 &&
    ip2 >= 0 &&
    ip2 <= 255 &&
    ip3 >= 0 &&
    ip3 <= 255 &&
    ip4 >= 0 &&
    ip4 <= 255
  ) {
    return true;
  }
  return false;
}

function isPrivate(tokens) {
  let ip = tokens[0].split(".");
  let ip1 = parseInt(ip[0]);
  let ip2 = parseInt(ip[1]);
  let ip3 = parseInt(ip[2]);
  let ip4 = parseInt(ip[3]);
  // 10.0.0.0 -- 10.255.255.255
  if (
    ip1 === 10 &&
    ip2 >= 0 &&
    ip2 <= 255 &&
    ip3 >= 0 &&
    ip3 <= 255 &&
    ip4 >= 0 &&
    ip4 <= 255
  ) {
    return true;
  }
  // 172.16.0.0 --- 172.31.255.255
  if (
    ip1 === 162 &&
    ip2 >= 16 &&
    ip2 <= 31 &&
    ip3 >= 0 &&
    ip3 <= 255 &&
    ip4 >= 0 &&
    ip4 <= 255
  ) {
    return true;
  }

  // 192.168.0.0 --- 192.168.255.255
  if (
    ip1 === 192 &&
    ip2 == 168 &&
    ip3 >= 0 &&
    ip3 <= 255 &&
    ip4 >= 0 &&
    ip4 <= 255
  ) {
    return true;
  }
  return false;
}
