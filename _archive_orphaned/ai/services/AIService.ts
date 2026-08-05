/**
 * ==========================================================
 * LÉLUVERSE
 * AI SERVICE
 * ==========================================================
 */

import type AIResponse
  from "../models/AIResponse";

export interface AIProvider {

  generate(
    prompt: string,
  ): Promise<AIResponse>;

}

export default class AIService {

  private provider?:
    AIProvider;

  setProvider(
    provider: AIProvider,
  ): void {

    this.provider =
      provider;

  }

  getProvider():
    | AIProvider
    | undefined {

    return this.provider;

  }

  hasProvider():
    boolean {

    return this.provider !==
      undefined;

  }

  async generate(

    prompt: string,

  ): Promise<AIResponse> {

    if (

      !this.provider

    ) {

      return {

        text:
          "No AI provider is connected.",

        model:
          "none",

        timestamp:
          Date.now(),

      };

    }

    try {

      return await

        this.provider.generate(

          prompt,

        );

    }

    catch (

      error

    ) {

      return {

        text:

          error instanceof Error

            ? error.message

            : "Unknown AI error.",

        model:
          "error",

        timestamp:
          Date.now(),

      };

    }

  }

}