/**
 * ==========================================================
 * LÉLU
 * VOICE COMMAND
 * ==========================================================
 */

export interface VoiceCommand {

  id: string;

  phrases: string[];

  execute(

    transcript: string,

  ): Promise<void>;

}