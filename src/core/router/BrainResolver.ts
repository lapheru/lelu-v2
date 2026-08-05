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

    };





    context.logger.info(

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

}