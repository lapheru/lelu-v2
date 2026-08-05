/**
 * ==========================================================
 * LÉLU
 * ATTENTION ENGINE
 * ==========================================================
 */

export interface AttentionItem {

  id:
    string;

  source:
    string;

  value:
    unknown;

  priority:
    number;

  confidence:
    number;

  timestamp:
    number;

}

export default class AttentionEngine {

  private readonly items =
    new Map<
      string,
      AttentionItem
    >();

  /**
   * Add or update focus.
   */
  public focus(
    item: AttentionItem,
  ): void {

    this.items.set(
      item.id,
      item,
    );

  }

  /**
   * Highest priority item.
   */
  public primary():
    AttentionItem | undefined {

    return this.all()[0];

  }

  /**
   * Ranked attention.
   */
  public all():
    AttentionItem[] {

    return Array

      .from(
        this.items.values(),
      )

      .sort(

        (
          left,
          right,
        ) => {

          const scoreA =

            left.priority *
            left.confidence;

          const scoreB =

            right.priority *
            right.confidence;

          return (
            scoreB -
            scoreA
          );

        },

      );

  }

  /**
   * Top N items.
   */
  public top(
    count = 5,
  ): AttentionItem[] {

    return this
      .all()
      .slice(
        0,
        count,
      );

  }

  /**
   * Remove an item.
   */
  public remove(
    id: string,
  ): void {

    this.items.delete(
      id,
    );

  }

  /**
   * Whether focused.
   */
  public has(
    id: string,
  ): boolean {

    return this.items.has(
      id,
    );

  }

  /**
   * Clear attention.
   */
  public clear():
    void {

    this.items.clear();

  }

}