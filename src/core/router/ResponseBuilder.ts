/**
 * ==========================================================
 * LÉLU
 * RESPONSE BUILDER
 * ==========================================================
 */

import type {
  AIResponse,
} from "../../providers/AIProvider";

import type {
  KnowledgeResult,
} from "../../providers/Provider";

export default class ResponseBuilder {

  /**
   * Build a response from
   * research results.
   */
  public fromResearch(
    results:
      KnowledgeResult[],
    started:
      number,
  ): AIResponse {

    if (
      results.length === 0
    ) {

      return {

        text:
          "No results found.",

        provider:
          "research",

        model:
          "knowledge",

        processingTime:

          Date.now() -
          started,

      };

    }

    const text =
      results

        .map(

          result =>

`${result.title}

${result.content}

${result.url ?? ""}`,

        )

        .join(
          "\n\n",
        );

    return {

      text,

      provider:
        "research",

      model:
        "knowledge",

      processingTime:

        Date.now() -
        started,

      metadata: {

        count:
          results.length,

      },

    };

  }

  /**
   * Build an offline response.
   */
  public offline(
    started:
      number,
  ): AIResponse {

    return {

      text:
        "Lélu could not generate a response.",

      provider:
        "offline",

      model:
        "offline",

      processingTime:

        Date.now() -
        started,

    };

  }

}