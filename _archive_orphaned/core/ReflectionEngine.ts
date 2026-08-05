/**
 * ==========================================================
 * LÉLU
 * REFLECTION ENGINE
 * ==========================================================
 */

import Brain
  from "../brain/Brain";

export interface Reflection {

  confidence:
    number;

  learned:
    boolean;

  repeatedQuestion:
    boolean;

  missingKnowledge:
    string[];

  reinforce:
    boolean;

  weaken:
    boolean;

  summary:
    string;

}

export default class ReflectionEngine {

  private readonly history =
    new Map<
      string,
      number
    >();

  constructor(

    private readonly brain:
      Brain,

  ) {}

  /**
   * Reflect on the completed interaction.
   */
  public async reflect(

    prompt: string,

    response: string,

  ): Promise<Reflection> {

    const repeated =
      this.record(
        prompt,
      );

    const confidence =
      await this.score(

        prompt,

        response,

      );

    const missing =
      this.findMissingKnowledge(
        prompt,
      );

    const reinforce =

      confidence >=
      0.70;

    const weaken =

      confidence <
      0.35;

    if (

      reinforce

    ) {

      const best = await this.brain.best(
        prompt,
      );

      if (

        best

      ) {

        this.brain.learn(

          prompt,

          response,

        );

      }

    }

    return {

      confidence,

      learned:
        true,

      repeatedQuestion:
        repeated,

      missingKnowledge:
        missing,

      reinforce,

      weaken,

      summary:
        this.summary(

          confidence,

          repeated,

          missing,

        ),

    };

  }

  /**
   * Track repeated prompts.
   */
  private record(
    prompt: string,
  ): boolean {

    const key =
      prompt
        .trim()
        .toLowerCase();

    const count =

      this.history.get(
        key,
      ) ?? 0;

    this.history.set(

      key,

      count + 1,

    );

    return count > 0;

  }

  /**
   * Estimate confidence.
   */
  private async score(

    prompt: string,

    response: string,

  ): Promise<number> {

    let score =
      0.50;

    if (

      await this.brain.knows(
        prompt,
      )

    ) {

      score +=
        0.25;

    }

    if (

      response.length >
      150

    ) {

      score +=
        0.10;

    }

    if (

      response.length >
      500

    ) {

      score +=
        0.10;

    }

    if (

      response.includes(
        "I don't know",
      ) ||

      response.includes(
        "No results",
      )

    ) {

      score -=
        0.40;

    }

    return Math.max(

      0,

      Math.min(
        1,
        score,
      ),

    );

  }

  /**
   * Guess missing knowledge.
   */
  private findMissingKnowledge(
    prompt: string,
  ): string[] {

    const missing:
      string[] = [];

    const text =
      prompt.toLowerCase();

    const keywords = [

      "latest",

      "today",

      "current",

      "news",

      "api",

      "documentation",

      "research",

      "version",

      "release",

    ];

    for (

      const word of
      keywords

    ) {

      if (

        text.includes(
          word,
        )

      ) {

        missing.push(
          word,
        );

      }

    }

    return missing;

  }

  /**
   * Reflection summary.
   */
  private summary(

    confidence:
      number,

    repeated:
      boolean,

    missing:
      string[],

  ): string {

    const parts:
      string[] = [];

    parts.push(

      `Confidence ${Math.round(confidence * 100)}%`,

    );

    if (

      repeated

    ) {

      parts.push(
        "Repeated question",
      );

    }

    if (

      missing.length >

      0

    ) {

      parts.push(

        `Missing: ${missing.join(", ")}`,

      );

    }

    if (

      parts.length ===
      1

    ) {

      parts.push(
        "No major issues detected",
      );

    }

    return parts.join(
      " | ",
    );

  }

}