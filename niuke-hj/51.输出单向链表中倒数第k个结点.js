/**
 * 描述
 * 输入一个单向链表，输出该链表中倒数第k个结点，链表的倒数第1个结点为链表的尾指针。
 *
 * 链表结点定义如下：
 * struct ListNode
 * {
 *     int m_nKey;
 *     ListNode* m_pNext;
 * };
 * 正常返回倒数第k个结点指针，异常返回空指针.
 * 要求：
 * (1)正序构建链表;
 * (2)构建后要忘记链表长度。
 * 数据范围：链表长度满足 1≤n≤1000, k≤n,链表中数据满足 0≤val≤10000
 *
 * 本题有多组样例输入。
 *
 *
 * 输入描述：
 * 输入说明
 * 1 输入链表结点个数
 * 2 输入链表的值
 * 3 输入k的值
 *
 * 输出描述：
 * 输出一个整数
 *
 * 示例1
 * 输入：
 * 8
 * 1 2 3 4 5 6 7 8
 * 4
 * 输出：
 * 5
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

class Node {
  constructor(v, next) {
    this.value = v;
    this.next = next;
  }
}

void (async function() {
  while ((line = await readline())) {
    let count = Number(line);
    let string = await readline();
    let array = string.split(" ");
    let num = await readline();
    let ListNode = createLinkedList(array, count);
    ListNode = reversalLinkedList(ListNode);
    if (num === 0) {
      console.log(0);
    } else {
      while (num > 1) {
        ListNode = ListNode.next;
        num--;
      }
      console.log(ListNode.value);
    }
  }
})();

function reversalLinkedList(ListNode) {
  let head = null;
  let cur = ListNode;
  while (cur) {
    let nodeNext = cur.next;
    cur.next = head;
    head = cur;
    cur = nodeNext;
  }
  return head;
}

/**
 * 创建链表
 * @param {any[]} array
 * @param {Number} count
 * @returns
 */
function createLinkedList(array, count) {
  let head = new Node(array[0], null);
  let cur = head;
  for (let i = 1; i < count; i++) {
    const nodeValue = array[i];
    const node = new Node(nodeValue, null);
    // 修改head next 为新节点
    cur.next = node;
    // 重置cur 为新节点
    cur = node;
  }
  return head;
}
