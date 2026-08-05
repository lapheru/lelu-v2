/**
 * ==========================================================
 * LÉLU
 * PLANNER
 * ==========================================================
 */

import type Provider
  from "../providers/Provider";

export default class Planner {

  /**
   * Build an execution plan.
   */
  public plan(

    query: string,

    providers:
      readonly Provider[],

  ): Provider[] {

    const normalized =
      query
        .trim()
        .toLowerCase();

    return providers

      .filter(

        provider =>

          provider.enabled &&

          provider.canSearch(
            normalized,
          ),

      )

      .sort(

        (
          left,
          right,
        ) =>

          this.score(
            right,
            normalized,
          ) -

          this.score(
            left,
            normalized,
          ),

      );

  }

  /**
   * Score a provider.
   */
  private score(

    provider:
      Provider,

    query:
      string,

  ): number {

    let score =
      provider.priority;

    for (

      const capability of
      provider.capabilities

    ) {

      if (

        query.includes(

          capability.toLowerCase(),

        )

      ) {

        score += 100;

      }

    }

    if (

      !provider.requiresApiKey

    ) {

      score += 25;

    }

    score += Math.max(

      0,

      1000 -
      provider.timeout,

    ) / 100;

    return score;

  }

}