/**
 * ==========================================================
 * LÉLUVERSE
 * SETTINGS APP
 *
 * System configuration and preferences.
 * ==========================================================
 */

import DesktopWindow
  from "../DesktopWindow";

export default class SettingsApp
  extends DesktopWindow {

  constructor() {

    super({

      id:
        "settings",

      title:
        "Settings",

      visible:
        false,

      focused:
        false,

      minimized:
        false,

      maximized:
        false,

      x:
        300,

      y:
        200,

      width:
        1200,

      height:
        820,

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

  openCategory(
    _category: string,
  ): void {

  }

  save(): void {

  }

  reset(): void {

  }

}