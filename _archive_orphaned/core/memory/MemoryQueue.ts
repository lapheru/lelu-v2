/**
 * ==========================================================
 * LÉLU
 * MEMORY QUEUE
 * ==========================================================
 */

import type {
  ConversationTurn,
} from "./ConversationTurn";

export default class MemoryQueue {

  private readonly queue: ConversationTurn[] = [];

  enqueue(
    turn: ConversationTurn,
  ): void {

    this.queue.push(
      turn,
    );

  }

  dequeue():
    ConversationTurn | undefined {

    return this.queue.shift();

  }

  peek():
    ConversationTurn | undefined {

    return this.queue[0];

  }

  all():
    ConversationTurn[] {

    return [

      ...this.queue,

    ];

  }

  clear(): void {

    this.queue.length = 0;

  }

  count(): number {

    return this.queue.length;

  }

  isEmpty(): boolean {

    return this.queue.length === 0;

  }

}