/**
 * ==========================================================
 * LÉLU
 * VOICE OUTPUT
 * ==========================================================
 */

import VoiceSynthesizer from "./VoiceSynthesizer";

export default class VoiceOutput {

  readonly synthesizer: VoiceSynthesizer;

  constructor(
    synthesizer: VoiceSynthesizer,
  ) {

    this.synthesizer = synthesizer;

  }

  async speak(
    text: string,
  ): Promise<void> {

    await this.synthesizer.speak(
      text,
    );

  }

}