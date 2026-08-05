/**
 * ==========================================================
 * LÉLU
 * VOICE DISPATCHER
 * ==========================================================
 */

import AIRouter from "../core/AIRouter";

export default class VoiceDispatcher {

  readonly router: AIRouter;

  constructor(
    router: AIRouter,
  ) {

    this.router = router;

  }

  dispatch(
    transcript: string,
  ) {

    return this.router.route({
      request: {
        messages: [],
        prompt: transcript,
        timestamp: Date.now(),
      },
      started: Date.now(),
      brain: undefined as any,
      knowledgeProviders: undefined as any,
      aiProviders: undefined as any,
      logger: undefined as any,
    } as any);

  }

}