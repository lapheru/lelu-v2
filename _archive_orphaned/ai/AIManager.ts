/**
 * ==========================================================
 * LÉLUVERSE
 * AI MANAGER
 * ==========================================================
 */

import AI
  from "./AI";

export default class AIManager {

  private initialized =
    false;

  async initialize(
    apiKey: string,
  ): Promise<void> {

    if (
      this.initialized
    ) {

      return;

    }

    await AI.initialize(
      apiKey,
    );

    this.initialized =
      true;

    console.log(
      "Lélu AI initialized.",
    );

  }

  async send(
    text: string,
  ): Promise<void> {

    await AI.send(
      text,
    );

  }

  startListening():
    void {

    AI.startListening();

  }

  stopListening():
    void {

    AI.stopListening();

  }

  getConversation() {

    return AI.getConversation();

  }

  getHistory() {

    return AI.getHistory();

  }

  isInitialized():
    boolean {

    return this.initialized;

  }

}