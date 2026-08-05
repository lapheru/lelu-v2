/**
 * ==========================================================
 * LÉLUVERSE
 * LOGIC ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class LogicEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void {

    if (state.paused) return;

    state.intelligence = Math.min(
      1,
      state.intelligence +
      state.learning *
      delta *
      0.0002,
    );

  }

}