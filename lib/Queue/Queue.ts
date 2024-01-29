/**
 * # 佇列 Queue
 *
 * ## Features
 *
 * - 有兩個端點，分為 `前端` 與 `後端`
 * - 後端只可 `新增 Enqueue` 資料
 * - 前端只可 `刪除 Dequeue` 與 `讀取` 資料
 * - 資料的存取必須符合 `先進先出` （First In First Out, FIFO）
 *
 * ## ADT
 *
 * - Create: 可建立一個空的佇列
 * - Add: 可在 `後端` 新增資料，並得到一個新的佇列
 * - Delete: 可刪除 `前端` 資料，並得到一個新的佇列
 * - Front: 回傳 `前端` 的資料
 * 
 * ## Pros
 * 
 * - 有效處理順序數據: 佇列對於需要按照先進先出順序處理的數據非常有效
 * - 廣泛應用: 排隊系統、資源管理、廣度優先搜尋（BFS）等
 * 
 * ## Cons
 * 
 * - 無法隨機訪問: 類似於堆疊，佇列也無法直接訪問中間或尾部元素，只能訪問頭部的元素
 * - 不靈活: 不適用於所有場景，特別是當需要在中間插入或刪除元素時，佇列可能不是最佳選擇
 */
class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  enqueue(element: T): void {
    this.items.push(element);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  clear(): void {
    this.items = [];
  }

  get front(): T | undefined {
    return this.items[0];
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  get size(): number {
    return this.items.length;
  }
}

export default () => {
  const myQueue = new Queue<number>();
  myQueue.enqueue(1);
  myQueue.enqueue(2);
  myQueue.enqueue(3);

  console.log("Original Queue:");
  console.log(myQueue);

  const dequeuedElement = myQueue.dequeue();
  console.log("\nDequeued Element:", dequeuedElement);
  console.log("Queue after Dequeue:");
  console.log(myQueue);

  console.log("\nFront Element:", myQueue.front);
  console.log("\nIs Queue empty?", myQueue.isEmpty);
  console.log("\nQueue size:", myQueue.size);

  myQueue.clear();
  console.log("\nQueue after Clear:");
  console.log(myQueue);
};
