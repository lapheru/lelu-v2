/**
 * ==========================================================
 * LÉLU
 * MEMORY EVENTS
 * ==========================================================
 */

import kernel from "../kernel/kernel";

export type MemoryEvent =

  | "memory.created"
  | "memory.updated"
  | "memory.deleted"
  | "memory.searched"
  | "memory.consolidated"
  | "memory.cleared";

export interface MemoryEventPayload {

  id?: string;

  space?: string;

  query?: string;

  timestamp: number;

  metadata?: Record<
    string,
    unknown
  >;

}

export default class MemoryEvents {

  async created(

    id: string,

    space: string,

    metadata: Record<
      string,
      unknown
    > = {},

  ): Promise<void> {

    await kernel.events.emit(

      "memory.created",

      {

        id,

        space,

        timestamp:
          Date.now(),

        metadata,

      },

    );

  }

  async updated(

    id: string,

    space: string,

    metadata: Record<
      string,
      unknown
    > = {},

  ): Promise<void> {

    await kernel.events.emit(

      "memory.updated",

      {

        id,

        space,

        timestamp:
          Date.now(),

        metadata,

      },

    );

  }

  async deleted(

    id: string,

  ): Promise<void> {

    await kernel.events.emit(

      "memory.deleted",

      {

        id,

        timestamp:
          Date.now(),

      },

    );

  }

  async searched(

    query: string,

  ): Promise<void> {

    await kernel.events.emit(

      "memory.searched",

      {

        query,

        timestamp:
          Date.now(),

      },

    );

  }

  async consolidated(

    metadata: Record<
      string,
      unknown
    > = {},

  ): Promise<void> {

    await kernel.events.emit(

      "memory.consolidated",

      {

        timestamp:
          Date.now(),

        metadata,

      },

    );

  }

  async cleared(): Promise<void> {

    await kernel.events.emit(

      "memory.cleared",

      {

        timestamp:
          Date.now(),

      },

    );

  }

}