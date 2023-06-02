class LinkNode {
  constructor(val, next) {
    this.next = next;
    this.val = val;
  }
}

var MyLinkedList = function() {
  this._size = 0;
  this._tail = null;
  this._head = null;
};

/**
 * @param {number} index
 * @return {number}
 * int getNode(int index) 获取链表中下标为 index 的节点的值。如果下标无效，则返回 -1 。
 */
MyLinkedList.prototype.getNode = function(index) {
  if (index < 0 || index >= this._size) return null;
  // 创建虚拟头节点
  let cur = new LinkNode(0, this._head);
  // 0 -> head
  while (index-- >= 0) {
    cur = cur.next;
  }
  return cur;
};

/**
 * @param {number} index
 * @return {number}
 * int get(int index) 获取链表中下标为 index 的节点的值。如果下标无效，则返回 -1 。
 */
MyLinkedList.prototype.get = function(index) {
  if (index < 0 || index >= this._size) return -1;
  return this.getNode(index).val;
};

/**
 * @param {number} val
 * @return {void}
 * void addAtHead(int val) 将一个值为 val 的节点插入到链表中第一个元素之前。
 * 在插入完成后，新节点会成为链表的第一个节点。
 */
MyLinkedList.prototype.addAtHead = function(val) {
  let node = new LinkNode(val, this._head);
  this._head = node;
  this._size++;
  if (!this._tail) {
    this._tail = node;
  }
};

/**
 * @param {number} val
 * @return {void}
 * void addAtTail(int val) 将一个值为 val 的节点追加到链表中作为链表的最后一个元素。
 */
MyLinkedList.prototype.addAtTail = function(val) {
  let node = new LinkNode(val, null);
  this._size++;
  if (this._tail) {
    this._tail.next = node;
    this._tail = node;
    return;
  }
  this._tail = node;
  this._head = node;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 * void addAtIndex(int index, int val) 将一个值为 val 的节点插入到链表中下标为 index 的节点之前。
 * 如果 index 等于链表的长度，那么该节点会被追加到链表的末尾。
 * 如果 index 比长度更大，该节点将 不会插入 到链表中。
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (index > this._size) return;
  if (index <= 0) {
    this.addAtHead(val);
    return;
  }
  if (index === this._size) {
    this.addAtTail(val);
    return;
  }

  //   let node = this.getNode(index - 1);
  //   node.next = new LinkNode(val, node.next);
  //   this._size++;
  // 获取目标节点的上一个的节点
  const node = this.getNode(index - 1);
  node.next = new LinkNode(val, node.next);
  this._size++;
};

/**
 * @param {number} index
 * @return {void}
 * void deleteAtIndex(int index) 如果下标有效，则删除链表中下标为 index 的节点。
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (index < 0 || index >= this._size) return;
  if (index === 0) {
    this._head = this._head.next;
    // 如果删除的这个节点同时是尾节点，要处理尾节点
    if (index === this._size - 1) {
      this._tail = this._head;
    }
    this._size--;
    return;
  }
  // 获取目标节点的上一个的节点
  const node = this.getNode(index - 1);
  node.next = node.next.next;
  if (index === this._size - 1) {
    this._tail = node;
  }
  this._size--;
};

// var myLinkedList = new MyLinkedList();
// myLinkedList.addAtHead(1);
// myLinkedList.addAtTail(3);
// myLinkedList.addAtIndex(1, 2); // 链表变为 1->2->3
// console.log(myLinkedList.get(1)); // 返回 2
// myLinkedList.deleteAtIndex(1); // 现在，链表变为 1->3
// console.log(myLinkedList);
// myLinkedList.get(1); // 返回 3
// console.log(myLinkedList.get(1)); // 返回 3
