/**
 * ==========================================================
 * LÉLU
 * CHAT MESSAGE
 * ==========================================================
 */

export type ChatRole =
  | "system"
  | "user"
  | "assistant";

export default interface ChatMessage {
  /**
   * Who sent the message.
   */
  role: ChatRole;

  /**
   * Message content.
   */
  content: string;

  /**
   * Unix timestamp.
   */
  timestamp: number;

  /**
   * Optional unique ID.
   */
  id?: string;

  /**
   * Optional conversation/session ID.
   */
  conversationId?: string;

  /**
   * Optional message metadata.
   */
  metadata?: Record<string, unknown>;
}