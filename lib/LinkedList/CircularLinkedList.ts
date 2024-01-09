import { LinkedList, ListNode } from "./LinkedList";

namespace CircularLinkedList {
  export class Node<T> implements ListNode<T> {
    data: T;
    next: Node<T> | null;

    constructor(data: T) {
      this.data = data;
      this.next = null;
    }
  }

  /**
   * # 環狀連結串列 Circular Linked List
   *
   * 串列的最後一個節點的指針指向第一個節點，形成一個循環。這種特殊結構使得環狀連結串列在某些情況下更為方便。
   *
   * ## Features
   *
   *   - 循環結構： 最後一個節點的指針指向第一個節點，形成一個循環結構。
   *   - 沒有終止節點： 由於循環結構，沒有明確的終止節點，需要特別處理循環結構的終止條件。
   *
   * ## Advantages
   *
   *   - 遍歷方便： 由於最後一個節點指向第一個節點，遍歷整個串列變得更為方便，可以使用單一指針進行循環遍歷。
   *   - 應用於某些問題： 在某些問題中，環狀連結串列的特殊結構更容易應對，例如實現緩衝區、紀錄輪換等。
   *
   * ## Disadvantages
   *
   *   - 特殊結構的處理： 由於循環結構，需要特別處理插入、刪除等操作，以避免形成死循環。
   *   - 難以定位終止點： 由於沒有明確的終止節點，可能需要額外的標誌或條件來確定遍歷的終止。
   */
  export class CircularLinkedList<T> implements LinkedList<T> {
    head: Node<T> | null;

    constructor() {
      this.head = null;
    }

    append(data: T): void {
      const node = new Node(data);

      // 1. 若起始點不存在，將新節點插入起始點，並將新節點的 next 指向起始點
      if (!this.head) {
        this.head = node;
        node.next = this.head;

        return;
      }

      // 2. 若起始點存在，持續遍歷至最後一個節點
      let current = this.head;

      while (current && current.next !== this.head) {
        current = current.next;
      }

      // 2-1. 將新節點插入原最後一個節點的 next，並將新節點的 next 指向起始點
      current.next = node;
      node.next = this.head;
    }

    insertAt(index: number, data: T): void {
      const node = new Node(data);

      // 1. 若索引為 0，將新節點的 next 引用起始點
      if (index === 0) {
        node.next = this.head;

        // 1-1. 若起始點存在，遍歷至最後一個節點
        if (this.head) {
          let last = this.head;

          while (last.next !== this.head) {
            last = last.next;
          }

          // 1-2. 將最後一個節點的 next 引用新節點
          last.next = node;
        }

        // 1-3. 最後將起始點的引用對象改為新節點
        this.head = node;

        return;
      }

      // 2. 若索引不為 0，持續遍歷至節點不存在或目標索引前一位
      let current = this.head;
      let count = 0;

      while (current && count < index - 1) {
        current = current.next;
        count++;
      }

      if (!current) return;

      // 2-1. 將新節點的 next 引用對象改為目標節點的 next，並將目標節點的 next 引用對象改為新節點
      node.next = current.next;
      current.next = node;
    }

    deleteAt(index: number): void {
      if (!this.head) return;

      // 1. 若索引為 0，遍歷至最後一個節點
      if (index === 0) {
        let last = this.head;

        while (last.next !== this.head) {
          last = last.next;
        }

        // 1-1. 將 head 往後推移一個索引，並將最後一個節點重新引用新的 head
        this.head = this.head.next;
        last.next = this.head;

        return;
      }

      // 2. 若索引不為 0，持續遍歷至節點不存在或目標索引前一位
      let current = this.head;
      let count = 0;

      while (current && count < index - 1) {
        current = current.next;
        count++;
      }

      // 2-1. 若目標節點（目表索引前一位）與目標節點的 next 指針存在，將目標節點的 next 指針指向下下一位
      if (current && current.next) {
        current.next = current.next.next;
      }
    }

    print(): void {
      if (!this.head) return;

      let current = this.head;
      let count = 0;

      do {
        console.log({ index: count, current });

        current = current.next;
        count++;
      } while (current !== this.head);
    }
  }
}

export default () => {
  const myList = new CircularLinkedList.CircularLinkedList<number>();
  myList.append(1);
  myList.append(2);
  myList.append(3);

  console.log("Original Circular Linked List:");
  console.log(myList);

  myList.insertAt(1, 5);
  console.log("\nList after inserting 5 at index 1:");
  console.log(myList);

  myList.deleteAt(2);
  console.log("\nList after deleting node at index 2:");
  console.log(myList);
};
