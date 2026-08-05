/**
 * ==========================================================
 * LÉLU
 * VOICE RUNTIME
 * ==========================================================
 */

import VoiceManager from "./VoiceManager";

export default class VoiceRuntime {

  readonly manager =
    new VoiceManager();

  async initialize(): Promise<void> {

    await this.manager.start();

  }

}