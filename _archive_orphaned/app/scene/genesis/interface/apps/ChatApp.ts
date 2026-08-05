/**
 * ==========================================================
 * LÉLUVERSE
 * CHAT APP
 *
 * Desktop chat application.
 * ==========================================================
 */

import DesktopWindow from "../DesktopWindow";
import AIService from "../../../../../core/AIService";

export default class ChatApp extends DesktopWindow {
  private readonly ai = AIService.getInstance();

  constructor() {
    super({
      id: "chat",
      title: "Chat",
      visible: true,
      focused: true,
      minimized: false,
      maximized: false,
      x: 160,
      y: 80,
      width: 900,
      height: 650,
    });
  }

  override initialize(): void {
    void this.ai.initialize();
  }

  override update(_delta: number): void {
    this.state.updated = Date.now();
  }

  override shutdown(): void {
    this.state.focused = false;
  }
}