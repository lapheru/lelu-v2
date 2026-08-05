/**
 * ==========================================================
 * LÉLUVERSE 
 * DESKTOP EVENT BUS
 * ==========================================================
 */

import type DesktopEvent from "./DesktopEvent";

export type DesktopEventListener = (
  event: DesktopEvent,
) => void;

export default class DesktopEventBus {

  private readonly listeners = new Map<
    string,
    Set<DesktopEventListener>
  >();

  subscribe(
    type: string,
    listener: DesktopEventListener,
  ): void {

    let listeners = this.listeners.get(type);

    if (!listeners) {
      listeners = new Set<DesktopEventListener>();

      this.listeners.set(
        type,
        listeners,
      );
    }

    listeners.add(listener);
  }

  unsubscribe(
    type: string,
    listener: DesktopEventListener,
  ): void {

    this.listeners
      .get(type)
      ?.delete(listener);
  }

  emit(
    event: DesktopEvent,
  ): void {

    this.listeners
      .get(event.type)
      ?.forEach(listener => {
        listener(event);
      });
  }

  clear(): void {
    this.listeners.clear();
  }

}