/**
 * ==========================================================
 * LÉLU
 * WORKING MEMORY
 * ==========================================================
 */

export interface WorkingMemoryItem {

  id:
    string;

  value:
    unknown;

  priority:
    number;

  createdAt:
    number;

  updatedAt:
    number;

}

export default class WorkingMemory {

  private readonly memory =
    new Map<
      string,
      WorkingMemoryItem
    >();

  /**
   * Store item.
   */
  public set(
    item: WorkingMemoryItem,
  ): void {

    this.memory.set(
      item.id,
      item,
    );

  }

  /**
   * Retrieve item.
   */
  public get(
    id: string,
  ): WorkingMemoryItem | undefined {

    return this.memory.get(
      id,
    );

  }

  /**
   * Remove item.
   */
  public remove(
    id: string,
  ): void {

    this.memory.delete(
      id,
    );

  }

  /**
   * Highest priority first.
   */
  public all():
    WorkingMemoryItem[] {

    return Array

      .from(
        this.memory.values(),
      )

      .sort(

        (
          left,
          right,
        ) =>

          right.priority -
          left.priority,

      );

  }

  /**
   * Capacity control.
   */
  public trim(
    capacity = 10,
  ): void {

    const items =
      this.all();

    while (

      items.length >
      capacity

    ) {

      const item =
        items.pop();

      if (

        item

      ) {

        this.memory.delete(
          item.id,
        );

      }

    }

  }

  /**
   * Number of items.
   */
  public size():
    number {

    return this.memory.size;

  }

  /**
   * Clear.
   */
  public clear():
    void {

    this.memory.clear();

  }

}