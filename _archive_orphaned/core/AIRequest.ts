/**
 * ==========================================================
 * LÉLU
 * AI REQUEST
 * ==========================================================
 */

import type ChatMessage from "./ChatMessage";

export default interface AIRequest {
  /**
   * Complete conversation context sent to the model.
   */
  messages: ChatMessage[];

  /**
   * The user's newest message.
   */
  message: string;

  /**
   * Unix timestamp.
   */
  timestamp: number;

  /**
   * Optional model override.
   */
  model?: string;

  /**
   * Maximum tokens to generate.
   */
  maxTokens?: number;

  /**
   * Sampling temperature.
   */
  temperature?: number;

  /**
   * Optional stop sequences.
   */
  stop?: string[];
}