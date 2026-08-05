/**
 * ==========================================================
 * LÉLUVERSE
 * AI STATUS WIDGET
 *
 * Displays Lélu's current state.
 * ==========================================================
 */

import DesktopWidget
  from "./DesktopWidget";

export type AIStatus =

  | "offline"

  | "starting"

  | "idle"

  | "thinking"

  | "listening"

  | "speaking"

  | "researching"

  | "learning"

  | "busy";

export default class AIStatusWidget
  extends DesktopWidget {

  private status:
    AIStatus =
      "offline";

  private message =
    "Offline";

  constructor() {

    super({

      id:
        "ai-status",

      title:
        "AI Status",

      visible:
        true,

      enabled:
        true,

      x:
        24,

      y:
        292,

      width:
        300,

      height:
        96,

    });

  }

  override update(
    _delta: number,
  ): void {

  }

  setStatus(

    status: AIStatus,

    message = "",

  ): void {

    this.status =
      status;

    this.message =

      message ||

      status;

  }

  getStatus():
    AIStatus {

    return this.status;

  }

  getMessage():
    string {

    return this.message;

  }

}