/**
 * ==========================================================
 * LÉLU
 * RESEARCH COORDINATOR
 * ==========================================================
 */

import Planner
  from "./Planner";

import ProviderQueue
  from "./ProviderQueue";

import ProviderRegistry
  from "./ProviderRegistry";

import type {
  KnowledgeResult,
} from "../providers/Provider";

export default class ResearchCoordinator {

  private readonly planner =
    new Planner();

  private readonly queue =
    new ProviderQueue();

  constructor(

    private readonly registry:
      ProviderRegistry,

  ) {}

  /**
   * Search every planned provider.
   */
  public async search(
    query: string,
  ): Promise<KnowledgeResult[]> {

    const providers =
      this.planner.plan(

        query,

        this.registry.all(),

      );

    const collected:
      KnowledgeResult[] = [];

    for (

      const provider of
      providers

    ) {

      try {

        const results =
          await this.queue.enqueue(

            provider,

            query,

          );

        collected.push(
          ...results,
        );

      }

      catch {

        /**
         * Ignore failed providers
         * and continue searching.
         */

      }

    }

    return this.clean(
      collected,
    );

  }

  /**
   * Remove duplicates
   * and rank results.
   */
  private clean(
    results:
      KnowledgeResult[],
  ): KnowledgeResult[] {

    const unique =
      new Map<
        string,
        KnowledgeResult
      >();

    for (

      const result of
      results

    ) {

      const key =

        result.url ??

        result.id;

      const existing =
        unique.get(
          key,
        );

      if (

        existing ===
        undefined ||

        result.confidence >
          existing.confidence

      ) {

        unique.set(
          key,
          result,
        );

      }

    }

    return Array

      .from(
        unique.values(),
      )

      .sort(

        (
          left,
          right,
        ) =>

          right.confidence -

          left.confidence,

      );

  }

}