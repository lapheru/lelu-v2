/**
 * ==========================================================
 * LÉLU
 * AI ROUTER
 * ==========================================================
 */

import type {
  AIResponse,
} from "../providers/AIProvider";

import type RouterContext
  from "./router/RouterContext";

import BrainResolver
  from "./router/BrainResolver";

import PlanningResolver
  from "./router/PlanningResolver";

import ReasoningResolver
  from "./router/ReasoningResolver";

import ResearchResolver
  from "./router/ResearchResolver";

import ProviderResolver
  from "./router/ProviderResolver";

import ResponseBuilder
  from "./router/ResponseBuilder";

export default class AIRouter {

  constructor(

    private readonly brain:
      BrainResolver,

    private readonly research:
      ResearchResolver,

    private readonly providers:
      ProviderResolver,

    private readonly planning =
      new PlanningResolver(),

    private readonly reasoning =
      new ReasoningResolver(),

    private readonly responses =
      new ResponseBuilder(),

  ) {}

  /**
   * Route an AI request.
   */
  public async route(
    context:
      RouterContext,
  ): Promise<AIResponse> {

    const brain =
      await this.brain.execute(
        context,
      );

    if (

      brain.handled &&

      brain.response

    ) {

      return brain.response;

    }

    await this.planning.execute(
      context,
    );

    await this.reasoning.execute(
      context,
    );

    const research =
      await this.research.execute(
        context,
      );

    if (

      research.handled

    ) {

      return this.attachThinking(

        context,

        this.responses.fromResearch(

          research.results,

          context.started,

        ),

      );

    }

    const provider =
      await this.providers.execute(
        context,
      );

    if (

      provider.handled &&

      provider.response

    ) {

      return this.attachThinking(

        context,

        provider.response,

      );

    }

    return this.attachThinking(

      context,

      this.responses.offline(

        context.started,

      ),

    );

  }

  /**
   * Surface the Planning/Reasoning
   * stage output on the outgoing
   * response, so the UI and the
   * Reflection stage can see *why*
   * Lélu answered the way it did —
   * without changing any provider's
   * own response contract.
   */
  private attachThinking(

    context:
      RouterContext,

    response:
      AIResponse,

  ):
    AIResponse {


    if (

      !context.reasoning &&

      !context.plan

    ) {

      return response;

    }


    return {

      ...response,

      metadata: {

        ...response.metadata,

        reasoning:
          context.reasoning,

        plan:
          context.plan,

      },

    };

  }

}