/**
 * ==========================================================
 * LÉLUVERSE
 * EVENT QUEUE
 * ==========================================================
 */

import { GenesisEvent } from "./GenesisEvents";

export interface QueuedEvent {

  event: GenesisEvent;

  payload?: unknown;

}

export default class EventQueue {

  private queue: QueuedEvent[] = [];

  enqueue(

    event: GenesisEvent,

    payload?: unknown,

  ) {

    this.queue.push({

      event,

      payload,

    });

  }

  dequeue() {

    return this.queue.shift();

  }

  clear() {

    this.queue = [];

  }

  size() {

    return this.queue.length;

  }

}