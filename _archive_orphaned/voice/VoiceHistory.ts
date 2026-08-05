/**
 * ==========================================================
 * LÉLU
 * VOICE HISTORY
 * ==========================================================
 */

export default class VoiceHistory {

  private readonly history:
    string[] = [];

  add(
    transcript: string,
  ): void {

    this.history.push(
      transcript,
    );

  }

  getAll(): string[] {

    return this.history;

  }

  clear(): void {

    this.history.length = 0;

  }

}