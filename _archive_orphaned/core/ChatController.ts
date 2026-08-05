/**
 * ==========================================================
 * LÉLU
 * CHAT CONTROLLER
 * ==========================================================
 */

import AIService
  from "./AIService";

import type {
  AIResponse,
} from "../providers/AIProvider";


export interface ChatMessage {

  id:
    string;

  role:
    "user" |
    "assistant";

  content:
    string;

  timestamp:
    number;

  provider?:
    string;

  model?:
    string;

  metadata?:
    Record<string, unknown>;

}



export default class ChatController {


  private readonly ai:
    AIService;


  private readonly history:
    ChatMessage[] = [];



  constructor() {

    this.ai =
      AIService.getInstance();

  }





  public async initialize():
    Promise<void> {

    await this.ai.initialize();

  }





  public async send(
    message:
      string,
  ):
    Promise<AIResponse> {


    const userMessage:
      ChatMessage = {

      id:
        crypto.randomUUID(),

      role:
        "user",

      content:
        message,

      timestamp:
        Date.now(),

    };


    this.history.push(
      userMessage,
    );



    try {


      const response =
        await this.ai.chat(
          message,
        );



      const assistantMessage:
        ChatMessage = {

        id:
          crypto.randomUUID(),

        role:
          "assistant",

        content:
          response.text,

        timestamp:
          Date.now(),

        provider:
          response.provider,

        model:
          response.model,

        metadata:
          response.metadata,

      };



      this.history.push(
        assistantMessage,
      );



      return response;


    }

    catch (error) {


      const failure:
        ChatMessage = {

        id:
          crypto.randomUUID(),

        role:
          "assistant",

        content:
          "Lélu encountered an error while responding.",

        timestamp:
          Date.now(),

        metadata:
          {

            error:

              error instanceof Error

                ? error.message

                : "Unknown error",

          },

      };



      this.history.push(
        failure,
      );



      throw error;

    }

  }





  public messages():
    ChatMessage[] {

    return [
      ...this.history,
    ];

  }





  public latest():
    ChatMessage | undefined {

    return this.history.at(
      -1,
    );

  }





  public clear():
    void {

    this.history.length =
      0;

  }





  public async shutdown():
    Promise<void> {

    await this.ai.shutdown();

  }

}