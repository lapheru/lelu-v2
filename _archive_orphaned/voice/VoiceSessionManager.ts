/**
 * ==========================================================
 * LÉLU
 * VOICE SESSION
 * ==========================================================
 */

export default class VoiceSession {

  id = crypto.randomUUID();

  started = Date.now();

  transcript = "";

  listening = false;

  speaking = false;

  reset(): void {

    this.id = crypto.randomUUID();

    this.started = Date.now();

    this.transcript = "";

    this.listening = false;

    this.speaking = false;

  }

}