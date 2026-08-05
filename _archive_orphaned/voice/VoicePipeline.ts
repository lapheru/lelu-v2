/**
 * ==========================================================
 * LÉLU
 * VOICE PIPELINE
 * ==========================================================
 */

import VoiceBridge from "./VoiceBridge";
import VoiceRouter from "./VoiceRouter";
import VoiceMemory from "./VoiceMemory";

export default class VoicePipeline {

  readonly bridge: VoiceBridge;

  readonly router: VoiceRouter;

  readonly memory: VoiceMemory;

  constructor(
    bridge: VoiceBridge,
    router: VoiceRouter,
    memory: VoiceMemory,
  ) {

    this.bridge = bridge;

    this.router = router;

    this.memory = memory;

  }

  async process(
    transcript: string,
  ): Promise<void> {

    const text =
      this.router.normalize(
        transcript,
      );

    this.memory.remember(
      text,
    );

    await this.bridge.say(
      text,
    );

  }

}