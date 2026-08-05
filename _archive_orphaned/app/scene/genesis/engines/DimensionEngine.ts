/**
 * ==========================================================
 * LÉLUVERSE
 * DIMENSION ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class DimensionEngine {

  update(state: GenesisState) {

    if (state.evolution < 25) {

      state.dimension = 1;

    } else if (state.evolution < 50) {

      state.dimension = 2;

    } else if (state.evolution < 100) {

      state.dimension = 3;

    } else if (state.evolution < 250) {

      state.dimension = 4;

    } else {

      state.dimension = 5;

    }

  }

}