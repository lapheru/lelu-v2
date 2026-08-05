/**
 * ==========================================================
 * LÉLU
 * VOICE BRIDGE
 * ==========================================================
 */

import AIRuntime from "../core/AIRuntime";
import VoiceManager from "./VoiceManager";

export default class VoiceBridge {

  readonly ai: AIRuntime;

  readonly voice: VoiceManager;

  constructor(

    ai: AIRuntime,

    voice: VoiceManager,

  ) {

    this.ai = ai;

    this.voice = voice;

  }

  async initialize(): Promise<void> {

    await this.voice.start();

  }

  async say(

    text: string,

  ): Promise<void> {

    await this.voice.speak(

      text,

    );

  }

}