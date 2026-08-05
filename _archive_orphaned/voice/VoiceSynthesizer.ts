/**
 * ==========================================================
 * LÉLU
 * VOICE SYNTHESIZER
 * ==========================================================
 */

export default class VoiceSynthesizer {

  async speak(
    text: string,
  ): Promise<void> {

    const utterance =

      new SpeechSynthesisUtterance(
        text,
      );

    utterance.rate = 1;

    utterance.pitch = 1;

    utterance.volume = 1;

    speechSynthesis.speak(
      utterance,
    );

  }

  stop(): void {

    speechSynthesis.cancel();

  }

}