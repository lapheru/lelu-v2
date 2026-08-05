/**
 * ==========================================================
 * LÉLU
 * MEMORY INDEXER
 * ==========================================================
 */

import type {
  MemoryRecord,
} from "./MemoryStore";

export default class MemoryIndexer {

  private readonly tagIndex =
    new Map<
      string,
      Set<string>
    >();

  private readonly spaceIndex =
    new Map<
      string,
      Set<string>
    >();

  index(
    memory: MemoryRecord,
  ): void {

    for (
      const tag of memory.tags
    ) {

      const key =
        tag.toLowerCase();

      if (
        !this.tagIndex.has(
          key,
        )
      ) {

        this.tagIndex.set(
          key,
          new Set(),
        );

      }

      this.tagIndex
        .get(key)!
        .add(memory.id);

    }

    if (
      !this.spaceIndex.has(
        memory.space,
      )
    ) {

      this.spaceIndex.set(
        memory.space,
        new Set(),
      );

    }

    this.spaceIndex
      .get(memory.space)!
      .add(memory.id);

  }

  remove(
    memory: MemoryRecord,
  ): void {

    for (
      const tag of memory.tags
    ) {

      this.tagIndex
        .get(
          tag.toLowerCase(),
        )
        ?.delete(
          memory.id,
        );

    }

    this.spaceIndex
      .get(
        memory.space,
      )
      ?.delete(
        memory.id,
      );

  }

  rebuild(
    memories: MemoryRecord[],
  ): void {

    this.clear();

    for (
      const memory of memories
    ) {

      this.index(
        memory,
      );

    }

  }

  byTag(
    tag: string,
  ): string[] {

    return [

      ...(this.tagIndex.get(
        tag.toLowerCase(),
      ) ?? []),

    ];

  }

  bySpace(
    space: string,
  ): string[] {

    return [

      ...(this.spaceIndex.get(
        space,
      ) ?? []),

    ];

  }

  clear(): void {

    this.tagIndex.clear();

    this.spaceIndex.clear();

  }

}