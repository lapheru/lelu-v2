/**
 * ==========================================================
 * LÉLU
 * VOICE QUEUE
 * ==========================================================
 */

import VoiceResponse from "./VoiceResponse";

export default class VoiceQueue {

  private readonly queue:
    VoiceResponse[] = [];

  push(
    response: VoiceResponse,
  ): void {

    this.queue.push(
      response,
    );

  }

  next():
    VoiceResponse | undefined {

    return this.queue.shift();

  }

}