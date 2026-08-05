/**
 * ==========================================================
 * LÉLUVERSE
 * COMMAND PALETTE
 *
 * Universal command launcher.
 * ==========================================================
 */

import CommandManager
  from "./CommandManager";

import type {
  InterfaceCommand,
} from "./CommandManager";

export default class CommandPalette {

  private initialized =
    false;

  private visible =
    false;

  private query =
    "";

  constructor(

    readonly commands:
      CommandManager,

  ) {}

  initialize(): void {

    if (this.initialized)
      return;

    this.initialized =
      true;

  }

  update(
    _delta: number,
  ): void {

    if (!this.initialized)
      return;

  }

  shutdown(): void {

    this.visible =
      false;

    this.query =
      "";

    this.initialized =
      false;

  }

  open(): void {

    this.visible =
      true;

  }

  close(): void {

    this.visible =
      false;

  }

  toggle(): void {

    this.visible =
      !this.visible;

  }

  isOpen():
    boolean {

    return this.visible;

  }

  setQuery(
    query: string,
  ): void {

    this.query =
      query;

  }

  getQuery():
    string {

    return this.query;

  }

  execute(
    id: string,
  ): boolean {

    return this.commands.execute(
      id,
    );

  }

  getCommands():
    InterfaceCommand[] {

    return this.commands.getAll();

  }

}