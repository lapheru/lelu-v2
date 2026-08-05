/**
 * ==========================================================
 * LÉLU
 * WORLD MODEL
 * ==========================================================
 */

export type EntityType =

  | "person"

  | "place"

  | "organization"

  | "concept"

  | "project"

  | "technology"

  | "object"

  | "event"

  | "other";

export interface Entity {

  id:
    string;

  name:
    string;

  type:
    EntityType;

  description:
    string;

  confidence:
    number;

  tags:
    string[];

  createdAt:
    number;

  updatedAt:
    number;

}

export interface Relationship {

  id:
    string;

  source:
    string;

  target:
    string;

  type:
    string;

  weight:
    number;

  createdAt:
    number;

    updatedAt:
    number;

}

export default class WorldModel {

  private readonly entities =
    new Map<
      string,
      Entity
    >();

  private readonly relationships =
    new Map<
      string,
      Relationship
    >();

  /**
   * Add entity.
   */
  public addEntity(
    entity: Entity,
  ): void {

    this.entities.set(
      entity.id,
      entity,
    );

  }

  /**
   * Get entity.
   */
  public entity(
    id: string,
  ): Entity | undefined {

    return this.entities.get(
      id,
    );

  }

  /**
   * All entities.
   */
  public allEntities():
    Entity[] {

    return Array.from(
      this.entities.values(),
    );

  }

  /**
   * Search entities.
   */
  public search(
    query: string,
  ): Entity[] {

    const text =
      query.toLowerCase();

    return this.allEntities()

      .filter(

        entity =>

          entity.name
            .toLowerCase()
            .includes(text)

          ||

          entity.description
            .toLowerCase()
            .includes(text)

          ||

          entity.tags.some(

            tag =>

              tag
                .toLowerCase()
                .includes(text),

          ),

      );

  }

  /**
   * Connect entities.
   */
  public connect(
    relationship:
      Relationship,
  ): void {

    this.relationships.set(

      relationship.id,

      relationship,

    );

  }

  /**
   * Relationships.
   */
  public related(
    entityId: string,
  ): Relationship[] {

    return Array

      .from(

        this.relationships.values(),

      )

      .filter(

        edge =>

          edge.source ===
          entityId

          ||

          edge.target ===
          entityId,

      );

  }

  /**
   * Remove entity.
   */
  public removeEntity(
    id: string,
  ): void {

    this.entities.delete(
      id,
    );

    for (

      const edge of
      this.relationships.values()

    ) {

      if (

        edge.source === id

        ||

        edge.target === id

      ) {

        this.relationships.delete(
          edge.id,
        );

      }

    }

  }

  /**
   * Clear world.
   */
  public clear():
    void {

    this.entities.clear();

    this.relationships.clear();

  }

}