/**
 * ==========================================================
 * LÉLUVERSE
 * CONVERSATION
 * ==========================================================
 */

import type ConversationMessage
  from "./ConversationMessage";

export default class Conversation {

  readonly id: string;

  readonly createdAt: number;

  private updatedAt: number;

  private title =
    "New Conversation";

  private readonly messages:
    ConversationMessage[] =
      [];

  constructor(
    id: string,
  ) {

    this.id =
      id;

    this.createdAt =
      Date.now();

    this.updatedAt =
      this.createdAt;

  }

  setTitle(
    title: string,
  ): void {

    this.title =
      title;

    this.updatedAt =
      Date.now();

  }

  getTitle():
    string {

    return this.title;

  }

  addMessage(
    message: ConversationMessage,
  ): void {

    this.messages.push(
      message,
    );

    this.updatedAt =
      Date.now();

  }

  removeMessage(
    id: string,
  ): void {

    const index =

      this.messages.findIndex(

        message =>

          message.id ===
          id,

      );

    if (

      index >= 0

    ) {

      this.messages.splice(

        index,

        1,

      );

      this.updatedAt =
        Date.now();

    }

  }

  clear(): void {

    this.messages.length =
      0;

    this.updatedAt =
      Date.now();

  }

  getMessage(
    id: string,
  ):
    | ConversationMessage
    | undefined {

    return this.messages.find(

      message =>

        message.id ===
        id,

    );

  }

  getMessages():
    ConversationMessage[] {

    return [
      ...this.messages,
    ];

  }

  getLastMessage():
    | ConversationMessage
    | undefined {

    return this.messages.at(
      -1,
    );

  }

  getMessageCount():
    number {

    return this.messages.length;

  }

  getCreatedAt():
    number {

    return this.createdAt;

  }

  getUpdatedAt():
    number {

    return this.updatedAt;

  }

}