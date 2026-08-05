/**
 * ==========================================================
 * LÉLU
 * PROVIDER RESOLVER
 * ==========================================================
 *
 * Responsibilities:
 * - Obtain initialized/available AI providers
 * - Try providers in registry priority order
 * - Respect provider capability routing
 * - Pass the complete AIRequest to the provider
 * - Normalize AIProvider responses
 * - Fall through to the next provider on failure
 * - Return a deterministic offline response if all fail
 */

import type AIProvider
  from "../../providers/AIProvider";

import type {
  AIResponse,
} from "../../providers/AIProvider";

import type RouterContext
  from "./RouterContext";

import type {
  ProviderResult,
} from "./RouterResults";


export default class ProviderResolver {


  /**
   * ========================================================
   * Execute provider resolution
   * ========================================================
   */
  public async execute(

    context:
      RouterContext,

  ):
    Promise<ProviderResult> {


    const providers =
      await context.aiProviders.available();



    if (
      providers.length === 0
    ) {

      context.logger.error(

        "ProviderResolver",

        "No AI providers are available.",

      );


      return {

        handled:
          true,

        response:
          this.offline(
            context.started,
          ),

      };

    }



    for (
      const provider of providers
    ) {


      if (
        !provider.canHandle(
          context.request.prompt,
        )
      ) {

        context.logger.info(

          "ProviderResolver",

          `${provider.name} cannot handle request.`,

        );


        continue;

      }



      try {

        context.logger.info(

          "ProviderResolver",

          `Trying ${provider.name}`,

          {

            promptLength:
              context.request.prompt.length,

            provider:
              provider.name,

            model:
              context.request.model,

          },

        );



        const response =
          await this.executeProvider(

            provider,

            context,

          );



        if (
          response.text.trim().length > 0
        ) {

          context.logger.info(

            "ProviderResolver",

            `${provider.name} generated response`,

            {

              provider:
                response.provider,

              model:
                response.model,

              processingTime:
                response.processingTime,

              responseLength:
                response.text.length,

            },

          );


          return {

            handled:
              true,

            response,

          };

        }



        throw new Error(

          `${provider.name} returned an empty response.`,

        );

      }


      catch (
        error
      ) {

        const message =
          error instanceof Error
            ? error.message
            : String(error);



        context.logger.error(

          "ProviderResolver",

          `${provider.name} failed, trying next provider.`,

          {

            provider:
              provider.name,

            error:
              message,

          },

        );


        continue;

      }

    }



    context.logger.error(

      "ProviderResolver",

      "All available AI providers failed.",

    );


    return {

      handled:
        true,

      response:
        this.offline(
          context.started,
        ),

    };

  }



  /**
   * ========================================================
   * Execute one provider
   * ========================================================
   */
  private async executeProvider(

    provider:
      AIProvider,

    context:
      RouterContext,

  ):
    Promise<AIResponse> {


    const started =
      Date.now();



    const response =
      await provider.generate(

        context.request,

      );



    if (
      !response ||
      typeof response.text !==
        "string"
    ) {

      throw new Error(

        `${provider.name} returned an invalid response.`,

      );

    }



    const text =
      response.text.trim();



    if (
      !text
    ) {

      throw new Error(

        `${provider.name} returned empty response text.`,

      );

    }



    return {

      ...response,

      text,

      provider:
        response.provider ||
        provider.name,

      model:
        response.model ||
        "unknown",

      processingTime:
        response.processingTime > 0
          ? response.processingTime
          : Date.now() -
            started,

    };

  }



  /**
   * ========================================================
   * Offline fallback
   * ========================================================
   */
  private offline(

    started:
      number,

  ):
    AIResponse {


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

      metadata: {

        success:
          false,

        reason:
          "all-ai-providers-failed",

      },

    };

  }

}