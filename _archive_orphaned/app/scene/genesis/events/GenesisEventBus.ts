/**
 * ==========================================================
 * LÉLUVERSE
 * EVENT BUS
 * ==========================================================
 */

import { GenesisEvent } from "./GenesisEvents";

type Listener = (payload?: unknown) => void;

export default class GenesisEventBus {

  private listeners =

    new Map<GenesisEvent, Set<Listener>>();

  on(

    event: GenesisEvent,

    listener: Listener,

  ) {

    if (

      !this.listeners.has(event)

    ) {

      this.listeners.set(

        event,

        new Set(),

      );

    }

    this.listeners

      .get(event)!

      .add(listener);

  }

  off(

    event: GenesisEvent,

    listener: Listener,

  ) {

    this.listeners

      .get(event)

      ?.delete(listener);

  }

  emit(

    event: GenesisEvent,

    payload?: unknown,

  ) {

    this.listeners

      .get(event)

      ?.forEach(

        listener =>

          listener(payload),

      );

  }

}