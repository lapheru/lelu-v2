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
        "I'm in offline mode right now — all AI providers are unreachable or unconfigured, so I can't generate new answers. My local memory, your profile and our shared history are still here and I'm still recording this conversation locally. Try asking \"who are you\", \"who am I\", or about something we've discussed.",

      provider:
        "offline",

      model:
        "offline",

      processingTime:

        Date.now() -
        started,

      metadata: {

        success:
          false,

        reason:
          "all-ai-providers-failed",

        offline:
          true,

        identity:
          true,

        memory:
          true,

      },

    };

  }

}