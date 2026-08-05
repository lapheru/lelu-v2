/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE SCHEDULER
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export interface GenesisEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void;

}

export default class EngineScheduler {

  private readonly engines: GenesisEngine[] = [];

  register(
    engine: GenesisEngine,
  ): void {

    this.engines.push(engine);

  }

  unregister(
    engine: GenesisEngine,
  ): void {

    const index =
      this.engines.indexOf(engine);

    if (index >= 0) {

      this.engines.splice(
        index,
        1,
      );

    }

  }

  clear(): void {

    this.engines.length = 0;

  }

  update(
    state: GenesisState,
    delta: number,
  ): void {

    for (const engine of this.engines) {

      engine.update(
        state,
        delta,
      );

    }

  }

}