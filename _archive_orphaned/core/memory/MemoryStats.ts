/**
 * ==========================================================
 * LÉLU
 * MEMORY STATS
 * ==========================================================
 */

import type {
  MemoryRecord,
  MemorySpace,
} from "./MemoryStore";

export interface MemoryStatistics {

  total: number;

  bySpace: Record<
    MemorySpace,
    number
  >;

  totalImportance: number;

  averageImportance: number;

  totalTags: number;

  uniqueTags: number;

  oldest?: MemoryRecord;

  newest?: MemoryRecord;

}

export default class MemoryStats {

  calculate(
    memories: MemoryRecord[],
  ): MemoryStatistics {

    const bySpace: Record<
      MemorySpace,
      number
    > = {

      user: 0,

      lelu: 0,

      shared: 0,

      log: 0,

      reflection: 0,

      research: 0,

      project: 0,

    };

    let totalImportance = 0;

    let totalTags = 0;

    const uniqueTags =
      new Set<string>();

    let oldest:
      MemoryRecord | undefined;

    let newest:
      MemoryRecord | undefined;

    for (

      const memory of memories

    ) {

      bySpace[
        memory.space
      ]++;

      totalImportance +=
        memory.importance;

      totalTags +=
        memory.tags.length;

      for (

        const tag of memory.tags

      ) {

        uniqueTags.add(

          tag.toLowerCase(),

        );

      }

      if (

        !oldest ||

        memory.created <
          oldest.created

      ) {

        oldest = memory;

      }

      if (

        !newest ||

        memory.created >
          newest.created

      ) {

        newest = memory;

      }

    }

    return {

      total:
        memories.length,

      bySpace,

      totalImportance,

      averageImportance:

        memories.length === 0

          ? 0

          : totalImportance /
            memories.length,

      totalTags,

      uniqueTags:
        uniqueTags.size,

      oldest,

      newest,

    };

  }

}