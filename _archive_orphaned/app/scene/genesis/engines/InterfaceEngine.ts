import type { GenesisState } from "../state/GenesisState";

export default class InterfaceEngine {
  update(_state: GenesisState, _delta: number): void {
    // Compatibility shim for legacy GenesisManager imports.
  }
}
