/**
 * ==========================================================
 * LÉLU
 * MEMORY MANAGER
 * ==========================================================
 */

import type {
  MemoryRecord,
  MemorySpace,
} from "./MemoryStore";

import type MemoryStore from "./MemoryStore";

import type {
  ConversationTurn,
} from "./ConversationTurn";

import WorkingMemory from "./WorkingMemory";
import LongTermMemory from "./LongTermMemory";
import MemoryBackup from "./MemoryBackup";
import MemoryRecovery from "./MemoryRecovery";
import MemorySync from "./MemorySync";
import MemorySearch from "./MemorySearch";
import MemoryIndexer from "./MemoryIndexer";
import MemoryConsolidator from "./MemoryConsolidator";
import MemoryStats from "./MemoryStats";

export default class MemoryManager {

  readonly working: WorkingMemory;

  readonly longTerm: LongTermMemory;

  readonly backup: MemoryBackup;

  readonly recovery: MemoryRecovery;

  readonly sync: MemorySync;

  readonly search: MemorySearch;

  readonly indexer: MemoryIndexer;

  readonly consolidator: MemoryConsolidator;

  readonly stats: MemoryStats;

  constructor(

    store: MemoryStore,

  ) {

    this.working =
      new WorkingMemory();

    this.longTerm =
      new LongTermMemory(
        store,
      );

    this.backup =
      new MemoryBackup(
        store,
      );

    this.recovery =
      new MemoryRecovery(
        store,
        this.backup,
      );

    this.sync =
      new MemorySync(
        store,
        this.backup,
      );

    this.search =
      new MemorySearch(
        store,
      );

    this.indexer =
      new MemoryIndexer();

    this.consolidator =
      new MemoryConsolidator();

    this.stats =
      new MemoryStats();

  }

  remember(
    turn: ConversationTurn,
  ): void {

    this.working.add(
      turn,
    );

  }

  async commit(
    memory: MemoryRecord,
  ): Promise<void> {

    await this.longTerm.remember(
      memory,
    );

    this.indexer.index(
      memory,
    );

  }

  async recall(
    query: string,
    space?: MemorySpace,
  ): Promise<MemoryRecord[]> {

    return this.search.search(
      query,
      space,
    );

  }

  async snapshot(): Promise<string> {

    return this.backup.export();

  }

  async restore(): Promise<boolean> {

    return this.recovery.recover();

  }

  async synchronize(): Promise<boolean> {

    return this.sync.sync();

  }

  async statistics() {

    const memories =

      await this.longTerm.all();

    return this.stats.calculate(
      memories,
    );

  }

}