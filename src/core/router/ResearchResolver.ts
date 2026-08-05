/**
 * ==========================================================
 * LÉLU
 * RESEARCH RESOLVER
 * ==========================================================
 */

import type {
  AIIntent,
} from "./AIIntent";

import type RouterContext
  from "./RouterContext";

import type {
  ResearchResult,
} from "./RouterResults";

import IntentDetector
  from "./IntentDetector";

export default class ResearchResolver {

  private readonly detector =
    new IntentDetector();

  /**
   * Resolve research requests.
   *
   * Knowledge providers are
   * not connected yet.
   */
  public async execute(
    context:
      RouterContext,
  ): Promise<ResearchResult> {

    const intent:
      AIIntent =
        this.detector.detect(
          context.request.prompt,
        );

    if (
      intent !==
      "search"
    ) {

      return {

        handled:
          false,

        results:
          [],

      };

    }

    context.logger.info(

      "ResearchResolver",

      "Knowledge providers not connected.",

    );

    return {

      handled:
        false,

      results:
        [],

    };

  }

}