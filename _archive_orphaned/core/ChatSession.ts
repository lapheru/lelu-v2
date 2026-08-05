/**
 * ==========================================================
 * LÉLU
 * CHAT SESSION
 * ==========================================================
 */

import ChatController
  from "./ChatController";

import type {
  AIResponse,
} from "../providers/AIProvider";


export default class ChatSession {


  private readonly controller:
    ChatController;


  private readonly sessionId:
    string;


  private startedAt:
    number;


  constructor() {

    this.controller =
      new ChatController();


    this.sessionId =
      crypto.randomUUID();


    this.startedAt =
      Date.now();

  }





  public async initialize():
    Promise<void> {

    await this.controller.initialize();

  }





  public async send(
    message:
      string,
  ):
    Promise<AIResponse> {


    return this.controller.send(

      message,

    );

  }





  public id():
    string {

    return this.sessionId;

  }





  public history() {

    return this.controller.messages();

  }





  public messageCount():
    number {

    return this.history().length;

  }





  public active():
    boolean {

    return (

      Date.now() -
      this.startedAt

    ) > 0;

  }





  public clear():
    void {

    this.controller.clear();

  }





  public async close():
    Promise<void> {

    await this.controller.shutdown();

  }


}