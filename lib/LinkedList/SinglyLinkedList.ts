import { LinkedList, ListNode } from "./LinkedList";

namespace SinglyLinkedList {
  export class Node<T> implements ListNode<T> {
    data: T;
    next: Node<T> | null;

    constructor(data: T) {
      this.data = data;
      this.next = null;
    }
  }

  /**
   * # 單向連結串列 Singly Linked List
   *
   * 元素以節點（Node）的形式存在，每個節點包含數據和一個指向下一個節點的指針（Next）。這樣的結構使得在插入和刪除元素時能夠更有效率，但查找特定元素可能需要遍歷整個串列。
   *
   * ## Features
   *
   *   - 節點結構： 每個節點包含兩部分，分別是存儲數據的欄位和指向下一個節點的指針欄位。
   *   - 動態大小： 單向連結串列的大小可以動態變化，因為你可以輕鬆地插入或刪除節點。
   *   - 內存利用效率： 相對於陣列，單向連結串列可以更有效地利用內存，因為它不需要連續的內存空間。
   *
   * ## Advantages
   *
   *   - 動態插入和刪除： 在串列中插入或刪除節點的操作是高效的，只需調整指針即可，不需要移動大量數據。
   *   - 節省內存： 串列可以動態調整大小，不需要預先分配固定大小的內存，節省內存空間。
   *
   * ## Disadvantage
   *
   *   - 存取效率較差： 訪問特定節點時，需要從頭節點開始遍歷，因此存取效率相對較差，時間複雜度為 O(n)。
   *   - 不支持隨機訪問： 不能直接通過索引訪問元素，必須從頭節點開始遍歷直到達到目標節點。
   */
  export class SinglyLinkedList<T> implements LinkedList<T> {
    head: Node<T> | null;

    constructor() {
      this.head = null;
    }

    append(data: T): void {
      const node = new Node(data);

      // 1. 起始點不存在，插入起始點
      if (!this.head) {
        this.head = node;

        return;
      }

      // 2. 起始點存在，持續遍歷至最後一個節點
      let current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    insertAt(index: number, data: T): void {
      const node = new Node(data);

      // 1. 若索引為 0，將 head 替換為新節點，並將舊有的 head 插入新節點的下一個節點
      if (index === 0) {
        node.next = this.head;
        this.head = node;

        return;
      }

      // 2. 宣告一個變數 count，隨迴圈做遞增，使其成為遍歷節點動作的其中一個停損條件
      let current = this.head;
      let count = 0;

      while (current && count < index - 1) {
        // 節點存在，且 count 不大於索引值
        current = current.next;
        count++;
      }

      if (current) {
        // 遍歷結束，有可能會有節點不存在的狀況（索引大於等於串列長度）
        // 因此要另外做條件判斷，避免出錯
        node.next = current.next;
        current.next = node;
      }
    }

    deleteAt(index: number): void {
      // 1. 起始點不存在，離開
      if (!this.head) return;

      // 2. 索引為 0，將 head 替換成 head 的下一個節點
      if (index === 0) {
        this.head = this.head.next;

        return;
      }

      // 3. 持續遍歷至目標索引或至節點不存在時
      let current: Node<T> | null = this.head;
      let count = 0;

      while (current && count < index - 1) {
        current = current.next;
        count++;
      }

      if (current && current.next) {
        current.next = current.next.next;
      }
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
  const myList = new SinglyLinkedList.SinglyLinkedList<number>();

  myList.append(1);
  myList.append(2);
  myList.append(3);

  console.log("Original List:");
  console.log(myList);
  // myList.print();

  myList.insertAt(1, 5);
  console.log("\nList after inserting 5 at index 1:");
  console.log(myList);
  // myList.print();

  myList.deleteAt(2);
  console.log("\nList after deleting node at index 2:");
  console.log(myList);
  // myList.print();
};
