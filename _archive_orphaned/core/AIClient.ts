/**
 * ==========================================================
 * LÉLU
 * AI CLIENT
 * ==========================================================
 */

import AIProviderRouter
  from "./AIProviderRouter";

import GroqProvider
  from "./GroqProvider";

import GeminiAdapter
  from "./adapters/GeminiAdapter";

import OpenRouterAdapter
  from "./adapters/OpenRouterAdapter";


export default class AIClient {

  private readonly router =
    new AIProviderRouter();


  private readonly groq =
    new GroqProvider();


  private readonly gemini =
    new GeminiAdapter();


  private readonly openRouter =
    new OpenRouterAdapter();


  private groqInitialized =
    false;



  private async initializeGroq():
    Promise<void> {

    if (
      this.groqInitialized
    ) {

      return;

    }


    await this.groq.initialize();


    this.groqInitialized =
      true;

  }



  async chat(
    prompt: string,
  ):
    Promise<string> {


    let provider =
      this.router.select(
        prompt,
      );


    const attempted =
      new Set<string>();


    let lastError:
      unknown;



    while (
      !attempted.has(provider)
    ) {

      attempted.add(
        provider,
      );


      try {

        switch (provider) {


          case "groq": {

            await this.initializeGroq();


            const request = {

              prompt,

            };


            const response =
              await this.groq.generate(
                request,
              );


            if (
              !response ||
              typeof response.text !==
                "string"
            ) {

              throw new Error(
                "Groq returned an invalid AI response.",
              );

            }


            return response.text;

          }



          case "openrouter":

            return await this.openRouter.chat(
              prompt,
            );



          case "google":

            return await this.gemini.chat(
              prompt,
            );



          default:

            provider =
              this.router.fallback(
                provider,
              );

            continue;

        }


      } catch (error) {

        lastError =
          error;


        console.error(

          `[AIClient] ${provider} failed`,

          error,

        );


        provider =
          this.router.fallback(
            provider,
          );

      }

    }



    if (
      lastError instanceof Error
    ) {

      throw new Error(

        `All AI providers failed. Last error: ${lastError.message}`,

      );

    }



    throw new Error(
      "No AI providers available.",
    );

  }

}