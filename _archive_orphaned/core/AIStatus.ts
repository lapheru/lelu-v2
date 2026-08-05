/**
 * ==========================================================
 * LÉLU
 * AI STATUS
 * ==========================================================
 */

export const AIStatus = {

  OFFLINE: "OFFLINE",

  STARTING: "STARTING",

  IDLE: "IDLE",

  LISTENING: "LISTENING",

  THINKING: "THINKING",

  SPEAKING: "SPEAKING",

  ERROR: "ERROR",

} as const;

export type AIStatus =
  (typeof AIStatus)[keyof typeof AIStatus];