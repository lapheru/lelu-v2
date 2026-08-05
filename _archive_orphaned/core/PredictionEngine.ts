/**
 * ==========================================================
 * LÉLU
 * PREDICTION ENGINE
 * ==========================================================
 */

export interface Prediction {

  id:
    string;

  description:
    string;

  confidence:
    number;

  source:
    string;

  createdAt:
    number;

}

export default class PredictionEngine {

  private readonly predictions =
    new Map<
      string,
      Prediction
    >();

  /**
   * Store prediction.
   */
  public add(
    prediction: Prediction,
  ): void {

    this.predictions.set(
      prediction.id,
      prediction,
    );

  }

  /**
   * Lookup.
   */
  public get(
    id: string,
  ): Prediction | undefined {

    return this.predictions.get(
      id,
    );

  }

  /**
   * Highest confidence.
   */
  public best():
    Prediction | undefined {

    return this.all()[0];

  }

  /**
   * All predictions.
   */
  public all():
    Prediction[] {

    return Array

      .from(
        this.predictions.values(),
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
   * Remove.
   */
  public remove(
    id: string,
  ): void {

    this.predictions.delete(
      id,
    );

  }

  /**
   * Clear.
   */
  public clear():
    void {

    this.predictions.clear();

  }

}