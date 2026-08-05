/**
 * ==========================================================
 * LÉLUVERSE
 * EXPLORER APP
 *
 * Universal explorer for files, memories,
 * worlds, knowledge, and projects.
 * ==========================================================
 */

import DesktopWindow
  from "../DesktopWindow";

export default class ExplorerApp
  extends DesktopWindow {

  constructor() {

    super({

      id:
        "explorer",

      title:
        "Explorer",

      visible:
        false,

      focused:
        false,

      minimized:
        false,

      maximized:
        false,

      x:
        260,

      y:
        160,

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

}