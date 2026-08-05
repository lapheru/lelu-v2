/**
 * ==========================================================
 * LÉLUVERSE
 * CONVERSATION MESSAGE
 * ==========================================================
 */

export type ConversationRole =

  | "system"

  | "user"

  | "assistant"

  | "tool";

export default interface ConversationMessage {

  id: string;

  role:
    ConversationRole;

  content: string;

  timestamp: number;

  model?: string;

  tokens?: number;

  metadata?:
    Record<
      string,
      unknown
    >;

}