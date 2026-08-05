/**
 * ==========================================================
 * LÉLU
 * VOICE STATE
 * ==========================================================
 */

export const VoiceState = {

  IDLE: "IDLE",

  LISTENING: "LISTENING",

  PROCESSING: "PROCESSING",

  SPEAKING: "SPEAKING",

  ERROR: "ERROR",

} as const;

export type VoiceState =
  (typeof VoiceState)[keyof typeof VoiceState];