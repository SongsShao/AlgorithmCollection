class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head) return head;
  if (n > 1 && !head.next) return head;
  let dummayNode = new ListNode(0, head);
  let cur: any = dummayNode;
  let size = 0;
  while (cur.next) {
    cur = cur.next;
    size++;
  }
  cur = dummayNode;
  let index = size - n;
  while (index-- > 0) {
    cur = cur.next;
  }
  cur.next = cur.next.next;
  return dummayNode.next;
}

/**
 * 快慢指针实现方法，遍历一次数据
 * @param head ListNode | null
 * @param n
 * @returns ListNode | null
 */
function removeNthFromEndQuick(
  head: ListNode | null,
  n: number
): ListNode | null {
  let newHead: ListNode | null = new ListNode(0, head);
  let fast: ListNode = newHead;
  let slow: ListNode = newHead;
  // 快指针走需要删除的位数
  while (n--) {
    fast = fast.next!;
  }
  // 然后快指针下一节点为null 时，慢指针的下一位即是需要删除的节点。
  while (fast.next) {
    fast = fast.next;
    slow = slow.next!;
  }
  // 删除下一位。
  slow.next = slow.next!.next;
  return newHead.next;
}
