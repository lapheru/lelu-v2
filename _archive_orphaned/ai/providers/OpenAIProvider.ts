/**
 * ==========================================================
 * LÉLUVERSE
 * OPENAI PROVIDER
 * ==========================================================
 */

import type AIResponse
  from "../models/AIResponse";

import type {
  AIProvider,
}
  from "../services/AIService";

export interface OpenAIProviderOptions {

  apiKey: string;

  model?: string;

}

export default class OpenAIProvider
  implements AIProvider {

  private readonly apiKey:
    string;

  private readonly model:
    string;

  constructor(
    options:
      OpenAIProviderOptions,
  ) {

    this.apiKey =
      options.apiKey;

    this.model =

      options.model ??

      "gpt-5.5";

  }

  async generate(

    prompt: string,

  ): Promise<AIResponse> {

    const response =

      await fetch(

        "https://api.openai.com/v1/chat/completions",

        {

          method:
            "POST",

          headers: {

            Authorization:

              `Bearer ${this.apiKey}`,

            "Content-Type":

              "application/json",

          },

          body:

            JSON.stringify({

              model:
                this.model,

              messages: [

                {

                  role:
                    "system",

                  content:

                    "You are Lélu, an intelligent AI companion.",

                },

                {

                  role:
                    "user",

                  content:
                    prompt,

                },

              ],

            }),

        },

      );

    if (

      !response.ok

    ) {

      throw new Error(

        `OpenAI Error ${response.status}`,

      );

    }

    const data =

      await response.json();

    return {

      text:

        data.choices?.[0]
          ?.message
          ?.content ??

        "",

      model:

        data.model ??

        this.model,

      timestamp:
        Date.now(),

      promptTokens:

        data.usage
          ?.prompt_tokens,

      completionTokens:

        data.usage
          ?.completion_tokens,

      totalTokens:

        data.usage
          ?.total_tokens,

      finishReason:

        data.choices?.[0]
          ?.finish_reason,

    };

  }

}