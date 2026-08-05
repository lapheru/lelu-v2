/**
 * ==========================================================
 * LÉLU
 * MEMORY SEARCH
 * ==========================================================
 */

import type {
  MemoryRecord,
  MemorySpace,
} from "./MemoryStore";

import type MemoryStore from "./MemoryStore";

export default class MemorySearch {

  constructor(

    private readonly store: MemoryStore,

  ) {}

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

    const memories =

      await this.store.recent(
        limit,
        space,
      );

    return memories;

  }

  async byTag(

    tag: string,

    space?: MemorySpace,

  ): Promise<MemoryRecord[]> {

    const memories =

      await this.store.all(
        space,
      );

    const searchTag =
      tag.toLowerCase();

    return memories.filter(

      memory =>

        memory.tags.some(

          currentTag =>

            currentTag
              .toLowerCase()
              === searchTag,

        ),

    );

  }

  async byImportance(

    minimum: number,

    space?: MemorySpace,

  ): Promise<MemoryRecord[]> {

    const memories =

      await this.store.all(
        space,
      );

    return memories.filter(

      memory =>

        memory.importance >=
        minimum,

    );

  }

  async byTitle(

    title: string,

    space?: MemorySpace,

  ): Promise<MemoryRecord[]> {

    const searchTitle =
      title.toLowerCase();

    const memories =

      await this.store.all(
        space,
      );

    return memories.filter(

      memory =>

        memory.title
          .toLowerCase()
          .includes(
            searchTitle,
          ),

    );

  }

}