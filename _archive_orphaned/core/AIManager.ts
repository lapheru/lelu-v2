/**
 * ==========================================================
 * LÉLU
 * AI MANAGER
 * ==========================================================
 */

import AIRuntime
  from "./AIRuntime";

import ExecutionLogger
  from "./ExecutionLogger";

import type {
  AIRequest,
  AIResponse,
} from "../providers/AIProvider";

export default class AIManager {

  private readonly runtime =
    new AIRuntime();

  private readonly logger =
    new ExecutionLogger();

  private initialized =
    false;

  async initialize(): Promise<void> {

    if (this.initialized) {

      return;

    }

    this.logger.info(
      "AI Manager",
      "Initializing Runtime",
    );

    await this.runtime.initialize();

    this.initialized = true;

    this.logger.info(
      "AI Manager",
      "Runtime Ready",
    );

  }

  async process(
    request: AIRequest,
  ): Promise<AIResponse> {

    if (!this.initialized) {

      await this.initialize();

    }

    this.logger.info(
      "AI Manager",
      "Processing Request",
    );

    const response =
      await this.runtime.process(
        request,
      );

    this.logger.info(
      "AI Manager",
      "Request Complete",
    );

    return response;

  }

  async restart(): Promise<void> {

    this.logger.info(
      "AI Manager",
      "Restarting Runtime",
    );

    this.initialized = false;

    await this.initialize();

  }

}