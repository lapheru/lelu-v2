/**
 * ==========================================================
 * LÉLU
 * MEMORY ENGINE
 * ==========================================================
 */

import LearningEngine
  from "./LearningEngine";

import PatternMemory
  from "./PatternMemory";

import type ResponsePattern
  from "./ResponsePattern";


export default class MemoryEngine {


  constructor(

    private readonly learning:
      LearningEngine,


    private readonly memory:
      PatternMemory,

  ) {}





  /**
   * ==========================================================
   * Learn and consolidate memory
   * ==========================================================
   */
  public async learn(

    prompt:
      string,


    response:
      string,

  ):
    Promise<ResponsePattern[]> {


    if (

      !this.isMeaningful(

        prompt,

      )

    ) {


      return [];

    }





    const existing =

      await this.findExisting(

        prompt,

      );





    if (

      existing

    ) {


      await this.learning.reinforce(

        existing.id,

      );



      return [

        existing,

      ];

    }





    const pattern =

      await this.learning.learn(

        prompt,

        response,

        "general",

        this.keywords(

          prompt,

        ),

        {

          source:

            "memory-engine",

        },

      );





    return [

      pattern,

    ];

  }





  /**
   * ==========================================================
   * Find matching memory
   * ==========================================================
   */
  private async findExisting(

    prompt:
      string,

  ):
    Promise<ResponsePattern | undefined> {


    const memories =

      await this.memory.search(

        prompt,

      );



    if (

      memories.length === 0

    ) {


      return undefined;

    }





    const best =

      memories[0];





    if (

      best.confidence >= 0.7

    ) {


      return best;

    }





    return undefined;

  }





  /**
   * ==========================================================
   * Determine if information is worth storing
   * ==========================================================
   */
  private isMeaningful(

    text:
      string,

  ):
    boolean {


    const value =

      text.trim()

        .toLowerCase();





    if (

      value.length < 4

    ) {


      return false;

    }





    if (

      this.isQuestion(

        value,

      )

    ) {


      return false;

    }





    return (

      /\b(my name is|call me|i am|i'm|i have|i like|i love|i hate|i want|i need|i build|i make|i created|i work|remember)\b/

        .test(

          value,

        )

    );

  }





  /**
   * ==========================================================
   * Ignore questions
   * ==========================================================
   */
  private isQuestion(

    text:
      string,

  ):
    boolean {


    return (

      /\?$/.test(

        text,

      )

      ||

      /^(what|who|where|when|why|how|is|are|do|does|can|could|would)\b/

        .test(

          text,

        )

    );

  }





  /**
   * ==========================================================
   * Recall
   * ==========================================================
   */
  public async recall(

    query:
      string,

  ):
    Promise<ResponsePattern[]> {


    return await this.memory.search(

      query,

    );

  }





  /**
   * ==========================================================
   * Keyword extraction
   * ==========================================================
   */
  private keywords(

    text:
      string,

  ):
    string[] {


    return text

      .toLowerCase()

      .replace(

        /[^a-z0-9\s]/g,

        "",

      )

      .split(

        /\s+/,

      )

      .filter(

        word =>

          word.length > 2,

      );

  }

}