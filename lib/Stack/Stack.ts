/**
 * # 堆疊 Stack
 *
 * 一種具有特定限制的資料結構，它遵循後進先出（Last In, First Out，LIFO）的原則，即最後被加入堆疊的元素會被最先移除。堆疊的主要操作包括壓入（Push）元素和彈出（Pop）元素。
 *
 * ## Features
 *
 * - LIFO原則： 最後進入堆疊的元素是第一個被移除的，形成了後進先出的特性。
 * - 基本操作： 主要的操作包括Push（將元素加入堆疊頂部）和Pop（從堆疊頂部移除元素）。
 * - 無法隨機訪問： 只能訪問堆疊頂部的元素，不能直接訪問中間或底部的元素。
 *
 * ## ADT
 *
 * - Create: 可建立一個空堆疊
 * - Push: 可在頂端 `新增` 資料，並得到一個新的堆疊
 * - Pop: 可 `刪除` 頂端資料，並得到一個新的堆疊
 * - Peek: 回傳堆疊頂端的資料
 *
 * ## Pros
 *
 * - 簡單有效： 堆疊是一種簡單而有效的資料結構，提供快速的Push和Pop操作。
 * - 空間效率： 堆疊在空間上的使用相對較小，因為只需存儲當前頂部的元素。
 * - 遞迴： 堆疊常用於處理遞迴算法，例如深度優先搜尋（DFS）。
 *
 * ## Cons
 *
 * - 限制性： 堆疊的應用受到限制，無法隨機訪問元素，且只能訪問頂部的元素。
 * - 不靈活： 不適用於所有場景，特別是當需要在中間插入或刪除元素時，堆疊可能不是最佳選擇。
 */
class Stack<T> {
  #items: T[];

  get peek(): T | undefined {
    return this.#items[this.#items.length - 1];
  }

  get size(): number {
    return this.#items.length;
  }

  constructor() {
    this.#items = [];
  }

  push(element: T): void {
    this.#items.push(element);
  }

  pop(): T | undefined {
    return this.#items.pop();
  }

  isEmpty(): boolean {
    return this.#items.length === 0;
  }

  clear(): void {
    this.#items = [];
  }
}

export default () => {
  const myStack = new Stack<number>();
  myStack.push(1);
  myStack.push(2);
  myStack.push(3);

  console.log("Original Stack:");
  console.log(myStack);

  const poppedElement = myStack.pop();
  console.log("\nPopped Element:", poppedElement);
  console.log("\nStack after Pop:");
  console.log(myStack);

  console.log("\nPeeked Element:", myStack.peek);
  console.log("\nIs Stack empty?", myStack.isEmpty());
  console.log("\nStack Size:", myStack.size);

  myStack.clear();
  console.log("\nStack after Clear:");
  console.log(myStack);
};
