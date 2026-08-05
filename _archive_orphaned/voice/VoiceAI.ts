/**
 * ==========================================================
 * LÉLU
 * VOICE AI
 * ==========================================================
 */

import AIRuntime from "../core/AIRuntime";
import VoiceOutput from "./VoiceOutput";

export default class VoiceAI {

  readonly runtime: AIRuntime;

  readonly output: VoiceOutput;

  constructor(

    runtime: AIRuntime,

    output: VoiceOutput,

  ) {

    this.runtime = runtime;

    this.output = output;

  }

  async respond(

    transcript: string,

  ): Promise<void> {

    const intent =

      await this.runtime.router.route({
        request: {
          messages: [],
          prompt: transcript,
          timestamp: Date.now(),
        },
        started: Date.now(),
        brain: this.runtime.brain,
        knowledgeProviders: this.runtime.core.getKnowledgeProviders(),
        aiProviders: this.runtime.core.getAIProviders(),
        logger: this.runtime.core.getLogger(),
      } as any);

    await this.output.speak(

      `Intent detected: ${intent}`,

    );

  }

}