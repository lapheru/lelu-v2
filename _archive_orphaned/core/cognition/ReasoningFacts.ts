/**
 * ==========================================================
 * LÉLU
 * ReasoningFacts
 * ==========================================================
 */

import type AIRequest from "../AIRequest";
import Brain from "../../brain/Brain";
import InferenceEngine from "../InferenceEngine";
import type { PerceptionResult } from "./PerceptionStage";

export interface Fact {
  id: string;
  statement: string;
  confidence: number;
}

export interface ReasoningFactsResult {
  facts: Fact[];
  discovered: Fact[];
}

export default class ReasoningFacts {

  constructor(
    private readonly brain: Brain,
    private readonly inference: InferenceEngine,
  ) {}

  public async collect(
    request: AIRequest,
    perception: PerceptionResult,
  ): Promise<ReasoningFactsResult> {

    this.clear();

    // User Prompt
    this.add({
      id: "prompt",
      statement: request.message,
      confidence: 1,
    });

    // Working Memory
    for (const item of perception.workingMemory ?? []) {
      this.add({
        id: `wm-${item.id}`,
        statement: String(item.value),
        confidence: Math.min(
          1,
          (item.priority ?? 100) / 100,
        ),
      });
    }

    // Context
    for (const context of perception.contexts ?? []) {
      this.add({
        id: `ctx-${context.id}`,
        statement: JSON.stringify(context.value),
        confidence: context.confidence ?? 0.8,
      });
    }

    // Brain Recall
    const memories = await this.brain.recall(request.message);

    const confidence =
      memories.length > 0 ? 0.9 : 0.1;

    for (const memory of memories) {
      this.add({
        id: `brain-${memory.id}`,
        statement: memory.response,
        confidence,
      });
    }

    // Generate inferred facts
    let discovered: Fact[] = [];

    if (typeof (this.inference as any).infer === "function") {
      discovered =
        (this.inference as any).infer() ?? [];
    }

    // Collect all facts
    let facts: Fact[] = discovered;

    if (typeof (this.inference as any).all === "function") {
      facts =
        (this.inference as any).all() ?? discovered;
    }

    return {
      facts,
      discovered,
    };

  }

  private add(
    fact: Fact,
  ): void {

    if (
      typeof (this.inference as any).remember ===
      "function"
    ) {
      (this.inference as any).remember(fact);
    }

  }

  public clear(): void {

    if (
      typeof (this.inference as any).clear ===
      "function"
    ) {
      (this.inference as any).clear();
    }

  }

}