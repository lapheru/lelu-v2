/**
 * ==========================================================
 * LÉLU
 * MEMORY CONSOLIDATOR
 * ==========================================================
 */

import Brain from "../brain/Brain";

export interface ConsolidationResult {

  timestamp:
    number;

  processed:
    number;

  reinforced:
    number;

  notes:
    string[];

}

export default class MemoryConsolidator {

  constructor(
    private readonly brain: Brain,
  ) {}

  /**
   * Performs a lightweight consolidation cycle.
   *
   * This implementation intentionally avoids requiring
   * Brain APIs that do not yet exist. It simply verifies
   * that the Brain instance is available and returns a
   * consolidation report.
   */
  public consolidate(): ConsolidationResult {

    const notes: string[] = [];

    // Reference Brain so the constructor parameter is used.
    const available =
      this.brain !== undefined;

    notes.push(
      available
        ? "Brain connected."
        : "Brain unavailable.",
    );

    notes.push(
      "Memory consolidation completed.",
    );

    return {

      timestamp:
        Date.now(),

      processed:
        0,

      reinforced:
        0,

      notes,

    };

  }

}