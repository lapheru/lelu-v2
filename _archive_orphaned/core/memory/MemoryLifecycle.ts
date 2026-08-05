/**
 * ==========================================================
 * LÉLU
 * MEMORY LIFECYCLE
 * ==========================================================
 */

import type {
  MemoryRecord,
} from "./MemoryStore";

export default class MemoryLifecycle {

  shouldPromote(
    memory: MemoryRecord,
  ): boolean {

    return memory.importance >= 7;

  }

  shouldArchive(
    memory: MemoryRecord,
  ): boolean {

    const age =

      Date.now() -
      memory.updated;

    const thirtyDays =

      1000 *
      60 *
      60 *
      24 *
      30;

    return (

      age > thirtyDays &&

      memory.importance < 5

    );

  }

  shouldDelete(
    memory: MemoryRecord,
  ): boolean {

    const age =

      Date.now() -
      memory.updated;

    const ninetyDays =

      1000 *
      60 *
      60 *
      24 *
      90;

    return (

      age > ninetyDays &&

      memory.importance <= 1

    );

  }

  prioritize(
    memories: MemoryRecord[],
  ): MemoryRecord[] {

    return [

      ...memories,

    ].sort(

      (a, b) =>

        b.importance -
        a.importance ||

        b.updated -
        a.updated,

    );

  }

}