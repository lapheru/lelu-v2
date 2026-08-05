/**
 * ==========================================================
 * LÉLUVERSE
 * CORE CONDUCTOR
 *
 * Shared animation brain for every
 * Genesis shell and material.
 * ==========================================================
 */

export interface CoreState {

  time: number;

  heartbeat: number;

  breath: number;

  resonance: number;

  quake: number;

  activity: number;

}

export default class CoreConductor {

  public state: CoreState = {

    time: 0,

    heartbeat: 0,

    breath: 0,

    resonance: 0,

    quake: 0,

    activity: 0,

  };

  update(

    delta: number,

    activity: number,

  ) {

    this.state.time += delta;

    this.state.activity = activity;

    this.state.heartbeat =

      Math.sin(

        this.state.time * 3

      ) * 0.035;

    this.state.breath =

      Math.sin(

        this.state.time * 0.22

      ) * 0.02;

    this.state.resonance =

      Math.sin(

        this.state.time * 0.35

      ) * 0.025;

    this.state.quake =

      Math.sin(

        this.state.time * 12

      ) *

      0.003 *

      (

        1 +

        activity

      );

  }

}