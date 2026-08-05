/**
 * ==========================================================
 * LÉLU
 * AI BOOTSTRAP
 * ==========================================================
 */

import AIManager
  from "./AIManager";

import ExecutionLogger
  from "./ExecutionLogger";

import type {
  AIRequest,
  AIResponse,
} from "../providers/AIProvider";

export default class AIBootstrap {

  private readonly manager =
    new AIManager();

  private readonly logger =
    new ExecutionLogger();

  private initialized =
    false;

  async boot(): Promise<void> {

    if (this.initialized) {

      return;

    }

    this.logger.info(
      "Bootstrap",
      "Booting AI Runtime",
    );

    await this.manager.initialize();

    this.initialized = true;

    this.logger.info(
      "Bootstrap",
      "AI Runtime Ready",
    );

  }

  async process(
    request: AIRequest,
  ): Promise<AIResponse> {

    if (!this.initialized) {

      await this.boot();

    }

    this.logger.info(
      "Bootstrap",
      "Processing Request",
    );

    const response =
      await this.manager.process(
        request,
      );

    this.logger.info(
      "Bootstrap",
      "Request Complete",
    );

    return response;

  }

  async shutdown(): Promise<void> {

    this.logger.info(
      "Bootstrap",
      "Shutdown",
    );

    this.initialized = false;

  }

}