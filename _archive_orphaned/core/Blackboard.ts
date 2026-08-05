/**
 * ==========================================================
 * LÉLU
 * BLACKBOARD
 * ==========================================================
 */

export interface BlackboardEntry {

  id:
    string;

  category:
    string;

  value:
    unknown;

  confidence:
    number;

  source:
    string;

  createdAt:
    number;

  updatedAt:
    number;

}

export default class Blackboard {

  private readonly entries =
    new Map<
      string,
      BlackboardEntry
    >();

  /**
   * Publish.
   */
  public publish(

    entry:
      BlackboardEntry,

  ): void {

    this.entries.set(

      entry.id,

      entry,

    );

  }

  /**
   * Read.
   */
  public read(

    id:
      string,

  ): BlackboardEntry | undefined {

    return this.entries.get(
      id,
    );

  }

  /**
   * Read category.
   */
  public category(

    category:
      string,

  ): BlackboardEntry[] {

    return Array

      .from(
        this.entries.values(),
      )

      .filter(

        entry =>

          entry.category ===
          category,

      );

  }

  /**
   * Search.
   */
  public search(

    query:
      string,

  ): BlackboardEntry[] {

    const text =
      query.toLowerCase();

    return Array

      .from(
        this.entries.values(),
      )

      .filter(

        entry =>

          JSON.stringify(
            entry.value,
          )

          .toLowerCase()

          .includes(
            text,
          ),

      );

  }

  /**
   * Remove.
   */
  public remove(

    id:
      string,

  ): void {

    this.entries.delete(
      id,
    );

  }

  /**
   * Entries.
   */
  public all():
    BlackboardEntry[] {

    return Array.from(
      this.entries.values(),
    );

  }

  /**
   * Clear.
   */
  public clear():
    void {

    this.entries.clear();

  }

}