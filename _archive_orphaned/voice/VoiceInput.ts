/**
 * ==========================================================
 * LÉLU
 * VOICE INPUT
 * ==========================================================
 */

import VoiceRecognizer from "./VoiceRecognizer";

export default class VoiceInput {

  readonly recognizer: VoiceRecognizer;

  constructor(
    recognizer: VoiceRecognizer,
  ) {

    this.recognizer = recognizer;

  }

  async start(): Promise<void> {

    await this.recognizer.start();

  }

  stop(): void {

    this.recognizer.stop();

  }

}