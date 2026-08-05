/**
 * ==========================================================
 * LÉLUVERSE
 * MEMORY INDEX
 * ==========================================================
 */

import type { GenesisMemory } from "./MemoryEngine";

export default class MemoryIndex {

  private readonly index =
    new Map<number, GenesisMemory>();

  add(
    memory: GenesisMemory,
  ): void {

    this.index.set(

      memory.timestamp,

      memory,

    );

  }

  get(
    timestamp: number,
  ) {

    return this.index.get(

      timestamp,

    );

  }

  clear(): void {

    this.index.clear();

  }

}