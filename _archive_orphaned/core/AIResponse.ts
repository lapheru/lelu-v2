/**
 * ==========================================================
 * LÉLU
 * AI RESPONSE
 * ==========================================================
 */

import type ChatMessage from "./ChatMessage";

export default interface AIResponse {
  /**
   * Assistant response.
   */
  text: string;

  /**
   * Unix timestamp.
   */
  timestamp: number;

  /**
   * Detected or assigned intent.
   */
  intent: string;

  /**
   * Updated conversation after the reply.
   */
  messages?: ChatMessage[];

  /**
   * Model that generated the response.
   */
  model?: string;

  /**
   * Response completed successfully.
   */
  success?: boolean;

  /**
   * Optional error message.
   */
  error?: string;
}