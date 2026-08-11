/**
 * ==========================================================
 * LÉLU
 * BRAIN RESOLVER
 * ==========================================================
 */

import type {
  AIResponse,
} from "../../providers/AIProvider";

import type RouterContext
  from "./RouterContext";

import type {
  BrainResult,
} from "./RouterResults";

import {
  isIdentityOrProfileQuestion,
} from "../../brain/LeluIdentity";


export default class BrainResolver {


  /**
   * Attempt to answer directly
   * from memory.
   */
  public async execute(

    context:
      RouterContext,

  ):
    Promise<BrainResult> {



    const prompt =

      context.request.prompt;





    const memories =

      await context.brain.recall(

        prompt,

      );



    context.recalledMemories =

      memories;





    if (

      memories.length === 0

    ) {


      // "Who are you?" and "Who am I?" must ALWAYS be answerable
      // from local persistent storage — even when no memory keyword
      // matched. Deterministic identity/profile answers never depend
      // on an external API being reachable.
      if (

        isIdentityOrProfileQuestion(

          prompt,

        )

      ) {


        return this.localAnswer(

          context,

        );

      }




      return {

        handled:

          false,

      };

    }





    const best =

      memories[0];





    if (

      best.confidence < 0.5

    ) {


      return {

        handled:

          false,

      };

    }





    const text =

      await context.brain.compose(

        prompt,

      );





    const response:

      AIResponse =

    {


      text,



      provider:

        "brain",



      model:

        "memory",



      processingTime:

        Date.now() -

        context.started,



      metadata:

      {

        source:

          "Brain",


        category:

          best.category,


        confidence:

          best.confidence,

      },

    };    context.logger.info(

      "BrainResolver",

      "Resolved from memory",

      {

        prompt,

      },

    );




    return {


      handled:

        true,


      response,

    };

  }





  /**
   * Compose a deterministic identity/profile answer from the
   * persistent local store (OfflineComposer) when the question
   * did not match any stored memory keyword.
   */
  private async localAnswer(

    context:
      RouterContext,

  ):
    Promise<BrainResult> {


    const text =

      await context.brain.compose(

        context.request.prompt,

      );



    const response:

      AIResponse =

    {


      text,



      provider:

        "brain",



      model:

        "memory",



      processingTime:

        Date.now() -

        context.started,



      metadata:

      {

        source:

          "Brain",


        category:

          "identity",


        confidence:

          1,

      },

    };



    context.logger.info(

      "BrainResolver",

      "Resolved identity from local storage",

      {

        prompt:

          context.request.prompt,

      },

    );




    return {


      handled:

        true,


      response,

    };

  }

}