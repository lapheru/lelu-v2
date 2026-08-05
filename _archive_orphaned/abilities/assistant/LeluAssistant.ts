/**
 * ==========================================================
 * LÉLU
 * ASSISTANT CORE
 * ==========================================================
 */

import AIService
  from "../../core/AIService";

import EngineerService
  from "../engineer/EngineerService";

import MemoryService
  from "../memory/MemoryService";

import BrowserVoiceService
  from "../voice/BrowserVoiceService";


export interface AssistantConversationState {

  activeMode:
    "chat" |
    "engineering";

}



export interface AssistantReply {

  text:
    string;

  source:
    "ai" |
    "local";

}



export default class LeluAssistant {


  readonly chat:
    AIService;


  readonly engineer:
    EngineerService;


  readonly memory:
    MemoryService;


  readonly voice:
    BrowserVoiceService;



  state:
    AssistantConversationState = {

      activeMode:
        "chat",

    };



  constructor() {

    this.chat =
      AIService.getInstance();


    this.engineer =
      new EngineerService();


    this.memory =
      new MemoryService();


    this.voice =
      new BrowserVoiceService();

  }





  async initialize():
    Promise<void> {

    await this.chat.initialize();

  }





  async respond(
    message:
      string,
  ):
    Promise<AssistantReply> {


    const reply =
      await this.chat.chat(
        message,
      );


    this.memory.recordExchange(

      message,

      reply.text,

    );


    return {

      text:
        reply.text,

      source:
        "ai",

    };

  }





  async respondEngineering(
    message:
      string,
  ):
    Promise<AssistantReply> {


    const reply =
      await this.engineer.answer(
        message,
      );


    this.memory.recordExchange(

      message,

      reply.text,

    );


    return {

      text:
        reply.text,

      source:
        reply.source,

    };

  }





  setMode(
    mode:
      AssistantConversationState["activeMode"],
  ):
    void {

    this.state.activeMode =
      mode;

  }

}