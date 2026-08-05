/**
 * ==========================================================
 * LÉLUVERSE
 * MEMORY WIDGET
 *
 * Displays memory usage and statistics.
 * ==========================================================
 */

import DesktopWidget
  from "./DesktopWidget";

export default class MemoryWidget
  extends DesktopWidget {

  private used =
    0;

  private total =
    0;

  private memories =
    0;

  constructor() {

    super({

      id:
        "memory",

      title:
        "Memory",

      visible:
        true,

      enabled:
        true,

      x:
        24,

      y:
        400,

      width:
        300,

      height:
        120,

    });

  }

  override update(
    _delta: number,
  ): void {

  }

  setUsage(

    used: number,

    total: number,

  ): void {

    this.used =
      used;

    this.total =
      total;

  }

  setMemoryCount(
    count: number,
  ): void {

    this.memories =
      count;

  }

  getUsed():
    number {

    return this.used;

  }

  getTotal():
    number {

    return this.total;

  }

  getMemoryCount():
    number {

    return this.memories;

  }

  getUsagePercent():
    number {

    if (this.total <= 0)
      return 0;

    return Math.round(

      this.used /

      this.total *

      100,

    );

  }

}