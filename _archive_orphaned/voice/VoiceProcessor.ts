/**
 * ==========================================================
 * LÉLU
 * VOICE PROCESSOR
 * ==========================================================
 */

import VoiceDispatcher from "./VoiceDispatcher";

export default class VoiceProcessor {

  readonly dispatcher: VoiceDispatcher;

  constructor(
    dispatcher: VoiceDispatcher,
  ) {

    this.dispatcher = dispatcher;

  }

  process(
    transcript: string,
  ) {

    return this.dispatcher.dispatch(
      transcript,
    );

  }

}