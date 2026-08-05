/**
 * ==========================================================
 * LÉLU
 * MEMORY ENGINE
 * ==========================================================
 */

import IndexedDBStore from "./IndexedDBStore";

import type {

  MemoryRecord,
  MemorySpace,

} from "./MemoryStore";

export default class MemoryEngine {

  private readonly store =
    new IndexedDBStore();

  async initialize(): Promise<void> {

    await this.store.initialize();

  }

  private async remember(

    space: MemorySpace,

    title: string,

    content: string,

    tags: string[] = [],

    importance = 5,

  ): Promise<void> {

    const memory: MemoryRecord = {

      id:
        crypto.randomUUID(),

      space,

      title,

      content,

      tags,

      importance,

      created:
        Date.now(),

      updated:
        Date.now(),

    };

    await this.store.save(
      memory,
    );

  }

  async rememberUser(

    title: string,

    content: string,

    tags: string[] = [],

    importance = 8,

  ): Promise<void> {

    return this.remember(

      "user",

      title,

      content,

      tags,

      importance,

    );

  }

  async rememberLelu(

    title: string,

    content: string,

    tags: string[] = [],

    importance = 6,

  ): Promise<void> {

    return this.remember(

      "lelu",

      title,

      content,

      tags,

      importance,

    );

  }

  async rememberShared(

    title: string,

    content: string,

    tags: string[] = [],

    importance = 9,

  ): Promise<void> {

    return this.remember(

      "shared",

      title,

      content,

      tags,

      importance,

    );

  }

  async rememberLog(

    content: string,

  ): Promise<void> {

    return this.remember(

      "log",

      "Activity",

      content,

      ["log"],

      3,

    );

  }

  async rememberReflection(

    content: string,

  ): Promise<void> {

    return this.remember(

      "reflection",

      "Reflection",

      content,

      ["reflection"],

      7,

    );

  }

  async search(

    query: string,

    space?: MemorySpace,

  ): Promise<MemoryRecord[]> {

    return await this.store.search(

      query,

      space,

    );

  }

  async recent(

    limit = 20,

    space?: MemorySpace,

  ): Promise<MemoryRecord[]> {

    return await this.store.recent(

      limit,

      space,

    );

  }

  async all(

    space?: MemorySpace,

  ): Promise<MemoryRecord[]> {

    return await this.store.all(

      space,

    );

  }

  async forget(

    id: string,

  ): Promise<void> {

    await this.store.delete(

      id,

    );

  }

  async clear(): Promise<void> {

    await this.store.clear();

  }

}