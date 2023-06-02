/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  // 添加虚拟head头节点
  const virtualNode = new ListNode(-1, head);
  let cur = virtualNode;
  while (cur.next !== null) {
    if (cur.next.val === val) {
      cur.next = cur.next.next;
      continue;
    }
    cur = cur.next;
  }
  return virtualNode.next;
};
