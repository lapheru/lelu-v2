/**
 * ==========================================================
 * LÉLU
 * VOICE COMMAND REGISTRY
 * ==========================================================
 */

import type {

  VoiceCommand,

} from "./VoiceCommand";

export default class VoiceCommandRegistry {

  private readonly commands =
    new Map<string, VoiceCommand>();

  register(

    command: VoiceCommand,

  ): void {

    this.commands.set(

      command.id,

      command,

    );

  }

  getAll(): VoiceCommand[] {

    return Array.from(

      this.commands.values(),

    );

  }

}