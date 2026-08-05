import type { GenesisState } from "../genesis/state/GenesisState";

export default class RealityEngine {
  update(_state: GenesisState, _delta: number): void {
    // Compatibility shim for legacy imports.
  }
}
