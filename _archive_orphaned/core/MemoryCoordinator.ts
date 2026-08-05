/**
 * ==========================================================
 * LÉLU
 * MEMORY COORDINATOR
 * ==========================================================
 */

import MemoryEngine
  from "./memory/MemoryEngine";

import ConversationAnalyzer
  from "./memory/ConversationAnalyzer";

import type {
  MemoryRecord,
  MemorySpace,
} from "./memory/MemoryStore";

export default class MemoryCoordinator {

  private readonly engine =
    new MemoryEngine();

  private readonly analyzer =
    new ConversationAnalyzer();

  async initialize(): Promise<void> {

    await this.engine.initialize();

  }

  async search(
    query: string,
    space?: MemorySpace,
  ): Promise<MemoryRecord[]> {

    return await this.engine.search(
      query,
      space,
    );

  }

  async recent(
    limit = 10,
    space?: MemorySpace,
  ): Promise<MemoryRecord[]> {

    return await this.engine.recent(
      limit,
      space,
    );

  }

  async remember(
    user: string,
    reply: string,
  ): Promise<void> {

    await this.analyzer.analyze(
      user,
      reply,
    );

  }

  async clear(): Promise<void> {

    await this.engine.clear();

  }

}