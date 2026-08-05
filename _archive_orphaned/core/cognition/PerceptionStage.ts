/**
 * ==========================================================
 * LÉLU
 * PERCEPTION STAGE
 * ==========================================================
 */

import type AIRequest from "../AIRequest";

import AttentionEngine, {
  type AttentionItem,
} from "../AttentionEngine";

import WorkingMemory, {
  type WorkingMemoryItem,
} from "../WorkingMemory";

import ContextEngine, {
  type Context,
} from "../ContextEngine";

export interface PerceptionResult {

  attention:
    AttentionItem[];

  workingMemory:
    WorkingMemoryItem[];

  contexts:
    Context[];

  primary?:
    AttentionItem;

}

export default class PerceptionStage {

  constructor(

    private readonly attention:
      AttentionEngine,

    private readonly workingMemory:
      WorkingMemory,

    private readonly context:
      ContextEngine,

  ) {}

  /**
   * =====================================
   * Build perception snapshot
   * =====================================
   */
  public process(
    request: AIRequest,
  ): PerceptionResult {

    const now =
      Date.now();

    /**
     * Current focus.
     */
    this.attention.focus({

      id:
        "request",

      source:
        "user",

      value:
        request.message,

      priority:
        100,

      confidence:
        1,

      timestamp:
        now,

    });

    /**
     * Active working memory.
     */
    this.workingMemory.set({

      id:
        "current-request",

      value:
        request.message,

      priority:
        100,

      createdAt:
        now,

      updatedAt:
        now,

    });

    /**
     * Prevent memory overflow.
     */
    this.workingMemory.trim();

    /**
     * Entire conversation.
     */
    this.context.set({

      id:
        "conversation",

      name:
        "Conversation",

      value:
        request.messages,

      confidence:
        1,

      source:
        "chat",

      timestamp:
        now,

    });

    /**
     * Latest prompt.
     */
    this.context.set({

      id:
        "prompt",

      name:
        "Prompt",

      value:
        request.message,

      confidence:
        1,

      source:
        "user",

      timestamp:
        now,

    });

    return {

      attention:
        this.attention.all(),

      workingMemory:
        this.workingMemory.all(),

      contexts:
        this.context.active(),

      primary:
        this.attention.primary(),

    };

  }

  /**
   * =====================================
   * Reset
   * =====================================
   */
  public clear(): void {

    this.attention.clear();

    this.workingMemory.clear();

    this.context.clear();

  }

}