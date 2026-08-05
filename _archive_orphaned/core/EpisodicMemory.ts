/**
 * ==========================================================
 * LÉLU
 * EPISODIC MEMORY
 * ==========================================================
 */

export interface Episode {

  id:
    string;

  title:
    string;

  summary:
    string;

  participants:
    string[];

  tags:
    string[];

  importance:
    number;

  timestamp:
    number;

  metadata:
    Record<
      string,
      unknown
    >;

}

export default class EpisodicMemory {

  private readonly episodes =
    new Map<
      string,
      Episode
    >();

  /**
   * Store episode.
   */
  public remember(
    episode: Episode,
  ): void {

    this.episodes.set(

      episode.id,

      episode,

    );

  }

  /**
   * Recall episode.
   */
  public recall(
    id: string,
  ): Episode | undefined {

    return this.episodes.get(
      id,
    );

  }

  /**
   * Search.
   */
  public search(
    query: string,
  ): Episode[] {

    const text =
      query.toLowerCase();

    return this.all()

      .filter(

        episode =>

          episode.title
            .toLowerCase()
            .includes(text)

          ||

          episode.summary
            .toLowerCase()
            .includes(text)

          ||

          episode.tags.some(

            tag =>

              tag
                .toLowerCase()
                .includes(text),

          ),

      );

  }

  /**
   * Recent episodes.
   */
  public recent(
    limit = 10,
  ): Episode[] {

    return this.all()

      .slice(0, limit);

  }

  /**
   * All episodes.
   */
  public all():
    Episode[] {

    return Array

      .from(
        this.episodes.values(),
      )

      .sort(

        (
          left,
          right,
        ) =>

          right.timestamp -
          left.timestamp,

      );

  }

  /**
   * Forget episode.
   */
  public forget(
    id: string,
  ): void {

    this.episodes.delete(
      id,
    );

  }

  /**
   * Clear.
   */
  public clear():
    void {

    this.episodes.clear();

  }

}