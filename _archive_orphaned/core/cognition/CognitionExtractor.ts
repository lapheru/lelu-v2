/**
 * ==========================================================
 * LÉLU
 * COGNITION EXTRACTOR
 *
 * Converts conversation into structured understanding
 * ==========================================================
 */


export type CognitionType =

  | "project"

  | "goal"

  | "skill"

  | "preference"

  | "relationship"

  | "experience"

  | "idea"

  | "general";





export interface CognitiveInsight {


  type:
    CognitionType;


  content:
    string;


  entities:
    string[];


  confidence:
    number;


  createdAt:
    number;

}





export default class CognitionExtractor {



  /**
   * ==========================================================
   * Extract meaning from conversation
   * ==========================================================
   */
  public extract(

    text:
      string,

  ):
    CognitiveInsight[] {


    const value =

      text.trim();





    if (

      value.length === 0

    ) {


      return [];

    }





    const results:

      CognitiveInsight[] = [];





    const lower =

      value.toLowerCase();





    if (

      this.matches(

        lower,

        [

          "building",

          "creating",

          "developing",

          "making",

        ],

      )

    ) {


      results.push(

        this.create(

          "project",

          value,

          this.entities(value),

        ),

      );

    }





    if (

      this.matches(

        lower,

        [

          "want",

          "goal",

          "trying",

          "need to",

        ],

      )

    ) {


      results.push(

        this.create(

          "goal",

          value,

          this.entities(value),

        ),

      );

    }





    if (

      this.matches(

        lower,

        [

          "i know",

          "i learned",

          "i can",

          "i build",

        ],

      )

    ) {


      results.push(

        this.create(

          "skill",

          value,

          this.entities(value),

        ),

      );

    }





    if (

      this.matches(

        lower,

        [

          "like",

          "love",

          "prefer",

          "hate",

        ],

      )

    ) {


      results.push(

        this.create(

          "preference",

          value,

          this.entities(value),

        ),

      );

    }





    if (

      this.matches(

        lower,

        [

          "my friend",

          "my brother",

          "my sister",

          "my partner",

        ],

      )

    ) {


      results.push(

        this.create(

          "relationship",

          value,

          this.entities(value),

        ),

      );

    }





    if (

      results.length === 0

    ) {


      results.push(

        this.create(

          "general",

          value,

          this.entities(value),

        ),

      );

    }





    return results;

  }





  /**
   * ==========================================================
   * Keyword matcher
   * ==========================================================
   */
  private matches(

    text:
      string,


    words:
      string[],

  ):
    boolean {


    return words.some(

      word =>

        text.includes(word),

    );

  }





  /**
   * ==========================================================
   * Entity extraction
   * ==========================================================
   */
  private entities(

    text:
      string,

  ):
    string[] {


    return text

      .split(/\s+/)

      .filter(

        word =>

          word.length > 4,

      )

      .map(

        word =>

          word.replace(

            /[^a-zA-Z0-9]/g,

            "",

          ),

      )

      .slice(

        0,

        10,

      );

  }





  /**
   * ==========================================================
   * Create insight
   * ==========================================================
   */
  private create(

    type:
      CognitionType,


    content:
      string,


    entities:
      string[],

  ):
    CognitiveInsight {


    return {

      type,

      content,

      entities,

      confidence:

        0.7,


      createdAt:

        Date.now(),

    };

  }

}