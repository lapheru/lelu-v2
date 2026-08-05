/**
 * ==========================================================
 * LÉLU
 * AI CONTEXT
 * ==========================================================
 */

import AIState from "./AIState";

export default interface AIContext {

  state: AIState;

  input: string;

  timestamp: number;

}