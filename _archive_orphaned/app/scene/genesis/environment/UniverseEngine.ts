/**
 * ==========================================================
 * LÉLUVERSE
 * UNIVERSE ENGINE
 *
 * Master universe simulation.
 * ==========================================================
 */

import UniverseClock
  from "./UniverseClock";

import UniverseEvents
  from "./UniverseEvents";

import UniverseState
  from "./UniverseState";

export default class UniverseEngine {

  readonly clock =
    new UniverseClock();

  readonly events =
    new UniverseEvents();

  readonly state =
    new UniverseState();

  enabled =
    true;

  constructor() {

    this.events.subscribe(

      event => {

        this.state.setEvent(

          event,

        );

      },

    );

  }

  update() {

    if (

      !this.enabled

    )

      return;

    this.clock.update();

    const delta =

      this.clock.getDelta();

    this.state.update(

      delta,

    );

    this.events.update(

      delta,

    );

  }

  pause() {

    this.enabled =
      false;

    this.clock.pause();

  }

  resume() {

    this.enabled =
      true;

    this.clock.resume();

  }

  setSpeed(

    speed: number,

  ) {

    this.clock.setSpeed(

      speed,

    );

  }

  reset() {

    this.pause();

    this.resume();

  }

}