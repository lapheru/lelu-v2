/**
 * ==========================================================
 * LÉLUVERSE
 * DESKTOP HUD
 *
 * Heads-up display for the Lélu interface.
 * ==========================================================
 */

import NotificationManager
  from "./NotificationManager";

export default class DesktopHUD {

  private initialized =
    false;

  private fps =
    0;

  private time =
    Date.now();

  constructor(

    readonly notifications:
      NotificationManager,

  ) {}

  initialize(): void {

    if (this.initialized)
      return;

    this.time =
      Date.now();

    this.initialized =
      true;

  }

  update(
    delta: number,
  ): void {

    if (!this.initialized)
      return;

    if (delta > 0) {

      this.fps =
        Math.round(
          1 / delta,
        );

    }

    this.time =
      Date.now();

  }

  shutdown(): void {

    this.initialized =
      false;

  }

  getFPS():
    number {

    return this.fps;

  }

  getTime():
    number {

    return this.time;

  }

}