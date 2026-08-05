/**
 * ==========================================================
 * LÉLUVERSE
 * SIMULATION APP
 *
 * Controls the Genesis simulation.
 * ==========================================================
 */

import DesktopWindow
  from "../DesktopWindow";

export default class SimulationApp
  extends DesktopWindow {

  private running =
    false;

  private paused =
    false;

  constructor() {

    super({

      id:
        "simulation",

      title:
        "Simulation",

      visible:
        false,

      focused:
        false,

      minimized:
        false,

      maximized:
        false,

      x:
        320,

      y:
        220,

      width:
        1400,

      height:
        900,

    });

  }

  override initialize(): void {

  }

  override update(
    _delta: number,
  ): void {

  }

  override shutdown(): void {

  }

  start(): void {

    this.running =
      true;

    this.paused =
      false;

  }

  stop(): void {

    this.running =
      false;

    this.paused =
      false;

  }

  pause(): void {

    if (!this.running)
      return;

    this.paused =
      true;

  }

  resume(): void {

    if (!this.running)
      return;

    this.paused =
      false;

  }

  isRunning():
    boolean {

    return this.running;

  }

  isPaused():
    boolean {

    return this.paused;

  }

}