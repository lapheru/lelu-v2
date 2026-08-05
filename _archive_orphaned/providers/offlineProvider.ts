/**
 * ==========================================================
 * LÉLU
 * OFFLINE PROVIDER
 * ==========================================================
 */

import type AIProvider
  from "./AIProvider";

import type {
  AIRequest,
  AIResponse,
  AIProviderHealth,
} from "./AIProvider";

export default class OfflineProvider
  implements AIProvider {

  readonly name =
    "Offline";

  readonly priority =
    Number.MAX_SAFE_INTEGER;

  readonly enabled =
    true;

  readonly timeout =
    0;

  readonly requiresApiKey =
    false;

  readonly capabilities = [
    "chat",
    "memory",
    "offline",
    "fallback",
  ] as const;

  async initialize(): Promise<void> {

    return;

  }

  async shutdown(): Promise<void> {

    return;

  }

  async isAvailable(): Promise<boolean> {

    return true;

  }

  async health(): Promise<AIProviderHealth> {

    return {

      available: true,

      initialized: true,

      lastChecked: Date.now(),

      responseTime: 0,

    };

  }

  canHandle(
    _input: string,
  ): boolean {

    return true;

  }

  async generate(
    request: AIRequest,
  ): Promise<AIResponse> {

    const prompt =
      request.prompt.trim();

    return {

      text:
`I'm currently operating in Offline Mode.

Cloud AI providers are unavailable.

I can continue using local memory, saved conversations, projects, threads, engineering notes, and previously stored knowledge.

You said:

${prompt}`,

      provider: this.name,

      model: "offline",

      cached: false,

      processingTime: 0,

      metadata: {

        offline: true,

      },

    };

  }

}