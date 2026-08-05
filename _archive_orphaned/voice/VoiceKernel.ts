/**
 * ==========================================================
 * LÉLU
 * VOICE KERNEL
 * ==========================================================
 */

import VoiceEngine from "./VoiceEngine";

export default class VoiceKernel {

  readonly engine: VoiceEngine;

  constructor(

    engine: VoiceEngine,

  ) {

    this.engine = engine;

  }

  async boot(): Promise<void> {

    await this.engine.start();

  }

}