/**
 * ==========================================================
 * LÉLU
 * LONG TERM MEMORY
 * ==========================================================
 */

import type MemoryStore from "./MemoryStore";

import type {
  MemoryRecord,
  MemorySpace,
} from "./MemoryStore";

export default class LongTermMemory {

  constructor(

    private readonly store: MemoryStore,

  ) {}

  async remember(

    memory: MemoryRecord,

  ): Promise<void> {

    await this.store.save(

      memory,

    );

  }

  async forget(

    id: string,

  ): Promise<void> {

    await this.store.delete(

      id,

    );

  }

  async recall(

    id: string,

  ): Promise<MemoryRecord | null> {

    return this.store.get(

      id,

    );

  }

  async search(

    query: string,

    space?: MemorySpace,

  ): Promise<MemoryRecord[]> {

    return this.store.search(

      query,

      space,

    );

  }

  async recent(

    limit = 20,

    space?: MemorySpace,

  ): Promise<MemoryRecord[]> {

    return this.store.recent(

      limit,

      space,

    );

  }

  async all(

    space?: MemorySpace,

  ): Promise<MemoryRecord[]> {

    return this.store.all(

      space,

    );

  }

  async clear(): Promise<void> {

    await this.store.clear();

  }

}