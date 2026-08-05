/**
 * ==========================================================
 * LÉLUVERSE
 * SIMULATION SYSTEM
 * ==========================================================
 */

export default class SimulationSystem {

  private running = false;

  private speed = 1;

  private tick = 0;

  start() {

    this.running = true;

  }

  stop() {

    this.running = false;

  }

  toggle() {

    this.running = !this.running;

  }

  setSpeed(

    speed: number,

  ) {

    this.speed = Math.max(

      0,

      speed,

    );

  }

  update(

    delta: number,

  ) {

    if (!this.running) return;

    this.tick +=

      delta *

      this.speed;

  }

  getTick() {

    return this.tick;

  }

  isRunning() {

    return this.running;

  }

}