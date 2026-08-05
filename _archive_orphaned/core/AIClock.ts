/**
 * ==========================================================
 * LÉLU
 * AI CLOCK
 * ==========================================================
 */

export default class AIClock {

  private start = Date.now();

  now(): number {

    return Date.now();

  }

  uptime(): number {

    return Date.now() - this.start;

  }

}