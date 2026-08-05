/**
 * ==========================================================
 * LÉLU
 * PROMPT BUILDER
 * ==========================================================
 */

export interface PromptBuilderOptions {

  system?: string;

  memory?: string;

  knowledge?: string;

  user: string;

}

export default class PromptBuilder {

  build(
    options: PromptBuilderOptions,
  ): string {

    return [

      "SYSTEM",

      options.system ??

        "You are Lélu, an intelligent AI companion.",

      "==============================",

      "MEMORY",

      options.memory ??

        "",

      "==============================",

      "KNOWLEDGE",

      options.knowledge ??

        "",

      "==============================",

      "USER",

      options.user,

    ]

      .filter(Boolean)

      .join("\n\n");

  }

}