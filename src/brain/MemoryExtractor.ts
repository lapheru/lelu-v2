/**
 * ==========================================================
 * LÉLU
 * MEMORY EXTRACTOR
 * ==========================================================
 */

import type {
  MemoryCategory,
} from "./ResponsePattern";





export interface ExtractedMemory {


  category:
    MemoryCategory;


  content:
    string;


  keywords:
    string[];


  importance:
    number;

}





export default class MemoryExtractor {


  public extract(

    prompt:
      string,


    response:
      string,

  ):
    ExtractedMemory[] {


    const memories:

      ExtractedMemory[] = [];





    const source =

      `${prompt}\n${response}`.trim();





    const identity =

      prompt.match(

        /(my name is|call me)\s+(.+)/i,

      );





    if (identity) {


      memories.push(

      {

        category:

          "identity",


        content:

          identity[2].trim(),


        keywords:

          this.keywords(

            identity[2],

          ),


        importance:

          1,

      });

    }





    const preference =

      prompt.match(

        /(i like|i love|i prefer|my favorite|favorite|i hate|i dislike)\s+(.+)/i,

      );





    if (preference) {


      memories.push(

      {

        category:

          "preference",


        content:

          preference[0].trim(),


        keywords:

          this.keywords(

            preference[0],

          ),


        importance:

          0.7,

      });

    }





    const goal =

      prompt.match(

        /(i want|my goal|i plan|trying to|need to)\s+(.+)/i,

      );





    if (goal) {


      memories.push(

      {

        category:

          "goal",


        content:

          goal[0].trim(),


        keywords:

          this.keywords(

            goal[0],

          ),


        importance:

          0.9,

      });

    }





    if (

      /building|creating|developing|project|app|business/i

      .test(source)

    ) {


      memories.push(

      {

        category:

          "project",


        content:

          prompt.trim(),


        keywords:

          this.keywords(

            prompt,

          ),


        importance:

          0.9,

      });

    }





    if (

      /i can|i know|i make|i build|skill|learned|work with/i

      .test(prompt)

    ) {


      memories.push(

      {

        category:

          "skill",


        content:

          prompt.trim(),


        keywords:

          this.keywords(

            prompt,

          ),


        importance:

          0.8,

      });

    }





    if (

      /friend|family|brother|sister|partner|relationship/i

      .test(prompt)

    ) {


      memories.push(

      {

        category:

          "relationship",


        content:

          prompt.trim(),


        keywords:

          this.keywords(

            prompt,

          ),


        importance:

          0.8,

      });

    }





    if (

      memories.length === 0 &&

      !this.isQuestion(prompt)

    ) {


      memories.push(

      {

        category:

          "conversation",


        content:

          prompt.trim(),


        keywords:

          this.keywords(

            prompt,

          ),


        importance:

          0.3,

      });

    }





    return memories;

  }





  private isQuestion(

    text:
      string,

  ):
    boolean {


    const clean =

      text.trim();





    return (

      /\?$/.test(clean)

      ||

      /^(what|who|where|when|why|how|is|are|do|does|can|could|would)\b/i

      .test(clean)

    );

  }





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