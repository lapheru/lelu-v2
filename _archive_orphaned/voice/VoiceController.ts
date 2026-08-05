/**
 * ==========================================================
 * LÉLU
 * VOICE CONTROLLER
 * ==========================================================
 */

import VoiceRuntime from "./VoiceRuntime";

export default class VoiceController {

  readonly runtime: VoiceRuntime;

  constructor(
    runtime: VoiceRuntime,
  ) {

    this.runtime = runtime;

  }

  async start(): Promise<void> {

    await this.runtime.initialize();

  }

}