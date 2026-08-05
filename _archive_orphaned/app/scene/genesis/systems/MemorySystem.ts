/**
 * ==========================================================
 * LÉLUVERSE
 * MEMORY SYSTEM
 * ==========================================================
 */

export default class MemorySystem {

  private memories =

    new Map<string, unknown>();

  set(

    key: string,

    value: unknown,

  ) {

    this.memories.set(

      key,

      value,

    );

  }

  get<T>(

    key: string,

  ): T | undefined {

    return this.memories.get(

      key,

    ) as T;

  }

  has(

    key: string,

  ) {

    return this.memories.has(

      key,

    );

  }

  clear() {

    this.memories.clear();

  }

}