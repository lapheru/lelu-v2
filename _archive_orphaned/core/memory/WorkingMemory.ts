/**
 * ==========================================================
 * LÉLU
 * WORKING MEMORY
 * ==========================================================
 */

import type {
  ConversationTurn,
} from "./ConversationTurn";

export default class WorkingMemory {

  private readonly memories: ConversationTurn[] = [];

  constructor(

    private readonly capacity = 50,

  ) {}

  add(
    turn: ConversationTurn,
  ): void {

    this.memories.push(
      turn,
    );

    while (

      this.memories.length >
      this.capacity

    ) {

      this.memories.shift();

    }

  }

  remove(
    id: string,
  ): void {

    const index =

      this.memories.findIndex(

        turn =>

          turn.id === id,

      );

    if (

      index >= 0

    ) {

      this.memories.splice(

        index,

        1,

      );

    }

  }

  clear(): void {

    this.memories.length = 0;

  }

  get(
    id: string,
  ): ConversationTurn | undefined {

    return this.memories.find(

      turn =>

        turn.id === id,

    );

  }

  all(): ConversationTurn[] {

    return [

      ...this.memories,

    ];

  }

  latest(
    limit = 10,
  ): ConversationTurn[] {

    return this.memories.slice(

      -limit,

    );

  }

  search(
    query: string,
  ): ConversationTurn[] {

    const text =
      query.toLowerCase();

    return this.memories.filter(

      turn =>

        turn.title
          .toLowerCase()
          .includes(text) ||

        turn.user
          .toLowerCase()
          .includes(text) ||

        turn.assistant
          .toLowerCase()
          .includes(text) ||

        turn.tags.some(

          (tag: string) =>

            tag
              .toLowerCase()
              .includes(text),

        ),

    );

  }

  has(
    id: string,
  ): boolean {

    return this.memories.some(

      turn =>

        turn.id === id,

    );

  }

  count(): number {

    return this.memories.length;

  }

}