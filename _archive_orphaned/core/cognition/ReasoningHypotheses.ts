/**
 * ==========================================================
 * LÉLU
 * ReasoningHypotheses
 * ==========================================================
 */

import type { Fact } from "./ReasoningFacts";

export interface Hypothesis {
  id: string;
  statement: string;
  confidence: number;
  evidence: string[];
}

export default class ReasoningHypotheses {

  /**
   * ==========================================================
   * Convert facts into ranked hypotheses.
   * ==========================================================
   */
  public build(
    facts: Fact[],
  ): Hypothesis[] {

    const hypotheses = facts.map((fact) => ({

      id: fact.id,

      statement: fact.statement,

      confidence: fact.confidence,

      evidence: [
        fact.statement,
      ],

    }));

    hypotheses.sort(
      (a, b) =>
        b.confidence - a.confidence,
    );

    return hypotheses;

  }

  /**
   * ==========================================================
   * Highest confidence hypothesis.
   * ==========================================================
   */
  public best(
    hypotheses: Hypothesis[],
  ): Hypothesis | undefined {

    return hypotheses[0];

  }

  /**
   * ==========================================================
   * Filter hypotheses.
   * ==========================================================
   */
  public above(
    hypotheses: Hypothesis[],
    minimum = 0.5,
  ): Hypothesis[] {

    return hypotheses.filter(
      (h) => h.confidence >= minimum,
    );

  }

  /**
   * ==========================================================
   * Search hypotheses.
   * ==========================================================
   */
  public search(
    hypotheses: Hypothesis[],
    query: string,
  ): Hypothesis[] {

    const q = query.toLowerCase();

    return hypotheses.filter(
      (h) =>
        h.statement
          .toLowerCase()
          .includes(q),
    );

  }

  /**
   * ==========================================================
   * Merge duplicate hypotheses.
   * ==========================================================
   */
  public merge(
    hypotheses: Hypothesis[],
  ): Hypothesis[] {

    const map = new Map<string, Hypothesis>();

    for (const hypothesis of hypotheses) {

      const key =
        hypothesis.statement
          .trim()
          .toLowerCase();

      const existing =
        map.get(key);

      if (!existing) {

        map.set(
          key,
          {
            ...hypothesis,
          },
        );

        continue;

      }

      existing.confidence = Math.max(
        existing.confidence,
        hypothesis.confidence,
      );

      existing.evidence.push(
        ...hypothesis.evidence,
      );

    }

    return Array.from(
      map.values(),
    );

  }

}