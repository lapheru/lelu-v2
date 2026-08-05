/**
 * ==========================================================
 * LÉLUVERSE
 * EVENT DISPATCHER
 * ==========================================================
 */

import GenesisEventBus from "./GenesisEventBus";
import EventQueue from "./EventQueue";

export default class EventDispatcher {

  constructor(

    private readonly bus: GenesisEventBus,

    private readonly queue: EventQueue,

  ) {}

  dispatch() {

    let item =

      this.queue.dequeue();

    while (item) {

      this.bus.emit(

        item.event,

        item.payload,

      );

      item =

        this.queue.dequeue();

    }

  }

}