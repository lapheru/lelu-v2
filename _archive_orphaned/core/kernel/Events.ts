/**
 * ==========================================================
 * LÉLU
 * KERNEL EVENTS
 * ==========================================================
 */

export type EventHandler<T = unknown> =
  (payload: T) => void | Promise<void>;

export default class Events {

  private readonly listeners =
    new Map<
      string,
      Set<EventHandler>
    >();

  on<T = unknown>(
    event: string,
    handler: EventHandler<T>,
  ): void {

    if (!this.listeners.has(event)) {

      this.listeners.set(
        event,
        new Set(),
      );

    }

    this.listeners
      .get(event)!
      .add(handler as EventHandler);

  }

  off<T = unknown>(
    event: string,
    handler: EventHandler<T>,
  ): void {

    this.listeners
      .get(event)
      ?.delete(handler as EventHandler);

  }

  async emit<T = unknown>(
    event: string,
    payload?: T,
  ): Promise<void> {

    const handlers =
      this.listeners.get(event);

    if (!handlers) {

      return;

    }

    for (const handler of handlers) {

      await handler(payload);

    }

  }

  once<T = unknown>(
    event: string,
    handler: EventHandler<T>,
  ): void {

    const wrapper: EventHandler<T> =
      async payload => {

        this.off(
          event,
          wrapper,
        );

        await handler(
          payload,
        );

      };

    this.on(
      event,
      wrapper,
    );

  }

  clear(): void {

    this.listeners.clear();

  }

  eventNames():
    string[] {

    return [
      ...this.listeners.keys(),
    ];

  }

}