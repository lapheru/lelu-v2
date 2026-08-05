/**
 * ==========================================================
 * LÉLUVERSE
 * AI RESPONSE
 * ==========================================================
 */

export default interface AIResponse {

  text: string;

  model: string;

  timestamp: number;

  promptTokens?: number;

  completionTokens?: number;

  totalTokens?: number;

  finishReason?: string;

  metadata?:
    Record<
      string,
      unknown
    >;

}