/**
 * ==========================================================
 * LÉLU
 * OPENROUTER PROVIDER
 * ==========================================================
 */

import type AIProvider from "./AIProvider";

import type {
  AIRequest,
  AIResponse,
  AIProviderHealth,
} from "./AIProvider";


export default class OpenRouterProvider
  implements AIProvider {


  readonly name =
    "OpenRouter";


  /**
   * Disabled temporarily.
   * Groq is the active engine.
   */
  readonly priority =
    99;


  readonly enabled =
    false;


  readonly timeout =
    30000;


  readonly requiresApiKey =
    true;


  readonly capabilities =
    [
      "chat",
      "reasoning",
      "multi-model",
      "memory",
    ] as const;



  private initialized =
    false;



  async initialize():
    Promise<void> {


    this.initialized =
      true;


    console.info(

      "[OpenRouterProvider] Disabled",

      {

        reason:
          "Using Groq primary provider",

      },

    );

  }





  async isAvailable():
    Promise<boolean> {


    return false;

  }





  async health():
    Promise<AIProviderHealth> {


    return {

      available:
        false,


      initialized:
        this.initialized,


      lastChecked:
        Date.now(),


      lastError:
        "OpenRouter disabled. Credits unavailable.",

    };

  }





  canHandle(
    _input:
      string,
  ):
    boolean {


    return false;

  }





  async generate(
    _request:
      AIRequest,
  ):
    Promise<AIResponse> {


    throw new Error(

      "OpenRouter disabled",

    );

  }





  async shutdown():
    Promise<void> {


    this.initialized =
      false;


  }

}