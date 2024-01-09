export interface ListNode<T> {
  /**
   * 節點保存的資料
   */
  data: T;
  /**
   * 下一個節點的指針
   */
  next?: ListNode<T> | null;
  /**
   * 上一個節點的指針
   */
  prev?: ListNode<T> | null;
}

export interface LinkedList<T> {
  /**
   * 起始節點
   */
  head: ListNode<T> | null;
  /**
   * 在串列最後方插入一個節點
   */
  append(data: T): void;
  /**
   * 在特定索引的位置插入節點
   */
  insertAt(index: number, data: T): void;
  /**
   * 依索引刪除特定節點
   */
  deleteAt(index: number): void;
  /**
   * 遍歷所有節點及印出節點
   */
  print(): void;
}
