/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE CLOCK
 * ==========================================================
 */

export default class EngineClock {

  private elapsed = 0;

  private frame = 0;

  update(
    delta: number,
  ): void {

    this.elapsed += delta;

    this.frame++;

  }

  getElapsed(): number {

    return this.elapsed;

  }

  getFrame(): number {

    return this.frame;

  }

  reset(): void {

    this.elapsed = 0;

    this.frame = 0;

  }

}