/**
 * ==========================================================
 * LÉLU
 * ReasoningEvaluator
 * ==========================================================
 */

import ReasoningEngine, {
  type ReasoningResult,
} from "../ReasoningEngine";

import type {
  Hypothesis,
} from "./ReasoningHypotheses";

export default class ReasoningEvaluator {

  constructor(
    private readonly reasoning: ReasoningEngine,
  ) {}

  /**
   * ==========================================================
   * Evaluate hypotheses.
   * ==========================================================
   */
  public evaluate(
    hypotheses: Hypothesis[],
  ): ReasoningResult {

    return this.reasoning.evaluate(
      hypotheses,
    );

  }

  /**
   * ==========================================================
   * Latest reasoning.
   * ==========================================================
   */
  public latest():
    ReasoningResult | undefined {

    return this.reasoning.latest();

  }

  /**
   * ==========================================================
   * History.
   * ==========================================================
   */
  public history():
    ReasoningResult[] {

    return this.reasoning.all();

  }

  /**
   * ==========================================================
   * Clear.
   * ==========================================================
   */
  public clear():
    void {

    this.reasoning.clear();

  }

}