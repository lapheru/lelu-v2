/**
 * ==========================================================
 * LÉLUVERSE
 * CONVERSATION HISTORY
 * ==========================================================
 */

import Conversation
  from "./Conversation";

export default class ConversationHistory {

  private readonly conversations =
    new Map<
      string,
      Conversation
    >();

  private activeId?:
    string;

  add(
    conversation: Conversation,
  ): void {

    this.conversations.set(

      conversation.id,

      conversation,

    );

    if (

      !this.activeId

    ) {

      this.activeId =
        conversation.id;

    }

  }

  remove(
    id: string,
  ): void {

    this.conversations.delete(
      id,
    );

    if (

      this.activeId ===
      id

    ) {

      const first =

        this.getAll()[0];

      this.activeId =

        first?.id;

    }

  }

  clear(): void {

    this.conversations.clear();

    this.activeId =
      undefined;

  }

  setActive(
    id: string,
  ): void {

    if (

      this.conversations.has(
        id,
      )

    ) {

      this.activeId =
        id;

    }

  }

  getActive():
    | Conversation
    | undefined {

    if (

      !this.activeId

    ) {

      return undefined;

    }

    return this.conversations.get(

      this.activeId,

    );

  }

  get(
    id: string,
  ):
    | Conversation
    | undefined {

    return this.conversations.get(
      id,
    );

  }

  has(
    id: string,
  ): boolean {

    return this.conversations.has(
      id,
    );

  }

  getAll():
    Conversation[] {

    return Array.from(

      this.conversations.values(),

    );

  }

  getCount():
    number {

    return this.conversations.size;

  }

}