namespace LinkedList {
  class Node<T> {
    data: T;
    next: Node<T> | null;

    constructor(data: T) {
      this.data = data;
      this.next = null;
    }
  }

  class SinglyLinkedList<T> {
    head: Node<T> | null;

    constructor() {
      this.head = null;
    }

    /**
     * 在串列最後方插入一個節點
     */
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

    /**
     * 在特定索引的位置插入節點
     */
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

    /**
     * 依索引刪除特定節點
     */
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
        current.next = current.next.next
      }
    }
  }
}
