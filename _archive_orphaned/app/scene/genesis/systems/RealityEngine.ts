/**
 * ==========================================================
 * LÉLUVERSE
 * REALITY ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class RealityEngine {

  evolve(

    state: GenesisState,

    delta: number,

  ) {

    state.age += delta;

    state.evolution +=

      delta *

      state.speed;

    state.energy =

      0.5 +

      Math.sin(

        state.age,

      ) *

      0.5;

    state.gravity =

      state.matter;

    state.light =

      state.energy;

  }

}