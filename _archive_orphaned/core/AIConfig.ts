/**
 * ==========================================================
 * LÉLU
 * AI CONFIGURATION
 * ==========================================================
 */

import type { AIProvider } from "./AIProviderRouter";

export interface AIProviderConfig {

  name: string;

  endpoint: string;

  model: string;

  apiKey: string;

  timeout: number;

  priority: number;

  streaming: boolean;

  headers?: Record<string, string>;

}

export default class AIConfig {

  readonly providers: Record<
    AIProvider,
    AIProviderConfig
  > = {

    groq: {

      name: "Groq",

      endpoint:
        "https://api.groq.com/openai/v1/chat/completions",

      model:
        "openai/gpt-oss-120b",

      apiKey:
        import.meta.env.VITE_GROQ_API_KEY ?? "",

      timeout: 15000,

      priority: 1,

      streaming: true,

    },

    google: {

      name: "Google",

      endpoint:
        "https://generativelanguage.googleapis.com/v1beta/models",

      model:
        "gemini-2.5-pro",

      apiKey:
        import.meta.env.VITE_GOOGLE_API_KEY ?? "",

      timeout: 20000,

      priority: 2,

      streaming: true,

    },

    openrouter: {

      name: "OpenRouter",

      endpoint:
        "https://openrouter.ai/api/v1/chat/completions",

      model:
        import.meta.env.VITE_OPENROUTER_MODEL ??
        "openai/gpt-5.5",

      apiKey:
        import.meta.env.VITE_OPENROUTER_API_KEY ?? "",

      timeout: 20000,

      priority: 3,

      streaming: true,

      headers: {

        "HTTP-Referer":
          window.location.origin,

        "X-Title":
          "LÉLU",

      },

    },

    cerebras: {

      name: "Cerebras",

      endpoint:
        "https://api.cerebras.ai/v1/chat/completions",

      model:
        "llama-4-scout",

      apiKey:
        import.meta.env.VITE_CEREBRAS_API_KEY ?? "",

      timeout: 15000,

      priority: 4,

      streaming: true,

    },

    mistral: {

      name: "Mistral",

      endpoint:
        "https://api.mistral.ai/v1/chat/completions",

      model:
        "mistral-large-latest",

      apiKey:
        import.meta.env.VITE_MISTRAL_API_KEY ?? "",

      timeout: 20000,

      priority: 5,

      streaming: true,

    },

    fireworks: {

      name: "Fireworks",

      endpoint:
        "https://api.fireworks.ai/inference/v1/chat/completions",

      model:
        "accounts/fireworks/models/llama-v3p1-70b-instruct",

      apiKey:
        import.meta.env.VITE_FIREWORKS_API_KEY ?? "",

      timeout: 15000,

      priority: 6,

      streaming: true,

    },

  };

}