/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE GROUP
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export interface GenesisEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void;

}

export default class EngineGroup {

  constructor(

    public readonly name: string,

    public readonly engines: GenesisEngine[],

  ) {}

  update(

    state: GenesisState,

    delta: number,

  ): void {

    for (

      const engine of

      this.engines

    ) {

      engine.update(

        state,

        delta,

      );

    }

  }

}