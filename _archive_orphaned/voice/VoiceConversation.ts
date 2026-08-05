/**
 * ==========================================================
 * LÉLU
 * VOICE CONVERSATION
 * ==========================================================
 */

import VoiceResponse from "./VoiceResponse";

export default class VoiceConversation {

  private readonly history:
    VoiceResponse[] = [];

  add(
    response: VoiceResponse,
  ): void {

    this.history.push(
      response,
    );

  }

  getAll(): VoiceResponse[] {

    return this.history;

  }

}