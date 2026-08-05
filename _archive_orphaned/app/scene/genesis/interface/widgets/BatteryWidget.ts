/**
 * ==========================================================
 * LÉLUVERSE
 * BATTERY WIDGET
 *
 * Displays battery information.
 * ==========================================================
 */

import DesktopWidget
  from "./DesktopWidget";

export default class BatteryWidget
  extends DesktopWidget {

  private level =
    100;

  private charging =
    false;

  private powerSaving =
    false;

  private timeRemaining =
    0;

  constructor() {

    super({

      id:
        "battery",

      title:
        "Battery",

      visible:
        true,

      enabled:
        true,

      x:
        24,

      y:
        664,

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

  setLevel(
    level: number,
  ): void {

    this.level =
      Math.max(
        0,
        Math.min(
          100,
          level,
        ),
      );

  }

  setCharging(
    charging: boolean,
  ): void {

    this.charging =
      charging;

  }

  setPowerSaving(
    enabled: boolean,
  ): void {

    this.powerSaving =
      enabled;

  }

  setTimeRemaining(
    minutes: number,
  ): void {

    this.timeRemaining =
      Math.max(
        0,
        minutes,
      );

  }

  getLevel():
    number {

    return this.level;

  }

  isCharging():
    boolean {

    return this.charging;

  }

  isPowerSaving():
    boolean {

    return this.powerSaving;

  }

  getTimeRemaining():
    number {

    return this.timeRemaining;

  }

}