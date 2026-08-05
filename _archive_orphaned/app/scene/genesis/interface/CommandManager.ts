/**
 * ==========================================================
 * LÉLUVERSE
 * COMMAND MANAGER
 *
 * Executes interface commands.
 * ==========================================================
 */

export interface InterfaceCommand {

  id: string;

  name: string;

  enabled: boolean;

  execute(): void;

}

export default class CommandManager {

  private initialized =
    false;

  private readonly commands =
    new Map<
      string,
      InterfaceCommand
    >();

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

    this.commands.clear();

    this.initialized =
      false;

  }

  register(
    command: InterfaceCommand,
  ): void {

    this.commands.set(
      command.id,
      command,
    );

  }

  unregister(
    id: string,
  ): void {

    this.commands.delete(
      id,
    );

  }

  execute(
    id: string,
  ): boolean {

    const command =

      this.commands.get(id);

    if (!command)
      return false;

    if (!command.enabled)
      return false;

    command.execute();

    return true;

  }

  enable(
    id: string,
  ): void {

    const command =

      this.commands.get(id);

    if (!command)
      return;

    command.enabled =
      true;

  }

  disable(
    id: string,
  ): void {

    const command =

      this.commands.get(id);

    if (!command)
      return;

    command.enabled =
      false;

  }

  get(
    id: string,
  ):
    | InterfaceCommand
    | undefined {

    return this.commands.get(
      id,
    );

  }

  getAll():
    InterfaceCommand[] {

    return Array.from(

      this.commands.values(),

    );

  }

}