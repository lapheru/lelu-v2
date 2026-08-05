/**
 * ==========================================================
 * LÉLU
 * KNOWLEDGE ROUTER
 * ==========================================================
 */

import Planner
  from "./Planner";

import ProviderQueue
  from "./ProviderQueue";

import type Provider
  from "../providers/Provider";

import type {
  KnowledgeResult,
} from "../providers/Provider";

export default class KnowledgeRouter {

  private readonly planner =
    new Planner();

  private readonly queue =
    new ProviderQueue();

  private readonly providers:
    Provider[] = [];

  /**
   * Register a provider.
   */
  public register(

    provider:
      Provider,

  ): void {

    this.providers.push(
      provider,
    );

  }

  /**
   * Remove a provider.
   */
  public unregister(

    name:
      string,

  ): void {

    const index =
      this.providers.findIndex(

        provider =>

          provider.name ===
          name,

      );

    if (

      index >= 0

    ) {

      this.providers.splice(

        index,

        1,

      );

    }

  }

  /**
   * Registered providers.
   */
  public getProviders():
    readonly Provider[] {

    return this.providers;

  }

  /**
   * Route a search request.
   */
  public async search(

    query:
      string,

  ): Promise<
    KnowledgeResult[]
  > {

    const plan =
      this.planner.plan(

        query,

        this.providers,

      );

    const collected:
      KnowledgeResult[] = [];

    for (

      const provider of
      plan

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
         * Continue with the
         * next provider.
         */

      }

    }

    return this.rank(
      collected,
    );

  }

  /**
   * Rank and deduplicate.
   */
  private rank(

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