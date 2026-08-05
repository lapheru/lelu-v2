/**
 * ==========================================================
 * LÉLUVERSE
 * SPEECH SYNTHESIS SERVICE
 * ==========================================================
 */

export default class SpeechSynthesisService {

  private voice?: SpeechSynthesisVoice;

  private speaking =
    false;

  private rate =
    1;

  private pitch =
    1;

  private volume =
    1;

  initialize(): void {

    speechSynthesis.getVoices();

    speechSynthesis.onvoiceschanged =
      () => {

        const voices =

          speechSynthesis.getVoices();

        this.voice =

          voices.find(

            voice =>

              voice.lang.startsWith(
                "en",
              ),

          ) ||

          voices[0];

      };

  }

  speak(
    text: string,
  ): Promise<void> {

    return new Promise(

      resolve => {

        this.stop();

        const utterance =
          new SpeechSynthesisUtterance(
            text,
          );

        utterance.voice =
          this.voice ?? null;

        utterance.rate =
          this.rate;

        utterance.pitch =
          this.pitch;

        utterance.volume =
          this.volume;

        utterance.onstart =
          () => {

            this.speaking =
              true;

          };

        utterance.onend =
          () => {

            this.speaking =
              false;

            resolve();

          };

        utterance.onerror =
          () => {

            this.speaking =
              false;

            resolve();

          };

        speechSynthesis.speak(
          utterance,
        );

      },

    );

  }

  stop(): void {

    speechSynthesis.cancel();

    this.speaking =
      false;

  }

  pause(): void {

    speechSynthesis.pause();

  }

  resume(): void {

    speechSynthesis.resume();

  }

  isSpeaking():
    boolean {

    return this.speaking;

  }

  setRate(
    rate: number,
  ): void {

    this.rate =
      rate;

  }

  setPitch(
    pitch: number,
  ): void {

    this.pitch =
      pitch;

  }

  setVolume(
    volume: number,
  ): void {

    this.volume =
      volume;

  }

}