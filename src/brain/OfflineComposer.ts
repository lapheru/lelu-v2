/**
 * ==========================================================
 * LÉLU
 * OFFLINE COMPOSER
 * ==========================================================
 */

import PatternMemory
  from "./PatternMemory";

import type ResponsePattern
  from "./ResponsePattern";


export default class OfflineComposer {


  constructor(

    private readonly memory:
      PatternMemory,

  ) {}





  /**
   * ==========================================================
   * Compose offline response
   * ==========================================================
   */
  public async compose(

    prompt:
      string,

  ):
    Promise<string> {


    const matches =

      await this.memory.search(

        prompt,

      );



    if (

      matches.length === 0

    ) {


      return this.defaultResponse(

        prompt,

      );

    }





    const best =

      this.pickBest(

        matches,

      );





    return this.composeFromPattern(

      best,

    );

  }





  /**
   * ==========================================================
   * Pick strongest memory
   * ==========================================================
   */
  private pickBest(

    matches:
      ResponsePattern[],

  ):
    ResponsePattern {


    return matches.sort(

      (

        a,

        b,

      ) => {


        const scoreA =

          a.confidence +

          a.importance +

          a.successfulUses;



        const scoreB =

          b.confidence +

          b.importance +

          b.successfulUses;



        return scoreB - scoreA;

      },

    )[0];

  }





  /**
   * ==========================================================
   * Convert memory into natural response
   * ==========================================================
   */
  private composeFromPattern(

    pattern:
      ResponsePattern,

  ):
    string {


    switch (

      pattern.category

    ) {



      case "identity":

        return this.identityResponse(

          pattern.response,

        );





      case "preference":

        return (

          `I remember you prefer: ${pattern.response}`

        );





      case "goal":

        return (

          `I remember your goal: ${pattern.response}`

        );





      case "project":

        return (

          `I remember you are working on: ${pattern.response}`

        );





      case "skill":

        return (

          `I remember this skill: ${pattern.response}`

        );





      default:

        return pattern.response;

    }

  }





  /**
   * ==========================================================
   * Identity formatting
   * ==========================================================
   */
  private identityResponse(

    value:
      string,

  ):
    string {


    const match =

      value.match(

        /(.+?)\s+call me\s+(.+)/i

      );



    if (

      match

    ) {


      return (

        `Your name is ${match[1].trim()}. I'll call you ${match[2].trim()}.`

      );

    }



    return (

      `Your name is ${value}.`

    );

  }





  /**
   * ==========================================================
   * Default response
   * ==========================================================
   */
  private defaultResponse(

    prompt:
      string,

  ):
    string {


    const message =

      prompt.trim();



    if (

      message.length === 0

    ) {


      return "I'm listening.";

    }



    return (

      `I don't have enough experience with "${message}" yet, but I'm learning.`

    );

  }





  /**
   * ==========================================================
   * Check knowledge
   * ==========================================================
   */
  public async hasKnowledge(

    prompt:
      string,

  ):
    Promise<boolean> {


    const matches =

      await this.memory.search(

        prompt,

      );



    return matches.length > 0;

  }





  /**
   * ==========================================================
   * Suggestions
   * ==========================================================
   */
  public async suggestions(

    prompt:
      string,

  ):
    Promise<string[]> {


    const matches =

      await this.memory.search(

        prompt,

      );



    return matches

      .slice(

        0,

        5,

      )

      .map(

        pattern =>

          pattern.response,

      );

  }

}