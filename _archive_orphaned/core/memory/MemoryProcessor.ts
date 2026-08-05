/**
 * ==========================================================
 * LÉLU
 * MEMORY PROCESSOR
 * ==========================================================
 */

import type {
  ConversationTurn,
} from "./ConversationTurn";

import MemoryQueue from "./MemoryQueue";
import WorkingMemory from "./WorkingMemory";
import LongTermMemory from "./LongTermMemory";
import MemoryCurator from "./MemoryCurator";

export default class MemoryProcessor {

  constructor(

    private readonly queue: MemoryQueue,

    private readonly working: WorkingMemory,

    private readonly longTerm: LongTermMemory,

    private readonly curator: MemoryCurator,

  ) {}

  async process(): Promise<void> {

    while (

      !this.queue.isEmpty()

    ) {

      await this.processOne();

    }

  }

  async processOne(): Promise<void> {

    const turn:

      ConversationTurn | undefined =

      this.queue.dequeue();

    if (

      !turn

    ) {

      return;

    }

    this.working.add(
      turn,
    );

    const decisions =

      await this.curator.curate(

        turn.user,

        turn.assistant,

      );

    const now = Date.now();

    for (

      const decision of decisions

    ) {

      if (

        !decision.remember

      ) {

        continue;

      }

      await this.longTerm.remember({

        id: crypto.randomUUID(),

        space: decision.space,

        title: decision.title,

        content: decision.content,

        tags: decision.tags,

        importance: decision.importance,

        created: now,

        updated: now,

      });

    }

  }

}