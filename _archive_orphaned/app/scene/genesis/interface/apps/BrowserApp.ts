/**
 * ==========================================================
 * LÉLUVERSE
 * BROWSER APP
 * ==========================================================
 */

import DesktopWindow from "../DesktopWindow";

export default class BrowserApp extends DesktopWindow {
  constructor() {
    super({
      id: "browser",
      title: "Browser",
      visible: false,
      focused: false,
      minimized: false,
      maximized: false,
      x: 220,
      y: 140,
      width: 900,
      height: 620,
    });
  }

  override initialize(): void {}

  override update(_delta: number): void {}

  override shutdown(): void {}
}
