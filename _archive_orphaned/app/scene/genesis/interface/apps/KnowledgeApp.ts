/**
 * ==========================================================
 * LÉLUVERSE
 * KNOWLEDGE APP
 *
 * Universal knowledge browser.
 * ==========================================================
 */

import DesktopWindow
  from "../DesktopWindow";

export default class KnowledgeApp
  extends DesktopWindow {

  constructor() {

    super({

      id:
        "knowledge",

      title:
        "Knowledge",

      visible:
        false,

      focused:
        false,

      minimized:
        false,

      maximized:
        false,

      x:
        240,

      y:
        140,

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