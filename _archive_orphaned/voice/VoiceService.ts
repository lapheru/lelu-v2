/**
 * ==========================================================
 * LÉLU
 * VOICE SERVICE
 * ==========================================================
 */

import VoiceKernel from "./VoiceKernel";

export default class VoiceService {

  readonly kernel: VoiceKernel;

  constructor(

    kernel: VoiceKernel,

  ) {

    this.kernel = kernel;

  }

  async initialize(): Promise<void> {

    await this.kernel.boot();

  }

}