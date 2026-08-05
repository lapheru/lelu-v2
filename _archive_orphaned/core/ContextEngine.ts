/**
 * ==========================================================
 * LÉLU
 * CONTEXT ENGINE
 * ==========================================================
 */

export interface Context {

  id:
    string;

  name:
    string;

  value:
    unknown;

  confidence:
    number;

  source:
    string;

  timestamp:
    number;

  expiresAt?:
    number;

}

export default class ContextEngine {

  private readonly contexts =
    new Map<
      string,
      Context
    >();

  /**
   * Store context.
   */
  public set(
    context: Context,
  ): void {

    this.contexts.set(
      context.id,
      context,
    );

  }

  /**
   * Retrieve context.
   */
  public get(
    id: string,
  ): Context | undefined {

    return this.contexts.get(
      id,
    );

  }

  /**
   * Check existence.
   */
  public has(
    id: string,
  ): boolean {

    return this.contexts.has(
      id,
    );

  }

  /**
   * Remove expired contexts.
   */
  public prune(): void {

    const now =
      Date.now();

    for (

      const context of
      this.contexts.values()

    ) {

      if (

        context.expiresAt !==
          undefined &&

        context.expiresAt <
          now

      ) {

        this.contexts.delete(
          context.id,
        );

      }

    }

  }

  /**
   * Active contexts.
   */
  public active():
    Context[] {

    this.prune();

    return Array
      .from(
        this.contexts.values(),
      )
      .sort(

        (
          left,
          right,
        ) =>

          right.confidence -

          left.confidence,

      );

  }

  /**
   * Search contexts.
   */
  public search(
    query: string,
  ): Context[] {

    const text =
      query.toLowerCase();

    return this.active()

      .filter(

        context =>

          context.name
            .toLowerCase()
            .includes(text)

          ||

          JSON.stringify(
            context.value,
          )
            .toLowerCase()
            .includes(text),

      );

  }

  /**
   * Remove context.
   */
  public remove(
    id: string,
  ): void {

    this.contexts.delete(
      id,
    );

  }

  /**
   * Clear everything.
   */
  public clear():
    void {

    this.contexts.clear();

  }

}