/**
 * ==========================================================
 * LÉLUVERSE
 * STATE MACHINE
 * ==========================================================
 */

import {
  GenesisMode,
} from "./GenesisState";

export default class GenesisStateMachine {

  private state: GenesisMode =
    GenesisMode.DORMANT;

  get current(): GenesisMode {
    return this.state;
  }

  set(state: GenesisMode): void {
    this.state = state;
  }

  is(state: GenesisMode): boolean {
    return this.state === state;
  }

  reset(): void {
    this.state = GenesisMode.DORMANT;
  }

}