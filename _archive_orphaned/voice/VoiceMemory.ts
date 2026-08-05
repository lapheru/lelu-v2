/**
 * ==========================================================
 * LÉLU
 * VOICE MEMORY
 * ==========================================================
 */

export default class VoiceMemory {

  lastTranscript = "";

  remember(

    transcript: string,

  ): void {

    this.lastTranscript = transcript;

  }

}