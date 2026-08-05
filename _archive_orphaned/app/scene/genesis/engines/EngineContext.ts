/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE CONTEXT
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export interface EngineContext {

  readonly state: GenesisState;

  readonly delta: number;

  readonly elapsed: number;

  readonly frame: number;

}

export default class DefaultEngineContext
  implements EngineContext {

  readonly state: GenesisState;

  readonly delta: number;

  readonly elapsed: number;

  readonly frame: number;

  constructor(

    state: GenesisState,

    delta: number,

    elapsed: number,

    frame: number,

  ) {

    this.state = state;

    this.delta = delta;

    this.elapsed = elapsed;

    this.frame = frame;

  }

}