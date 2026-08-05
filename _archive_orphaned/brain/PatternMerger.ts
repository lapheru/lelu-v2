/**
 * ==========================================================
 * LÉLU
 * PATTERN MERGER
 * ==========================================================
 */

import  PatternMemory
  from "./PatternMemory";

import type ResponsePattern
  from "./ResponsePattern";

export default class PatternMerger {

  constructor(

    private readonly memory:
      PatternMemory,

  ) {}

  public merge(): void {

    const merged =
      new Map<
        string,
        ResponsePattern
      >();

    for (

      const pattern of

      this.memory.getAll()

    ) {

      const key =

        pattern.intent +

        "|" +

        pattern.prompt
          .trim()
          .toLowerCase();

      const existing =
        merged.get(
          key,
        );

      if (

        existing ===
        undefined

      ) {

        merged.set(
          key,
          pattern,
        );

        continue;

      }

      existing.successfulUses +=

        pattern.successfulUses;

      existing.failedUses +=

        pattern.failedUses;

      existing.confidence =

        Math.max(

          existing.confidence,

          pattern.confidence,

        );

      existing.keywords =

        Array.from(

          new Set([

            ...existing.keywords,

            ...pattern.keywords,

          ]),

        );

      existing.updatedAt =
        Date.now();

    }

  }

}