import { LinkedList, ListNode } from "./LinkedList";

namespace DoublyLinkedList {
  export class Node<T> implements ListNode<T> {
    data: T;
    next: Node<T> | null;
    prev: Node<T> | null;

    constructor(data: T) {
      this.data = data;
      this.next = null;
      this.prev = null;
    }
  }

  /**
   * # 雙向連結串列 Doubly Linked List
   *
   * 他與單向連結串列相似，但每個節點除了擁有指向下一個節點的指針（Next）外，還擁有指向前一個局點指針（Prev），這使得在雙向連結串列中可以雙向遍歷。
   *
   * ## Features
   *
   *   - 節點結構： 每個節點包含三部分，分別是存儲數據的欄位、指向下一個節點的指針（Next）、以及指向前一個節點的指針（Prev）。
   *   - 雙向遍歷： 可以方便地從頭節點到尾節點，也可以從尾節點到頭節點進行遍歷。
   *   - 容易進行反向操作： 在雙向連結串列中，進行反向插入、刪除等操作更加容易，因為每個節點都有指向前一個節點的指針。
   *
   * ## Advantages
   *
   *   - 雙向遍歷： 可以快速從頭到尾或從尾到頭遍歷，這在某些情況下可以優化查找和操作的效率。
   *   - 方便的反向操作： 插入和刪除節點時，可以更輕松地處理前一個節點，這有助於簡化一些操作。
   *
   * ## Disadvantages
   *
   *   - 相對複雜： 雙向連結串列相對於單向連結串列來說，實現起來較為複雜，需要更多的指針操作。
   *   - 占用更多內存： 由於每個節點都需要存儲指向前一個節點的指針，相對於單向連結串列，雙向連結串列占用更多的內存空間。
   */
  export class DoublyLinkedList<T> implements LinkedList<T> {
    head: Node<T> | null;

    constructor() {
      this.head = null;
    }

    append(data: T): void {
      const node = new Node(data);

      // 1. 若起始節點不存在，插入起始點
      if (!this.head) {
        this.head = node;

        return;
      }

      // 2. 若起始節點存在，遍歷至最後一個節點
      let current = this.head;

      while (current.next) {
        current = current.next;
      }

      // 2-1. 原最後一個節點與新節點須互相引用
      node.prev = current;
      current.next = node;
    }

    insertAt(index: number, data: T): void {
      const node = new Node(data);

      // 1. 若索引為 0，將原起始點引用至新節點的 next
      if (index === 0) {
        node.next = this.head;

        // 1-1. 若原起始節點存在，則將起始節點的 prev 標記為新節點
        if (this.head) this.head.prev = node;

        // 1-2. 將起始點引用對象改為新節點
        this.head = node;

        return;
      }

      // 2. 若索引不為 0，持續遍歷至節點不存在的節點或目標索引前一位
      let current = this.head;
      let count = 0;

      while (current && count < index - 1) {
        current = current.next;
        count++;
      }

      // 2-1. 目標節點不存在，離開
      if (!current) return;

      // 2-2. 將目標節點的 next 引用對象繼承給新節點，並將新節點的 prev 標記為目標節點
      node.next = current.next;
      node.prev = current;

      // 2-3. 若目標節點的下一個節點存在，更改該節點的引用對象為新節點
      if (current.next) current.next.prev = node;

      // 2-4. 修改目標節點的 next 引用對象為新節點
      current.next = node;
    }

    deleteAt(index: number): void {
      if (!this.head) return;

      // 1. 若索引為 0，將起始點的引用對象改為原起始點的 next
      if (index === 0) {
        this.head = this.head.next;

        // 1-1. 新起始點存在時，將起始點的 prev 設置為 null
        if (this.head) this.head.prev = null;

        return;
      }

      // 2. 若索引不為 0，持續遍歷至節點不存在的節點或目標索引
      let current = this.head;
      let count = 0;

      while (current && count < index) {
        current = current.next;
        count++;
      }

      // 2-1. 目標節點不存在，離開
      if (!current) return;

      // 2-2. 目標節點的 prev 存在時，將 prev 的 next 引用對象（原本這裡是引用目標節點）改為目標節點的 next
      if (current.prev) current.prev.next = current.next;

      // 2-3. 目標節點的 next 存在時，將 next 的 prev 引用對象（原本這裡是引用目標節點）改為目標節點的 prev
      if (current.next) current.next.prev = current.prev;
    }

    print(): void {
      let current = this.head;
      let count = 0;

      while (current) {
        console.log({ index: count, current });

        current = current.next;
        count++;
      }
    }
  }
}

export default () => {
  const myList = new DoublyLinkedList.DoublyLinkedList<number>();
  myList.append(1);
  myList.append(2);
  myList.append(3);

  console.log("Original Doubly Linked List:");
  console.log(myList);

  myList.insertAt(1, 5);
  console.log("\nList after inserting 5 at index 1:");
  console.log(myList);

  myList.deleteAt(2);
  console.log("\nList after deleting node at index 2:");
  console.log(myList);
};
