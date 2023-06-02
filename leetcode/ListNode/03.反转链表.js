/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  return doublePointReverseList(head);
};
/**
 * 拴指针法
 * @param {ListNode} head
 * @returns {ListNode}
 */
function doublePointReverseList(head) {
  if (head === null || head.next === null) return head;
  let cur = head,
    // 反转链表
    pre = null,
    // 剩余链表临时存储
    temp = null;
  while (cur) {
    // 存储剩余链表
    temp = cur.next;
    // 拼接已反转链表
    cur.next = pre;
    // 存储已反转链表
    pre = cur;
    // 重置剩余链表
    cur = temp;
  }
  return pre;
}

/**
 * 递归算法
 * @param {ListNode} pre
 * @param {ListNode} cur
 * @returns ListNode
 */
function reverse(pre, cur) {
  if (cur === null) return pre;
  let temp = cur.next;
  cur.next = pre;
  pre = cur;
  return reverse(pre, temp);
}

function reverseListNode(head) {
  return reverse(null, head);
}
