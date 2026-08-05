/**
 * ==========================================================
 * LÉLUVERSE
 * CONSOLE APP
 *
 * Runtime logs and diagnostics.
 * ==========================================================
 */

import DesktopWindow
  from "../DesktopWindow";

export interface ConsoleEntry {

  timestamp: number;

  level:
    | "info"
    | "warning"
    | "error"
    | "success";

  message: string;

}

export default class ConsoleApp
  extends DesktopWindow {

  private readonly logs:
    ConsoleEntry[] =
      [];

  constructor() {

    super({

      id:
        "console",

      title:
        "Console",

      visible:
        false,

      focused:
        false,

      minimized:
        false,

      maximized:
        false,

      x:
        340,

      y:
        240,

      width:
        1400,

      height:
        900,

    });

  }

  override initialize(): void {

  }

  override update(
    _delta: number,
  ): void {

  }

  override shutdown(): void {

    this.logs.length =
      0;

  }

  log(

    level:
      ConsoleEntry["level"],

    message: string,

  ): void {

    this.logs.push({

      timestamp:
        Date.now(),

      level,

      message,

    });

  }

  info(
    message: string,
  ): void {

    this.log(
      "info",
      message,
    );

  }

  warning(
    message: string,
  ): void {

    this.log(
      "warning",
      message,
    );

  }

  error(
    message: string,
  ): void {

    this.log(
      "error",
      message,
    );

  }

  success(
    message: string,
  ): void {

    this.log(
      "success",
      message,
    );

  }

  clear(): void {

    this.logs.length =
      0;

  }

  getLogs():
    readonly ConsoleEntry[] {

    return this.logs;

  }

}