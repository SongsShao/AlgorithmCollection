/**
 * Definition for singly-linked list.
 */
  class ListNode {
      val: number
      next: ListNode | null
      constructor(val?: number, next?: ListNode | null) {
          this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
      }
  }
 

function detectCycle(head: ListNode | null): ListNode | null {
    let visited = new Set();
    let visitor = head;
    while(visitor !== null){
        if(visited.has(visitor)){
            return visitor;
        }
        visited.add(visitor);
        visitor = visitor.next;
    }
    return null;
};

// 快慢双指针
function detectCycleFastSlow(head: ListNode | null): ListNode | null {
    // 定义快满指针
    let fast = head;
    let slow: any = head;
    while(fast!== null && fast.next !== null){
        fast = fast.next.next;
        slow = slow.next;
        if(fast === slow){
            let index1: any = fast;
            let index2: any = head;
            while(index1 !== index2){
                index1 = index1.next;
                index2 = index2.next;
            }
            return index1;
        }
    }
    return null;
};