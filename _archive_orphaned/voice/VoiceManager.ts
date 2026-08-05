/**
 * ==========================================================
 * LÉLU
 * VOICE MANAGER
 * ==========================================================
 */

import VoiceRecognizer from "./VoiceRecognizer";
import VoiceSynthesizer from "./VoiceSynthesizer";

export default class VoiceManager {

  readonly recognizer =
    new VoiceRecognizer();

  readonly synthesizer =
    new VoiceSynthesizer();

  async start(): Promise<void> {

    await this.recognizer.start();

  }

  stop(): void {

    this.recognizer.stop();

    this.synthesizer.stop();

  }

  async speak(
    text: string,
  ): Promise<void> {

    await this.synthesizer.speak(
      text,
    );

  }

}