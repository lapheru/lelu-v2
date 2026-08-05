/**
 * ==========================================================
 * LÉLUVERSE
 * PERFORMANCE WIDGET
 *
 * Displays runtime performance.
 * ==========================================================
 */

import DesktopWidget
  from "./DesktopWidget";

export default class PerformanceWidget
  extends DesktopWidget {

  private fps =
    0;

  private frameTime =
    0;

  constructor() {

    super({

      id:
        "performance",

      title:
        "Performance",

      visible:
        true,

      enabled:
        true,

      x:
        24,

      y:
        180,

      width:
        260,

      height:
        100,

    });

  }

  override update(
    delta: number,
  ): void {

    if (delta > 0) {

      this.fps =
        Math.round(
          1 / delta,
        );

      this.frameTime =
        Math.round(
          delta * 1000,
        );

    }

  }

  getFPS():
    number {

    return this.fps;

  }

  getFrameTime():
    number {

    return this.frameTime;

  }

}