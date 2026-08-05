/**
 * ==========================================================
 * LÉLUVERSE
 * CHAT CONTROLLER
 * ==========================================================
 */

import AI from "./AI";

export default class ChatController {

  async initialize(
    apiKey: string,
  ): Promise<void> {

    await AI.initialize(
      apiKey,
    );

  }

  async sendMessage(
    text: string,
  ): Promise<void> {

    await AI.send(
      text,
    );

  }

  startListening(): void {

    AI.startListening();

  }

  stopListening(): void {

    AI.stopListening();

  }

  toggleListening(): void {

    if (

      AI.conversation
        .isListening()

    ) {

      AI.stopListening();

    }

    else {

      AI.startListening();

    }

  }

  getConversation() {

    return AI.getConversation();

  }

  getHistory() {

    return AI.getHistory();

  }

}