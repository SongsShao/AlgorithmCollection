//  Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function swapPairs(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;
  // 创建虚拟头结点
  let dummeyNode = new ListNode(0, head);
  let cur = dummeyNode;
  while (cur !== null && cur.next !== null && cur.next.next !== null) {
    // 需要换位的前一个节点
    let f: any = cur;
    // 第一个节点
    let s: any = cur.next;
    // 第二个节点
    let t: any = s.next;
    // 12 --- 13 --- 14 --- 15
    // f      s      t
    f.next = t;
    s.next = t.next;
    t.next = s;
    // 指针后移两位
    cur = cur.next.next;
  }
  return dummeyNode.next;
}

/**
 * 递归两两交换链表中的节点
 * @param head ListNode | null
 * @returns
 */
function swapPairsRecursion(head: ListNode | null): ListNode | null {
  // 节点为null 或者 下一个节点为null是退出
  if (head === null || head.next === null) return head;
  // head: 1 -- 2 -- 3 -- 4

  // 1. 存储除第一个节点外的节点
  let next = head.next;
  // 2 -- 3 -- 4

  // 2. 除去两个交换节点以外的节点递归交换，然后存储于第一个节点next 实现第一个连接第三个节点
  head.next = swapPairs(next.next); // 3 -- 4  -> 4 -- 3
  // 1 -- 4 -- 3

  // 3. 第二个节点连接head剩余节点
  next.next = head;
  // 2 -- 1 -- 4 -- 3

  return next;
}
