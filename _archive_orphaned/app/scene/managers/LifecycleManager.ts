/**
 * ==========================================================
 * LÉLUVERSE
 * LIFECYCLE MANAGER
 * ==========================================================
 */

import type {

  EvolutionPhase,

} from "../genesis/engines/EvolutionEngine";

export default class LifecycleManager {

  private phase: EvolutionPhase = "Void";

  get current() {

    return this.phase;

  }

  set(

    phase: EvolutionPhase,

  ) {

    this.phase = phase;

  }

}