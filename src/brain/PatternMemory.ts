/**
 * ==========================================================
 * LÉLU
 * PATTERN MEMORY
 * ==========================================================
 */

import type ResponsePattern
  from "./ResponsePattern";

import IndexedDBStore
  from "../core/memory/IndexedDBStore";

import type {
  MemoryRecord,
} from "../core/memory/MemoryStore";


export default class PatternMemory {


  private readonly patterns =
    new Map<string, ResponsePattern>();


  private readonly store =
    new IndexedDBStore();


  private initialized =
    false;





  public async initialize():
    Promise<void> {


    if (
      this.initialized
    ) {

      return;

    }



    const memories =
      await this.store.all(

        "user",

      );



    for (

      const memory of memories

    ) {


      const metadata =
        memory.metadata ?? {};



      const pattern:
        ResponsePattern =
      {

        id:
          memory.id,


        category:

          metadata.category ??

          "general",


        prompt:

          metadata.prompt ??

          memory.title,


        response:

          memory.content,


        intent:

          metadata.intent ??

          "general",


        keywords:

          memory.tags ?? [],


        context:

          metadata.context ??

          {},


        importance:

          memory.importance ?? 0.3,


        confidence:

          metadata.confidence ??

          0.5,


        successfulUses:
          1,


        failedUses:
          0,


        createdAt:
          memory.created,


        updatedAt:
          memory.updated,

      };



      this.patterns.set(

        pattern.id,

        pattern,

      );

    }



    this.initialized =
      true;

  }





  public async add(

    pattern:
      ResponsePattern,

  ):
    Promise<void> {


    await this.initialize();



    this.patterns.set(

      pattern.id,

      pattern,

    );



    const memory:
      MemoryRecord =
    {


      id:
        pattern.id,


      space:
        "user",


      title:
        pattern.prompt,


      content:
        pattern.response,


      tags:
        pattern.keywords,


      importance:
        pattern.importance,


      created:
        pattern.createdAt,


      updated:
        pattern.updatedAt,


      metadata:
      {

        category:
          pattern.category,


        prompt:
          pattern.prompt,


        intent:
          pattern.intent,


        context:
          pattern.context,


        confidence:
          pattern.confidence,

      },

    };



    await this.store.save(

      memory,

    );

  }





  public get(

    id:
      string,

  ):
    ResponsePattern | undefined {


    return this.patterns.get(

      id,

    );

  }





  public async update(

    pattern:
      ResponsePattern,

  ):
    Promise<void> {


    await this.add(

      pattern,

    );

  }





  public async remove(

    id:
      string,

  ):
    Promise<boolean> {


    const removed =

      this.patterns.delete(

        id,

      );



    await this.store.delete(

      id,

    );



    return removed;

  }





  public async clear():
    Promise<void> {


    this.patterns.clear();



    await this.store.clear();

  }





  public getAll():
    ResponsePattern[] {


    return [

      ...this.patterns.values(),

    ];

  }





  public async search(

    prompt:
      string,

  ):
    Promise<ResponsePattern[]> {


    await this.initialize();



    const query =

      prompt

        .toLowerCase()

        .replace(

          /[^a-z0-9\s]/g,

          "",

        );



    const words =

      query

        .split(/\s+/)

        .filter(

          word =>

            word.length > 2,

        );





    return this.getAll()

      .map(

        pattern => {


          let score = 0;



          const searchable =

            (

              pattern.prompt +

              " " +

              pattern.response +

              " " +

              pattern.keywords.join(" ")

            )

            .toLowerCase();





          for (

            const word of words

          ) {


            if (

              searchable.includes(word)

            ) {

              score += 5;

            }

          }





          if (

            searchable.includes(query)

          ) {

            score += 20;

          }





          if (

            pattern.category === "conversation"

          ) {

            score -= 2;

          }





          score +=

            pattern.confidence;



          return {

            pattern,

            score,

          };

        },

      )

      .filter(

        item =>

          item.score >= 5,

      )

      .sort(

        (

          a,

          b,

        ) =>

          b.score -

          a.score,

      )

      .map(

        item =>

          item.pattern,

      );

  }

}