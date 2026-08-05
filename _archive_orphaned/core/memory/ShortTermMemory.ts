/**
 * ==========================================================
 * LÉLU
 * SHORT TERM MEMORY
 * ==========================================================
 */

import type {
  MemoryRecord,
} from "./MemoryStore";

export default class ShortTermMemory {

  private readonly memories: MemoryRecord[] = [];

  constructor(

    private readonly capacity = 20,

  ) {}

  add(
    memory: MemoryRecord,
  ): void {

    this.memories.push(
      memory,
    );

    while (

      this.memories.length >
      this.capacity

    ) {

      this.memories.shift();

    }

  }

  latest():
    MemoryRecord | undefined {

    return this.memories.at(
      -1,
    );

  }

  previous():
    MemoryRecord | undefined {

    return this.memories.at(
      -2,
    );

  }

  recent(
    limit = 10,
  ): MemoryRecord[] {

    return this.memories.slice(
      -limit,
    );

  }

  get(
    id: string,
  ): MemoryRecord | undefined {

    return this.memories.find(

      memory =>

        memory.id === id,

    );

  }

  has(
    id: string,
  ): boolean {

    return this.memories.some(

      memory =>

        memory.id === id,

    );

  }

  remove(
    id: string,
  ): void {

    const index =

      this.memories.findIndex(

        memory =>

          memory.id === id,

      );

    if (

      index >= 0

    ) {

      this.memories.splice(

        index,

        1,

      );

    }

  }

  clear(): void {

    this.memories.length = 0;

  }

  count(): number {

    return this.memories.length;

  }

  all(): MemoryRecord[] {

    return [

      ...this.memories,

    ];

  }

}