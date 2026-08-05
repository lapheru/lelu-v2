/**
 * ==========================================================
 * LÉLUVERSE
 * TERMINAL APP
 *
 * Developer terminal and runtime console.
 * ==========================================================
 */

import DesktopWindow
  from "../DesktopWindow";

export default class TerminalApp
  extends DesktopWindow {

  constructor() {

    super({

      id:
        "terminal",

      title:
        "Terminal",

      visible:
        false,

      focused:
        false,

      minimized:
        false,

      maximized:
        false,

      x:
        280,

      y:
        180,

      width:
        1280,

      height:
        840,

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

  execute(
    _command: string,
  ): void {

  }

  clear(): void {

  }

}