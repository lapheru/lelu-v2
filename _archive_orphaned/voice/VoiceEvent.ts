/**
 * ==========================================================
 * LÉLU
 * VOICE EVENT
 * ==========================================================
 */

export const VoiceEvent = {

  START: "START",

  STOP: "STOP",

  LISTEN: "LISTEN",

  RESULT: "RESULT",

  SPEAK: "SPEAK",

  ERROR: "ERROR",

} as const;

export type VoiceEvent =
  (typeof VoiceEvent)[keyof typeof VoiceEvent];