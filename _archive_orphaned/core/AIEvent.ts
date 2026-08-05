/**
 * ==========================================================
 * LÉLU
 * AI EVENT
 * ==========================================================
 */

export const AIEvent = {

  START: "START",

  STOP: "STOP",

  LISTEN: "LISTEN",

  THINK: "THINK",

  RESPOND: "RESPOND",

  ERROR: "ERROR",

} as const;

export type AIEvent =
  (typeof AIEvent)[keyof typeof AIEvent];