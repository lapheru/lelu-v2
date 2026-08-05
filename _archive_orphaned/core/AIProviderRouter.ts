/**
 * ==========================================================
 * LÉLU
 * AI PROVIDER ROUTER
 * ==========================================================
 */

export type AIProvider =

  | "openrouter"
  | "groq"
  | "google"
  | "cerebras"
  | "mistral"
  | "fireworks";


export default class AIProviderRouter {


  private readonly providers: AIProvider[] = [

    "openrouter",

    "groq",

    "google",

    "cerebras",

    "mistral",

    "fireworks",

  ];



  select(
    input: string,
  ): AIProvider {


    const text =
      input.toLowerCase();



    if (

      text.includes("gemini") ||

      text.includes("google")

    ) {

      return "google";

    }



    if (

      text.includes("groq")

    ) {

      return "groq";

    }



    if (

      text.includes("openrouter")

    ) {

      return "openrouter";

    }



    if (

      text.includes("cerebras")

    ) {

      return "cerebras";

    }



    if (

      text.includes("mistral")

    ) {

      return "mistral";

    }



    if (

      text.includes("fireworks")

    ) {

      return "fireworks";

    }



    // Default Lélu brain

    return "openrouter";

  }



  fallback(
    current: AIProvider,
  ): AIProvider {


    const index =
      this.providers.indexOf(
        current,
      );


    return this.providers[

      (index + 1) %

      this.providers.length

    ];

  }



  all(): AIProvider[] {

    return [

      ...this.providers,

    ];

  }

}