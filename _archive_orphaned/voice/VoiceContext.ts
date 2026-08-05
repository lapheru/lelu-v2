/**
 * ==========================================================
 * LÉLU
 * VOICE CONTEXT
 * ==========================================================
 */

import type { VoiceState } from "./VoiceState";

export default interface VoiceContext {

  state: VoiceState;

  transcript: string;

  timestamp: number;

}