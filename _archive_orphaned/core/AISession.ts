/**
 * ==========================================================
 * LÉLU
 * AI SESSION
 * ==========================================================
 */

export default class AISession {

  id = crypto.randomUUID();

  started = Date.now();

  messages = 0;

  reset(): void {

    this.id = crypto.randomUUID();

    this.started = Date.now();

    this.messages = 0;

  }

}