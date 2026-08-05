/**
 * ==========================================================
 * LÉLU
 * ENTITY MEMORY
 *
 * Persistent world model entities
 * ==========================================================
 */


export type EntityType =

  | "person"

  | "project"

  | "goal"

  | "skill"

  | "preference"

  | "experience"

  | "relationship"

  | "idea"

  | "agent"

  | "workspace"

  | "concept"

  | "general";





export interface Entity {


  id:
    string;


  type:
    EntityType;


  name:
    string;


  attributes:
    Record<string, unknown>;


  createdAt:
    number;


  updatedAt:
    number;

}





export default class EntityMemory {


  private readonly entities:

    Map<string, Entity> =

      new Map();





  public create(

    type:
      EntityType,


    name:
      string,


    attributes:

      Record<string, unknown> = {},

  ):
    Entity {


    const entity: Entity =

    {

      id:

        crypto.randomUUID(),


      type,


      name,


      attributes,


      createdAt:

        Date.now(),


      updatedAt:

        Date.now(),

    };





    this.entities.set(

      entity.id,

      entity,

    );





    return entity;

  }





  public update(

    id:
      string,


    attributes:
      Record<string, unknown>,

  ):
    void {


    const entity =

      this.entities.get(

        id,

      );





    if (!entity) {

      return;

    }





    entity.attributes =

    {

      ...entity.attributes,

      ...attributes,

    };





    entity.updatedAt =

      Date.now();

  }





  public get(

    id:
      string,

  ):
    Entity | undefined {


    return this.entities.get(

      id,

    );

  }





  public search(

    query:
      string,

  ):
    Entity[] {


    const value =

      query.toLowerCase();





    return Array.from(

      this.entities.values(),

    )

    .filter(

      entity =>

        entity.name

          .toLowerCase()

          .includes(value),

    );

  }





  public all():

    Entity[] {


    return Array.from(

      this.entities.values(),

    );

  }





  public remove(

    id:
      string,

  ):
    void {


    this.entities.delete(

      id,

    );

  }

}