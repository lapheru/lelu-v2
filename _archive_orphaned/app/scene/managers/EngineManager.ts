/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE MANAGER
 * ==========================================================
 */

import GenesisManager from "./GenesisManager";

export default class EngineManager {

  readonly genesis = new GenesisManager();

  update(delta: number) {

    this.genesis.time.update({} as never, delta);

    this.genesis.evolution.update({} as never, delta);

    this.genesis.consciousness.update({} as never, delta);

    this.genesis.existence.update({} as never, delta);

  }

}