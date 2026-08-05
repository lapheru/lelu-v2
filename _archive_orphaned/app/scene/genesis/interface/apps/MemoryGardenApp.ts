/**
 * ==========================================================
 * LÉLUVERSE
 * MEMORY GARDEN APP
 *
 * Living memory visualization.
 * ==========================================================
 */

import DesktopWindow
  from "../DesktopWindow";

export default class MemoryGardenApp
  extends DesktopWindow {

  constructor() {

    super({

      id:
        "memory-garden",

      title:
        "Memory Garden",

      visible:
        false,

      focused:
        false,

      minimized:
        false,

      maximized:
        false,

      x:
        220,

      y:
        120,

      width:
        1200,

      height:
        800,

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

}