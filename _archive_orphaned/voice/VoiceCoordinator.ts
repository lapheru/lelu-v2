/**
 * ==========================================================
 * LÉLU
 * VOICE COORDINATOR
 * ==========================================================
 */

import VoiceInput from "./VoiceInput";
import VoiceOutput from "./VoiceOutput";
import VoiceProcessor from "./VoiceProcessor";

export default class VoiceCoordinator {

  readonly input: VoiceInput;

  readonly processor: VoiceProcessor;

  readonly output: VoiceOutput;

  constructor(

    input: VoiceInput,

    processor: VoiceProcessor,

    output: VoiceOutput,

  ) {

    this.input = input;

    this.processor = processor;

    this.output = output;

  }

  async start(): Promise<void> {

    await this.input.start();

  }

  stop(): void {

    this.input.stop();

  }

}