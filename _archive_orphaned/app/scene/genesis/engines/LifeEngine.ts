/**
 * ==========================================================
 * LÉLUVERSE
 * LIFE ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class LifeEngine {

  update(
    state: GenesisState,
    delta: number,
  ) {

    if (

      state.energy > 0.35 &&

      state.matter > 0.25

    ) {

      state.life = Math.min(

        1,

        state.life +

        delta * 0.001,

      );

    }

  }

}