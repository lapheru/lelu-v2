/**
 * ==========================================================
 * LÉLUVERSE
 * SYSTEM WIDGET
 *
 * Displays overall system statistics.
 * ==========================================================
 */

import DesktopWidget
  from "./DesktopWidget";

export default class SystemWidget
  extends DesktopWidget {

  private cpu =
    0;

  private memory =
    0;

  private gpu =
    0;

  private storage =
    0;

  private uptime =
    0;

  constructor() {

    super({

      id:
        "system",

      title:
        "System",

      visible:
        true,

      enabled:
        true,

      x:
        24,

      y:
        796,

      width:
        320,

      height:
        140,

    });

  }

  override update(
    delta: number,
  ): void {

    this.uptime +=
      delta;

  }

  setCPUUsage(
    percent: number,
  ): void {

    this.cpu =
      Math.max(
        0,
        Math.min(
          100,
          percent,
        ),
      );

  }

  setMemoryUsage(
    percent: number,
  ): void {

    this.memory =
      Math.max(
        0,
        Math.min(
          100,
          percent,
        ),
      );

  }

  setGPUUsage(
    percent: number,
  ): void {

    this.gpu =
      Math.max(
        0,
        Math.min(
          100,
          percent,
        ),
      );

  }

  setStorageUsage(
    percent: number,
  ): void {

    this.storage =
      Math.max(
        0,
        Math.min(
          100,
          percent,
        ),
      );

  }

  getCPUUsage():
    number {

    return this.cpu;

  }

  getMemoryUsage():
    number {

    return this.memory;

  }

  getGPUUsage():
    number {

    return this.gpu;

  }

  getStorageUsage():
    number {

    return this.storage;

  }

  getUptime():
    number {

    return this.uptime;

  }

}