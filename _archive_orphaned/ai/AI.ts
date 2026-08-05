/**
 * ==========================================================
 * LÉLUVERSE
 * AI
 *
 * Global AI instance.
 * ==========================================================
 */

import AIService
  from "./services/AIService";

import ConversationEngine
  from "./conversation/ConversationEngine";

import OpenAIProvider
  from "./providers/OpenAIProvider";

class AI {

  readonly service =
    new AIService();

  readonly conversation =
    new ConversationEngine();

  async initialize(
    apiKey: string,
  ): Promise<void> {

    this.service.setProvider(

      new OpenAIProvider({

        apiKey,

      }),

    );

    this.conversation
      .getAIService()
      .setProvider(

        this.service
          .getProvider()!,

      );

    await this.conversation
      .initialize();

  }

  startListening():
    void {

    this.conversation
      .startListening();

  }

  stopListening():
    void {

    this.conversation
      .stopListening();

  }

  async send(
    text: string,
  ): Promise<void> {

    await this.conversation
      .send(
        text,
      );

  }

  getConversation() {

    return this.conversation
      .getConversation();

  }

  getHistory() {

    return this.conversation
      .getHistory();

  }

}

const ai =
  new AI();

export default ai;