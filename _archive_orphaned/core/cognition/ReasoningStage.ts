/**
 * ==========================================================
 * LÉLU
 * REASONING STAGE
 * ==========================================================
 */

import type AIRequest from "../AIRequest";

import Brain from "../../brain/Brain";

import InferenceEngine from "../InferenceEngine";

import ReasoningEngine from "../ReasoningEngine";

import type {
  PerceptionResult,
} from "./PerceptionStage";

import ReasoningFacts from "./ReasoningFacts";

import ReasoningHypotheses from "./ReasoningHypotheses";

import ReasoningEvaluator from "./ReasoningEvaluator";


export interface ReasoningStageResult {

  facts:
    any[];

  discovered:
    any[];

  hypotheses:
    any[];

  reasoning:
    any;

  confidence:
    number;

}


export default class ReasoningStage {

  private readonly factsBuilder:
    ReasoningFacts;

  private readonly hypothesisBuilder:
    ReasoningHypotheses;

  private readonly evaluator:
    ReasoningEvaluator;


  constructor(

    brain:
      Brain,

    inference:
      InferenceEngine,

    reasoning:
      ReasoningEngine,

  ) {

    this.factsBuilder =
      new ReasoningFacts(

        brain,

        inference,

      );


    this.hypothesisBuilder =
      new ReasoningHypotheses();


    this.evaluator =
      new ReasoningEvaluator(

        reasoning,

      );

  }


  /**
   * ==========================================================
   * Execute reasoning pipeline
   * ==========================================================
   */
  public async process(

    request:
      AIRequest,

    perception:
      PerceptionResult,

  ):
    Promise<ReasoningStageResult> {


    const facts =
      await this.factsBuilder.collect(

        request,

        perception,

      );


    const hypotheses =
      this.hypothesisBuilder.build(

        facts.facts,

      );


    const reasoning =
      this.evaluator.evaluate(

        hypotheses,

      );


    return {

      facts:
        facts.facts,


      discovered:
        facts.discovered,


      hypotheses,


      reasoning,


      confidence:
        reasoning.selected?.confidence ?? 0,

    };

  }


  /**
   * ==========================================================
   * Clear reasoning memory
   * ==========================================================
   */
  public clear():
    void {

    this.factsBuilder.clear();

    this.evaluator.clear();

  }


  /**
   * ==========================================================
   * Latest reasoning
   * ==========================================================
   */
  public latest() {

    return this.evaluator.latest();

  }


  /**
   * ==========================================================
   * Reasoning history
   * ==========================================================
   */
  public history() {

    return this.evaluator.history();

  }

}