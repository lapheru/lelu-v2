/**
 * ==========================================================
 * LÉLUVERSE
 * DESKTOP DOCK
 *
 * Visual dock controller.
 * ==========================================================
 */

import DockManager
  from "./DockManager";

export default class DesktopDock {

  private initialized =
    false;

  constructor(

    readonly dock:
      DockManager,

  ) {}

  initialize(): void {

    if (this.initialized)
      return;

    this.initialized =
      true;

  }

  update(
    _delta: number,
  ): void {

    if (!this.initialized)
      return;

  }

  shutdown(): void {

    this.initialized =
      false;

  }

  open(
    id: string,
  ): void {

    this.dock.enable(
      id,
    );

  }

  close(
    id: string,
  ): void {

    this.dock.disable(
      id,
    );

  }

  pin(
    id: string,
  ): void {

    this.dock.pin(
      id,
    );

  }

  unpin(
    id: string,
  ): void {

    this.dock.unpin(
      id,
    );

  }

}