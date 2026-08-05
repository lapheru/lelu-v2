/**
 * ==========================================================
 * LÉLU
 * AI HEARTBEAT
 * ==========================================================
 */

export default class AIHeartbeat {

  private beat = 0;

  update(): void {

    this.beat++;

  }

  get value(): number {

    return this.beat;

  }

}