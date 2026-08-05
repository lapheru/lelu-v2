/**
 * ==========================================================
 * LÉLU
 * VOICE ENGINE
 * ==========================================================
 */

import VoiceBridge from "./VoiceBridge";
import VoicePipeline from "./VoicePipeline";

export default class VoiceEngine {

  readonly bridge: VoiceBridge;

  readonly pipeline: VoicePipeline;

  constructor(

    bridge: VoiceBridge,

    pipeline: VoicePipeline,

  ) {

    this.bridge = bridge;

    this.pipeline = pipeline;

  }

  async start(): Promise<void> {

    await this.bridge.initialize();

  }

  async process(

    transcript: string,

  ): Promise<void> {

    await this.pipeline.process(

      transcript,

    );

  }

}