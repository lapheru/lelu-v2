/**
 * ==========================================================
 * LÉLU
 * MEMORY BACKUP
 * ==========================================================
 */

import type MemoryStore from "./MemoryStore";
import type {
  MemoryRecord,
} from "./MemoryStore";

export interface MemorySnapshot {

  version: number;

  created: number;

  memories: MemoryRecord[];

}

export default class MemoryBackup {

  constructor(

    private readonly store: MemoryStore,

  ) {}

  async createSnapshot():
    Promise<MemorySnapshot> {

    const memories =

      await this.store.all();

    return {

      version: 1,

      created:
        Date.now(),

      memories,

    };

  }

  async export():
    Promise<string> {

    const snapshot =

      await this.createSnapshot();

    return JSON.stringify(

      snapshot,

      null,

      2,

    );

  }

  async restore(

    snapshot: MemorySnapshot,

  ): Promise<void> {

    await this.store.clear();

    for (

      const memory of snapshot.memories

    ) {

      await this.store.save(

        memory,

      );

    }

  }

  async clone():

    Promise<MemorySnapshot> {

    return this.createSnapshot();

  }

}