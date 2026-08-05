/**
 * ==========================================================
 * LÉLUVERSE
 * CLOCK WIDGET
 *
 * Desktop clock widget.
 * ==========================================================
 */

import DesktopWidget
  from "./DesktopWidget";

export default class ClockWidget
  extends DesktopWidget {

  private time =
    new Date();

  constructor() {

    super({

      id:
        "clock",

      title:
        "Clock",

      visible:
        true,

      enabled:
        true,

      x:
        24,

      y:
        24,

      width:
        220,

      height:
        60,

    });

  }

  override update(
    _delta: number,
  ): void {

    this.time =
      new Date();

  }

  getTime():
    Date {

    return this.time;

  }

}