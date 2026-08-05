/**
 * ==========================================================
 * LÉLU
 * INFERENCE ENGINE
 * ==========================================================
 */

export interface Fact {

  id:
    string;

  statement:
    string;

  confidence:
    number;

}

export interface InferenceRule {

  id:
    string;

  name:
    string;

  description:
    string;

  apply(
    facts:
      Fact[],
  ):
    Fact[];

}

export default class InferenceEngine {

  private readonly facts =
    new Map<
      string,
      Fact
    >();

  private readonly rules =
    new Map<
      string,
      InferenceRule
    >();

  public remember(
    fact:
      Fact,
  ): void {

    this.facts.set(
      fact.id,
      fact,
    );

  }

  public register(
    rule:
      InferenceRule,
  ): void {

    this.rules.set(
      rule.id,
      rule,
    );

  }

  public infer():
    Fact[] {

    const known =

      Array.from(
        this.facts.values(),
      );

    const discovered:
      Fact[] = [];

    for (

      const rule of

      this.rules.values()

    ) {

      const produced =

        rule.apply(
          known,
        );

      for (

        const fact of
        produced

      ) {

        if (

          !this.facts.has(
            fact.id,
          )

        ) {

          this.facts.set(
            fact.id,
            fact,
          );

          discovered.push(
            fact,
          );

        }

      }

    }

    return discovered;

  }

  public get(
    id:
      string,
  ):
    Fact | undefined {

    return this.facts.get(
      id,
    );

  }

  public all():
    Fact[] {

    return Array.from(
      this.facts.values(),
    );

  }

  public clear():
    void {

    this.facts.clear();

    this.rules.clear();

  }

}