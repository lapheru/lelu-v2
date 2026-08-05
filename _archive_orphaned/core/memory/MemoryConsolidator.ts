/**
 * ==========================================================
 * LÉLU
 * MEMORY CONSOLIDATOR
 * ==========================================================
 */

import type {
  MemoryRecord,
} from "./MemoryStore";

export default class MemoryConsolidator {

  consolidate(
    memories: MemoryRecord[],
  ): MemoryRecord[] {

    const unique =
      new Map<
        string,
        MemoryRecord
      >();

    for (
      const memory of memories
    ) {

      const key =

        `${memory.space}:${memory.title.toLowerCase()}`;

      const existing =
        unique.get(key);

      if (
        !existing
      ) {

        unique.set(
          key,
          memory,
        );

        continue;

      }

      existing.content =

`${existing.content}

${memory.content}`;

      existing.tags = [

        ...new Set([

          ...existing.tags,

          ...memory.tags,

        ]),

      ];

      existing.importance =

        Math.max(

          existing.importance,

          memory.importance,

        );

      existing.updated =

        Math.max(

          existing.updated,

          memory.updated,

        );

    }

    return [

      ...unique.values(),

    ];

  }

  removeDuplicates(
    memories: MemoryRecord[],
  ): MemoryRecord[] {

    const seen =
      new Set<string>();

    return memories.filter(
      memory => {

        const key =

`${memory.space}:${memory.title}:${memory.content}`;

        if (
          seen.has(key)
        ) {

          return false;

        }

        seen.add(key);

        return true;

      },
    );

  }

}