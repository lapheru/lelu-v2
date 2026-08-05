/**
 * ==========================================================
 * LÉLU
 * DECISION EXECUTOR
 * ==========================================================
 */

import Brain
  from "../brain/Brain";

import ResearchCoordinator
  from "./ResearchCoordinator";

import AIProviderRegistry
  from "./AIProviderRegistry";

import type {
  AIRequest,
  AIResponse,
} from "../providers/AIProvider";

import type {
  DecisionResult,
} from "./DecisionEngine";

export default class DecisionExecutor {

  constructor(

    private readonly brain:
      Brain,

    private readonly research:
      ResearchCoordinator,

    private readonly providers:
      AIProviderRegistry,

  ) {}

  /**
   * Execute a routing decision.
   */
  public async execute(

    request:
      AIRequest,

    decision:
      DecisionResult,

  ): Promise<AIResponse> {

    if (

      decision.decision ===
      "memory"

    ) {

      return {

        text:
          await this.brain.compose(
            request.prompt,
          ),

        provider:
          "brain",
        model:
          "memory",
        processingTime: 0,
      };

    }

    if (

      decision.decision ===
      "research"

    ) {

      const results =
        await this.research.search(
          request.prompt,
        );

      return {

        text:

          results.length === 0

            ? "No results found."

            : results

                .map(

                  result =>

`${result.title}

${result.content}

${result.url ?? ""}`,

                )

                .join("\n\n"),

        provider:
          "research",

        model:
          "knowledge",
        processingTime: 0,
      };

    }

    const available =
      await this.providers.available();

    for (

      const provider of
      available

    ) {

      if (

        !provider.canHandle(
          request.prompt,
        )

      ) {

        continue;

      }

      try {

        return await provider.generate(
          request,
        );

      }

      catch {

        continue;

      }

    }

    if (

      decision.decision ===
      "hybrid"

    ) {

      const memory =
        await this.brain.compose(
          request.prompt,
        );

      const results =
        await this.research.search(
          request.prompt,
        );

      return {

        text:

`${memory}

${
results

  .map(

    result =>

`${result.title}

${result.content}`,

  )

  .join("\n\n")
}`,

        provider:
          "hybrid",

        model:
          "brain+research",
        processingTime: 0,
      };

    }

    return {

      text:
        "Lélu could not generate a response.",

      provider:
        "offline",
      model:
        "offline",
      processingTime: 0,
    };

  }

}