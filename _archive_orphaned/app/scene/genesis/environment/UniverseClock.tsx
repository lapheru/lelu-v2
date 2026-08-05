/**
 * ==========================================================
 * LÉLUVERSE
 * UNIVERSE CLOCK
 *
 * Master time controller.
 * ==========================================================
 */

export default class UniverseClock {

  private start =
    performance.now();

  private last =
    this.start;

  private delta =
    0;

  private elapsed =
    0;

  speed =
    1;

  paused =
    false;

  update() {

    const now =
      performance.now();

    if (

      this.paused

    ) {

      this.last =
        now;

      return;

    }

    this.delta =

      (

        now -

        this.last

      ) /

      1000 *

      this.speed;

    this.elapsed +=

      this.delta;

    this.last =
      now;

  }

  getDelta() {

    return this.delta;

  }

  getElapsed() {

    return this.elapsed;

  }

  setSpeed(

    speed: number,

  ) {

    this.speed =
      speed;

  }

  pause() {

    this.paused =
      true;

  }

  resume() {

    this.paused =
      false;

  }

}