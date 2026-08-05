/**
 * ==========================================================
 * LÉLU
 * VOICE LISTENER
 * ==========================================================
 */

export type VoiceCallback = (
  transcript: string,
) => void;

export default class VoiceListener {

  private callback?: VoiceCallback;

  onTranscript(
    callback: VoiceCallback,
  ): void {

    this.callback = callback;

  }

  receive(
    transcript: string,
  ): void {

    this.callback?.(
      transcript,
    );

  }

}